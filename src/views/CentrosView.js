import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";
const CentrosView = () => {
  const [centros, setCentros] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const buscarCentros = async () => {
      try {
        const response = await axios.get('https://backend-teste-q43r.onrender.com/centros/listarCentros');
        if (response.data && Array.isArray(response.data)) {
          // console.log(response.data);
          setCentros(response.data);
        } else {
          console.error('Resposta da API vazia ou formato de dados incorreto');
        }
      } catch (error) {
        console.error('Erro ao buscar centros:', error);
        setError(error.message);
      }
    };

   buscarCentros(); 

  }, []); // Faz a chamada do useEffect uma única vez, passando um array vazio de dependências

  if (centros.length === 0) {
    return <div className='empty-message'>Nenhum centro disponível.</div>;
  }

 return (
  <div className='fundo_principal_porcausa_do_side_bar'>
    <div className="inner-div">
      <h2>Lista de Centros</h2>
      <table>
        <thead>
        <tr>
            <th>#</th> {/* Cabeçalho para o símbolo # */}
            <th>Nome</th> {/* Cabeçalho para o nome */}
          </tr>
        </thead>
        <tbody>
          {centros.map(centro => (
            <tr key={centro.id}>
              <td>{centro.id}</td>
              <td>{centro.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default CentrosView;
