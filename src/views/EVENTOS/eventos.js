import React, { useState, useEffect } from 'react';
import '../PUBLICACOES/PublicacoesView.css';
import axios from 'axios';
import handleSubmit from './criar_evento';
import TopicSelector from './topicSelector'; // Import TopicSelector component
import { useNavigate } from 'react-router-dom';
import CreateEventoButton from '../../componentes/botao_view_eventos/criar_evento';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useDropzone } from 'react-dropzone';
import moment from 'moment';
import 'moment/locale/pt'; // Importar o locale português
import Modal from 'react-modal';
import '@fortawesome/fontawesome-free/css/all.min.css';


moment.locale('pt'); // Definir o locale para português

const EventosView = () => {
    const [eventos, setEventos] = useState([]);
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEventosList, setShowEventosList] = useState(true);
    const [selectedButton, setSelectedButton] = useState('list'); // Default to "list" button
    const [centroId, setCentroId] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [eventoToDelete, setEventoToDelete] = useState(null);
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
    const [showMedidasModal, setShowMedidasModal] = useState(false);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showSuccessMessageAlert, setShowSuccessMessageAlert] = useState(false);
    const [selectedEvento, setSelectedEvento] = useState(null);
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
    const [paginaweb, setPaginaweb] = useState('');
    const [telemovel, setTelemovel] = useState('');
    const [selectedField, setSelectedField] = useState('');
    const [formFields, setFormFields] = useState([{ name: '' }]);
    const [showFormModal, setShowFormModal] = useState(false);
    const [email, setEmail] = useState('');
    const [horario, setHorario] = useState({
    "Inicio": { inicioData: '', InicioHora: '' },
    "Fim": { fimData: '', FimHora: ''}

});

const [novaClassificacao, setNovaClassificacao] = useState(0);

const [imagensGaleria, setImagensGaleria] = useState([]);

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

const [loading, setLoading] = useState(false);

const [isOpen, setIsOpen] = useState(false); 
// Form states
const [nome, setNome] = useState('');
const [autor,setAutor] = useState({ nome: '', sobrenome: '', caminho_foto: ''});
const [topico, setTopico] = useState('');
const autor_id = sessionStorage.getItem('user_id');

const [userId, setUserId] = useState(null);
const [user, setUser] = useState({ nome: '', sobrenome: '', caminho_foto: ''  });

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
  if (modalIsOpen) {
    console.log("Modal está aberto agora!");
    // Aqui você poderia, por exemplo, carregar dados adicionais necessários para o modal.
  }
}, [modalIsOpen]); // A dependência modalIsOpen faz com que o efeito seja executado sempre que modalIsOpen muda.


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
  const buscarEventos = async () => {
    if (!centroId) {
      console.log('centroId não definido');
      return;
    }
    console.log(`Buscando publicações para centroId: ${centroId}`);
    try {
      const response = await axios.get(`http://localhost:3000/eventos/listarEventos/${centroId}`);
      if (response.data && Array.isArray(response.data)) {
        console.log(response.data);
        setEventos(response.data);
      } else {
        console.error('Resposta da API vazia ou formato de dados incorreto');
      }
    } catch (error) {
      console.error('Erro ao buscar publicações:', error);
      setError(error.message);
    }
  };

  buscarEventos();
}, [centroId]);


