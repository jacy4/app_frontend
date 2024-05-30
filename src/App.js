import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import CentrosView from './views/CentrosView';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/centros" element={<CentrosView />} />
      </Routes>
    </Router>
  );
}
