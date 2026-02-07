import { useState, useEffect } from 'react';
import { empleadosAPI, candidatosAPI, departamentosAPI, cargosAPI } from '../services/api';
import Table from '../components/Table';
import Modal from '../components/Modal';
import FormField from '../components/FormField';

export default function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [candidatos, setCandidatos] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    candidato_id: '',
    numero_empleado: '',
    departamento_id: '',
    cargo_id: '',
    fecha_ingreso: '',
    tipo_contrato: '',
    salario_base: '',
    estado: 'Activo',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [empRes, candRes, depRes, carRes] = await Promise.all([
        empleadosAPI.getAll(),
        candidatosAPI.getAll(),
        departamentosAPI.getAll(),
        cargosAPI.getAll(),
      ]);
      setEmpleados(empRes.data);
      setCandidatos(candRes.data.filter(c => c.estado_proceso === 'Contratado'));
      setDepartamentos(depRes.data);
      setCargos(carRes.data);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await empleadosAPI.update(editingId, formData);
      } else {
        await empleadosAPI.create(formData);
      }
      loadData();
      closeModal();
    } catch (error) {
      console.error('Error guardando empleado:', error);
      alert('Error guardando empleado');
    }
  };

  const handleEdit = (empleado) => {
    setEditingId(empleado.id);
    setFormData({
      candidato_id: empleado.candidato_id,
      numero_empleado: empleado.numero_empleado,
      departamento_id: empleado.departamento_id,
      cargo_id: empleado.cargo_id,
      fecha_ingreso: empleado.fecha_ingreso,
      tipo_contrato: empleado.tipo_contrato,
      salario_base: empleado.salario_base,
      estado: empleado.estado,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este empleado?')) return;
    try {
      await empleadosAPI.delete(id);
      loadData();
    } catch (error) {
      console.error('Error eliminando empleado:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      candidato_id: '',
      numero_empleado: '',
      departamento_id: '',
      cargo_id: '',
      fecha_ingreso: '',
      tipo_contrato: '',
      salario_base: '',
      estado: 'Activo',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const columns = [
    { key: 'numero_empleado', label: 'Nº Empleado' },
    { key: 'nombre_completo', label: 'Nombre' },
    { key: 'departamento', label: 'Departamento' },
    { key: 'cargo', label: 'Cargo' },
    { key: 'fecha_ingreso', label: 'Fecha Ingreso' },
    {
      key: 'estado',
      label: 'Estado',
      render: (row) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          row.estado === 'Activo' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
        }`}>
          {row.estado}
        </span>
      )
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Empleados</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          Nuevo Empleado
        </button>
      </div>

      <Table
        columns={columns}
        data={empleados}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingId ? 'Editar Empleado' : 'Nuevo Empleado'}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="Candidato"
            name="candidato_id"
            type="select"
            value={formData.candidato_id}
            onChange={handleChange}
            options={candidatos.map(c => ({ value: c.id, label: c.nombre_completo }))}
            required
          />
          <FormField
            label="Número de Empleado"
            name="numero_empleado"
            value={formData.numero_empleado}
            onChange={handleChange}
          />
          <FormField
            label="Departamento"
            name="departamento_id"
            type="select"
            value={formData.departamento_id}
            onChange={handleChange}
            options={departamentos.map(d => ({ value: d.id, label: d.nombre }))}
          />
          <FormField
            label="Cargo"
            name="cargo_id"
            type="select"
            value={formData.cargo_id}
            onChange={handleChange}
            options={cargos.map(c => ({ value: c.id, label: c.nombre }))}
          />
          <FormField
            label="Fecha de Ingreso"
            name="fecha_ingreso"
            type="date"
            value={formData.fecha_ingreso}
            onChange={handleChange}
            required
          />
          <FormField
            label="Tipo de Contrato"
            name="tipo_contrato"
            value={formData.tipo_contrato}
            onChange={handleChange}
          />
          <FormField
            label="Salario Base"
            name="salario_base"
            type="number"
            value={formData.salario_base}
            onChange={handleChange}
          />
          <FormField
            label="Estado"
            name="estado"
            type="select"
            value={formData.estado}
            onChange={handleChange}
            options={[
              { value: 'Activo', label: 'Activo' },
              { value: 'Inactivo', label: 'Inactivo' },
            ]}
            required
          />

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              {editingId ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
