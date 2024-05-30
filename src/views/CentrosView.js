import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './CentrosView.css'; // Importe seu arquivo de estilos CSS

const CentrosView = () => {
  const [centros, setCentros] = useState([]);

  useEffect(() => {
    const fetchCentros = async () => {
      try {
        const response = await axios.get('https://backend-teste-q43r.onrender.com/centros/listarCentros');
        setCentros(response.data);
      } catch (error) {
        console.error('Erro ao buscar os centros:', error);
      }
    };

    fetchCentros();
  }, []);

  if (centros.length === 0) {
    return <div className='empty-message'>Nenhum centro disponível.</div>;
  }

  return (
    <div >
      <h2 className="title">Lista de Centros</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Localização</th>
            {/* Adicione mais colunas conforme necessário */}
          </tr>
        </thead>
        <tbody>
          {centros.map(centro => (
            <tr key={centro.id}>
              <td>{centro.nome}</td>
              <td>{centro.localizacao}</td>
              {/* Adicione mais colunas conforme necessário */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CentrosView;
