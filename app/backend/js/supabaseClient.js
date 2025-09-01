// backend/js/supabaseClient.js
// Lightweight Supabase client used across your frontend pages.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ⬇️ Replace these with your actual values from Supabase → Settings → API
const SUPABASE_URL = 'https://vafngxlkgcgtgfoaqofn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhZm5neGxrZ2NndGdmb2Fxb2ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MTg4MjQsImV4cCI6MjA3MTI5NDgyNH0.1ZvV3ffyT4b5Ro1Xet2hYqtSyz_3P-7p5r3lv3sGrPI';

// Create a single shared client for the app
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Optional sanity ping you can call from any page:
export async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) console.error('Supabase session error:', error);
  return session ?? null;
}
