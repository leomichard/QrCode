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

    document.querySelectorAll("[data-guest-only]").forEach(el => {
        if (signedIn) el.classList.remove("is-active");
        el.style.display = signedIn ? "none" : "";
    });

    document.querySelectorAll("[data-auth-only]").forEach(el => {
        if (!signedIn) el.classList.remove("is-active");
        el.style.display = signedIn ? "" : "none";
    });


    const role = profile?.role || null;

    document.querySelectorAll("[data-admin-only]").forEach(el => {
        if (role !== "Admin") el.classList.remove("is-active");
        el.style.display = (role === "Admin") ? "" : "none";
    });

    document.querySelectorAll("[data-owner-only]").forEach(el => {
        if (role !== "Owner") el.classList.remove("is-active");
        el.style.display = (role === "Owner") ? "" : "none";
    });

    document.querySelectorAll("[data-mechanic-only]").forEach(el => {
        if (role !== "Mechanic") el.classList.remove("is-active");
        el.style.display = (role === "Mechanic") ? "" : "none";
    });



    // Clean active state on hidden elements
    document.querySelectorAll(".nav-link.is-active").forEach(el => {
        if (el.style.display === "none") {
            el.classList.remove("is-active");
        }
    });

    const who = document.querySelector("[data-whoami]");
    if (who) {
        who.textContent = signedIn
            ? `Signed In As ${profile?.full_name || "User"} (${role || "Role"})`
            : "Energizing life. Every day.";
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

    if (!signedIn) {
        document.documentElement.classList.add("guest-ready");
        return;
    }

    document.documentElement.classList.add("auth-ready");
    if (role === "Owner") document.documentElement.classList.add("owner-ready");
    if (role === "Admin") document.documentElement.classList.add("admin-ready");
}

function initMobileMenu() {
    const burgerBtn = document.getElementById("burgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeBurger = document.getElementById("closeBurger");

    if (!burgerBtn || !mobileMenu || !closeBurger) return;

    const openMenu = () => {
        mobileMenu.classList.remove("hidden");
        requestAnimationFrame(() => {
            mobileMenu.classList.add("is-open");
            document.body.style.overflow = "hidden";
            document.body.classList.add("menu-open");
        });
    };

    const closeMenu = () => {
        mobileMenu.classList.remove("is-open");
        document.body.style.overflow = "";
        document.body.classList.remove("menu-open");
        setTimeout(() => mobileMenu.classList.add("hidden"), 250);
    };

    burgerBtn.addEventListener("click", openMenu);
    closeBurger.addEventListener("click", closeMenu);

    mobileMenu.addEventListener("click", (e) => {
        if (e.target === mobileMenu) closeMenu();
    });

    mobileMenu.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) closeMenu();
    });
}

async function bootLayout() {
    await loadPartial("#site-header", "partials/header.html");
    await loadPartial("#site-footer", "partials/footer.html");

    // Initialize burger AFTER header is injected
    initMobileMenu();

    // Apply auth UI AFTER header exists too
    await applyHeaderAuthUi();

    // highlight current page
    highlightActiveNavLink();
    hideHomeLinkOnIndex();

}

document.addEventListener("DOMContentLoaded", bootLayout);

function highlightActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-link").forEach(link => {
        const linkPath = link.getAttribute("href");

        if (!linkPath) return;

        if (linkPath === currentPath) {
            link.classList.add("is-active");
        } else {
            link.classList.remove("is-active");
        }
    });
}

function hideHomeLinkOnIndex() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const isHome = (currentPath === "" || currentPath === "index.html");

    if (!isHome) return;

    document.querySelectorAll("[data-hide-on-home]").forEach(el => {
        el.style.display = "none";
    });
}

