
// assets/app-state.js

window.appState = {
    session: null,
    profile: null
};


/*
const AppState = (() => {
    const KEY = "quartz_app_state_v1";

    const defaultState = {
        session: {
            isLoggedIn: true,
            role: "owner", // "owner" Or "mechanic"
            userEmail: "Owner@Garage.Com",
            workshopName: "Quartz Garage",
        },
        points: {
            pointPerScan: 10,
            scans: [
                { id: "QR-15020", mechanicEmail: "Mec1@Garage.Com", points: 10, date: "2026-01-07 09:12" },
                { id: "QR-15021", mechanicEmail: "Mec1@Garage.Com", points: 10, date: "2026-01-07 10:22" },
                { id: "QR-15022", mechanicEmail: "Mec2@Garage.Com", points: 10, date: "2026-01-07 11:05" },
            ]
        },
        promotions: [
            {
                id: "PROMO-1",
                title: "Winter Oil Change Offer",
                description: "Get A Discount On Premium Quartz Oil And A Free Inspection.",
                imageUrl: "https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=1200&q=80",
                createdAt: "2026-01-07 08:00",
            },
            {
                id: "PROMO-2",
                title: "Brake Check Week",
                description: "Free Brake Inspection With Any Quartz Service Package.",
                imageUrl: "https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?auto=format&fit=crop&w=1200&q=80",
                createdAt: "2026-01-06 14:30",
            }
        ]
    };

    function load() {
        try {
            const raw = localStorage.getItem(KEY);
            if (!raw) return structuredClone(defaultState);
            return JSON.parse(raw);
        } catch {
            return structuredClone(defaultState);
        }
    }

    function save(state) {
        localStorage.setItem(KEY, JSON.stringify(state));
    }

    function get() {
        return load();
    }

    function setSession(partial) {
        const state = load();
        state.session = { ...state.session, ...partial };
        save(state);
    }

    function addPromotion({ title, description, imageUrl }) {
        const state = load();
        const id = "PROMO-" + Math.random().toString(16).slice(2).toUpperCase();
        state.promotions.unshift({
            id,
            title,
            description,
            imageUrl,
            createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
        });
        save(state);
    }

    function addScan({ qrId, mechanicEmail }) {
        const state = load();
        const points = state.points.pointPerScan;
        state.points.scans.unshift({
            id: qrId,
            mechanicEmail,
            points,
            date: new Date().toISOString().slice(0, 16).replace("T", " "),
        });
        save(state);
    }

    function computePointsSummary() {
        const state = load();
        const scans = state.points.scans;

        const byMechanic = {};
        let shopTotalPoints = 0;
        let shopTotalScans = 0;

        for (const s of scans) {
            shopTotalScans += 1;
            shopTotalPoints += s.points;

            if (!byMechanic[s.mechanicEmail]) {
                byMechanic[s.mechanicEmail] = { scans: 0, points: 0 };
            }
            byMechanic[s.mechanicEmail].scans += 1;
            byMechanic[s.mechanicEmail].points += s.points;
        }

        return { byMechanic, shopTotalPoints, shopTotalScans };
    }

    return {
        get,
        setSession,
        addPromotion,
        addScan,
        computePointsSummary,
    };
})();
*/