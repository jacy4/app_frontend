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
      <div className="imagens-container">
        {imagens.map((imagem, index) => (
          <img key={index} src={imagem} alt={`Imagem ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default ImagensView;
