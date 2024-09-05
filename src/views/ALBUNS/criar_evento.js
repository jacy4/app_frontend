import React, { useState, useEffect } from 'react';
import './albuns.css';
import axios from 'axios';



const handleSubmit = async (e, {
    topico,
    titulo,
    descricao,
    galeria, 
    inicioData,
    inicioHora,
    fimData,
    fimHora,
    localizacao,
    nome,
    centroId
}) => {
    e.preventDefault();

    console.log('Iniciando handleSubmit');

    const formattedHorario = {
        inicio: `${inicioData}T${inicioHora}`,
        fim: `${fimData}T${fimHora}`
    };

    const publicacaoData = {
        topico,
        titulo,
        descricao,
        galeria, 
        inicioData,
        inicioHora,
        fimData,
        fimHora,
        localizacao,
        nome,
        galeria: galeria.map((img) => img.url),
        centro_id: centroId,
        autor_id: sessionStorage.getItem('user_id')
    };

    console.log('Dados do Evento:', inicioData);

    try {
        const response = await axios.post('https://backend-teste-q43r.onrender.com/eventos/create', inicioData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Resposta do Backend:', response);

        if (response.status === 201) {
            return { success: true };
        } else {
            console.error('Erro na resposta do Backend:', response);
            return { success: false, error: 'Erro na resposta do Backend' };
        }
    } catch (error) {
        console.error('Erro ao criar evento:', error);
        return { success: false, error };
    }
};

export default handleSubmit;








