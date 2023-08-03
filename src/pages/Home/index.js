import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNowPlayingMovies } from '../../services/api';
import { URL_BASE_IMAGE } from '../../constants';
import './home.css';
import Loading from '../../components/Loading';


function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        carregarFilmes();
    }, [])

    async function carregarFilmes() {
        try {
            setLoading(true);
            const response = await getNowPlayingMovies();
            setFilmes(response.data.results.slice(0,10));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    if(loading) {
        return (
            <Loading texto="filmes" />
        );
    }


    return (
        <div className='container'>
            <div className='lista-filmes'>
                {
                    filmes.map((filme) => {
                        return (
                            <article key={filme.id}>
                                <strong>{filme.title}</strong>
                                <img src={`${URL_BASE_IMAGE}${filme.poster_path}`} alt={filme.title}></img>
                                <Link to={`/filme/${filme.id}`}>Acessar</Link>
                            </article>
                        )
                    })
                }
            </div>
        </div>        
    )
}

export default Home;