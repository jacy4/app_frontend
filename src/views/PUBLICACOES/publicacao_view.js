// // export default PublicacoesView;
import React, { useState, useEffect } from 'react';
import './PublicacoesView.css'; 
import axios from 'axios';
import CreatePublicationButton from '../../componentes/botao_view_publicacoes/criar_publicacao';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import moment from 'moment';
import 'moment/locale/pt'; // Importar o locale português
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';



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
  const [descricao, setDescricao] = useState('');
  const [paginaweb, setPaginaweb] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [email, setEmail] = useState('');
  const [horario, setHorario] = useState({
    "Segunda-feira": { inicio: '', fim: '', fechado: false },
    "Terça-feira": { inicio: '', fim: '', fechado: false },
    "Quarta-feira": { inicio: '', fim: '', fechado: false },
    "Quinta-feira": { inicio: '', fim: '', fechado: false },
    "Sexta-feira": { inicio: '', fim: '', fechado: false },
    "Sábado": { inicio: '', fim: '', fechado: false },
    "Domingo": { inicio: '', fim: '', fechado: false },
});
const [latitude, setLatitude] = useState(null);
const [longitude, setLongitude] = useState(null);
  
  const [showComentarioModal, setShowComentarioModal] = useState(false);
  const [novaClassificacao, setNovaClassificacao] = useState(0);
  const [localizacao, setLocalizacao] = useState('');
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null); // Estado para imagem escolhida
  const [galeria, setGaleria] = useState([]); // Estado para a galeria de imagens
  const [topicos, setTopicos] = useState([]);
  const areaId = 1; // Defina o ID da área aqui

  const [showAllComentarios, setShowAllComentarios] = useState(false);
  const [comentariosExibidos, setComentariosExibidos] = useState([]);
useEffect(() => {
  setComentariosExibidos(showAllComentarios ? comentarios : comentarios.slice(0, 1));
}, [comentarios, showAllComentarios]);


  const [isOpen, setIsOpen] = useState(false); 
  // Form states
  const [titulo, setTitulo] = useState('');
  const [topico, setTopico] = useState('');
  const [area, setArea] = useState('');
  const autor_id = sessionStorage.getItem('user_id');

  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({ nome: '', sobrenome: '', caminho_foto: ''  });
  
  const [estrelas, setEstrelas] = useState(1);
  const [mediaAvaliacoes, setMediaAvaliacoes] = useState(null);

  const [comentariosParaRemover, setComentariosParaRemover] = useState([]);
  
  const [denuncias, setDenuncias] = useState([]);

  const [optionsOpen, setOptionsOpen] = useState(null);
  const [optionsOpenExcluir, setOptionsOpenExcluir] = useState(null);

  const [menuAberto, setMenuAberto] = useState(null);

  useEffect(() => {
    // Função para buscar as áreas da API
    const fetchAreas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/areas/listarAreas'); // Substitua com a URL correta da sua API para buscar as áreas
        setAreas(response.data);
      } catch (error) {
        console.error('Erro ao buscar áreas:', error);
      }
    };
  
    fetchAreas();
  }, []);
  
  const [areas, setAreas] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Iniciando handleSubmit'); // Log para verificar se a função está sendo chamada

    // Formatando o horário para o formato desejado
    const formattedHorario = {};
    for (const [dia, { inicio, fim, fechado }] of Object.entries(horario)) {
        if (fechado) {
            formattedHorario[dia] = 'Fechado';
        } else {
            formattedHorario[dia] = `${inicio}-${fim}`;
        }
    }

    const publicacaoData = {
      area_id: area,
        topico_id: topico,
        titulo,
        descricao,
        horario: formattedHorario,
        localizacao,
        paginaweb,
        telemovel,
        email,
        latitude,
        longitude,
        galeria: galeria.map((img) => img.url), // Envia apenas as URLs das imagens
        centro_id: centroId,
        autor_id: sessionStorage.getItem('user_id') 
    };
    
    console.log('Dados da Publicação:', publicacaoData); // Log dos dados que serão enviados

    try {
        const response = await axios.post('http://localhost:3000/publicacoes/create', publicacaoData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Resposta do Backend:', response); // Log da resposta do backend

        if (response.status === 201) { // Ajuste o código de status para 201 Created
            setShowSuccessMessage(true); // Mostrar modal de sucesso
        } else {
            console.error('Erro na resposta do Backend:', response); // Log de erro caso a resposta não seja 201
            // Lógica de erro
        }
    } catch (error) {
        console.error('Erro ao criar publicação:', error); // Log do erro
    }
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
  
  
  const filteredPublicacoes = publicacoes.filter(publicacao => {
  // Filtro por título
  const matchesTitle = publicacao.titulo.toLowerCase().includes(searchTerm.toLowerCase());

  // Filtro por estado
  let matchesState = true; // Default to true for 'all'
  if (filter === 'por validar') {
    matchesState = publicacao.estado === 'Por validar';
  } else if (filter === 'ativa') {
    matchesState = publicacao.estado === 'Ativa';
  } else if (filter === 'denunciada') {
    matchesState = publicacao.estado === 'Denunciada';
  }

  // Combina ambos os filtros
  return matchesTitle && matchesState;
});
  
  
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
  approveLocal(publicationDetail.id); // Chame a função aqui
};

const handleConfirmApprove = () => {
  // Adicione a lógica para aprovar o local aqui
  console.log("Local aprovado!");
  setShowApproveModal(false);
  setShowSuccessMessageMedidas(true); // Mostrar a mensagem de sucesso após a aprovação
};

