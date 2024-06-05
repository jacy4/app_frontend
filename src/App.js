import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import CentrosView from './views/CentrosView';
import UsersView from './views/usuarios_view';

function App() {
  return (
    <div > 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<CentrosView />} />
          <Route path="/listar_centros" element={<CentrosView />} />
          <Route path="/listar_users" element={<UsersView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
