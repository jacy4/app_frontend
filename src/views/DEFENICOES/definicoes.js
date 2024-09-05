import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './definicoes.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import perfil from "./profile.png";

const DefinicoesView = () => {
  const [imagem, setImagem] = useState(null);
  const [imagemPreview, setImagemPreview] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [centro, setCentro] = useState('');
  const [sobreMim, setSobreMim] = useState('');
  const [activeTab, setActiveTab] = useState('editar');
  const [doisFatores, setDoisFatores] = useState(false);
  const [denuncias, setDenuncias] = useState(false);
  const [concluidos, setConcluidos] = useState(false);
  const [pendentes, setPendentes] = useState(false);
  const [moeda, setMoeda] = useState('');
  const [zonaHor, setZonaHor] = useState('');
  const dados = {
    nome: nome,
    sobrenome: sobrenome,
    email: email,
    senha: senha,
    centro: centro,
    sobreMim: sobreMim,
    // Adicione outros campos aqui
  };
  const fetchUserData = async () => {
    try {
      const token = sessionStorage.getItem('token');
      let id = null;
      if (token) {
        const decoded = jwtDecode(token);
        id = decoded.id;
      }

      if (!id) {
        throw new Error('ID do administrador não encontrado no token');
      }

      const url = `https://backend-teste-q43r.onrender.com/admin/detalharAdmin/${id}`;
      const response = await axios.get(url);
      const userData = response.data;

      // Define os estados com os dados recebidos
      if (activeTab === 'editar') {
        setNome(userData.user.nome || '');
        setSobrenome(userData.user.sobrenome || '');
        setEmail(userData.email || '');
        setSenha(userData.pass || '');
        setCentro(userData.centro.nome || '');
        setSobreMim(userData.user.sobre_min || '');
        setImagemPreview(userData.usuario.caminho_foto || '');
      } else if (activeTab === 'preferencias') {
        setDenuncias(userData.denuncias || false);
        setConcluidos(userData.concluidos || false);
        setPendentes(userData.pendentes || false);
      } else if (activeTab === 'seguranca') {
        setDoisFatores(userData.doisFatores || false);
      }

    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      Swal.fire('Erro', 'Falha ao buscar dados do usuário.', 'error');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [activeTab]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(file);
      setImagemPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem('token');
    if (!token) {
      return alert('Token não encontrado. Faça login novamente.');
    }

    const { id } = jwtDecode(token);

    try {
      const formData = new FormData();

      if (activeTab === 'editar') {
        formData.append('nome', nome);
        formData.append('sobrenome', sobrenome);
        formData.append('email', email);
        formData.append('senha', senha);
        formData.append('centro', centro);
        formData.append('sobreMim', sobreMim);

        if (imagem) {
          formData.append('imagem', imagem);
        }
      } else if (activeTab === 'preferencias') {
        formData.append('moeda', moeda);
        formData.append('zonaHor', zonaHor);
        formData.append('denuncias', denuncias);
        formData.append('concluidos', concluidos);
        formData.append('pendentes', pendentes);
      } else if (activeTab === 'seguranca') {
        formData.append('doisFatores', doisFatores);
      }

      await axios.put(`https://backend-teste-q43r.onrender.com/admin/atualizarAdmin/${id}`, dados, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      //navigate(`/listar_topicos/${id}`);

      Swal.fire('Sucesso', 'Dados atualizados com sucesso!', 'success');
      fetchUserData(); // Recarrega os dados do usuário para garantir que a UI seja atualizada

    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
      Swal.fire('Erro', 'Falha ao atualizar dados!', 'error');
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleToggleChange = () => {
    setDoisFatores(!doisFatores);
  };

  const handleDenunciasChange = () => {
    setDenuncias(!denuncias);
  };

  const handleConcluidosChange = () => {
    setConcluidos(!concluidos);
  };

  const handlePendentesChange = () => {
    setPendentes(!pendentes);
  };

  return (
    <div className="div_princ_definicoes">
      <h1 className="title2">Definições</h1>
      <div className="def-form-container">
        <div className="tab-nav">
          <button
            className={activeTab === 'editar' ? 'active' : ''}
            onClick={() => handleTabClick('editar')}>
            Editar Perfil
          </button>
          <button
            className={activeTab === 'preferencias' ? 'active' : ''}
            onClick={() => handleTabClick('preferencias')}>
            Preferências
          </button>
          <button
            className={activeTab === 'seguranca' ? 'active' : ''}
            onClick={() => handleTabClick('seguranca')}>
            Segurança
          </button>
        </div>

        {activeTab === 'editar' && (
          <div className="tab-content">
            <form className='editar-perfil' onSubmit={handleSubmit}>
              <div className='group-img' style={{ textAlign: 'center' }}>
                <div
                  className='card'
                  id='imagem'
                  style={{
                    width: '100px',
                    height: '100px',
                    overflow: 'hidden',
                    borderRadius: '50%',
                    border: '2px solid #ccc',
                    margin: '0 auto' // Centraliza a imagem
                  }}
                >
                  {imagemPreview ? (
                    <img
                      src={imagemPreview}
                      alt="Imagem de Perfil"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <img
                      src={perfil}
                      alt="Imagem de Perfil Padrão"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => document.getElementById('img-input').click()}
                  style={{
                    marginTop: '200px',
                    marginLeft: '-90px',
                    marginRight: '80px',
                    padding: '5px 10px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Upload
                </button>

                <input
                  type='file'
                  accept='image/*'
                  id='img-input'
                  onChange={handleImageChange}
                  style={{ display: 'none' }} // Oculta o input de arquivo
                />
              </div>
              <div className='form-group'>

                <div className='group'>
                  <label className='form-label'>Nome:</label>
                  <input
                    type='text'
                    id='nome'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    placeholder='Seu nome'
                  />
                </div>
                <div className='group'>
                  <label className='form-label'>Apelido:</label>
                  <input
                    type='text'
                    id='sobrenome'
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                    required
                    placeholder='Seu sobrenome'
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='group'>
                  <label className='form-label'>Email:</label>
                  <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder='exemplo@gmail.com'
                  />
                </div>
                <div className='group'>
                  <label className='form-label'>Senha:</label>
                  <input
                    type='password'
                    id='senha'
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    placeholder='********'
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='group'>
                  <label className='form-label'>Centro:</label>
                  <input
                    type='text'
                    id='centro'
                    value={centro}
                    onChange={(e) => setCentro(e.target.value)}
                    required
                    placeholder='Nome do centro'
                  />
                </div>
                <div className='group'>
                  <label className='form-label'>Sobre Mim:</label>
                  <input
                    type='text'
                    id='sobreMim'
                    value={sobreMim}
                    onChange={(e) => setSobreMim(e.target.value)}
                    required
                    placeholder='Descrição'
                  />
                </div>
              </div>
              <button className='btn' type='submit'>Salvar</button>
            </form>
          </div>
        )
        }

        {
          activeTab === 'preferencias' && (
            <div className="tab-content-pref">
              <form onSubmit={handleSubmit}>
                <div className='pref-group'>
                  <label>Moeda</label>
                  <input
                    type='text'
                    id='moeda'
                    value={moeda}
                    onChange={(e) => setMoeda(e.target.value)}
                    placeholder='EUR'
                  />
                  <label>Zona Horária</label>
                  <input
                    type='text'
                    id='zonaHor'
                    value={zonaHor}
                    onChange={(e) => setZonaHor(e.target.value)}
                    placeholder='(GMT-12:00) LISBOA'
                  />
                </div>
                <div className='groups'>
                  <div className="form-group">
                    <label className="switch">
                      <input type="checkbox" checked={denuncias} onChange={handleDenunciasChange} />
                      <span className="slider"></span>
                    </label>
                    <label>Receber denúncias</label>
                  </div>
                  <div className="form-group">
                    <label className="switch">
                      <input type="checkbox" checked={concluidos} onChange={handleConcluidosChange} />
                      <span className="slider"></span>
                    </label>
                    <label>Mostrar concluídos</label>
                  </div>
                  <div className="form-group">
                    <label className="switch">
                      <input type="checkbox" checked={pendentes} onChange={handlePendentesChange} />
                      <span className="slider"></span>
                    </label>
                    <label>Mostrar pendentes</label>
                  </div>
                </div>
                <button className='btn' type='submit'>Salvar Preferências</button>
              </form>
            </div>
          )
        }

        {
          activeTab === 'seguranca' && (
            <div className="tab-content-seg">
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label className="switch">
                    <input type="checkbox" checked={doisFatores} onChange={handleToggleChange} />
                    <span className="slider"></span>
                  </label>
                  <label>Autenticação de dois fatores</label>
                </div>
                <button className='btn' type='submit'>Salvar</button>
              </form>
            </div>
          )
        }
      </div >
    </div >
  );
};

export default DefinicoesView;
