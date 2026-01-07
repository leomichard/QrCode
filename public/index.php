<?php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$routes = [
    '/' => 'home.php',
    '/login' => 'auth_login.php',
    '/register' => 'auth_register.php',
    '/dashboard' => 'dashboard.php',
    '/team' => 'team.php',
    '/qr/create' => 'qr_create.php',
    '/qr/list' => 'qr_list.php',
    '/scan-result' => 'scan_result.php',
];

$view = isset($routes[$path]) ? $routes[$path] : null;
if (!$view) {
    http_response_code(404);
    echo "404";
    exit;
}

require __DIR__ . '/../app/Views/layout.php';