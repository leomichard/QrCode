// assets/include.js

async function loadPartial(selector, url) {
    const el = document.querySelector(selector);
    if (!el) return;
    const res = await fetch(url, { cache: "no-cache" });
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
