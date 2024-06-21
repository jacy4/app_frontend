import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserView.css'; 
import CreateUserButton from '../../componentes/botao_view_usuarios/criar_user';

const UsuariosView = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUserList, setShowUserList] = useState(true);
  const [selectedButton, setSelectedButton] = useState('list'); // Define o botão "list" como selecionado por padrão
  const [imageSrc, setImageSrc] = useState(null); // Estado para imagem escolhida
  const [centroId, setCentroId] = useState(null);

  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const storedCentroId = sessionStorage.getItem('centro_id');
    if (storedCentroId) {
      setCentroId(storedCentroId);
    }
  }, []);

  useEffect(() => {
    const buscarUsuarios = async () => {
      if (!centroId) {
        console.log('centroId não definido');
        return;
      }
      console.log(`Buscando usuários para centroId: ${centroId}`);
      try {
        const response = await axios.get(`http://localhost:3000/users/listarUsers/${centroId}`);
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
  }, [centroId]);
   // Adiciona centroId como dependência para garantir que a busca ocorra quando centroId for definido

  const formatarData = (data) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(data).toLocaleDateString('pt-PT', options);
  };

  const handleCreateUserClick = () => {
    setShowCreateForm(true);
    setShowUserList(false);
    setSelectedButton('create'); // Define o botão selecionado
  };

  const handleShowUserListClick = () => {
    setShowCreateForm(false);
    setShowUserList(true);
    setSelectedButton('list'); // Define o botão selecionado
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('key', '4d755673a2dc94483064445f4d5c54e9'); // substitua pela sua chave da API imgbb
    formData.append('image', file);
    formData.append('name', nome); // ou qualquer outro nome que você queira dar para a imagem

    const response = await axios.post('https://api.imgbb.com/1/upload', formData);
    return response.data.data.url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput.files.length > 0) {
        const imageUrl = await uploadImage(fileInput.files[0]);
        const response = await axios.post('http://localhost:3000/users/create', {
          nome,
          sobrenome,
          email,
          senha,
          sobre_min: "Olá, sou novo na SoftShare!!",
          caminho_foto: imageUrl,
          centro_id: centroId // Passar o centro_id correto aqui
        });
        if (response.status === 200) {
          alert('Usuário criado com sucesso!');
          setShowCreateForm(false);
          setShowUserList(true);
          // Atualize a lista de usuários após criar um novo usuário
          setUsuarios([...usuarios, response.data]);
        } else {
          alert('Erro ao criar usuário.');
        }
      } else {
        alert('Por favor, selecione uma imagem.');
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário.');
    }
  };

  if (error) {
    return <div className='error-message'>Erro ao buscar usuários: {error}</div>;
  }

  if (usuarios.length === 0) {
    return <div className='empty-message'>Nenhum usuário disponível.</div>;
  }

  return (
    <div className="div_princ"> 
      <h1 className="title2">Lista de Usuarios deste Centro</h1>
      <div className="button-container">
        <CreateUserButton
          onClick={handleShowUserListClick}
          iconSrc="https://i.ibb.co/P4nsk4w/Icon-criar.png"
          iconBgColor="#e0f7fa"
          title="Users Totais"
          subtitle={usuarios.length.toString()}
          isSelected={selectedButton === 'list'}
        />
        <CreateUserButton
          iconSrc="https://i.ibb.co/RPC7vW8/Icon-denuncia.png"
          iconBgColor="#FFE0EB"
          title="Users Denunciados"
          subtitle="0"
          isSelected={selectedButton === 'reported'}
          onClick={() => setSelectedButton('reported')}
        />
        <CreateUserButton
          onClick={handleCreateUserClick}
          iconSrc="https://i.ibb.co/P4nsk4w/Icon-criar.png"
          iconBgColor="#e0f7fa"
          title="Criar Utilizador"
          subtitle="Criar..."
          isSelected={selectedButton === 'create'}
        />
      </div>

      {showCreateForm && (
        <div className="create-user-form">
          <h2>Criar Novo Usuário</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-left">
              <label>
                Nome:
                <input type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
              </label>
              <label>
                Sobrenome:
                <input type="text" name="sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label>
                Senha:
                <input type="password" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
              </label>
            </div>
            <div className="form-right">
              <label className="image-label">
                Escolher Imagem:
                <input type="file" onChange={handleImageChange} />
              </label>
              {imageSrc && (
                <img src={imageSrc} alt="Avatar" className="avatar" />
              )}
            </div>
            <button type="submit">Criar</button>
          </form>
        </div>
      )}

      {showUserList && (
        <div className="users-view">
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome do Usuário</th>
                <th>Data de Ingresso</th>
                <th>Eventos Criados</th>
                <th>Partilhas Criadas</th>
                <th>Publicações Criadas</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuarios, index) => (
                <tr key={usuarios.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="user-info">
                      <img src={usuarios.caminho_foto} alt={usuarios.name} className="user-avatar" />
                      {usuarios.nome + ' '}{usuarios.sobrenome}
                    </div>
                  </td>
                  <td>{formatarData(usuarios.createdAt)}</td>
                  <td>{usuarios.eventsCreated}</td>
                  <td>{usuarios.sharesCreated}</td>
                  <td>{usuarios.postsCreated}</td>
                  <td><button className="edit-btn">i</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsuariosView;
