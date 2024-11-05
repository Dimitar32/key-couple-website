import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.css';
import {
    FaFacebookF,
    FaInstagram,
    FaTiktok
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-links">
                <a
                    target="_blank" rel="noopener noreferrer"
                    href="https://www.facebook.com/profile.php?id=61566904842905"
                    aria-label="Facebook"
                    >
                    <FaFacebookF />
                </a>

                <a
                    target="_blank" rel="noopener noreferrer"
                    href="https://www.instagram.com/keycouple8/"
                    aria-label="Instagram"
                    >
                    <FaInstagram />
                </a>

                <a
                    target="_blank" rel="noopener noreferrer"
                    href="https://www.tiktok.com/@keycouple8"
                    aria-label="TikTok"
                    >
                    <FaTiktok />
                </a>
            </div>
            <p>Тел: +359 879 330 389</p>
            <p>Свържете се с нас: keycouple@outlook.com</p>
            <Link to="/delivery" className='link'>Правила за доставка</Link>
            
            <p style={{ marginTop: '20px' }}>&copy; {new Date().getFullYear()} KeyCouple8. Всички права запазени.</p>
        </footer>
    );
};

export default Footer;
