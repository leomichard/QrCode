<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
    <div>
        <h2 class="text-2xl font-semibold">Dashboard</h2>
        <p class="text-slate-600 mt-2">Vue rapide de ton workshop et des QR codes.</p>
    </div>

    <div class="flex gap-3">
        <a href="/qr/create" class="px-4 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800">
            Generate QR
        </a>
        <a href="/qr/list" class="px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-100">
            View QR list
        </a>
    </div>
</div>

<div class="mt-8 grid md:grid-cols-3 gap-4">
    <div class="p-5 rounded-2xl bg-white border border-slate-200">
        <div class="text-sm text-slate-500">Active QR</div>
        <div class="mt-1 text-3xl font-semibold">12</div>
    </div>
    <div class="p-5 rounded-2xl bg-white border border-slate-200">
        <div class="text-sm text-slate-500">Used (30d)</div>
        <div class="mt-1 text-3xl font-semibold">48</div>
    </div>
    <div class="p-5 rounded-2xl bg-white border border-slate-200">
        <div class="text-sm text-slate-500">Team members</div>
        <div class="mt-1 text-3xl font-semibold">6</div>
    </div>
</div>

<div class="mt-8 bg-white border border-slate-200 rounded-2xl">
    <div class="p-5 border-b border-slate-200 flex items-center justify-between">
        <div>
            <div class="font-semibold">Recent activity</div>
            <div class="text-sm text-slate-600">Derniers scans / générations</div>
        </div>
        <a href="/qr/list" class="text-sm font-medium hover:underline">Open list</a>
    </div>

    <div class="p-5 space-y-4">
        <?php for ($i=0; $i<4; $i++): ?>
            <div class="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="flex items-center gap-3">
                    <div class="h-10 w-10 rounded-xl bg-white border border-slate-200 grid place-items-center">🔒</div>
                    <div>
                        <div class="text-sm font-semibold">QR #<?= 15020 + $i ?></div>
                        <div class="text-xs text-slate-500">Used by mechanic • 2 hours ago</div>
                    </div>
                </div>
                <span class="text-xs px-2.5 py-1 rounded-full bg-slate-900 text-white">USED</span>
            </div>
        <?php endfor; ?>
    </div>
</div>