// docs/assets/app-api.js

async function getSession() {
    const { data } = await window.supabaseClient.auth.getSession();
    return data.session;
}

async function getMyProfile() {
    const session = await getSession();
    if (!session) return null;

    const { data, error } = await window.supabaseClient
        .from("profiles")
        .select("id, role, full_name, workshop_id")
        .eq("id", session.user.id)
        .single();

    if (error) return null;
    return data;
}

async function listPublicPromotions() {
    const { data, error } = await window.supabaseClient
        .from("promotions")
        .select("id, title, description, image_url, created_at, is_published")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
}

async function createPromotion({ title, description, imageUrl, workshopId }) {
    const profile = await getMyProfile();
    if (!profile) throw new Error("Not Signed In.");

    // Admin can create global promo (workshopId null) OR for a workshop
    // Owner can only create for their own workshop (RLS enforces)
    const payload = {
        title,
        description,
        image_url: imageUrl,
        is_published: true,
        workshop_id: workshopId ?? profile.workshop_id,
        created_by: profile.id
    };

    const { data, error } = await window.supabaseClient
        .from("promotions")
        .insert(payload)
        .select()
        .single();

    if (error) throw error;
    return data;
}

function renderPromotionsInto(containerSelector, promos) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = promos.map(p => `
    <article class="card overflow-hidden">
      <div class="aspect-[16/10] bg-slate-100">
        <img src="${p.image_url}" alt="${p.title}" class="w-full h-full object-cover">
      </div>
      <div class="p-5">
        <h3 class="ty-subtitle-1">${p.title}</h3>
        <p class="ty-body-2 mt-2 text-slate-600">${p.description}</p>
        <p class="ty-caption mt-3 text-slate-500">Published On ${new Date(p.created_at).toLocaleDateString()}</p>
      </div>
    </article>
  `).join("");
}

// Hook: public promo grids
(async () => {
    const grid = document.querySelector("[data-promotions-grid]");
    if (!grid) return;

    const promos = await listPublicPromotions();
    renderPromotionsInto("[data-promotions-grid]", promos);
})();
