import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item border p-4 mb-4 flex">
            <img src={item.image} alt={item.title} className="w-24 h-24 object-contain mr-4" />
            <div className="cart-item-details">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p>Quantity: {item.count}</p>
              <div className="quantity-controls mt-2">
                <button 
                  onClick={() => increaseQuantity(item.id)} 
                  className="bg-blue-500 text-white p-1 rounded-sm mr-2"
                >
                  +
                </button>
                <button 
                  onClick={() => decreaseQuantity(item.id)} 
                  className="bg-gray-500 text-white p-1 rounded-sm mr-2"
                >
                  -
                </button>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="bg-red-500 text-white p-1 rounded-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
