<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
    <div>
        <h2 class="text-2xl font-semibold">QR List</h2>
        <p class="text-slate-600 mt-2">Historique des QR : actif, utilisé, expiré.</p>
    </div>

    <div class="flex gap-3">
        <input class="rounded-xl border border-slate-200 px-4 py-3 bg-white" placeholder="Search QR id..." />
        <a href="/qr/create" class="px-4 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800">Create</a>
    </div>
</div>

<div class="mt-8 bg-white border border-slate-200 rounded-2xl overflow-hidden">
    <div class="p-5 border-b border-slate-200 flex items-center justify-between">
        <div class="font-semibold">Last 50</div>
        <div class="text-sm text-slate-500">Workshop Quartz Garage</div>
    </div>

    <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
            <thead class="bg-slate-50 text-slate-600">
            <tr>
                <th class="text-left px-5 py-4 font-medium">QR ID</th>
                <th class="text-left px-5 py-4 font-medium">Status</th>
                <th class="text-left px-5 py-4 font-medium">Created</th>
                <th class="text-left px-5 py-4 font-medium">Used by</th>
                <th class="text-left px-5 py-4 font-medium">Expires</th>
                <th class="text-right px-5 py-4 font-medium">Actions</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
            <?php
            $items = [
                ['15021','active','2026-01-07 10:22','—','2026-01-14 10:22'],
                ['15020','used','2026-01-07 09:12','mec1@garage.com','2026-01-14 09:12'],
                ['15019','expired','2026-01-01 09:12','—','2026-01-02 09:12'],
            ];
            ?>
            <?php foreach ($items as $it): ?>
                <tr class="hover:bg-slate-50">
                    <td class="px-5 py-4 font-medium">#<?= $it[0] ?></td>
                    <td class="px-5 py-4">
                        <?php
                        $s = $it[1];
                        $badge = "bg-slate-100 text-slate-700 border-slate-200";
                        if ($s === 'active') $badge = "bg-emerald-50 text-emerald-700 border-emerald-200";
                        if ($s === 'used') $badge = "bg-slate-900 text-white border-slate-900";
                        if ($s === 'expired') $badge = "bg-amber-50 text-amber-800 border-amber-200";
                        ?>
                        <span class="text-xs px-2.5 py-1 rounded-full border <?= $badge ?>">
                <?= strtoupper($s) ?>
              </span>
                    </td>
                    <td class="px-5 py-4 text-slate-600"><?= $it[2] ?></td>
                    <td class="px-5 py-4 text-slate-600"><?= $it[3] ?></td>
                    <td class="px-5 py-4 text-slate-600"><?= $it[4] ?></td>
                    <td class="px-5 py-4 text-right">
                        <button class="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100">View</button>
                        <button class="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100">Copy</button>
                    </td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>