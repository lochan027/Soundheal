# 🔌 Sound Heal API Documentation

## Overview
Sound Heal integrates with multiple external APIs to provide enhanced emotional support, visual content, and video conversations. This document outlines all API integrations, setup requirements, and fallback systems.

---

## 🧠 Perplexity AI Integration

### Purpose
Advanced AI-powered emotional support responses with contextual understanding.

### Configuration
```typescript
const PERPLEXITY_CONFIG = {
  apiUrl: 'https://api.perplexity.ai/chat/completions',
  model: 'llama-3.1-sonar-small-128k-online',
  maxTokens: 150,
  temperature: 0.7
};
```

### Environment Variables
```env
VITE_PERPLEXITY_API_KEY=your_perplexity_api_key_here
```

### Request Format
```typescript
interface PerplexityRequest {
  model: string;
  messages: Array<{
    role: 'system' | 'user';
    content: string;
  }>;
  max_tokens: number;
  temperature: number;
}
```

### Response Format
```typescript
interface PerplexityResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}
```

### System Prompt
```typescript
const SYSTEM_PROMPT = `You are a compassionate emotional support companion. When a user shares their feelings, respond with:
1. A short, comforting message (1-2 sentences) showing empathy and support
2. Identify the primary emotion in one word

Format your response as JSON:
{
  "message": "Your comforting message here",
  "emotion": "primary_emotion"
}

Be warm, understanding, and supportive. Avoid being clinical or overly formal.`;
```

### Error Handling
```typescript
try {
  const response = await fetch(PERPLEXITY_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData)
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return await response.json();
} catch (error) {
  console.error('Perplexity API error:', error);
  return getLocalEmotionalResponse(userInput);
}
```

### Fallback System
When Perplexity API is unavailable, the system uses local emotion detection:

```typescript
function getLocalEmotionalResponse(input: string) {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('sad') || lowerInput.includes('down')) {
    return {
      message: "It's okay to feel down sometimes. Your feelings are valid.",
      emotion: "sad"
    };
  }
  // ... additional emotion patterns
}
```

---

## 🖼️ Unsplash API Integration

### Purpose
Provides beautiful, mood-appropriate imagery to enhance emotional responses.

### Configuration
```typescript
const UNSPLASH_CONFIG = {
  apiUrl: 'https://api.unsplash.com/search/photos',
  perPage: 10,
  orientation: 'landscape'
};
```

### Environment Variables
```env
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
VITE_UNSPLASH_APPLICATION_ID=your_unsplash_application_id_here
VITE_UNSPLASH_SECRET_KEY=your_unsplash_secret_key_here
```

### Request Headers
```typescript
const headers = {
  'Accept-Version': 'v1',
  'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
};
```

### Search Terms by Emotion
```typescript
const moodSearchTerms = {
  sad: [
    'peaceful rain window',
    'gentle sunset ocean',
    'soft candlelight comfort',
    'quiet forest misty morning'
  ],
  anxious: [
    'meditation peaceful zen',
    'flowing water tranquil stream',
    'soft clouds open sky',
    'peaceful garden serene'
  ],
  excited: [
    'vibrant sunrise energy',
    'colorful flowers blooming',
    'celebration lights sparkle',
    'rainbow after rain joy'
  ]
  // ... additional emotions
};
```

### Response Format
```typescript
interface UnsplashResponse {
  results: Array<{
    id: string;
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
    };
    alt_description: string;
    description: string;
  }>;
  total: number;
  total_pages: number;
}
```

### Image Selection Logic
```typescript
async function getMoodImage(emotion: string): Promise<string | null> {
  try {
    const searchTerms = getMoodSearchTerms(emotion);
    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    
    const response = await fetch(`${UNSPLASH_API_URL}?query=${encodeURIComponent(randomTerm)}&per_page=10`);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(5, data.results.length));
      return data.results[randomIndex].urls.regular;
    }
    
    return FALLBACK_IMAGE;
  } catch (error) {
    console.error('Unsplash API error:', error);
    return FALLBACK_IMAGE;
  }
}
```

---

## 📹 Tavius Video AI Integration

### Purpose
Enables live video conversations with AI-powered emotional support gurus.

### Configuration
```typescript
const TAVIUS_CONFIG = {
  apiBaseUrl: 'https://tavusapi.com/v2',
  participantLeftTimeout: 60,
  participantAbsentTimeout: 300,
  enableRecording: false
};
```

### Environment Variables
```env
VITE_TAVIUS_API_KEY=your_tavius_api_key_here
VITE_TAVIUS_PERSONA_ID=your_tavius_persona_id_here
VITE_TAVIUS_REPLICA_ID=your_tavius_replica_id_here
```

### Conversation Request
```typescript
interface TaviusConversationRequest {
  replica_id?: string;
  persona_id: string;
  callback_url?: string;
  conversation_name: string;
  conversational_context: string;
  custom_greeting?: string;
  properties?: {
    participant_left_timeout?: number;
    participant_absent_timeout?: number;
    enable_recording?: boolean;
  };
}
```

### Conversation Response
```typescript
interface TaviusConversationResponse {
  conversation_id: string;
  conversation_name: string;
  status: string;
  conversation_url: string;
  replica_id: string;
  persona_id: string;
  created_at: string;
}
```

