<div class="flex items-center justify-between gap-4">
    <div>
        <h2 class="text-2xl font-semibold">Team</h2>
        <p class="text-slate-600 mt-2">Owner peut ajouter des mécaniciens (même workshop).</p>
    </div>
</div>

<div class="mt-8 grid lg:grid-cols-3 gap-6">
    <form class="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <div class="font-semibold">Add mechanic</div>

        <div>
            <label class="text-sm font-medium">Email</label>
            <input type="email" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="mechanic@garage.com" />
        </div>

        <div>
            <label class="text-sm font-medium">Temporary password</label>
            <input type="password" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="••••••••" />
        </div>

        <button type="button" class="w-full rounded-xl bg-slate-900 text-white py-3 hover:bg-slate-800">
            Add member
        </button>

        <p class="text-xs text-slate-500">Plus tard : invitation par email / reset password.</p>
    </form>

    <div class="lg:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between">
            <div class="font-semibold">Members</div>
            <div class="text-sm text-slate-500">6 total</div>
        </div>

        <div class="divide-y divide-slate-200">
            <?php
            $rows = [
                ['Leo Owner', 'owner@garage.com', 'owner'],
                ['Mec 1', 'mec1@garage.com', 'mechanic'],
                ['Mec 2', 'mec2@garage.com', 'mechanic'],
                ['Mec 3', 'mec3@garage.com', 'mechanic'],
            ];
            ?>
            <?php foreach ($rows as $r): ?>
                <div class="p-5 flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <div class="h-10 w-10 rounded-xl bg-slate-900 text-white grid place-items-center text-sm font-semibold">
                            <?= strtoupper(substr($r[0], 0, 1)) ?>
                        </div>
                        <div>
                            <div class="font-medium"><?= $r[0] ?></div>
                            <div class="text-sm text-slate-500"><?= $r[1] ?></div>
                        </div>
                    </div>
                    <span class="text-xs px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700">
            <?= strtoupper($r[2]) ?>
          </span>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>