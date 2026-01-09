const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      }

      Deno.serve(async (req) => {
        if (req.method === 'OPTIONS') {
          return new Response('ok', { headers: corsHeaders })
        }

        const url = new URL(req.url)

        // Route pour récupérer la clé Google Maps
        if (url.pathname.endsWith('/config') || req.method === 'GET') {
          const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY')
          return new Response(JSON.stringify({ googleApiKey: GOOGLE_API_KEY }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

        // Route pour le chatbot
        if (req.method !== 'POST') {
          return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

        try {
          const { message } = await req.json()
          const MISTRAL_API_KEY = Deno.env.get('TOTALQRCODE')

          const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${MISTRAL_API_KEY}`
            },
            body: JSON.stringify({
              model: 'mistral-small-latest',
              messages: [
                { role: 'system', content: 'Tu es un assistant pour Quartz QR.' },
                { role: 'user', content: message }
              ]
            })
          })

          const data = await response.json()
          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        } catch (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }
      })