const handleViewDetailsClick = (evento) => {
  setSelectedEvento(evento);
  setShowDetailView(true);
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

const handleEditClick = (evento) => {
  setEventoToEdit(evento);
  setSelectedEvento(evento );
  setShowEditForm(true);
  setShowEventosList(false);
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
  setEventoToDelete(evento);
  setShowDeleteModal(true);
};

const handleDeleteConfirm = () => {
  setShowDeleteModal(false);
  // Aqui você deve realizar a lógica para realmente deletar a publicação
  setShowSuccessMessage(true); // Exibir a mensagem de sucesso após a exclusão
};


const closeDeleteModal = () => {
  setShowDeleteModal(false);
  setEventoToDelete(null);
};
const handleCancelDelete = () => {
  setShowDeleteModal(false);
  setEventoToDelete(null);
};
const handleConfirmDelete = async () => {
  try {
    await axios.delete(`https://backend-teste-q43r.onrender.com/eventos/delete/${eventoToDelete.id}`);
    setEventos(eventos.filter(p => p.id !== eventoToDelete.id));
    setShowSuccessMessageDelete(true); // Exibir a mensagem de sucesso após a exclusão
  } catch (error) {
    if (error.response) {
      // O servidor respondeu com um status fora do intervalo 2xx
      console.error('Erro na resposta da API:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // A requisição foi feita, mas nenhuma resposta foi recebida
      console.error('Erro na requisição:', error.request);
    } else {
      // Algo aconteceu ao configurar a requisição
      console.error('Erro ao configurar a requisição:', error.message);
    }
    console.error('Erro ao deletar evento:', error.config);
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

const handleCreateEventoClick = () => {
  setShowCreateForm(true);
  setShowEventosList(false);
  setSelectedButton('create'); // Set the selected button
};


const handleCreateForm = () => {

  //setShowCreateForm(true);
  setShowSuccessMessage(true);
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

  const eventoData = {
      topico_id: topico,
      nome,
      descricao,
      horario: formattedHorario,
      localizacao,
      paginaweb,
      telemovel,
      email,
      galeria: galeria.map((img) => img.url), // Envia apenas as URLs das imagens
      centro_id: centroId,
      autor_id: sessionStorage.getItem('user_id') 
  };
  
  console.log('Dados da Publicação:', eventoData); // Log dos dados que serão enviados

  try {
      const response = await axios.post('https://backend-teste-q43r.onrender.com/eventos/create', eventoData, {
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
      console.error('Erro ao criar evento:', error); // Log do erro
  }
};


const handleShowEventoListClick = () => {
  setShowCreateForm(false);
  setShowEventosList(true);
  setSelectedButton('list'); // Set the selected button
};

const handleCreateEventoSubmit = ({ nome, topico }) => {
  // Adiciona a nova publicação aos dados estáticos
  const novoEvento = {
    id: eventos.length + 1,
    nome,
    topico,
    createdAt: new Date().toISOString(),
    estado: "Active"
  };
  setEventos([...eventos, novoEvento]);
  setShowCreateForm(false);
  setShowEventosList(true);
};

const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
};


const handleDelete = (evento) => {
  // Aqui você deve adicionar a lógica para deletar a publicação
  // Após deletar, você pode atualizar o estado `publicacoes` para remover a publicação
  setEventos(eventos.filter(p => p.id !== evento.id));
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
  setShowEventosList(true);
  setShowCreateForm(false);
  setShowEditForm(false);
  setSelectedButton(filter);
};


// Primeiro, filtre os eventos pelo tópico
let filteredEventos;
if (topico !== 'all') {
  filteredEventos = eventos.filter(evento => evento.topico_id === parseInt(topico));
} else {
  filteredEventos = [...eventos]; // Faça uma cópia de todos os eventos
}

// Agora aplique os filtros por título e estado
  filteredEventos = filteredEventos.filter(evento => {
  if (!evento.nome || !evento.estado) return false;

  // Filtro por título
  const matchesTitle = evento.nome.toLowerCase().includes(searchTerm.toLowerCase());

  // Filtro por estado
  let matchesState = true; // Assume que é verdadeiro para 'all' ou nenhum filtro de estado selecionado
  switch (filter) {
    case 'por validar':
      matchesState = evento.estado === 'Por validar';
      break;
    case 'ativa':
      matchesState = evento.estado === 'Ativa';
      break;
    case 'denunciada':
      matchesState = evento.estado === 'Denunciada';
      break;
    case 'finalizada':
      matchesState = evento.estado === 'Finalizada';
      break;
    default:
      matchesState = true;
  }

  console.log('Filtro atual:', filter);
  console.log('Estado do evento:', evento.estado);

  // Combina ambos os filtros: título e estado
  return matchesTitle && matchesState;
});

const countEventosPorValidar = eventos.filter(p => p.estado && p.estado.toLowerCase() === 'por validar').length;
const countEventosAtivas = eventos.filter(p => p.estado && p.estado.toLowerCase() === 'ativa').length;
const countEventosDenunciadas = eventos.filter(p => p.estado && p.estado.toLowerCase() === 'denunciada').length;
const countEventosFinalizados = eventos.filter(p => p.estado && p.estado.toLowerCase() === 'Finalizada').length;

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

const handleInfoClick = (evento) => {
setEventoDetail(evento);
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
handleRejectAndDelete();
};

const handleRejectAndDelete = async () => {
try {
  const response = await axios.delete(`https://backend-teste-q43r.onrender.com/eventos/delete/${eventoDetail.id}`);
  if (response.status === 200) {
    console.log('evento eliminada com sucesso:', response.data);
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
if (selectedEvento && selectedEvento.horario) {
  setIsOpen(isOpenNow(selectedEvento.horario));
}
}, [selectedEvento]);


const handlePendingClick = (evento) => {
// Lógica para tratar clique no botão de "Por validar"
// Exemplo: Abrir uma modal para validação
setSelectedEvento(evento);
setShowPendingModal(true);
};

const handleReportedClick = (evento) => {
// Lógica para tratar clique no botão de "Denunciada"
// Exemplo: Abrir uma modal para revisão de denúncia
setSelectedEvento(evento);
setShowReportedModal(true);
};

useEffect(() => {
const Comentarios = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/comentarios_eventos/todoscomentarios/${selectedEvento.id}`);
    console.log(response.data);
    setComentarios(response.data);
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
  }
};

if (selectedEvento) {
  Comentarios();
}
}, [selectedEvento]);

const handleAddComentario = async () => {
const user_id = sessionStorage.getItem('user_id'); // Obtendo o user_id do sessionStorage
  const comentarioData = {
    evento_id: selectedEvento.id,
    texto_comentario: novoComentario,
    user_id,
    classificacao: novaClassificacao
  };

  try {
    const response = await axios.post('http://localhost:3000/comentarios_eventos/criarcomentario', comentarioData, {
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
  await axios.put(`https://backend-teste-q43r.onrender.com/eventos/updateVisibility/${evento.id}`, { visivel: updatedVisivel });
  setEventos(eventos.map(p => p.id === evento.id ? { ...p, visivel: updatedVisivel } : p));
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
console.log('Índice atual:', currentIndex);   
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

const uploadImage = async (file) => {
const formData = new FormData();
formData.append('key', '4d755673a2dc94483064445f4d5c54e9'); // substitua pela sua chave da API imgbb
formData.append('image', file);

const response = await axios.post('https://api.imgbb.com/1/upload', formData);
return response.data.data.url; // Certifique-se de que está retornando a URL correta
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
const eventoId = selectedEvento.id;

try {
  const response = await axios.post('http://localhost:3000/avaliacao_eventos/criar', {
    evento_id: eventoId,
    autor_id: userId,
    estrelas: estrelas
  });
  console.log('Avaliação criada:', response.data);
  // Atualizar a UI ou fazer outras ações necessárias após criar a avaliação
} catch (error) {
  console.error('Erro ao criar avaliação:', error);
}
};

const MediaAvaliacoes2 = async () => {
try {
  const response = await axios.get(`http://localhost:3000/avaliacao_eventos/media/${selectedEvento.id}`);
  setMediaAvaliacoes(response.data);
} catch (error) {
  console.error('Erro ao buscar média de avaliações:', error);
}
};

// useEffect(() => {
// if (selectedEvento) {
//   MediaAvaliacoes();
// }
// }, [selectedEvento]);

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
  await axios.delete(`http://localhost:3000/comentarios_eventos/delete/${comentarioId}`);
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

const eventoData = {
  topico_id: topico,
  nome,
  descricao,
  horario: formattedHorario,
  localizacao,
  paginaweb,
  telemovel,
  email,
  galeria: galeria.map((img) => img.url), // Envia apenas as URLs das imagens
  centro_id: centroId,
  // autor_id: sessionStorage.getItem('user_id')
  autor_id: eventoToEdit.autor_id || sessionStorage.getItem('user_id') // Mantém o autor original se já definido
};

try {
  const response = await axios.put(`https://backend-teste-q43r.onrender.com/eventos/update/${eventoToEdit.id}`, eventoData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Remover os comentários marcados
  for (const comentarioId of comentariosParaRemover) {
    await axios.delete(`http://localhost:3000/comentarios_eventos/delete/${comentarioId}`);
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


const approveLocal = async (eventoId) => {
try {
  const response = await axios.put(`https://backend-teste-q43r.onrender.com/eventos/update/${eventoId}`, {
    estado: 'Ativa',
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) {
    console.log('Publicação aprovada com sucesso');
    // Atualize o estado local se necessário, por exemplo:
    setSelectedEvento((prev) => ({ ...prev, estado: 'Ativo' }));
  } else {
    console.error('Erro ao aprovar publicação:', response);
  }
} catch (error) {
  console.error('Erro ao aprovar publicação:', error);
}
};

useEffect(() => {
  const fetchParticipantes = async () => {
      setLoading(true);
      try {
          const response = await axios.get(`http://localhost:3000/listaparticipantes_evento/evento/${selectedEvento.id}`);
          setParticipantes(response.data);
          setLoading(false);
      } catch (err) {
          setError('Falha ao buscar participantes');
          setLoading(false);
      }
  };

  fetchParticipantes();
}, [selectedEvento]);




const adicionarParticipante = async (eventoId, usuarioId) => {
  try {
      const response = await axios.post('http://localhost:3000/listaparticipantes_evento/adicionar_participante/', {
          evento_id: eventoId,
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
  console.log('Selected Evento:', selectedEvento);
  console.log('Participantes:', participantes);
  console.log('UserId:', userId);
}, [selectedEvento, participantes, userId]); // Dependências para re-logar quando mudarem

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
//   if (selectedEvento.latitude && selectedEvento.longitude) {
//     getAddressFromCoordinates(selectedEvento.latitude, selectedEvento.longitude)
//       .then(address => setEndereco(address))
//       .catch(error => console.error('Erro ao obter endereço:', error));
//   }
// }, [selectedEvento.latitude, selectedEvento.longitude]);



useEffect(() => {
  if (selectedEvento && selectedEvento.id) {
    const fetchMediaAvaliacoes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comentarios_eventos/mediaavaliacoes/${selectedEvento.id}`);
        setMediaAvaliacoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar a média das avaliações:', error);
      }
    };

    fetchMediaAvaliacoes();
  }
}, [selectedEvento]);

useEffect(() => {
  const fetchImagensGaleria = async () => {
      try {
          const response = await axios.get(`http://localhost:3000/galeria_evento/listar_imagens_v2/${selectedEvento.id}`);
          setImagensGaleria(response.data);
      } catch (error) {
          console.error('Erro ao buscar imagens da galeria:', error);
      }
  };

  
      fetchImagensGaleria();
  
}, [selectedEvento]);




return (
  <div className="publicacoes-div_princ"> 
    {!showCreateForm && !showEditForm && !showDetailViewDenunciada && !showApprovalView && !showDetailView && <h1 className="publicacoes-title2">Lista de Eventos deste Centro</h1>}
    {!showCreateForm && !showEditForm && !showDetailViewDenunciada && !showApprovalView && !showDetailView &&(
      <div className="publicacoes-button-container">
        <div className="left-buttons">
        <div className='topicSelector'>
            <TopicSelector
              topics={topicos}
              selectedTopic={topico}
              onChange={(value) => setTopico(value)}
            />
            </div>
          <CreateEventoButton
            onClick={() => handleButtonClick('all')}
            iconSrc="https://i.ibb.co/P4nsk4w/Icon-criar.png"
            iconBgColor="#e0f7fa"
            title="Eventos Totais"
            subtitle={eventos.length.toString()}
            isSelected={selectedButton === 'all'}
          />
          <CreateEventoButton
            iconSrc="https://i.ibb.co/Y3jNfMt/pending-icon-512x504-9zrlrc78.png"
            iconBgColor="#FFEECC"
            title="Por validar"
            subtitle={countEventosPorValidar.toString()}
            isSelected={selectedButton === 'por validar'}
            onClick={() => handleButtonClick('por validar')}
          />
          <CreateEventoButton
            iconSrc="https://i.ibb.co/D8QwJ6M/active-removebg-preview.png"
            iconBgColor="#CCFFCC"
            title="Ativos"
            subtitle={countEventosAtivas.toString()}
            isSelected={selectedButton === 'ativa'}
            onClick={() => handleButtonClick('ativa')}
          />
          <CreateEventoButton
            iconSrc="https://i.ibb.co/D8QwJ6M/active-removebg-preview.png"
            iconBgColor="#CCFFCC"
            title="Finalizada"
            subtitle={countEventosFinalizados.toString()}
            isSelected={selectedButton === 'Finalizada'}
            onClick={() => handleButtonClick('Finalizada')}
            
          />
          <CreateEventoButton
            iconSrc="https://i.ibb.co/RPC7vW8/Icon-denuncia.png"
            iconBgColor="#FFE0EB"
            title="Denunciados"
            subtitle={countEventosDenunciadas.toString()}
            isSelected={selectedButton === 'denunciada'}
            onClick={() => handleButtonClick('denunciada')}
          />
        </div>
        <div className="right-button">
          <CreateEventoButton
            onClick={handleCreateEventoClick}
            iconSrc="https://i.ibb.co/P4nsk4w/Icon-criar.png"
            iconBgColor="#e0f7fa"
            title="Criar Evento"
            subtitle="Criar..."
            isSelected={selectedButton === 'create'}
          />
        </div>
      </div>
    )}
    {!showDetailViewDenunciada && !showApprovalView && !showDetailView && showEventosList && (
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
      <div className="publicacoes_div_princ"><h1 className="publicacoes-title2">Editar informações do Evento</h1>
      <div className="header">
      <h1 className="header-title">{selectedEvento.nome}</h1>
      <div className="author">
          <div className="authorName"><span>Autor :</span></div>
          <img src={selectedEvento.user.caminho_foto} alt={selectedEvento.user.nome} className="author-icon" />
          <span>{selectedEvento.user.nome} {selectedEvento.user.sobrenome}</span>
      
        </div>

        </div>
/______________________________________
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
        <i className="fas fa-info tab-icon"></i> Formulário de Inscrição
      </button>
    </div>
    <div className="tab-content">

    //---------------------------------------------------------------------------------
    {activeTab === 'descricao' && (
          <form onSubmit={handleSubmit}>
            
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
              <input type="text" placeholder="inserir nome do local" value={nome} onChange={(e) => setNome(e.target.value)} />
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

{activeTab === 'comentarios' && (
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

  {showDetailView && selectedEvento && (
    <div className="publicacoes_div_princ">
      <h1 className="publicacoes-title2">Informações do evento</h1>
      <div className="header">
        <h1 className="header-title">{selectedEvento.nome}</h1>
        <div className="author">
          <div className="authorName"><span>Autor :</span></div>
          <img src={selectedEvento.user.caminho_foto} alt={selectedEvento.user.nome} className="author-icon" />
          <span>{selectedEvento.user.nome} {selectedEvento.user.sobrenome}</span>
      
        </div>

      </div>
  <div className="tab-content2">
    {selectedEvento.galeria && selectedEvento.galeria.length > 0 && (
      <>
        <button className="tab active"><i className="fas fa-images tab-icon"></i> Galeria do evento</button>
        <div className="gallery">
          {selectedEvento.galeria.map((image, index) => (
            <img key={index} src={image} alt={`Galeria ${index}`} className="gallery-image" />
          ))}
        </div>
      </>
    )}

{selectedEvento.user && (
  <>
    <button className="tab active">
  <i className="fas fa-check tab-icon"></i>
  Participantes ({participantes.length}) </button>
  

  {/* Mostra o botão apenas se o usuário não estiver na lista de participantes */}
  {!participantes.some(participante =>  Number(participante.usuario.id) === Number(userId))  && (
      <button className="user-plus-button" onClick={() => adicionarParticipante(selectedEvento.id, userId)}>
        <i className="fas fa-user-plus tab-icon user-plus-icon"></i> Participar no Evento
      </button>
    )}
  

    <div className="description">
      <div className="participantes-info-container">
        <div className="participants-info">
          
          <div className="participant-icons">
            {participantes.slice(0, 5).map((participante, index) => (
              <img key={index} src={participante.usuario.caminho_foto} alt={`${participante.usuario.nome} ${participante.usuario.sobrenome}`} className="participant-icon"/>
            ))}
            {participantes.length > 5 && (
              <div onClick={openModalParticipantes} className="more-participants">
                <img src={participantes[5].usuario.caminho_foto} alt="Mais participantes" className="more-icon"/>
                <span className="more-number">+{participantes.length - 5}</span>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>

    {/* Modal para mostrar todos os participantes com um layout ampliado e mais detalhes */}
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModalParticipantes}
      contentLabel="Lista Completa de Participantes"
      className="modal-participantes"
      overlayClassName="overlay-participantes"
    >
      <div className="modal-content">
        <h2>Lista Completa de Participantes</h2>
        <div className="modal-body">
          {participantes.map(participante => (
            <div key={participante.usuario.id} className="participant-detail">
              <img src={participante.usuario.caminho_foto} alt={`${participante.usuario.nome} ${participante.usuario.sobrenome}`} className="participant-icon"/>
              <span>{participante.usuario.nome} {participante.usuario.sobrenome}</span>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button onClick={closeModalParticipantes} className="close-button">Fechar</button>
        </div>
      </div>
    </Modal>
  </>
)}



{selectedEvento.datainicioatividade && (
  <>
    <button className="tab active">
      <i className="fas fa-calendar-alt tab-icon"></i> Data do Evento
    </button>
    <div className="description">
      <p><strong>Data:</strong> {new Date(selectedEvento.datainicioatividade).toLocaleString()}</p>
    </div>
  </>
)}



    {selectedEvento.descricao && (
      <>
        <button className="tab active"><i className="fas fa-info-circle tab-icon"></i> Descrição do Evento</button>
        <div className="description">
          <p>{selectedEvento.descricao}</p>
        </div>
      </>
    )}
    {selectedEvento.latitude && (
  <>
    <button className="tab active">
      <i className="fas fa-map-marker-alt tab-icon"></i> Localização
    </button>
    <div className="location">
      <p><strong>Localização:</strong> {selectedEvento.latitude}, {selectedEvento.longitude}</p>
      <a 
        href={`https://www.google.com/maps?q=${selectedEvento.latitude},${selectedEvento.longitude}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="map-button"
      >
        Ver no Google Maps
      </a>
    </div>
  </>
)}

{selectedEvento.topico &&  (
  <>
    <button className="tab active">
      <i className="fas fa-tag tab-icon"></i> Relacionado com Este Evento
    </button>
    <div className="description tags-container">
      <span className="tag">
        <i className="fas fa-tags tag-icon"></i> {selectedEvento.topico.nome}
      </span>
      
      <p>
        <i className="fas fa-tag"></i> {selectedEvento.tipo_evento.nome_tipo}
      </p>
    
    </div>
  </>
)}

<div className="tab-content2">
  {imagensGaleria && imagensGaleria.length > 0 && (
    <>
      <button className="tab active"><i className="fas fa-images tab-icon"></i> Galeria do Evento</button>
      <div className="gallery">
        {imagensGaleria.map((image, index) => (
          <img key={index} src={image.caminho_imagem} alt={`Galeria ${index}`} className="gallery-image" />
        ))}
      </div>
    </>
  )}
</div>


    {/* Seção de Comentários */}
    {/* Seção de Comentários */}
{selectedEvento && selectedEvento.estado === 'Ativa' && (
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
          <span className="avaliacoes-media">Sê o primeiro a avaliar este Evento!</span>
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

          {/* Aqui você adiciona a lógica para exibir a classificação textual */}
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

          <div className="comentario-conteudo">
            <p>{comentario.texto_comentario}</p>
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
        <h2>Classifique o Evento</h2>
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






{showApprovalView && eventoDetail && (
<div className="publicacoes_div_princ">
<h1 className="publicacoes-title2">Informações do Evento</h1>
<div className="header">
  <h1 className="header-title">{eventoDetail.nome}</h1>
  <div className="author">
    <div className="authorName"><span>Autor :</span></div>
    <img src={eventoDetail.autor.caminho_foto} alt={eventoDetail.autor.nome} className="author-icon" />
    <span>{eventoDetail.autor.nome} {eventoDetail.autor.sobrenome}</span>

  </div>

</div>
<div className="tab-content2">
  {eventoDetail.galeria && eventoDetail.galeria.length > 0 && (
    <>
      <button className="tab active"><i className="fas fa-images tab-icon"></i> Galeria do Evento</button>
      <div className="gallery">
        {eventoDetail.galeria.map((image, index) => (
          <img key={index} src={image} alt={`Galeria ${index}`} className="gallery-image" />
        ))}
      </div>
    </>
  )}


  {eventoDetail.descricao && (
    <>
      <button className="tab active"><i className="fas fa-info-circle tab-icon"></i> Descrição do Evento</button>
      <div className="description">
        <p>{eventoDetail.descricao}</p>
      </div>
    </>
  )}
  

  {eventoDetail.horario && (
    <>
      <button className="tab active"><i className="fas fa-clock tab-icon"></i> Horário do Evento</button>
      <div className="additional-info">
        <div className="status">
          <i className="fas fa-check-circle"></i> {isOpen ? 'Aberto Agora' : 'Fechado Agora'}
        </div>
        <div className="schedule">
          {weekDays.map((dia) => (
            <p key={dia}><strong>{dia}:</strong> {eventoDetail.horario[dia] || 'Fechado'}</p>
          ))}
        </div>
      </div>
    </>
  )}
  {eventoDetail.estado && (
    <>
      <button className="tab active"><i className="fas fa-tasks tab-icon"></i> Estado do Evento</button>
      <div className="estado">
        <p><strong>Estado:</strong> {eventoDetail.estado}</p>
      </div>
    </>
  )}
  {eventoDetail.localizacao && (
    <>
      <button className="tab active"><i className="fas fa-map-marker-alt tab-icon"></i> Localização</button>
      <div className="location">
        <p><strong>Localização:</strong> {eventoDetail.localizacao}</p>
      </div>
    </>
  )}
  {eventoDetail.paginaweb && (
    <>
      <button className="tab active"><i className="fas fa-globe tab-icon"></i> Página Web</button>
      <div className="website">
        <p><strong>Página web:</strong> {eventoDetail.paginaweb}</p>
      </div>
    </>
  )}
  {eventoDetail.telemovel && (
    <>
      <button className="tab active"><i className="fas fa-phone tab-icon"></i> Telefone</button>
      <div className="phone">
        <p><strong>Telemóvel/Telefone: </strong>{eventoDetail.telemovel}</p>
      </div>
    </>
  )}
  {eventoDetail.email && (
    <>
      <button className="tab active"><i className="fas fa-envelope tab-icon"></i> Email</button>
      <div className="email">
        <p><strong>Email:</strong> {eventoDetail.email}</p>
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



{showDetailViewDenunciada ? (
<div className="publicacoes_div_princ">
  <h1 className="publicacoes-title2">Denúncias do Evento</h1>
  <div className="header">
    <h1 className="header-title">{eventoDetailDenunciada.nome}</h1>
    <div className="author">
      <div className="authorName"><span>Autor :</span></div>
      <img src={eventoDetailDenunciada.autor.caminho_foto} alt={eventoDetailDenunciada.autor.nome} className="author-icon" />
      <span>{eventoDetailDenunciada.autor.nome} {eventoDetailDenunciada.autor.sobrenome}</span>
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
      <div className="option" onClick={() => handleEditClick(eventoDetailDenunciada)}>
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
      <div className="publicacoes_div_princ"><h1 className="publicacoes-title2">Criar Evento</h1>
        <div className="header">
          <h1 className="header-title">Nome do evento</h1>
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
            className={`tab ${activeTab === 'comentarios' ? 'active' : ''}`}
            onClick={() => handleTabClick('comentarios')}
          >
            <i className="fas fa-comment tab-icon"></i> Comentários
          </button>
          <button
            className={`tab ${activeTab === 'mais_informacoes' ? 'active' : ''}`}
            onClick={() => handleTabClick('mais_informacoes')}
          >
            <i className="fas fa-info tab-icon"></i> Formulário de Inscrição
          </button>
         </div>
          <div className="tab-content">
                {activeTab === 'descricao' && (
          <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label>Área do Evento</label>
              <input type="text" value="Desporto" readOnly />
            </div>
            <div className="form-group">
            <label>Tópico do Evento</label>
            <select value={topico} onChange={(e) => setTopico(e.target.value)}>
              <option value="">selecionar tópico</option>
              {topicos.map((topico) => (
                <option key={topico.id} value={topico.id}>{topico.nome}</option>
              ))}
            </select>
          </div>

            <div className="form-group">
            <label>Nome do Evento</label>
            <input type="text" placeholder="inserir nome do local" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="form-group">
            <label>Descrição do Evento</label>
            <input type="text" placeholder="inserir uma breve descrição do local" value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
            </div>
           <div className="form-buttons">
            <button type="button" className="cancel-button"onClick={handleCancel}>Cancelar</button>
            <button type="button" className="submit-button" onClick={handleContinue} >Continuar</button>
          </div>
        </form>
      )}

{activeTab === 'galeria' && (
<div className="tab-content_galeria">
  <h2>Galeria do Evento</h2>
  <div {...getRootProps({ className: 'dropzone' })} className="gallery-upload">
    <input {...getInputProps()} />
    <div className="upload-box">
      <span className="upload-icon">+</span>
      <span className="upload-text">Upload</span>
    </div>
    <p className="gallery-info">
      <i className="fas fa-info-circle"></i> A primeira foto será a foto de capa do evento
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
  <h2>Horário do evento</h2>
  {Object.keys(horario).map((dia) => (
    <div key={dia} className="form-group_horario">
      <label>{dia}</label>
      <div className="horario-inputs">
        <input
          type="text"
          placeholder="HH:mm"
          value={horario[dia].inicio}
          disabled={horario[dia].fechado}
          onChange={(e) => setHorario({ ...horario, [dia]: { ...horario[dia], inicio: e.target.value } })}
        />
        <input
          type="text"
          placeholder="dd/mm/aaaa"
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
    <button type="button" className="submit-button" onClick={handleContinue}>Continuar</button>
  </div>
</div>
)}

      {activeTab === 'localizacao' && (
        <div className="tab-content_localizacao">
          <h2>Localização do evento</h2>
          <div className="localizacao-content">
            <div className="form-group">
              <label>Endereço do evento:</label>
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
            <button type="button" className="submit-button" onClick={handleContinue} >Continuar</button>
          </div>
        </div>
      )}


      {activeTab === 'comentarios' && (
        <div className="tab-content_comentarios">
          <div className="comentarios-content">
          <i class="fas fa-comment-slash"></i>
          <p>Ainda sem comentários</p>
          </div>
          <div className="form-buttons">
            <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
            <button type="button" className="submit-button" onClick={handleContinue}>Continuar</button>
          </div>
        </div>
      )}

      {activeTab === 'mais_informacoes' && (
        <div className="tab-content_mais_informacoes">
          <form>
          <div>
      <label htmlFor="firstName" class="firstName">Primeiro Nome</label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={handleChange}
        placeholder="...inserir primeiro nome..."
        size="60"
      />
      <button onClick={handleClear} class="button_comment">✏️
      </button>
      <button onClick={handleClear} class="button_comment">🗑️
      </button>
    </div>
    <button onClick={handleApproveClick} class="adicionar_botao"> <span className="plus-sign">+</span>  Adicionar Campo
      
    </button>
            <div className="form-buttons">
              <button type="button" className="cancel-button"onClick={handleCancel}>Cancelar</button>
              <button type="submit" className="submit-button_maisinfos" onClick={handleSubmit}>Publicar</button>
            </div>
          </form>
        </div>
      )}


{showFormModal && (
        <>
          <div className="modal-backdrop"></div>
          <div className="modal-content">
            <h2>Adicionar Novo Campo</h2>
          
           
          </div>
        </>
      )}
      


      {showSuccessMessage && <div className="modal-backdrop"></div>}
        {showSuccessMessage && (
          <div className="success-message_delete">
            <div className="success-message-icon"></div>
            <h1>Evento criado com sucesso!</h1>
            <p>Como é o administrador do seu centro, não será necessário passar pelo processo de validação.</p>
            <button onClick={() => setShowSuccessMessage(false)}>Continuar</button>
          </div>
        )}

        </div>
      </div>
    )}

    {!showDetailViewDenunciada && !showApprovalView && !showDetailView && showEventosList && (
      <div className="publications-view">
        <table className="publications-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome do Evento</th>
              <th>Tópico</th>
              <th>Data de Criação</th>
              <th>Data de Realização</th>
              <th>Estado</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
       {filteredEventos.map((eventos, index) => {
  
  console.log('Eventos filtrados:', filteredEventos);

    return (
      <tr key={eventos.id}>
        <td>{index + 1}</td>
        <td>{eventos.nome}</td>
        <td>{eventos.topico.nome}</td>
        <td>{formatarData(eventos.createdAt)}</td>
        <td>{formatarData(eventos.datainicioatividade)}</td>
        <td>
          <span className={`publications-status ${eventos.estado.toLowerCase().replace(' ', '-')}`}>
            {eventos.estado}
          </span>
        </td>
        <td>
          <div className="edit-buttons-container">
            <button className="edit-btn" onClick={() => handleViewDetailsClick(eventos)}>i</button>
            <button 
              className="publications-edit-btn" 
              onClick={() => handleHideClick(eventos)}>
              <i className={`fas ${eventos.visivel ? 'fa-eye' : 'fa-eye-slash'}`}></i>
            </button>
            <button className="publications-edit-btn"onClick={() => handleEditClick(eventos)}>✏️</button>
            <button className="publications-edit-btn" onClick={() => handleDeleteClick(eventos)}>🗑️</button>
            {eventos.estado === 'Por validar' && (
              <button className="publications-edit-btn" onClick={() => handlePendingViewClick(eventos)}>
                <img src="https://i.ibb.co/9T565FK/Captura-de-ecr-2024-07-04-123100-removebg-preview.png" alt="Captura-de-ecr-2024-07-04-123100-removebg-preview" className="custom-icon" /> {/* Substitua URL_DA_IMAGEM_POR_VALIDAR pelo URL da imagem */}
              </button>
            )}
            {eventos.estado === 'Denunciada' && (
              <button className="publications-edit-btn" onClick={() => handleReportedViewClick(eventos)}>
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

export default EventosView;