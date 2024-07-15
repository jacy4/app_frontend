import React from 'react';
import './pagina_inicial.css';
import Card from '../../componentes/pagina_inicial/card_area';

const PaginaInicial = () => {
  const cardsData = [
    {
      title: 'Desporto',
      events: 0,
      shares: 0,
      messages: 0,
      posts: 0,
      icon: 'https://i.ibb.co/DKP7SQG/Area-desporto.png',
      backgroundColor: '#4BA900',
      backgroundImage: 'https://i.ibb.co/0n7WgQM/Screenshot-4-removebg-preview.png' // URL da imagem de fundo
    },
    {
      title: 'Saúde',
      events: 0,
      shares: 0,
      messages: 0,
      posts: 0,
      icon: 'https://i.ibb.co/x8kydZy/area-saude-removebg-preview.png',
      backgroundColor: '#8F3023',
      backgroundImage: 'https://i.ibb.co/7jyNVHm/Screenshot-5-removebg-preview-1.png' // URL da imagem de fundo
    },
    {
      title: 'Formação',
      events: 0,
      shares: 0,
      messages: 0,
      posts: 0,
      icon: 'https://i.ibb.co/60Mcjk4/area-forma-o-removebg-preview.png',
      backgroundColor: '#3879C6',
      backgroundImage: 'https://i.ibb.co/HCTtfGp/Screenshot-7-removebg-preview.png' // URL da imagem de fundo
    },
    {
      title: 'Alojamento',
      events: 0,
      shares: 0,
      messages: 0,
      posts: 0,
      icon: 'https://i.ibb.co/zG9X8Fj/area-alojamento-removebg-preview.png',
      backgroundColor: '#825521',
      backgroundImage: 'https://i.ibb.co/5vgXygJ/Screenshot-8-removebg-preview.png' // URL da imagem de fundo
    },
    {
      title: 'Lazer',
      events: 0,
      shares: 0,
      messages: 0,
      posts: 0,
      icon: 'https://i.ibb.co/pr4TKCy/area-lazer-removebg-preview.png',
      backgroundColor: '#25ABAB',
      backgroundImage: 'https://i.ibb.co/Hdcg9j0/Screenshot-10-removebg-preview.png'
    },
    {
      title: 'Gastronomia',
      events: 0,
      shares: 0,
      messages: 0,
      posts: 0,
      icon: 'https://i.ibb.co/TwMHTCc/area-gastronomia-removebg-preview.png',
      backgroundColor: '#AA1D7A',
      backgroundImage: 'https://i.ibb.co/yYRy6P6/Screenshot-6-removebg-preview.png' // URL da imagem de fundo
    },
    {
        title: 'Transportes',
        events: 0,
        shares: 0,
        messages: 0,
        posts: 0,
        icon: 'https://i.ibb.co/4pFgN7f/area-transportes-removebg-preview.png',
        backgroundColor: '#B8BB06',
        backgroundImage: 'https://i.ibb.co/k3dVkMG/Screenshot-9-removebg-preview.png' // URL da imagem de fundo
    },
  ];

  return (
    <div className="div_princ">
      <h1 className="title2">Página Inicial</h1>
      <div className="cards-container">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            events={card.events}
            shares={card.shares}
            messages={card.messages}
            posts={card.posts}
            icon={card.icon}
            backgroundColor={card.backgroundColor}
            backgroundImage={card.backgroundImage} // Passa a URL da imagem de fundo
          />
        ))}
      </div>
    </div>
  );
};

export default PaginaInicial;
