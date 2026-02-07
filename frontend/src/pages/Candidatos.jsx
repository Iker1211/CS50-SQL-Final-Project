import { useState, useEffect } from 'react';
import { candidatosAPI } from '../services/api';
import Table from '../components/Table';
import Modal from '../components/Modal';
import FormField from '../components/FormField';

export default function Candidatos() {
  const [candidatos, setCandidatos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre_completo: '',
    cedula: '',
    email: '',
    telefono: '',
    profesion: '',
    especialidad: '',
    registro_senescyt: '',
    CV_link: '',
    estado_proceso: 'Nuevo',
  });

  useEffect(() => {
    loadCandidatos();
  }, []);

  const loadCandidatos = async () => {
    try {
      const res = await candidatosAPI.getAll();
      setCandidatos(res.data);
    } catch (error) {
      console.error('Error cargando candidatos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        fecha_registro: new Date().toISOString().split('T')[0],
      };

      if (editingId) {
        await candidatosAPI.update(editingId, dataToSend);
      } else {
        await candidatosAPI.create(dataToSend);
      }

      loadCandidatos();
      closeModal();
    } catch (error) {
      console.error('Error guardando candidato:', error);
      alert('Error guardando candidato');
    }
  };

  const handleEdit = (candidato) => {
    setEditingId(candidato.id);
    setFormData(candidato);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este candidato?')) return;
    try {
      await candidatosAPI.delete(id);
      loadCandidatos();
    } catch (error) {
      console.error('Error eliminando candidato:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      nombre_completo: '',
      cedula: '',
      email: '',
      telefono: '',
      profesion: '',
      especialidad: '',
      registro_senescyt: '',
      CV_link: '',
      estado_proceso: 'Nuevo',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const columns = [
    { key: 'nombre_completo', label: 'Nombre' },
    { key: 'cedula', label: 'Cédula' },
    { key: 'email', label: 'Email' },
    { key: 'profesion', label: 'Profesión' },
    {
      key: 'estado_proceso',
      label: 'Estado',
      render: (row) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          row.estado_proceso === 'Contratado' ? 'bg-green-200 text-green-800' :
          row.estado_proceso === 'Aplicando' ? 'bg-blue-200 text-blue-800' :
          'bg-yellow-200 text-yellow-800'
        }`}>
          {row.estado_proceso}
        </span>
      )
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Candidatos</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          Nuevo Candidato
        </button>
      </div>

      <Table
        columns={columns}
        data={candidatos}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingId ? 'Editar Candidato' : 'Nuevo Candidato'}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="Nombre Completo"
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleChange}
            required
          />
          <FormField
            label="Cédula"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <FormField
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
          <FormField
            label="Profesión"
            name="profesion"
            value={formData.profesion}
            onChange={handleChange}
          />
          <FormField
            label="Especialidad"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleChange}
          />
          <FormField
            label="Registro SENESCYT"
            name="registro_senescyt"
            value={formData.registro_senescyt}
            onChange={handleChange}
          />
          <FormField
            label="Link CV"
            name="CV_link"
            type="url"
            value={formData.CV_link}
            onChange={handleChange}
          />
          <FormField
            label="Estado del Proceso"
            name="estado_proceso"
            type="select"
            value={formData.estado_proceso}
            onChange={handleChange}
            options={[
              { value: 'Nuevo', label: 'Nuevo' },
              { value: 'Aplicando', label: 'Aplicando' },
              { value: 'Contratado', label: 'Contratado' },
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
