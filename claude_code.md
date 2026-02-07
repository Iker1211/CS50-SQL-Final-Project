# Sesión de Desarrollo - Sistema RRHH MVP

## Objetivo del Usuario

Maximizar libertad financiera a largo plazo mediante productos claros y útiles. Necesidad específica: aplicación web fullstack CORE para administración de recursos humanos con funcionalidades CRUD, centrada en lo esencial.

## Proyecto Construido

Sistema de gestión de recursos humanos (RRHH) - MVP funcional completo.

### Stack Tecnológico

**Backend:**
- Python 3.12.3
- Flask 3.0.0
- Flask-CORS 4.0.0
- SQLite (clinica_arboleda.db)

**Frontend:**
- React 18
- Vite 7.3.1
- TailwindCSS 3.4.1
- React Router
- Axios

**Sistema Operativo:**
- Ubuntu 24.04.3 LTS (WSL2)

## Estructura del Proyecto

```
CS50-SQL-Final-Project/
├── backend/
│   ├── app.py                  # API REST con endpoints CRUD
│   ├── requirements.txt
│   └── venv/                   # Entorno virtual Python
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FormField.jsx   # Input reutilizable
│   │   │   ├── Layout.jsx      # Sidebar + navegación
│   │   │   ├── Modal.jsx       # Modal para formularios
│   │   │   └── Table.jsx       # Tabla con acciones
│   │   ├── pages/
│   │   │   ├── Candidatos.jsx  # Gestión de candidatos
│   │   │   ├── Dashboard.jsx   # Estadísticas principales
│   │   │   ├── Departamentos.jsx
│   │   │   └── Empleados.jsx   # Gestión de empleados
│   │   ├── services/
│   │   │   └── api.js          # Cliente Axios
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── clinica_arboleda.db         # Base de datos SQLite
├── schema.sql                  # Schema con tablas activadas
├── migrate.py                  # Script de migración ejecutado
├── INICIO_RAPIDO.md           # Guía paso a paso
└── README.md                   # Documentación completa
```

## Base de Datos

### Tablas Principales

1. **candidatos** - Proceso de reclutamiento
2. **empleados** - Plantilla activa (activada durante la sesión)
3. **departamentos** - Estructura organizacional
4. **cargos** - Puestos de trabajo
5. **evaluaciones** - Entrevistas
6. **test_bfi**, **test_cope**, **inteligencia** - Pruebas psicométricas
7. **historial_laboral** - Cambios de puesto (activada durante la sesión)

### Cambios Realizados

- Descomentadas tablas `empleados` e `historial_laboral` en schema.sql
- Ejecutado migrate.py para crear tablas sin perder datos existentes

## API REST Endpoints

### Candidatos
- GET /api/candidatos
- POST /api/candidatos
- PUT /api/candidatos/:id
- DELETE /api/candidatos/:id

### Empleados
- GET /api/empleados (con JOINs a candidatos, departamentos, cargos)
- POST /api/empleados
- PUT /api/empleados/:id
- DELETE /api/empleados/:id

### Departamentos
- GET /api/departamentos
- POST /api/departamentos

### Cargos
- GET /api/cargos
- POST /api/cargos

### Estadísticas
- GET /api/stats (total_candidatos, total_empleados, candidatos_nuevos, empleados_recientes)

## Funcionalidades Implementadas

### Dashboard
- 4 tarjetas de métricas en tiempo real
- Resumen del sistema

### Candidatos
- Crear nuevo candidato
- Editar información
- Eliminar candidato
- Estados: Nuevo, Aplicando, Contratado

### Empleados
- Crear empleado vinculado a candidato
- Asignar departamento y cargo
- Gestión de salarios y contratos
- Estados: Activo, Inactivo

### Departamentos
- Crear departamentos
- Centros de costo

## Problemas Resueltos

### 1. Python Externally Managed Environment
**Problema:** Ubuntu 24.04 no permite pip install global
**Solución:** Creado entorno virtual con `python3 -m venv venv`

### 2. TailwindCSS No Compilando
**Problema:** Estilos no se aplicaban (HTML sin CSS)
**Solución:**
- Instalado python3-venv
- Reinstalado TailwindCSS v3.4.1 (downgrade desde v4)
- Creado postcss.config.js
- Reiniciado servidor Vite

### 3. Tema Warcraft No Deseado
**Problema:** Usuario solicitó tema Warcraft pero no le gustó
**Solución:** Revertidos todos los cambios a estilo azul profesional original

## Instalación y Uso

### Backend
```bash
cd backend
source venv/bin/activate  # Activar entorno virtual
pip install -r requirements.txt  # Ya instalado
python app.py
```
Corre en: http://127.0.0.1:5000

### Frontend
```bash
cd frontend
npm install  # Ya instalado
npm run dev
```
Corre en: http://localhost:5173

### Acceso
Navegador: http://localhost:5173

## Diseño UI

### Paleta de Colores
- Primary: Azul (#0ea5e9, #0284c7, #0369a1)
- Backgrounds: Gris (#f9fafb, #ffffff)
- Text: Gris oscuro (#111827, #374151)

### Componentes
- Sidebar azul oscuro con navegación
- Tablas con headers azules
- Botones primarios azules con hover
- Modales centrados con backdrop
- Formularios con validación

## Estado Final del Sistema

- Backend Flask corriendo en puerto 5000
- Frontend React corriendo en puerto 5173
- Base de datos SQLite funcional con datos preservados
- CRUD completo para candidatos, empleados y departamentos
- Dashboard con estadísticas en tiempo real
- UI limpia y profesional con TailwindCSS

## Comandos de Gestión

### Ver servidores corriendo
```bash
ps aux | grep -E "flask|vite"
```

### Detener servidores
Los servidores están en background. Se detienen al cerrar Claude Code.

## Próximos Pasos Sugeridos

1. Autenticación de usuarios
2. Módulo de evaluaciones detallado
3. Reportes en PDF/Excel
4. Sistema de permisos y roles
5. Deploy a producción (Vercel + Railway/Render)

## Notas Técnicas

- SQLite adecuado para MVP, considerar PostgreSQL para producción
- CORS configurado en Flask para desarrollo local
- React Router para navegación SPA
- Componentes reutilizables para escalabilidad
- API RESTful estándar

## Archivos de Documentación Creados

1. README.md - Documentación completa del proyecto
2. INICIO_RAPIDO.md - Guía paso a paso para usuario
3. claude_code.md - Este archivo (resumen de sesión)

---

**Fecha:** 2026-02-06
**Duración:** Sesión completa de desarrollo
**Resultado:** MVP funcional listo para uso inmediato
