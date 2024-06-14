import React from 'react';
import './criar_publicacao.css';

const CreatePublicacaoButton = ({ onClick, iconSrc, iconBgColor, title, subtitle, isSelected }) => {
  return (
    <div className={`create-user-button ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      <div className="icon-container" style={{ backgroundColor: iconBgColor }}>
        <img src={iconSrc} alt="Create Icon" className="icon" />
      </div>
      <div className="text-container">
        <p className="title">{title}</p>
        <p className="subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default CreatePublicacaoButton;
