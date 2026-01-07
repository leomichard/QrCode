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

(async () => {
    await inject("#site-header", "partials/header.html");
    await inject("#site-footer", "partials/footer.html");
    setActiveNav();
})();

function applyVisibilityRules() {
    const state = AppState.get();
    const { isLoggedIn, role } = state.session;

    // Elements That Require Login
    document.querySelectorAll("[data-auth='required']").forEach(el => {
        el.style.display = isLoggedIn ? "" : "none";
    });

    // Elements Visible Only When Logged Out
    document.querySelectorAll("[data-auth='guest']").forEach(el => {
        el.style.display = isLoggedIn ? "none" : "";
    });

    // Elements Visible Only To A Specific Role
    document.querySelectorAll("[data-role]").forEach(el => {
        const allowed = el.getAttribute("data-role");
        el.style.display = (isLoggedIn && role === allowed) ? "" : "none";
    });

    // Optional: Show Current Role In Header (If You Add A Placeholder)
    const roleEl = document.querySelector("[data-session-role]");
    if (roleEl) roleEl.textContent = role === "owner" ? "Owner" : "Mechanic";
}

(async () => {
    await inject("#site-header", "partials/header.html");
    await inject("#site-footer", "partials/footer.html");
    setActiveNav();

    // Apply Role/Login Rules After Header/Footer Are Injected
    applyVisibilityRules();
})();
