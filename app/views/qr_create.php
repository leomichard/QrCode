<div class="grid lg:grid-cols-2 gap-6 items-start">
    <div class="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 class="text-2xl font-semibold">Create QR</h2>
        <p class="text-slate-600 mt-2">
            Génère un QR code à usage unique. Après scan et validation, il devient obsolète.
        </p>

        <div class="mt-6 space-y-4">
            <div>
                <label class="text-sm font-medium">Expiration</label>
                <select class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3">
                    <option>7 days</option>
                    <option>24 hours</option>
                    <option>No expiration</option>
                </select>
            </div>

            <button type="button" class="w-full rounded-xl bg-slate-900 text-white py-3 hover:bg-slate-800">
                Generate one-time QR
            </button>

            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="text-sm font-semibold">Scan link (preview)</div>
                <div class="text-sm text-slate-600 mt-1 break-all">
                    http://your-host/scan?token=...
                </div>
                <div class="mt-3 flex gap-3">
                    <button type="button" class="flex-1 rounded-xl bg-white border border-slate-200 py-3 hover:bg-slate-100">
                        Copy link
                    </button>
                    <button type="button" class="flex-1 rounded-xl bg-slate-900 text-white py-3 hover:bg-slate-800">
                        Download QR
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white border border-slate-200 rounded-2xl p-6">
        <div class="flex items-center justify-between">
            <div>
                <div class="text-sm text-slate-500">Preview</div>
                <div class="font-semibold">QR code image</div>
            </div>
            <span class="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">ACTIVE</span>
        </div>

        <div class="mt-6 grid place-items-center">
            <div class="h-64 w-64 rounded-3xl border border-slate-200 bg-slate-50 grid place-items-center text-slate-500">
                QR IMAGE
            </div>
            <p class="text-xs text-slate-500 mt-4 text-center">
                Plus tard : image générée côté serveur.
            </p>
        </div>
    </div>
</div>