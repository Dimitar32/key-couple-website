import {/*useState,*/ React} from 'react';
import { Link } from 'react-router-dom'; // Импортираме Link от react-router-dom
import './Products.css';
import Ariel from './Ariel.png';
import Shrek from './Shrek.png';
import Rapunzel from './Rapunzel.png';
import LionKing from './LionKing.png';
import Bunny from './Bunny.png';
import Bella from './Bella.png';
// import Christmas from './Christmas.jpg';

const products = [
    // { id: 7, name: 'KeyCouple8 Коледен комплект', oldPrice: '', price: '35.99 лв', imageUrl: Christmas},
    { id: 1, name: 'Ерик и Ариел', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Ariel },
    { id: 2, name: 'Шрек и Фиона', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Shrek },
    { id: 4, name: 'Нала и Симба', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: LionKing },
    // { id: 3, name: 'Рапунцел и Флин', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Rapunzel },
    // { id: 5, name: 'Бъгс и Лола', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Bunny },
    { id: 6, name: 'Бел и Звяр', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Bella }
];

const blurProducts = [
    // { id: 1, name: 'Ерик и Ариел', oldPrice: '35.99 лв', price: 'Очаквайте скоро', imageUrl: Ariel },
    // { id: 7, name: 'KeyCouple8 Коледен комплект', oldPrice: '59.90 лв', price: 'Очаквайте скоро', imageUrl: ChristmasQuestionMark},
    { id: 3, name: 'Рапунцел и Флин', oldPrice: '??.?? лв', price: 'Изчерпано', imageUrl: Rapunzel },
    // { id: 4, name: 'Нала и Симба', oldPrice: '35.99 лв', price: 'Очаквайте скоро', imageUrl: LionKing },
    { id: 5, name: 'Бъгс и Лола', oldPrice: '??.?? лв', price: 'Изчерпано', imageUrl: Bunny }
    // { id: 6, name: 'Бел и Звяр', oldPrice: '35.99 лв', price: 'Очаквайте скоро', imageUrl: Bella }
];

const Products = () => {
    // const [isAdded, setIsAdded] = useState(false);

    // const handleAddToCart = (product, quantity, value) => {
    //     if (product.id === 7 && !value) {
    //         alert('Моля, изберете опция преди да добавите този продукт в количката.');
    //         return;
    //     }

    //     addToCart(product, quantity, value); 

    //     if (quantity > 0) {
    //         setIsAdded(true);
    //     } else if (quantity === 0) {
    //         cantAddZeroToCart(true);
    //     }

    //     setTimeout(() => {
    //         cantAddZeroToCart(false);
    //         setIsAdded(false);
    //     }, 1500);
    // };


    return (
        <section id="products" className="products-section">
            <h2 className="products-title">Продукти</h2>
            {products.map(product => (
                <Link to={`/product/${product.id}`} key={product.id} className="product-link">
                    <div key={product.id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <div class="discount-label">
                            <span>-28%</span>
                        </div>
                        <h3>{product.name}</h3>
                        <p className="old-price">{product.oldPrice}</p> 
                        <p className="new-price">{product.price}</p>    
                        {/* <button className="add-to-cart-button" onClick={handleAddToCart}>Добави</button> */}
                    </div>
                </Link>
            ))}
            {blurProducts.map(product => (
                <Link to={`/notavl`} key={product.id} className="product-link">
                <div key={product.id} className="product-card-blur">
                    <img src={product.imageUrl} alt={product.name} className="product-image-blur" />
                        <h3>{product.name}</h3>
                        <p className="product-card-blur-old-price">{product.oldPrice}</p> {/* Показване на старата цена със зачеркване */}
                        <p className="new-price">{product.price}</p> {/* Показване на новата цена */}
                </div>
                </Link>
            ))}
        
        {/* {isAdded && (
            <div className="modal">
                <div className="modal-content">
                    <p>
                        Успешно добавено в количката!
                    </p>
                </div>
            </div>
        )} */}
        </section>
    );
};

export default Products;
