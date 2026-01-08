// docs/assets/supabase-client.js

const SUPABASE_URL = "https://eagqsyunshkveofnpcxb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhZ3FzeXVuc2hrdmVvZm5wY3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3ODQ2NTEsImV4cCI6MjA4MzM2MDY1MX0.U_p8xJAA4yKZO3P1x32csnlFcRnX1_xuR85mIyTRak4"
window.supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            storage: window.localStorage
        }
    }
);