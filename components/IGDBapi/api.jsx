import React, { useEffect, useState } from 'react';
import credentials from '../../credentials/twtich.json'

const client_id = credentials.id_cliente
const client_secret = credentials.cliente_secret

export const ApiIGDB = () => {

    const [ jogos, setJogos ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ accessToken, setAccessToken ] = useState([]);

        
    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const response = await fetch('https://id.twitch.tv/oauth2/token', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                    client_id: client_id,
                    client_secret: client_secret,
                    grant_type: 'client_credentials',
                    })
                })
            

                if (!response.ok) {
                    throw new Error('Erro ao obter o token de acesso')
                }
      
                const data = await response.json();
                setAccessToken(data.access_token);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }

        fetchAccessToken();
    }, []);

    useEffect(() => {
        const getGames = async () => {
            try {
                const response = await fetch('https://api.igdb.com/v4/games', {
                    method: 'POST',
                    headers: {
                        'Client-ID': client_id,
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "fields": "cover.url",
                        "search" : "Alan Wake 2"
                    })
                })

                const data = await response.json()
                console.log(data)
                setJogos(data)
            } catch (err) {
                setError(err)
                setLoading(false)
            }
        }

        getGames()
    },[accessToken])

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error.message}</div>;

    return (
        <div>
            <h1>Jogos da IGDB</h1>
            <ul>
                <img src="{jogos[0]}" alt="aaa" />
            </ul>
        </div>
    );
};
