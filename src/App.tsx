import React, { useState } from 'react';
import { Heart, Music, Send, Sparkles, Image as ImageIcon, Video, Wind } from 'lucide-react';
import { EmotionalResponse, TaviusConversationResponse } from './types';
import { getEmotionalSupport } from './services/perplexityService';
import { getMoodImage } from './services/unsplashService';
import { getSongRecommendation, getYouTubeSearchUrl } from './services/musicService';
import { createVideoConversation, getFallbackMessage } from './services/taviusService';
import { VideoConversationInterface } from './components/VideoConversationInterface';
import { BreathingExercise } from './components/BreathingExercise';

function App() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState<EmotionalResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showVideoConversation, setShowVideoConversation] = useState(false);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [conversationData, setConversationData] = useState<TaviusConversationResponse | null>(null);
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Get emotional support from Perplexity API
      const { message, emotion } = await getEmotionalSupport(userInput);
      
      // Get song recommendation
      const { song, artist } = getSongRecommendation(emotion);
      
      // Get mood-appropriate image from Unsplash
      const image = await getMoodImage(emotion);
      
      setResponse({
        message,
        emotion,
        song,
        artist,
        image
      });
    } catch (error) {
      console.error('Error getting response:', error);
      // Fallback response
      setResponse({
        message: "Thank you for sharing with me. Whatever you're feeling right now is completely valid and important.",
        emotion: "reflective",
        song: "Here Comes the Sun",
        artist: "The Beatles"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartVideoConversation = async () => {
    if (!response) return;

    setIsCreatingConversation(true);
    
    try {
      const videoConversation = await createVideoConversation(userInput, response.emotion);
      setConversationData(videoConversation);
      setShowVideoConversation(true);
    } catch (error) {
      console.error('Error creating video conversation:', error);
      // Still show the interface with fallback message
      setConversationData(null);
      setShowVideoConversation(true);
    } finally {
      setIsCreatingConversation(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Bolt.new Badge */}
      <div className="fixed top-4 right-4 z-50">
        <a
          href="https://bolt.new/"
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-transform duration-200 hover:scale-110 hover:shadow-lg"
          aria-label="Powered by Bolt.new"
        >
          <img
            src="/bolt.png"
            alt="Powered by Bolt.new"
            className="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
          />
        </a>
      </div>

      {/* Breathing Exercise Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => setShowBreathingExercise(true)}
          className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 group"
          title="Breathe With Me"
        >
          <Wind className="w-6 h-6 group-hover:animate-pulse" />
        </button>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-orange-200 rounded-full opacity-50 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 pt-8 md:pt-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Sound Heal
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A safe space to share your feelings and receive AI-powered comfort, understanding, and musical healing through sound therapy
          </p>
        </div>

        {/* API Keys Notice */}
        {(!import.meta.env.VITE_PERPLEXITY_API_KEY || !import.meta.env.VITE_UNSPLASH_ACCESS_KEY || !import.meta.env.VITE_TAVIUS_API_KEY) && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-8">
            <p className="text-yellow-800 text-sm">
              <strong>Note:</strong> For enhanced AI responses, beautiful mood images, and live video conversations, add your Perplexity, Unsplash, and Tavius API keys to the environment variables. 
              Currently using fallback responses.
            </p>
          </div>
        )}

        {/* Main content card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          {/* Input form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="mb-6">
              <label htmlFor="feelings" className="block text-lg font-medium text-gray-700 mb-3">
                How are you feeling today?
              </label>
              <textarea
                id="feelings"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Share what's on your heart... There's no judgment here, just understanding and healing through sound."
                className="w-full px-6 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200 bg-white/70 backdrop-blur-sm"
                rows={4}
                maxLength={500}
              />
              <div className="text-right mt-2 text-sm text-gray-500">
                {userInput.length}/500
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!userInput.trim() || isLoading}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Understanding...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Share Your Heart
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Response */}
          {response && (
            <div className="space-y-6 animate-fade-in">
              {/* Mood Image */}
              {response.image && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border-l-4 border-indigo-400">
                  <div className="flex items-start gap-3">
                    <ImageIcon className="w-6 h-6 text-indigo-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-3">A visual for your mood:</h3>
                      <div className="rounded-xl overflow-hidden shadow-lg">
                        <img
                          src={response.image}
                          alt={`Visual representation of ${response.emotion} mood`}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Comforting message */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-l-4 border-purple-400">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">A message for you:</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {response.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Emotion identification */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-l-4 border-blue-400">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">What I'm sensing:</h3>
                    <p className="text-blue-700 font-medium text-lg capitalize">
                      You're feeling {response.emotion}
                    </p>
                  </div>
                </div>
              </div>

              {/* Breathing Exercise Recommendation */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border-l-4 border-cyan-400">
                <div className="flex items-start gap-3">
                  <Wind className="w-6 h-6 text-cyan-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">Take a moment to breathe:</h3>
                    <p className="text-gray-700 mb-4">
                      Sometimes the best medicine is simply taking a deep breath. Let me guide you through a calming 4-7-8 breathing exercise to help center your mind and soothe your emotions.
                    </p>
                    <button
                      onClick={() => setShowBreathingExercise(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <Wind className="w-5 h-5" />
                      Breathe With Me
                    </button>
                  </div>
                </div>
              </div>

              {/* Song recommendation */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border-l-4 border-orange-400">
                <div className="flex items-start gap-3">
                  <Music className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">A healing song for your soul:</h3>
                    <p className="text-gray-700 mb-3">
                      <span className="font-medium text-lg">"{response.song}"</span> by <span className="font-medium">{response.artist}</span>
                    </p>
                    <a
                      href={getYouTubeSearchUrl(response.song, response.artist)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                    >
                      <Music className="w-4 h-4" />
                      Listen on YouTube
                    </a>
                  </div>
                </div>
              </div>

              {/* Video conversation prompt */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-l-4 border-green-400">
                <div className="flex items-start gap-3">
                  <Video className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">Ready for deeper connection?</h3>
                    <p className="text-gray-700 mb-4">
                      Take your emotional journey to the next level with a live video conversation. Connect face-to-face with an AI guru who understands your feelings and can provide personalized guidance through real-time interaction.
                    </p>
                    <button
                      onClick={handleStartVideoConversation}
                      disabled={isCreatingConversation}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCreatingConversation ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Preparing...
                        </>
                      ) : (
                        <>
                          <Video className="w-5 h-5" />
                          Start Video Conversation
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Reset button */}
              <div className="text-center pt-4">
                <button
                  onClick={() => {
                    setUserInput('');
                    setResponse(null);
                  }}
                  className="px-6 py-2 text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
                >
                  Share another feeling
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p className="mb-2">Remember: Your feelings are valid, you are not alone, and this too shall pass.</p>
          <p className="text-sm">Made with 💜 for emotional wellness • Powered by AI & Sound Healing</p>
        </div>
      </div>

      {/* Video Conversation Interface */}
      {showVideoConversation && (
        <VideoConversationInterface
          conversationData={conversationData}
          emotion={response?.emotion || 'reflective'}
          onClose={() => setShowVideoConversation(false)}
        />
      )}

      {/* Breathing Exercise */}
      {showBreathingExercise && (
        <BreathingExercise
          onClose={() => setShowBreathingExercise(false)}
        />
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;