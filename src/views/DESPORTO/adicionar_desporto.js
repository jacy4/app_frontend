import React, { useState, useEffect } from 'react';
import { IoMdPhotos } from 'react-icons/io';
import { FiAlignLeft } from "react-icons/fi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./desporto.css";

const iconOptions = [
    { value: 'futebol', label: 'Futebol', icon: 'https://i.ibb.co/kXpD9Hs/bola.png' },
    { value: 'tenis', label: 'Tênis', icon: "https://i.ibb.co/zPLrfrx/topico-tenis.png" },
    { value: 'academia', label: 'Ginásios', icon: 'https://i.ibb.co/KmFqXNn/ginasio-1.png' },
    { value: 'ciclismo', label: 'Ciclismo', icon: 'https://i.ibb.co/Vpghmf1/topico-ciclismo.png' },
    { value: 'fitness', label: 'Fitness', icon: 'https://i.ibb.co/RCqV5WK/ginasta-fazendo-abdominais-para-fortalecer-os-musculos-abdominais.png' },
    { value: 'voleibol', label: 'Voleibol', icon: 'https://i.ibb.co/QdKPrKV/voleibol.png' },
    { value: 'natacao', label: 'Natação', icon: 'https://i.ibb.co/QPVxMMw/natacao.png' },
    { value: 'basquete', label: 'Basquete', icon: "https://i.ibb.co/rtZ7wnr/topico-basket.png" },
    { value: 'atletismo', label: 'Atletismo', icon: 'https://i.ibb.co/wYrkrg6/perseguir.png' },
];

const AdicionarDesporto = () => {
    const [activeTab, setActiveTab] = useState('descricao');
    const [topicName, setTopicName] = useState('');
    const [topicIcon, setTopicIcon] = useState('');
    const [area, setArea] = useState('1');
    const [topicos, setTopicos] = useState([]); // Estado para armazenar os tópicos
    const navigate = useNavigate();

    // Efeito para carregar os tópicos ao montar o componente e sempre que houver mudança no estado `topicos`
    useEffect(() => {
        fetchTopics();
    }, []);

    // Função para buscar os tópicos da API
    const fetchTopics = async () => {
        try {
            const response = await axios.get('https://backend-teste-q43r.onrender.com/topicos'); // Endpoint para buscar os tópicos
            setTopicos(response.data); // Atualiza o estado dos tópicos com os dados da API
        } catch (error) {
            console.error('Erro ao buscar tópicos:', error);
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!topicName || !topicIcon) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
    
        try {
            const selectedIcon = iconOptions.find(option => option.value === topicIcon);
            const response = await axios.post('https://backend-teste-q43r.onrender.com/topicos/createTopico', {
                nome: topicName,
                area_id: area,
                topico_icon: selectedIcon ? selectedIcon.icon : ''
            });
    
            if (response.status === 201) {
                const novoTopico = response.data.data; // Obtém o novo tópico criado do response
                setTopicos([...topicos, novoTopico]); // Atualiza localmente a lista de tópicos com o novo tópico
                alert('Tópico criado com sucesso!');
                setTopicName('');
                setTopicIcon('');
                navigate('/desporto'); // Redireciona para a página desporto
            } else {
                alert('Falha ao criar tópico.');
            }
        } catch (error) {
            console.error('Erro ao criar tópico:', error);
            alert('Ocorreu um erro ao criar o tópico. Tente novamente.');
        }
    };
    

    const handleCancel = () => {
        navigate('/desporto'); // Redirecionar para a página desporto
    };

    return (
        <div className="add-topic-page">
            <div className="topic-form-container">
                <h2>Adicionar Novo Tópico</h2>
                <div className="tabs">
                    <button className={`tab ${activeTab === 'descricao' ? 'active' : ''}`} onClick={() => handleTabClick('descricao')}>
                        <FiAlignLeft className="icon" /> Descrição
                    </button>
                    <button className={`tab ${activeTab === 'galeria' ? 'active' : ''}`} onClick={() => handleTabClick('galeria')}>
                        <IoMdPhotos className="icon" /> Galeria
                    </button>
                </div>

                {activeTab === 'descricao' && (
                    <form onSubmit={handleSubmit} className="topic-form">
                        <div className="form-group">
                            <label htmlFor="topicName">Nome do Tópico:</label>
                            <input
                                type="text"
                                id="topicName"
                                value={topicName}
                                onChange={(e) => setTopicName(e.target.value)}
                                required
                                placeholder="Inserir nome do tópico"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="topicIcon">Ícone do Tópico:</label>
                            <select
                                id="topicIcon"
                                value={topicIcon}
                                onChange={(e) => setTopicIcon(e.target.value)}
                                required
                            >
                                <option value="" disabled>Selecionar ícone de tópico</option>
                                {iconOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="icon-preview">
                            {topicIcon && (
                                <img src={iconOptions.find((option) => option.value === topicIcon)?.icon} alt="Ícone do Tópico" />
                            )}
                        </div>
                        <div className="button-group">
                            <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
                            <button type="submit" className="submit-button">Criar Tópico</button>
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
                            <button type="button" className="cancel-button" onClick={() => navigate('/desporto')}>Cancelar</button>
                            <button className="save-button"><i className="fas fa-save"></i>Salvar Alterações</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdicionarDesporto;
