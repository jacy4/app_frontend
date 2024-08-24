import React from 'react';

const TopicSelector = ({ topics, selectedTopic, onChange }) => {
    return (
      <select value={selectedTopic} onChange={(e) => onChange(e.target.value)}>
        <option value="">Selecione um tópico</option>
        {topics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.nome}
          </option>
        ))}
      </select>
    );
  };

export default TopicSelector;
