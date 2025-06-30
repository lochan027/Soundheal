import { PerplexityResponse } from '../types';

const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

export async function getEmotionalSupport(userInput: string): Promise<{ message: string; emotion: string }> {
  if (!PERPLEXITY_API_KEY) {
    // Fallback to local responses if API key is not available
    return getLocalEmotionalResponse(userInput);
  }

  try {
    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: `You are a compassionate emotional support companion. When a user shares their feelings, respond with:
1. A short, comforting message (1-2 sentences) showing empathy and support
2. Identify the primary emotion in one word (sad, angry, anxious, excited, confused, grateful, lonely, stressed, hopeful, etc.)

Format your response as JSON:
{
  "message": "Your comforting message here",
  "emotion": "primary_emotion"
}

Be warm, understanding, and supportive. Avoid being clinical or overly formal.`
          },
          {
            role: 'user',
            content: userInput
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data: PerplexityResponse = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content in Perplexity response');
    }

    // Try to parse JSON response
    try {
      const parsed = JSON.parse(content);
      return {
        message: parsed.message || "I hear you, and your feelings are completely valid.",
        emotion: parsed.emotion || "reflective"
      };
    } catch {
      // If JSON parsing fails, extract message and emotion manually
      const lines = content.split('\n').filter(line => line.trim());
      return {
        message: lines[0] || "I hear you, and your feelings are completely valid.",
        emotion: "reflective"
      };
    }
  } catch (error) {
    console.error('Perplexity API error:', error);
    return getLocalEmotionalResponse(userInput);
  }
}

function getLocalEmotionalResponse(input: string): { message: string; emotion: string } {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('sad') || lowerInput.includes('down') || lowerInput.includes('depressed') || lowerInput.includes('crying') || lowerInput.includes('lonely')) {
    return {
      message: "It's okay to feel down sometimes. Your feelings are valid, and this difficult moment will pass.",
      emotion: "sad"
    };
  } else if (lowerInput.includes('angry') || lowerInput.includes('mad') || lowerInput.includes('frustrated') || lowerInput.includes('rage')) {
    return {
      message: "Your anger is understandable. Take deep breaths and remember that you have the strength to work through this.",
      emotion: "angry"
    };
  } else if (lowerInput.includes('anxious') || lowerInput.includes('worried') || lowerInput.includes('stressed') || lowerInput.includes('panic') || lowerInput.includes('nervous')) {
    return {
      message: "Anxiety can feel overwhelming, but you're braver than you believe. Take it one breath at a time.",
      emotion: "anxious"
    };
  } else if (lowerInput.includes('excited') || lowerInput.includes('happy') || lowerInput.includes('amazing') || lowerInput.includes('great') || lowerInput.includes('wonderful')) {
    return {
      message: "Your joy is contagious! It's beautiful to see you embracing the good moments in life.",
      emotion: "excited"
    };
  } else if (lowerInput.includes('tired') || lowerInput.includes('exhausted') || lowerInput.includes('drained') || lowerInput.includes('overwhelmed')) {
    return {
      message: "Rest is not a luxury, it's a necessity. Be gentle with yourself and take the time you need to recharge.",
      emotion: "exhausted"
    };
  } else if (lowerInput.includes('confused') || lowerInput.includes('lost') || lowerInput.includes('unsure') || lowerInput.includes('don\'t know')) {
    return {
      message: "Feeling lost is part of the human experience. Trust that clarity will come when you're ready for it.",
      emotion: "confused"
    };
  } else if (lowerInput.includes('grateful') || lowerInput.includes('thankful') || lowerInput.includes('blessed') || lowerInput.includes('appreciate')) {
    return {
      message: "Gratitude is a beautiful way to see the world. Your positive energy makes a difference.",
      emotion: "grateful"
    };
  } else {
    return {
      message: "Thank you for sharing with me. Whatever you're feeling right now is completely valid and important.",
      emotion: "reflective"
    };
  }
}