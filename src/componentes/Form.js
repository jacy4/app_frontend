import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const [activeTab, setActiveTab] = useState('Descrição');

  const renderContent = () => {
    switch (activeTab) {
      case 'Descrição':
        return (
          <form className="form">
            <div className="form-group">
              <label htmlFor="area">Área do Local</label>
              <select id="area">
                <option value="desporto">Desporto</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="topic">Tópico do Local</label>
              <select id="topic">
                <option value="">selecionar tópico</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="name">Nome do local</label>
              <input type="text" id="name" placeholder="inserir nome do local" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descrição do local</label>
              <textarea id="description" placeholder="inserir uma breve descrição do local"></textarea>
            </div>
            <div className="form-buttons">
              <button type="button" className="cancel">Cancelar</button>
              <button type="submit" className="continue">Continuar</button>
            </div>
          </form>
        );
      case 'Galeria':
        return <div className="tab-content">Galeria Content</div>;
      case 'Horário':
        return <div>Horário Content</div>;
      case 'Localização':
        return <div>Localização Content</div>;
      case 'Comentários':
        return <div>Comentários Content</div>;
      case 'Mais Informações':
        return <div>Mais Informações Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Nome do local</h2>
      <div className="tabs">
        {['Descrição', 'Galeria', 'Horário', 'Localização', 'Comentários', 'Mais Informações'].map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {renderContent()}
    </div>
  );
};

export default Form;
