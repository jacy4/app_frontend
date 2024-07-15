import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import portugueseFlag from '../portugal.png';
import userAvatar from '../logo192.png';

const areas = [
  { name: 'Desporto', id: 1 },
  { name: 'Saúde', id: 2 },
  { name: 'Gastronomia', id: 3 },
  { name: 'Formação', id: 4 },
  { name: 'Alojamento', id: 7 },
  { name: 'Transportes', id: 6 },
  { name: 'Lazer', id: 5 },
];

const Navbar = () => {
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const [centroId, setCentroId] = useState(null);
  const [centroName, setCentroName] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');
  const location = useLocation();
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [userPhoto, setUserPhoto] = useState('');

  const toggleSubMenu = (menu) => {
    setSubMenuOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  useEffect(() => {
    const storedCentroId = sessionStorage.getItem('centro_id');
    const storedUserId = sessionStorage.getItem('user_id');
    if (storedCentroId) {
      setCentroId(storedCentroId);
      fetchCentroName(storedCentroId);
    }
    if (storedUserId) {
      fetchUserDetails(storedUserId);
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
  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`https://backend-teste-q43r.onrender.com/users/detalhes_user/${userId}`);
      setUserName(response.data.nome);
      setUserSurname(response.data.sobrenome);
      setUserPhoto(response.data.caminho_foto);
    } catch (error) {
      console.error('Erro ao buscar detalhes do usuário:', error);
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
              <span className="notification-count">0</span>
            </div>
            <div className="navbar-language">
              <img src={portugueseFlag} alt="Portuguese flag" />
              <span>Português</span>
            </div>
            <div className="navbar-user">
  {userPhoto && <img src={userPhoto} alt="User avatar" className="user-avatar" />}
  <div className="user-info">
    <span className="user-name">{`${userName} ${userSurname}`}</span>
    <span className="user-role">Gestor</span>
  </div>
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
                            to={`/listar_topicos/${area.id}`}
                            className={selectedMenu === 'Tópicos' ? 'active' : ''}
                            onClick={() => handleMenuClick('Tópicos', area.name)}
                          >
                            Tópicos
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/pagina_eventos`}
                            className={selectedMenu === 'Eventos' ? 'active' : ''}
                            onClick={() => handleMenuClick('Eventos', area.name)}
                          >
                            Eventos
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/pagina_foruns`}
                            className={selectedMenu === 'Fóruns' ? 'active' : ''}
                            onClick={() => handleMenuClick('Fóruns', area.name)}
                          >
                            Fóruns
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={ "/criar_publicacao" }
                            className={selectedMenu === 'Publicações' ? 'active' : ''}
                            onClick={() => handleMenuClick('Publicações', area.name)}
                          >
                            Publicações
                          </Link>

                        </li>
                        <li>
                          <Link
                            to={`/pagina_partilhas`}
                            className={selectedMenu === 'Álbuns' ? 'active' : ''}
                            onClick={() => handleMenuClick('Álbuns', area.name)}
                          >
                            Álbuns de partilhas
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/pagina_grupos`}
                            className={selectedMenu === 'Grupos' ? 'active' : ''}
                            onClick={() => handleMenuClick('Grupos', area.name)}
                          >
                            Grupos
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/pagina_calendario`}
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
                to="/defenicoes"
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
