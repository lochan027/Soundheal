export interface EmotionalResponse {
  message: string;
  emotion: string;
  song: string;
  artist: string;
  image?: string;
}

export interface PerplexityResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export interface UnsplashResponse {
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

export interface TaviusConversationResponse {
  conversation_id: string;
  conversation_name: string;
  status: string;
  conversation_url: string;
  replica_id: string;
  persona_id: string;
  created_at: string;
}

export interface TaviusConversationRequest {
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