import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TopicsContext = createContext();

export const useTopics = () => {
    return useContext(TopicsContext);
};

export const TopicsProvider = ({ children, areaId }) => {
    const [topicos, setTopicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [areaName, setAreaName] = useState(''); 
    const [areaColor, setAreaColor] = useState('');

    const areaColors = {
        1: '#008000', // Cor para Desporto
        2: '#8B0000', // Cor para Saúde
        3: '#FF1493', // Cor para Gastronomia
        4: '#1E90FF', // Cor para Formação
        5: '#20B2AA', // Cor para Lazer
        6: '#808000', // Cor para Transportes
        7: '#A52A2A', // Cor para Alojamento
    };

    useEffect(() => {
        const fetchTopicos = async () => {
            if (!areaId) return;
            try {
                setLoading(true);
                setTopicos([]); 
                const response = await axios.get(`https://backend-teste-q43r.onrender.com/topicos/topicosdeumaarea/${areaId}`);
                setTopicos(response.data);
                setError(null);
            } catch (error) {
                console.error('Erro ao buscar tópicos:', error);
                setError('Erro ao carregar os tópicos. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        const fetchAreaName = async () => {
            if (!areaId) return;
            try {
                const response = await axios.get(`https://backend-teste-q43r.onrender.com/areas/detalheArea/${areaId}`);
                setAreaName(response.data.nome);
                setAreaColor(areaColors[areaId] || '');
            } catch (error) {
                console.error('Erro ao buscar o nome da área:', error);
            }
        };

        fetchTopicos();
        fetchAreaName();
    }, [areaId]);

    const addTopic = async (newTopic) => {
        try {
            const response = await axios.post('https://backend-teste-q43r.onrender.com/topicos/adicionar', newTopic);
            setTopicos(prevTopicos => [...prevTopicos, response.data]);
            setError(null);
        } catch (error) {
            console.error('Erro ao adicionar tópico:', error);
            setError('Erro ao adicionar o tópico. Tente novamente mais tarde.');
        }
    };

    const updateTopic = async (updatedTopic) => {
        try {
            const response = await axios.put(`https://backend-teste-q43r.onrender.com/topicos/atualizar/${updatedTopic.id}`, updatedTopic);
            setTopicos(prevTopicos =>
                prevTopicos.map(topico =>
                    topico.id === updatedTopic.id ? response.data : topico
                )
            );
            setError(null);
        } catch (error) {
            console.error(`Erro ao atualizar tópico com ID ${updatedTopic.id}:`, error);
            setError(`Erro ao atualizar o tópico. Tente novamente mais tarde.`);
        }
    };

    const removeTopic = async (topicId) => {
        try {
            const response = await axios.delete(`https://backend-teste-q43r.onrender.com/topicos/apagar/${topicId}`);
            if (response.status === 200) {
                setTopicos(prevTopicos =>
                    prevTopicos.filter(topico => topico.id !== topicId)
                );
                setError(null);
            } else {
                console.error(`Falha ao excluir tópico com ID ${topicId}. Status: ${response.status}`);
                setError(`Falha ao excluir o tópico com ID ${topicId}. Tente novamente mais tarde.`);
            }
        } catch (error) {
            console.error(`Erro ao excluir tópico com ID ${topicId}:`, error);
            setError(`Erro ao excluir o tópico. Tente novamente mais tarde.`);
        }
    };
    

    const contextValue = {
        topicos,
        loading,
        error,
        areaName,
        areaColor,
        areaId,
        addTopic,
        updateTopic,
        removeTopic,
    };

    return (
        <TopicsContext.Provider value={contextValue}>
            {children}
        </TopicsContext.Provider>
    );
};
