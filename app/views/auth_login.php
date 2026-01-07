<section class="grid lg:grid-cols-2 gap-10 items-center">
    <div>
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs">
            <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
            Quartz • One-time QR validation
        </div>

        <h1 class="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            Scan. Validate. Secure.
        </h1>
        <p class="mt-4 text-slate-600 text-lg">
            Plateforme Quartz pour gérer des QR codes à usage unique par atelier :
            un compte principal (owner) + des mécaniciens.
        </p>

        <div class="mt-6 flex flex-wrap gap-3">
            <a href="/register" class="px-5 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800">
                Create workshop account
            </a>
            <a href="/login" class="px-5 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-100">
                Login
            </a>
        </div>

        <div class="mt-8 grid sm:grid-cols-3 gap-4">
            <div class="p-4 rounded-2xl bg-white border border-slate-200">
                <div class="text-sm font-semibold">One-time QR</div>
                <div class="text-sm text-slate-600 mt-1">QR devient obsolète après scan.</div>
            </div>
            <div class="p-4 rounded-2xl bg-white border border-slate-200">
                <div class="text-sm font-semibold">Workshop roles</div>
                <div class="text-sm text-slate-600 mt-1">Owner gère les mécaniciens.</div>
            </div>
            <div class="p-4 rounded-2xl bg-white border border-slate-200">
                <div class="text-sm font-semibold">Traceability</div>
                <div class="text-sm text-slate-600 mt-1">Historique des scans & statuts.</div>
            </div>
        </div>
    </div>

    <div class="bg-white border border-slate-200 rounded-3xl p-6">
        <div class="flex items-center justify-between">
            <div>
                <div class="text-sm text-slate-500">Preview</div>
                <div class="font-semibold">QR status panel</div>
            </div>
            <span class="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
        Active
      </span>
        </div>

        <div class="mt-6 grid gap-4">
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="text-sm font-semibold">QR #12831</div>
                <div class="text-xs text-slate-500 mt-1">Expires in 6 days</div>
                <div class="mt-3 flex gap-2">
                    <button class="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-sm">
                        View
                    </button>
                    <button class="px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm">
                        Copy scan link
                    </button>
                </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="text-sm font-semibold">Used QR</div>
                <div class="text-xs text-slate-500 mt-1">Locked after first scan</div>
                <div class="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div class="h-2 w-3/4 bg-slate-900"></div>
                </div>
            </div>
        </div>
    </div>
</section>