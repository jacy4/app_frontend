// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './PublicacoesView.css'; 
// import CreatePublicationButton from '../../componentes/botao_view_publicacoes/criar_publicacao';

// const PublicacoesView = () => {
//   const [publicacoes, setPublicacoes] = useState([]);
//   const [error, setError] = useState(null);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showPublicationList, setShowPublicationList] = useState(true);
//   const [selectedButton, setSelectedButton] = useState('list'); // Default to "list" button
//   const [centroId, setCentroId] = useState(null);

//   // Form states
//   const [titulo, setTitulo] = useState('');
//   const [topico, setTopico] = useState('');

//   useEffect(() => {
//     const storedCentroId = sessionStorage.getItem('centro_id');
//     if (storedCentroId) {
//       setCentroId(storedCentroId);
//     }
//   }, []);

//   useEffect(() => {
//     const buscarPublicacoes = async () => {
//       if (!centroId) {
//         console.log('centroId não definido');
//         return;
//       }
//       console.log(`Buscando publicações para centroId: ${centroId}`);
//       try {
//         const response = await axios.get(`https://backend-teste-q43r.onrender.com/publications/listarPublicacoes/${centroId}`);
//         if (response.data && Array.isArray(response.data)) {
//           console.log(response.data);
//           setPublicacoes(response.data);
//         } else {
//           console.error('Resposta da API vazia ou formato de dados incorreto');
//         }
//       } catch (error) {
//         console.error('Erro ao buscar publicações:', error);
//         setError(error.message);
//       }
//     };
  
//     buscarPublicacoes();
//   }, [centroId]);

//   const formatarData = (data) => {
//     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     return new Date(data).toLocaleDateString('pt-PT', options);
//   };

//   const handleCreatePublicationClick = () => {
//     setShowCreateForm(true);
//     setShowPublicationList(false);
//     setSelectedButton('create'); // Set the selected button
//   };

