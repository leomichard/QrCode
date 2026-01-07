/* docs/assets/include.js */

const STORAGE = {
    user: "quartz_user",
    promotions: "quartz_promotions",
    stats: "quartz_stats"
};

function nowIso() {
    return new Date().toISOString();
}

function readJson(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function seedIfNeeded() {
    const user = readJson(STORAGE.user, null);
    if (!user) {
        writeJson(STORAGE.user, {
            isLoggedIn: false,
            role: "Guest", // Guest | Owner | Mechanic
            name: "Guest",
            email: "",
            workshopName: "Quartz Garage"
        });
    }

    const promos = readJson(STORAGE.promotions, null);
    if (!promos) {
        writeJson(STORAGE.promotions, [
            {
                id: crypto.randomUUID(),
                title: "Winter Oil Change Offer",
                description: "Get A Discount On Premium Quartz Oil Change This Week.",
                imageUrl: "https://picsum.photos/seed/quartzpromo1/800/500",
                createdAt: nowIso()
            },
            {
                id: crypto.randomUUID(),
                title: "Brake Check Bonus Points",
                description: "Scan A QR After A Brake Check And Earn Extra Points.",
                imageUrl: "https://picsum.photos/seed/quartzpromo2/800/500",
                createdAt: nowIso()
            }
        ]);
    }

    const stats = readJson(STORAGE.stats, null);
    if (!stats) {
        writeJson(STORAGE.stats, {
            workshopName: "Quartz Garage",
            pointsPerScan: 10,
            shop: {
                totalScans: 60,
                totalPoints: 600
            },
            mechanics: [
                {
                    id: "m1",
                    name: "Mechanic 1",
                    email: "mec1@garage.com",
                    scans: 25,
                    points: 250,
                    history: [
                        { at: "2026-01-06T10:15:00.000Z", qrId: "15020", points: 10, note: "QR Scanned" },
                        { at: "2026-01-06T12:20:00.000Z", qrId: "15021", points: 10, note: "QR Scanned" }
                    ]
                },
                {
                    id: "m2",
                    name: "Mechanic 2",
                    email: "mec2@garage.com",
                    scans: 35,
                    points: 350,
                    history: [
                        { at: "2026-01-05T09:00:00.000Z", qrId: "15018", points: 10, note: "QR Scanned" }
                    ]
                }
            ]
        });
    }
}

async function inject(selector, url) {
    const el = document.querySelector(selector);
    if (!el) return;
    const res = await fetch(url);
    el.innerHTML = await res.text();
}

function setActiveNav() {
    const current = document.body.getAttribute("data-page");
    if (!current) return;
    const link = document.querySelector(`[data-nav="${current}"]`);
    if (link) {
        link.classList.add("bg-white", "shadow-sm", "border", "border-slate-200");
    }
}

function applyAuthUi() {
    const user = readJson(STORAGE.user, null);
    const role = user?.role || "Guest";
    const isLoggedIn = !!user?.isLoggedIn;

    // Elements toggled by role
    document.querySelectorAll("[data-owner-only]").forEach(el => {
        el.style.display = (role === "Owner" && isLoggedIn) ? "" : "none";
    });

    document.querySelectorAll("[data-auth-only]").forEach(el => {
        el.style.display = isLoggedIn ? "" : "none";
    });

    document.querySelectorAll("[data-guest-only]").forEach(el => {
        el.style.display = !isLoggedIn ? "" : "none";
    });

    // User label (optional)
    const roleLabel = document.querySelector("[data-role-label]");
    if (roleLabel) roleLabel.textContent = isLoggedIn ? `${user.name} (${role})` : "Guest";

    // Demo Switchers
    const toOwner = document.querySelector("[data-demo-owner]");
    const toMechanic = document.querySelector("[data-demo-mechanic]");
    const toGuest = document.querySelector("[data-demo-guest]");
    const logout = document.querySelector("[data-demo-logout]");

    if (toOwner) toOwner.onclick = () => {
        writeJson(STORAGE.user, { isLoggedIn: true, role: "Owner", name: "Shop Owner", email: "owner@garage.com", workshopName: "Quartz Garage" });
        location.reload();
    };

    if (toMechanic) toMechanic.onclick = () => {
        writeJson(STORAGE.user, { isLoggedIn: true, role: "Mechanic", name: "Mechanic 1", email: "mec1@garage.com", workshopName: "Quartz Garage" });
        location.reload();
    };

    if (toGuest) toGuest.onclick = () => {
        writeJson(STORAGE.user, { isLoggedIn: false, role: "Guest", name: "Guest", email: "", workshopName: "Quartz Garage" });
        location.reload();
    };

    if (logout) logout.onclick = () => {
        writeJson(STORAGE.user, { isLoggedIn: false, role: "Guest", name: "Guest", email: "", workshopName: "Quartz Garage" });
        location.href = "index.html";
    };
}

function renderPromotions(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const promos = readJson(STORAGE.promotions, []);
    const html = promos
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(p => `
      <article class="card overflow-hidden">
        <div class="aspect-[16/10] bg-slate-100">
          <img src="${p.imageUrl}" alt="${p.title}" class="w-full h-full object-cover">
        </div>
        <div class="p-5">
          <h3 class="ty-subtitle-1">${p.title}</h3>
          <p class="ty-body-2 mt-2 text-slate-600">${p.description}</p>
          <p class="ty-caption mt-3 text-slate-500">Published On ${new Date(p.createdAt).toLocaleDateString()}</p>
        </div>
      </article>
    `)
        .join("");

    container.innerHTML = html || `<div class="ty-body-2 text-slate-600">No Promotions Available.</div>`;
}

function bindPromotionCreator(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = form.querySelector('[name="title"]').value.trim();
        const description = form.querySelector('[name="description"]').value.trim();
        const imageUrl = form.querySelector('[name="imageUrl"]').value.trim();

        if (!title || !description || !imageUrl) {
            alert("Please Fill In Title, Description, And Image Url.");
            return;
        }

        const promos = readJson(STORAGE.promotions, []);
        promos.unshift({
            id: crypto.randomUUID(),
            title,
            description,
            imageUrl,
            createdAt: nowIso()
        });
        writeJson(STORAGE.promotions, promos);

        form.reset();
        renderPromotions("[data-promotions-grid]");
    });
}

