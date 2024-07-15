import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTopics } from './TopicsContext';
import { IoMdPhotos } from 'react-icons/io';
import { FiAlignLeft } from "react-icons/fi";
import axios from 'axios';
import './desporto.css';



const EditarDesporto = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { updateTopic } = useTopics();
    const [topicName, setTopicName] = useState('');
    const [topicIcon, setTopicIcon] = useState('');
    const [customIcon, setCustomIcon] = useState(null);
    const [customIconUrl, setCustomIconUrl] = useState('');
    const [activeTab, setActiveTab] = useState('descricao');
    const { areaId, areaColor } = location.state;

    useEffect(() => {
        if (location.state) {
            const { nome, topico_icon } = location.state;
            setTopicName(nome);
            setTopicIcon(topico_icon);
            setCustomIconUrl(topico_icon); // Define customIconUrl com o ícone existente
        }
    }, [location.state]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('key', '4d755673a2dc94483064445f4d5c54e9'); // substitua pela sua chave da API imgbb
        formData.append('image', file);

        const response = await axios.post('https://api.imgbb.com/1/upload', formData);
        return response.data.data.url;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let iconUrl = '';

        if (customIcon) {
            iconUrl = await uploadImage(customIcon);
        } else {
            iconUrl = topicIcon;
        }

        const updatedTopic = { id: location.state.id, nome: topicName, topico_icon: iconUrl };
        await updateTopic(updatedTopic);
        navigate(`/listar_topicos/${areaId}`);
    };

    const handleIconChange = (e) => {
        setTopicIcon(e.target.value);
        setCustomIcon(null);
        setCustomIconUrl('');
    };

    const handleIconUpload = (e) => {
        const file = e.target.files[0];
        setCustomIcon(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setCustomIconUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="add-topic-page">
            <div className="topic-form-container">
                <h2 style={{ backgroundColor: areaColor, color: 'white', padding: '10px', borderRadius: '5px' }}>{topicName || 'Editar Tópico'}</h2>
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'descricao' ? 'active' : ''}`}
                        onClick={() => handleTabClick('descricao')}
                        style={activeTab === 'descricao' ? { borderBottom: `2px solid ${areaColor}` } : {}}
                    >
                        <FiAlignLeft className="icon" /> Descrição
                    </button>
                    <button
                        className={`tab ${activeTab === 'galeria' ? 'active' : ''}`}
                        onClick={() => handleTabClick('galeria')}
                        style={activeTab === 'galeria' ? { borderBottom: `2px solid ${areaColor}` } : {}}
                    >
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
                            <label htmlFor="customIcon">Ícone do Tópico:</label>
                            <input
                                type="file"
                                id="customIcon"
                                onChange={handleIconUpload}
                                accept="image/*"
                            />
                        </div>
                        <div className="icon-preview">
                            {customIconUrl ? (
                                <img src={customIconUrl} alt="Ícone Personalizado" />
                            ) : (
                                <img src={topicIcon} alt="Ícone Atual" />
                            )}
                        </div>
                        <div className="button-group">
                            <button type="button" className="cancel-button" onClick={() => navigate(`/listar_topicos/${areaId}`)} style={{ borderColor: areaColor, color: areaColor }}>Cancelar</button>
                            <button type="submit" className="submit-button" style={{ backgroundColor: areaColor, borderColor: areaColor }}>Atualizar</button>
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
                            <button type="button" className="cancel-button" onClick={() => navigate(`/listar_topicos/${areaId}`)} style={{ borderColor: areaColor, color: areaColor }}>Cancelar</button>
                            <button className="save-button" style={{ backgroundColor: areaColor, borderColor: areaColor }}><i className="fas fa-save"></i>Salvar Alterações</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditarDesporto;
