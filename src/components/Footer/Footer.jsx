import React from 'react';
import './Footer.css';
import {
    FaFacebookF,
    FaInstagram,
    FaTiktok
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <p>Свържете се с нас: keycouple@outlook.com</p>
            <p>Тел: +359 879 330 389</p>
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
        </footer>
    );
};

export default Footer;
