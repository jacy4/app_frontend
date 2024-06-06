import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";

const ImagensView = () => {
  const [imagens, setImagens] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImagens = async () => {
      try {
        const response = await axios.get('https://backend-teste-q43r.onrender.com/imagens');
        setImagens(response.data);
      } catch (error) {
        console.error('Erro ao buscar imagens:', error);
        setError(error.message);
      }
    };

    fetchImagens(); 
  }, []);

  return (
    <div className='fundo_principal_porcausa_do_side_bar'>
      <h2>Imagens Disponíveis</h2>
      {error && <p>{error}</p>}
      <div className='imagens-container'>
        {imagens.length > 0 ? (
          imagens.map((imagem, index) => (
            <img key={index} src="/opt/render/project/src/IMAGENS/image-1717659748028-163118690.png" alt={`Imagem ${index + 1}`} />
          ))
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
};

export default ImagensView;
