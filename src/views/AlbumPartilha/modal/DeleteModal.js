import React from 'react';
import Modal from 'react-modal';
import { FaTrashAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './DeleteModal.css';

Modal.setAppElement('#root');

const DeleteModal = ({
  isOpen,
  onRequestClose,
  onConfirmDelete,
  isSuccessModalOpen,
  closeSuccessModal
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Eliminar Partilha"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <div className="modal-icon">
            <FaTrashAlt />
          </div>
          <h2>Eliminar partilha?</h2>
          <p>O usuário que criou esta partilha será notificado sobre sua ação.</p>
        </div>
        <div className="modal-buttons-container">
          <div className="modal-buttons">
            <button className="delete-button" onClick={onConfirmDelete}>Eliminar</button>
            <button className="cancel-button" onClick={onRequestClose}>Cancelar</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={closeSuccessModal}
        contentLabel="Ação Aplicada com Sucesso"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
          <h2>Ação aplicada com sucesso!</h2>
        </div>
        <div className="success-buttons-container">
          <button className="success-button" onClick={closeSuccessModal}>Continuar</button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
