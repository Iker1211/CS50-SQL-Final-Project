import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/candidatos', label: 'Candidatos' },
    { path: '/empleados', label: 'Empleados' },
    { path: '/departamentos', label: 'Departamentos' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-primary-800 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">RRHH System</h1>
          <p className="text-primary-200 text-sm">Gestión Integral</p>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-6 py-3 hover:bg-primary-700 transition ${
                isActive(item.path) ? 'bg-primary-700 border-l-4 border-white' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
