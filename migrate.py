import sqlite3

# Migración: activar tablas empleados sin perder datos
db_path = 'clinica_arboleda.db'

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Verificar si las tablas ya existen
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    existing_tables = [row[0] for row in cursor.fetchall()]

    print(f"Tablas existentes: {existing_tables}")

    # Crear tabla empleados si no existe
    if 'empleados' not in existing_tables:
        cursor.execute('''
        CREATE TABLE "empleados" (
            "id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "candidato_id" INTEGER UNIQUE NOT NULL,
            "numero_empleado" TEXT UNIQUE,
            "departamento_id" INTEGER,
            "cargo_id" INTEGER,
            "fecha_ingreso" DATE NOT NULL,
            "tipo_contrato" TEXT,
            "salario_base" REAL,
            "estado" TEXT DEFAULT 'Activo',
            FOREIGN KEY ("candidato_id") REFERENCES "candidatos"("id"),
            FOREIGN KEY ("departamento_id") REFERENCES "departamentos"("id"),
            FOREIGN KEY ("cargo_id") REFERENCES "cargos"("id")
        )
        ''')
        print("✓ Tabla 'empleados' creada")
    else:
        print("✓ Tabla 'empleados' ya existe")

    # Crear tabla historial_laboral si no existe
    if 'historial_laboral' not in existing_tables:
        cursor.execute('''
        CREATE TABLE "historial_laboral" (
            "id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "empleado_id" INTEGER NOT NULL,
            "fecha_cambio" DATE DEFAULT CURRENT_DATE,
            "cargo_anterior_id" INTEGER,
            "cargo_nuevo_id" INTEGER,
            "motivo_cambio" TEXT,
            FOREIGN KEY ("empleado_id") REFERENCES "empleados"("id")
        )
        ''')
        print("✓ Tabla 'historial_laboral' creada")
    else:
        print("✓ Tabla 'historial_laboral' ya existe")

    conn.commit()
    print("\n✅ Migración completada exitosamente")

except sqlite3.Error as e:
    print(f"❌ Error: {e}")
finally:
    if conn:
        conn.close()
