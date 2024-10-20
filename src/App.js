// import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import FAQ from './pages/FAQ/FAQ';
import OrderForm from './pages/OrderForm/OrderForm';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import { CartProvider } from './pages/contexts/CartContext'; // Импортирай провайдъра
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  // const [cartItems, setCartItems] = useState([]);

  // const addToCart = (product) => {
  //   setCartItems([...cartItems, product]);
  // };

  // const sendOrder = () => {
  //   console.log('Поръчката е изпратена!', cartItems);
  //   setCartItems([]);
  // };

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/order" element={<OrderForm />} /> {/* Добавяме нов маршрут за формата */}
      
            {/* <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} /> */}
            {/* <Route path="/cart" element={<Cart cartItems={cartItems} sendOrder={sendOrder} />} /> */}
          </Routes>
          <Cart />
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
