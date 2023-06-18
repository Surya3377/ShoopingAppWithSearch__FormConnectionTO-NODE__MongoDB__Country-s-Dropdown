import React, { useState } from 'react';
import './CartPage.css';

const CartPage = ({ cartItems, removeItem }) => {
  const [quantities, setQuantities] = useState(Array(cartItems.length).fill(0));

  const handleIncrement = (index) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] += 1;
    setQuantities(updatedQuantities);
  };

  const handleDecrement = (index) => {
    if (quantities[index] > 0) {
      const updatedQuantities = [...quantities];
      updatedQuantities[index] -= 1;
      setQuantities(updatedQuantities);
    }
  };

  const handleRemove = (index) => {
    const updatedQuantities = [...quantities];
    updatedQuantities.splice(index, 1);
    setQuantities(updatedQuantities);
    removeItem(index);
  };

  const totalPrice = cartItems.reduce(
    (total, item, index) => total + item.price * quantities[index],
    0
  );

  const handleCheckout = () => {
    // Handle the checkout logic here
  };

  return (
    <div className="cart-page">
      <h1 className="cart-page__title">Your Cart</h1>
      {cartItems.map((item, index) => (
        <div className="cart-item" key={index}>
          <h3 className="cart-item__title">{item.title}</h3>
          <h3 className="cart-item__price">Price: ${item.price}</h3>
          <img className="cart-item__image" src={item.thumbnail} alt="Product" />
          <div className="cart-item__quantity">
            <button className="quantity-btn" onClick={() => handleDecrement(index)}>-</button>
            <span className="quantity-count">{quantities[index]}</span>
            <button className="quantity-btn" onClick={() => handleIncrement(index)}>+</button>
          </div>
          <button className="delete-btn" onClick={() => handleRemove(index)}>Delete</button>
        </div>
      ))}
      <h3 className="total-price">Total Price: ${totalPrice}</h3>
      <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default CartPage;