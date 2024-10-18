// import React, { useState } from 'react';

// const Cart = ({ cartItems, sendOrder }) => {
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = () => {
//     sendOrder();
//     setIsSubmitted(true);
//   };

//   return (
//     <div>
//       <h1>Количка</h1>
//       {cartItems.length === 0 ? <p>Количката е празна</p> : (
//         <ul>
//           {cartItems.map((item, index) => (
//             <li key={index}>{item.name} - {item.price} лв</li>
//           ))}
//         </ul>
//       )}
//       {cartItems.length > 0 && !isSubmitted && (
//         <button onClick={handleSubmit}>Изпрати поръчка</button>
//       )}
//       {isSubmitted && <p>Поръчката е изпратена!</p>}
//     </div>
//   );
// };

// export default Cart;
// import React, { useContext } from 'react';
// import { CartContext } from '../contexts/CartContext';
// import './Cart.css';

// const Cart = () => {
//     const { cartItems, removeFromCart } = useContext(CartContext);

//     if (cartItems.length === 0) {
//         return <p>Количката е празна.</p>;
//     }

//     return (
//         // <div>
//         //     <h2>Количка</h2>
//         //     <ul>
//         //         {cartItems.map(item => (
//         //             <li key={item.id}>
//         //                 {item.name} - {item.quantity} бр. - {(parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity).toFixed(2)} лв.
//         //                 <button onClick={() => removeFromCart(item.id)}>Премахни</button>
//         //             </li>
//         //         ))}
//         //     </ul>
//         // </div>
//         <div className="cart-container">
//             <h2>Количка</h2>
//             <ul>
//                 {cartItems.map(item => (
//                     <li key={item.id}>
//                         <span>{item.name} - {item.quantity} бр. - {(parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity).toFixed(2)} лв.</span>
//                         <button onClick={() => removeFromCart(item.id)}>Премахни</button>
//                     </li>
//                 ))}
//             </ul>
//             <div className="cart-total">
//                 Общо: {(cartItems.reduce((total, item) => total + (parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity), 0)).toFixed(2)} лв.
//             </div>
//         </div>

//     );
// };

// export default Cart;

// import React, { useContext, useState } from 'react';
// import { CartContext } from '../contexts/CartContext';
// import './Cart.css'; // Стиловете ще добавим по-долу

// const Cart = () => {
//     const { cartItems, removeFromCart } = useContext(CartContext);
//     const [isOpen, setIsOpen] = useState(false); // Състояние за отваряне и затваряне на количката

//     const handleCartToggle = () => {
//         setIsOpen(!isOpen); // Превключване между отворена и затворена количка
//     };

//     return (
//         <>
//             <button className="cart-toggle-button" onClick={handleCartToggle}>
//                 Количка ({cartItems.length})
//             </button>

//             <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
//                 <div className="cart-header">
//                     <h2>Вашата количка</h2>
//                     <button className="close-cart" onClick={handleCartToggle}>×</button>
//                 </div>
//                 <div className="cart-content">
//                     {cartItems.length === 0 ? (
//                         <p>Количката е празна.</p>
//                     ) : (
//                         <ul>
//                             {cartItems.map(item => (
//                                 <li key={item.id}>
//                                     {item.name} - {item.quantity} бр. - {(parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity).toFixed(2)} лв.
//                                     <button onClick={() => removeFromCart(item.id)}>Премахни</button>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//                 {cartItems.length > 0 && (
//                     <button className="checkout-button">Поръчай</button>
//                 )}
//             </div>

//             <div className={`overlay ${isOpen ? 'visible' : ''}`} onClick={handleCartToggle}></div>
//         </>
//     );
// };

// export default Cart;

// import React, { useContext, useState } from 'react';
// import { CartContext } from '../contexts/CartContext';
// import './Cart.css'; // Стиловете ще добавим по-долу

// const Cart = () => {
//     const { cartItems, removeFromCart } = useContext(CartContext);
//     const [isOpen, setIsOpen] = useState(false); // Състояние за отваряне и затваряне на количката

//     const handleCartToggle = () => {
//         setIsOpen(!isOpen); // Превключване между отворена и затворена количка
//     };

//     return (
//         <>
//             <div className={`cart-sidebar ${isOpen ? 'open' : 'closed'}`}>
//                 <div className="cart-header">
//                     <h2>Вашата количка</h2>
//                     <button className="close-cart" onClick={handleCartToggle}>
//                         {isOpen ? '→' : '←'}
//                     </button>
//                 </div>
//                 <div className="cart-content">
//                     {cartItems.length === 0 ? (
//                         <p>Количката е празна.</p>
//                     ) : (
//                         <ul>
//                             {cartItems.map(item => (
//                                 <li key={item.id}>
//                                     {item.name} - {item.quantity} бр. - {(parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity).toFixed(2)} лв.
//                                     <button onClick={() => removeFromCart(item.id)}>Премахни</button>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//                 {cartItems.length > 0 && (
//                     <button className="checkout-button">Поръчай</button>
//                 )}
//             </div>

//             <div className={`overlay ${isOpen ? 'visible' : ''}`} onClick={handleCartToggle}></div>
//         </>
//     );
// };

// export default Cart;

import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false); // Състояние за отваряне/затваряне на количката

    const handleCartToggle = () => {
        setIsOpen(!isOpen); // Превключване между отворена и затворена количка
    };

    return (
        <>
            <button className="cart-toggle-button" onClick={handleCartToggle}>
                {isOpen ? 'Затвори количката' : 'Отвори количката'} ({cartItems.length})
            </button>

            <div className={`cart-sidebar ${isOpen ? 'open' : 'closed'}`}>
                <div className="cart-header">
                    <h2>Вашата количка</h2>
                    <button className="close-cart" onClick={handleCartToggle}>
                        {isOpen ? '→' : '←'}
                    </button>
                </div>
                <div className="cart-content">
                    {cartItems.length === 0 ? (
                        <p>Количката е празна.</p>
                    ) : (
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id}>
                                    {item.name} - {item.quantity} бр. - {(parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity).toFixed(2)} лв.
                                    <button onClick={() => removeFromCart(item.id)}>Премахни</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {cartItems.length > 0 && (
                    <button className="checkout-button">Поръчай</button>
                )}
            </div>

            {/* Добавяме оверлей, когато количката е отворена */}
            {isOpen && <div className="overlay" onClick={handleCartToggle}></div>}
        </>
    );
};

export default Cart;
