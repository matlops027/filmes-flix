import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFilme } from '../../services/api';
import Loading from '../../components/Loading';
import { LISTA_FILMES_KEY, URL_BASE_IMAGE, URL_BASE_YOUTUBE } from '../../constants';
import { toast } from 'react-toastify';
import './filme.css';

function Filme() {
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        buscarFilme();
    }, [navigate, id]);

    async function buscarFilme() {
        try {
            setLoading(true);
            const response = await getFilme(id);
            setFilme(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            navigate("/", { replace: true });
            return;
        }
    }

    function salvarFilme() {
        const minhaLista = localStorage.getItem(`${LISTA_FILMES_KEY}`);
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some(filmeSalvo => filmeSalvo.id === filme.id);
        if(hasFilme) {
            toast.warn('Esse filme já esta na sua lista!');
        }else {
            filmesSalvos.push(filme);
            localStorage.setItem(`${LISTA_FILMES_KEY}`, JSON.stringify(filmesSalvos));
            toast.success('Filme salvo com sucesso!');
        }
    }

    if(loading) {
        return (
            <Loading texto="filme" />
        );
    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`${URL_BASE_IMAGE}${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`${URL_BASE_YOUTUBE}${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Filme;