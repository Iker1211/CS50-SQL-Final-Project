# Sistema de Gestión de RRHH - MVP

Sistema fullstack de administración de recursos humanos con funcionalidades CRUD para candidatos, empleados, departamentos y evaluaciones.

## Stack Tecnológico

**Backend:**
- Flask (Python)
- SQLite
- Flask-CORS

**Frontend:**
- React 18
- Vite
- React Router
- TailwindCSS
- Axios

## Estructura del Proyecto

```
CS50-SQL-Final-Project/
├── backend/
│   ├── app.py              # API REST Flask
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/     # Table, Modal, FormField, Layout
│   │   ├── pages/          # Dashboard, Candidatos, Empleados
│   │   ├── services/       # API client (axios)
│   │   └── App.jsx
│   └── package.json
├── clinica_arboleda.db     # Base de datos SQLite
├── schema.sql              # Esquema de BD
└── migrate.py              # Script de migración
```

## Instalación y Uso

### 1. Backend (Terminal 1)

```bash
cd backend

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor Flask
python app.py
```

El backend correrá en `http://localhost:5000`

### 2. Frontend (Terminal 2)

```bash
cd frontend

# Las dependencias ya están instaladas, si no:
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

El frontend correrá en `http://localhost:5173`

### 3. Acceder a la aplicación

Abre tu navegador en `http://localhost:5173`

## Funcionalidades Principales

### Dashboard
- Estadísticas en tiempo real
- Total de candidatos y empleados
- Métricas de reclutamiento

### Candidatos
- ✅ Crear nuevo candidato
- ✅ Editar información
- ✅ Eliminar candidato
- ✅ Tracking de estado (Nuevo/Aplicando/Contratado)
- ✅ Gestión de CVs y documentos

### Empleados
- ✅ Crear empleado desde candidatos contratados
- ✅ Asignar departamento y cargo
- ✅ Gestión de contratos y salarios
- ✅ Control de estado (Activo/Inactivo)

### Estructura Organizacional
- Departamentos con centros de costo
- Cargos con niveles de riesgo
- Historial laboral

## Base de Datos

La base de datos incluye:
- `candidatos` - Proceso de reclutamiento
- `empleados` - Plantilla activa
- `departamentos` - Estructura organizacional
- `cargos` - Puestos de trabajo
- `evaluaciones` - Entrevistas
- `test_bfi`, `test_cope`, `inteligencia` - Pruebas psicométricas
- `historial_laboral` - Cambios de puesto

## API Endpoints

### Candidatos
- GET `/api/candidatos` - Listar todos
- POST `/api/candidatos` - Crear nuevo
- PUT `/api/candidatos/:id` - Actualizar
- DELETE `/api/candidatos/:id` - Eliminar

### Empleados
- GET `/api/empleados` - Listar todos (con joins)
- POST `/api/empleados` - Crear nuevo
- PUT `/api/empleados/:id` - Actualizar
- DELETE `/api/empleados/:id` - Eliminar

### Departamentos & Cargos
- GET `/api/departamentos` - Listar
- POST `/api/departamentos` - Crear
- GET `/api/cargos` - Listar
- POST `/api/cargos` - Crear

### Estadísticas
- GET `/api/stats` - Dashboard metrics

## Próximos Pasos (Post-MVP)

- [ ] Autenticación y roles de usuario
- [ ] Módulo de evaluaciones detallado
- [ ] Reportes y exportación a PDF/Excel
- [ ] Gestión de asistencia y nómina
- [ ] Integración con email para notificaciones
- [ ] Deploy a producción (Vercel + Railway/Render)

## Notas para Deploy

### Backend
- Configurar variable de entorno `DB_PATH`
- Migrar a PostgreSQL para producción
- Configurar CORS origins

### Frontend
- Configurar `VITE_API_URL` en producción
- Compilar con `npm run build`
- Deploy estático en Vercel/Netlify

## Soporte

Para problemas o mejoras, contactar al equipo de desarrollo.

## Correcciones

- Filosofía del estilo. Se ve como un juguete.
- Profundizar en las funciones de RRHH, y cómo integrarlas con el nuevo estilo. 
