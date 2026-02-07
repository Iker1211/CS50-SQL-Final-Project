import { useState, useEffect } from 'react';
import { statsAPI } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await statsAPI.get();
      setStats(res.data);
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    }
  };

  if (!stats) return <div className="text-center py-8">Cargando...</div>;

  const cards = [
    { title: 'Total Candidatos', value: stats.total_candidatos, color: 'bg-blue-500' },
    { title: 'Empleados Activos', value: stats.total_empleados, color: 'bg-green-500' },
    { title: 'Candidatos Nuevos', value: stats.candidatos_nuevos, color: 'bg-yellow-500' },
    { title: 'Ingresos Recientes (30d)', value: stats.empleados_recientes, color: 'bg-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className={`${card.color} px-6 py-4`}>
              <h3 className="text-white text-sm font-medium">{card.title}</h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-4xl font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Resumen del Sistema RRHH</h2>
        <p className="text-gray-600">
          Sistema de gestión de recursos humanos para administración de candidatos, empleados,
          departamentos y evaluaciones. Navega por las secciones del menú lateral para gestionar cada módulo.
        </p>
      </div>
    </div>
  );
}
