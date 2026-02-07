from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)

DB_PATH = '../clinica_arboleda.db'

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# ============= CANDIDATOS =============
@app.route('/api/candidatos', methods=['GET'])
def get_candidatos():
    conn = get_db()
    candidatos = conn.execute('SELECT * FROM candidatos ORDER BY fecha_registro DESC').fetchall()
    conn.close()
    return jsonify([dict(c) for c in candidatos])

@app.route('/api/candidatos/<int:id>', methods=['GET'])
def get_candidato(id):
    conn = get_db()
    candidato = conn.execute('SELECT * FROM candidatos WHERE id = ?', (id,)).fetchone()
    conn.close()
    return jsonify(dict(candidato)) if candidato else ('', 404)

@app.route('/api/candidatos', methods=['POST'])
def create_candidato():
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO candidatos (nombre_completo, cedula, email, telefono, profesion,
                                especialidad, registro_senescyt, CV_link, fecha_registro, estado_proceso)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (data['nombre_completo'], data.get('cedula'), data.get('email'), data.get('telefono'),
          data.get('profesion'), data.get('especialidad'), data.get('registro_senescyt'),
          data.get('CV_link'), data.get('fecha_registro', datetime.now().strftime('%Y-%m-%d')),
          data.get('estado_proceso', 'Nuevo')))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return jsonify({'id': new_id}), 201

@app.route('/api/candidatos/<int:id>', methods=['PUT'])
def update_candidato(id):
    data = request.json
    conn = get_db()
    conn.execute('''
        UPDATE candidatos SET nombre_completo=?, cedula=?, email=?, telefono=?,
                              profesion=?, especialidad=?, registro_senescyt=?,
                              CV_link=?, estado_proceso=?
        WHERE id=?
    ''', (data['nombre_completo'], data.get('cedula'), data.get('email'), data.get('telefono'),
          data.get('profesion'), data.get('especialidad'), data.get('registro_senescyt'),
          data.get('CV_link'), data.get('estado_proceso'), id))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/candidatos/<int:id>', methods=['DELETE'])
def delete_candidato(id):
    conn = get_db()
    conn.execute('DELETE FROM candidatos WHERE id=?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

# ============= EMPLEADOS =============
@app.route('/api/empleados', methods=['GET'])
def get_empleados():
    conn = get_db()
    empleados = conn.execute('''
        SELECT e.*, c.nombre_completo, c.cedula, d.nombre as departamento, ca.nombre as cargo
        FROM empleados e
        JOIN candidatos c ON e.candidato_id = c.id
        LEFT JOIN departamentos d ON e.departamento_id = d.id
        LEFT JOIN cargos ca ON e.cargo_id = ca.id
        ORDER BY e.fecha_ingreso DESC
    ''').fetchall()
    conn.close()
    return jsonify([dict(e) for e in empleados])

@app.route('/api/empleados', methods=['POST'])
def create_empleado():
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO empleados (candidato_id, numero_empleado, departamento_id, cargo_id,
                               fecha_ingreso, tipo_contrato, salario_base, estado)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (data['candidato_id'], data.get('numero_empleado'), data.get('departamento_id'),
          data.get('cargo_id'), data['fecha_ingreso'], data.get('tipo_contrato'),
          data.get('salario_base'), data.get('estado', 'Activo')))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return jsonify({'id': new_id}), 201

@app.route('/api/empleados/<int:id>', methods=['PUT'])
def update_empleado(id):
    data = request.json
    conn = get_db()
    conn.execute('''
        UPDATE empleados SET departamento_id=?, cargo_id=?, tipo_contrato=?,
                             salario_base=?, estado=?
        WHERE id=?
    ''', (data.get('departamento_id'), data.get('cargo_id'), data.get('tipo_contrato'),
          data.get('salario_base'), data.get('estado'), id))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/empleados/<int:id>', methods=['DELETE'])
def delete_empleado(id):
    conn = get_db()
    conn.execute('DELETE FROM empleados WHERE id=?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

# ============= DEPARTAMENTOS =============
@app.route('/api/departamentos', methods=['GET'])
def get_departamentos():
    conn = get_db()
    departamentos = conn.execute('SELECT * FROM departamentos').fetchall()
    conn.close()
    return jsonify([dict(d) for d in departamentos])

@app.route('/api/departamentos', methods=['POST'])
def create_departamento():
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO departamentos (nombre, centro_costos) VALUES (?, ?)',
                   (data['nombre'], data.get('centro_costos')))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return jsonify({'id': new_id}), 201

# ============= CARGOS =============
@app.route('/api/cargos', methods=['GET'])
def get_cargos():
    conn = get_db()
    cargos = conn.execute('SELECT * FROM cargos').fetchall()
    conn.close()
    return jsonify([dict(c) for c in cargos])

@app.route('/api/cargos', methods=['POST'])
def create_cargo():
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO cargos (nombre, nivel_riesgo) VALUES (?, ?)',
                   (data['nombre'], data.get('nivel_riesgo')))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return jsonify({'id': new_id}), 201

# ============= DASHBOARD/STATS =============
@app.route('/api/stats', methods=['GET'])
def get_stats():
    conn = get_db()
    stats = {
        'total_candidatos': conn.execute('SELECT COUNT(*) FROM candidatos').fetchone()[0],
        'total_empleados': conn.execute('SELECT COUNT(*) FROM empleados WHERE estado="Activo"').fetchone()[0],
        'candidatos_nuevos': conn.execute('SELECT COUNT(*) FROM candidatos WHERE estado_proceso="Nuevo"').fetchone()[0],
        'empleados_recientes': conn.execute('''
            SELECT COUNT(*) FROM empleados
            WHERE fecha_ingreso >= date('now', '-30 days')
        ''').fetchone()[0]
    }
    conn.close()
    return jsonify(stats)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
