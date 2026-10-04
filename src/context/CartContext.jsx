import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (event) => {
    setCart((prev) => {
      if (prev.find((item) => item.id === event.id)) return prev;
      return [...prev, event];
    });
  };

  const removeFromCart = (eventId) => {
    setCart((prev) => prev.filter((item) => item.id !== eventId));
  };

  const clearCart = () => setCart([]);

  const totalFee = cart.reduce((sum, item) => sum + item.fee, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalFee }}
    >
      {children}
    </CartContext.Provider>
  );
}
