import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import logo from './logotipo-softinsa.png'; // Ajuste o caminho conforme necessário

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://backend-teste-q43r.onrender.com/admin/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const data = response.data;
        sessionStorage.setItem('centro_id', data.centro_id);
        sessionStorage.setItem('user_id', data.user_id);
        sessionStorage.setItem('token', data.token);
        // console.log('Token JWT:', data.token);
        // console.log('User ID salvo no sessionStorage:', data.user_id); // Adicione este log
        onLogin();
      } else {
        alert(response.data.error || 'Credenciais inválidas!');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login, tente novamente mais tarde');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container">
      <div className="loginBox">
        <img src={logo} alt="Softinsa Logo" className="login-logo" />
        <p className="instruction">Por favor, insira os seus dados de administrador</p>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="checkboxContainer">
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe" className="checkboxLabel">Lembrar de mim</label>
        </div>
        <button className="button" onClick={handleLogin} disabled={loading}>
          {loading ? <div className="loader"></div> : 'Entrar'}
        </button>
        <p className="forgotPassword">Esqueceu-se da palavra-passe?</p>
      </div>
    </div>
  );
};

export default Login;
