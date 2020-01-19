import React, { useState, useEffect } from 'react';
import api from './server/api';
import './App.css';
import './Sidebar.css';
import './global.css';
import './Main.css';
import './style.css';
import Main from '../main/index'

function App() {
    const [devs, setDevs] = useState([]);

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const [github_username, setGithubusername] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            },
            err => {
                console.info(err);
            },
            {
                timeout: 30000,
            }
        );
    }, []); // array vazio, executa uma unica vez.

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs/list');

            console.log(response.data);

            setDevs(response.data);
        }

        loadDevs();
    }, []);

    async function handleAddDev(e) {
        e.preventDefault(); // previne o comportamento padrao de um formulario que é de envio.

        const response = await api.post('/devs/store', {
            github_username,
            techs,
            latitude,
            longitude,
        });

        console.log('===>>',response.data);
        // const { github_username } = response.data;
        console.info(`${github_username} inseridos com sucesso`);
        handleResetField();
    }

    let handleResetField = () => {
        const github_usernameField = '';
        const techsField = '';

        setGithubusername(github_usernameField);
        setTechs(techsField);
    };
    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                <form onSubmit={handleAddDev}>
                    <div className="input-block">
                        <label htmlFor="github_username">Usuario Git</label>
                        <input
                            name="github_username"
                            id="github_username"
                            value={github_username}
                            onChange={e => setGithubusername(e.target.value)}
                            required
                        ></input>
                    </div>
                    <div className="input-block">
                        <label htmlFor="techs">Tecnologias</label>
                        <input
                            name="techs"
                            id="techs"
                            value={techs}
                            onChange={e => setTechs(e.target.value)}
                            required
                        ></input>
                    </div>
                    <div className="input-group">
                        <div className="input-block">
                            <label htmlFor="latencia">Latitude</label>
                            <input
                                name="latencia"
                                id="latencia"
                                type="number"
                                required
                                value={latitude}
                                onChange={e => setLatitude(e.target.value)}
                            ></input>
                        </div>
                        <div className="input-block">
                            <label htmlFor="longitude">Longitude</label>
                            <input
                                name="longitude"
                                id="longitude"
                                type="number"
                                required
                                value={longitude}
                                onChange={e => setLongitude(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div>
                        <button type="submit">SALVAR</button>
                    </div>
                </form>
            </aside>
            <Main />
        </div>
    );
}

export default App;
