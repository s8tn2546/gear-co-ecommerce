import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} added to cart`);
  };

  const updateQuantity = (id, quantity) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Number(quantity) } : item));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => setCart([]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      showToast('Welcome back, ' + res.data.user.name);
      return true;
    } catch (err) {
      showToast(err.response?.data?.msg || 'Login failed', 'error');
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      showToast('Account created for ' + res.data.user.name);
      return true;
    } catch (err) {
      showToast(err.response?.data?.msg || 'Registration failed', 'error');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    showToast('Logged out successfully', 'info');
  };

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, cartTotalItems, user, login, register, logout, toast, showToast }}>
      {children}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000,
          background: toast.type === 'success' ? '#111' : '#D82C2C', color: 'white',
          padding: '1rem 2rem', border: `3px solid ${toast.type === 'success' ? '#D82C2C' : '#fff'}`,
          fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)', animation: 'fadeIn 0.3s ease-out', fontWeight: 700
        }}>
          {toast.message}
        </div>
      )}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
