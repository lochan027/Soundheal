import { UnsplashResponse } from '../types';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const UNSPLASH_APPLICATION_ID = import.meta.env.VITE_UNSPLASH_APPLICATION_ID;

// Fallback image path
const FALLBACK_IMAGE = '/life.jpg';

export async function getMoodImage(emotion: string): Promise<string | null> {
  // If no API keys are available, return fallback image immediately
  if (!UNSPLASH_ACCESS_KEY && !UNSPLASH_APPLICATION_ID) {
    console.log('No Unsplash API keys available, using fallback image');
    return FALLBACK_IMAGE;
  }

  try {
    // Create mood-appropriate search terms
    const searchTerms = getMoodSearchTerms(emotion);
    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    
    const url = `${UNSPLASH_API_URL}?query=${encodeURIComponent(randomTerm)}&per_page=10&orientation=landscape`;
    
    const headers: Record<string, string> = {
      'Accept-Version': 'v1'
    };
    
    // Use Access Key for authorization (preferred method)
    if (UNSPLASH_ACCESS_KEY) {
      headers['Authorization'] = `Client-ID ${UNSPLASH_ACCESS_KEY}`;
    } else if (UNSPLASH_APPLICATION_ID) {
      // Fallback to Application ID if Access Key is not available
      headers['Authorization'] = `Client-ID ${UNSPLASH_APPLICATION_ID}`;
    }
    
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      console.error(`Unsplash API error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      console.log('Using fallback image due to API error');
      return FALLBACK_IMAGE;
    }

    const data: UnsplashResponse = await response.json();
    
    if (data.results && data.results.length > 0) {
      // Get a random image from the results
      const randomIndex = Math.floor(Math.random() * Math.min(5, data.results.length));
      return data.results[randomIndex].urls.regular;
    }
    
    console.warn('No images found in Unsplash API response for emotion:', emotion);
    console.log('Using fallback image due to no results');
    return FALLBACK_IMAGE;
  } catch (error) {
    console.error('Unsplash API error:', error);
    console.log('Using fallback image due to fetch error');
    return FALLBACK_IMAGE;
  }
}

function getMoodSearchTerms(emotion: string): string[] {
  const moodMap: Record<string, string[]> = {
    sad: [
      'peaceful rain window',
      'gentle sunset ocean',
      'soft candlelight comfort',
      'quiet forest misty morning'
    ],
    angry: [
      'storm clouds dramatic sky',
      'powerful ocean waves nature',
      'mountain peak strength',
      'controlled fire fireplace'
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
    ],
    exhausted: [
      'cozy bedroom soft pillows',
      'peaceful hammock breeze',
      'quiet library reading light',
      'spa relaxation calm'
    ],
    confused: [
      'winding forest path',
      'compass map direction',
      'lighthouse fog guidance',
      'crossroads nature choices'
    ],
    grateful: [
      'beautiful sunrise hope',
      'heart shaped clouds',
      'golden hour appreciation',
      'peaceful meadow gratitude'
    ],
    lonely: [
      'single tree field solitude',
      'cozy reading nook peaceful',
      'gentle moonlight reflection',
      'warm coffee self care'
    ],
    hopeful: [
      'sunrise through clouds hope',
      'green shoots new growth',
      'bridge over water forward',
      'open door bright light'
    ],
    reflective: [
      'calm lake mirror reflection',
      'journal pen thoughtful',
      'quiet park bench contemplation',
      'soft morning light gentle'
    ]
  };

  return moodMap[emotion.toLowerCase()] || moodMap.reflective;
}