import React, { useState, useEffect } from 'react';
import './calendario.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import ptLocale from '@fullcalendar/core/locales/pt';

const CalendarioView = () => {
  const [eventosCal, setEventosCal] = useState([]);
  const [centroId, setCentroId] = useState(null);
  const [error, setError] = useState(null);

  // Busca o centro ID do sessionStorage ao carregar o componente
  useEffect(() => {
    const storedCentroId = sessionStorage.getItem('centro_id');
    // console.log(storedCentroId);
    if (storedCentroId) {
      setCentroId(storedCentroId);
    }
  }, []);

  // Busca eventos do backend
  useEffect(() => {
    const buscarEventos = async () => {
      try {
        const response = await axios.get(`https://backend-teste-q43r.onrender.com/eventos/calendar_list`); // Altere para a URL correta da sua API
        if (response.data && Array.isArray(response.data)) {
          // console.log(response.data);

          const eventosFormatados = response.data.flatMap((evento) => {
            // const descricaoFormatada =
            //   evento.descricao.length > 15 ? `${evento.descricao.substring(0, 15)}...` : evento.descricao;

            let corEvento = '';
            switch (evento.estado) {
              case 'Ativa':
                corEvento = 'green';
                break;
              case 'Finalizada':
                corEvento = 'grey';
                break;
              case 'Denunciada':
                corEvento = 'red';
                break;
              case 'Por validar':
                corEvento = 'orange';
                break;
              default:
                corEvento = 'blue';
                break;
            }

            const eventosExpandido = [];
            const dataInicio = new Date(evento.datainicioatividade);
            const dataFim = new Date(evento.datafimatividade);
            const umDia = 1000 * 60 * 60 * 24;
            
            for (let data = new Date(dataInicio); data <= dataFim; data = new Date(data.getTime() + umDia)) {
              eventosExpandido.push({
                id: `${evento.id}-${data.toISOString().split('T')[0]}`,
                title: evento.nome,
                start: data.toISOString().split('T')[0],
                // description: descricaoFormatada,
                color: corEvento,
                allDay: true,
              });
            }

            return eventosExpandido;
          });
          // console.log(eventosFormatados)
          setEventosCal(eventosFormatados);
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

  // const handleDateClick = (info) => {
  //   alert('Clicked on: ' + info.dateStr);
  //   // info.dayEl.style.backgroundColor = 'red';
  // };

  return (
    <div className="div_princ_calendario">
      <h1 className="title2">Calendario de Eventos</h1>
      {error && <p className="error">Erro ao carregar eventos: {error}</p>}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={ptLocale}
        height="80VH"
        events={eventosCal}
      />
    </div>
  );
};

export default CalendarioView;
