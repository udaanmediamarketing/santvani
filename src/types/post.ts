export interface Post {
  id: string;           // frontend normalized ID
  title: string;
  content?: string;
  image_url?: string;
  youtube_url?: string;
  category?: string;
  created_at?: string;
  slug?: string;
}