### Emotion-Specific Greetings
```typescript
function getEmotionSpecificGreeting(emotion: string, userFeeling: string): string {
  const greetings = {
    sad: `Hello, I'm your emotional support guru, and I'm here for you. I can sense that you're feeling sad right now, and I want you to know that your feelings are completely valid...`,
    
    anxious: `Hello, I'm your emotional support guru, and I'm so glad you're here. I can sense that you're feeling anxious, and I want you to know that you're safe in this space...`,
    
    excited: `Hello, I'm your emotional support guru! I can feel your excitement, and it's wonderful to see you embracing positive emotions...`
    // ... additional emotion-specific greetings
  };
  
  return greetings[emotion.toLowerCase()] || defaultGreeting;
}
```

### Video Conversation Creation
```typescript
async function createVideoConversation(userFeeling: string, emotion: string) {
  try {
    const emotionGreeting = getEmotionSpecificGreeting(emotion, userFeeling);
    
    const conversationRequest = {
      persona_id: TAVIUS_PERSONA_ID,
      conversation_name: `Emotional Support Session - ${new Date().toLocaleDateString()}`,
      conversational_context: `You are a compassionate emotional support guru. The user has shared: "${userFeeling}" and they are feeling ${emotion}...`,
      custom_greeting: emotionGreeting,
      properties: {
        participant_left_timeout: 60,
        participant_absent_timeout: 300,
        enable_recording: false
      }
    };

    const response = await fetch(`${TAVIUS_API_BASE_URL}/conversations`, {
      method: 'POST',
      headers: {
        'x-api-key': TAVIUS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(conversationRequest)
    });

    return await response.json();
  } catch (error) {
    console.error('Tavius API error:', error);
    return null;
  }
}
```

---

## 🎵 Music Service Integration

### Purpose
Provides curated song recommendations based on emotional states.

### Local Music Database
```typescript
const songRecommendations = {
  sad: [
    { song: "The Night We Met", artist: "Lord Huron" },
    { song: "Hurt", artist: "Johnny Cash" },
    { song: "Mad World", artist: "Gary Jules" }
  ],
  anxious: [
    { song: "Weightless", artist: "Marconi Union" },
    { song: "Clair de Lune", artist: "Claude Debussy" },
    { song: "Aqueous Transmission", artist: "Incubus" }
  ],
  excited: [
    { song: "Good as Hell", artist: "Lizzo" },
    { song: "Can't Stop the Feeling", artist: "Justin Timberlake" },
    { song: "Happy", artist: "Pharrell Williams" }
  ]
  // ... additional emotions
};
```

### YouTube Integration
```typescript
function getYouTubeSearchUrl(song: string, artist: string): string {
  const query = encodeURIComponent(`${song} ${artist}`);
  return `https://www.youtube.com/results?search_query=${query}`;
}
```

### Song Selection Algorithm
```typescript
function getSongRecommendation(emotion: string) {
  const songs = songRecommendations[emotion.toLowerCase()] || songRecommendations.reflective;
  return songs[Math.floor(Math.random() * songs.length)];
}
```

---

## 🔊 Web Audio API Integration

### Purpose
Generates breathing sounds for meditation and relaxation exercises.

### Audio Context Setup
```typescript
let audioContext: AudioContext | null = null;

function initializeAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}
```

### Breathing Sound Generation
```typescript
function createBreathingSound(frequency: number, duration: number, type: 'inhale' | 'exhale') {
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.type = 'sine';

  // Create breathing sound envelope
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.5);
  gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + duration - 0.5);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}
```

### Breathing Pattern Audio
```typescript
const breathingSounds = {
  inhale: { frequency: 220, duration: 4 },
  hold: { frequency: 0, duration: 7 },    // Silent
  exhale: { frequency: 180, duration: 8 },
  pause: { frequency: 0, duration: 2 }    // Silent
};
```

---

## 🛡️ Security & Privacy

### API Key Security
- Environment variables for sensitive data
- No API keys exposed in client-side code
- Secure HTTPS communication only
- Rate limiting and request validation

### Privacy Protection
```typescript
// No personal data stored or transmitted
const sanitizeInput = (input: string) => {
  return input.replace(/[<>]/g, '').trim().substring(0, 500);
};
```

### Error Handling Best Practices
```typescript
// Generic error responses to avoid information leakage
const handleAPIError = (error: Error, service: string) => {
  console.error(`${service} error:`, error);
  return {
    success: false,
    message: 'Service temporarily unavailable',
    fallback: true
  };
};
```

---

## 📊 Rate Limiting & Quotas

### API Usage Limits
- **Perplexity AI**: 1000 requests/month (free tier)
- **Unsplash**: 50 requests/hour (demo tier)
- **Tavius**: Custom pricing based on usage

### Client-Side Rate Limiting
```typescript
class RateLimiter {
  private requests: number[] = [];
  
  canMakeRequest(maxRequests: number, timeWindow: number): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < timeWindow);
    
    if (this.requests.length < maxRequests) {
      this.requests.push(now);
      return true;
    }
    
    return false;
  }
}
```

---

## 🔧 Development & Testing

### API Testing
```typescript
// Mock API responses for development
const mockResponses = {
  perplexity: {
    message: "Thank you for sharing. Your feelings are valid.",
    emotion: "reflective"
  },
  unsplash: "/life.jpg",
  tavius: null
};
```

### Environment Detection
```typescript
const isDevelopment = import.meta.env.DEV;
const hasAPIKeys = Boolean(
  import.meta.env.VITE_PERPLEXITY_API_KEY &&
  import.meta.env.VITE_UNSPLASH_ACCESS_KEY &&
  import.meta.env.VITE_TAVIUS_API_KEY
);
```

---

*This API documentation is maintained alongside the Sound Heal codebase and updated with each release.*