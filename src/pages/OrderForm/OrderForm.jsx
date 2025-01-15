import React, { useContext, useState } from 'react';
// import emailjs from 'emailjs-com';
import { CartContext } from '../contexts/CartContext'; // Импортирай контекста за количката
import useEcontOffices from '../../hooks/useEcontOffices';  
import useSaveOrder from "../../hooks/useSaveOrder";
import './OrderForm.css'; 

const OrderForm = () => {
    // let errOrder = "";

    const [isOrdered, setIsOrdered] = useState(false);
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext); // Вземаме продуктите и функцията за премахване от контекста
    const [cityFilter, setCityFilter] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        order: '',
        option: '',
        note: ''
    });

    const { submitOrder } = useSaveOrder();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Количката е празна!");
            return;
        }

        await submitOrder(formData, cartItems, cityFilter, clearCart);
        setIsOrdered(true);
        setTimeout(() => setIsOrdered(false), 5000);
    };
    
    // const [formData, setFormData] = useState({
    //     fullName: '',
    //     phone: '',
    //     address: '',
    //     city: '',
    //     postalCode: '',
    //     country: '',
    //     name: product.name,
    //     quantity: 0,
    //     additionalInfo: ''
    // });

    const { offices } = useEcontOffices();

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,  
            ...(name === "office" && { address: value }) 
        }));
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Тук можеш да обработиш данните, например да ги изпратиш на API
    //     console.log('Поръчката е изпратена:', formData, cartItems);
    // };

    
    const handleCityFilterChange = (e) => {
        setCityFilter(e.target.value);
    };

    const filteredOffices = offices.filter((office) => {
        const fullAddress = office.address?.fullAddress?.toLowerCase().trim() || "";
        const searchInput = cityFilter.toLowerCase().trim();
        
        return fullAddress.includes(searchInput);
    });
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const orderDetails = cartItems
    //     .map(item => `Name: ${item.name}, Quantity: ${item.quantity}, Option: ${item.option || 'None'}`)
    //     .join('\n');
    
    //     formData.city = cityFilter;

    //     const emailData = {
    //         ...formData,
    //         order: orderDetails,
    //     };

    //     emailjs.send('service_b06m24g', 'template_mk02aun', emailData , 'PLenflNoe6IDfFa9G')
    //         .then((response) => {
    //             // console.log('SUCCESS!', response.status, response.text);
    //             // alert('Вашата поръчка е изпратена успешно!');
    //         })
    //         .catch((err) => {
    //             errOrder = err;

    //             console.error('FAILED...', err);
    //             alert('Грешка при изпращането на поръчката.');
    //         });
            
    //     if (errOrder === "") 
    //     {
    //         setIsOrdered(true);
    
    //         // Автоматично скриване на съобщението след 3 секунди
    //         setTimeout(() => {
    //             setIsOrdered(false);
    //         }, 5000);
    //     }

    //     setFormData({
    //         firstName: '',
    //         lastName: '',
    //         phone: '',
    //         address: '',
    //         city: '',
    //         order: '',
    //         option: '',
    //         note: ''
    //     });

    //     clearCart();
    // };


    const handleRemove = (id) => {
        removeFromCart(id); // Премахваме продукт от количката
    };

    return (
        // <div className='out-container'>
        <div className="order-form-container">
        <h2>Завършете поръчката</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Име</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Фамилия</label>
                    <input 
                        type="text" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Телефон</label>
                    <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label>Търси офис по град</label>
                    <input 
                        type="text" 
                        value={cityFilter} 
                        onChange={handleCityFilterChange} 
                        placeholder="Например: София" 
                    />
                </div>

                <div className="form-group">
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

                <div className="form-group">
                    <label>Бележка</label>
                    <textarea 
                        name="note" 
                        value={formData.note} 
                        onChange={handleChange} 
                        placeholder="Ако искате до личен адрес, не намирате офиса на Еконт или имате въпрос може да го оставите тука"
                        rows="5" 
                        cols="35"
                    />
                </div>
                
                {/* Показваме продуктите в количката */}
                <div className="cart-items">
                    <h3>Вашата количка</h3>
                    {cartItems.length === 0 ? (
                        <p>Количката е празна!!!</p>
                    ) : (
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id} className="cart-item">
                                {item.name} - {item.quantity} бр. - {item.option || ''} {(parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity).toFixed(2)} лв.
                                    <button 
                                        className="remove-button" 
                                        type="button" 
                                        onClick={() => handleRemove(item.id)}
                                    >
                                        Премахни
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                
                <button type="submit" className="submit-button">Изпрати поръчка</button>
            </form>
            
             {/* Показване на съобщението, когато е добавено в количката */}
             {isOrdered && (
                <div className="modal">
                    <div className="modal-content">
                        <p>
                            Благодарим за поръчката! Очаквайте да се свържем с Вас за потвърждение от 1 до 3 работни дни.
                        </p>
                    </div>
                </div>
            )}
            
        </div>
        // </div>
    );
};

export default OrderForm;
