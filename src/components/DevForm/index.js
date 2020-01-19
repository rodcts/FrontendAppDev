import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }) {
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

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });
        handleResetField();
    }

    function handleResetField() {
        const github_usernameField = '';
        const techsField = '';

        setGithubusername(github_usernameField);
        setTechs(techsField);
    }

    return (
        <form onSubmit={handleSubmit}>
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
    );
}

export default DevForm;
