import React from 'react';
import '../botao_view_publicacoes/criar_publicacao.css'; //como os estilos sao extamente iguais, basta chamar para nao ter que repetir codigo

const CreateEventoButton = ({ onClick, iconSrc, iconBgColor, title, subtitle, isSelected }) => {
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

export default CreateEventoButton;

