import React from 'react';
import { Link } from 'react-router-dom'; // Импортираме Link от react-router-dom
import './Products.css';
import Ariel from './Ariel.png';
import Shrek from './Shrek.png';
import Rapunzel from './Rapunzel.png';
import LionKing from './LionKing.png';
import Bunny from './Bunny.png';
import Bella from './Bella.png';
import ChristmasQuestionMark from './ChristmasQuestionMark.png';

const products = [
    { id: 1, name: 'Ерик и Ариел', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Ariel },
    { id: 2, name: 'Шрек и Фиона', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Shrek },
    { id: 4, name: 'Нала и Симба', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: LionKing },
    // { id: 3, name: 'Рапунцел и Флин', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Rapunzel },
    // { id: 5, name: 'Бъгс и Лола', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Bunny },
    { id: 6, name: 'Бел и Звяр', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Bella }
    // { id: 7, name: 'KeyCouple8 Коледен комплект', oldPrice: '59.90 лв', price: 'Очаквайте скоро', imageUrl: ChristmasQuestionMark},
];

const blurProducts = [
    // { id: 1, name: 'Ерик и Ариел', oldPrice: '35.99 лв', price: 'Очаквайте скоро', imageUrl: Ariel },
    { id: 7, name: 'KeyCouple8 Коледен комплект', oldPrice: '59.90 лв', price: 'Очаквайте скоро', imageUrl: ChristmasQuestionMark},
    { id: 3, name: 'Рапунцел и Флин', oldPrice: '35.99 лв', price: 'Очаквайте скоро', imageUrl: Rapunzel },
    // { id: 4, name: 'Нала и Симба', oldPrice: '35.99 лв', price: 'Очаквайте скоро', imageUrl: LionKing },
    { id: 5, name: 'Бъгс и Лола', oldPrice: '35.99 лв', price: 'Очаквайте скоро', imageUrl: Bunny }
    // { id: 6, name: 'Бел и Звяр', oldPrice: '35.99 лв', price: 'Очаквайте скоро', imageUrl: Bella }
];

const Products = () => {
    return (
        <section id="products" className="products-section">
            <h2 className="products-title">Продукти</h2>
            {products.map(product => (
                <Link to={`/product/${product.id}`} key={product.id} className="product-link">
                    <div key={product.id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p className="old-price">{product.oldPrice}</p> {/* Показване на старата цена със зачеркване */}
                        <p className="new-price">{product.price}</p> {/* Показване на новата цена */}
                    </div>
                </Link>
            ))}
            {blurProducts.map(product => (
                <Link to={`/notavl`} key={product.id} className="product-link">
                <div key={product.id} className="product-card">
                    <img src={product.imageUrl} alt={product.name} className="product-image-blur" />
                    {/* <div class="overlay"> */}
                        <h3>{product.name}</h3>
                        <p className="old-price">{product.oldPrice}</p> {/* Показване на старата цена със зачеркване */}
                        <p className="new-price">{product.price}</p> {/* Показване на новата цена */}
                    {/* </div> */}
                </div>
                </Link>
            ))}
        </section>
    );
};

export default Products;
