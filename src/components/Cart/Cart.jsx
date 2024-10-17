import React, { useState } from 'react';

const Cart = ({ cartItems, sendOrder }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    sendOrder();
    setIsSubmitted(true);
  };

  return (
    <div>
      <h1>Количка</h1>
      {cartItems.length === 0 ? <p>Количката е празна</p> : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.name} - {item.price} лв</li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && !isSubmitted && (
        <button onClick={handleSubmit}>Изпрати поръчка</button>
      )}
      {isSubmitted && <p>Поръчката е изпратена!</p>}
    </div>
  );
};

export default Cart;
