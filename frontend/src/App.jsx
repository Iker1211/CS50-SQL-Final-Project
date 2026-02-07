import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Candidatos from './pages/Candidatos';
import Empleados from './pages/Empleados';
import Departamentos from './pages/Departamentos';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/candidatos" element={<Candidatos />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/departamentos" element={<Departamentos />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
