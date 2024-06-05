import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import CentrosView from './views/CentrosView';

function App() {
  return (
    <div className="background-image"> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<CentrosView />} />
          <Route path="/listar_centros" element={<CentrosView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