const handleRejectClick = () => {
  setShowRejectModal(true);
  handleRejectAndDelete();
};

const handleRejectAndDelete = async () => {
  try {
    const response = await axios.delete(`http://localhost:3000/publicacoes/delete/${publicationDetail.id}`);
    if (response.status === 200) {
      console.log('Publicação eliminada com sucesso:', response.data);
      // Adicione qualquer lógica adicional, como redirecionamento ou atualização da UI
    } else {
      console.error('Erro ao eliminar publicação:', response);
    }
  } catch (error) {
    console.error('Erro ao eliminar publicação:', error);
  }
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
  const Comentarios = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/comentarios/todospubcomentarios/${selectedPublication.id}`);
      console.log(response.data);
      setComentarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  if (selectedPublication) {
    Comentarios();
  }
}, [selectedPublication]);




const handleLike = async (comentarioId) => {
  try {
    await axios.post(`http://localhost:3000/likescomentariospublicacoes/like`, {
      comentario_publicacao_id: comentarioId,
      user_id: sessionStorage.getItem('user_id')
    });

    // Após o sucesso, você pode incrementar o número de likes no estado local
    setComentarios(prevComentarios => prevComentarios.map(comentario => {
      if (comentario.id === comentarioId) {
        return { ...comentario, likes: comentario.likes + 1 };
      }
      return comentario;
    }));
  } catch (error) {
    console.error('Erro ao adicionar like:', error);
  }
};


