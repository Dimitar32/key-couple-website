import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Импорт на CSS стиловете

const Header = () => {
    return (
        <header className="header">
            <h1>KeyCouple{/*Disney Keychains*/}</h1>
            {/*<h1><a href="#general-info" >Disney Keychains</a></h1>*/}
            <nav>
                {/*{/*<a href="#general-info">Начало</a>
                <a href="#products">Продукти</a>
                <a href="#order-form">Поръчай</a>
                <a href="#faq">Често задавани въпроси</a>*/}

                <Link to="/">Начало</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/cart">Количка</Link>
            </nav>
        </header>
    );
};

export default Header;
