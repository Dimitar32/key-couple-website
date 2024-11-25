import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
    return (
        <header className="header">
            <h1>KeyCouple8</h1>
            <nav>
                <Link to="/">Продукти</Link>
                <Link to="/faq">Често задавани въпроси</Link>
            </nav>
        </header>
    );
};

export default Header;
