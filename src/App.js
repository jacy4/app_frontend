import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Login from '../src/views/LOGIN/Login';
import CentrosView from './views/CentrosView';
import UsersView from './views/VIEW_USUARIOS/usuarios_view';
import PaginaInicial from './views/PAGINA_INICIAL/pagina_inicial';
import { TopicsProvider } from './views/DESPORTO/TopicsContext';
import PublicacoesView from './views/PUBLICACOES/publicacao_view';
import Desporto from './views/DESPORTO/desporto';
import EditarDesporto from './views/DESPORTO/editar_desporto';    
import AdicionarDesporto from './views/DESPORTO/adicionar_desporto';

import './App.css'; // Certifique-se de ajustar o caminho conforme necessário

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className={isAuthenticated ? "container" : "login-container"}>
      {isAuthenticated && <Navbar />}
          <Routes>
            <Route path="/" element={
              isAuthenticated ? <Navigate to="/pagina_inicial" /> : <Login onLogin={handleLogin} />
            } />
            {isAuthenticated && (
              <>
                <Route path="/listar_centros" element={<CentrosView />} />
                <Route path="/listar_users" element={<UsersView />} />
                <Route path="/criar_publicacao" element={<PublicacoesView />} />
                <Route path="/pagina_inicial" element={<PaginaInicial />} />
                <Route path="/desporto" element={
                <TopicsProvider>
                  <Desporto />
                </TopicsProvider>
              } />
              <Route path="/editar_desporto" element={
                <TopicsProvider>
                  <EditarDesporto />
                </TopicsProvider>
              } />
              <Route path="/adicionar_desporto" element={
                <TopicsProvider>
                  <AdicionarDesporto />
                </TopicsProvider>
              } />
            </>
          )}
        </Routes>
        </div>
      
    </Router>
  );
}

export default App;
