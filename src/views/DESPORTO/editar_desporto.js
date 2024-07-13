import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTopics } from './TopicsContext';
import { FaFutbol, FaDumbbell, FaBicycle, FaSwimmer, FaBasketballBall, FaRunning } from 'react-icons/fa';
import { GiTennisRacket, GiVolleyballBall } from 'react-icons/gi';
import { IoIosFitness, IoMdPhotos } from 'react-icons/io';
import { FiAlignLeft } from "react-icons/fi";
import './desporto.css';

const iconComponents = {
    'futebol': FaFutbol,
    'tenis': GiTennisRacket,
    'academia': FaDumbbell,
    'ciclismo': FaBicycle,
    'fitness': IoIosFitness,
    'voleibol': GiVolleyballBall,
    'natacao': FaSwimmer,
    'basquete': FaBasketballBall,
    'atletismo': FaRunning,
};

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

const EditarDesporto = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { updateTopic } = useTopics();
    const [topicName, setTopicName] = useState('');
    const [topicIcon, setTopicIcon] = useState('');
    const [activeTab, setActiveTab] = useState('descricao');
    const [description, setDescription] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);

    useEffect(() => {
        if (location.state) {
            const { name, icon } = location.state;
            setTopicName(name);
            setTopicIcon(icon);
        }
    }, [location.state]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedTopic = { id: location.state.id, name: topicName, icon: topicIcon };
        updateTopic(updatedTopic); // Chama a função para atualizar o tópico
        navigate('/desporto'); // Redireciona para a página Desporto após atualizar
    };

    const handleIconChange = (e) => {
        setTopicIcon(e.target.value); // Atualiza o estado do ícone selecionado
    };

    return (
        <div className="add-topic-page">
            <div className="topic-form-container">
                <h2>{topicName || 'Editar Tópico'}</h2>
                <div className='tabs'>
                    <button className={`tab ${activeTab === 'descricao' ? 'active' : ''}`} onClick={() => handleTabClick('descricao')}>
                        <FiAlignLeft className='icon' /> Descrição
                    </button>
                    <button className={`tab ${activeTab === 'galeria' ? 'active' : ''}`} onClick={() => handleTabClick('galeria')}>
                        <IoMdPhotos className='icon' />Galeria
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
                                onChange={handleIconChange}
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
                                <img src={iconOptions.find((option) => option.value === topicIcon)?.icon} alt="Ícone Selecionado" />
                            )}
                        </div>
                        <div className="button-group">
                            <button type="button" className="cancel-button" onClick={() => navigate('/desporto')}>Cancelar</button>
                            <button type="submit" className="submit-button">Atualizar</button>
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

export default EditarDesporto;
