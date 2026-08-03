import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  tech: string[];
  live_url: string | null;
  repo_url: string | null;
  featured: boolean;
  display_order: number;
  created_at: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string | null;
  display_order: number;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
};