function renderPointsDashboard() {
    const wrap = document.querySelector("[data-points-area]");
    if (!wrap) return;

    const user = readJson(STORAGE.user, null);
    const stats = readJson(STORAGE.stats, null);
    if (!user || !stats) return;

    const isLoggedIn = !!user.isLoggedIn;
    const role = user.role;

    if (!isLoggedIn) {
        wrap.innerHTML = `
      <div class="card p-6">
        <h3 class="ty-subtitle-1">Points History</h3>
        <p class="ty-body-2 mt-2 text-slate-600">Sign In To See Your Points And QR Scan History.</p>
      </div>
    `;
        return;
    }

    if (role === "Owner") {
        const rows = stats.mechanics
            .slice()
            .sort((a, b) => b.points - a.points)
            .map(m => `
        <tr class="border-t border-slate-200">
          <td class="p-4 ty-body-2 font-medium">${m.name}</td>
          <td class="p-4 ty-body-2 text-slate-600">${m.email}</td>
          <td class="p-4 ty-body-2 text-slate-600">${m.scans}</td>
          <td class="p-4 ty-body-2 text-slate-600">${m.points}</td>
        </tr>
      `)
            .join("");

        wrap.innerHTML = `
      <div class="grid lg:grid-cols-3 gap-6">
        <div class="card p-6">
          <div class="ty-caption text-slate-500">Shop Total Scans</div>
          <div class="ty-keyfigure mt-2">${stats.shop.totalScans}</div>
          <div class="ty-caption mt-2 text-slate-500">Points Per Scan: ${stats.pointsPerScan}</div>
        </div>

        <div class="card p-6">
          <div class="ty-caption text-slate-500">Shop Total Points</div>
          <div class="ty-keyfigure mt-2">${stats.shop.totalPoints}</div>
          <div class="ty-caption mt-2 text-slate-500">All Mechanics Combined</div>
        </div>

        <div class="card p-6">
          <div class="ty-caption text-slate-500">Top Mechanic</div>
          <div class="ty-keyfigure mt-2">${stats.mechanics[0]?.points ?? 0}</div>
          <div class="ty-body-2 mt-2 text-slate-600">${stats.mechanics[0]?.name ?? "N/A"}</div>
        </div>
      </div>

      <div class="card overflow-hidden mt-6">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div class="ty-subtitle-1">Points By Mechanic</div>
            <div class="ty-caption text-slate-500 mt-1">Owner View (Shop Level)</div>
          </div>
        </div>

        <div class="overflow-x-auto bg-white">
          <table class="min-w-full text-left">
            <thead class="bg-slate-50">
              <tr>
                <th class="p-4 ty-caption text-slate-500">Name</th>
                <th class="p-4 ty-caption text-slate-500">Email</th>
                <th class="p-4 ty-caption text-slate-500">Scans</th>
                <th class="p-4 ty-caption text-slate-500">Points</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    `;
    }

    if (role === "Mechanic") {
        const mech = stats.mechanics.find(m => m.email.toLowerCase() === (user.email || "").toLowerCase()) || stats.mechanics[0];
        const history = (mech?.history || [])
            .slice()
            .sort((a, b) => new Date(b.at) - new Date(a.at))
            .slice(0, 10)
            .map(h => `
        <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <div class="ty-subtitle-2">QR #${h.qrId}</div>
            <div class="ty-caption text-slate-500 mt-1">${new Date(h.at).toLocaleString()}</div>
          </div>
          <div class="text-right">
            <div class="ty-subtitle-2">${h.points} Points</div>
            <div class="ty-caption text-slate-500 mt-1">${h.note}</div>
          </div>
        </div>
      `)
            .join("");

        wrap.innerHTML = `
      <div class="grid md:grid-cols-3 gap-6">
        <div class="card p-6">
          <div class="ty-caption text-slate-500">My Total Scans</div>
          <div class="ty-keyfigure mt-2">${mech?.scans ?? 0}</div>
        </div>

        <div class="card p-6">
          <div class="ty-caption text-slate-500">My Total Points</div>
          <div class="ty-keyfigure mt-2">${mech?.points ?? 0}</div>
        </div>

        <div class="card p-6">
          <div class="ty-caption text-slate-500">Points Per Scan</div>
          <div class="ty-keyfigure mt-2">${stats.pointsPerScan}</div>
        </div>
      </div>

      <div class="card p-6 mt-6">
        <div class="ty-subtitle-1">My Points History</div>
        <p class="ty-caption text-slate-500 mt-1">Mechanic View (Personal Only)</p>

        <div class="mt-4 space-y-3">
          ${history || `<div class="ty-body-2 text-slate-600">No History Yet.</div>`}
        </div>
      </div>
    `;
    }
}

