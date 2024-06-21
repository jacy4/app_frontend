import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('centro_id', data.centro_id);
        onLogin();
      } else {
        alert(data.error || 'Credenciais inválidas!');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login, tente novamente mais tarde');
    }
  };

  return (
    <div className="container">
      <div className="loginBox">
        <h1 className="title">SOFTINSA</h1>
        <p className="subtitle">AN IBM SUBSIDIARY</p>
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
        <button className="button" onClick={handleLogin}>Entrar</button>
        <p className="forgotPassword">Esqueceu-se da palavra-passe?</p>
      </div>
    </div>
  );
};

export default Login;
