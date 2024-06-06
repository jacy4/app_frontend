import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import CentrosView from './views/CentrosView';
import UsersView from './views/usuarios_view';
import ImagensView from './views/imagens_view';

function App() {
  return (
    <div > 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<CentrosView />} />
          <Route path="/listar_centros" element={<CentrosView />} />
          <Route path="/listar_users" element={<UsersView />} />
          <Route path="/listar_imagens" element={<ImagensView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
