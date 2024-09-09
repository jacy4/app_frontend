import React from 'react';
import { FaCalendarAlt, FaShareAlt, FaComments, FaFileAlt } from 'react-icons/fa'; // Ícones do Font Awesome
import './card_area.css';

const Card = ({ title, events,mostCommentedEvent, pendingApproval, shares, messages, posts, icon, backgroundColor, backgroundImage }) => {
  return (
    <div className="card" style={{ borderColor: backgroundColor }}>
      <div className="card-icon-container" style={{ backgroundColor }}>
        <div className="card-icon">
          <img src={icon} alt={`${title} icon`} />
        </div>
      </div>
      <div className="card-text" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <h2 className="card-title">{title}</h2>
        <div className="card-item">
          <FaCalendarAlt className="item-icon" />
          {events} Eventos
        </div>
        {mostCommentedEvent && (
  <div className="card-item">
    <FaCalendarAlt className="item-icon" />
    Evento mais comentado: {mostCommentedEvent}
  </div>
)}
        <div className="card-item">
          <FaCalendarAlt className="item-icon" />
          {pendingApproval} Eventos Por validar
        </div>
        <div className="card-item">
          <FaShareAlt className="item-icon" />
          {shares} Partilhas
        </div>
        <div className="card-item">
          <FaComments className="item-icon" />
          {messages} Mensagens
        </div>
        <div className="card-item">
          <FaFileAlt className="item-icon" />
          {posts} Publicações
        </div>
      </div>
    </div>
  );
};

export default Card;
