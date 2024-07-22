import React, { useState, useEffect } from 'react';
import './eventos.css';

import axios from 'axios';

const EventosView = ({ centroId }) => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://backend-teste-q43r.onrender.com/eventos/listarEventos/${centroId}`)
            .then(response => {
                setEventos(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar eventos:', error);
                setLoading(false);
            });
    }, [centroId]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            {eventos.length === 0 ? (
                <p>Nenhuma EVENTO encontrada</p>
            ) : (
                eventos.map(evento => (
                    <div key={evento.id}>
                        <h2>{evento.nome}</h2>
                        <p>{evento.descricao}</p>
                        <p>Topico: {evento.topico.nome}</p>
                        {/* Outros detalhes do evento */}
                    </div>
                ))
            )}
        </div>
    );
};

export default EventosView;
