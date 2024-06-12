import React from 'react';
import './view_publicacao.css';

const PublicacoesView = () => {
  const publicacoes = [
    {
      id: 1,
      titulo: 'Primeira Publicação',
      autor: 'João Silva',
      data: '2023-06-13',
      conteudo: 'Conteúdo da primeira publicação.'
    },
    {
      id: 2,
      titulo: 'Segunda Publicação',
      autor: 'Maria Oliveira',
      data: '2023-06-14',
      conteudo: 'Conteúdo da segunda publicação.'
    },
    // Adicione mais publicações conforme necessário
  ];

  return (
    <div className="publicacoes-view">
      <h1>Lista de Publicações</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Data</th>
            <th>Conteúdo</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {publicacoes.map((publicacao, index) => (
            <tr key={publicacao.id}>
              <td>{index + 1}</td>
              <td>{publicacao.titulo}</td>
              <td>{publicacao.autor}</td>
              <td>{new Date(publicacao.data).toLocaleDateString()}</td>
              <td>{publicacao.conteudo}</td>
              <td>
                <button onClick={() => handleEditPublicacao(publicacao.id)}>i</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const handleEditPublicacao = (id) => {
  // Lógica para editar a publicação
  console.log(`Editando publicação com id: ${id}`);
};

export default PublicacoesView;
