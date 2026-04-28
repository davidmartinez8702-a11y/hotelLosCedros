#!/bin/bash

# 🧪 Script de validación - Endpoints n8n Hotel API
# Uso: bash test_n8n_endpoints.sh

echo "================================"
echo "🧪 Probando Endpoints n8n Hotel"
echo "================================"
echo ""

# Configurar URL base
BASE_URL="${1:-http://localhost:8000}"
echo "📍 Base URL: $BASE_URL"
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para probar endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    
    echo -n "Testing $method $endpoint ... "
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X POST \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$BASE_URL$endpoint")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$http_code" -eq 200 ] || [ "$http_code" -eq 201 ]; then
        echo -e "${GREEN}✓ OK ($http_code)${NC}"
        echo "Response: $body" | head -c 200
        echo ""
    else
        echo -e "${RED}✗ FAILED ($http_code)${NC}"
        echo "Response: $body"
    fi
    echo ""
}

# 1. Información del Hotel
echo -e "${YELLOW}1. Información General${NC}"
test_endpoint "GET" "/api/n8n/informacion"

# 2. Habitaciones
echo -e "${YELLOW}2. Listar Habitaciones${NC}"
test_endpoint "GET" "/api/n8n/habitaciones"

# 3. Promociones
echo -e "${YELLOW}3. Promociones Activas${NC}"
test_endpoint "GET" "/api/n8n/promociones"

# 4. Disponibilidad
echo -e "${YELLOW}4. Disponibilidad${NC}"
test_endpoint "GET" "/api/n8n/disponibilidad?fecha_entrada=2026-05-01&fecha_salida=2026-05-03&adultos=2&infantes=0"

# 5. Calcular Precio
echo -e "${YELLOW}5. Calcular Precio${NC}"
test_endpoint "POST" "/api/n8n/calcular-precio" '{"tipo_habitacion_id":1,"cantidad":1,"dias":3,"promo_id":null}'

echo "================================"
echo -e "${GREEN}✓ Tests Completados${NC}"
echo "================================"
