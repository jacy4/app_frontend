// // export default PublicacoesView;
import React, { useState, useEffect } from 'react';
import './PublicacoesView.css'; 
import axios from 'axios';
import CreatePublicationButton from '../../componentes/botao_view_publicacoes/criar_publicacao';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import moment from 'moment';
import 'moment/locale/pt'; // Importar o locale português

moment.locale('pt'); // Definir o locale para português

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
  const [showMedidasModal, setShowMedidasModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccessMessageAlert, setShowSuccessMessageAlert] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [showDeleteModalMedidas, setShowDeleteModalMedidas] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [showSuccessMessageMedidas, setShowSuccessMessageMedidas] = useState(false);
  const [showApprovalView, setShowApprovalView] = useState(false);
  const [publicationDetail, setPublicationDetail] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('descricao');
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectMessage, setRejectMessage] = useState('');
  const [showDetailView, setShowDetailView] = useState(false);
  const [publicationDetailActive, setPublicationDetailActive] = useState(null);
  const weekDays = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
  const [selectedPublicacao, setSelectedPublicacao] = useState(null);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showReportedModal, setShowReportedModal] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');

  const [isOpen, setIsOpen] = useState(false); 
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
    setSelectedPublication(publication);
    setShowDetailView(true);
  };
  
  

  const handlePendingViewClick = (publication) => {
    setPublicationDetail(publication);
    setShowApprovalView(true);
  };
  
  const handleReportedViewClick = (publication) => {
    setPublicationDetailDenunciada(publication);
    setShowDetailViewDenunciada(true);
  };
  

  
  // Form states
  const handleHideClick = (publication) => {
    setPublicationToHide(publication);
    setShowHideModal(true);
  };
  
  const handleEditClick = (publication) => {
    setPublicationToEdit(publication);
    setSelectedPublication(publication);
    setShowEditForm(true);
    setShowPublicationList(false);
    setShowMedidasModal(false);
    setShowDetailViewDenunciada(false); // Fechar o modal "Tomar Medidas"
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
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/publicacoes/delete/${publicationToDelete.id}`);
      setPublicacoes(publicacoes.filter(p => p.id !== publicationToDelete.id));
      setShowSuccessMessageDelete(true); // Exibir a mensagem de sucesso após a exclusão
    } catch (error) {
      console.error('Erro ao deletar publicação:', error);
      // Aqui você pode adicionar lógica para tratar erros, como mostrar uma mensagem de erro para o usuário
    }
    setShowDeleteModal(false);
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
    handleToggleVisibility(publicationToHide);
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
  
  
  const filteredPublicacoes = publicacoes.filter(publicacao => 
    publicacao.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const countPublicacoesPorValidar = publicacoes.filter(p => p.estado.toLowerCase() === 'por validar').length;
  const countPublicacoesAtivas = publicacoes.filter(p => p.estado.toLowerCase() === 'ativa').length;
  const countPublicacoesDenunciadas = publicacoes.filter(p => p.estado.toLowerCase() === 'denunciada').length;
  
  const handleMedidasClick = () => {
    setShowMedidasModal(true);
  };
  
  const handleCloseMedidasModal = () => {
    setShowMedidasModal(false);
  };

  const handleAlertClick = () => {
    setShowAlertModal(true);
    setShowMedidasModal(false);
  };
  
  const handleSendAlert = () => {
    // Adicione a lógica para enviar o alerta aqui
    console.log("Alerta enviado:", alertMessage);
  
    // Mostrar mensagem de sucesso
    setShowSuccessMessageAlert(true);
  
    // Após enviar o alerta, você pode fechar o modal
    setShowAlertModal(false);
  };
  
  const handleDeleteClickMedidas = () => {
    setShowDeleteModalMedidas(true);
    setShowMedidasModal(false); // Fechar o modal de "Tomar Medidas"
  };
  

const handleDeleteMedidas = () => {
  // Adicione a lógica para enviar a mensagem de remoção aqui
  console.log("Motivo da remoção:", deleteMessage);
  // Após enviar a mensagem, você pode fechar o modal
  setShowDeleteModalMedidas(false);
  setShowSuccessMessageMedidas(true);
};

const handleInfoClick = (publication) => {
  setPublicationDetail(publication);
  setShowApprovalView(true);
};

const handleApproveClick = () => {
  setShowApproveModal(true);
};

const handleConfirmApprove = () => {
  // Adicione a lógica para aprovar o local aqui
  console.log("Local aprovado!");
  setShowApproveModal(false);
  setShowSuccessMessageMedidas(true); // Mostrar a mensagem de sucesso após a aprovação
};

const handleRejectClick = () => {
  setShowRejectModal(true);
};

const handleRejectApprove = () => {
  // Adicione a lógica para aprovar o local aqui
  console.log("Local rejeitado!");
  setShowRejectModal(false);
  setShowSuccessMessageMedidas(true); // Mostrar a mensagem de sucesso após a aprovação
};

const handleRejectSubmit = () => {
  // Adicione a lógica para enviar a rejeição aqui
  console.log("Rejeição enviada:", rejectMessage);
  setShowRejectModal(false);
};
const isOpenNow = (horario) => {
  const currentDay = moment().format('dddd'); // Dia da semana atual em português
  const currentTime = moment(); // Hora atual

  console.log("Horário Completo:", horario);
  console.log("Dia Atual:", currentDay);
  console.log("Hora Atual:", currentTime.format('HH:mm'));

  if (!horario || !horario[currentDay]) {
    console.log("Horário não definido para o dia atual ou horário é nulo.");
    return false;
  }

  const todaySchedule = horario[currentDay];
  if (todaySchedule.toLowerCase() === 'fechado') {
    console.log("O local está fechado hoje.");
    return false;
  }

  const [openTime, closeTime] = todaySchedule.split('-');
  const openMoment = moment(openTime, 'HH:mm');
  const closeMoment = moment(closeTime, 'HH:mm');

  console.log("Horário de Abertura:", openMoment.format('HH:mm'));
  console.log("Horário de Fechamento:", closeMoment.format('HH:mm'));

  const isOpen = currentTime.isBetween(openMoment, closeMoment);
  console.log("Está Aberto Agora:", isOpen);

  return isOpen;
};




useEffect(() => {
  if (selectedPublication && selectedPublication.horario) {
    setIsOpen(isOpenNow(selectedPublication.horario));
  }
}, [selectedPublication]);


const handlePendingClick = (publicacao) => {
  // Lógica para tratar clique no botão de "Por validar"
  // Exemplo: Abrir uma modal para validação
  setSelectedPublicacao(publicacao);
  setShowPendingModal(true);
};

const handleReportedClick = (publicacao) => {
  // Lógica para tratar clique no botão de "Denunciada"
  // Exemplo: Abrir uma modal para revisão de denúncia
  setSelectedPublicacao(publicacao);
  setShowReportedModal(true);
};

useEffect(() => {
  const fetchComentarios = async () => {
    if (selectedPublication) {
      try {
        const response = await axios.get(`http://localhost:3000/comentarios/listarComentarios/${selectedPublication.id}`);
        setComentarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar comentários:', error);
      }
    }
  };

  fetchComentarios();
}, [selectedPublication]);

