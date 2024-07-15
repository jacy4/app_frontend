import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTopics } from './TopicsContext';
import Modal from 'react-modal';
import { FaTrashAlt } from 'react-icons/fa';
import './desporto.css';

Modal.setAppElement('#root');

const Desporto = () => {
    const { topicos, loading, removeTopic, areaName, areaId, areaColor } = useTopics();
    const [showOptions, setShowOptions] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const navigate = useNavigate();

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleEditTopic = (topic) => {
        navigate('/editar_desporto', { state: { id: topic.id, nome: topic.nome, topico_icon: topic.topico_icon, areaId, areaColor } });
    };

    const openModal = (topic) => {
        setSelectedTopic(topic);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedTopic(null);
    };

    const handleRemoveTopic = async () => {
        if (selectedTopic) {
            await removeTopic(selectedTopic.id);
            closeModal(); // Fechar o modal após a remoção
        }
    };

    return (
        <div className='div_princ_topicos'>
            <h2 className='title2'>Lista de Tópicos de <span style={{ color: areaColor,}}>{areaName}</span></h2>

            <div className='big-container'>
                <div className="icons-container">
                    {loading ? (
                        <p>Carregando tópicos...</p>
                    ) : (
                        <div className="icons-row">
                            {topicos.length > 0 ? (
                                topicos.map((topic, index) => (
                                    <div key={topic.id} className={`icon-wrapper2 ${index >= topicos.length - 2 ? 'row2' : ''}`}>
                                        <div className={`topic ${showOptions ? 'show-options' : ''}`} onClick={() => showOptions && toggleOptions()}>
                                            <img src={topic.topico_icon} alt={topic.nome} className="icon2" style={{ width: '70px', height: '70px' }} />
                                            <p style={{ color: areaColor }}>{topic.nome}</p>
                                            {showOptions && (
                                                <div className="options">
                                                    <button className="edit-option" onClick={() => handleEditTopic(topic)}>
                                                        Editar
                                                    </button>
                                                    <button className="remove-option" onClick={() => openModal(topic)}>
                                                        Remover
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Nenhum tópico encontrado.</p>
                            )}
                        </div>
                    )}
                    <div className="buttons-container">
                    {topicos.length > 0 && (
                            <button className="edit-button" onClick={toggleOptions} style={{ borderColor: areaColor, color: areaColor }}>
                                Editar Tópicos
                            </button>
                        )}
                        <button className="add-button" onClick={() => navigate('/adicionar_desporto', { state: { areaId,areaColor } })} style={{ backgroundColor: areaColor, borderColor: areaColor }}>
                            Adicionar Tópico
                        </button>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Confirm Delete"
                    className="modal"
                    overlayClassName="overlay"
                >
                    <div className="modal-content">
                        <FaTrashAlt className="modal-icon" />
                        <h2>Eliminar Tópico?</h2>
                        <p>Tem a certeza que quer eliminar "{selectedTopic ? selectedTopic.nome : ''}", esta ação é irreversível</p>
                        <div className="modal-actions">
                            <button onClick={handleRemoveTopic} className="confirm-button">Eliminar</button>
                            <button onClick={closeModal} className="cancel-button">Cancelar</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Desporto;
