// assets/app-api.js

async function getMyProfile() {
    if (!window.appState.session) await refreshSession();
    const session = window.appState.session;
    if (!session) return null;

    const { data, error } = await supabaseClient
        .from("profiles")
        .select("id, role, full_name, workshop_id")
        .eq("id", session.user.id)
        .single();

    if (error) return null;
    window.appState.profile = data;
    return data;
}

// Promotions (public)
async function listPublicPromotions() {
    const { data, error } = await supabaseClient
        .from("promotions")
        .select("id, title, description, image_url, created_at, is_published, required_points")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
}

// Promotions (Owner/Admin)
async function createPromotion({ title, description, imageUrl, requiredPoints = 0, workshopId = null }) {
    const profile = await getMyProfile();
    if (!profile) throw new Error("Not Signed In.");

    const payload = {
        title,
        description,
        image_url: imageUrl,
        required_points: Number(requiredPoints) || 0,
        is_published: true,
        workshop_id: workshopId,       // Admin can set null for global, Owner should set their workshop_id
        created_by: profile.id
    };

    const { data, error } = await supabaseClient
        .from("promotions")
        .insert(payload)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// QR Scan Consume
async function consumeQrToken(rawToken) {
    const { data, error } = await supabaseClient.rpc("consume_qr", { raw_token: rawToken });
    if (error) throw error;
    return data;
}

// Points views
async function getMyPoints() {
    const { data, error } = await supabaseClient.from("v_my_points").select("*").single();
    if (error) return null;
    return data;
}

async function getShopTotal() {
    const { data, error } = await supabaseClient.from("v_shop_total").select("*").single();
    if (error) return null;
    return data;
}

async function getShopByMechanic() {
    const { data, error } = await supabaseClient.from("v_shop_by_mechanic").select("*");
    if (error) return [];
    return data || [];
}

// UI rendering helpers
function renderPromotions(containerSelector, promos, shopPoints = 0) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const points = Number(shopPoints || 0);

    container.innerHTML = promos.map(p => {
        const required = Number(p.required_points || 0);
        const unlocked = points >= required;
        const badge = unlocked
            ? `<span class="badge badge-solid ty-caption">Unlocked</span>`
            : `<span class="badge ty-caption">Locked • Requires ${required} Points</span>`;

        return `
      <article class="card overflow-hidden">
        <div style="aspect-ratio:16/10;background:#F7F9FA;">
          <img src="${p.image_url}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <div style="padding:18px;">
          <div style="display:flex;gap:12px;align-items:flex-start;justify-content:space-between;">
            <h3 class="ty-subtitle-1">${p.title}</h3>
            ${badge}
          </div>
          <p class="ty-body-2" style="margin-top:8px;color:#55666A;">${p.description}</p>
          <p class="ty-caption" style="margin-top:10px;color:#7A8C92;">
            Published On ${new Date(p.created_at).toLocaleDateString()}
          </p>
        </div>
      </article>
    `;
    }).join("");
}