const handleAddComentario = async () => {
  if (!novoComentario.trim()) {
    return;
  }
  try {
    const response = await axios.post(`http://localhost:3000/comentarios/add`, {
      publicacao_id: selectedPublication.id,
      autor: 'Autor do Comentário', // Substitua pelo nome do autor do comentário
      conteudo: novoComentario
    });
    setComentarios([...comentarios, response.data]);
    setNovoComentario('');
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error);
  }
};

const handleToggleVisibility = async (publicacao) => {
  try {
    const updatedVisivel = !publicacao.visivel;
    await axios.put(`http://localhost:3000/publicacoes/updateVisibility/${publicacao.id}`, { visivel: updatedVisivel });
    setPublicacoes(publicacoes.map(p => p.id === publicacao.id ? { ...p, visivel: updatedVisivel } : p));
  } catch (error) {
    console.error('Erro ao atualizar visibilidade da publicação:', error);
  }
};



  return (
    <div className="publicacoes-div_princ"> 
      {!showCreateForm && !showEditForm && !showDetailViewDenunciada && !showApprovalView && !showDetailView && <h1 className="publicacoes-title2">Lista de Publicações deste Centro</h1>}
      {!showCreateForm && !showEditForm && !showDetailViewDenunciada && !showApprovalView && !showDetailView &&(
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
      {!showDetailViewDenunciada && !showApprovalView && !showDetailView && showPublicationList && (
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
  <h1 className="header-title">{selectedPublication.titulo}</h1>
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

{showDetailView && selectedPublication && (
  <div className="publicacoes_div_princ">
    <h1 className="publicacoes-title2">Informações do Local</h1>
    <div className="header">
      <h1 className="header-title">{selectedPublication.titulo}</h1>
      <div className="author">
        <div className="authorName"><span>Autor :</span></div>
        <img src="https://i.ibb.co/7G5m74B/author.png" alt="Autor" className="author-icon" />
        <span>{selectedPublication.autor}</span>
      </div>
    </div>
    <div className="tab-content2">
      {selectedPublication.galeria && selectedPublication.galeria.length > 0 && (
        <>
          <button className="tab active"><i className="fas fa-images tab-icon"></i> Galeria do Local</button>
          <div className="gallery">
            {selectedPublication.galeria.map((image, index) => (
              <img key={index} src={image} alt={`Galeria ${index}`} className="gallery-image" />
            ))}
          </div>
        </>
      )}
      {selectedPublication.descricao && (
        <>
          <button className="tab active"><i className="fas fa-info-circle tab-icon"></i> Descrição do Local</button>
          <div className="description">
            <p>{selectedPublication.descricao}</p>
          </div>
        </>
      )}
      {selectedPublication.horario && (
        <>
          <button className="tab active"><i className="fas fa-clock tab-icon"></i> Horário do Local</button>
          <div className="additional-info">
            <div className="status">
              <i className="fas fa-check-circle"></i> {isOpen ? 'Aberto Agora' : 'Fechado Agora'}
            </div>
            <div className="schedule">
              {weekDays.map((dia) => (
                <p key={dia}><strong>{dia}:</strong> {selectedPublication.horario[dia] || 'Fechado'}</p>
              ))}
            </div>
          </div>
        </>
      )}
      {selectedPublication.estado && (
        <>
          <button className="tab active"><i className="fas fa-tasks tab-icon"></i> Estado da Publicação</button>
          <div className="estado">
            <p><strong>Estado:</strong> {selectedPublication.estado}</p>
          </div>
        </>
      )}
      {selectedPublication.localizacao && (
        <>
          <button className="tab active"><i className="fas fa-map-marker-alt tab-icon"></i> Localização</button>
          <div className="location">
            <p><strong>Localização:</strong> {selectedPublication.localizacao}</p>
          </div>
        </>
      )}
      {selectedPublication.paginaweb && (
        <>
          <button className="tab active"><i className="fas fa-globe tab-icon"></i> Página Web</button>
          <div className="website">
            <p><strong>Página web:</strong> {selectedPublication.paginaweb}</p>
          </div>
        </>
      )}
      {selectedPublication.telemovel && (
        <>
          <button className="tab active"><i className="fas fa-phone tab-icon"></i> Telefone</button>
          <div className="phone">
            <p><strong>Telemóvel/Telefone: </strong>{selectedPublication.telemovel}</p>
          </div>
        </>
      )}
      {selectedPublication.email && (
        <>
          <button className="tab active"><i className="fas fa-envelope tab-icon"></i> Email</button>
          <div className="email">
            <p><strong>Email:</strong> {selectedPublication.email}</p>
          </div>
        </>
      )}
      {/* Seção de Comentários */}
      <button className="tab active"><i className="fas fa-comments tab-icon"></i> Comentários</button>
      <div className="comentarios-section">
        <div className="comentarios-list">
          {comentarios.map((comentario) => (
            <div key={comentario.id} className="comentario">
              <p><strong>Autor: </strong>{comentario.autor}</p>
              <p>{comentario.conteudo}</p>
            </div>
          ))}
        </div>
        {/* <div className="add-comentario">
          <textarea
            placeholder="Adicionar um comentário..."
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
          />
          <button onClick={handleAddComentario}>Enviar</button>
        </div> */}
      </div>
    </div>
  </div>
)}






{showApprovalView && publicationDetail && (
  <div className="publicacoes_div_princ">
    <h1 className="publicacoes-title2">Aprovação do Local</h1>
    <div className="header">
      <h1 className="header-title">Nome: {publicationDetail.titulo}</h1>
      <div className="author">
        <div className="authorName"><span>Autor :</span></div>
        <img src="https://i.ibb.co/7G5m74B/author.png" alt="Autor" className="author-icon" />
        <span>{publicationDetail.autor}</span>
      </div>
    </div>
    <div className="tab-content2">
      <button className="tab active"><i className="fas fa-images tab-icon"></i> Galeria do Local</button>
      <div className="gallery">
        {publicationDetail.galeria && publicationDetail.galeria.length > 0 ? (
          publicationDetail.galeria.map((image, index) => (
            <img key={index} src={image} alt={`Galeria ${index}`} className="gallery-image" />
          ))
        ) : (
          <p>Galeria indisponível</p>
        )}
      </div>
      <button className="tab active"><i className="fas fa-info-circle tab-icon"></i> Descrição do Local</button>
      <div className="description">
        <p>{publicationDetail.descricao}</p>
      </div>
      <div className="form-buttons">
      <button className="reject-button" onClick={handleRejectClick}>
        <i className="fas fa-times"></i> Rejeitar Local
      </button>
      <button className="approve-button" onClick={handleApproveClick}>
        <i className="fas fa-check"></i> Aprovar Local
      </button>


    </div>
    </div>
    
  </div>
)}
{showRejectModal && (
  <div className="modal-backdrop">
    <div className="modal">
      <div className="modal-header">
      <img src="https://i.ibb.co/tstvCh3/Captura-de-ecr-2024-06-28-170539.png"/>
        <span>Rejeitar Local ?</span>
      </div>
      <div className="modal-body">
        <p>
          Insira abaixo o motivo por qual rejeitou a aprovação deste local sugerido por este utilizador, o qual vai ser notificado da sua ação.
        </p>
        <textarea
          className="large-textareaAlert"
          placeholder="...motivo da rejeição..."
          value={rejectMessage}
          onChange={(e) => setRejectMessage(e.target.value)}
          maxLength="240"
        />
        <div className="character-count">{rejectMessage.length}/240</div>
      </div>
      <div className="modal-footer2">
        <button type="button" className="cancel-button" onClick={() => setShowRejectModal(false)}>Cancelar</button>
        <button type="button" className="rejeitar-submit-button" onClick={handleRejectApprove}>Rejeitar</button>
      </div>
    </div>
  </div>
)}



{showApproveModal && (
  <div className="modal-approve-backdrop">
    <div className="modal-approve">
      <div className="modal-approve-header">
      <img src="https://i.ibb.co/pvK4g0y/Captura-de-ecr-2024-06-28-163917.png" alt="Captura-de-ecr-2024-06-28-163917" />
        <h2>Aprovar Local ?</h2>
      </div>
      <div className="modal-approve-body">
        <p>
          Ao aprovar este local, irá de imediato ficar disponível na aplicação para a consulta dos utilizadores.
        </p>
      </div>
      <div className="modal-approve-footer">
        <button type="button" className="approve-cancel-button" onClick={() => setShowApproveModal(false)}>Cancelar</button>
        <button type="button" className="approve-confirm-button" onClick={handleConfirmApprove}>Aprovar</button>
        
      </div>
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
      <div className="denuncia-header2">
        <h2>Lista de Denúncias</h2>
        <span className="total-denuncias">Total: 1 Denúncia</span>
      </div>
      <div className="denuncia-lista">
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
            <p><strong>Informação adicional :</strong></p>
            <p>Boa tarde, não é que o local seja indevido mas eu moro perto e a morada não é essa, é tal tal tal, tal qualquer coisa! Obrigado pela atenção</p>
          </div>
        </div>
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
            <p><strong>Informação adicional :</strong></p>
            <p>Boa tarde, não é que o local seja indevido mas eu moro perto e a morada não é essa, é tal tal tal, tal qualquer coisa! Obrigado pela atenção</p>
          </div>
        </div>
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
            <p><strong>Informação adicional :</strong></p>
            <p>Boa tarde, não é que o local seja indevido mas eu moro perto e a morada não é essa, é tal tal tal, tal qualquer coisa! Obrigado pela atenção</p>
          </div>
        </div>
      </div>
      <div className="form-buttons">
        <button type="button" className="cancel-button" onClick={() => setShowDetailViewDenunciada(false)}>Cancelar</button>
        <button type="button" className="save-button" onClick={handleMedidasClick}>Tomar Medidas</button>
      </div>
    </div>
  </div>
) : null}




{showMedidasModal && (
  <>
    <div className="modal-backdrop2"></div>
    <div className="modal">
      <div className="modal-header">
      <img src="https://i.ibb.co/PDt0P85/Captura-de-ecr-2024-06-26-171232.png" alt="Captura-de-ecr-2024-06-26-171232" className="modal-icon" />
        <span>Tomar medidas:</span>
      </div>
      <div className="modal-body">
      <div className="option" onClick={handleDeleteClickMedidas}>
          <img src="https://i.ibb.co/18XzT1q/Captura-de-ecr-2024-06-26-171433.png" alt="Captura-de-ecr-2024-06-26-171433" />
          <span>Eliminar Local</span>
        </div>
        <div className="option" onClick={() => handleEditClick(publicationDetailDenunciada)}>
          <img src="https://i.ibb.co/9hm2v8B/Captura-de-ecr-2024-06-26-171921.png" alt="Captura-de-ecr-2024-06-26-171921" />
          <span>Editar Local</span>
        </div>
        <div className="option" onClick={handleAlertClick}>
          <img src="https://i.ibb.co/ZHC0zw5/Captura-de-ecr-2024-06-26-172004.png" alt="Captura-de-ecr-2024-06-26-172004" />
          <span>Alertar Autor do Local</span>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="cancel-button" onClick={() => setShowMedidasModal(false)}>Cancelar</button>
      </div>
    </div>
  </>
)}

{showDeleteModalMedidas && (
  <>
    <div className="modalDeleteMedidas">
      <div className="modalDeleteMedidas-header">
        <img src="https://i.ibb.co/4dfypxd/Captura-de-ecr-2024-06-28-111846.png" alt="Delete Icon" />
        <span>Eliminar Publicação?</span>
      </div>
      <div className="modalDeleteMedidas-body">
        <p>
          O user que criou esta Publicação irá ser notificado sobre a sua ação!
          Insira abaixo o motivo por qual removeu o publicação deste utilizador, o qual vai ser notificado da sua ação.
        </p>
        <textarea
          className="large-textareaDeleteMedidas"
          placeholder="...motivo de remoção..."
          value={deleteMessage}
          onChange={(e) => setDeleteMessage(e.target.value)}
          maxLength="240"
        />
        <div className="character-count">{deleteMessage.length}/240</div>
      </div>
      <div className="modalDeleteMedidas-footer">
        <button type="button" className="cancel-button" onClick={() => setShowDeleteModalMedidas(false)}>Cancelar</button>
        <button type="button" className="delete-button" onClick={handleDeleteMedidas}>Eliminar</button>
      </div>
    </div>
    <div className="modalDeleteMedidas-backdrop" />
  </>
)}

{showSuccessMessageMedidas && (
  <div className="modal-backdrop">
    <div className="success-message_delete">
      <div className="success-message-icon"></div>
      <h1>Ação aplicada com sucesso!</h1>
      <button onClick={() => setShowSuccessMessageMedidas(false)}>Continuar</button>
    </div>
  </div>
)}

  

{showAlertModal && (
  <div className='modalAlert-backdrop2'>
  <div className="modalAlert">
    <div className="modalAlert-header">
      <img src="https://i.ibb.co/ZHC0zw5/Captura-de-ecr-2024-06-26-172004.png" alt="Alert Icon" />
      <span>Alertar Autor</span>
    </div>
    <div className="modalAlert-body">
      <p>
        Insira abaixo o que deseja alertar para o autor desta publicação, para que este possa o mesmo editar
      </p>
      <textarea
        className="large-textareaAlert"
        placeholder="...motivo de alerta..."
        value={alertMessage}
        onChange={(e) => setAlertMessage(e.target.value)}
        maxLength="240"
      />
      <div className="character-count">{alertMessage.length}/240</div>
    </div>
    <div className="modalAlert-footer">
      <button type="button" className="cancel-button" onClick={() => setShowAlertModal(false)}>Cancelar</button>
      <button type="button" className="submit-button" onClick={handleSendAlert}>Enviar</button>
    </div>
  </div>
</div>
)}


{showSuccessMessageAlert && <div className="modal-backdrop"></div>}
  {showSuccessMessageAlert && (
    <div className="success-message_delete">
      <div className="success-message-icon"></div>
      <h1>Ação aplicada com sucesso!</h1>
      <button onClick={() => setShowSuccessMessageAlert(false)}>Continuar</button>
    </div>
)}
  

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

      {!showDetailViewDenunciada && !showApprovalView && !showDetailView && showPublicationList && (
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
  {filteredPublicacoes.map((publicacoes, index) => {
    
    
    return (
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
            <button 
              className="publications-edit-btn" 
              onClick={() => handleHideClick(publicacoes)}>
              <i className={`fas ${publicacoes.visivel ? 'fa-eye' : 'fa-eye-slash'}`}></i>
            </button>
            <button className="publications-edit-btn"onClick={() => handleEditClick(publicacoes)}>✏️</button>
            <button className="publications-edit-btn" onClick={() => handleDeleteClick(publicacoes)}>🗑️</button>
            {publicacoes.estado === 'Por validar' && (
              <button className="publications-edit-btn" onClick={() => handlePendingViewClick(publicacoes)}>
                <img src="https://i.ibb.co/9T565FK/Captura-de-ecr-2024-07-04-123100-removebg-preview.png" alt="Captura-de-ecr-2024-07-04-123100-removebg-preview" className="custom-icon" /> {/* Substitua URL_DA_IMAGEM_POR_VALIDAR pelo URL da imagem */}
              </button>
            )}
            {publicacoes.estado === 'Denunciada' && (
              <button className="publications-edit-btn" onClick={() => handleReportedViewClick(publicacoes)}>
                <img src="https://i.ibb.co/Cwhk8dN/Captura-de-ecr-2024-07-04-115321-removebg-preview.png" alt="Captura-de-ecr-2024-07-04-115321-removebg-preview" className="custom-icon" /> {/* Substitua URL_DA_IMAGEM_POR_VALIDAR pelo URL da imagem */}
              </button>
            )}
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
              </div>
            </div>
          )}
          {showHideModal && (
            <div className="modal_hide">
              <div className="modal-icon_hide">👁️</div>
              <div className="modal-header_hide">Ocultar Publicação</div>
              <div className="modal-body_hide">
                <p>Ao ocultar Publicação, este irá ser oculto aos utilizadores mas não será eliminado.</p>
                <p>Insira abaixo o motivo por qual removeu o comentário deste utilizador, o qual vai ser notificado da sua ação.</p>
                <textarea
                  className="large-textareaAlert"
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
    );
  })}
</tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default PublicacoesView;