//   const handleShowPublicationListClick = () => {
//     setShowCreateForm(false);
//     setShowPublicationList(true);
//     setSelectedButton('list'); // Set the selected button
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('https://backend-teste-q43r.onrender.com/publications/create', {
//         titulo,
//         topico,
//         centro_id: centroId // Pass the correct centro_id here
//       });
//       if (response.status === 200) {
//         alert('Publicação criada com sucesso!');
//         setShowCreateForm(false);
//         setShowPublicationList(true);
//         // Update the publication list after creating a new publication
//         setPublicacoes([...publicacoes, response.data]);
//       } else {
//         alert('Erro ao criar publicação.');
//       }
//     } catch (error) {
//       console.error('Erro ao criar publicação:', error);
//       alert('Erro ao criar publicação.');
//     }
//   };

//   if (error) {
//     return <div className='error-message'>Erro ao buscar publicações: {error}</div>;
//   }

//   if (publicacoes.length === 0) {
//     return <div className='empty-message'>Nenhuma publicação disponível.</div>;
//   }

//   return (
//     <div className="div_princ"> 
//       <h1 className="title2">Lista de Publicações deste Centro</h1>
//       <div className="button-container">
//         <CreatePublicationButton
//           onClick={handleShowPublicationListClick}
//           iconSrc="https://i.ibb.co/P4nsk4w/Icon-criar.png"
//           iconBgColor="#e0f7fa"
//           title="Publicações Totais"
//           subtitle={publicacoes.length.toString()}
//           isSelected={selectedButton === 'list'}
//         />
//         <CreatePublicationButton
//           iconSrc="https://i.ibb.co/RPC7vW8/Icon-denuncia.png"
//           iconBgColor="#FFE0EB"
//           title="Publicações Denunciadas"
//           subtitle="5"
//           isSelected={selectedButton === 'reported'}
//           onClick={() => setSelectedButton('reported')}
//         />
//         <CreatePublicationButton
//           onClick={handleCreatePublicationClick}
//           iconSrc="https://i.ibb.co/P4nsk4w/Icon-criar.png"
//           iconBgColor="#e0f7fa"
//           title="Criar Publicação"
//           subtitle="Criar..."
//           isSelected={selectedButton === 'create'}
//         />
//       </div>

//       {showCreateForm && (
//         <div className="create-publication-form">
//           <h2>Criar Nova Publicação</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="form-left">
//               <label>
//                 Título:
//                 <input type="text" name="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
//               </label>
//               <label>
//                 Tópico:
//                 <input type="text" name="topico" value={topico} onChange={(e) => setTopico(e.target.value)} />
//               </label>
//             </div>
//             <button type="submit">Criar</button>
//           </form>
//         </div>
//       )}

//       {showPublicationList && (
//         <div className="publications-view">
//           <table className="publications-table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Nome da Publicação</th>
//                 <th>Tópico</th>
//                 <th>Data de Criação</th>
//                 <th>Estado</th>
//                 <th>Editar</th>
//               </tr>
//             </thead>
//             <tbody>
//               {publicacoes.map((publicacao, index) => (
//                 <tr key={publicacao.id}>
//                   <td>{index + 1}</td>
//                   <td>{publicacao.titulo}</td>
//                   <td>{publicacao.topico}</td>
//                   <td>{formatarData(publicacao.createdAt)}</td>
//                   <td>Active</td>
//                   <td>
//                     <button className="edit-btn">i</button>
//                     <button className="edit-btn">✏️</button>
//                     <button className="edit-btn">🗑️</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PublicacoesView;


// import React, { useState } from 'react';
// import './PublicacoesView.css'; 
// import CreatePublicationButton from '../../componentes/botao_view_publicacoes/criar_publicacao';
// import CriarPublicacaoView from './criar_publicacao_view';

// const PublicacoesView = () => {
//   const [publicacoes, setPublicacoes] = useState([
//     {
//       id: 1,
//       titulo: "Estado Municipal do Fontelo",
//       topico: "Futebol",
//       createdAt: "2024-06-12T12:34:56Z",
//       estado: "Active"
//     },
//     {
//       id: 2,
//       titulo: "Estádio dos trabelos",
//       topico: "Futebol",
//       createdAt: "2024-06-12T12:34:56Z",
//       estado: "Active"
//     }
//   ]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showPublicationList, setShowPublicationList] = useState(true);
//   const [selectedButton, setSelectedButton] = useState('list'); // Default to "list" button

//   // Form states
//   const [titulo, setTitulo] = useState('');
//   const [topico, setTopico] = useState('');

//   const formatarData = (data) => {
//     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     return new Date(data).toLocaleDateString('pt-PT', options);
//   };

//   const handleCreatePublicationClick = () => {
//     setShowCreateForm(true);
//     setShowPublicationList(false);
//     setSelectedButton('create'); // Set the selected button
//   };

//   const handleShowPublicationListClick = () => {
//     setShowCreateForm(false);
//     setShowPublicationList(true);
//     setSelectedButton('list'); // Set the selected button
//   };

//   const handleCreatePublicationSubmit = ({ titulo, topico }) => {
//     // Adiciona a nova publicação aos dados estáticos
//     const novaPublicacao = {
//       id: publicacoes.length + 1,
//       titulo,
//       topico,
//       createdAt: new Date().toISOString(),
//       estado: "Active"
//     };
//     setPublicacoes([...publicacoes, novaPublicacao]);
//     setShowCreateForm(false);
//     setShowPublicationList(true);
//   };
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredPublicacoes = publicacoes.filter((publicacao) =>
//     publicacao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     publicacao.topico.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="publicacoes-div_princ"> 
//       {!showCreateForm && <h1 className="publicacoes-title2">Lista de Publicações deste Centro</h1>}
//       {!showCreateForm && (
//         <div className="publicacoes-button-container">
//           <div className="left-buttons">
//             <CreatePublicationButton
//               onClick={handleShowPublicationListClick}
//               iconSrc="https://i.ibb.co/P4nsk4w/Icon-criar.png"
//               iconBgColor="#e0f7fa"
//               title="Publicações Totais"
//               subtitle={publicacoes.length.toString()}
//               isSelected={selectedButton === 'list'}
//             />
//             <CreatePublicationButton
//               iconSrc="https://i.ibb.co/Y3jNfMt/pending-icon-512x504-9zrlrc78.png"
//               iconBgColor="#FFEECC"
//               title="Por validar"
//               subtitle="1"
//               isSelected={selectedButton === 'pending'}
//               onClick={() => setSelectedButton('pending')}
//             />
//             <CreatePublicationButton
//               iconSrc="https://i.ibb.co/D8QwJ6M/active-removebg-preview.png"
//               iconBgColor="#CCFFCC"
//               title="Ativas"
//               subtitle="16"
//               isSelected={selectedButton === 'active'}
//               onClick={() => setSelectedButton('active')}
//             />
//             <CreatePublicationButton
//               iconSrc="https://i.ibb.co/RPC7vW8/Icon-denuncia.png"
//               iconBgColor="#FFE0EB"
//               title="Denunciadas"
//               subtitle="5"
//               isSelected={selectedButton === 'reported'}
//               onClick={() => setSelectedButton('reported')}
//             />
//           </div>
//           <div className="right-button">
//             <CreatePublicationButton
//               onClick={handleCreatePublicationClick}
//               iconSrc="https://i.ibb.co/P4nsk4w/Icon-criar.png"
//               iconBgColor="#e0f7fa"
//               title="Criar Publicação"
//               subtitle="Criar..."
//               isSelected={selectedButton === 'create'}
//             />
//           </div>
//         </div>
//       )}

//       {showCreateForm && (
//         <CriarPublicacaoView onSubmit={handleCreatePublicationSubmit} />
//       )}

//       {showPublicationList && (
//         <div className="publications-view">
//           <table className="publications-table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Nome da Publicação</th>
//                 <th>Tópico</th>
//                 <th>Data de Criação</th>
//                 <th>Estado</th>
//                 <th>Editar</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPublicacoes.map((publicacao, index) => (
//                 <tr key={publicacao.id}>
//                   <td>{index + 1}</td>
//                   <td>{publicacao.titulo}</td>
//                   <td>{publicacao.topico}</td>
//                   <td>{formatarData(publicacao.createdAt)}</td>
//                   <td>
//                     <span className="publications-status active">{publicacao.estado}</span>
//                   </td>
//                   <td>
//                     <div className="edit-buttons-container">
//                       <button className="edit-btn">i</button>
//                       <button className="publications-edit-btn"><i className="fas fa-eye-slash"></i></button>
//                       <button className="publications-edit-btn">✏️</button>
//                       <button className="publications-edit-btn">🗑️</button>
                      
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// // export default PublicacoesView;
import React, { useState, useEffect } from 'react';
import './PublicacoesView.css'; 
import axios from 'axios';
import CreatePublicationButton from '../../componentes/botao_view_publicacoes/criar_publicacao';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';


const PublicacoesView = () => {
  const [publicacoes, setPublicacoes] = useState([]);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPublicationList, setShowPublicationList] = useState(true);
  const [selectedButton, setSelectedButton] = useState('list'); // Default to "list" button
  const [centroId, setCentroId] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [publicationToDelete, setPublicationToDelete] = useState(null);
  const [showHideModal, setShowHideModal] = useState(false);
  const [publicationToHide, setPublicationToHide] = useState(null);
  const [removalReason, setRemovalReason] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [publicationToEdit, setPublicationToEdit] = useState(null);
  const [showSuccessMessageDelete, setShowSuccessMessageDelete] = useState(false);
  const [showSuccessMessageHide, setShowSuccessMessageHide] = useState(false);
  const [filter, setFilter] = useState('all');
  const [showDetailViewDenunciada, setShowDetailViewDenunciada] = useState(false);
  const [publicationDetailDenunciada, setPublicationDetailDenunciada] = useState(null);

  
  
  // Form states
  const [titulo, setTitulo] = useState('');
  const [topico, setTopico] = useState('');

  useEffect(() => {
    const storedCentroId = sessionStorage.getItem('centro_id');
    if (storedCentroId) {
      setCentroId(storedCentroId);
    }
  }, []);

  useEffect(() => {
    const buscarPublicacoes = async () => {
      if (!centroId) {
        console.log('centroId não definido');
        return;
      }
      console.log(`Buscando publicações para centroId: ${centroId}`);
      try {
        const response = await axios.get(`http://localhost:3000/publicacoes/listarPublicacoes/${centroId}`);
        if (response.data && Array.isArray(response.data)) {
          console.log(response.data);
          setPublicacoes(response.data);
        } else {
          console.error('Resposta da API vazia ou formato de dados incorreto');
        }
      } catch (error) {
        console.error('Erro ao buscar publicações:', error);
        setError(error.message);
      }
    };
  
    buscarPublicacoes();
  }, [centroId]);

  const handleViewDetailsClick = (publication) => {
    if (publication.estado.toLowerCase() === 'denunciada') {
      setPublicationDetailDenunciada(publication);
      setShowDetailViewDenunciada(true);
    } else {
      // lógica para outras visualizações de detalhes, se houver
    }
  };
  
  
  
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('descricao');

  // Form states
  const handleHideClick = (publication) => {
    setPublicationToHide(publication);
    setShowHideModal(true);
  };
  
  const handleEditClick = (publication) => {
    setShowEditForm(true);
    setShowPublicationList(false);
    setSelectedButton('create'); // Set the selected button
};
  
  const handleCancelHide = () => {
    setShowHideModal(false);
    setPublicationToHide(null);
    setRemovalReason('');
  };
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  const handleDeleteClick = (publication) => {
    setPublicationToDelete(publication);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    // Aqui você deve realizar a lógica para realmente deletar a publicação
    setShowSuccessMessage(true); // Exibir a mensagem de sucesso após a exclusão
};

  
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setPublicationToDelete(null);
  };
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setPublicationToDelete(null);
  };
  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    setShowSuccessMessageDelete(true); // Exibir a mensagem de sucesso após a exclusão
};


  const formatarData = (data) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(data).toLocaleDateString('pt-PT', options);
  };

  const handleCreatePublicationClick = () => {
    setShowCreateForm(true);
    setShowPublicationList(false);
    setSelectedButton('create'); // Set the selected button
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreatePublicationSubmit({ titulo, topico });
  };
  
  const handleShowPublicationListClick = () => {
    setShowCreateForm(false);
    setShowPublicationList(true);
    setSelectedButton('list'); // Set the selected button
  };

  const handleCreatePublicationSubmit = ({ titulo, topico }) => {
    // Adiciona a nova publicação aos dados estáticos
    const novaPublicacao = {
      id: publicacoes.length + 1,
      titulo,
      topico,
      createdAt: new Date().toISOString(),
      estado: "Active"
    };
    setPublicacoes([...publicacoes, novaPublicacao]);
    setShowCreateForm(false);
    setShowPublicationList(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleDelete = (publication) => {
    // Aqui você deve adicionar a lógica para deletar a publicação
    // Após deletar, você pode atualizar o estado `publicacoes` para remover a publicação
    setPublicacoes(publicacoes.filter(p => p.id !== publication.id));
    closeDeleteModal();
  };

  const handleConfirmHide = () => {
    setShowHideModal(false);
    setRemovalReason('');
    setShowSuccessMessageHide(true); // Exibir a mensagem de sucesso após ocultar
  };
  


  const containerStyle = {
    width: '100%',
    height: '200px'
  };
  
  const center = {
    lat: 40.64679593699455,
    lng: -7.91968580401233
  };
  
  const API_KEY = 'AIzaSyAPQ0rU-UXFxtKNTNnes9XB6iQ_dCLycHo'; // Substitua pela sua API Key do Google Maps

  const [mapCenter, setMapCenter] = useState(center); // center é a posição inicial do mapa
  const [address, setAddress] = useState('');

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  
  const handleAddressSubmit = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
          params: {
            address: address,
            key: API_KEY, // substitua pela sua chave de API
          },
        });
        if (response.data.results.length > 0) {
          const location = response.data.results[0].geometry.location;
          setMapCenter(location);
        } else {
          alert('Local não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar o endereço:', error);
      }
    }
  };

  const handleButtonClick = (filter) => {
    setFilter(filter);
    setShowPublicationList(true);
    setShowCreateForm(false);
    setShowEditForm(false);
    setSelectedButton(filter);
  };
  
  
  const filteredPublicacoes = publicacoes.filter((publicacoes) => {
    if (filter === 'all') return true;
    return publicacoes.estado.toLowerCase() === filter;
  });
  
  const countPublicacoesPorValidar = publicacoes.filter(p => p.estado.toLowerCase() === 'por validar').length;
  const countPublicacoesAtivas = publicacoes.filter(p => p.estado.toLowerCase() === 'ativa').length;
  const countPublicacoesDenunciadas = publicacoes.filter(p => p.estado.toLowerCase() === 'denunciada').length;
  
  

  return (
    <div className="publicacoes-div_princ"> 
      {!showCreateForm && !showEditForm && !showDetailViewDenunciada && <h1 className="publicacoes-title2">Lista de Publicações deste Centro</h1>}
      {!showCreateForm && !showEditForm && !showDetailViewDenunciada && (
        <div className="publicacoes-button-container">
          <div className="left-buttons">
            <CreatePublicationButton
              onClick={() => handleButtonClick('all')}
              iconSrc="https://i.ibb.co/P4nsk4w/Icon-criar.png"
              iconBgColor="#e0f7fa"
              title="Publicações Totais"
              subtitle={publicacoes.length.toString()}
              isSelected={selectedButton === 'all'}
            />
            <CreatePublicationButton
              iconSrc="https://i.ibb.co/Y3jNfMt/pending-icon-512x504-9zrlrc78.png"
              iconBgColor="#FFEECC"
              title="Por validar"
              subtitle={countPublicacoesPorValidar.toString()}
              isSelected={selectedButton === 'por validar'}
              onClick={() => handleButtonClick('por validar')}
            />
            <CreatePublicationButton
              iconSrc="https://i.ibb.co/D8QwJ6M/active-removebg-preview.png"
              iconBgColor="#CCFFCC"
              title="Ativas"
              subtitle={countPublicacoesAtivas.toString()}
              isSelected={selectedButton === 'ativa'}
              onClick={() => handleButtonClick('ativa')}
            />
            <CreatePublicationButton
              iconSrc="https://i.ibb.co/RPC7vW8/Icon-denuncia.png"
              iconBgColor="#FFE0EB"
              title="Denunciadas"
              subtitle={countPublicacoesDenunciadas.toString()}
              isSelected={selectedButton === 'denunciada'}
              onClick={() => handleButtonClick('denunciada')}
            />
          </div>
          <div className="right-button">
            <CreatePublicationButton
              onClick={handleCreatePublicationClick}
              iconSrc="https://i.ibb.co/P4nsk4w/Icon-criar.png"
              iconBgColor="#e0f7fa"
              title="Criar Publicação"
              subtitle="Criar..."
              isSelected={selectedButton === 'create'}
            />
          </div>
        </div>
      )}
      {!showDetailViewDenunciada && showPublicationList && (
        <div className="search-container">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Procurar por Publicação..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <i className="fas fa-search search-icon"></i>
        </div>
        </div>
      )}
      
{showEditForm && (
  <div className="publicacoes_div_princ"><h1 className="publicacoes-title2">Editar informações do Local</h1>
  <div className="header">
    <h1 className="header-title">Nome do local</h1>
    <div className="author">
    <div className= "authorName"><span>Autor :</span></div>
      <img src="https://i.ibb.co/7G5m74B/author.png" alt="Eu" className="author-icon" />
      <span>Eu</span>
    </div>
  </div>
  <div className="tabs">
    <button
      className={`tab ${activeTab === 'descricao' ? 'active' : ''}`}
      onClick={() => handleTabClick('descricao')}
    >
      <i className="fas fa-info-circle tab-icon"></i> Descrição
    </button>
    <button
      className={`tab ${activeTab === 'galeria' ? 'active' : ''}`}
      onClick={() => handleTabClick('galeria')}
    >
      <i className="fas fa-images tab-icon"></i> Galeria
    </button>
    <button
      className={`tab ${activeTab === 'horario' ? 'active' : ''}`}
      onClick={() => handleTabClick('horario')}
    >
      <i className="fas fa-clock tab-icon"></i> Horário
    </button>
    <button
      className={`tab ${activeTab === 'localizacao' ? 'active' : ''}`}
      onClick={() => handleTabClick('localizacao')}
    >
      <i className="fas fa-map-marker-alt tab-icon"></i> Localização
    </button>
    <button
      className={`tab ${activeTab === 'comentarios' ? 'active' : ''}`}
      onClick={() => handleTabClick('comentarios')}
    >
      <i className="fas fa-comments tab-icon"></i> Comentários
    </button>
    <button
      className={`tab ${activeTab === 'mais_informacoes' ? 'active' : ''}`}
      onClick={() => handleTabClick('mais_informacoes')}
    >
      <i className="fas fa-info tab-icon"></i> Mais Informações
    </button>
  </div>
  <div className="tab-content">
    {activeTab === 'descricao' && (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tópico do Local</label>
          <select value={topico} onChange={(e) => setTopico(e.target.value)}>
            <option value="">selecionar tópico</option>
            <option value="futebol">Futebol</option>
            <option value="basquete">Basquete</option>
          </select>
        </div>
        <div className="form-group">
          <label>Nome do local</label>
          <input type="text" placeholder="inserir nome do local" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Descrição do local</label>
          <textarea placeholder="inserir uma breve descrição do local"></textarea>
        </div>
        <div className="form-buttons">
          <button type="button" className="cancel-button">Cancelar</button>
          <button className="save-button"><i className="fas fa-save"></i>Guardar Alterações</button>
        </div>
      </form>
    )}
    {activeTab === 'galeria' && (
    <div className="tab-content_galeria">
      <h2>Galeria do local</h2>
      <div className="gallery-upload">
        <div className="upload-box">
          <span className="upload-icon">+</span>
          <span className="upload-text">Upload</span>
        </div>
        <p className="gallery-info">
          <i className="fas fa-info-circle"></i> A primeira foto será a foto de capa do local
        </p>
      </div>
      <div className="form-buttons">
        <button type="button" className="cancel-button">Cancelar</button>
        <button className="save-button"><i className="fas fa-save"></i>Alterações</button>
      </div>
    </div>
  )}

    {activeTab === 'horario' && (
      <div>
        <h2>Horário do local</h2>
        {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'].map((dia, index) => (
          <div key={index} className="form-group_horario">
            <label>{dia}</label>
            <input type="text" placeholder="hora" />
          </div>
        ))}
        <div className="form-buttons">
          <button type="button" className="cancel-button">Cancelar</button>
          <button className="save-button"><i className="fas fa-save"></i>Alterações</button>
        </div>
      </div>
    )}
    {activeTab === 'localizacao' && (
      <div className="tab-content_localizacao">
        <h2>Localização do local</h2>
        <div className="localizacao-content">
          <div className="form-group">
            <label>Endereço do local:</label>
            <input
              type="text"
              placeholder="inserir local"
              value={address}
              onChange={handleAddressChange}
              onKeyDown={handleAddressSubmit}
            />
          </div>
          <div className="map-placeholder">
            <LoadScript googleMapsApiKey={API_KEY}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={10}
              >
                <Marker position={mapCenter} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
        <div className="form-buttons">
          <button type="button" className="cancel-button">Cancelar</button>
          <button className="save-button"><i className="fas fa-save"></i>Alterações</button>
        </div>
      </div>
    )}

    {activeTab === 'comentarios' && (
      <div className="tab-content_comentarios">
        <div className="search-container_comentarios">
        <div className="search-wrapper_comentarios">
          <input
            type="text"
            placeholder="Procurar por Comentário..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <i className="fas fa-search search-icon"></i>
        </div>
        </div>
        <div className="no-comments">
          <i className="fas fa-comment-slash no-comments-icon"></i>
          <p>Ainda sem comentários</p>
        </div>
        <div className="form-buttons">
          <button type="button" className="cancel-button">Cancelar</button>
          <button className="save-button"><i className="fas fa-save"></i>Alterações</button>
        </div>
      </div>
    )}

  {activeTab === 'mais_informacoes' && (
    <div className="tab-content_mais_informacoes">
      <form>
        <div className="form-group">
          <label>Pagina Web</label>
          <input type="text" placeholder="inserir site" />
        </div>
        <div className="form-group">
          <label>Telemovel/telefone</label>
          <input type="text" placeholder="inserir contacto telefónico" />
        </div>
        <div className="form-group">
          <label>Email oficial</label>
          <input type="text" placeholder="...inserir email..." />
        </div>
        <div className="form-buttons">
          <button type="button" className="cancel-button">Cancelar</button>
          <button className="save-button"><i className="fas fa-save"></i>Alterações</button>
        </div>
      </form>
    </div>
  )}
  

  </div>
</div>
)}
{showDetailViewDenunciada ? (
  <div className="publicacoes_div_princ">
    <h1 className="publicacoes-title2">Denúncias do Local</h1>
    <div className="header">
      <h1 className="header-title">{publicationDetailDenunciada.titulo}</h1>
      <div className="author">
        <div className="authorName"><span>Autor :</span></div>
        <img src="https://i.ibb.co/7G5m74B/author.png" alt="Eu" className="author-icon" />
        <span>{publicationDetailDenunciada.autor}</span>
      </div>
    </div>
    <div className="tab-content2">
      <h2>Lista de Denúncias</h2>
      <div className="denuncia-card">
        <div className="denuncia-header">
          <img src="https://via.placeholder.com/40" alt="User" className="user-icon" />
          <div className="denuncia-info">
            <strong>Vitor Ferreira</strong>
            <p>29/01/2023</p>
          </div>
        </div>
        <div className="denuncia-content">
          <p><strong>Motivo da denúncia :</strong> Informação Errada ou Não Fidedigna</p>
          <p><strong>Informação adicional :</strong> Boa tarde, não é que o local seja indevido mas eu moro perto e a morada não é essa</p>
        </div>
      </div>
      <div className="form-buttons">
        <button type="button" className="cancel-button" onClick={() => setShowDetailViewDenunciada(false)}>Cancelar</button>
        <button type="button" className="save-button">Tomar Medidas</button>
      </div>
    </div>
  </div>
) : null}








