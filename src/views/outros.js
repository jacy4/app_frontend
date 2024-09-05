import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './outros.css';

function App() {
    const [areas, setAreas] = useState([]);
    const [centros, setCentros] = useState([]);
    const [nomeArea, setNomeArea] = useState('');
    const [nomeCentro, setNomeCentro] = useState('');
    const [moradaCentro, setMoradaCentro] = useState(''); 
    const [imagemCentro, setImagemCentro] = useState(null);

    // Estados para controlar a visibilidade das listas
    const [showAreas, setShowAreas] = useState(true);
    const [showCentros, setShowCentros] = useState(true);
 
    const fetchAreasAndCentros = () => {
        axios.get('https://backend-teste-q43r.onrender.com/areas/listarAreas')
            .then(res => setAreas(res.data))
            .catch(err => console.error("Erro ao buscar áreas:", err));

        axios.get('https://backend-teste-q43r.onrender.com/centros/listarCentros')
            .then(res => setCentros(res.data))
            .catch(err => console.error("Erro ao buscar centros:", err));
    };

    useEffect(() => {
        fetchAreasAndCentros(); 
    }, []);

    
    const handleCreateArea = () => {
        axios.post('https://backend-teste-q43r.onrender.com/areas/createArea', { nome: nomeArea }).then(res => {
            setAreas([...areas, res.data]);
            setNomeArea('');
        });
    };

    // Criar novo centro
    const handleCreateCentro = () => {
        axios.post('https://backend-teste-q43r.onrender.com/centros/criarCentro', { nome: nomeCentro, morada: moradaCentro}).then(res => {
            setCentros([...centros, res.data]);
            setNomeCentro('');
            setMoradaCentro('');
            setImagemCentro(null);
        })
        .catch(err => console.error("Erro ao criar centro:", err));
        console.log("Imagem centro:", imagemCentro);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("Arquivo selecionado:", file);
        setImagemCentro(file);
    };

    return (
        <div className="gerenciamento-areas-centros">
            <h1>Gerenciamento de Áreas e Centros</h1>

            <div>
                <h2>Criar Área</h2>
                <input
                    type="text"
                    value={nomeArea}
                    onChange={e => setNomeArea(e.target.value)}
                    placeholder="Nome da área"
                />
                <button onClick={handleCreateArea}>Criar Área</button>
            </div>

            <div>
                <h2>Criar Centro</h2>
                <input
                    type="text"
                    value={nomeCentro}
                    onChange={e => setNomeCentro(e.target.value)}
                    placeholder="Nome do centro"
                />
                <input
                    type="text"
                    value={moradaCentro}
                    onChange={e => setMoradaCentro(e.target.value)}
                    placeholder="Morada do centro"
                />
                <button onClick={handleCreateCentro}>Criar Centro</button>
            </div>

            <div>
                {/* Botão para mostrar/esconder áreas */}
                <button onClick={() => setShowAreas(!showAreas)}>
                    {showAreas ? 'Esconder Áreas' : 'Mostrar Áreas'}
                </button>
                
                {/* Mostrar lista de áreas se showAreas for true */}
                {showAreas && (
                    <>
                        <h2>Áreas Cadastradas</h2>
                        <ul>
                            {areas.map(area => (
                                <li key={area._id}>{area.nome}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>

            <div>
                {/* Botão para mostrar/esconder centros */}
                <button onClick={() => setShowCentros(!showCentros)}>
                    {showCentros ? 'Esconder Centros' : 'Mostrar Centros'}
                </button>
                
                {/* Mostrar lista de centros se showCentros for true */}
                {showCentros && (
                    <>
                        <h2>Centros Cadastrados</h2>
                        <ul>
                            {centros.map(centro => (
                                <li key={centro._id}>
                                    <p>Nome: {centro.nome ? centro.nome : 'Nome não disponível'}</p>
                                    <p>Morada: {centro.morada ? centro.morada : 'Morada não disponível'}</p>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
