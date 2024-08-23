import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:8000/cart/mycart',
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true})
      }
      catch (error) {
        console.error('Error Fetching cart:', error)
      }
    };
    fetchCart();
  }, []);


  const addToCart = async (itemId, quantity) => {
    try {
      const token = localStorage.getItem('token', yourTokenHere); 

      if (!token) {
        throw new Error("User is not authenticated.");
      }
  
      const response = await axios.post(
        'http://localhost:8000/cart/add',
        { itemId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true }
      );
      setCart(response.data)
    }
    catch (error) {
      console.error('Error adding item to cart:', error.response ? error.response.data : error.message);
    }
   
  };

  const removeFromCart = async (id) => {
    try {

      const token = localStorage.getItem('token', yourTokenHere); 

      await axios.delete(`http://localhost:8000/cart/remove/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`},
          withCredentials: true
        }
      );
      setCart(cart.filter((item) => item.id ==id));
    }
    catch (error) {
      console.error('Error removing item from cart:', error);
    }
   
  };

  const increaseQuantity = async(id) => {
    try{

      const token = localStorage.getItem('token', yourTokenHere); 

      await axios.patch(`http://localhost:8000/cart/increase/${id}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`},
          withCredentials: true}
      );
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, count: item.count + 1 } : item
        )
      );
    }
    catch (error) {
      console.error('Error increasing quantity:',error)
    }
  
  };

  const decreaseQuantity = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/cart/decrease/${id},`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`},
          withCredentials: true}
      )
      setCart(
        cart.map((item) =>
          item.id === id && item.count > 1
            ? { ...item, count: item.count - 1 }
            : item
        )
      );

    }
    catch (error) {
      console.error('Error decreasing quantity:', error)
    }
   
  };

  return (
    <CartContext.Provider
      value={{ cart,addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
