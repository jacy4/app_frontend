import React, { useState } from 'react';
import './criarAlbum.css';

const CriarAlbum = ({ formData, handleChange, handleImageChange, onSubmit, onCancel }) => {
  const [activeTab, setActiveTab] = useState('descricao');
  const [showFilters, setShowFilters] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    handleImageChange([...formData.images, ...files.map(file => URL.createObjectURL(file))]);
  };

  const handleInternalSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    setShowFilters(false); // Esconde os filtros ao clicar em "Criar"
  };

  return (
    <div className="album-container">
      {showFilters && (
        <div className="filter-container">
        </div>
      )}
      <div className="album-content">
        <div className="album-header">
          <h1 className="album-title">Criar Publicação</h1>
          <div className="album-author">
            <span>Autor :</span>
            <img src="https://i.ibb.co/7G5m74B/author.png" alt="Eu" className="album-author-icon" />
            <span>Eu</span>
          </div>
        </div>
        <div className="album-tabs">
          <button className={`album-tab ${activeTab === 'descricao' ? 'active' : ''}`} onClick={() => handleTabClick('descricao')}>
            <i className="fas fa-info-circle album-tab-icon"></i> Descrição
          </button>
          <button className={`album-tab ${activeTab === 'galeria' ? 'active' : ''}`} onClick={() => handleTabClick('galeria')}>
            <i className="fas fa-images album-tab-icon"></i> Galeria
          </button>
        </div>
        <div className="album-tab-content">
          {activeTab === 'descricao' && (
            <form onSubmit={handleInternalSubmit}>
              <div className="album-form-group">
                <label>Nome da Partilha</label>
                <input
                  type="text"
                  name="titulo"
                  placeholder="inserir nome da partilha"
                  value={formData.titulo}
                  onChange={handleChange}
                />
              </div>
              <div className="album-form-group">
                <label>Selecionar Local</label>
                <select name="area" value={formData.area} onChange={handleChange}>
                  <option value="">selecionar local</option>
                  <option value="local1">Local 1</option>
                </select>
              </div>
              <div className="album-form-group">
                <label>Selecionar Evento</label>
                <select name="topico" value={formData.topico} onChange={handleChange}>
                  <option value="">selecionar evento</option>
                  <option value="evento1">Evento 1</option>
                </select>
              </div>
              <div className="album-form-group">
                <label>Descrição da Partilha</label>
                <textarea
                  name="descricao"
                  placeholder="inserir uma breve descrição da partilha"
                  value={formData.descricao}
                  onChange={handleChange}
                />
              </div>
              <div className="album-form-buttons">
                <button type="button" className="album-cancel-button" onClick={onCancel}>Cancelar</button>
                <button type="submit" className="album-submit-button">Continuar</button>
              </div>
            </form>
          )}
          {activeTab === 'galeria' && (
            <div className="galeria-content">
              <div className="galeria-grid">
                {formData.images.map((image, index) => (
                  <div key={index} className="galeria-item">
                    <img src={image} alt={`Upload ${index}`} className="galeria-image" />
                  </div>
                ))}
                <div className="galeria-item upload-box">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="upload-input"
                  />
                  <div className="upload-placeholder">
                    <span>+</span>
                    <p>Upload</p>
                  </div>
                </div>
              </div>
              <p className="upload-info">A primeira foto será a foto de capa da partilha</p>
              <div className="album-form-buttons">
                <button type="button" className="album-cancel-button" onClick={onCancel}>Cancelar</button>
                <button type="button" className="album-submit-button" onClick={handleInternalSubmit}>Continuar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CriarAlbum;
