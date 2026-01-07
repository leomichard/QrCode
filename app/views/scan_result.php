<div class="max-w-2xl mx-auto">
    <div class="bg-white border border-slate-200 rounded-2xl p-6">
        <div class="flex items-start gap-4">
            <div class="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-200 grid place-items-center text-2xl">
            </div>
            <div>
                <h2 class="text-2xl font-semibold">QR validated</h2>
                <p class="text-slate-600 mt-2">
                    Ce QR code est maintenant <span class="font-medium">obsolète</span> (one-time scan).
                </p>
            </div>
        </div>

        <div class="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div class="text-sm font-semibold">Details</div>
            <div class="mt-3 grid sm:grid-cols-2 gap-3 text-sm text-slate-600">
                <div><span class="text-slate-500">QR ID:</span> #15021</div>
                <div><span class="text-slate-500">Status:</span> USED</div>
                <div><span class="text-slate-500">Workshop:</span> Quartz Garage</div>
                <div><span class="text-slate-500">Validated by:</span> mec1@garage.com</div>
            </div>
        </div>

        <div class="mt-6 flex flex-wrap gap-3">
            <a href="/dashboard" class="px-4 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800">
                Back to dashboard
            </a>
            <a href="/qr/list" class="px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-100">
                View QR list
            </a>
        </div>
    </div>

    <!-- Example invalid state -->
    <div class="mt-6 bg-white border border-slate-200 rounded-2xl p-6">
        <div class="flex items-start gap-4">
            <div class="h-12 w-12 rounded-2xl bg-amber-50 border border-amber-200 grid place-items-center text-2xl">
                ⚠️
            </div>
            <div>
                <h3 class="text-xl font-semibold">Already used / expired</h3>
                <p class="text-slate-600 mt-2">Si le QR est rescan, on affiche cet état.</p>
            </div>
        </div>
    </div>
</div>