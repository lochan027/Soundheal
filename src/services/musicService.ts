export function getSongRecommendation(emotion: string): { song: string; artist: string } {
  const songMap: Record<string, { song: string; artist: string }[]> = {
    sad: [
      { song: "The Night We Met", artist: "Lord Huron" },
      { song: "Hurt", artist: "Johnny Cash" },
      { song: "Mad World", artist: "Gary Jules" },
      { song: "Black", artist: "Pearl Jam" }
    ],
    angry: [
      { song: "Breathe Me", artist: "Sia" },
      { song: "Heavy", artist: "Linkin Park ft. Kiiara" },
      { song: "Scream", artist: "Usher" },
      { song: "Break Stuff", artist: "Limp Bizkit" }
    ],
    anxious: [
      { song: "Weightless", artist: "Marconi Union" },
      { song: "Clair de Lune", artist: "Claude Debussy" },
      { song: "Aqueous Transmission", artist: "Incubus" },
      { song: "Mad About You", artist: "Sting" }
    ],
    excited: [
      { song: "Good as Hell", artist: "Lizzo" },
      { song: "Can't Stop the Feeling", artist: "Justin Timberlake" },
      { song: "Happy", artist: "Pharrell Williams" },
      { song: "Walking on Sunshine", artist: "Katrina and the Waves" }
    ],
    exhausted: [
      { song: "Weightless", artist: "Marconi Union" },
      { song: "River", artist: "Joni Mitchell" },
      { song: "The Sound of Silence", artist: "Simon & Garfunkel" },
      { song: "Holocene", artist: "Bon Iver" }
    ],
    confused: [
      { song: "Lost in the Light", artist: "Bahamas" },
      { song: "The Middle", artist: "Jimmy Eat World" },
      { song: "Unwritten", artist: "Natasha Bedingfield" },
      { song: "Learning to Fly", artist: "Tom Petty" }
    ],
    grateful: [
      { song: "Count on Me", artist: "Bruno Mars" },
      { song: "Three Little Birds", artist: "Bob Marley" },
      { song: "What a Wonderful World", artist: "Louis Armstrong" },
      { song: "Grateful", artist: "Rita Ora" }
    ],
    lonely: [
      { song: "The Sound of Silence", artist: "Disturbed" },
      { song: "Alone", artist: "Heart" },
      { song: "Mad World", artist: "Tears for Fears" },
      { song: "Eleanor Rigby", artist: "The Beatles" }
    ],
    hopeful: [
      { song: "Here Comes the Sun", artist: "The Beatles" },
      { song: "Three Little Birds", artist: "Bob Marley" },
      { song: "Don't Stop Believin'", artist: "Journey" },
      { song: "Stronger", artist: "Kelly Clarkson" }
    ],
    reflective: [
      { song: "Here Comes the Sun", artist: "The Beatles" },
      { song: "The Long and Winding Road", artist: "The Beatles" },
      { song: "Mad World", artist: "Gary Jules" },
      { song: "Hallelujah", artist: "Jeff Buckley" }
    ]
  };

  const songs = songMap[emotion.toLowerCase()] || songMap.reflective;
  return songs[Math.floor(Math.random() * songs.length)];
}

export function getYouTubeSearchUrl(song: string, artist: string): string {
  const query = encodeURIComponent(`${song} ${artist}`);
  return `https://www.youtube.com/results?search_query=${query}`;
}