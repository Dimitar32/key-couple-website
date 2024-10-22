import { useState } from 'react';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './ProductDetails.css';
import Ariel from '../Products/Ariel.png';
import Shrek from '../Products/Shrek.png';
import Rapunzel from '../Products/Rapunzel.png';
import LionKing from '../Products/Lion King.png';
import { CartContext } from '../contexts/CartContext'; 

const products = [
    { id: 1, name: 'Ерик и Ариел', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Ariel, description: 'Красив ключодържател с героите Ерик и Ариел.' },
    { id: 2, name: 'Шрек и Фиона', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Shrek, description: 'Забавен ключодържател с Шрек и Фиона.' },
    { id: 3, name: 'Рапунцел и Флин', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Rapunzel, description: 'Романтичен ключодържател с Рапунцел и Флин.' },
    { id: 4, name: 'Нала и Симба', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: LionKing, description: 'Ключодържател с Нала и Симба, героите от "Цар Лъв".' }
];

const ProductDetails = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    // const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
    
    const [isAdded, setIsAdded] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);
    

    // const toggleDescription = () => {
    //     setIsDescriptionVisible(!isDescriptionVisible);
    // };

    const [showModal, setShowModal] = useState(false);

    const handleOrderClick = () => {
        setShowModal(true); 
    };

    const handleCloseModal = () => {
        setShowModal(false); 
    };

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        name: product.name,
        quantity: 0,
        additionalInfo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send('service_b06m24g', 'template_mk02aun', formData, 'mjkXxA3GKaz2EgF9X')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Вашата поръчка е изпратена успешно!');
            })
            .catch((err) => {
                console.error('FAILED...', err);
                alert('Грешка при изпращането на поръчката.');
            });

        setFormData({
            fullName: '',
            phone: '',
            address: '',
            city: '',
            postalCode: '',
            country: '',
            name: product.name,
            quantity: 0,
            additionalInfo: ''
        });
    };

    const { addToCart } = useContext(CartContext); 

    const handleSubmitFastOrder = () =>{
        setIsOrdered(true);

        // Автоматично скриване на съобщението след 3 секунди
        setTimeout(() => {
            setIsOrdered(false);
        }, 3000);
    }

    // Функция за добавяне в количката и показване на съобщението
    const handleAddToCart = (product) => {
        addToCart(product); // Извиква съществуващата функция за добавяне в количката

        // Показване на съобщението
        setIsAdded(true);

        // Автоматично скриване на съобщението след 1.5 секунди
        setTimeout(() => {
            setIsAdded(false);
        }, 1500);
    };

    if (!product) {
        return <h2>Продуктът не е намерен</h2>;
    }

    return (
        <section id="products" className="product-details-section">
            <h2>{product.name}</h2>
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-details">
                {/* <button className="description-toggle" onClick={toggleDescription}>
                    {isDescriptionVisible ? 'Скрий описание' : 'Покажи описание'}
                </button>
                {isDescriptionVisible && <p className="product-description">{product.description}</p>} */}

                {/* <p className="product-description">{product.description}</p> */}
                <p className="old-price">Стара Цена: {product.oldPrice}</p>
                <p className="product-price">Цена: {product.price}</p>
                <div className="product-buttons">
                    <button className="order-button" onClick={() => handleAddToCart(product)}>Добави в количката</button>
                    <button className="order-button" onClick={handleOrderClick}>Бърза поръчка</button>
                </div>


            </div>

            {/* Показване на съобщението, когато е добавено в количката */}
            {isAdded && (
                <div className="modal">
                    <div className="modal-content">
                    
                        
                        <p>
                            Успешно добавено в количката!
                        </p>
                    </div>
                </div>
            )}

             {/* Показване на съобщението, когато е добавено в количката */}
             {isOrdered && (
                <div className="cart-message">
                    Благодарим за поръчката!
                </div>
            )}
            
            {/* Модал */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}> &times;{/*times;*/}</span>
                        {/* <h2>Попълни данните за поръчка</h2> */}
                        {/* <form className="order-form">
                            <label>
                                Име:
                                <input type="text" name="name" required />
                            </label>
                            <label>
                                Адрес:
                                <input type="text" name="address" required />
                            </label>
                            <label>
                                Телефон:
                                <input type="tel" name="phone" required />
                            </label>
                            <button type="submit">Изпрати поръчка</button>
                        </form> */}
                        <form  onSubmit={handleSubmit} className="order-form">
                            <label>
                                Име и Фамилия:
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Телефон:
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Брой {product.name} :
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                />
                            </label>
                            <label>
                                Адрес на офис на Еконт:
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Град:
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <button type="submit" onClick={() => handleSubmitFastOrder(product)}>Поръчай</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductDetails;
