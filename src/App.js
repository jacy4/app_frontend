import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import CentrosView from './views/CentrosView';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CentrosView/>} />
        <Route path="/listar_centros" element={<CentrosView/>} />
      </Routes>
    </Router>
  );
}

export default App;