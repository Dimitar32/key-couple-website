import { useState } from 'react';
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import useEcontOffices from '../../hooks/useEcontOffices';  
import useSaveOrder from "../../hooks/useSaveOrder";
import './ProductDetails.css';
import Ariel from '../Products/Ariel.png';
import Ariel1 from '../Products/Ariel1.jpg';
import Shrek from '../Products/Shrek.png';
import Shrek1 from '../Products/Shrek1.jpg';
import Rapunzel from '../Products/Rapunzel.png';
import Rapunzel1 from '../Products/Rapunzel1.jpg';
import LionKing from '../Products/LionKing.png';
import LionKing1 from '../Products/LionKing1.jpg';
import Bunny from '../Products/Bunny.png';
import Bunny1 from '../Products/Bunny1.jpg';
import Bella from '../Products/Bella.png';
import Bella1 from '../Products/Bella1.jpg';
// import Christmas1 from '../Products/Christmas1.jpg';
// import Christmas2 from '../Products/Christmas2.jpg';
// import Christmas3 from '../Products/Christmas3.jpg';
// import Christmas4 from '../Products/Christmas4.jpg';
// import Christmas5 from '../Products/Christmas5.jpg';
// import Christmas6 from '../Products/Christmas6.jpg';
import McQueen from '../Products/McQueen1.jpg';
import McQueen2 from '../Products/McQueen2.jpg';
import LadyAndTheTramp from '../Products/LadyAndTheTramp1.png';
import LadyAndTheTramp2 from '../Products/LadyAndTheTramp2.jpg';
import Stich from '../Products/Stich.png';
import { CartContext } from '../contexts/CartContext'; 

const products = [
    { id: 1, name: 'Ерик и Ариел', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: [Ariel, Ariel1], description: `
                        Подарете магическо докосване на връзката си с тези уникални ключодържатели за двойки, вдъхновени от незабравимите герои Ерик и Ариел. Комплектът включва два ключодържателя и поставка за тях,
                        съчетаващи се перфектно, за да символизират вашата любовна история. С изображенията на емблематичната двойка на красив фон, те са идеалният аксесоар за вас и вашия партньор.
                        Вашата любов е уникална, затова я отпразнувайте с нещо специално!` },
    { id: 6, name: 'Шрек и Фиона', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: [Shrek, Shrek1], description: `
                        Подарете магическо докосване на връзката си с тези уникални ключодържатели за двойки, вдъхновени от незабравимите герои Шрек и Фиона. Комплектът включва два ключодържателя и поставка за тях,
                        съчетаващи се перфектно, за да символизират вашата любовна история. С изображенията на емблематичната двойка на красив фон, те са идеалният аксесоар за вас и вашия партньор.
                        Вашата любов е уникална, затова я отпразнувайте с нещо специално!` },
    { id: 3, name: 'Рапунцел и Флин', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: [Rapunzel, Rapunzel1], description: `
                        Подарете магическо докосване на връзката си с тези уникални ключодържатели за двойки, вдъхновени от незабравимите герои Рапунцел и Флин. Комплектът включва два ключодържателя и поставка за тях,
                        съчетаващи се перфектно, за да символизират вашата любовна история. С изображенията на емблематичната двойка на красив фон, те са идеалният аксесоар за вас и вашия партньор.
                        Вашата любов е уникална, затова я отпразнувайте с нещо специално!` },
    { id: 2, name: 'Нала и Симба', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: [LionKing, LionKing1], description: `
                        Подарете магическо докосване на връзката си с тези уникални ключодържатели за двойки, вдъхновени от незабравимите герои Нала и Симба. Комплектът включва два ключодържателя и поставка за тях,
                        съчетаващи се перфектно, за да символизират вашата любовна история. С изображенията на емблематичната двойка на красив фон, те са идеалният аксесоар за вас и вашия партньор.
                        Вашата любов е уникална, затова я отпразнувайте с нещо специално!` },
    { id: 8, name: 'Бъгс и Лола', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: [Bunny, Bunny1], description: `
                        Подарете магическо докосване на връзката си с тези уникални ключодържатели за двойки, вдъхновени от незабравимите герои Бъгс и Лола. Комплектът включва два ключодържателя и поставка за тях,
                        съчетаващи се перфектно, за да символизират вашата любовна история. С изображенията на емблематичната двойка на красив фон, те са идеалният аксесоар за вас и вашия партньор.
                        Вашата любов е уникална, затова я отпразнувайте с нещо специално!` },
    { id: 7, name: 'Бел и Звяр', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: [Bella, Bella1], description: `
                        Подарете магическо докосване на връзката си с тези уникални ключодържатели за двойки, вдъхновени от незабравимите герои Бел и Звяр. Комплектът включва два ключодържателя и поставка за тях,
                        съчетаващи се перфектно, за да символизират вашата любовна история. С изображенията на емблематичната двойка на красив фон, те са идеалният аксесоар за вас и вашия партньор.
                        Вашата любов е уникална, затова я отпразнувайте с нещо специално!` },
    // { id: 7, name: 'KeyCouple8 Коледен комплект', oldPrice: '59.90 лв', price: '35.90 лв', imageUrl: [Christmas1, Christmas2, Christmas3, Christmas4, Christmas5, Christmas6], description: 'Коледен комплект включващ ключодържателите KeyCouple8 плюс пухкава играчка Джинджи.' },
    { id: 5, name: 'Макуин и Сали', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: [McQueen, McQueen2], description: `
        Подарете магическо докосване на връзката си с тези уникални ключодържатели за двойки, вдъхновени от незабравимите герои Макуин и Сали. Комплектът включва два ключодържателя и поставка за тях,
        съчетаващи се перфектно, за да символизират вашата любовна история. С изображенията на емблематичната двойка на красив фон, те са идеалният аксесоар за вас и вашия партньор.
        Вашата любов е уникална, затова я отпразнувайте с нещо специално!` },
    { id: 4, name: 'Лейди и Скитника', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: [LadyAndTheTramp, LadyAndTheTramp2], description: `
        Подарете магическо докосване на връзката си с тези уникални ключодържатели за двойки, вдъхновени от незабравимите герои Лейди и Скитника. Комплектът включва два ключодържателя и поставка за тях,
        съчетаващи се перфектно, за да символизират вашата любовна история. С изображенията на емблематичната двойка на красив фон, те са идеалният аксесоар за вас и вашия партньор.
        Вашата любов е уникална, затова я отпразнувайте с нещо специално!` },
    { id: 14, name: 'Стич и Ейнджъл', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: [Stich, Stich], description: `
        Подарете магическо докосване на връзката си с тези уникални ключодържатели за двойки, вдъхновени от незабравимите герои Стич и Ейнджъл. Комплектът включва два ключодържателя и поставка за тях,
        съчетаващи се перфектно, за да символизират вашата любовна история. С изображенията на емблематичната двойка на красив фон, те са идеалният аксесоар за вас и вашия партньор.
        Вашата любов е уникална, затова я отпразнувайте с нещо специално!` }
];

const ProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    const [quantity, setQuantity] = useState(1); 
    
    const [isAdded, setIsAdded] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);
    const [cantAddZero, cantAddZeroToCart] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

    const [cityFilter, setCityFilter] = useState('');

    const { offices } = useEcontOffices();

    const toggleDescription = () => {
        setIsDescriptionOpen(!isDescriptionOpen);
    };

    const handleOrderClick = () => {
        setShowModal(true); 
    };

    const handleCloseModal = () => {
        setShowModal(false); 
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        order: product.name,
        quantity: 1,
        additionalInfo: '',
        option: product.option
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,  
            ...(name === "office" && { address: value }) 
        }));
    };

    const handleCityFilterChange = (e) => {
        setCityFilter(e.target.value);
    };

    const filteredOffices = offices.filter((office) => {
        const fullAddress = office.address?.fullAddress?.toLowerCase().trim() || "";
        const searchInput = cityFilter.toLowerCase().trim();
        
        return fullAddress.includes(searchInput);
    });

    const { submitOrder } = useSaveOrder();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderItems = [{ id: product.id, name: product.name, quantity: formData.quantity, option: product.option, price: product.price }];
        await submitOrder(formData, orderItems, cityFilter);
        handleCloseModal();
        handleSubmitFastOrder(product);
    };

    const { addToCart } = useContext(CartContext); 

    const handleSubmitFastOrder = () =>{
        setIsOrdered(true);

        setTimeout(() => {
            setIsOrdered(false);
            navigate("/"); 
        }, 5000);
    }
    
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        // if (value > 0) {
            setQuantity(value); // Актуализиране на бройката само ако е по-голямо от 0
        // }
    };

    const handleAddToCart = (product, quantity, value) => {
        // if (product.id === 7 && !value) {
        //     alert('Моля, изберете опция преди да добавите този продукт в количката.');
        //     return;
        // }

        addToCart(product, quantity, value); 

        if (quantity > 0) {
            setIsAdded(true);
        } else if (quantity === 0) {
            cantAddZeroToCart(true);
        }

        setTimeout(() => {
            cantAddZeroToCart(false);
            setIsAdded(false);
        }, 1500);
    };

    if (!product) {
        return <h2>Продуктът не е намерен</h2>;
    }

    return (
        <section id="products" className="product-details-section">
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                navigation
                loop
                className="swiper-container" 
            >
                {product.imageUrl.map((image, index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                        <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="product-image"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="product-details">
            <h2>{product.name}</h2>
                <p className="old-price">Стара Цена: {product.oldPrice}</p>
                <p className="product-price">Цена: {product.price}</p>

                <label className='product-quantity-input-label'>
                    <input className="product-quantity-input"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                        style={{ width: '50px', marginLeft: '0px' }} 
                    />
                </label>
                
                {/* {product.id === 7 && (
                    <label className="product-options-dropdown-label">
                        <select 
                            className="product-options-dropdown" 
                            value={formData.option || ''} 
                            onChange={(e) => 
                                setFormData({ ...formData, option: e.target.value })
                            }
                            required
                        >
                            <option value="" disabled>Изберете опция</option>
                            <option value="Ариел и Ерик">Ариел и Ерик</option>
                            <option value="Шрек и Фиона">Шрек и Фиона</option>
                            <option value="Нала и Симба">Нала и Симба</option>
                            <option value="Бел и Звяр">Бел и Звяр</option>
                            <option value="Рапунцел и Флин">Рапунцел и Флин</option>
                            <option value="Бъгс и Лола">Бъгс и Лола</option>
                        </select>
                    </label>
                )} */}

                <div className="product-buttons">
                    <button className="order-button" onClick={() => handleAddToCart(product, quantity, formData.option)}>Добави в количката</button>
                    <button className="order-button" onClick={handleOrderClick}>Бърза поръчка</button>
                </div>

                <div className="product-description">
                    <div onClick={toggleDescription} className="description-toggle">
                        Описание на продукта {isDescriptionOpen ? "▲" : "▼"}
                    </div>
                    {isDescriptionOpen && <p className="description-text">{product.description}</p>}
                </div>

            </div>

            {isAdded && (
                <div className="modal">
                    <div className="modal-content">
                        <p>
                            Успешно добавено в количката!
                        </p>
                    </div>
                </div>
            )}

            {cantAddZero && (
                <div className="modal">
                    <div className="modal-content">
                        <p>
                            Не може да добавяте 0 продукта в количката!
                        </p>
                    </div>
                </div>
            )}

             {isOrdered && (
                <div className="modal">
                    <div className="modal-content">
                        <p>
                            Благодарим за поръчката! Очаквайте да се свържем с Вас за потвърждение от 1 до 3 работни дни.
                        </p>
                    </div>
                </div>
            )}
            
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}> &times;{/*times;*/}</span>
                        <form  onSubmit={handleSubmit} className="order-form">
                            <div className="form-group">
                                <label>
                                    Име:
                                    <input 
                                        type="text" 
                                        name="firstName" 
                                        value={formData.firstName} 
                                        onChange={handleChange} 
                                        required 
                                        />
                                </label>
                                <label>
                                    Фамилия:
                                    <input 
                                        type="text" 
                                        name="lastName" 
                                        value={formData.lastName} 
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
                                        min="1"
                                        required
                                    />
                                </label>
                                <label>Търси офис по град
                                    <input 
                                        type="text" 
                                        value={cityFilter} 
                                        onChange={handleCityFilterChange} 
                                        placeholder="Например: София" 
                                    />
                                </label>
                                <label>Офис на Еконт</label>
                                    <select
                                        name="office"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        >
                                        <option value="">Избери офис</option>
                                        {filteredOffices.length > 0 ? (
                                            filteredOffices.map((office) => (
                                                <option key={office.code} value={'Име на офиса: ' + office.name + ' ; Адрес: ' + office.address.fullAddress}>
                                                    {office.name || "Няма име"} - {office.address.settlement?.name || office.address.fullAddress || "Няма адрес"}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">Няма намерени офиси</option>
                                        )}
                                    </select>
                            </div>
                            <button type="submit">Поръчай</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductDetails;
