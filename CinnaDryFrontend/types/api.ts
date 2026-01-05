export interface ApiResponse {
  condition: string;
  confidence: number;
  is_optimal: 'yes' | 'no';
  timestamp: string;
  image_saved_as?: string;
  error?: string;
}