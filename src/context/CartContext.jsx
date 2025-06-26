import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = async (productId) => {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/api/users/addtocart',{
            method: 'POST',
            headers: {Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json'},
            body: JSON.stringify({productId})
        });
        const added = await res.json();
        return added;
    }

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => 
            prevItems.filter((item) => item.id !== productId)
        );
    };
    const clearCart = () => {
        setCartItems([]);
    };
    return (
        <CartContext.Provider 
        value={{ cartItems, addToCart, removeFromCart, clearCart }}
        >
            { children }
        </CartContext.Provider>
    );
};
export const useCart = () => useContext(CartContext)
