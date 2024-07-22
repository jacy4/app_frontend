import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Navbar from './componentes/navbar/Navbar';
import Login from '../src/views/LOGIN/Login';
import CentrosView from './views/CentrosView';
import UsersView from './views/VIEW_USUARIOS/usuarios_view';
import PaginaInicial from './views/PAGINA_INICIAL/pagina_inicial';
import { TopicsProvider } from './views/DESPORTO/TopicsContext';
import PublicacoesView from './views/PUBLICACOES/publicacao_view';
import Desporto from './views/DESPORTO/desporto';
import EditarDesporto from './views/DESPORTO/editar_desporto';    
import AdicionarDesporto from './views/DESPORTO/adicionar_desporto';
import DefinicoesView from './views/DEFENICOES/defenicoes';
import PartilhasView from './views/ALBUNS_DE_PARTILHAS/partilhas';
import CalendarioView from './views/CALENDARIO/calendario';
import EventosView from './views/EVENTOS/eventos';
import ForunsView from './views/FORUNS/foruns';
import GruposView from './views/GRUPOS/grupos';
import EventosView from './views/EVENTOS/eventos';

import './App.css'; 

const TopicsPage = () => {
    const { areaId } = useParams(); // Extrair o areaId dos parâmetros da URL
    return (
        <TopicsProvider areaId={areaId}>
            <Desporto />
        </TopicsProvider>
    );
};

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
                <Route path="/defenicoes" element={<DefinicoesView />} />
                <Route path="/criar_publicacao" element={<PublicacoesView />} />
                <Route path="/pagina_inicial" element={<PaginaInicial />} />
                <Route path="/pagina_partilhas" element={<PartilhasView />} />
                <Route path="/pagina_calendario" element={<CalendarioView />} />
                <Route path="/pagina_eventos" element={<EventosView />} />
                <Route path="/pagina_foruns" element={<ForunsView />} />
                <Route path="/pagina_grupos" element={<GruposView />} />




                <Route path="/listar_topicos/:areaId" element={<TopicsPage />} />
                
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
