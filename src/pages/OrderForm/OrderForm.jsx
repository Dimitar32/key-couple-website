import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CartContext } from '../contexts/CartContext'; 
import useEcontOffices from '../../hooks/useEcontOffices';  
import useSaveOrder from "../../hooks/useSaveOrder";
import './OrderForm.css'; 

const OrderForm = () => {
    const navigate = useNavigate();

    const [isOrdered, setIsOrdered] = useState(false);
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext); 
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
        
        setTimeout(() => {
            setIsOrdered(false);
            navigate("/"); 
        }, 5000); 
    };

    const { offices } = useEcontOffices();

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

    const handleRemove = (id) => {
        removeFromCart(id); 
    };

    return (
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
                
                <div className="cart-items">
                    <h3>Вашата количка</h3>
                    {cartItems.length === 0 ? (
                        <p>Количката е празна!!!</p>
                    ) : (
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id} className="cart-item">
                                {item.productname} - {item.quantity} бр. -{/*{item.option || ''}*/} {(parseFloat(item.discount_price.replace(/[^\d.-]/g, '')) * item.quantity).toFixed(2)} лв.
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
            
             {isOrdered && (
                <div className="modal">
                    <div className="modal-content">
                        <p>
                            Благодарим за поръчката! Очаквайте да се свържем с Вас за потвърждение след 23.02.2025г.
                        </p>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default OrderForm;
