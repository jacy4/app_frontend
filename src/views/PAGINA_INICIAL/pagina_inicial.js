import React, { useState, useEffect } from 'react';
import { Radar, Line } from 'react-chartjs-2'; // Importa o componente Radar
import { Chart as ChartJS, RadarController, Filler, Legend, Tooltip, Title, LinearScale, RadialLinearScale, CategoryScale, PointElement, LineController, LineElement} from 'chart.js';
import axios from 'axios'; // Certifique-se de importar axios para fazer as requisições
import './pagina_inicial.css';

ChartJS.register(
    RadarController,
    Filler,
    Legend,
    Tooltip,
    CategoryScale,
    LinearScale,
    Title,
    LineElement,
    LineController,
    PointElement,
    RadialLinearScale // Registro da escala radialLinear
  );

const PaginaInicial = () => {
  const [modelNames, setModelNames] = useState([]);
  const [modelCounts, setModelCounts] = useState([]);
  const [labels, setLabels] = useState([]);
  const [data2, setData] = useState([]);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/eventos/modelcount'); 
        const { labels, values } = response.data; // Desestrutura os dados recebidos da API
        // console.log(labels)
        // console.log(values)
        setModelNames(labels); // Define os nomes dos modelos
        setModelCounts(values); // Define as contagens dos modelos
      } catch (error) {
        console.error('Erro ao buscar contagem de modelos:', error);
      }
    };
    const fetchMonthly = async () => {
        try {
          const response = await axios.get('http://localhost:3000/eventos/monthlycounts'); 
          const monthlyCounts = response.data; // Supondo que a resposta é um objeto com a estrutura mencionada

        // Processar dados
        const years = Object.keys(monthlyCounts);
        const labels = [];
        const datasets = [];

        years.forEach(year => {
          const months = Object.keys(monthlyCounts[year]);
          months.forEach(month => {
            labels.push(`${month} ${year}`);
            datasets.push(monthlyCounts[year][month]);
          });
        });

        setLabels(labels);
        setData(datasets);
        } catch (error) {
          console.error('Erro ao buscar contagem de modelos:', error);
        }
      };
  
    fetchCount(); // Chama a função de busca de dados
    // fetchMonthly(); // Chama a função de busca de dados
  }, []);

  // Configuração de dados para o Radar Chart
  const data = {
    labels: modelNames, // Usando os nomes dos modelos como rótulos
    datasets: [
      {
        label: 'Contagem de Elementos',
        data: modelCounts, // Usando as contagens como dados do gráfico
        backgroundColor: 'rgba(34, 202, 236, 0.2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(34, 202, 236, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(34, 202, 236, 1)',
      },
    ],
  };

  // Opções de configuração do Radar Chart
  const options = {
    responsive: true,
    scales: {
      r: {
        ticks: {
          color: 'white', // Cor dos números no eixo radial
        },
        grid: {
          color: 'white', // Cor das linhas de grade do gráfico
        },
        angleLines: {
          color: 'white', // Cor das linhas que conectam os eixos
        },
        pointLabels: {
          color: 'white', // Cor dos rótulos dos pontos
        },
      },
    },
    elements: {
      line: {
        borderColor: 'white', // Cor da linha do gráfico
      },
      point: {
        backgroundColor: 'white', // Cor dos pontos
        borderColor: 'white', // Cor da borda dos pontos
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white', // Cor do texto da legenda
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            // Personaliza o título do tooltip
            return tooltipItems[0].label;
          },
          label: (tooltipItem) => {
            // Personaliza o texto do tooltip
            return `Valor: ${tooltipItem.raw}`;
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo do tooltip
        titleColor: 'white', // Cor do título do tooltip
        bodyColor: 'white', // Cor do corpo do tooltip
      },
    },
  };

  const chartData = {
    labels: labels, // Rótulos do gráfico
    datasets: [
      {
        label: 'Número de Eventos',
        data: data, // Dados do gráfico
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        fill: true, // Preenchimento abaixo da linha
      }
    ],
  };

  // Opções de configuração do gráfico de linhas
  const options2 = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Meses e Anos'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Número de Eventos'
        },
        beginAtZero: true // Inicia o eixo y em zero
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Eventos: ${context.raw}`;
          }
        }
      }
    }
  };

  return (
    <div className="div_princ">
      <h1 className="title2">Página Inicial</h1>
      <div className="cards-container">
        <Radar data={data} options={options} className="radar-chart" />
      </div>
      <div className="cards-container">
        <div className="chart-container">
          <Line data={chartData} options={options2} /> {/* Renderiza o gráfico de linhas */}
        </div>
      </div>
    </div>
  );
};

export default PaginaInicial;
