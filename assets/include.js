// assets/include.js

async function loadPartial(selector, url) {
    const el = document.querySelector(selector);
    if (!el) return;
    const res = await fetch(url, {cache: "no-cache"});
    el.innerHTML = await res.text();
}

async function applyHeaderAuthUi() {
    await refreshSession();
    const profile = await getMyProfile();
    const signedIn = !!window.appState.session;

    document.querySelectorAll("[data-guest-only]").forEach(el => el.style.display = signedIn ? "none" : "");
    document.querySelectorAll("[data-auth-only]").forEach(el => el.style.display = signedIn ? "" : "none");

    const role = profile?.role || null;

    document.querySelectorAll("[data-admin-only]").forEach(el => el.style.display = (role === "Admin") ? "" : "none");
    document.querySelectorAll("[data-owner-only]").forEach(el => el.style.display = (role === "Owner") ? "" : "none");
    document.querySelectorAll("[data-mechanic-only]").forEach(el => el.style.display = (role === "Mechanic") ? "" : "none");

    const who = document.querySelector("[data-whoami]");
    if (who) {
        who.textContent = signedIn
            ? `Signed In As ${profile?.full_name || "User"} (${role || "Role"})`
            : "Not Signed In";
    }

    const logoutBtn = document.querySelector("[data-logout]");
    if (logoutBtn) {
        logoutBtn.onclick = async () => {
            await signOut();
            window.location.href = "login.html";
        };
    }

    // Reset flags first
    document.documentElement.classList.remove("auth-ready", "guest-ready", "owner-ready", "admin-ready");

    if (!isLoggedIn) {
        document.documentElement.classList.add("guest-ready");
        return;
    }

    document.documentElement.classList.add("auth-ready");

    if (role === "Owner") document.documentElement.classList.add("owner-ready");
    if (role === "Admin") document.documentElement.classList.add("admin-ready");

}

async function bootLayout() {
    await loadPartial("#site-header", "partials/header.html");
    await loadPartial("#site-footer", "partials/footer.html");
    await applyHeaderAuthUi();
}

document.addEventListener("DOMContentLoaded", bootLayout);


// Mobile burger menu
const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeBurger = document.getElementById("closeBurger");

if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    });
}

if (closeBurger && mobileMenu) {
    closeBurger.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        document.body.style.overflow = "";
    });
}
// Close mobile menu on link click

document.querySelectorAll("#mobileMenu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        document.body.style.overflow = "";
    });
});

function initMobileMenu() {
    const burgerBtn = document.getElementById("burgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeBurger = document.getElementById("closeBurger");

    if (!burgerBtn || !mobileMenu || !closeBurger) return;

    const openMenu = () => {
        mobileMenu.classList.remove("hidden");
        // Let browser apply display first, then animate
        requestAnimationFrame(() => {
            mobileMenu.classList.add("is-open");
            document.body.style.overflow = "hidden";
        });
    };

    const closeMenu = () => {
        mobileMenu.classList.remove("is-open");
        document.body.style.overflow = "";
        // Wait for animation to end, then hide
        setTimeout(() => mobileMenu.classList.add("hidden"), 250);
    };

    burgerBtn.addEventListener("click", openMenu);
    closeBurger.addEventListener("click", closeMenu);

    // Close when clicking outside panel (overlay area)
    mobileMenu.addEventListener("click", (e) => {
        if (e.target === mobileMenu) closeMenu();
    });

    // Close on link click
    mobileMenu.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", closeMenu);
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) closeMenu();
    });
}