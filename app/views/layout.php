<?php
// Simu état connecté pour le front (tu enlèveras quand backend)
// Change $isLogged à false pour voir le mode public
$isLogged = true;
$role = 'owner'; // 'owner' ou 'mechanic'
$title = 'Quartz QR';
?>

<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title><?= $title ?></title>

    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <link rel="stylesheet" href="/assets/app.css" />
</head>

<body class="min-h-screen bg-slate-50 text-slate-900">
<!-- Top bar -->
<header class="bg-white border-b border-slate-200">
    <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" class="flex items-center gap-3">
            <div class="h-9 w-9 rounded-xl bg-slate-900 text-white grid place-items-center font-semibold">Q</div>
            <div class="leading-tight">
                <div class="font-semibold">Quartz</div>
                <div class="text-xs text-slate-500 -mt-0.5">TotalEnergies QR Platform</div>
            </div>
        </a>

        <nav class="hidden md:flex items-center gap-2">
            <a class="px-3 py-2 rounded-lg hover:bg-slate-100 text-sm" href="/">Home</a>

            <?php if (!$isLogged): ?>
                <a class="px-3 py-2 rounded-lg hover:bg-slate-100 text-sm" href="/login">Login</a>
                <a class="px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-sm" href="/register">Register</a>
            <?php else: ?>
                <a class="px-3 py-2 rounded-lg hover:bg-slate-100 text-sm" href="/dashboard">Dashboard</a>

                <?php if ($role === 'owner'): ?>
                    <a class="px-3 py-2 rounded-lg hover:bg-slate-100 text-sm" href="/team">Team</a>
                    <a class="px-3 py-2 rounded-lg hover:bg-slate-100 text-sm" href="/qr/create">Create QR</a>
                    <a class="px-3 py-2 rounded-lg hover:bg-slate-100 text-sm" href="/qr/list">QR List</a>
                <?php endif; ?>

                <a class="px-3 py-2 rounded-lg hover:bg-slate-100 text-sm" href="/scan-result">Scan result</a>

                <button class="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-sm">
                    Logout
                </button>
            <?php endif; ?>
        </nav>

        <!-- Mobile menu shortcut -->
        <div class="md:hidden">
            <a href="/dashboard" class="text-sm px-3 py-2 rounded-lg bg-slate-900 text-white">Menu</a>
        </div>
    </div>
</header>

<!-- Page -->
<main class="max-w-6xl mx-auto px-4 py-10">
    <?php require __DIR__ . '/' . $view; ?>
</main>

<footer class="border-t border-slate-200 bg-white">
    <div class="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-500 flex flex-col md:flex-row gap-2 md:justify-between">
        <div>© <?= date('Y') ?> Quartz — QR One-time Scan</div>
        <div class="flex gap-4">
            <a class="hover:text-slate-700" href="/">Privacy</a>
            <a class="hover:text-slate-700" href="/">Support</a>
        </div>
    </div>
</footer>
</body>
</html>