const handleAddComentario = async () => {
  const user_id = sessionStorage.getItem('user_id'); // Obtendo o user_id do sessionStorage
    const comentarioData = {
      publicacao_id: selectedPublication.id,
      conteudo: novoComentario,
      user_id,
      classificacao: novaClassificacao
    };
  
    try {
      const response = await axios.post('http://localhost:3000/comentarios/criarpubcomentario', comentarioData, {
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


const handleToggleVisibility = async (publicacao) => {
  try {
    const updatedVisivel = !publicacao.visivel;
    await axios.put(`http://localhost:3000/publicacoes/updateVisibility/${publicacao.id}`, { visivel: updatedVisivel });
    setPublicacoes(publicacoes.map(p => p.id === publicacao.id ? { ...p, visivel: updatedVisivel } : p));
  } catch (error) {
    console.error('Erro ao atualizar visibilidade da publicação:', error);
  }
};

const handleCancel = () => {
  navigate(-1); // Volta para a página anterior
};

const handleContinue = () => {
  const tabs = ['descricao', 'galeria', 'horario', 'localizacao', 'comentarios', 'mais_informacoes'];
  const currentIndex = tabs.indexOf(activeTab);
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

  
const headers = {
  "Content-Type": "application/json",
  Authorization: '4d755673a2dc94483064445f4d5c54e9', // Certifique-se de substituir pela chave correta
};

const uploadImage = async (file) => {
  const formData = new FormData();
  console.log(file);
  formData.set('key', headers.Authorization); // Use a chave da API do objeto headers
  formData.append('image', file);

  try {
    const response = await axios.post('https://api.imgbb.com/1/upload', formData,
    { params: {
      key: '4d755673a2dc94483064445f4d5c54e9'
    }});
    console.log('Upload bem-sucedido:', response.data);
    return response.data.data.url; // Certifique-se de que está acessando a URL corretamente
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw error; // Repropague o erro para ser tratado na função de chamada
  }
};



const onDrop = async (acceptedFiles) => {
  const uploadedImages = await Promise.all(
    acceptedFiles.map(async (file) => {
      const url = await uploadImage(file);
      return { file, preview: URL.createObjectURL(file), url };
    })
  );
  setGaleria([...galeria, ...uploadedImages]);
};


const { getRootProps, getInputProps } = useDropzone({
  onDrop,
  accept: 'image/*'
});

const [selectedAreaId, setSelectedAreaId] = useState(null);



useEffect(() => {
  // Função para buscar os tópicos da API
  const Topicos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/topicos/topicosdeumaarea/${area}`); // Substitua areaId pelo id da área
      setTopicos(response.data);
    } catch (error) {
      console.error('Erro ao buscar tópicos:', error);
    }
  };

  Topicos();
}, [area]);

const fetchUser = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/users/user/${id}`);
    console.log("Resposta da API:", response.data); // Adicione este log
    setUser(response.data);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};


useEffect(() => {
  const id = sessionStorage.getItem('user_id'); // ou de onde quer que você esteja obtendo o ID do usuário
  console.log("ID do usuário logado:", id);
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
  const publicacaoId = selectedPublication.id;

  try {
    const response = await axios.post('http://localhost:3000/avaliacao/create', {
      publicacao_id: publicacaoId,
      autor_id: userId,
      estrelas: estrelas
    });
    console.log('Avaliação criada:', response.data);
    // Atualizar a UI ou fazer outras ações necessárias após criar a avaliação
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
  }
};

// const MediaAvaliacoes = async () => {
//   try {
//     const response = await axios.get(`http://localhost:3000/avaliacao/average/${selectedPublication.id}`);
//     setMediaAvaliacoes(response.data);
//   } catch (error) {
//     console.error('Erro ao buscar média de avaliações:', error);
//   }
// };

// useEffect(() => {
//   if (selectedPublication) {
//     MediaAvaliacoes();
//   }
// }, [selectedPublication]);

useEffect(() => {
  if (selectedPublication && selectedPublication.id) {
    const fetchMediaAvaliacoes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comentarios/mediapubavaliacoes/${selectedPublication.id}`);
        setMediaAvaliacoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar a média das avaliações:', error);
      }
    };

    fetchMediaAvaliacoes();
  }
}, [selectedPublication]);

useEffect(() => {
  if (publicationToEdit) {
    setTitulo(publicationToEdit.titulo);
    setDescricao(publicationToEdit.descricao);
    setArea(publicationToEdit.area_id);
    setTopico(publicationToEdit.topico_id);
    setPaginaweb(publicationToEdit.paginaweb);
    setTelemovel(publicationToEdit.telemovel);
    setEmail(publicationToEdit.email);
    setLocalizacao(publicationToEdit.localizacao);
    setEstado(publicationToEdit.estado);
    
    // Inicializa o estado do horário com os dados da publicação
    if (publicationToEdit.horario) {
      const initialHorario = Object.keys(publicationToEdit.horario).reduce((acc, dia) => {
        const [inicio, fim] = publicationToEdit.horario[dia] === 'Fechado' ? ['', ''] : publicationToEdit.horario[dia].split('-');
        acc[dia] = {
          inicio: inicio || '',
          fim: fim || '',
          fechado: publicationToEdit.horario[dia] === 'Fechado',
        };
        return acc;
      }, {});
      setHorario(initialHorario);
    }

    // Inicializa o estado da galeria com os dados da publicação
    if (publicationToEdit.galeria) {
      setGaleria(publicationToEdit.galeria.map((url) => ({ url, preview: url })));
    }
  }
}, [publicationToEdit]);


const handleRemoveImage = (index) => {
  const updatedGaleria = [...galeria];
  updatedGaleria.splice(index, 1);
  setGaleria(updatedGaleria);
};

const handleRemoveComentario = async (comentarioId) => {
  try {
    await axios.delete(`http://localhost:3000/comentarios/delete/${comentarioId}`);
    setComentarios(comentarios.filter(comentario => comentario.id !== comentarioId));
  } catch (error) {
    console.error('Erro ao remover comentário:', error);
  }
};

const handleSubmitEdit = async (e) => {
  e.preventDefault();

  const formattedHorario = {};
  for (const [dia, { inicio, fim, fechado }] of Object.entries(horario)) {
    formattedHorario[dia] = fechado ? 'Fechado' : `${inicio}-${fim}`;
  }

  const publicacaoData = {
    area_id: area,
    topico_id: topico,
    titulo,
    descricao,
    horario: formattedHorario,
    localizacao,
    paginaweb,
    telemovel,
    estado,
    email,
    galeria: galeria.map((img) => img.url), // Envia apenas as URLs das imagens
    centro_id: centroId,
    // autor_id: sessionStorage.getItem('user_id')
    autor_id: publicationToEdit.autor_id || sessionStorage.getItem('user_id') // Mantém o autor original se já definido
  };

  try {
    const response = await axios.put(`http://localhost:3000/publicacoes/update/${publicationToEdit.id}`, publicacaoData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Remover os comentários marcados
    for (const comentarioId of comentariosParaRemover) {
      await axios.delete(`http://localhost:3000/comentarios/delete/${comentarioId}`);
    }

    if (response.status === 201) { // Ajuste o código de status para 201 
      setShowSuccessMessage(true); // Mostrar modal de sucesso
    } else {
      console.error('Erro na resposta do Backend:', response); // Log de erro caso a resposta não seja 201
      // Lógica de erro adicional, se necessário
    }
    console.log('Publicação atualizada:', response.data);
    
  } catch (error) {
    console.error('Erro ao atualizar publicação:', error);
  }
};

const marcarComentarioParaRemover = (comentarioId) => {
  setComentariosParaRemover([...comentariosParaRemover, comentarioId]);
  setComentarios(comentarios.filter(comentario => comentario.id !== comentarioId));
};

const [estado, setEstado] = useState('');

const approveLocal = async (publicationId) => {
  try {
    const response = await axios.put(`http://localhost:3000/publicacoes/update/${publicationId}`, {
      estado: 'Ativa',
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      console.log('Publicação aprovada com sucesso');
      // Atualize o estado local se necessário, por exemplo:
      setSelectedPublication((prev) => ({ ...prev, estado: 'Ativo' }));
    } else {
      console.error('Erro ao aprovar publicação:', response);
    }
  } catch (error) {
    console.error('Erro ao aprovar publicação:', error);
  }
};

useEffect(() => {
  
  const fetchDenuncias = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/denuncias/listarDenunciasPorPublicacao/${publicationDetailDenunciada?.id}`);
      console.log("Fetched denuncias response:", response.data);
      setDenuncias(response.data);
    } catch (error) {
      console.error('Erro ao buscar denúncias:', error);
    }
  };

  if (publicationDetailDenunciada) {
    fetchDenuncias();
  }
}, [publicationDetailDenunciada?.id]);

const toggleOptions = (denunciaId) => {
  setOptionsOpen(prevId => (prevId === denunciaId ? null : denunciaId));
};

const marcarDenunciaComoResolvida = async (denunciaId) => {
  try {
    const response = await axios.put(`http://localhost:3000/denuncias/update/${denunciaId}`, { resolvida: true });
    if (response.status === 200) {
      setDenuncias(prevDenuncias => prevDenuncias.map(denuncia => 
        denuncia.id === denunciaId ? { ...denuncia, resolvida: true } : denuncia
      ));
      setOptionsOpen(null); // Fecha o menu de opções após marcar como resolvida
    }
  } catch (error) {
    console.error('Erro ao marcar denúncia como resolvida:', error);
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


const toggleOptionsPublicacao = (comentarioId) => {
  console.log('Toggle Options for:', comentarioId);
  setOptionsOpenExcluir(prevId => (prevId === comentarioId ? null : comentarioId));
};


useEffect(() => {
  const handleClickOutside = (event) => {
    if (!event.target.closest('.comentario-options-publicacao')) {
      setOptionsOpenExcluir(null);
    }
  };

  document.addEventListener('click', handleClickOutside);
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, []);

const [comentariosPublicacoes, setComentariosPublicacoes] = useState([]);

const handleDeleteComentarioPublicacao = async (comentarioId) => {
  try {
    const response = await axios.delete(`http://localhost:3000/comentarios/apagarpubcomentario/${comentarioId}`);
    if (response.status === 200) {
      alert('Comentário excluído com sucesso');
      setComentariosPublicacoes(comentariosPublicacoes.filter(comentario => comentario.id !== comentarioId)); // Atualize a lista de comentários
    } else {
      console.error('Erro ao excluir o comentário:', response);
      alert('Ocorreu um erro ao excluir o comentário');
    }
  } catch (error) {
    console.error('Erro ao excluir o comentário:', error);
    alert('Ocorreu um erro ao excluir o comentário');
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
        <div className="authorName"><span>Autor :</span></div>
        <img src={selectedPublication.autor.caminho_foto} alt={selectedPublication.autor.nome} className="author-icon" />
        <span>{selectedPublication.autor.nome} {selectedPublication.autor.sobrenome}</span>
    
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
    {/* <button
      className={`tab ${activeTab === 'comentarios' ? 'active' : ''}`}
      onClick={() => handleTabClick('comentarios')}
    >
      <i className="fas fa-comments tab-icon"></i> Comentários
    </button> */}
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
  <select value={area} onChange={(e) => setArea(e.target.value)}>
  <option value="">Selecionar área</option>
  {areas.map((areaOption) => (
    <option key={areaOption.id} value={areaOption.id}>
      {areaOption.nome}
    </option>
  ))}
</select>
</div>

            <div className="form-group">
            <label>Tópico do Local</label>
              <select value={topico} onChange={(e) => setTopico(e.target.value)}>
                <option value="">selecionar tópico</option>
                {topicos.map((topico) => (
                  <option key={topico.id} value={topico.id}>{topico.nome}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Nome do local</label>
              <input type="text" placeholder="inserir nome do local" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </div>
            <div className="form-group">
  <label>Estado da Publicação</label>
  <select value={estado} onChange={(e) => setEstado(e.target.value)}>
    <option value="">Selecionar estado</option>
    <option value="Ativa">Ativa</option>
    <option value="Denunciada">Denunciada</option>
    <option value="Por validar">Por validar</option>
    <option value="Finalizada">Finalizada</option>
  </select>
</div>
            <div className="form-group">
              <label>Descrição do local</label>
              <input type="text" placeholder="inserir uma breve descrição do local" value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
            </div>
            <div className="form-buttons">
              <button type="button" className="cancel-button"onClick={handleCancel}>Cancelar</button>
              <button type="button" className="save-button" onClick={handleSubmitEdit}><i className="fas fa-save"></i>Alterações</button>
            </div>
          </form>
        )}

{activeTab === 'galeria' && (
  <div className="tab-content_galeria">
    <h2>Galeria do local</h2>
    <div {...getRootProps({ className: 'dropzone' })} className="gallery-upload">
      <input {...getInputProps()} />
      <div className="upload-box">
        <span className="upload-icon">+</span>
        <span className="upload-text">Upload</span>
      </div>
      <p className="gallery-info">
        <i className="fas fa-info-circle"></i> A primeira foto será a foto de capa do local
      </p>
    </div>
    <div className="uploaded-images">
      {galeria.map((file, index) => (
        <div key={index} className="image-preview">
          <img src={file.preview} alt={`preview ${index}`} />
          <button className="remove-image" onClick={() => handleRemoveImage(index)}>x</button>
        </div>
      ))}
    </div>
    <div className="form-buttons">
      <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
      <button type="button" className="save-button" onClick={handleSubmitEdit}><i className="fas fa-save"></i>Alterações</button>
    </div>
  </div>
)}




{activeTab === 'horario' && (
  <div>
    <h2>Horário do local</h2>
    {Object.keys(horario).map((dia) => (
      <div key={dia} className="form-group_horario">
        <label>{dia}</label>
        <div className="horario-inputs">
          <input
            type="text"
            placeholder="Início HH:mm"
            value={horario[dia].inicio}
            disabled={horario[dia].fechado}
            onChange={(e) => setHorario({ ...horario, [dia]: { ...horario[dia], inicio: e.target.value } })}
          />
          <input
            type="text"
            placeholder="Fim HH:mm"
            value={horario[dia].fim}
            disabled={horario[dia].fechado}
            onChange={(e) => setHorario({ ...horario, [dia]: { ...horario[dia], fim: e.target.value } })}
          />
          <label>
            <input
              type="checkbox"
              checked={horario[dia].fechado}
              onChange={(e) => setHorario({ ...horario, [dia]: { ...horario[dia], fechado: e.target.checked, inicio: '', fim: '' } })}
            />
          </label>
        </div>
      </div>
    ))}
    <div className="form-buttons">
      <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
      <button type="button" className="save-button" onClick={handleSubmitEdit}><i className="fas fa-save"></i>Alterações</button>
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
                  value={localizacao}
                  onChange={(e) => setLocalizacao(e.target.value)}
                />
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
              <button type="button" className="cancel-button"onClick={handleCancel}>Cancelar</button>
              <button type="button" className="save-button" onClick={handleSubmitEdit}><i className="fas fa-save"></i>Alterações</button>
            </div>
          </div>
        )}

{/* {activeTab === 'comentarios' && (
  <div className="tab-content_comentarios">
    {comentarios.length === 0 ? (
      <div className="no-comments">
        <i className="fas fa-comment-slash no-comments-icon"></i>
        <p>Ainda sem comentários</p>
      </div>
    ) : (
      <div className="comentarios-list">
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="comentario">
            <div className="comentario-header">
              {comentario.autor && comentario.autor.caminho_foto && (
                <img src={comentario.autor.caminho_foto} alt={`${comentario.autor.nome} ${comentario.autor.sobrenome}`} className="comentario-avatar" />
              )}
              <div className="comentario-info">
                {comentario.autor && (
                  <>
                    <span className="comentario-autor">{comentario.autor.nome} {comentario.autor.sobrenome}</span>
                    <span className="comentario-data">{new Date(comentario.createdat).toLocaleDateString()}</span>
                    </>
                    )}
                  </div>
                  <button className="remove-comentario" onClick={() => marcarComentarioParaRemover(comentario.id)}>x</button>
                </div>
            <div className="comentario-conteudo">
              <p>{comentario.conteudo}</p>
            </div>
          </div>
        ))}
      </div>
    )}
    <div className="form-buttons">
      <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
      <button type="button" className="save-button" onClick={handleSubmitEdit}><i className="fas fa-save"></i>Alterações</button>
    </div>
  </div>
)} */}



        {activeTab === 'mais_informacoes' && (
          <div className="tab-content_mais_informacoes">
            <form>
              <div className="form-group">
                <label>Pagina Web</label>
                <input
                  type="text"
                  placeholder="inserir site"
                  value={paginaweb}
                  onChange={(e) => setPaginaweb(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Contacto</label>
                <input
                  type="text"
                  placeholder="inserir contacto telefónico"
                  value={telemovel}
                  onChange={(e) => setTelemovel(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email oficial</label>
                <input
                  type="text"
                  placeholder="...inserir email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-buttons">
                <button type="button" className="cancel-button"onClick={handleCancel}>Cancelar</button>
                <button type="button" className="save-button" onClick={handleSubmitEdit}><i className="fas fa-save"></i>Alterações</button>
              </div>
            </form>
          </div>
        )}

{showSuccessMessage && <div className="modal-backdrop"></div>}
          {showSuccessMessage && (
            <div className="success-message_delete">
              <div className="success-message-icon"></div>
              <h1>Publicação editada com sucesso!</h1>
              <button onClick={() => setShowSuccessMessage(false)}>Continuar</button>
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
        <img src={selectedPublication.autor.caminho_foto} alt={selectedPublication.autor.nome} className="author-icon" />
        <span>{selectedPublication.autor.nome} {selectedPublication.autor.sobrenome}</span>
    
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

{/* {selectedPublication && selectedPublication.estado === 'Ativa' && (
  <div>
<button className="tab active">
  <i className="fas fa-star tab-icon"></i> Avaliação do Local
</button>
<div className="description">
  {mediaAvaliacoes ? (
    <div className="rating-container">
      <span className="rating-value">
        {mediaAvaliacoes.total > 0 ? mediaAvaliacoes.media : "Sê o primeiro a avaliar este Local!"}
      </span>
      {mediaAvaliacoes.total > 0 && (
        <>
          <div className="stars">
            {Array.from({ length: 5 }, (_, index) => (
              <i
                key={index}
                className={`fas fa-star${index < Math.round(mediaAvaliacoes.media) ? '' : '-o'}`}
              />
            ))}
          </div>
          <span className="rating-count">
              com base em {mediaAvaliacoes.total} {mediaAvaliacoes.total === 1 ? 'avaliação' : 'avaliações'}
            </span>

        </>
      )}
    </div>
  ) : (
    <span className="rating-value">Sê o primeiro a avaliar este Local!</span>
  )}

  <form onSubmit={handleAvaliacaoSubmit} className="avaliacao-form">
    <label>
      <select value={estrelas} onChange={handleAvaliacaoChange}>
        <option value="1">★ </option>
        <option value="2">★★ </option>
        <option value="3">★★★ </option>
        <option value="4">★★★★ </option>
        <option value="5">★★★★★ </option>
      </select>
    </label>
    <button type="submit" className="estrelasubmit-button">Enviar Avaliação</button>
  </form>
</div>
</div>
)} */}

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
      
      
    {selectedPublication.latitude && (
  <>
    <button className="tab active">
      <i className="fas fa-map-marker-alt tab-icon"></i> Localização
    </button>
    <div className="location">
      <p><strong>Localização:</strong> {selectedPublication.latitude}, {selectedPublication.longitude}</p>
      <a 
        href={`https://www.google.com/maps?q=${selectedPublication.latitude},${selectedPublication.longitude}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="map-button"
      >
        Ver no Google Maps
      </a>
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
      {/* {selectedPublication && selectedPublication.estado === 'Ativa' && (
  <div> 
<button className="tab active"><i className="fas fa-comments tab-icon"></i> Comentários</button>
<div className="comentarios-section">
<div className="comentarios-list">
  {comentariosExibidos.map((comentario) => (
    <div key={comentario.id} className="comentario">
      <div className="comentario-header">
      {comentario.autor && comentario.autor.caminho_foto && (
          <img src={comentario.autor.caminho_foto} alt={`${comentario.autor.nome} ${comentario.autor.sobrenome}`} className="comentario-avatar" />
        )}
        <div className="comentario-info">
        {comentario.autor && (
            <>
              <span className="comentario-autor">{comentario.autor.nome} {comentario.autor.sobrenome}</span>
              <span className="comentario-data">{new Date(comentario.createdat).toLocaleDateString()}</span>
            </>
          )}
        </div>
      </div>
      <div className="comentario-conteudo">
        <p>{comentario.conteudo}</p>
      </div>
      </div>
    ))}
  </div>
  
  <button className="btn-comentarios margin-bottom" onClick={() => setShowAllComentarios(!showAllComentarios)}>
  {showAllComentarios ? 'Esconder Comentários' : 'Mostrar todos os Comentários'}
</button>


<div className="add-comentario">
  <textarea
    className="comment-textarea"
    placeholder="Adicionar um comentário..."
    value={novoComentario}
    onChange={(e) => setNovoComentario(e.target.value)}
  />
</div>
<div className="comment-button-container">
  <button className="btn-comentar" onClick={handleAddComentario}>Comentar</button>
</div>



</div>
</div>
)} */}

{selectedPublication && (selectedPublication.estado === 'Ativa' || selectedPublication.estado === 'Denunciada') && (
<div> 
  <button className="tab active"><i className="fas fa-comments tab-icon"></i> Comentários e Avaliações</button>
  <div className="comentarios-section">
    <div className="avaliacoes-resumo">
      
      <div className="avaliacoes-info">
        {mediaAvaliacoes && mediaAvaliacoes.total > 0 ? (
          <>
            <span className="avaliacoes-media">
              {mediaAvaliacoes.media.toFixed(1)}
            </span>
            <div className="stars">
              {Array.from({ length: 5 }, (_, index) => (
                <i
                  key={index}
                  className={`fas fa-star${index < Math.round(mediaAvaliacoes.media) ? '' : '-o'}`}
                />
              ))}
            </div>
            <span className="avaliacoes-total">
              com base em {mediaAvaliacoes.total} {mediaAvaliacoes.total === 1 ? 'avaliação' : 'avaliações'}
            </span>
          </>
        ) : (
          <span className="avaliacoes-media">Sê o primeiro a avaliar esta Publicação!</span>
        )}
      </div>
    </div>

    
          <div className="comentarios-list">
  {comentariosExibidos.map((comentario) => (
    <div key={comentario.id} className="comentario">
      <div className="comentario-header">
        {comentario.usuario && comentario.usuario.caminho_foto && (
          <img src={comentario.usuario.caminho_foto} alt={`${comentario.usuario.nome} ${comentario.usuario.sobrenome}`} className="comentario-avatar" />
        )}
        <div className="comentario-info">
          {comentario.usuario && (
            <>
              <span className="comentario-autor">{comentario.usuario.nome} {comentario.usuario.sobrenome}</span>
              <span className="comentario-data">{new Date(comentario.createdat).toLocaleDateString()}</span>
            </>
          )}
        </div>
      </div>

      {/* Classificação do comentário */}
      <div className="comentario-rating">
        {comentario.classificacao > 0 && (
          <>
            <div className="stars">
              {Array.from({ length: 5 }, (_, index) => (
                <i
                  key={index}
                  className={`fas fa-star${index < comentario.classificacao ? '' : '-o'}`}
                />
              ))}
            </div>
            <span className="rating-text">
              {comentario.classificacao === 5 && 'Excelente'}
              {comentario.classificacao === 4 && 'Bom'}
              {comentario.classificacao === 3 && 'Médio'}
              {comentario.classificacao === 2 && 'Fraco'}
              {comentario.classificacao === 1 && 'Péssimo'}
            </span>
          </>
        )}
      </div>
      <div className="comentario-options-publicacao">
  <div className="options-button" onClick={() => toggleOptionsPublicacao(comentario.id)}>
    <i className="fas fa-ellipsis-v"></i>
  </div>
  {optionsOpenExcluir === comentario.id && (
    <div className="options-menu">
      <button onClick={() => handleDeleteComentarioPublicacao(comentario.id)}>
        <i className="fas fa-trash-alt custom-delete-icon"></i> Excluir Comentário
      </button>
    </div>
  )}
</div>

      {/* Conteúdo do comentário */}
      <div className="comentario-conteudo">
        <p>{comentario.conteudo}</p>
      </div>

      {/* Botão de Like */}
      <div className="comentario-like">
  <button className="comentario-like-button" onClick={() => handleLike(comentario.id)}>
    {comentario.likes} <i className="fas fa-thumbs-up" style={{color: '#1877F2'}}></i>
  </button>
</div>

    </div>
  ))}
</div>


    <button className="btn-comentarios margin-bottom" onClick={() => setShowAllComentarios(!showAllComentarios)}>
      {showAllComentarios ? 'Esconder Comentários' : 'Mostrar todos os Comentários'}
    </button>

    <div className="comment-button-container">
      <button className="btn-comentar" onClick={() => setShowComentarioModal(true)}>Comentar</button>
    </div>

</div>
{showComentarioModal && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={() => setShowComentarioModal(false)}>&times;</span>
      <div className="modal-header">
        <h2>Classifique a Publicação</h2>
      </div>
      <div className="modal-body">
        <div className="rating">
          <select 
            value={novaClassificacao} 
            onChange={(e) => setNovaClassificacao(parseInt(e.target.value))}
            style={{ fontSize: '2rem' }}
          >
            <option value="0">Sem Classificação</option>
            <option value="1">★☆☆☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="3">★★★☆☆</option>
            <option value="4">★★★★☆</option>
            <option value="5">★★★★★</option>
          </select>
        </div>

        <textarea
          className="comment-textarea"
          placeholder="Escreva o Comentário"
          value={novoComentario}
          onChange={(e) => setNovoComentario(e.target.value)}
        />
      </div>

      <div className="modal-footer">
        <button onClick={handleAddComentario} className="btn-comentar">Publicar</button>
      </div>
    </div>
  </div>
)}




</div>
)}

    </div>
  </div>
)}






{showApprovalView && publicationDetail && (
  <div className="publicacoes_div_princ">
  <h1 className="publicacoes-title2">Informações do Local</h1>
  <div className="header">
    <h1 className="header-title">{publicationDetail.titulo}</h1>
    <div className="author">
      <div className="authorName"><span>Autor :</span></div>
      <img src={publicationDetail.autor.caminho_foto} alt={publicationDetail.autor.nome} className="author-icon" />
      <span>{publicationDetail.autor.nome} {publicationDetail.autor.sobrenome}</span>
  
    </div>

  </div>
  <div className="tab-content2">
    {publicationDetail.galeria && publicationDetail.galeria.length > 0 && (
      <>
        <button className="tab active"><i className="fas fa-images tab-icon"></i> Galeria do Local</button>
        <div className="gallery">
          {publicationDetail.galeria.map((image, index) => (
            <img key={index} src={image} alt={`Galeria ${index}`} className="gallery-image" />
          ))}
        </div>
      </>
    )}



    {publicationDetail.descricao && (
      <>
        <button className="tab active"><i className="fas fa-info-circle tab-icon"></i> Descrição do Local</button>
        <div className="description">
          <p>{publicationDetail.descricao}</p>
        </div>
      </>
    )}
    

    {publicationDetail.horario && (
      <>
        <button className="tab active"><i className="fas fa-clock tab-icon"></i> Horário do Local</button>
        <div className="additional-info">
          <div className="status">
            <i className="fas fa-check-circle"></i> {isOpen ? 'Aberto Agora' : 'Fechado Agora'}
          </div>
          <div className="schedule">
            {weekDays.map((dia) => (
              <p key={dia}><strong>{dia}:</strong> {publicationDetail.horario[dia] || 'Fechado'}</p>
            ))}
          </div>
        </div>
      </>
    )}
    {publicationDetail.estado && (
      <>
        <button className="tab active"><i className="fas fa-tasks tab-icon"></i> Estado da Publicação</button>
        <div className="estado">
          <p><strong>Estado:</strong> {publicationDetail.estado}</p>
        </div>
      </>
    )}
    {publicationDetail.localizacao && (
      <>
        <button className="tab active"><i className="fas fa-map-marker-alt tab-icon"></i> Localização</button>
        <div className="location">
          <p><strong>Localização:</strong> {publicationDetail.localizacao}</p>
        </div>
      </>
    )}
    {publicationDetail.paginaweb && (
      <>
        <button className="tab active"><i className="fas fa-globe tab-icon"></i> Página Web</button>
        <div className="website">
          <p><strong>Página web:</strong> {publicationDetail.paginaweb}</p>
        </div>
      </>
    )}
    {publicationDetail.telemovel && (
      <>
        <button className="tab active"><i className="fas fa-phone tab-icon"></i> Telefone</button>
        <div className="phone">
          <p><strong>Telemóvel/Telefone: </strong>{publicationDetail.telemovel}</p>
        </div>
      </>
    )}
    {publicationDetail.email && (
      <>
        <button className="tab active"><i className="fas fa-envelope tab-icon"></i> Email</button>
        <div className="email">
          <p><strong>Email:</strong> {publicationDetail.email}</p>
        </div>
      </>
    )}
    

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




{showDetailViewDenunciada && publicationDetailDenunciada && (
  <div className="publicacoes_div_princ">
    <h1 className="publicacoes-title2">Denúncias do Local</h1>
    <div className="header">
      <h1 className="header-title">{publicationDetailDenunciada.titulo}</h1>
      <div className="author">
        <div className="authorName"><span>Autor :</span></div>
        {publicationDetailDenunciada.autor?.caminho_foto && (
          <img src={publicationDetailDenunciada.autor.caminho_foto} alt={publicationDetailDenunciada.autor.nome} className="author-icon" />
        )}
        {publicationDetailDenunciada.autor && (
          <span>{publicationDetailDenunciada.autor.nome} {publicationDetailDenunciada.autor.sobrenome}</span>
        )}
      </div>
    </div>
    <div className="tab-content2">
      <div className="denuncia-header2">
        <h2>Lista de Denúncias</h2>
        <span className="total-denuncias">Total: {denuncias.length} {denuncias.length === 1 ? 'Denúncia' : 'Denúncias'}</span>
      </div>
      <div className="denuncias-list">
      

        {denuncias.map((denuncia) => (
          
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
              <span className="denuncia-data">{new Date(denuncia.createdat).toLocaleDateString()}</span>
            </>
          )}
        </div> </div>
        <div className="denuncia-actions">
                {!denuncia.resolvida && (
                  <div className="options-button" onClick={() => toggleOptions(denuncia.id)}>
                    <i className="fas fa-ellipsis-v"></i>
                  </div>
                )}
                {optionsOpen === denuncia.id && (
                  <div className="options-menu">
                    <button onClick={() => marcarDenunciaComoResolvida(denuncia.id)}>
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
        <button type="button" className="cancel-button" onClick={() => setShowDetailViewDenunciada(false)}>Cancelar</button>
        <button type="button" className="save-button" onClick={handleMedidasClick}>Tomar Medidas</button>
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
        <div className="option" onClick={() => handleEditClick(publicationDetailDenunciada)}>
        <img src="https://i.ibb.co/4tGGzmt/Captura-de-ecr-2024-06-26-171921.png" alt="Captura-de-ecr-2024-06-26-171921"/>
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
            <div className="authorName"><span>Autor :</span></div>
            <img src={user.caminho_foto} alt="Eu" className="author-icon" />
    <span>{user.nome} {user.sobrenome}</span> 
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
  <select value={area} onChange={(e) => setArea(e.target.value)}>
  <option value="">Selecionar área</option>
  {areas.map((areaOption) => (
    <option key={areaOption.id} value={areaOption.id}>
      {areaOption.nome}
    </option>
  ))}
</select>
</div>
              <div className="form-group">
            <label>Tópico do Local</label>
              <select value={topico} onChange={(e) => setTopico(e.target.value)}>
                <option value="">selecionar tópico</option>
                {topicos.map((topico) => (
                  <option key={topico.id} value={topico.id}>{topico.nome}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Nome do local</label>
              <input type="text" placeholder="inserir nome do local" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Descrição do local</label>
              <input type="text" placeholder="inserir uma breve descrição do local" value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
            </div>
            <div className="form-buttons">
              <button type="button" className="cancel-button"onClick={handleCancel}>Cancelar</button>
              <button type="submit" className="submit-button" onClick={handleContinue} >Continuar</button>
            </div>
          </form>
        )}

{activeTab === 'galeria' && (
  <div className="tab-content_galeria">
    <h2>Galeria do local</h2>
    <div {...getRootProps({ className: 'dropzone' })} className="gallery-upload">
      <input {...getInputProps()} />
      <div className="upload-box">
        <span className="upload-icon">+</span>
        <span className="upload-text">Upload</span>
      </div>
      <p className="gallery-info">
        <i className="fas fa-info-circle"></i> A primeira foto será a foto de capa do local
      </p>
    </div>
    <div className="uploaded-images">
      {galeria.map((file, index) => (
        <div key={index} className="image-preview">
          <img src={file.preview} alt={`preview ${index}`} />
          <button className="remove-image" onClick={() => handleRemoveImage(index)}>x</button>
        </div>
      ))}
    </div>
    <div className="form-buttons">
      <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
      <button type="button" className="submit-button" onClick={handleContinue}>Continuar</button>
    </div>
  </div>
)}



{activeTab === 'horario' && (
  <div>
    <h2>Horário do local</h2>
    {Object.keys(horario).map((dia) => (
      <div key={dia} className="form-group_horario">
        <label>{dia}</label>
        <div className="horario-inputs">
          <input
            type="text"
            placeholder="Início HH:mm"
            value={horario[dia].inicio}
            disabled={horario[dia].fechado}
            onChange={(e) => setHorario({ ...horario, [dia]: { ...horario[dia], inicio: e.target.value } })}
          />
          <input
            type="text"
            placeholder="Fim HH:mm"
            value={horario[dia].fim}
            disabled={horario[dia].fechado}
            onChange={(e) => setHorario({ ...horario, [dia]: { ...horario[dia], fim: e.target.value } })}
          />
          <label>
            <input
              type="checkbox"
              checked={horario[dia].fechado}
              onChange={(e) => setHorario({ ...horario, [dia]: { ...horario[dia], fechado: e.target.checked, inicio: '', fim: '' } })}
            />
          </label>
        </div>
      </div>
    ))}
    <div className="form-buttons">
      <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
      <button type="submit" className="submit-button" onClick={handleContinue}>Continuar</button>
    </div>
  </div>
)}

        {activeTab === 'localizacao' && (
          <div className="tab-content_localizacao">
            <h2>Localização do local</h2>
            <div className="localizacao-content">
              <div className="form-group">
  <label>Latitude</label>
  <input type="text" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
</div>
<div className="form-group">
  <label>Longitude</label>
  <input type="text" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
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
              <button type="button" className="cancel-button"onClick={handleCancel}>Cancelar</button>
              <button type="submit" className="submit-button" onClick={handleContinue} >Continuar</button>
            </div>
          </div>
        )}


        {activeTab === 'mais_informacoes' && (
          <div className="tab-content_mais_informacoes">
            <form>
              <div className="form-group">
                <label>Pagina Web</label>
                <input
                  type="text"
                  placeholder="inserir site"
                  value={paginaweb}
                  onChange={(e) => setPaginaweb(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Contacto</label>
                <input
                  type="text"
                  placeholder="inserir contacto telefónico"
                  value={telemovel}
                  onChange={(e) => setTelemovel(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email oficial</label>
                <input
                  type="text"
                  placeholder="...inserir email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-buttons">
                <button type="button" className="cancel-button"onClick={handleCancel}>Cancelar</button>
                <button type="button" className="submit-button_maisinfos" onClick={handleSubmit}>Publicar</button>
              </div>
            </form>
          </div>
        )}

        {showSuccessMessage && <div className="modal-backdrop"></div>}
          {showSuccessMessage && (
            <div className="success-message_delete">
              <div className="success-message-icon"></div>
              <h1>Publicação criada com sucesso!</h1>
              <p>Como é o administrador do seu centro, não será necessário passar pelo processo de validação.</p>
              <button onClick={() => setShowSuccessMessage(false)}>Continuar</button>
            </div>
          )}

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

