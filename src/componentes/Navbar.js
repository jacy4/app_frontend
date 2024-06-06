import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
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
          <ul className="navbar-menu">
            <li><a href="#">Painel de Administração</a></li>
            <li><a href="#">Viseu</a></li>
            <li><a href="#">Português</a></li>
            <li><a href="#">Diogo Ferreira</a></li>
            <li className="navbar-menu-item-dropdown">
              <a href="#">Gestor</a>
              <ul className="navbar-menu-dropdown-content">
                <li><a href="#">Perfil</a></li>
                <li><a href="#">Definições</a></li>
                <li><a href="#">Sair</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="sidebar">
        <ul class="sidebar-menu top-options">
          <li><a href="#">Página Inicial</a></li>
          <li><Link to="/listar_imagens">imagens</Link></li>
        </ul>
        <ul class="sidebar-menu bottom-options">
        <li><Link to="/listar_users">Usuários</Link></li> 
          <li><a href="#">Definições</a></li>
  </ul>

      </div>
  
    </>
  );
};

export default Navbar;
