# 🚀 Guía de Inicio Rápido - Sistema RRHH MVP

## ✅ Paso 1: Instalar Dependencias

### Backend (Python)
```bash
cd backend
pip install -r requirements.txt
```

### Frontend (Node.js)
```bash
cd frontend
npm install
```

## ✅ Paso 2: Iniciar el Sistema

### Terminal 1 - Backend
```bash
cd backend
python app.py
```

Deberías ver:
```
* Running on http://127.0.0.1:5000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Deberías ver:
```
Local: http://localhost:5173
```

## ✅ Paso 3: Acceder a la Aplicación

Abre tu navegador en: **http://localhost:5173**

## 📋 Funcionalidades Disponibles

### 1. Dashboard (/)
- Vista general de estadísticas
- Métricas de candidatos y empleados
- Resumen del sistema

### 2. Candidatos (/candidatos)
- ➕ Crear nuevo candidato
- ✏️ Editar información
- 🗑️ Eliminar candidato
- 📊 Estados: Nuevo → Aplicando → Contratado

### 3. Empleados (/empleados)
- ➕ Crear empleado desde candidatos contratados
- 🏢 Asignar departamento y cargo
- 💰 Gestión de salarios y contratos
- ✅ Control de estado (Activo/Inactivo)

### 4. Departamentos (/departamentos)
- ➕ Crear departamentos
- 💼 Gestión de centros de costo

## 🎨 Colores del Sistema

La aplicación usa una paleta azul profesional:
- Primary: Azul (#0ea5e9)
- Secondary: Gris slate
- Success: Verde
- Warning: Amarillo
- Danger: Rojo

## 🔧 Solución de Problemas

### El backend no inicia
```bash
# Verificar Python
python --version  # Debe ser 3.8+

# Reinstalar dependencias
cd backend
pip install --upgrade -r requirements.txt
```

### El frontend no inicia
```bash
# Verificar Node
node --version  # Debe ser 16+

# Limpiar caché y reinstalar
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Error de CORS
- Verificar que el backend esté corriendo en puerto 5000
- Verificar que frontend esté en puerto 5173
- La configuración CORS ya está incluida en Flask

### Base de datos vacía
La base de datos `clinica_arboleda.db` ya contiene datos de ejemplo. Si necesitas datos adicionales:
1. Ve a Departamentos → Crear nuevo
2. Ve a Candidatos → Crear nuevo
3. Cambia estado de candidato a "Contratado"
4. Ve a Empleados → Crear nuevo empleado

## 📊 Estructura de Datos

### Flujo de Trabajo
1. Crear **Departamentos** y **Cargos** (estructura organizacional)
2. Registrar **Candidatos** (proceso de reclutamiento)
3. Cambiar estado de candidato a "Contratado"
4. Crear **Empleado** vinculado al candidato

## 🎯 Próximos Pasos (Post-MVP)

Una vez que tengas el MVP funcionando, puedes agregar:
- [ ] Autenticación de usuarios
- [ ] Módulo de evaluaciones detallado
- [ ] Reportes en PDF/Excel
- [ ] Sistema de permisos y roles
- [ ] Deploy a producción

## 💡 Tips Importantes

1. **Siempre inicia el backend primero** (puerto 5000)
2. **Luego inicia el frontend** (puerto 5173)
3. Los puertos DEBEN ser exactamente estos para que funcione la comunicación
4. La base de datos se actualiza en tiempo real
5. Usa el Dashboard para ver métricas generales

## 📞 ¿Necesitas Ayuda?

Si encuentras problemas:
1. Verifica que ambos servidores estén corriendo
2. Revisa la consola del navegador (F12) para errores
3. Revisa los logs del backend en la terminal
4. Asegúrate de estar en los directorios correctos

---

**¡Listo! Ahora tienes un sistema RRHH funcional para gestionar tu organización.** 🎉
