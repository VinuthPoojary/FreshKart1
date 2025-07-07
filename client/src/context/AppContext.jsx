import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets/assets";
import toast from "react-hot-toast"; 

// 1. Create the context
export const AppContext = createContext();

// 2. Provider component
export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$"; // Default currency fallback
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setcartItems] = useState({});

  // Fetch All Products
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // Add Product to Cart
  const addToCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setcartItems(cartData);
    toast.success("Added to Cart");
  };

  // Update Cart Item Quantity
  const UpdateCartItem = (itemId, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setcartItems(cartData);
    toast.success("Cart Updated");
  };

  // Remove Product from Cart
  const removeFromCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) delete cartData[itemId];
    }
    setcartItems(cartData);
    toast.success("Removed from Cart");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    UpdateCartItem,
    removeFromCart,
    cartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// 3. Custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};
