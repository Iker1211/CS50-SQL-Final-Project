import { useState, useEffect } from 'react';
import { departamentosAPI } from '../services/api';
import Table from '../components/Table';
import Modal from '../components/Modal';
import FormField from '../components/FormField';

export default function Departamentos() {
  const [departamentos, setDepartamentos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    centro_costos: '',
  });

  useEffect(() => {
    loadDepartamentos();
  }, []);

  const loadDepartamentos = async () => {
    try {
      const res = await departamentosAPI.getAll();
      setDepartamentos(res.data);
    } catch (error) {
      console.error('Error cargando departamentos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await departamentosAPI.create(formData);
      loadDepartamentos();
      closeModal();
    } catch (error) {
      console.error('Error guardando departamento:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ nombre: '', centro_costos: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'centro_costos', label: 'Centro de Costos' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Departamentos</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          Nuevo Departamento
        </button>
      </div>

      <Table columns={columns} data={departamentos} />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Nuevo Departamento"
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <FormField
            label="Centro de Costos"
            name="centro_costos"
            value={formData.centro_costos}
            onChange={handleChange}
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
              Crear
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
