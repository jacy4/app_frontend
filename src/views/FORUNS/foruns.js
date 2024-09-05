import React, { useState, useEffect } from 'react';
import '../FORUNS/foruns.css';
import axios from 'axios';
// import handleSubmit from './criar_evento';
import TopicSelector from './topicSelector'; // Import TopicSelector component
import { useNavigate } from 'react-router-dom';
import CreateEventoButton from '../../componentes/botao_view_eventos/criar_evento';
import CreatePublicationButton from '../../componentes/botao_view_publicacoes/criar_publicacao';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useDropzone } from 'react-dropzone';
import moment from 'moment';
import 'moment/locale/pt'; // Importar o locale português
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRef } from 'react';


moment.locale('pt'); // Definir o locale para português

const ForumView = () => {
  const { areaId } = useParams();
  const [areas, setAreas] = useState([]);
  const [forum, setforum] = useState([]);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showforumList, setShowforumList] = useState(true);
  const [selectedButton, setSelectedButton] = useState('list'); // Default to "list" button
  const [centroId, setCentroId] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ForumToDelete, setForumToDelete] = useState(null);
  const [showHideModal, setShowHideModal] = useState(false);
  const [eventoToHide, setEventoToHide] = useState(null);
  const [removalReason, setRemovalReason] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [eventoToEdit, setEventoToEdit] = useState(null);
  const [showSuccessMessageDelete, setShowSuccessMessageDelete] = useState(false);
  const [showSuccessMessageHide, setShowSuccessMessageHide] = useState(false);
  const [filter, setFilter] = useState('all');
  const [showDetailViewDenunciada, setShowDetailViewDenunciada] = useState(false);
  const [eventoDetailDenunciada, setEventoDetailDenunciada] = useState(null);
  const [ForumDetailDenunciada, setForumDetailDenunciada] = useState(null);
  const [showMedidasModal, setShowMedidasModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccessMessageAlert, setShowSuccessMessageAlert] = useState(false);
  // const [selectedForum, setselectedForum] = useState(null);
  const [selectedForum, setselectedForum] = useState(null);
  const [showDeleteModalMedidas, setShowDeleteModalMedidas] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [showSuccessMessageMedidas, setShowSuccessMessageMedidas] = useState(false);
  const [showApprovalView, setShowApprovalView] = useState(false);
  const [eventoDetail, setEventoDetail] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('descricao');
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectMessage, setRejectMessage] = useState('');
  const [showDetailView, setShowDetailView] = useState(false);
  const [eventoDetailActive, setEventoDetailActive] = useState(null);
  const weekDays = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showReportedModal, setShowReportedModal] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagensForum, setmensagensForum] = useState([]);
  const [paginaweb, setPaginaweb] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [formFields, setFormFields] = useState([{ name: '' }]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [email, setEmail] = useState('');
  const [optionsEliminarOpen, setOptionsEliminarOpen] = useState(null);
  const [denunciasForum, setDenunciasForum] = useState([]);
  const [horario, setHorario] = useState({
    "Inicio": { inicioData: '', InicioHora: '' },
    "Fim": { fimData: '', FimHora: '' }

  });

  const [novaClassificacao, setNovaClassificacao] = useState(0);
  const [showDeleteMessage, setshowDeleteMessage] = useState(false);
  const [imagensGaleria, setImagensGaleria] = useState([]);
  const [denunciasMensagensForum, setDenunciasMensagensForum] = useState([]);

  const [localizacao, setLocalizacao] = useState('');
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null); // Estado para imagem escolhida
  const [galeria, setGaleria] = useState([]); // Estado para a galeria de imagens
  const [topicos, setTopicos] = useState([]);
  const [participante, setParticipante] = useState('');
  const handleAdicionarParticipanteVisual = (usuario_id) => {
    setParticipantesParaAdicionar([...participantesParaAdicionar, usuario_id]);
    // Remover do Forum visual, se ele estava na lista de remoção
    setParticipantesParaRemover(participantesParaRemover.filter(id => id !== usuario_id));
  };
  const [showAllComentarios, setShowAllComentarios] = useState(false);
  const [comentariosExibidos, setComentariosExibidos] = useState([]);
  useEffect(() => {
    setComentariosExibidos(showAllComentarios ? comentarios : comentarios.slice(0, 1));
  }, [comentarios, showAllComentarios]);

  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  // Form states
  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState({ nome: '', sobrenome: '', caminho_foto: '' });
  const [topico, setTopico] = useState('');
  const autor_id = sessionStorage.getItem('user_id');

  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({ nome: '', sobrenome: '', caminho_foto: '' });

  const [estrelas, setEstrelas] = useState(1);
  const [mediaAvaliacoes, setMediaAvaliacoes] = useState(null);

  const [comentariosParaRemover, setComentariosParaRemover] = useState([]);
  const [firstName, setFirstName] = useState('');

  const [participantes, setParticipantes] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [dataEvento, setDataEvento] = useState('');

  const openModalParticipantes = () => {
    setModalIsOpen(true); // Abre o modal
  };

  const closeModalParticipantes = () => {
    setModalIsOpen(false); // Fecha o modal
  };

  const [showComentarioModal, setShowComentarioModal] = useState(false);

  useEffect(() => {
    // Buscar as áreas do backend
    const fetchAreas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/areas/listarAreas');
        setAreas(response.data);
      } catch (error) {
        console.error('Erro ao buscar áreas:', error);
      }
    };
    fetchAreas();
  }, []);

  useEffect(() => {
    if (modalIsOpen) {
      // console.log("Modal está aberto agora!");
      // Aqui você poderia, por exemplo, carregar dados adicionais necessários para o modal.
    }
  }, [modalIsOpen]); // A dependência modalIsOpen faz com que o efeito seja executado sempre que modalIsOpen muda.


  useEffect(() => {
    // console.log(forum);  // Verifique o conteúdo de 'forum' após o setforum
  }, [forum]);


  const handleChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleClear = () => {
    setFirstName('');
  };

  useEffect(() => {
    const storedCentroId = sessionStorage.getItem('centro_id');
    if (storedCentroId) {
      setCentroId(storedCentroId);
    }
  }, []);

  useEffect(() => {
    const buscarforum = async () => {
      if (!centroId) {
        // console.log('centroId não definido');
        return;
      }
      // console.log(`Buscando publicações para centroId: ${centroId}`);
      try {
        const response = await axios.get(`http://localhost:3000/forum/list/${areaId}`);
        if (response.data && Array.isArray(response.data)) {
          // console.log(response.data);
          setforum(response.data);
        } else {
          console.error('Resposta da API vazia ou formato de dados incorreto');
        }
      } catch (error) {
        console.error('Erro ao buscar publicações:', error);
        setError(error.message);
      }
    };

    buscarforum();
  }, [centroId]);


  // const handleViewDetailsClick = (evento) => {
  //   setselectedForum(evento);
  //   setShowDetailView(true);
  // };

  const handleReportedViewClickForum = (Forum) => {
    setForumDetailDenunciada(Forum);
    setShowDetailViewDenunciada(true);
  };




  const handlePendingViewClick = (evento) => {
    setEventoDetail(evento);
    setShowApprovalView(true);
  };

  const handleReportedViewClick = (evento) => {
    setEventoDetailDenunciada(evento);
    setShowDetailViewDenunciada(true);
  };



  // Form states
  const handleHideClick = (evento) => {
    setEventoToHide(evento);
    setShowHideModal(true);
  };
  const [optionsOpen, setOptionsOpen] = useState(null);
  const handleEditClick = (evento) => {
    setEventoToEdit(evento);
    setselectedForum(evento);
    setShowEditForm(true);
    setShowforumList(false);
    setShowMedidasModal(false);
    setShowDetailViewDenunciada(false); // Fechar o modal "Tomar Medidas"
  };



  const handleCancelHide = () => {
    setShowHideModal(false);
    setEventoToHide(null);
    setRemovalReason('');
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDeleteClick = (evento) => {
    setForumToDelete(evento);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    // Aqui você deve realizar a lógica para realmente deletar a publicação
    setShowSuccessMessage(true); // Exibir a mensagem de sucesso após a exclusão
  };


  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setForumToDelete(null);
  };
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setForumToDelete(null);
  };
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/forum/delete/${ForumToDelete.id}`);
      setforum(forum.filter(p => p.id !== ForumToDelete.id));
      setShowSuccessMessageDelete(true); // Exibir a mensagem de sucesso após a exclusão
    } catch (error) {
      console.error('Erro ao deletar publicação:', error);
      // Aqui você pode adicionar lógica para tratar erros, como mostrar uma mensagem de erro para o usuário
    }
    setShowDeleteModal(false);
  };






  const openModal = () => {
    setShowFormModal(true);
  };

  // Função para fechar a modal
  const closeModal = () => {
    setShowFormModal(false);
  };



  const addFieldToForm = () => {
    if (selectedField) {
      setFormFields([...formFields, { type: selectedField, value: '' }]);
      setSelectedField('');
      closeModal();
    }
  };




  const formatarData = (data) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(data).toLocaleDateString('pt-PT', options);
  };

  const handleCreateForumClick = () => {
    setShowCreateForm(true);
    setShowforumList(false);
    setSelectedButton('create'); // Set the selected button
  };


  const handleCreateForm = () => {

    //setShowCreateForm(true);
    setShowSuccessMessage(true);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se o nome e a área foram selecionados
    if (!nome || !areaSelecionada) {
      alert('Por favor, preencha o nome e selecione uma área.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/forum/create', {
        nome,
        descricao,
        area_id: areaSelecionada, // Enviar a área selecionada
        centro_id: sessionStorage.getItem('centro_id') // Associar ao centro
      });

      if (response.status === 201) {
        alert('Fórum criado com sucesso!');
        setShowSuccessMessage(true);
        setNome('');
        setDescricao('');
        setAreaSelecionada(''); // Limpar os campos após a criação
      }
    } catch (error) {
      console.error('Erro ao criar fórum:', error);
      alert('Erro ao criar fórum. Por favor, tente novamente.');
    }
  };

  const handleShowEventoListClick = () => {
    setShowCreateForm(false);
    setShowforumList(true);
    setSelectedButton('list'); // Set the selected button
  };

  const handleCreateforumubmit = ({ nome, topico }) => {
    // Adiciona a nova publicação aos dados estáticos
    const novoEvento = {
      id: forum.length + 1,
      nome,
      topico,
      createdAt: new Date().toISOString(),
      estado: "Active"
    };
    setforum([...forum, novoEvento]);
    setShowCreateForm(false);
    setShowforumList(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleDelete = (evento) => {
    // Aqui você deve adicionar a lógica para deletar a publicação
    // Após deletar, você pode atualizar o estado `publicacoes` para remover a publicação
    setforum(forum.filter(p => p.id !== evento.id));
    closeDeleteModal();
  };

  const handleConfirmHide = () => {
    handleToggleVisibility(eventoToHide);
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

  const API_KEY = 'AIzaSyC6d4W1bxeX8v1G6mmLFCTzao3BrXOTa7s'; // Substitua pela sua API Key do Google Maps

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
    setShowforumList(true);
    setShowCreateForm(false);
    setShowEditForm(false);
    setSelectedButton(filter);
  };

  const filteredforum = forum.filter(evento => {
    // Verifique se 'titulo' e 'estado' são definidos
    if (!evento.nome || !evento.estado) return false;

    // Filtro por título
    const matchesTitle = evento.nome.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtro por estado
    let matchesState = true; // Default to true for 'all'
    if (filter === 'por validar') {
      matchesState = evento.estado === 'Por validar';
    } else if (filter === 'ativa') {
      matchesState = evento.estado === 'Ativa';
    } else if (filter === 'denunciada') {
      matchesState = evento.estado === 'Denunciada';
    } else if (filter === 'inativo') {
      matchesState = evento.estado === 'Inativo';
    }

    // console.log('Filtro atual:', filter);
    // console.log('Estado do evento:', evento.estado);


    // Combina ambos os filtros
    return matchesTitle && matchesState;
  });

  const countforumPorValidar = forum.filter(p => p.estado && p.estado.toLowerCase() === 'por validar').length;
  const countforumAtivas = forum.filter(p => p.estado && p.estado.toLowerCase() === 'ativa').length;
  const countforumDenunciadas = forum.filter(p => p.estado && p.estado.toLowerCase() === 'denunciado').length;
  const countforumInativos = forum.filter(p => p.estado && p.estado.toLowerCase() === 'Inativa').length;

  const handleMedidasClickForum = () => {
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
    // console.log("Alerta enviado:", alertMessage);

    // Mostrar mensagem de sucesso
    setShowSuccessMessageAlert(true);

    // Após enviar o alerta, você pode fechar o modal
    setShowAlertModal(false);
  };

  const handleDeleteClickMedidas = () => {
    setShowDeleteModalMedidas(true);
    setShowMedidasModal(false); // Fechar o modal de "Tomar Medidas"
  };


  const handleDeleteMedidas = async () => {
    try {
      // Supondo que você esteja deletando um evento baseado no eventoDetailDenunciada.id
      const response = await axios.delete(`http://localhost:3000/forum/delete/${ForumDetailDenunciada?.id}`, {
        data: { motivo: deleteMessage } // Passando o motivo da remoção, se necessário
      });

      if (response.status === 200) {
        alert('Evento eliminado com sucesso');
        setShowDeleteModalMedidas(false);
        // Adicione qualquer lógica adicional que você precisar após a exclusão
      } else {
        console.error('Erro na exclusão do evento:', response);
        alert('Ocorreu um erro ao eliminar o evento');
      }
    } catch (error) {
      console.error('Erro ao eliminar o evento:', error);
      alert('Ocorreu um erro ao eliminar o evento');
    }
  };


  const handleInfoClick = (evento) => {
    setEventoDetail(evento);
    setShowApprovalView(true);
  };

  const handleApproveClick = () => {
    setShowApproveModal(true);

  };

  const handleConfirmApprove = () => {
    // Adicione a lógica para aprovar o local aqui
    // console.log("Local aprovado!");
    setShowApproveModal(false);
    setShowSuccessMessageMedidas(true); // Mostrar a mensagem de sucesso após a aprovação
  };

  const handleRejectClick = () => {
    setShowRejectModal(true);
    handleRejectAndDelete();
  };

  const handleRejectAndDelete = async () => {
    try {
      const response = await axios.delete(`https://backend-teste-q43r.onrender.com/forum/delete/${eventoDetail.id}`);
      if (response.status === 200) {
        // console.log('evento eliminada com sucesso:', response.data);
        // Adicione qualquer lógica adicional, como redirecionamento ou atualização da UI
      } else {
        console.error('Erro ao eliminar evento:', response);
      }
    } catch (error) {
      console.error('Erro ao eliminar evento:', error);
    }
  };

  const handleRejectApprove = () => {
    // Adicione a lógica para aprovar o local aqui
    // console.log("Local rejeitado!");
    setShowRejectModal(false);
    setShowSuccessMessageMedidas(true); // Mostrar a mensagem de sucesso após a aprovação
  };

  const handleRejectSubmit = () => {
    // Adicione a lógica para enviar a rejeição aqui
    // console.log("Rejeição enviada:", rejectMessage);
    setShowRejectModal(false);
  };
  const isOpenNow = (horario) => {
    const currentDay = moment().format('dddd'); // Dia da semana atual em português
    const currentTime = moment(); // Hora atual

    // console.log("Horário Completo:", horario);
    // console.log("Dia Atual:", currentDay);
    // console.log("Hora Atual:", currentTime.format('HH:mm'));

    if (!horario || !horario[currentDay]) {
      // console.log("Horário não definido para o dia atual ou horário é nulo.");
      return false;
    }

    const todaySchedule = horario[currentDay];
    if (todaySchedule.toLowerCase() === 'fechado') {
      // console.log("O local está fechado hoje.");
      return false;
    }

    const [openTime, closeTime] = todaySchedule.split('-');
    const openMoment = moment(openTime, 'HH:mm');
    const closeMoment = moment(closeTime, 'HH:mm');

    // console.log("Horário de Abertura:", openMoment.format('HH:mm'));
    // console.log("Horário de Fechamento:", closeMoment.format('HH:mm'));

    const isOpen = currentTime.isBetween(openMoment, closeMoment);
    // console.log("Está Aberto Agora:", isOpen);

    return isOpen;
  };




  useEffect(() => {
    if (selectedForum && selectedForum.horario) {
      setIsOpen(isOpenNow(selectedForum.horario));
    }
  }, [selectedForum]);


  const handlePendingClick = (evento) => {
    // Lógica para tratar clique no botão de "Por validar"
    // Exemplo: Abrir uma modal para validação
    setselectedForum(evento);
    setShowPendingModal(true);
  };

  const handleReportedClick = (evento) => {
    // Lógica para tratar clique no botão de "Denunciada"
    // Exemplo: Abrir uma modal para revisão de denúncia
    setselectedForum(evento);
    setShowReportedModal(true);
  };

  useEffect(() => {
    const Comentarios = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comentarios_forum/todoscomentarios/${selectedForum.id}`);
        // console.log(response.data);
        setComentarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar comentários:', error);
      }
    };

    if (selectedForum) {
      Comentarios();
    }
  }, [selectedForum]);

  const handleAddComentario = async () => {
    const user_id = sessionStorage.getItem('user_id'); // Obtendo o user_id do sessionStorage
    const comentarioData = {
      evento_id: selectedForum.id,
      texto_comentario: novoComentario,
      user_id,
      classificacao: novaClassificacao
    };

    try {
      const response = await axios.post('http://localhost:3000/comentarios_forum/criarcomentario', comentarioData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        // Sucesso ao adicionar comentário

        // Atualize todos os comentários do usuário com a nova classificação no frontend
        const updatedComentarios = comentariosExibidos.map(comentario => {
          if (comentario.usuario.id === user_id) {
            return {
              ...comentario,
              classificacao: novaClassificacao
            };
          }
          return comentario;
        });

        // Atualize o estado com os novos comentários
        setComentariosExibidos(updatedComentarios);

        // Limpe o comentário e a classificação
        setNovoComentario('');
        setNovaClassificacao(0); // ou qualquer valor que indique a ausência de classificação
      } else {
        console.error('Erro na resposta do Backend:', response);
      }
    } catch (error) {
      console.error('Erro ao criar comentário:', error);
    }
  };


  const handleToggleVisibility = async (evento) => {
    try {
      const updatedVisivel = !evento.visivel;
      await axios.put(`https://backend-teste-q43r.onrender.com/forum/updateVisibility/${evento.id}`, { visivel: updatedVisivel });
      setforum(forum.map(p => p.id === evento.id ? { ...p, visivel: updatedVisivel } : p));
    } catch (error) {
      console.error('Erro ao atualizar visibilidade da publicação:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Volta para a página anterior
    setShowCreateForm(false);
  };

  const handleContinue = () => {
    const tabs = ['descricao', 'galeria', 'horario', 'localizacao', 'comentarios', 'mais_informacoes'];
    const currentIndex = tabs.indexOf(activeTab);
    // console.log('Índice atual:', currentIndex);   
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
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





  useEffect(() => {
    // Função para buscar os tópicos da API
    const Topicos = async () => {
      try {
        const response = await axios.get(`https://backend-teste-q43r.onrender.com/topicos/topicosdeumaarea/${areaId}`); // Substitua areaId pelo id da área
        setTopicos(response.data);
      } catch (error) {
        console.error('Erro ao buscar tópicos:', error);
      }
    };

    Topicos();
  }, [areaId]);

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`https://backend-teste-q43r.onrender.com/users/user/${id}`);
      // console.log("Resposta da API:", response.data); // Adicione este log
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };


  useEffect(() => {
    const id = sessionStorage.getItem('user_id'); // ou de onde quer que você esteja obtendo o ID do usuário
    // console.log("ID do usuário logado:", id);
    if (id) {
      setUserId(id);
      fetchUser(id);
    }
  }, []);



  const handleAvaliacaoChange = (e) => {
    setEstrelas(e.target.value);
  };

  const handleAvaliacaoSubmit = async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('user_id');
    const eventoId = selectedForum.id;

    try {
      const response = await axios.post('http://localhost:3000/avaliacao_forum/criar', {
        evento_id: eventoId,
        autor_id: userId,
        estrelas: estrelas
      });
      // console.log('Avaliação criada:', response.data);
      // Atualizar a UI ou fazer outras ações necessárias após criar a avaliação
    } catch (error) {
      console.error('Erro ao criar avaliação:', error);
    }
  };

  const MediaAvaliacoes2 = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/avaliacao_forum/media/${selectedForum.id}`);
      setMediaAvaliacoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar média de avaliações:', error);
    }
  };

  // useEffect(() => {
  // if (selectedForum) {
  //   MediaAvaliacoes();
  // }
  // }, [selectedForum]);

  useEffect(() => {
    if (eventoToEdit) {
      setNome(eventoToEdit.nome);
      setAutor(eventoToEdit.autor_id);
      setDescricao(eventoToEdit.descricao);
      setTopico(eventoToEdit.topico_id);
      setPaginaweb(eventoToEdit.paginaweb);
      setTelemovel(eventoToEdit.telemovel);
      setEmail(eventoToEdit.email);
      setLocalizacao(eventoToEdit.localizacao);

      // Inicializa o estado do horário com os dados da publicação
      if (eventoToEdit.horario) {
        const initialHorario = Object.keys(eventoToEdit.horario).reduce((acc, dia) => {
          const [inicio, fim] = eventoToEdit.horario[dia] === 'Fechado' ? ['', ''] : eventoToEdit.horario[dia].split('-');
          acc[dia] = {
            inicio: inicio || '',
            fim: fim || '',
            fechado: eventoToEdit.horario[dia] === 'Fechado',
          };
          return acc;
        }, {});
        setHorario(initialHorario);
      }

      // Inicializa o estado da galeria com os dados da publicação
      if (eventoToEdit.galeria) {
        setGaleria(eventoToEdit.galeria.map((url) => ({ url, preview: url })));
      }
    }
  }, [eventoToEdit]);


  const handleRemoveImage = (index) => {
    const updatedGaleria = [...galeria];
    updatedGaleria.splice(index, 1);
    setGaleria(updatedGaleria);
  };

  const handleRemoveComentario = async (comentarioId) => {
    try {
      await axios.delete(`http://localhost:3000/comentarios_forum/delete/${comentarioId}`);
      setComentarios(comentarios.filter(comentario => comentario.id !== comentarioId));
    } catch (error) {
      console.error('Erro ao remover comentário:', error);
    }
  };
  const [participantesParaRemover, setParticipantesParaRemover] = useState([]);

  const handleRemoverParticipanteVisual = (usuario_id) => {
    setParticipantes(participantes.filter(participante => participante.usuario_id !== usuario_id));
    setParticipantesParaRemover([...participantesParaRemover, usuario_id]);
  };
  useEffect(() => {

    // Carregar os usuários
    axios.get('http://localhost:3000/users/listarallUsers')  // Ajuste a rota conforme necessário
      .then(response => setUsuarios(response.data))
      .catch(error => console.error('Erro ao carregar usuários:', error));
  }, []);
  const [usuarios, setUsuarios] = useState([]);
  const usuariosDisponiveis = usuarios.filter(usuario =>
    !participantes.some(participante => participante.usuario_id === usuario.id)
  );

  const handleRemoverParticipante = async (usuario_id) => {
    try {
      await axios.delete('http://localhost:3000/listaForum/removerMembro', {
        data: {
          usuario_id,
          Forum_id: selectedForum.id,
        },
      });

      setParticipantes(participantes.filter(participante => participante.usuario_id !== usuario_id));
      alert('Participante removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover participante:', error);
      alert('Erro ao remover participante.');
    }
  };
  const [participantesParaAdicionar, setParticipantesParaAdicionar] = useState([]);



  const handleSubmitEdit = async () => {
    if (!selectedForum || !selectedForum.id) {
      console.error("ID do Forum não definido.");
      return;
    }

    const ForumData = {
      nome: nomeDoForum,
      descricao: descricaoDoForum,
      topico_id: topicoSelecionado,
      estado: estadoSelecionado,
      capa: urlCapa,
    };

    try {
      // Atualizar o Forum
      const response = await axios.put(`http://localhost:3000/forum/update/${selectedForum.id}`, ForumData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        // Remover participantes da lista de remoção
        for (const usuario_id of participantesParaRemover) {
          await axios.delete('http://localhost:3000/listaForum/removerMembro', {
            data: {
              usuario_id,
              Forum_id: selectedForum.id,
            },
          });
        }

        // Adicionar participantes da lista de adição
        for (const usuario_id of participantesParaAdicionar) {
          await axios.post('http://localhost:3000/listaForum/adicionarMembro', {
            usuario_id,
            Forum_id: selectedForum.id,
          });
        }

        alert('Forum atualizado com sucesso!');
      } else {
        console.error('Erro na resposta do Backend:', response);
      }
    } catch (error) {
      console.error('Erro ao atualizar Forum:', error);
    }
  };



  useEffect(() => {
    if (selectedForum) {
      setNomeDoForum(selectedForum.nome || '');
      setDescricaoDoForum(selectedForum.descricao || '');
      setTopicoSelecionado(selectedForum.topico_id || '');
      setEstadoSelecionado(selectedForum.estado || 'Ativa');
      setUrlCapa(selectedForum.capa || '');
    }
  }, [selectedForum]);


  const [nomeDoForum, setNomeDoForum] = useState('');
  const [areaSelecionada, setAreaSelecionada] = useState('');
  const [centroSelecionado, setCentroSelecionado] = useState('');
  const [topicoSelecionado, setTopicoSelecionado] = useState('');
  const [descricaoDoForum, setDescricaoDoForum] = useState('');
  const [urlCapa, setUrlCapa] = useState('');
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [eventoSelecionado, setEventoSelecionado] = useState('');
  const [forumId, setForumId] = useState(null);

  // const handleSubmitEdit = async (e) => {
  // e.preventDefault();

  // const formattedHorario = {};
  // for (const [dia, { inicio, fim, fechado }] of Object.entries(horario)) {
  //   formattedHorario[dia] = fechado ? 'Fechado' : `${inicio}-${fim}`;
  // }

  // const eventoData = {
  //   topico_id: topico,
  //   nome,
  //   descricao,
  //   horario: formattedHorario,
  //   localizacao,
  //   paginaweb,
  //   telemovel,
  //   email,
  //   galeria: galeria.map((img) => img.url), // Envia apenas as URLs das imagens
  //   centro_id: centroId,
  //   // autor_id: sessionStorage.getItem('user_id')
  //   autor_id: eventoToEdit.autor_id || sessionStorage.getItem('user_id') // Mantém o autor original se já definido
  // };

  // try {
  //   const response = await axios.put(`https://backend-teste-q43r.onrender.com/forum/update/${eventoToEdit.id}`, eventoData, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   // Remover os comentários marcados
  //   for (const comentarioId of comentariosParaRemover) {
  //     await axios.delete(`http://localhost:3000/comentarios_forum/delete/${comentarioId}`);
  //   }

  //   if (response.status === 201) { // Ajuste o código de status para 201 
  //     setShowSuccessMessage(true); // Mostrar modal de sucesso
  //   } else {
  //     console.error('Erro na resposta do Backend:', response); // Log de erro caso a resposta não seja 201
  //     // Lógica de erro adicional, se necessário
  //   }
  //   // console.log('Publicação atualizada:', response.data);

  // } catch (error) {
  //   console.error('Erro ao atualizar publicação:', error);
  // }
  // };

  const marcarComentarioParaRemover = (comentarioId) => {
    setComentariosParaRemover([...comentariosParaRemover, comentarioId]);
    setComentarios(comentarios.filter(comentario => comentario.id !== comentarioId));
  };


  // const approveLocal = async (eventoId) => {
  // try {
  //   const response = await axios.put(`https://backend-teste-q43r.onrender.com/forum/update/${eventoId}`, {
  //     estado: 'Ativa',
  //   }, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   if (response.status === 200) {
  //     // console.log('Publicação aprovada com sucesso');
  //     // Atualize o estado local se necessário, por exemplo:
  //     setselectedForum((prev) => ({ ...prev, estado: 'Ativo' }));
  //   } else {
  //     console.error('Erro ao aprovar publicação:', response);
  //   }
  // } catch (error) {
  //   console.error('Erro ao aprovar publicação:', error);
  // }
  // };

  // useEffect(() => {
  //   const fetchParticipantes = async () => {
  //       setLoading(true);
  //       try {
  //           const response = await axios.get(`http://localhost:3000/listaForum/listarMembros/${selectedForum.id}`);
  //           setParticipantes(response.data);
  //           setLoading(false);
  //       } catch (err) {
  //           setError('Falha ao buscar participantes');
  //           setLoading(false);
  //       }
  //   };

  //   fetchParticipantes();
  // }, [selectedForum]);

  const ellipsisRef = useRef(null); // Criar uma ref

  const handleViewDetailsClick = (forum) => {
    if (forum.centro_id == parseInt(centroId)) {
      setshowDeleteMessage(true);
      setTimeout(() => {
        if (ellipsisRef.current) {
          ellipsisRef.current.style.display = 'block'; // Usando ref ao invés de getElementById
        }
      }, 500);
    } else {
      setshowDeleteMessage(false);
      setTimeout(() => {
        if (ellipsisRef.current) {
          ellipsisRef.current.style.display = 'none'; // Usando ref ao invés de getElementById
        }
      }, 500);
    }
    setselectedForum(forum);
    setShowDetailView(true);
  };
  


  const adicionarParticipante = async (Forum_id, usuarioId) => {
    try {
      const response = await axios.post('http://localhost:3000/listaForum/adicionarMembro/', {
        Forum_id: Forum_id,
        usuario_id: usuarioId
      });
      const data = await response.json();
      if (response.status === 201) {
        setParticipantes(prevParticipantes => [...prevParticipantes, data.participante]);
        // Atualize seu estado ou faça qualquer outra ação necessária após adição bem sucedida
      } else {
      }
    } catch (error) {
      if (error.response) {
        // Resposta com status fora do intervalo 2xx
        console.error('Erro ao adicionar participante:', error.response.data);
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        console.error('Erro ao adicionar participante:', error.request);
      } else {
        // Algo aconteceu na configuração da requisição
        console.error('Erro:', error.message);
      }
    }
  };

  // Dentro do componente, antes do return
  useEffect(() => {
    // console.log('Selected Evento:', selectedForum);
    // console.log('Participantes:', participantes);
    // console.log('UserId:', userId);
  }, [selectedForum, participantes, userId]); // Dependências para re-logar quando mudarem

  // async function getAddressFromCoordinates(latitude, longitude) {
  //   const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=API_KEY`);
  //   const data = await response.json();

  //   if (data.results && data.results.length > 0) {
  //     return data.results[0].formatted_address;
  //   } else {
  //     return 'Endereço não encontrado';
  //   }
  // }

  // // Em algum lugar do seu componente React:
  // const [endereco, setEndereco] = useState('');

  // useEffect(() => {
  //   if (selectedForum.latitude && selectedForum.longitude) {
  //     getAddressFromCoordinates(selectedForum.latitude, selectedForum.longitude)
  //       .then(address => setEndereco(address))
  //       .catch(error => console.error('Erro ao obter endereço:', error));
  //   }
  // }, [selectedForum.latitude, selectedForum.longitude]);



  useEffect(() => {
    if (selectedForum && selectedForum.id) {
      const fetchMediaAvaliacoes = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/comentarios_forum/mediaavaliacoes/${selectedForum.id}`);
          setMediaAvaliacoes(response.data);
        } catch (error) {
          console.error('Erro ao buscar a média das avaliações:', error);
        }
      };

      fetchMediaAvaliacoes();
    }
  }, [selectedForum]);




  const handleRemoveCapa = () => {
    setUrlCapa(''); // Limpa a capa atual
  };

  const uploadImage = async (file) => {
    // console.log('Uploading image:', file); // Log do arquivo sendo enviado

    const formData = new FormData();
    formData.append('key', '2e5f4a936d41606819335ae440e4264a'); // Verifique sua chave da API
    formData.append('image', file);

    try {
      const response = await axios.post('https://api.imgbb.com/1/upload', formData);
      // console.log('Upload successful:', response.data); // Log da resposta de sucesso
      return response.data.data.url;
    } catch (error) {
      console.error('Error uploading image:', error); // Log do erro detalhado
      throw error; // Relança o erro para ser capturado na função onDropCapa
    }
  };

  const onDropCapa = async (acceptedFiles) => {
    // console.log('Dropping files:', acceptedFiles); // Log dos arquivos recebidos
    if (acceptedFiles.length > 0) {
      try {
        const url = await uploadImage(acceptedFiles[0]);
        // console.log('Rendered URL:', url); // Log da URL gerada
        setUrlCapa(url); // Define a URL da capa após o upload
      } catch (error) {
        console.error('Error in onDropCapa:', error); // Log de erro se o upload falhar
      }
    }
  };



  const { getRootProps: getCapaRootProps, getInputProps: getCapaInputProps } = useDropzone({
    onDrop: onDropCapa,
    accept: 'image/*',
  });
  // console.log('Dropzone initialized'); // Verifica se a dropzone foi inicializada corretamente

  useEffect(() => {
    const fetchDenuncias = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/denuncias_forum/Forum/${ForumDetailDenunciada?.id}`);
        setDenunciasForum(response.data);
      } catch (error) {
        console.error('Erro ao buscar denúncias:', error);
      }
    };

    if (ForumDetailDenunciada) {
      fetchDenuncias();
    }
  }, [ForumDetailDenunciada?.id]);


  const toggleOptionsForum = (denunciaId) => {
    setOptionsOpen(prevId => (prevId === denunciaId ? null : denunciaId));
  };

  const toggleOptionsEliminarMensagemForum = (mensagemId) => {
    setOptionsEliminarOpen(prevId => (prevId === mensagemId ? null : mensagemId));
  };


  const marcarDenunciaForumComoResolvida = async (denunciaId) => {
    try {
      const response = await axios.put(`http://localhost:3000/denuncias_mensagens_forum/update/${denunciaId}`, { resolvida: true });
      if (response.status === 200) {
        setDenunciasMensagensForum(prevDenuncias => prevDenuncias.map(denuncia =>
          denuncia.id === denunciaId ? { ...denuncia, resolvida: true } : denuncia
        ));
        setOptionsOpen(null); // Fecha o menu de opções após marcar como resolvida
      }
    } catch (error) {
      console.error('Erro ao marcar denúncia de Forum como resolvida:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.denuncia-actions')) {
        setOptionsOpen(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleClickEliminarOutside = (event) => {
      if (!event.target.closest('.denuncia-actions')) {
        setOptionsEliminarOpen(null);
      }
    };

    document.addEventListener('click', handleClickEliminarOutside);
    return () => {
      document.removeEventListener('click', handleClickEliminarOutside);
    };
  }, []);
  useEffect(() => {
    const fetchDenunciasMensagensForum = async () => {
      if (!ForumDetailDenunciada?.id) {
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/denuncias_mensagens_forum/forum/${ForumDetailDenunciada.id}`);
        setDenunciasMensagensForum(response.data);
      } catch (error) {
        console.error('Erro ao buscar denúncias das mensagens do fórum:', error);
      }
    };

    if (ForumDetailDenunciada) {
      fetchDenunciasMensagensForum();
    }
  }, [ForumDetailDenunciada]);



  useEffect(() => {
    const fetchMensagensForum = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/mensagem_forum/forum/${selectedForum.id}`);
        setmensagensForum(response.data);
      } catch (error) {
        console.error('Erro ao buscar mensagens do fórum:', error);
      }
    };

    if (selectedForum) {
      fetchMensagensForum();
    }
  }, [selectedForum]);


  if (error) {
    return <div>{error}</div>;
  }



  const handleDeleteMensagemForum = async (mensagemId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/mensagem_forum/delete/${mensagemId}`);
      if (response.status === 200) {
        alert('Mensagem excluída com sucesso');
        setmensagensForum(mensagensForum.filter(mensagem => mensagem.id !== mensagemId)); // Atualize a lista de mensagens
      } else {
        console.error('Erro ao excluir a mensagem:', response);
        alert('Ocorreu um erro ao excluir a mensagem');
      }
    } catch (error) {
      console.error('Erro ao excluir a mensagem:', error);
      alert('Ocorreu um erro ao excluir a mensagem');
    }
  };


  return (
    <div className="publicacoes-div_princ">
      {!showCreateForm && !showEditForm && !showDetailViewDenunciada && !showApprovalView && !showDetailView && <h1 className="publicacoes-title2">Lista de Fóruns</h1>}
      {!showCreateForm && !showEditForm && !showDetailViewDenunciada && !showApprovalView && !showDetailView && (
        <div className="publicacoes-button-container">
          <div className="left-buttons">
            <CreateEventoButton
              onClick={() => handleButtonClick('all')}
              iconSrc="https://i.ibb.co/P4nsk4w/Icon-criar.png"
              iconBgColor="#e0f7fa"
              title="forum Totais"
              subtitle={forum.length.toString()}
              isSelected={selectedButton === 'all'}
            />
            <CreateEventoButton
              iconSrc="https://i.ibb.co/RPC7vW8/Icon-denuncia.png"
              iconBgColor="#FFE0EB"
              title="Denunciados"
              subtitle={countforumDenunciadas.toString()}
              isSelected={selectedButton === 'denunciado'}
              onClick={() => handleButtonClick('denunciado')}
            />
            <div className="right-button">
              <CreatePublicationButton
                onClick={handleCreateForumClick}
                iconSrc="https://i.ibb.co/P4nsk4w/Icon-criar.png"
                iconBgColor="#e0f7fa"
                title="Criar Fórum"
                subtitle="Criar..."
                isSelected={selectedButton === 'create'}
              />
            </div>
          </div>
        </div>
      )}
      {!showDetailViewDenunciada && !showApprovalView && !showDetailView && showforumList && (
        <div className="search-container">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Procurar por fórum..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <i className="fas fa-search search-icon"></i>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="publicacoes_div_princ">
          <h1 className="publicacoes-title2">Editar informações do Forum</h1>
          <div className="header">
            <h1 className="header-title">{selectedForum.nome}</h1>
            <div className="author">
              <div className="authorName"><span>Autor :</span></div>
              <img src={selectedForum.autor.caminho_foto} alt={selectedForum.autor.nome} className="author-icon" />
              <span>{selectedForum.autor.nome} {selectedForum.autor.sobrenome}</span>
            </div>
          </div>
          <div className="tab-content2">
            {/* Formulário de Edição do Forum */}
            <form onSubmit={handleSubmitEdit}>
              <div className="form-group">
                <label>Tópico</label>
                <select value={topicoSelecionado} onChange={(e) => setTopicoSelecionado(e.target.value)}>
                  <option value="">Selecionar Tópico</option>
                  {topicos.map((topico) => (
                    <option key={topico.id} value={topico.id}>{topico.nome}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Nome do Forum</label>
                <input
                  type="text"
                  placeholder="Inserir nome do Forum"
                  value={nomeDoForum}
                  onChange={(e) => setNomeDoForum(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Descrição do Forum</label>
                <input
                  placeholder="Inserir uma breve descrição do Forum"
                  value={descricaoDoForum}
                  onChange={(e) => setDescricaoDoForum(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Estado</label>
                <select value={estadoSelecionado} onChange={(e) => setEstadoSelecionado(e.target.value)}>
                  <option value="Ativa">Ativa</option>
                  <option value="Denunciada">Denunciada</option>
                </select>
              </div>

              <div className="form-group">
                <label>Capa do Forum</label>
                <div {...getCapaRootProps({ className: 'dropzone' })} className="gallery-upload">
                  <input {...getCapaInputProps()} />
                  <div className="upload-box">
                    <span className="upload-icon">+</span>
                    <span className="upload-text">Upload</span>
                  </div>
                  {urlCapa && (
                    <div className="uploaded-images">
                      <img src={urlCapa} alt="Capa do Forum" className="capa-preview" />
                      <button className="remove-image" onClick={handleRemoveCapa}>x</button>
                    </div>
                  )}
                </div>
                {/* {// console.log('Rendered URL:', urlCapa)} // Log para verificar se a URL da imagem está sendo renderizada */}
              </div>

              {/* Lista de Participantes */}
              {/* Lista de Participantes */}
              <div className="participantes-section">
                <h3>Participantes do Forum</h3>
                <ul>
                  {participantes.map(participante => (
                    <li key={participante.usuario_id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={participante.usuario.caminho_foto}
                          alt={`${participante.usuario.nome} ${participante.usuario.sobrenome}`}
                          style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                        />
                        <span>{participante.usuario.nome} {participante.usuario.sobrenome}</span>
                      </div>
                      <button
                        onClick={() => handleRemoverParticipanteVisual(participante.usuario_id)}
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '5px 10px',
                          fontSize: '10px',
                          cursor: 'pointer',
                          marginTop: '5px', // Adicione um pequeno espaçamento acima do botão
                        }}
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
              </div>


              <div className="adicionar-participante-section">
                <h3>Adicionar Participante</h3>
                <select
                  value={participante}
                  onChange={(e) => setParticipante(e.target.value)}
                >
                  <option value="">Selecionar Usuário</option>
                  {usuariosDisponiveis.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.nome} {usuario.sobrenome}
                    </option>
                  ))}
                </select>

                <button
                  onClick={(e) => {
                    e.preventDefault(); // Previne o comportamento padrão do botão
                    handleAdicionarParticipanteVisual(participante);
                  }}
                  className="adicionar-button"
                >
                  Adicionar
                </button>

              </div>



              {/* Botões de Ação */}
              <div className="form-buttons">
                <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
                <button type="button" className="save-button" onClick={handleSubmitEdit}><i className="fas fa-save"></i>Alterações</button>
              </div>
            </form>
          </div>
          {/* Mensagem de Sucesso */}
          {showSuccessMessage && <div className="modal-backdrop"></div>}
          {showSuccessMessage && (
            <div className="success-message_delete">
              <div className="success-message-icon"></div>
              <h1>Forum editado com sucesso!</h1>
              <button onClick={() => setShowSuccessMessage(false)}>Continuar</button>
            </div>
          )}
        </div>
      )}


      {showDetailView && selectedForum && (
        <div className="publicacoes_div_princ">

          <h1 className="publicacoes-title2">Mensagens do Fórum</h1>
          <div className="header">
            <h1 className="header-title">{selectedForum.nome}</h1>
            {/* <div className="author">
        <div className="authorName"><span>Autor do Fórum:</span></div>
        {selectedForum.autor?.caminho_foto && (
          <img src={selectedForum.autor.caminho_foto} alt={selectedForum.autor.nome} className="author-icon" />
        )}
        {selectedForum.autor && (
          <span>{selectedForum.autor.nome} {selectedForum.autor.sobrenome}</span>
        )}
      </div> */}
          </div>
          <div className="tab-content2">
            <div className="denuncia-header2">
              <h2>Lista de Mensagens</h2>
              <span className="total-denuncias">Total: {mensagensForum.length} {mensagensForum.length === 1 ? 'Mensagem' : 'Mensagens'}</span>
            </div>
            <div className="denuncias-list">
              {mensagensForum.map((mensagem) => (
                <div key={mensagem.id} className="denuncia">
                  <div className="denuncia-header">
                    <div className="denunciante-info">
                      {mensagem.usuario?.caminho_foto && (
                        <img src={mensagem.usuario.caminho_foto} alt={`${mensagem.usuario.nome} ${mensagem.usuario.sobrenome}`} className="denuncia-avatar" />
                      )}
                      <div className="denunciante-texto">
                        {mensagem.usuario && (
                          <>
                            <span className="denuncia-autor">{mensagem.usuario.nome} {mensagem.usuario.sobrenome}</span>
                            <span className="denuncia-data">{new Date(mensagem.createdat).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="denuncia-actions">
                      <div className="options-button" id="ellipsis-da-denuncia" ref={ellipsisRef} onClick={() => toggleOptionsForum(mensagem.id)}>
                        <i className="fas fa-ellipsis-v"></i>
                      </div>
                      {optionsOpen === mensagem.id && showDeleteMessage && (
                        <div className="options-menu">
                          <button onClick={() => handleDeleteMensagemForum(mensagem.id)}>
                            <i className="fas fa-trash-alt custom-delete-icon"></i> Excluir Mensagem
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="denuncia-conteudo">
                    <p>{mensagem.texto_mensagem}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="form-buttons">
              <button type="button" className="cancel-button" onClick={() => setShowDetailView(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}



      {showDetailViewDenunciada && ForumDetailDenunciada && (

        <div className="publicacoes_div_princ">

          <h1 className="publicacoes-title2">Denúncias das Mensagens do Fórum</h1>
          <div className="header">
            <h1 className="header-title">{ForumDetailDenunciada.nome}</h1>
          </div>
          <div className="tab-content2">
            <div className="denuncia-header2">
              <h2>Lista de Denúncias</h2>
              <span className="total-denuncias">Total: {denunciasMensagensForum.length} {denunciasMensagensForum.length === 1 ? 'Denúncia' : 'Denúncias'}</span>
            </div>
            <div className="denuncias-list">
              {denunciasMensagensForum.map((denuncia) => (
                <div key={denuncia.id} className="denuncia">
                  <div className="denuncia-header">
                    <div className="denunciante-info">
                      {denuncia.denunciante?.caminho_foto && (
                        <img src={denuncia.denunciante.caminho_foto} alt={`${denuncia.denunciante.nome} ${denuncia.denunciante.sobrenome}`} className="denuncia-avatar" />
                      )}
                      <div className="denunciante-texto">
                        {denuncia.denunciante && (
                          <>
                            <span className="denuncia-autor">{denuncia.denunciante.nome} {denuncia.denunciante.sobrenome}</span>
                            <span className="denuncia-data">{new Date(denuncia.createdAt).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="denuncia-actions">
                      {!denuncia.resolvida && (
                        <div className="options-button" onClick={() => toggleOptionsForum(denuncia.id)}>
                          <i className="fas fa-ellipsis-v"></i>
                        </div>
                      )}
                      {optionsOpen === denuncia.id && (
                        <div className="options-menu">
                          <button onClick={() => marcarDenunciaForumComoResolvida(denuncia.id)}>
                            <i className="fas fa-check-circle custom-check-icon"></i> Marcar como Resolvida
                          </button>
                        </div>
                      )}
                      {denuncia.resolvida && (
                        <span className="denuncia-resolvida">Denúncia Resolvida</span>
                      )}
                    </div>
                  </div>

                  <div className="denuncia-conteudo">
                    <p><strong>Motivo:</strong> {denuncia.motivo}</p>
                    <p><strong>Informação Adicional:</strong> {denuncia.informacao_adicional}</p>
                  </div>
                </div>

              ))}
            </div>
            <div className="form-buttons">
              <button type="button" className="cancel-button" onClick={() => setShowDetailView(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}






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
              <div className="option" onClick={() => handleEditClick(ForumDetailDenunciada)}>
                <img src="https://i.ibb.co/9hm2v8B/Captura-de-ecr-2024-06-26-171921.png" alt="Captura-de-ecr-2024-06-26-171921" />
                <span>Editar Local</span>
              </div>
              <div className="option" onClick={handleAlertClick}>
                <img src="https://i.ibb.co/ZHC0zw5/Captura-de-ecr-2024-06-26-172004.png" alt="Captura-de-ecr-2024-06-26-172004" />
                <span>Alertar Autor do Evento</span>
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
              <span>Eliminar Evento?</span>
            </div>
            <div className="modalDeleteMedidas-body">
              <p>
                O user que criou este Evento irá ser notificado sobre a sua ação!
                Insira abaixo o motivo por qual removeu o evento deste utilizador, o qual vai ser notificado da sua ação.
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
                Insira abaixo o que deseja alertar para o autor deste evento, para que este possa o mesmo editar
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
        <div className="publicacoes_div_princ">
          <h1 className="publicacoes-title2">Criar Fórum</h1>
          <div className="header">
            <h1 className="header-title">Nome do Fórum</h1>
          </div>
          <div className="tab-content2">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome do Fórum</label>
                <input 
                  type="text" 
                  placeholder="Inserir nome do fórum" 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label>Área Associada</label>
                <select
                  value={areaSelecionada}
                  onChange={(e) => setAreaSelecionada(e.target.value)}
                >
                  <option value="">Selecione uma área</option>
                  {areas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-buttons">
                <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
                <button type="submit" className="submit-button_maisinfos">Criar</button>
              </div>
            </form>
          </div>
          {showSuccessMessage && (
            <div className="success-message">
              <h1>Fórum criado com sucesso!</h1>
              <button onClick={() => setShowSuccessMessage(false)}>Continuar</button>
            </div>
          )}
        </div>
      )}

      {!showDetailViewDenunciada && !showApprovalView && !showDetailView && showforumList && (
        <div className="publications-view">
          <table className="publications-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Estado</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {filteredforum.map((forum, index) => {

                // console.log('forum filtrados:', filteredforum);

                return (
                  <tr key={forum.id}>
                    <td>{index + 1}</td>
                    <td>{forum.nome}</td>
                    <td>
                      <span className={`publications-status ${forum.estado.toLowerCase().replace(' ', '-')}`}>
                        {forum.estado}
                      </span>
                    </td>


                    <td>
                      <div className="edit-buttons-container">
                        <button className="edit-btn" onClick={() => handleViewDetailsClick(forum)}>i</button>
                        {forum.centro_id === parseInt(centroId) && (
                          <>
                            <button className="publications-edit-btn" onClick={() => handleDeleteClick(forum)}>🗑️</button>

                            {forum.estado === 'Denunciado' && (
                              <button className="publications-edit-btn" onClick={() => handleReportedViewClickForum(forum)}>
                                <img src="https://i.ibb.co/Cwhk8dN/Captura-de-ecr-2024-07-04-115321-removebg-preview.png" alt="Captura-de-ecr-2024-07-04-115321-removebg-preview" className="custom-icon" /> {/* Substitua URL_DA_IMAGEM_POR_VALIDAR pelo URL da imagem */}
                              </button>
                            )}
                          </>
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

export default ForumView;