import React, { useState } from 'react';
import './CriarPublicacaoView.css';

const CriarPublicacaoView = ({ onSubmit }) => {
  const [activeTab, setActiveTab] = useState('descricao');
  const [topico, setTopico] = useState('');
  const [titulo, setTitulo] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ titulo, topico });
  };

  return (
    <div className="criar-publicacao-container">
      <div className="header">
        <h2>Criar Publicação</h2>
        <div className="author">
          <span>Autor :</span>
          <img src="https://i.ibb.co/7G5m74B/author.png" alt="Eu" className="author-icon" />
          <span>Eu</span>
        </div>
      </div>
      <div className="tabs">
        <button className={`tab ${activeTab === 'descricao' ? 'active' : ''}`} onClick={() => handleTabClick('descricao')}>Descrição</button>
        <button className={`tab ${activeTab === 'galeria' ? 'active' : ''}`} onClick={() => handleTabClick('galeria')}>Galeria</button>
        <button className={`tab ${activeTab === 'horario' ? 'active' : ''}`} onClick={() => handleTabClick('horario')}>Horário</button>
        <button className={`tab ${activeTab === 'localizacao' ? 'active' : ''}`} onClick={() => handleTabClick('localizacao')}>Localização</button>
        <button className={`tab ${activeTab === 'comentarios' ? 'active' : ''}`} onClick={() => handleTabClick('comentarios')}>Comentários</button>
        <button className={`tab ${activeTab === 'mais_informacoes' ? 'active' : ''}`} onClick={() => handleTabClick('mais_informacoes')}>Mais Informações</button>
      </div>
      <div className="tab-content">
        {activeTab === 'descricao' && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Área do Local</label>
              <select>
                <option>Desporto</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tópico do Local</label>
              <select value={topico} onChange={(e) => setTopico(e.target.value)}>
                <option value="">selecionar tópico</option>
                <option value="futebol">Futebol</option>
                <option value="basquete">Basquete</option>
              </select>
            </div>
            <div className="form-group">
              <label>Nome do local</label>
              <input type="text" placeholder="inserir nome do local" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Descrição do local</label>
              <textarea placeholder="inserir uma breve descrição do local"></textarea>
            </div>
            <div className="form-buttons">
              <button type="button" className="cancel-button">Cancelar</button>
              <button type="submit" className="submit-button">Continuar</button>
            </div>
          </form>
        )}
        {activeTab === 'galeria' && <div>Galeria de imagens</div>}
        {activeTab === 'horario' && <div>Horário de funcionamento</div>}
        {activeTab === 'localizacao' && <div>Localização no mapa</div>}
        {activeTab === 'comentarios' && <div>Comentários dos usuários</div>}
        {activeTab === 'mais_informacoes' && <div>Mais informações sobre o local</div>}
      </div>
    </div>
  );
};

export default CriarPublicacaoView;
