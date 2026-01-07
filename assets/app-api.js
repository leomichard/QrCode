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
    const { data, error } = await supabaseClient
        .from("promotions")
        .select("id, title, description, image_url, created_at, is_published, required_points")
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

function renderPromotionsInto(containerSelector, promos, shopPoints) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const points = Number(shopPoints ?? 0);

    container.innerHTML = promos.map(p => {
        const required = Number(p.required_points ?? 0);
        const unlocked = points >= required;

        const badge = unlocked
            ? `<span class="ty-caption px-3 py-1 rounded-full" style="background:#374649;color:#fff;">Unlocked</span>`
            : `<span class="ty-caption px-3 py-1 rounded-full border" style="background:#fff;border-color:#B7CBD3;color:#374649;">Locked • Requires ${required} Points</span>`;

        return `
      <article class="card overflow-hidden">
        <div class="aspect-[16/10] bg-slate-100">
          <img src="${p.image_url}" alt="${p.title}" class="w-full h-full object-cover">
        </div>
        <div class="p-5">
          <div class="flex items-start justify-between gap-3">
            <h3 class="ty-subtitle-1">${p.title}</h3>
            ${badge}
          </div>
          <p class="ty-body-2 mt-2 text-slate-600">${p.description}</p>
          <p class="ty-caption mt-3 text-slate-500">Published On ${new Date(p.created_at).toLocaleDateString()}</p>
        </div>
      </article>
    `;
    }).join("");
}


(async () => {
    const grid = document.querySelector("[data-promotions-grid]");
    if (!grid) return;

    const promos = await listPublicPromotions();

    // If not logged in, shopPoints = 0 (so locked unless required_points = 0)
    const shop = await getShopTotal();
    const shopPoints = shop?.shop_points ?? 0;

    renderPromotionsInto("[data-promotions-grid]", promos, shopPoints);
})();


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
    return data;
}

async function consumeQrToken(rawToken) {
    const { data, error } = await supabaseClient.rpc("consume_qr", { raw_token: rawToken });
    if (error) throw error;
    return data;
}
