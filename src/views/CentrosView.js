import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './CentrosView.css'; // Importe seus estilos CSS, se houver

const CentrosView = () => {
  const [centros, setCentros] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCentros = async () => {
      try {
        const response = await axios.get('https://backend-teste-q43r.onrender.com/centros/listarCentros');
        setCentros(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCentros();
  }, []);

  if (error) {
    return <div className="error-message">Erro ao buscar os centros: {error}</div>;
  }

  if (centros.length === 0) {
    return <div className='empty-message'>Nenhum centro disponível.</div>;
  }

  return (
    <div >
      <h2 >Lista de Centros</h2>
      <table >
        <thead>
          <tr>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {centros.map(centro => (
            <tr key={centro.id}>
              <td>{centro.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CentrosView;
