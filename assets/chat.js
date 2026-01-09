document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('chat-toggle');
    const box = document.getElementById('chat-box');
    const input = document.getElementById('chat-input');
    const send = document.getElementById('chat-send');
    const messages = document.getElementById('chat-messages');

    toggle.addEventListener('click', () => {
        box.style.display = box.style.display === 'none' ? 'flex' : 'none';
    });

    async function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        messages.innerHTML += `<div style="margin-bottom:8px;text-align:right;"><span style="background:#0066cc;color:white;padding:6px 10px;border-radius:12px;display:inline-block;">${text}</span></div>`;
        input.value = '';

        try {
            const res = await fetch('https://eagqsyunshkveofnpcxb.supabase.co/functions/v1/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhZ3FzeXVuc2hrdmVvZm5wY3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3ODQ2NTEsImV4cCI6MjA4MzM2MDY1MX0.U_p8xJAA4yKZO3P1x32csnlFcRnX1_xuR85mIyTRak4'
                },
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();
            const reply = data.choices?.[0]?.message?.content || 'Erreur de réponse';
            messages.innerHTML += `<div style="margin-bottom:8px;"><span style="background:#f0f0f0;padding:6px 10px;border-radius:12px;display:inline-block;">${reply}</span></div>`;
        } catch (e) {
            messages.innerHTML += `<div style="color:red;">Erreur de connexion</div>`;
        }
        messages.scrollTop = messages.scrollHeight;
    }

    send.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
});