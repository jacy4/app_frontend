import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CentrosView() {
  const [centros, setCentros] = useState([]);

  useEffect(() => {
    axios.get('https://backend-teste-q43r.onrender.com/centros/listarCentros')
      .then(response => {
        setCentros(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os centros:', error);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Centros</h2>
      <table>
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
             
              {/* Adicione mais colunas conforme necessário */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CentrosView;
