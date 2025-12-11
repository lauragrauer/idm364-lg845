import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://igweiigbzktxrbkplbps.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlnd2VpaWdiemt0eHJia3BsYnBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MzA2MzQsImV4cCI6MjA4MTAwNjYzNH0.0XfZKSPbSfJdMIZhh2eYzUXu1LWGWWhfa6zFVQ5RtgU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);