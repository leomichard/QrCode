// assets/app-api.js


async function getMyProfile() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) return null;

    const { data } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

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

async function getShopTotal() {
    const { data, error } = await supabaseClient.from("v_shop_total").select("*").single();
    if (error) return null;
    return data;
}

async function listPublicPromotions() {
    const { data, error } = await supabaseClient
        .from("promotions")
        .select("id, title, description, image_url, created_at, required_points, is_published")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
}

async function listRedemptionsForMyWorkshop() {
    const { data, error } = await supabaseClient
        .from("promotion_redemptions")
        .select("promotion_id");

    if (error) return [];
    return data.map(x => x.promotion_id);
}

async function redeemPromotion(promoId) {
    const { data, error } = await supabaseClient.rpc("redeem_promotion", { promo_id: promoId });
    if (error) throw error;
    return data;
}

async function renderPromotionsSpendBased(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const profile = await getMyProfile(); // null if guest
    const promos = await listPublicPromotions();

    let balance = 0;
    let redeemedIds = [];

    if (profile) {
        const shop = await getShopTotal();
        balance = Number(shop?.shop_points_balance ?? 0);
        redeemedIds = await listRedemptionsForMyWorkshop();
    }

    const canRedeem = profile && (profile.role === "Owner" || profile.role === "Admin");

    container.innerHTML = promos.map(p => {
        const cost = Number(p.required_points ?? 0);
        const isUnlocked = profile ? redeemedIds.includes(p.id) : false;
        const isAvailable = profile ? (!isUnlocked && balance >= cost) : false;

        let badgeHtml = `<span class="ty-caption px-3 py-1 rounded-full border" style="background:#fff;border-color:#B7CBD3;color:#374649;">Locked • Costs ${cost} Points</span>`;
        if (isUnlocked) badgeHtml = `<span class="ty-caption px-3 py-1 rounded-full" style="background:#374649;color:#fff;">Unlocked</span>`;
        else if (isAvailable) badgeHtml = `<span class="ty-caption px-3 py-1 rounded-full border" style="background:#fff;border-color:#B7CBD3;color:#374649;">Available • Costs ${cost} Points</span>`;

        const btnHtml = (canRedeem && isAvailable)
            ? `<button class="btn-primary px-4 py-2 rounded-xl ty-subtitle-2" data-redeem="${p.id}" data-cost="${cost}">Redeem</button>`
            : ``;

        return `
      <article class="card overflow-hidden">
        <div class="aspect-[16/10] bg-slate-100">
          <img src="${p.image_url}" alt="${p.title}" class="w-full h-full object-cover">
        </div>
        <div class="p-5">
          <div class="flex items-start justify-between gap-3">
            <h3 class="ty-subtitle-1">${p.title}</h3>
            ${badgeHtml}
          </div>
          <p class="ty-body-2 mt-2 text-slate-600">${p.description}</p>

          <div class="mt-4 flex items-center justify-between gap-3">
            <p class="ty-caption text-slate-500">Shop Balance: ${profile ? balance : 0} Points</p>
            ${btnHtml}
          </div>
        </div>
      </article>
    `;
    }).join("");

    // Bind redeem buttons
    container.querySelectorAll("[data-redeem]").forEach(btn => {
        btn.addEventListener("click", async () => {
            const promoId = btn.getAttribute("data-redeem");
            const cost = btn.getAttribute("data-cost");

            try {
                const res = await redeemPromotion(promoId);
                if (!res.ok) {
                    alert(res.error || "Redeem Failed.");
                    return;
                }
                alert(`Promotion Unlocked. Points Spent: ${cost}`);
                await renderPromotionsSpendBased(containerSelector);
            } catch (e) {
                alert(e.message || "Redeem Failed.");
            }
        });
    });
}