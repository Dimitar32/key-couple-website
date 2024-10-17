import { useState } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './ProductDetails.css';
import Ariel from '../Products/Ariel.png';
import Shrek from '../Products/Shrek.png';
import Rapunzel from '../Products/Rapunzel.png';
import LionKing from '../Products/Lion King.png';

const products = [
    { id: 1, name: 'Ерик и Ариел', price: '25.99 лв', imageUrl: Ariel, description: 'Красив ключодържател с героите Ерик и Ариел.' },
    { id: 2, name: 'Шрек и Фиона', price: '25.99 лв', imageUrl: Shrek, description: 'Забавен ключодържател с Шрек и Фиона.' },
    { id: 3, name: 'Рапунцел и Флин', price: '25.99 лв', imageUrl: Rapunzel, description: 'Романтичен ключодържател с Рапунцел и Флин.' },
    { id: 4, name: 'Нала и Симба', price: '25.99 лв', imageUrl: LionKing, description: 'Ключодържател с Нала и Симба, героите от "Цар Лъв".' }
];

const ProductDetails = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    
    // Добавяме state за модала
    const [showModal, setShowModal] = useState(false);

    const handleOrderClick = () => {
        setShowModal(true); // Показваме модала при натискане на бутона
    };

    const handleCloseModal = () => {
        setShowModal(false); // Затваряме модала
    };
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        name: product.name,
        // quantityAriel: 0,
        quantity: 0,
        // quantityRapunzel: 0,
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

        // Изпращане на имейла чрез EmailJS
        emailjs.send('service_b06m24g', 'template_mk02aun', formData, 'mjkXxA3GKaz2EgF9X')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Вашата поръчка е изпратена успешно!');
            })
            .catch((err) => {
                console.error('FAILED...', err);
                alert('Грешка при изпращането на поръчката.');
            });

        // Занули формата след успешното изпращане
        setFormData({
            fullName: '',
            phone: '',
            address: '',
            city: '',
            postalCode: '',
            country: '',
            name: product.name,
            // quantityAriel: 0,
            quantity: 0,
            // quantityRapunzel: 0,
            additionalInfo: ''
        });
    };

    if (!product) {
        return <h2>Продуктът не е намерен</h2>;
    }

    return (
        <section id="products" className="product-details-section">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-details">
                <h2>{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Цена: {product.price}</p>
                <button className="order-button">Добави в количката</button>
                <button className="order-button" onClick={handleOrderClick}>Бърза поръчка</button>
            </div>

            {/* Модал */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
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
                            <button type="submit">Поръчай</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductDetails;
