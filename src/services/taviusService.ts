import { TaviusConversationResponse, TaviusConversationRequest } from '../types';

const TAVIUS_API_KEY = import.meta.env.VITE_TAVIUS_API_KEY;
const TAVIUS_PERSONA_ID = import.meta.env.VITE_TAVIUS_PERSONA_ID;
const TAVIUS_REPLICA_ID = import.meta.env.VITE_TAVIUS_REPLICA_ID;
const TAVIUS_API_BASE_URL = 'https://tavusapi.com/v2';

export async function createVideoConversation(userFeeling: string, emotion: string): Promise<TaviusConversationResponse | null> {
  if (!TAVIUS_API_KEY || !TAVIUS_PERSONA_ID) {
    console.warn('Tavius API credentials not available');
    return null;
  }

  try {
    // Create a comprehensive greeting that addresses their specific emotion
    const emotionGreeting = getEmotionSpecificGreeting(emotion, userFeeling);
    
    const conversationRequest: TaviusConversationRequest = {
      persona_id: TAVIUS_PERSONA_ID,
      conversation_name: `Emotional Support Session - ${new Date().toLocaleDateString()}`,
      conversational_context: `You are a compassionate emotional support guru. The user has just shared: "${userFeeling}" and they are feeling ${emotion}. 

Your role is to:
1. Start immediately with a warm, personalized greeting
2. Acknowledge their specific emotion with empathy
3. Provide comfort and validation for their feelings
4. Ask thoughtful follow-up questions to help them explore deeper
5. Be a wise, caring presence who listens without judgment
6. Offer gentle guidance and wisdom when appropriate

Remember: Always speak with warmth, understanding, and genuine care. Make them feel heard and supported.`,
      custom_greeting: emotionGreeting,
      properties: {
        participant_left_timeout: 60,
        participant_absent_timeout: 300,
        enable_recording: false
      }
    };

    // Add replica_id only if it's provided (optional if persona has default replica)
    if (TAVIUS_REPLICA_ID) {
      conversationRequest.replica_id = TAVIUS_REPLICA_ID;
    }

    const response = await fetch(`${TAVIUS_API_BASE_URL}/conversations`, {
      method: 'POST',
      headers: {
        'x-api-key': TAVIUS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(conversationRequest)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Tavius API error: ${response.status} - ${errorText}`);
      throw new Error(`Tavius API error: ${response.status}`);
    }

    const data: TaviusConversationResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating Tavius video conversation:', error);
    return null;
  }
}

function getEmotionSpecificGreeting(emotion: string, userFeeling: string): string {
  const greetings: Record<string, string> = {
    sad: `Hello, I'm your emotional support guru, and I'm here for you. I can sense that you're feeling sad right now, and I want you to know that your feelings are completely valid. Sadness is a natural part of the human experience, and it's okay to feel this way. Thank you for trusting me with what's in your heart. Tell me, what's been weighing on you today?`,
    
    angry: `Hello, I'm your emotional support guru. I understand you're feeling angry right now, and I want you to know that anger is a valid emotion that deserves to be heard. Sometimes anger is our heart's way of telling us that something important to us has been affected. I'm here to listen without judgment and help you work through these feelings. What's been stirring up this anger for you?`,
    
    anxious: `Hello, I'm your emotional support guru, and I'm so glad you're here. I can sense that you're feeling anxious, and I want you to know that you're safe in this space. Anxiety can feel overwhelming, but you've already taken a brave step by reaching out. Your feelings are valid, and together we can explore what's causing this anxiety. Take a deep breath with me - what's been on your mind lately?`,
    
    excited: `Hello, I'm your emotional support guru! I can feel your excitement, and it's wonderful to see you embracing positive emotions. Joy and excitement are beautiful parts of life that deserve to be celebrated. I'm here to share in this moment with you and help you explore these feelings. What's got you feeling so excited today?`,
    
    exhausted: `Hello, I'm your emotional support guru. I can sense that you're feeling exhausted, and I want you to know that it's okay to feel tired. Sometimes life asks so much of us, and it's natural to feel drained. You've been carrying a lot, haven't you? I'm here to offer you a moment of rest and understanding. What's been taking so much of your energy lately?`,
    
    confused: `Hello, I'm your emotional support guru. I understand you're feeling confused right now, and that's completely okay. Confusion often comes when we're at a crossroads or facing something new and uncertain. It's a sign that you're thinking deeply about something important. I'm here to help you sort through these feelings and find some clarity. What's been causing this confusion for you?`,
    
    grateful: `Hello, I'm your emotional support guru. I can sense your gratitude, and it's beautiful to witness. Gratitude is such a powerful emotion that can transform how we see the world. I'm honored that you're sharing this positive energy with me. What's been filling your heart with gratitude today?`,
    
    lonely: `Hello, I'm your emotional support guru, and I want you to know that you're not alone right now. I can sense that you're feeling lonely, and I understand how isolating that can feel. Loneliness is one of the most human experiences we can have, and it takes courage to acknowledge it. I'm here with you in this moment. What's been making you feel so alone lately?`,
    
    hopeful: `Hello, I'm your emotional support guru. I can feel the hope radiating from you, and it's truly inspiring. Hope is such a powerful force - it's what keeps us moving forward even in difficult times. I'm here to nurture that hope with you and explore what's lighting up your path. What's been giving you this sense of hope?`,
    
    reflective: `Hello, I'm your emotional support guru. I can sense that you're in a reflective space right now, taking time to look inward and process your experiences. This kind of self-reflection shows wisdom and emotional maturity. I'm here to accompany you on this journey of self-discovery. What's been on your mind as you've been reflecting?`
  };

  return greetings[emotion.toLowerCase()] || 
    `Hello, I'm your emotional support guru, and I'm here for you. Thank you for sharing your feelings with me - it takes courage to be vulnerable. I can sense that you're going through something meaningful right now, and I want you to know that whatever you're feeling is completely valid. I'm here to listen, understand, and support you. What would you like to share with me about how you're feeling today?`;
}

export function getFallbackMessage(emotion: string): string {
  const messages = [
    `I can sense you're feeling ${emotion} right now. Your feelings are completely valid and important.`,
    `Thank you for sharing that you're feeling ${emotion}. It takes courage to be vulnerable about our emotions.`,
    `I hear that you're experiencing ${emotion} feelings. You're not alone in this journey.`,
    `Your ${emotion} feelings deserve to be acknowledged and understood. I'm here to listen.`,
    `Feeling ${emotion} is part of the human experience. Your emotions matter and so do you.`
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
}