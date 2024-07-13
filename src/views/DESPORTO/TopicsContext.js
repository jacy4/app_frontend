import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TopicsContext = createContext();

export const useTopics = () => {
    return useContext(TopicsContext);
};

export const TopicsProvider = ({ children }) => {
    const [topicos, setTopicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Definindo o estado de erro

    useEffect(() => {
        const fetchTopicos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/topicos/topicosdeumaarea/1');
                setTopicos(response.data);
                setError(null); // Limpando qualquer erro anterior ao carregar os tópicos
            } catch (error) {
                console.error('Erro ao buscar tópicos:', error);
                setError('Erro ao carregar os tópicos. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchTopicos();
    }, []);

    const addTopic = async (newTopic) => {
        try {
            const response = await axios.post('http://localhost:3000/topicos/adicionar', newTopic);
            setTopicos(prevTopicos => [...prevTopicos, response.data]);
            setError(null); // Limpando qualquer erro anterior ao adicionar o tópico
        } catch (error) {
            console.error('Erro ao adicionar tópico:', error);
            setError('Erro ao adicionar o tópico. Tente novamente mais tarde.');
        }
    };

    const updateTopic = async (updatedTopic) => {
        try {
            const response = await axios.put(`http://localhost:3000/topicos/atualizar/${updatedTopic.id}`, updatedTopic);
            setTopicos(prevTopicos =>
                prevTopicos.map(topico =>
                    topico.id === updatedTopic.id ? response.data : topico
                )
            );
            setError(null); // Limpando qualquer erro anterior ao atualizar o tópico
        } catch (error) {
            console.error(`Erro ao atualizar tópico com ID ${updatedTopic.id}:`, error);
            setError(`Erro ao atualizar o tópico. Tente novamente mais tarde.`);
        }
    };

    const removeTopic = async (topicId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/topicos/apagar/${topicId}`);
            if (response.status === 200) {
                setTopicos(prevTopicos =>
                    prevTopicos.filter(topico => topico.id !== topicId)
                );
                setError(null); // Limpando qualquer erro anterior ao remover o tópico
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