{showCreateForm && (
        <div className="publicacoes_div_princ"><h1 className="publicacoes-title2">Criar Publicação</h1>
          <div className="header">
            <h1 className="header-title">Nome do local</h1>
            <div className="author">
            <div className= "authorName"><span>Autor :</span></div>
              <img src="https://i.ibb.co/7G5m74B/author.png" alt="Eu" className="author-icon" />
              <span>Eu</span>
            </div>
          </div>
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'descricao' ? 'active' : ''}`}
              onClick={() => handleTabClick('descricao')}
            >
              <i className="fas fa-info-circle tab-icon"></i> Descrição
            </button>
            <button
              className={`tab ${activeTab === 'galeria' ? 'active' : ''}`}
              onClick={() => handleTabClick('galeria')}
            >
              <i className="fas fa-images tab-icon"></i> Galeria
            </button>
            <button
              className={`tab ${activeTab === 'horario' ? 'active' : ''}`}
              onClick={() => handleTabClick('horario')}
            >
              <i className="fas fa-clock tab-icon"></i> Horário
            </button>
            <button
              className={`tab ${activeTab === 'localizacao' ? 'active' : ''}`}
              onClick={() => handleTabClick('localizacao')}
            >
              <i className="fas fa-map-marker-alt tab-icon"></i> Localização
            </button>
            <button
              className={`tab ${activeTab === 'comentarios' ? 'active' : ''}`}
              onClick={() => handleTabClick('comentarios')}
            >
              <i className="fas fa-comments tab-icon"></i> Comentários
            </button>
            <button
              className={`tab ${activeTab === 'mais_informacoes' ? 'active' : ''}`}
              onClick={() => handleTabClick('mais_informacoes')}
            >
              <i className="fas fa-info tab-icon"></i> Mais Informações
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'descricao' && (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Área do Local</label>
                    <input type="text" value="Desporto" readOnly />
                  </div>
                <div className="form-group">
                  <label>Tópico do Local</label>
                  <select value={topico} onChange={(e) => setTopico(e.target.value)}>
                    <option value="">selecionar tópico</option>
                    <option value="futebol">Futebol</option>
                    <option value="basquete">Basquete</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Nome do local</label>
                  <input type="text" placeholder="inserir nome do local" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Descrição do local</label>
                  <textarea placeholder="inserir uma breve descrição do local"></textarea>
                </div>
                <div className="form-buttons">
                  <button type="button" className="cancel-button">Cancelar</button>
                  <button type="submit" className="submit-button">Continuar</button>
                </div>
              </form>
            )}
            {activeTab === 'galeria' && (
            <div className="tab-content_galeria">
              <h2>Galeria do local</h2>
              <div className="gallery-upload">
                <div className="upload-box">
                  <span className="upload-icon">+</span>
                  <span className="upload-text">Upload</span>
                </div>
                <p className="gallery-info">
                  <i className="fas fa-info-circle"></i> A primeira foto será a foto de capa do local
                </p>
              </div>
              <div className="form-buttons">
                <button type="button" className="cancel-button">Cancelar</button>
                <button type="submit" className="submit-button">Continuar</button>
              </div>
            </div>
          )}

            {activeTab === 'horario' && (
              <div>
                <h2>Horário do local</h2>
                {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'].map((dia, index) => (
                  <div key={index} className="form-group_horario">
                    <label>{dia}</label>
                    <input type="text" placeholder="hora" />
                  </div>
                ))}
                <div className="form-buttons">
                  <button type="button" className="cancel-button">Cancelar</button>
                  <button type="submit" className="submit-button">Continuar</button>
                </div>
              </div>
            )}
            {activeTab === 'localizacao' && (
              <div className="tab-content_localizacao">
                <h2>Localização do local</h2>
                <div className="localizacao-content">
                  <div className="form-group">
                    <label>Endereço do local:</label>
                    <input type="text" placeholder="inserir local" />
                  </div>
                  <div className="map-placeholder">
                    <LoadScript googleMapsApiKey={API_KEY}>
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                      >
                        <Marker position={center} />
                      </GoogleMap>
                    </LoadScript>
                  </div>
                </div>
                <div className="form-buttons">
                  <button type="button" className="cancel-button">Cancelar</button>
                  <button type="submit" className="submit-button">Continuar</button>
                </div>
              </div>
            )}
            {activeTab === 'comentarios' && (
              <div className="tab-content_comentarios">
                <div className="no-comments">
                  <i className="fas fa-comment-slash no-comments-icon"></i>
                  <p>Ainda sem comentários</p>
                </div>
                <div className="form-buttons">
                  <button type="button" className="cancel-button">Cancelar</button>
                  <button type="submit" className="submit-button">Continuar</button>
                </div>
              </div>
            )}

          {activeTab === 'mais_informacoes' && (
            <div className="tab-content_mais_informacoes">
              <form>
                <div className="form-group">
                  <label>Pagina Web</label>
                  <input type="text" placeholder="inserir site" />
                </div>
                <div className="form-group">
                  <label>Telemovel/telefone</label>
                  <input type="text" placeholder="inserir contacto telefónico" />
                </div>
                <div className="form-group">
                  <label>Email oficial</label>
                  <input type="text" placeholder="...inserir email..." />
                </div>
                <div className="form-buttons">
                  <button type="button" className="cancel-button">Cancelar</button>
                  <button type="submit" className="submit-button_maisinfos" onClick={() => setShowSuccessMessage(true)}>Publicar</button>
                </div>
              </form>
            </div>
          )}
          {showSuccessMessage ? (
            <div className="success-message">
              <h1>Publicação criada com sucesso!</h1>
              <p>Como você é o administrador do seu centro, não será necessário passar pelo processo de validação.</p>
              <button onClick={() => setShowSuccessMessage(false)}>Continuar</button>
            </div>
          ) : null}

          </div>
        </div>
      )}

      {!showDetailViewDenunciada && showPublicationList && (
        <div className="publications-view">
          <table className="publications-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome da Publicação</th>
                <th>Tópico</th>
                <th>Data de Criação</th>
                <th>Estado</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
            {filteredPublicacoes.map((publicacoes, index) => (
          <tr key={publicacoes.id}>
            <td>{index + 1}</td>
            <td>{publicacoes.titulo}</td>
            <td>{publicacoes.topico.nome}</td>
            <td>{formatarData(publicacoes.createdAt)}</td>
            <td>
              <span className={`publications-status ${publicacoes.estado.toLowerCase().replace(' ', '-')}`}>
                {publicacoes.estado}
              </span>
                </td>
                  <td>
                    <div className="edit-buttons-container">
                      <button className="edit-btn" onClick={() => handleViewDetailsClick(publicacoes)}>i</button>
                      <button className="publications-edit-btn" onClick={() => handleHideClick(publicacoes)}><i className="fas fa-eye-slash"></i></button>
                      <button className="publications-edit-btn"onClick={() => handleEditClick(publicacoes)}>✏️</button>
                      <button className="publications-edit-btn" onClick={() => handleDeleteClick(publicacoes)}>🗑️</button>

                    </div>
                    {showDeleteModal && (
                      <div className="modal">
                        <div className="modal-icon">❌</div>
                        <div className="modal-header">Eliminar Publicação?</div>
                        <div className="modal-body">
                          O user que criou esta publicação irá ser notificado sobre a sua ação!
                        </div>
                        <div className="modal-buttons">
                          <button className="delete-button" onClick={handleConfirmDelete}>Eliminar</button>
                          <button className="cancel-button_delete" onClick={handleCancelDelete}>Cancelar</button>
                        </div></div>)}
                    {showHideModal && (
                          <div className="modal_hide">
                            <div className="modal-icon_hide">👁️</div>
                            <div className="modal-header_hide">Ocultar Publicação</div>
                            <div className="modal-body_hide">
                              <p>Ao ocultar Publicação, este irá ser oculto aos utilizadores mas não será eliminado.</p>
                              <p>Insira abaixo o motivo por qual removeu o comentário deste utilizador, o qual vai ser notificado da sua ação.</p>
                              <textarea
                                placeholder="...motivo de remoção..."
                                value={removalReason}
                                onChange={(e) => setRemovalReason(e.target.value)}
                                maxLength="240"
                              />
                              <div className="character-count">{removalReason.length}/240</div>
                            </div>
                            <div className="modal-buttons">
                              <button className="cancel-button_hide" onClick={handleCancelHide}>Cancelar</button>
                              <button className="hide-button" onClick={handleConfirmHide}>Ocultar</button>
                            </div>
                          </div>
                        )}
                        {showSuccessMessageHide && <div className="modal-backdrop"></div>}
                          {showSuccessMessageHide && (
                            <div className="success-message_delete">
                              <div className="success-message-icon"></div>
                              <h1>Ação aplicada com sucesso!</h1>
                              <button onClick={() => setShowSuccessMessageHide(false)}>Continuar</button>
                            </div>
                          )}
                        {showSuccessMessageDelete && <div className="modal-backdrop"></div>}
                          {showSuccessMessageDelete && (
                            <div className="success-message_delete">
                              <div className="success-message-icon"></div>
                              <h1>Ação aplicada com sucesso!</h1>
                              <button onClick={() => setShowSuccessMessageDelete(false)}>Continuar</button>
                            </div>
                          )}




                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PublicacoesView;

