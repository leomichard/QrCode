const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY')

  return new Response(JSON.stringify({ googleApiKey: GOOGLE_API_KEY }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
})