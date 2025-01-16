import {useState, useEffect, React} from 'react';
import { Link } from 'react-router-dom'; 
import './Products.css';
// import Ariel from './Ariel.png';
// import Shrek from './Shrek.png';
// import Rapunzel from './Rapunzel.png';
// import LionKing from './LionKing.png';
// import Bunny from './Bunny.png';
// import Bella from './Bella.png';
// import McQueen from './McQueen1.jpg';
// import LadyAndTheTramp from './LadyAndTheTramp1.png';
// import Christmas from './Christmas.jpg';

// const products = [
//     // { id: 7, name: 'KeyCouple8 Коледен комплект', oldPrice: '', price: '35.99 лв', imageUrl: Christmas},
//     { id: 1, name: 'Ерик и Ариел', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Ariel },
//     // { id: 2, name: 'Шрек и Фиона', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Shrek },
//     // { id: 4, name: 'Нала и Симба', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: LionKing },
//     { id: 3, name: 'Рапунцел и Флин', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Rapunzel },
//     // { id: 5, name: 'Бъгс и Лола', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Bunny },
//     // { id: 8, name: 'Макуин и Сали', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: McQueen },
//     { id: 4, name: 'Лейди и Скитника', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: LadyAndTheTramp },
//     { id: 7, name: 'Бел и Звяр', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Bella }
// ];

// const blurProducts = [
//     // { id: 1, name: 'Ерик и Ариел', oldPrice: '35.99 лв', price: 'Очаквайте скоро', imageUrl: Ariel },
//     // { id: 7, name: 'KeyCouple8 Коледен комплект', oldPrice: '59.90 лв', price: 'Очаквайте скоро', imageUrl: ChristmasQuestionMark},
//     { id: 5, name: 'Макуин и Сали', oldPrice: '??.?? лв', price: 'Изчерпано', imageUrl: McQueen },
//     // { id: 9, name: 'Лейди и Скитника', oldPrice: '??.?? лв', price: 'Скоро!', imageUrl: LadyAndTheTramp },
//     // { id: 3, name: 'Рапунцел и Флин', oldPrice: '??.?? лв', price: 'Изчерпано', imageUrl: Rapunzel },
//     { id: 6, name: 'Шрек и Фиона', oldPrice: '??.?? лв', price: 'Изчерпано', imageUrl: Shrek },
//     { id: 2, name: 'Нала и Симба', oldPrice: '??.?? лв', price: 'Изчерпано', imageUrl: LionKing },
//     { id: 8, name: 'Бъгс и Лола', oldPrice: '??.?? лв', price: 'Изчерпано', imageUrl: Bunny }//,
//     // { id: 6, name: 'Бел и Звяр', oldPrice: '??.?? лв', price: 'Изчерпано', imageUrl: Bella }
// ];

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

    // const location = useLocation();
    // const isHomePage = location.pathname === '/'; // Adjust if your home page route is different

    const [products, setProducts] = useState([]);
    const [blurProducts, setBlurProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const brand = 'KeyCouple8';
                // Dynamically update API URL based on the selected brand
                const url = brand ? `https://luminisapi.onrender.com/api/products?brand=${brand}` : "https://luminisapi.onrender.com/api/products";
                const response = await fetch(url);
                const data = await response.json();
    
                // Ensure backend response contains products array
                if (!data.products) throw new Error("Invalid API response");
    
                // Categorize products based on stock quantity
                const availableProducts = data.products.filter(product => product.quantity > 0);
                const outOfStockProducts = data.products.filter(product => product.quantity <= 0);
    
                setProducts(availableProducts);
                setBlurProducts(outOfStockProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
    
        fetchProducts(); // Fetch all products by default
    
    }, []); 
    
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
                        <h3>{product.productname}</h3>
                        <p className="old-price">{product.price}лв.</p> 
                        <p className="new-price">{product.discount_price}лв.</p>    
                        {/* <button className="add-to-cart-button" onClick={handleAddToCart}>Добави</button> */}
                    </div>
                </Link>
            ))}
            {blurProducts.map(product => (
                <Link to={`/notavl`} key={product.id} className="product-link">
                <div key={product.id} className="product-card-blur">
                    <img src={product.imageUrl} alt={product.name} className="product-image-blur" />
                        <h3>{product.productname}</h3>
                        <p className="product-card-blur-old-price">??.??лв.</p> 
                        <p className="new-price">Очаквайте скоро!</p> 
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
