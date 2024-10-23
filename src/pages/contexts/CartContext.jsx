import React, { createContext, useState } from 'react';

// Създаваме нов контекст за количката
export const CartContext = createContext();

// Провайдър компонент за количката
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Функция за добавяне на продукт в количката
    const addToCart = (product, quantity) => {
        setCartItems((prevItems) => {
            // Проверяваме дали продуктът вече е в количката
            const itemExists = prevItems.find(item => item.id === product.id);
            if (itemExists) {
                // Ако продуктът вече е в количката, увеличаваме количеството му
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                // Ако продуктът не е в количката, го добавяме с количество 1
                return [...prevItems, { ...product, quantity: quantity }];
            }
        });
    };

    // Функция за премахване на продукт от количката
    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter(item => item.id !== productId)
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
