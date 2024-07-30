import React, { useState } from 'react';
import './AlbumPartilha.css';
import FilterOptions from './filteroptions/FilterOptions';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaPen, FaTrashAlt, FaInfoCircle, FaBan } from 'react-icons/fa';
import Modal from 'react-modal';
import CriarAlbum from './CriarAlbum';
import PublicacaoDetalhes from './PublicacaoDetalhes';
import DeleteModal from './modal/DeleteModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Editar from './Edit/Editar';  // Importação do novo componente Editar

Modal.setAppElement('#root');

const AlbumPartilha = () => {
  const [publicacoes, setPublicacoes] = useState([
    {
      id: 1,
      nome: 'Estado Municipal do Fontelo',
      topico: 'Futebol',
      dataCriacao: '2024-06-12T10:00:00Z',
      status: 'hidden',
      imagens: [
        'https://via.placeholder.com/300.png',
        'https://via.placeholder.com/300x200.png',
      ],
      descricao: 'Descrição do evento 1',
      dimensoes: '105x66 metros',
      horario: '8:30-19:00'
    },
    {
      id: 2,
      nome: 'Estádio dos Trabelos',
      topico: 'Futebol',
      dataCriacao: '2024-06-12T12:30:00Z',
      status: 'active',
      imagens: [
        'https://eventmundi.com.br/wp-content/uploads/2023/06/Dunny_an_aerial_view_of_the_maracan_stadium_at_sunrise_with_chr_1e100a80-e25f-4049-82fd-a5dff1bb2357.jpg',
        'https://s3.static.brasilescola.uol.com.br/img/2019/12/estadio-maracana-novo.jpg',
      ],
      descricao: 'Descrição do evento 2',
      dimensoes: '100x60 metros',
      horario: '8:30-19:00'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPublicationList, setShowPublicationList] = useState(true);
  const [selectedButton, setSelectedButton] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [editandoPublicacao, setEditandoPublicacao] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [publicacaoIdParaExcluir, setPublicacaoIdParaExcluir] = useState(null);
  const [publicacaoDetalhada, setPublicacaoDetalhada] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const openDetalhes = (publicacao) => {
    setPublicacaoDetalhada(publicacao);
    setShowPublicationList(false);
    setShowCreateForm(false);
  };

  const closeDetalhes = () => {
    setPublicacaoDetalhada(null);
    setShowPublicationList(true);
  };

  const handleDeleteClick = (publicacaoId) => {
    setIsOpen(true);
    setPublicacaoIdParaExcluir(publicacaoId);
  };

    const handleConfirmDelete = async () => {
    if (publicacaoIdParaExcluir) {
      try {
        setPublicacoes(prev => prev.filter(pub => pub.id !== publicacaoIdParaExcluir));
        console.log(`Publicação ${publicacaoIdParaExcluir} excluída com sucesso.`);
        setIsSuccessModalOpen(true);
      } catch (error) {
        console.error('Erro ao excluir publicação:', error);
      } finally {
        setIsOpen(false);
        setPublicacaoIdParaExcluir(null);
      }
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleCreatePublicationClick = () => {
    setShowCreateForm(true);
    setShowPublicationList(false);
    setSelectedButton('create');
    setEditandoPublicacao(null);
  };

  const handleShowPublicationListClick = () => {
    setShowCreateForm(false);
    setShowPublicationList(true);
    setSelectedButton('list');
    setPublicacaoDetalhada(null);
  };

  const handleEditClick = (publicacao) => {
    setShowCreateForm(true);
    setShowPublicationList(false);
    setSelectedButton('edit');
    setEditandoPublicacao(publicacao);
  };

  const handleFormSubmit = (formData) => {
    const { titulo, topico, area, descricao, images } = formData;

    if (!titulo || !topico) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      if (editandoPublicacao) {
        setPublicacoes(prev => 
          prev.map(pub => pub.id === editandoPublicacao.id ? { ...pub, nome: titulo, topico, area, descricao, imagens: images } : pub)
        );
        console.log('Publicação atualizada com sucesso.');
      } else {
        const novaPublicacao = {
          id: publicacoes.length + 1,
          nome: titulo,
          topico,
          area,
          descricao,
          dataCriacao: new Date().toISOString(),
          status: 'active',
          imagens: images.length > 0 ? images : ['default-image-url']
        };
        setPublicacoes(prev => [...prev, novaPublicacao]);
        console.log('Publicação criada com sucesso.');
      }
      setShowCreateForm(false);
      setShowPublicationList(true);
    } catch (error) {
      console.error('Erro ao criar/atualizar publicação:', error);
      alert('Erro ao criar/atualizar publicação.');
    }
  };

  const handleCancelForm = () => {
    setShowCreateForm(false);
    setShowPublicationList(true);
    setSelectedButton('list');
  };

  const filterPublicationsByStatus = (status) => {
    return publicacoes.filter(pub => status === 'list' || pub.status === status);
  };

  const filteredPublications = filterPublicationsByStatus(selectedButton)
    .filter(pub => pub.nome.toLowerCase().includes(searchTerm.toLowerCase()));

  const renderPublications = (publications) => (
    <table className="publications-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome da Publicação</th>
          <th>Tópico</th>
          <th>Data de Criação</th>
          <th>Estado</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {publications.map((publicacao, index) => (
          <tr key={publicacao.id}>
            <td>{index + 1}</td>
            <td>{publicacao.nome}</td>
            <td>{publicacao.topico}</td>
            <td>{formatarData(publicacao.dataCriacao)}</td>
            <td>
              <span className={`status-badge ${publicacao.status}`}>
                {publicacao.status === 'active' ? 'Ativo' : 'Oculto'}
              </span>
            </td>
            <td>
              <FaInfoCircle className="info-icon clickable-icon" onClick={() => openDetalhes(publicacao)} />
              <FaBan className="ban-icon clickable-icon" />
              <FaPen className="edit-icon clickable-icon" onClick={() => handleEditClick(publicacao)} />
              <FaTrashAlt className="delete-icon clickable-icon" onClick={() => handleDeleteClick(publicacao.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  };

  return (
    <div className="div_princ">
      {!showCreateForm && !publicacaoDetalhada && (
        <>
          <h1 className="title2">Lista de Publicações</h1>

          <FilterOptions
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
            filterPublicationsByStatus={filterPublicationsByStatus}
            publicacoes={publicacoes}
            handleShowPublicationListClick={handleShowPublicationListClick}
            handleCreatePublicationClick={handleCreatePublicationClick}
          />

          <div className="search-bar">
            <FaMagnifyingGlass className="search-icon" />
            <input
              type="text"
              placeholder="Procurar por Publicação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </>
      )}

      {showCreateForm && (
        <Editar
          publicacao={editandoPublicacao}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelForm}
        />
      )}

      {showPublicationList && (
        <div className="publications-view">
          {filteredPublications.length === 0 ? (
            <div className='empty-message'>Nenhuma publicação disponível.</div>
          ) : (
            renderPublications(filteredPublications)
          )}
        </div>
      )}

      {publicacaoDetalhada && (
        <PublicacaoDetalhes publicacao={publicacaoDetalhada} onClose={closeDetalhes} />
      )}

      <DeleteModal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        onConfirmDelete={handleConfirmDelete}
        isSuccessModalOpen={isSuccessModalOpen}
        closeSuccessModal={closeSuccessModal}
      />
    </div>
  );
};

export default AlbumPartilha;
