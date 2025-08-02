import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const updateLocalStorage = (items) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item._id === product._id);
    if (existing) {
      const updated = cartItems.map((item) =>
        item._id === product._id ? { ...item, qty: item.qty + 1 } : item
      );
      updateLocalStorage(updated);
    } else {
      updateLocalStorage([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    updateLocalStorage(updated);
  };

  const changeQty = (id, qty) => {
    const updated = cartItems.map((item) =>
      item._id === id ? { ...item, qty } : item
    );
    updateLocalStorage(updated);
  };

  const clearCart = () => {
    updateLocalStorage([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, changeQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