function bindDemoScanAward(buttonSelector) {
    const btn = document.querySelector(buttonSelector);
    if (!btn) return;

    btn.addEventListener("click", () => {
        const user = readJson(STORAGE.user, null);
        const stats = readJson(STORAGE.stats, null);
        if (!user?.isLoggedIn) {
            alert("Please Sign In First.");
            return;
        }
        if (!stats) return;

        const points = stats.pointsPerScan || 10;
        const qrId = Math.floor(15000 + Math.random() * 999).toString();

        stats.shop.totalScans += 1;
        stats.shop.totalPoints += points;

        if (user.role === "Mechanic") {
            const mech = stats.mechanics.find(m => m.email.toLowerCase() === user.email.toLowerCase());
            if (mech) {
                mech.scans += 1;
                mech.points += points;
                mech.history.unshift({ at: nowIso(), qrId, points, note: "QR Scanned" });
            }
        } else if (user.role === "Owner") {
            // Owner can still simulate by attributing to first mechanic
            const mech = stats.mechanics[0];
            mech.scans += 1;
            mech.points += points;
            mech.history.unshift({ at: nowIso(), qrId, points, note: "QR Scanned (Assigned)" });
        }

        writeJson(STORAGE.stats, stats);
        alert(`Scan Recorded. +${points} Points.`);
    });
}

(async () => {
    seedIfNeeded();

    await inject("#site-header", "partials/header.html");
    await inject("#site-footer", "partials/footer.html");

    setActiveNav();
    applyAuthUi();

    // Promotions (Public + Dashboard)
    renderPromotions("[data-promotions-grid]");
    bindPromotionCreator("[data-promo-form]");

    // Points Dashboard Section
    renderPointsDashboard();

    // Scan Result Demo Action
    bindDemoScanAward("[data-demo-award]");
})();
