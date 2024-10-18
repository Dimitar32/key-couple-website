import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
    return (
        <header className="header">
            <h1>KeyCouple{/*Disney Keychains*/}</h1>
            {/*<h1><a href="#general-info" >Disney Keychains</a></h1>*/}
            <nav>
                <Link to="/">Начало</Link>
                <Link to="/faq">Често задавани въпроси</Link>
                {/* <Link to="/cart">Количка</Link> */}
            </nav>
        </header>
    );
};

export default Header;
