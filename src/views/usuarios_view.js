import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";

const UsuariosView = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        const response = await axios.get('https://backend-teste-q43r.onrender.com/users/listarUsers');
        if (response.data && Array.isArray(response.data)) {
          console.log(response.data);
          setUsuarios(response.data);
        } else {
          console.error('Resposta da API vazia ou formato de dados incorreto');
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setError(error.message);
      }
    };

    buscarUsuarios(); 

  }, []); // Faz a chamada do useEffect uma única vez, passando um array vazio de dependências

  if (usuarios.length === 0) {
    return <div className='empty-message'>Nenhum usuário disponível.</div>;
  }

  return (
    <div className='fundo_principal_porcausa_do_side_bar'>
      <div className="inner-div">
        <h2>Lista de Usuários</h2>
        <table>
          <thead>
            <tr>
              <th>#</th> {/* Cabeçalho para o ID */}
              <th>Avatar</th> {/* Cabeçalho para o avatar */}
              <th>Nome</th> {/* Cabeçalho para o nome */}
              <th>Sobrenome</th> {/* Cabeçalho para o sobrenome */}
            </tr>
          </thead>
          <tbody>
            {usuarios.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td><img src="opt/render/project/src/IMAGENS/image-1717631529127-926903368.jpg" alt="Avatar"  /></td>
                <td>{usuario.nome}</td>
                <td>{usuario.sobrenome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsuariosView;
