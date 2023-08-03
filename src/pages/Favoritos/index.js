import { useEffect, useState } from 'react';
import { LISTA_FILMES_KEY } from '../../constants';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        getFilmesFavoritos();
    }, []);

    function getFilmesFavoritos() {
        const minhaLista = localStorage.getItem(`${LISTA_FILMES_KEY}`);
        setFilmes(JSON.parse(minhaLista) || []);
    }

    function excluirFilme(idFilme) {
        const filtroFilmes = filmes.filter(filme => filme.id !== idFilme);
        setFilmes(filtroFilmes);
        localStorage.setItem(`${LISTA_FILMES_KEY}`, JSON.stringify(filtroFilmes));
        toast.success('Filme removido com sucesso!')
    }

    return (
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>
            {filmes.length === 0 && <span>Você não possui nenhum filme salvo!</span>}
            <ul>
                {
                    filmes.map(filme => {
                        return (
                            <li key={filme.id}>
                                <span>{filme.title}</span>
                                <div>
                                    <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                    <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
                                </div>
                            </li>   
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Favoritos;