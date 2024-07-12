import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import portugueseFlag from '../componentes/logo192.png';
import userAvatar from '../componentes/logo192.png';

const areas = [
  { name: 'Desporto', id: 1 },
  { name: 'Saúde', id: 2 },
  { name: 'Gastronomia', id: 3 },
  { name: 'Formação', id: 4 },
  { name: 'Alojamento', id: 5 },
  { name: 'Transportes', id: 6 },
  { name: 'Lazer', id: 7 },
];

const Navbar = () => {
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const [centroId, setCentroId] = useState(null);
  const [centroName, setCentroName] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');
  const location = useLocation();

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

  useEffect(() => {
    // Keep the menu item active based on the current path
    const path = location.pathname.split('/')[1];
    if (path) {
      setSelectedMenu(path.charAt(0).toUpperCase() + path.slice(1));
    }
  }, [location]);

  const fetchCentroName = async (id) => {
    try {
      const response = await axios.get(`https://backend-teste-q43r.onrender.com/centros/obternomecentro/${id}`);
      setCentroName(response.data.nome);
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  const handleMenuClick = (menu, parentMenu) => {
    setSelectedMenu(menu);
    // Keep the parent menu open
    if (parentMenu) {
      setSubMenuOpen((prevState) => ({
        ...prevState,
        [parentMenu]: true,
      }));
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
              onClick={() => handleMenuClick('Página Inicial')}
            >
              Página Inicial
            </Link>
          </li>
          <li onClick={() => toggleSubMenu('areas')}>
            Áreas <span className={`fas fa-chevron-${subMenuOpen['areas'] ? 'up' : 'down'}`}></span>
            {subMenuOpen['areas'] && (
              <ul className="sub-menu">
                {areas.map(area => (
                  <li key={area.id} onClick={(e) => { e.stopPropagation(); toggleSubMenu(area.name); }}>
                    {area.name} <span className={`fas fa-chevron-${subMenuOpen[area.name] ? 'up' : 'down'}`}></span>
                    {subMenuOpen[area.name] && (
                      <ul className="sub-menu">
                        <li>
                          <Link
                            to={`/topicos/${area.id}`}
                            className={selectedMenu === 'Tópicos' ? 'active' : ''}
                            onClick={() => handleMenuClick('Tópicos', area.name)}
                          >
                            Tópicos
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/eventos/${area.id}`}
                            className={selectedMenu === 'Eventos' ? 'active' : ''}
                            onClick={() => handleMenuClick('Eventos', area.name)}
                          >
                            Eventos
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/foruns/${area.id}`}
                            className={selectedMenu === 'Fóruns' ? 'active' : ''}
                            onClick={() => handleMenuClick('Fóruns', area.name)}
                          >
                            Fóruns
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/publicacoes/${area.id}`}
                            className={selectedMenu === 'Publicações' ? 'active' : ''}
                            onClick={() => handleMenuClick('Publicações', area.name)}
                          >
                            Publicações
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/albuns/${area.id}`}
                            className={selectedMenu === 'Álbuns' ? 'active' : ''}
                            onClick={() => handleMenuClick('Álbuns', area.name)}
                          >
                            Álbuns de partilhas
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/grupos/${area.id}`}
                            className={selectedMenu === 'Grupos' ? 'active' : ''}
                            onClick={() => handleMenuClick('Grupos', area.name)}
                          >
                            Grupos
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/calendario/${area.id}`}
                            className={selectedMenu === 'Calendário' ? 'active' : ''}
                            onClick={() => handleMenuClick('Calendário', area.name)}
                          >
                            Calendário
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                ))}
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
                onClick={() => handleMenuClick('Usuários')}
              >
                Usuários
              </Link>
            </li>
            <li>
              <Link
                to="/criar_publicacao"
                className={selectedMenu === 'Definições' ? 'active' : ''}
                onClick={() => handleMenuClick('Definições')}
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
