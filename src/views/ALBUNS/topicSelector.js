import React from 'react';

const TopicSelector = ({ topics, selectedTopic, onChange }) => {
  console.log('topics:', topics); // Verifica os tópicos recebidos
  console.log('Array.isArray(topics):', Array.isArray(topics)); // Confirma se é um array

  if (!Array.isArray(topics)) {
    return <div></div>;
  }

  return (
    <select value={selectedTopic} onChange={(e) => onChange(e.target.value)}>
      <option value="all">Todos os tópicos</option>
      {topics.map((topic) => (
        <option key={topic.id} value={topic.id}>
          {topic.nome}
        </option>
      ))}
    </select>
  );
};
export default TopicSelector;





