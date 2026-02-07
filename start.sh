#!/bin/bash

echo "======================================"
echo "Sistema RRHH - Iniciando MVP"
echo "======================================"

# Verificar Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 no está instalado"
    exit 1
fi

# Verificar Node
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    exit 1
fi

echo "✅ Dependencias del sistema verificadas"
echo ""

# Backend
echo "📦 Instalando dependencias del backend..."
cd backend
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install -q -r requirements.txt
echo "✅ Backend listo"

# Frontend
echo "📦 Verificando dependencias del frontend..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias del frontend..."
    npm install
fi
echo "✅ Frontend listo"

cd ..

echo ""
echo "======================================"
echo "🚀 Sistema listo para usar"
echo "======================================"
echo ""
echo "Ahora ejecuta en 2 terminales diferentes:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend"
echo "  source venv/bin/activate  # En Linux/Mac"
echo "  python app.py"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Luego abre: http://localhost:5173"
echo "======================================"
