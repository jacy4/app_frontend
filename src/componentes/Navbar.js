import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import portugueseFlag from '../componentes/logo192.png';
import userAvatar from '../componentes/logo192.png';

const Navbar = () => {
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const [centroId, setCentroId] = useState(null);
  const [centroName, setCentroName] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('Página Inicial');

  const toggleSubMenu = (menu) => {
    setSubMenuOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  useEffect(() => {
    const storedCentroId = sessionStorage.getItem('centro_id');
    if (storedCentroId) {
      setCentroId(storedCentroId);
      fetchCentroName(storedCentroId);
    }
  }, []);

  const fetchCentroName = async (id) => {
    try {
      const response = await axios.get(`https://backend-teste-q43r.onrender.com/centros/obternomecentro/${id}`);
      setCentroName(response.data.nome);
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo-container">
            <div className="menu-icon">
              <i className="fas fa-bars"></i>
            </div>
            <a href="/" className="navbar-logo font-extrabold text-blue-500">SOFTINSA</a>
          </div>
          <div className="navbar-admin-panel-container">
            <span className="navbar-admin-panel">PAINEL DE ADMINISTRAÇÃO</span>
            <span className="navbar-location">{centroName}</span>
          </div>
          <div className="navbar-right">
            <div className="navbar-notifications">
              <i className="fas fa-bell"></i>
              <span className="notification-count">4</span>
            </div>
            <div className="navbar-language">
              <img src={portugueseFlag} alt="Portuguese flag" />
              <span>Português</span>
            </div>
            <div className="navbar-user">
              <img src={userAvatar} alt="User avatar" className="user-avatar" />
              <span className="user-name">Diogo Ferreira</span>
              <span className="user-role">Gestor</span>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="sidebar">
        <ul className="sidebar-menu">
          <li>
            <Link
              to="/pagina_inicial"
              className={`navbar-link ${selectedMenu === 'Página Inicial' ? 'active' : ''}`}
              onClick={() => setSelectedMenu('Página Inicial')}
            >
              Página Inicial
            </Link>
          </li>
          <li onClick={() => toggleSubMenu('areas')}>
            Áreas <span className={`fas fa-chevron-${subMenuOpen['areas'] ? 'up' : 'down'}`}></span>
            {subMenuOpen['areas'] && (
              <ul className="sub-menu">
                <li>
                  <Link
                    to="#"
                    className={selectedMenu === 'Desporto' ? 'active' : ''}
                    onClick={() => setSelectedMenu('Desporto')}
                  >
                    Desporto
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className={selectedMenu === 'Saúde' ? 'active' : ''}
                    onClick={() => setSelectedMenu('Saúde')}
                  >
                    Saúde
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className={selectedMenu === 'Gastronomia' ? 'active' : ''}
                    onClick={() => setSelectedMenu('Gastronomia')}
                  >
                    Gastronomia
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className={selectedMenu === 'Formação' ? 'active' : ''}
                    onClick={() => setSelectedMenu('Formação')}
                  >
                    Formação
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className={selectedMenu === 'Alojamento' ? 'active' : ''}
                    onClick={() => setSelectedMenu('Alojamento')}
                  >
                    Alojamento
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className={selectedMenu === 'Transportes' ? 'active' : ''}
                    onClick={() => setSelectedMenu('Transportes')}
                  >
                    Transportes
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className={selectedMenu === 'Lazer' ? 'active' : ''}
                    onClick={() => setSelectedMenu('Lazer')}
                  >
                    Lazer
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
        <div className="bottom-menu">
          <ul className="sidebar-menu">
            <li>
              <Link
                to="/listar_users"
                className={selectedMenu === 'Usuários' ? 'active' : ''}
                onClick={() => setSelectedMenu('Usuários')}
              >
                Usuários
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className={selectedMenu === 'Definições' ? 'active' : ''}
                onClick={() => setSelectedMenu('Definições')}
              >
                Definições
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
