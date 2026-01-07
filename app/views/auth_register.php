<div class="max-w-2xl mx-auto">
    <h2 class="text-2xl font-semibold">Create your workshop</h2>
    <p class="text-slate-600 mt-2">
        Étape 1 : identité par email. Étape 2 : téléphone <span class="font-medium">ou</span> compte LINE.
    </p>

    <div class="mt-6 grid md:grid-cols-2 gap-6">
        <!-- Card Email -->
        <form class="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div class="text-sm font-semibold">Step 1 — Email</div>

            <div>
                <label class="text-sm font-medium">Workshop name</label>
                <input class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                       placeholder="Quartz Garage Lyon" />
            </div>

            <div>
                <label class="text-sm font-medium">Email</label>
                <input type="email" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                       placeholder="owner@garage.com" />
            </div>

            <div>
                <label class="text-sm font-medium">Password</label>
                <input type="password" class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                       placeholder="••••••••" />
            </div>

            <button type="button" class="w-full rounded-xl bg-slate-900 text-white py-3 hover:bg-slate-800">
                Continue
            </button>

            <p class="text-xs text-slate-500">
                Plus tard : vérification email avec un lien.
            </p>
        </form>

        <!-- Card Phone or LINE -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6">
            <div class="text-sm font-semibold">Step 2 — Phone or LINE</div>
            <p class="text-sm text-slate-600 mt-2">Choisis une méthode. (UI only)</p>

            <div class="mt-4 space-y-4">
                <div class="p-4 rounded-2xl border border-slate-200">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <div class="font-medium">Phone verification</div>
                            <div class="text-sm text-slate-600 mt-1">Reçois un OTP par SMS.</div>
                        </div>
                        <span class="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">Recommended</span>
                    </div>

                    <div class="mt-4 grid grid-cols-3 gap-3">
                        <input class="col-span-1 rounded-xl border border-slate-200 px-4 py-3" placeholder="+33" />
                        <input class="col-span-2 rounded-xl border border-slate-200 px-4 py-3" placeholder="6 12 34 56 78" />
                    </div>

                    <div class="mt-3 flex gap-3">
                        <button type="button" class="flex-1 rounded-xl bg-slate-900 text-white py-3 hover:bg-slate-800">
                            Send OTP
                        </button>
                        <button type="button" class="rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-100">
                            Verify
                        </button>
                    </div>
                </div>

                <div class="p-4 rounded-2xl border border-slate-200">
                    <div class="font-medium">LINE account</div>
                    <div class="text-sm text-slate-600 mt-1">Connexion via LINE OAuth.</div>

                    <button type="button" class="mt-4 w-full rounded-xl bg-white border border-slate-200 py-3 hover:bg-slate-100 flex items-center justify-center gap-2">
                        <span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                        Continue with LINE
                    </button>

                    <p class="text-xs text-slate-500 mt-3">
                        Plus tard : callback + association du line_user_id.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>