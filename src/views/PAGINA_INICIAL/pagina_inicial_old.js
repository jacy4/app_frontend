import React, { useState, useEffect } from 'react';
import './pagina_inicial_old.css';
import Card from '../../componentes/pagina_inicial/card_area';
import axios from 'axios';


const PaginaInicial = () => {
  const [areas, setAreas] = useState([]);
  const [eventCounts, setEventCounts] = useState({});
  const [publicationCounts, setPublicationCounts] = useState({});
  const [forumMessagesCounts, setForumMessagesCounts] = useState({}); // Estado para armazenar a contagem de mensagens de fóruns
  const [galleryCounts, setGalleryCounts] = useState({}); // Novo estado para contagem de imagens na galeria
  const [pendingApprovalCounts, setPendingApprovalCounts] = useState({}); // Novo estado para contagem de eventos "Por aprovar"
  const [mostCommentedEvents, setMostCommentedEvents] = useState({});


  // Função para buscar as áreas da API
  const fetchAreas = async () => {
    try {
      const response = await axios.get('https://backend-teste-q43r.onrender.com/areas/listarAreas'); // Substitua com a URL correta da sua API
      setAreas(response.data); // Atualiza o estado com as áreas recebidas
    } catch (error) {
      console.error('Erro ao buscar áreas:', error);
    }
  };

  // Função para buscar a contagem de eventos por área
  const fetchEventCountForArea = async (areaId) => {
    try {
      const response = await axios.get(`https://backend-teste-q43r.onrender.com/eventos/contar/${areaId}`); // Substitua com a URL correta da sua API
      setEventCounts((prevCounts) => ({
        ...prevCounts,
        [areaId]: response.data.totalEventos, // Supondo que o retorno seja { totalEventos: X }
      }));
    } catch (error) {
      console.error(`Erro ao buscar contagem de eventos para a área ${areaId}:`, error);
    }
  }; 
  const fetchMostCommentedEventForArea = async (areaId) => {
    try {
      const response = await axios.get(`https://backend-teste-q43r.onrender.com/eventos/commaiscomentarios/${areaId}`);
      setMostCommentedEvents((prevState) => ({
        ...prevState,
        [areaId]: response.data.nomeEvento // Supondo que a API retorna { nomeEvento: "Nome do Evento" }
      }));
    } catch (error) {
      console.error(`Erro ao buscar evento mais comentado para a área ${areaId}:`, error);
    }
  };
  

  const fetchPendingApprovalCountForArea = async (areaId) => {
    try {
      const response = await axios.get(`https://backend-teste-q43r.onrender.com/eventos/contar/poraprovar/${areaId}`);
      console.log('Response para eventos por aprovar', response.data); // Log para verificar a resposta da API
      setPendingApprovalCounts((prevCounts) => {
        const newCounts = { ...prevCounts, [areaId]: response.data.totalEventosPorAprovar };
        console.log("Atualizando estado de eventos por validar:", newCounts); // Log após a atualização do estado
        return newCounts;
      });
    } catch (error) {
      console.error(`Erro ao buscar contagem de eventos por aprovar para a área ${areaId}:`, error);
    }
  };
  
  // Função para buscar a contagem de publicações por área
  const fetchPublicationCountForArea = async (areaId) => {
    try {
      const response = await axios.get(`https://backend-teste-q43r.onrender.com/publicacoes/contar/${areaId}`); // Substitua com a URL correta da sua API
      setPublicationCounts((prevCounts) => ({
        ...prevCounts,
        [areaId]: response.data.totalPublicacoes, // Supondo que o retorno seja { totalPublicacoes: X }
      }));
    } catch (error) {
      console.error(`Erro ao buscar contagem de publicações para a área ${areaId}:`, error);
    }
  };

  const fetchForumMessagesCountForArea = async (areaId) => {
    try {
      const response = await axios.get(`https://backend-teste-q43r.onrender.com/mensagem_forum/contar/${areaId}`); // Substitua com a URL correta da sua API
      setForumMessagesCounts((prevCounts) => ({
        ...prevCounts,
        [areaId]: response.data.totalMensagens, // Supondo que o retorno seja { totalMensagens: X }
      }));
    } catch (error) {
      console.error(`Erro ao buscar contagem de mensagens de fórum para a área ${areaId}:`, error);
    }
  };
  const fetchGalleryCountForArea = async (areaId) => {
    try {
      const response = await axios.get(`https://backend-teste-q43r.onrender.com/galeria_album/contar/${areaId}`); // Substitua com a URL correta da sua API
      setGalleryCounts((prevCounts) => ({
        ...prevCounts,
        [areaId]: response.data.totalImagens, // Supondo que o retorno seja { totalImagens: X }
      }));
    } catch (error) {
      console.error(`Erro ao buscar contagem de imagens da galeria para a área ${areaId}:`, error);
    }
  };
  
 
  

  // Função para buscar eventos e publicações de todas as áreas
  const fetchAllCounts = async () => {
    // Itera sobre todas as áreas e busca a contagem de eventos e publicações para cada uma
    for (const area of areas) {
      await fetchEventCountForArea(area.id);
      await fetchMostCommentedEventForArea(area.id);
      await fetchPendingApprovalCountForArea(area.id);
      await fetchPublicationCountForArea(area.id);// Busca a contagem de publicações para cada área
      await fetchForumMessagesCountForArea(area.id); 
      await fetchGalleryCountForArea(area.id);
      
    }
  };

  useEffect(() => {
    // Primeiro, busca as áreas
    const fetchData = async () => {
      await fetchAreas(); // Busca as áreas
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (areas.length > 0) {
      fetchAllCounts();
      console.log("Estado de eventos por validar:", pendingApprovalCounts);
 // Busca a contagem de eventos e publicações após carregar as áreas
    }
  }, [areas]); // Dispara a busca de contagens sempre que as áreas forem carregadas

  useEffect(() => {
    console.log("Estado de eventos por validar:", pendingApprovalCounts);
  }, [pendingApprovalCounts]); 
  
  const areaStyles = {
    'Desporto': {
      icon: 'https://i.ibb.co/DKP7SQG/Area-desporto.png',
      backgroundColor: '#4BA900',
      backgroundImage: 'https://i.ibb.co/0n7WgQM/Screenshot-4-removebg-preview.png'
    },
    'Saúde': {
      icon: 'https://i.ibb.co/x8kydZy/area-saude-removebg-preview.png',
      backgroundColor: '#8F3023',
      backgroundImage: 'https://i.ibb.co/7jyNVHm/Screenshot-5-removebg-preview-1.png'
    },
    'Formação': {
      icon: 'https://i.ibb.co/60Mcjk4/area-forma-o-removebg-preview.png',
      backgroundColor: '#3879C6',
      backgroundImage: 'https://i.ibb.co/HCTtfGp/Screenshot-7-removebg-preview.png'
    },
    'Alojamento': {
      icon: 'https://i.ibb.co/zG9X8Fj/area-alojamento-removebg-preview.png',
      backgroundColor: '#825521',
      backgroundImage: 'https://i.ibb.co/5vgXygJ/Screenshot-8-removebg-preview.png'
    },
    'Lazer': {
      icon: 'https://i.ibb.co/pr4TKCy/area-lazer-removebg-preview.png',
      backgroundColor: '#25ABAB',
      backgroundImage: 'https://i.ibb.co/Hdcg9j0/Screenshot-10-removebg-preview.png'
    },
    'Gastronomia': {
      icon: 'https://i.ibb.co/TwMHTCc/area-gastronomia-removebg-preview.png',
      backgroundColor: '#AA1D7A',
      backgroundImage: 'https://i.ibb.co/yYRy6P6/Screenshot-6-removebg-preview.png'
    },
    'Transportes': {
      icon: 'https://i.ibb.co/4pFgN7f/area-transportes-removebg-preview.png',
      backgroundColor: '#B8BB06',
      backgroundImage: 'https://i.ibb.co/k3dVkMG/Screenshot-9-removebg-preview.png'
    },
    'Tecnologia': {
      icon: 'https://i.ibb.co/26J24mS/gsfgdfg-removebg-preview.png',
      backgroundColor: '#FFEBCD',
      backgroundImage: 'https://i.ibb.co/k3dVkMG/Screenshot-9-removebg-preview.png'
    }
  };
  const defaultStyle = {
    icon: 'https://i.ibb.co/NKpt5n1/tiiiiiii-removebg-preview.png', // Ícone padrão
    backgroundColor: '#5F9EA0', // Cor de fundo padrão
    backgroundImage: 'https://i.ibb.co/default-background.png' // Imagem de fundo padrão
  };
  
  return (
    <div className="div_princ">
      <h1 className="title2">Página Inicial</h1>
      <div className="cards-container">
        {/* Verifica se há áreas disponíveis antes de renderizar */}
        {areas.length > 0 ? (
          areas.map((area, index) => {
            // Combina o estilo específico da área (se houver) com o estilo padrão
            const style = { ...defaultStyle, ...areaStyles[area.nome] };

            return (
              <Card
                key={index}
                title={area.nome} // Usa o nome da área que vem da API
                events={eventCounts[area.id] || 0} // Substitua conforme a estrutura dos dados da API
                mostCommentedEvent={mostCommentedEvents[area.id] || "Nenhum comentário"}
                pendingApproval={pendingApprovalCounts[area.id] || 0}
                shares={galleryCounts[area.id] || 0} // Substitua conforme a estrutura dos dados da API
                messages={forumMessagesCounts[area.id] || 0} // Substitua conforme a estrutura dos dados da API
                posts={publicationCounts[area.id] || 0} // Substitua conforme a estrutura dos dados da API
                icon={style.icon} // Usa o ícone da área ou o padrão
                backgroundColor={style.backgroundColor} // Usa a cor de fundo da área ou o padrão
                backgroundImage={style.backgroundImage} // Usa a imagem de fundo da área ou o padrão
              />
            );
          })
        ) : (
          <p>Carregando áreas...</p> // Mostra enquanto as áreas estão sendo carregadas
        )}
        
      </div>
    </div>
  );
};

export default PaginaInicial;
