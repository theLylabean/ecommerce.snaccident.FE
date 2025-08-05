import { createContext, useContext, useEffect, useState } from "react";
import { getCartItems } from '../api/usersIndex.js';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items || []);
      } catch (error) {
        console.error('❌ Error hydrating cart:', error.message);
      }
    };

    loadCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
