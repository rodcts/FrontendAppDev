import React, { useState, useEffect } from 'react';

import './style.css';

function Main() {
    return (
        <main>
            <ul>
                {devs.map(dev => {
                    return (
                        <li key={dev._id} className="dev-item">
                            <header>
                                <img src={dev.avatar_url} alt={dev.name}></img>
                                <div className="user-info">
                                    <strong>{dev.name}</strong>
                                    <span>{dev.techs.join(', ')}</span>

                                    <p>{dev.bio}</p>
                                    <a
                                        href={`https://github.com/${github_username}`}
                                    >
                                        Acessar perfil no github
                                    </a>
                                </div>
                            </header>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}

export default Main;
