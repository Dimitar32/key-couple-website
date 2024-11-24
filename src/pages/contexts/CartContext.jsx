import React, { createContext, useState, useEffect } from 'react';

// Създаваме нов контекст за количката
export const CartContext = createContext();

// Провайдър компонент за количката
export const CartProvider = ({ children }) => {
    // const [cartItems, setCartItems] = useState([]);

    // useEffect(() => {
    //     const savedCart = localStorage.getItem('cartItems');
    //     // console.log('Loaded cart from localStorage:', savedCart);
    //     if (savedCart) {
    //         setCartItems(JSON.parse(savedCart));
    //     }
    // }, []);

    // useEffect(() => {
    //     console.log('Saving cart to localStorage:', cartItems);
    //     localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // }, [cartItems]);
    // Зареждаме данните от Local Storage само при първоначално стартиране
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Запазваме количката в Local Storage при всяка промяна
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

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

    // Функция за изчистване на количката
    const clearCart = () => {
        setCartItems([]); // Нулира количката
        localStorage.removeItem('cartItems'); // Изтрива от Local Storage
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
