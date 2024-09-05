import React from 'react';
import './PublicacaoDetalhes.css';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import CommentIcon from '@mui/icons-material/Comment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PublicacaoDetalhes = ({ publicacao, onClose }) => {
  if (!publicacao) return <div>Publicação não encontrada.</div>;

  const { nome, autor, descricao, imagens, dimensoes, horario, topico } = publicacao;

  return (
    <div className="pagina-detalhes-content">
      <div className="header">
        <button onClick={onClose} className="back-button">
          <ArrowBackIcon fontSize="inherit" />
        </button>
        <h1 className="publicacao-title">{nome}</h1>
        <div className="autor-info">
          <span>Autor: </span>
          <img src="autor-placeholder.png" alt="Imagem do Autor" className="autor-imagem" />
          <span>{autor || 'Desconhecido'}</span>
        </div>
      </div>
      <div className="content-body">
        <div className="section">
          <h2>
            <ImageIcon className="icon" /> Imagens da Partilha
          </h2>
          <div className="galeria">
            {imagens?.length > 0 ? (
              imagens.map((imagem, index) => (
                <img
                  key={index}
                  src={imagem}
                  alt={`Imagem ${index + 1} da Partilha`}
                  className="publicacao-detalhes-imagem"
                />
              ))
            ) : (
              <p>Nenhuma imagem disponível.</p>
            )}
          </div>
        </div>
        <div className="section">
          <h2>
            <DescriptionIcon className="icon" /> Descrição da Partilha
          </h2>
          <p>{descricao}</p>
        </div>
        <div className="section">
          <h2>
            <EventIcon className="icon" /> Local ou Evento Associado
          </h2>
          <div className="evento">
            <img src="http://www.xiquexique.ba.gov.br/uploads/post/image/534/FUTEBOL.png" alt="Evento" className="evento-imagem" />
            <div className="evento-info">
              <h3>Campeonato de Futebol</h3>
              <p>{dimensoes}</p>
              <p>{horario}</p>
            </div>
          </div>
        </div>
        <div className="section">
          <h2>
            <CommentIcon className="icon" /> Comentários e Avaliações
          </h2>
          <p>Nenhum comentário disponível.</p>
        </div>
      </div>
    </div>
  );
};

export default PublicacaoDetalhes;
