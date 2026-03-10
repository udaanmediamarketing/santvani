export interface Organization {
  id: string;
  org_name: string;
  org_type?: string | null;
  head_name: string;
  city: string;
  state: string;
  created_at: string;
  image_url?: string | null;
  youtube_url?: string | null;
}