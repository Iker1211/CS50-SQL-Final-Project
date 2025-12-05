-- 1. ESTRUCTURA ORGANIZACIONAL
CREATE TABLE "departamentos" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "centro_costos" TEXT
);

CREATE TABLE "cargos" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "nivel_riesgo" TEXT
);

-- 2. CANDIDATOS (PROCESO DE RECLUTAMIENTO)
CREATE TABLE "candidatos" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nombre_completo" TEXT NOT NULL,
    "cedula" TEXT UNIQUE,
    "email" TEXT,
    "telefono" TEXT,
    "profesion" TEXT,
    "especialidad" TEXT,
    "registro_senescyt" TEXT,
    "CV_link" TEXT,
    -- registro_msp_acess TEXT, esto se agrega?
    "fecha_registro" TEXT NOT NULL,
    "estado_proceso" TEXT NOT NULL CHECK("estado_proceso" IN ('Aplicando', 'Nuevo', 'Contratado'))
);

CREATE TABLE "evaluaciones" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "candidato_id" INTEGER,
    "fecha_entrevista" TEXT,
    "entrevistador" TEXT,
    -- puntaje_tecnico INTEGER,
    -- puntaje_psicometrico INTEGER,
    "observaciones" TEXT,
    -- "resultado" TEXT,
    FOREIGN KEY ("candidato_id") REFERENCES "candidatos"("id")
);

-- 4. PRUEBAS PSICOMÉTRICAS
CREATE TABLE "test_bfi" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "candidato_id" INTEGER NOT NULL,
    "fecha_toma" DATE DEFAULT CURRENT_DATE,
    "extraversion" REAL,
    "amabilidad" REAL,
    "responsabilidad" REAL,
    "emocionalidad_negativa" REAL,
    "apertura_mente" REAL,
    "perfil_riesgo" TEXT,
    FOREIGN KEY ("candidato_id") REFERENCES "candidatos"("id")
);

CREATE TABLE "test_cope" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "candidato_id" INTEGER NOT NULL,
    "fecha_toma" DATE DEFAULT CURRENT_DATE,
    "afrontamiento_activo" REAL,
    "planificacion" REAL,
    "apoyo_emocional" REAL,
    "apoyo_social" REAL,
    "religion" REAL,
    "reevaluacion_positiva" REAL,
    "aceptacion" REAL,
    "humor" REAL,
    "negacion" REAL,
    "autodistraccion" REAL,
    "desconexion" REAL,
    "desahogo" REAL,
    "uso_sustancias" REAL,
    FOREIGN KEY ("candidato_id") REFERENCES "candidatos"("id")
);

CREATE TABLE "inteligencia" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "candidato_id" INTEGER NOT NULL,
    "percentil" INTEGER NOT NULL,
    FOREIGN KEY ("candidato_id") REFERENCES "candidatos"("id")
);

-- -- 5. GESTIÓN DE EMPLEADOS (PLANTILLA)
-- CREATE TABLE "empleados" (
--     "id" INTEGER PRIMARY KEY AUTOINCREMENT,
--     "candidato_id" INTEGER UNIQUE NOT NULL,
--     "numero_empleado" TEXT UNIQUE,
--     "departamento_id" INTEGER,
--     "cargo_id" INTEGER,
--     "fecha_ingreso" DATE NOT NULL,
--     "tipo_contrato" TEXT,
--     "salario_base" REAL,
--     "estado" TEXT DEFAULT 'Activo',
--     FOREIGN KEY ("candidato_id") REFERENCES "candidatos"("id"),
--     FOREIGN KEY ("departamento_id") REFERENCES "departamentos"("id"),
--     FOREIGN KEY ("cargo_id") REFERENCES "cargos"("id")
-- );

-- CREATE TABLE "historial_laboral" (
--     "id" INTEGER PRIMARY KEY AUTOINCREMENT,
--     "empleado_id" INTEGER NOT NULL,
--     "fecha_cambio" DATE DEFAULT CURRENT_DATE,
--     "cargo_anterior_id" INTEGER,
--     "cargo_nuevo_id" INTEGER,
--     "motivo_cambio" TEXT,
--     FOREIGN KEY ("empleado_id") REFERENCES "empleados"("id")
-- );