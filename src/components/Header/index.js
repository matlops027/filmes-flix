import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
    return (
        <header>
            <Link className='logo' to="/">Filmes Flix</Link>
            <Link className='favoritos' to="/favoritos">Meus filmes</Link>
        </header>
    )
}

export default Header;