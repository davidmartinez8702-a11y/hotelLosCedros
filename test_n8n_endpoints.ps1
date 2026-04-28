# 🧪 Test Endpoints n8n Hotel API - PowerShell
# Uso: .\test_n8n_endpoints.ps1

param(
    [string]$BaseUrl = "http://localhost:8000"
)

Write-Host "================================" -ForegroundColor Cyan
Write-Host "🧪 Probando Endpoints n8n Hotel" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 Base URL: $BaseUrl" -ForegroundColor Yellow
Write-Host ""

# Función para probar endpoint
function Test-Endpoint {
    param(
        [string]$Method,
        [string]$Endpoint,
        [string]$Body
    )
    
    $url = "$BaseUrl$Endpoint"
    Write-Host "Testing $Method $Endpoint ... " -ForegroundColor White -NoNewline
    
    try {
        if ($Method -eq "GET") {
            $response = Invoke-WebRequest -Uri $url -Method Get -ErrorAction Stop
        } else {
            $response = Invoke-WebRequest -Uri $url -Method Post `
                -ContentType "application/json" `
                -Body $Body `
                -ErrorAction Stop
        }
        
        Write-Host "✓ OK (200)" -ForegroundColor Green
        $content = $response.Content | ConvertFrom-Json
        Write-Host ($content | ConvertTo-Json -Depth 2 | Select-Object -First 10) -ForegroundColor Gray
        Write-Host ""
    }
    catch {
        Write-Host "✗ FAILED" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
        Write-Host ""
    }
}

# 1. Información del Hotel
Write-Host "1. Información General" -ForegroundColor Yellow
Test-Endpoint "GET" "/api/n8n/informacion"

# 2. Habitaciones
Write-Host "2. Listar Habitaciones" -ForegroundColor Yellow
Test-Endpoint "GET" "/api/n8n/habitaciones"

# 3. Promociones
Write-Host "3. Promociones Activas" -ForegroundColor Yellow
Test-Endpoint "GET" "/api/n8n/promociones"

# 4. Disponibilidad
Write-Host "4. Disponibilidad" -ForegroundColor Yellow
$dispensUrl = "/api/n8n/disponibilidad?fecha_entrada=2026-05-01&fecha_salida=2026-05-03&adultos=2&infantes=0"
Test-Endpoint "GET" $dispensUrl

# 5. Calcular Precio
Write-Host "5. Calcular Precio" -ForegroundColor Yellow
$bodyPrecio = @{
    tipo_habitacion_id = 1
    cantidad = 1
    dias = 3
    promo_id = $null
} | ConvertTo-Json
Test-Endpoint "POST" "/api/n8n/calcular-precio" $bodyPrecio

Write-Host "================================" -ForegroundColor Cyan
Write-Host "✓ Tests Completados" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
