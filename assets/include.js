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