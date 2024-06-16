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
import React, { useState } from 'react';
import './PublicacoesView.css'; 
import CreatePublicationButton from '../../componentes/botao_view_publicacoes/criar_publicacao';

const PublicacoesView = () => {
  const [publicacoes, setPublicacoes] = useState([
    {
      id: 1,
      titulo: "Estado Municipal do Fontelo",
      topico: "Futebol",
      createdAt: "2024-06-12T12:34:56Z",
      estado: "Active"
    },
    {
      id: 2,
      titulo: "Estádio dos trabelos",
      topico: "Futebol",
      createdAt: "2024-06-12T12:34:56Z",
      estado: "Active"
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPublicationList, setShowPublicationList] = useState(true);
  const [selectedButton, setSelectedButton] = useState('list'); // Default to "list" button
  const [activeTab, setActiveTab] = useState('descricao');

  // Form states
  const [titulo, setTitulo] = useState('');
  const [topico, setTopico] = useState('');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
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

  const filteredPublicacoes = publicacoes.filter((publicacao) =>
    publicacao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publicacao.topico.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="publicacoes-div_princ"> 
      {!showCreateForm && <h1 className="publicacoes-title2">Lista de Publicações deste Centro</h1>}
      {!showCreateForm && (
        <div className="publicacoes-button-container">
          <div className="left-buttons">
            <CreatePublicationButton
              onClick={handleShowPublicationListClick}
              iconSrc="https://i.ibb.co/P4nsk4w/Icon-criar.png"
              iconBgColor="#e0f7fa"
              title="Publicações Totais"
              subtitle={publicacoes.length.toString()}
              isSelected={selectedButton === 'list'}
            />
            <CreatePublicationButton
              iconSrc="https://i.ibb.co/Y3jNfMt/pending-icon-512x504-9zrlrc78.png"
              iconBgColor="#FFEECC"
              title="Por validar"
              subtitle="1"
              isSelected={selectedButton === 'pending'}
              onClick={() => setSelectedButton('pending')}
            />
            <CreatePublicationButton
              iconSrc="https://i.ibb.co/D8QwJ6M/active-removebg-preview.png"
              iconBgColor="#CCFFCC"
              title="Ativas"
              subtitle="16"
              isSelected={selectedButton === 'active'}
              onClick={() => setSelectedButton('active')}
            />
            <CreatePublicationButton
              iconSrc="https://i.ibb.co/RPC7vW8/Icon-denuncia.png"
              iconBgColor="#FFE0EB"
              title="Denunciadas"
              subtitle="5"
              isSelected={selectedButton === 'reported'}
              onClick={() => setSelectedButton('reported')}
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

      {showPublicationList && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Procurar por Publicação..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      )}


{showCreateForm && (
        <div className="publicacao_div_princ"><h1 className="title2">Criar Publicação</h1>
          <div className="header">
            <h1 className="header-title">Nome do local</h1>
            <div className="author">
              <span>Autor :</span>
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
                  <select>
                    <option>Desporto</option>
                  </select>
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
            {activeTab === 'galeria' && <div>Galeria de imagens</div>}
            {activeTab === 'horario' && <div>Horário de funcionamento</div>}
            {activeTab === 'localizacao' && <div>Localização no mapa</div>}
            {activeTab === 'comentarios' && <div>Comentários dos usuários</div>}
            {activeTab === 'mais_informacoes' && <div>Mais informações sobre o local</div>}
          </div>
        </div>
      )}

      {showPublicationList && (
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
              {filteredPublicacoes.map((publicacao, index) => (
                <tr key={publicacao.id}>
                  <td>{index + 1}</td>
                  <td>{publicacao.titulo}</td>
                  <td>{publicacao.topico}</td>
                  <td>{formatarData(publicacao.createdAt)}</td>
                  <td>
                    <span className="publications-status active">{publicacao.estado}</span>
                  </td>
                  <td>
                    <div className="edit-buttons-container">
                      <button className="edit-btn">i</button>
                      <button className="publications-edit-btn"><i className="fas fa-eye-slash"></i></button>
                      <button className="publications-edit-btn">✏️</button>
                      <button className="publications-edit-btn">🗑️</button>
                    </div>
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

