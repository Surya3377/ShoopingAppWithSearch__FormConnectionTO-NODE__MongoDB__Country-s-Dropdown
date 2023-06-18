import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import classes from './Shop.module.css';
import Cart from './Cart';
import Network from './Network';
import CartPage from './CartPage';
import SearchBar from './SearchBar';

const Shop = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Router>
      <div>
        <header className={classes.header}>
          <div className={classes.header_left}>
            <h1>Mobile Shop</h1>
          </div>
          <div className={classes.header_middle}>
            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          </div>
          <div className={classes.header_right}>
            <Cart cartItems={cartItems} />
          </div>
        </header>
        <div className={classes.content}>
          <Routes>
            <Route
              path="/"
              element={<Network addToCart={addToCart} searchTerm={searchTerm} />}
            />
            <Route
              path="/Cart"
              element={<CartPage cartItems={cartItems} removeItem={removeItem} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Shop;
