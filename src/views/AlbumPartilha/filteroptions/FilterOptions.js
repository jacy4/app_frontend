// FilterOptions.js
import React from 'react';
import CreatePublicationButton from '../../../componentes/botao_view_publicacoes/criar_publicacao';

const FilterOptions = ({
  selectedButton,
  setSelectedButton,
  handleShowPublicationListClick,
  handleCreatePublicationClick,
  filterPublicationsByStatus,
  publicacoes
}) => {
  const buttonOptions = [
    {
      id: 'list',
      iconSrc: 'https://i.ibb.co/P4nsk4w/Icon-criar.png',  // Total Shares Icon
      iconBgColor: '#e0f7fa',
      title: 'Partilhas totais',
      subtitle: publicacoes.length.toString(),
      onClick: () => {
        setSelectedButton('list');
        handleShowPublicationListClick();
      }
    },
    {
      id: 'active',
      iconSrc: 'https://i.ibb.co/D8QwJ6M/active-removebg-preview.png',  // Visible Icon
      iconBgColor: '#e0f7fa',
      title: 'Visiveis',
      subtitle: filterPublicationsByStatus('active').length.toString(),
      onClick: () => {
        setSelectedButton('active');
        filterPublicationsByStatus('active');
      }
    },
    {
      id: 'hidden',
      iconSrc: 'https://i.ibb.co/QK8rwq9/Icon-ocultas.png',  // Hidden Icon
      iconBgColor: '#FFE0EB',
      title: 'Ocultas',
      subtitle: filterPublicationsByStatus('hidden').length.toString(),
      onClick: () => {
        setSelectedButton('hidden');
        filterPublicationsByStatus('hidden');
      }
    },
    {
      id: 'reported',
      iconSrc: 'https://i.ibb.co/RPC7vW8/Icon-denuncia.png',  // Reported Icon
      iconBgColor: '#FFE0EB',
      title: 'Partilhas denunciadas',
      subtitle: filterPublicationsByStatus('reported').length.toString(),
      onClick: () => {
        setSelectedButton('reported');
        filterPublicationsByStatus('reported');
      }
    },
    {
      id: 'create',
      iconSrc: 'https://i.ibb.co/P4nsk4w/Icon-criar.png',  // Create Publication Icon
      iconBgColor: '#e0f7fa',
      title: 'Criar Publicação',
      subtitle: 'Criar...',
      onClick: () => {
        setSelectedButton('create');
        handleCreatePublicationClick();
      }
    }
  ];

  return (
    <div className="button-container">
      {buttonOptions.map(option => (
        <CreatePublicationButton
          key={option.id}
          onClick={option.onClick}
          iconSrc={option.iconSrc}
          iconBgColor={option.iconBgColor}
          title={option.title}
          subtitle={option.subtitle}
          isSelected={selectedButton === option.id}
        />
      ))}
    </div>
  );
};

export default FilterOptions;
