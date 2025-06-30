import React, { useState } from 'react';
import { Video, MessageCircle, Heart, X, ExternalLink, Play } from 'lucide-react';
import { TaviusConversationResponse } from '../types';

interface VideoConversationInterfaceProps {
  conversationData: TaviusConversationResponse | null;
  emotion: string;
  onClose: () => void;
}

export function VideoConversationInterface({ conversationData, emotion, onClose }: VideoConversationInterfaceProps) {
  const [isVideoStarted, setIsVideoStarted] = useState(false);

  const handleStartVideo = () => {
    if (conversationData?.conversation_url) {
      // Open the video conversation in a new window
      window.open(conversationData.conversation_url, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
      setIsVideoStarted(true);
    }
  };

  const handleEmbedVideo = () => {
    setIsVideoStarted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Video Conversation with Your Guru</h2>
                <p className="text-purple-100 text-sm">A live video session for deeper emotional support</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          {!conversationData ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Video Conversation Unavailable</h3>
              <p className="text-gray-600 mb-6">
                To enable live video conversations with your emotional support guru, please add your Tavius API credentials to the environment variables.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-left max-w-md mx-auto">
                <p className="text-blue-800 text-sm">
                  <strong>Required:</strong><br />
                  • VITE_TAVIUS_API_KEY<br />
                  • VITE_TAVIUS_PERSONA_ID<br />
                  • VITE_TAVIUS_REPLICA_ID (optional)
                </p>
              </div>
            </div>
          ) : !isVideoStarted ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Connect</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                Your video conversation has been prepared. You'll be connected with an AI guru who understands that you're feeling <span className="font-medium text-purple-600">{emotion}</span>. 
                This is a safe space to explore your emotions deeper through live video interaction.
              </p>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
                <h4 className="font-semibold text-gray-800 mb-3">What to expect:</h4>
                <ul className="text-left text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <Heart className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                    <span>A compassionate AI guru who listens without judgment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MessageCircle className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                    <span>Thoughtful questions to help you explore your feelings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Video className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                    <span>Real-time video interaction for deeper connection</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleStartVideo}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <ExternalLink className="w-5 h-5" />
                  Open in New Window
                </button>
                
                <button
                  onClick={handleEmbedVideo}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-2xl hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Play className="w-5 h-5" />
                  Start Here
                </button>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p>Conversation ID: {conversationData.conversation_id}</p>
                <p>Status: <span className="capitalize font-medium">{conversationData.status}</span></p>
              </div>
            </div>
          ) : (
            <div className="h-[600px] rounded-2xl overflow-hidden bg-gray-100">
              <iframe
                src={conversationData.conversation_url}
                className="w-full h-full border-0"
                allow="camera; microphone; fullscreen; display-capture; autoplay"
                title="Video Conversation with Guru"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        {conversationData && !isVideoStarted && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Conversation ready</span>
              </div>
              <div>
                Created: {new Date(conversationData.created_at).toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}