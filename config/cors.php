<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure CORS settings for your application. This determines
    | what cross-origin requests are allowed to your API.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:5678',      // n8n local
        'http://127.0.0.1:5678',      // n8n local (localhost IP numérico)
        'http://localhost:3000',       // React/Vue local dev
        'http://localhost:8000',       // Laravel local
        'http://127.0.0.1:8000',       // Laravel local
    ],

    'allowed_origins_patterns' => [
        // Permite cualquier origen si necesitas testing rápido (NO USAR EN PRODUCCIÓN)
        // '#^https?://localhost(:[0-9]+)?$#',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
