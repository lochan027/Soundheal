import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface BreathingExerciseProps {
  onClose: () => void;
}

type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'pause';

export function BreathingExercise({ onClose }: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathingPhase>('pause');
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // 4-7-8 breathing pattern (in seconds)
  const breathingPattern = {
    inhale: 4,
    hold: 7,
    exhale: 8,
    pause: 2
  };

  const phaseMessages = {
    inhale: "Breathe in slowly through your nose...",
    hold: "Hold your breath gently...",
    exhale: "Exhale slowly through your mouth...",
    pause: "Rest and prepare for the next breath..."
  };

  // Create breathing sound using Web Audio API
  const createBreathingSound = (frequency: number, duration: number, type: 'inhale' | 'exhale') => {
    if (isMuted || !audioContextRef.current) return;

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different frequencies for inhale vs exhale
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';

    // Create a gentle breathing sound envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.5);
    gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + duration - 0.5);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };

  useEffect(() => {
    // Initialize Web Audio Context
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      startBreathingCycle();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  const startBreathingCycle = () => {
    setPhase('inhale');
    setTimeLeft(breathingPattern.inhale);
    
    // Play inhale sound
    createBreathingSound(220, breathingPattern.inhale, 'inhale');

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Move to next phase
          setPhase((currentPhase) => {
            switch (currentPhase) {
              case 'inhale':
                createBreathingSound(0, breathingPattern.hold, 'inhale'); // Silent hold
                return 'hold';
              case 'hold':
                createBreathingSound(180, breathingPattern.exhale, 'exhale');
                return 'exhale';
              case 'exhale':
                setCycle(c => c + 1);
                return 'pause';
              case 'pause':
                createBreathingSound(220, breathingPattern.inhale, 'inhale');
                return 'inhale';
              default:
                return 'inhale';
            }
          });
          
          setTimeLeft((newPhase) => {
            const currentPhase = phase === 'inhale' ? 'hold' : 
                               phase === 'hold' ? 'exhale' : 
                               phase === 'exhale' ? 'pause' : 'inhale';
            return breathingPattern[currentPhase];
          });
          
          return breathingPattern[phase === 'inhale' ? 'hold' : 
                                phase === 'hold' ? 'exhale' : 
                                phase === 'exhale' ? 'pause' : 'inhale'];
        }
        return prev - 1;
      });
    }, 1000);
  };

  const toggleBreathing = () => {
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    setIsActive(!isActive);
  };

  const resetBreathing = () => {
    setIsActive(false);
    setPhase('pause');
    setTimeLeft(0);
    setCycle(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const getCircleScale = () => {
    const progress = (breathingPattern[phase] - timeLeft) / breathingPattern[phase];
    
    switch (phase) {
      case 'inhale':
        return 0.5 + (progress * 0.5); // Scale from 0.5 to 1.0
      case 'hold':
        return 1.0; // Stay at full size
      case 'exhale':
        return 1.0 - (progress * 0.5); // Scale from 1.0 to 0.5
      case 'pause':
        return 0.5; // Stay at small size
      default:
        return 0.5;
    }
  };

  const getCircleColor = () => {
    switch (phase) {
      case 'inhale':
        return 'from-blue-400 to-cyan-400';
      case 'hold':
        return 'from-purple-400 to-pink-400';
      case 'exhale':
        return 'from-green-400 to-emerald-400';
      case 'pause':
        return 'from-gray-300 to-gray-400';
      default:
        return 'from-blue-400 to-cyan-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">🧘‍♂️ Breathe With Me</h2>
              <p className="text-indigo-100 text-sm">4-7-8 Breathing Pattern for Deep Relaxation</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Breathing Circle */}
        <div className="p-12 bg-gradient-to-br from-gray-50 to-white">
          <div className="text-center mb-8">
            <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-gray-200 opacity-30"></div>
              
              {/* Breathing circle */}
              <div
                className={`w-64 h-64 rounded-full bg-gradient-to-br ${getCircleColor()} shadow-2xl flex items-center justify-center transition-transform duration-1000 ease-in-out`}
                style={{
                  transform: `scale(${getCircleScale()})`,
                  filter: 'blur(0.5px)'
                }}
              >
                <div className="text-white text-center">
                  <div className="text-6xl font-light mb-2">
                    {timeLeft > 0 ? timeLeft : ''}
                  </div>
                  <div className="text-lg font-medium capitalize opacity-90">
                    {phase === 'pause' ? 'Ready' : phase}
                  </div>
                </div>
              </div>

              {/* Pulse rings */}
              {isActive && (
                <>
                  <div className="absolute inset-0 rounded-full border border-white/30 animate-ping"></div>
                  <div className="absolute inset-4 rounded-full border border-white/20 animate-ping delay-500"></div>
                </>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center mb-8">
            <p className="text-xl text-gray-700 mb-2 font-medium">
              {isActive ? phaseMessages[phase] : "Let's take a deep breath together..."}
            </p>
            <p className="text-gray-500">
              {isActive ? `Cycle ${cycle + 1}` : "Press play to begin your breathing journey"}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={toggleBreathing}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                isActive
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
              }`}
            >
              {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isActive ? 'Pause' : 'Start Breathing'}
            </button>

            <button
              onClick={resetBreathing}
              className="px-6 py-4 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`px-6 py-4 rounded-2xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                isMuted
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-blue-200 text-blue-700 hover:bg-blue-300'
              }`}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-800 mb-3">Benefits of 4-7-8 Breathing:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Reduces anxiety and stress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Improves sleep quality</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Lowers blood pressure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span>Enhances focus and clarity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}