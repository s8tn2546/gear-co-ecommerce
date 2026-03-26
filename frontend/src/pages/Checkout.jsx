import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import axios from 'axios';

export default function Checkout() {
  const { cart, clearCart, showToast } = useApp();
  const [complete, setComplete] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Your cart is empty!', 'error');
      return;
    }

    try {
      const address = `${e.target[0].value} ${e.target[1].value}, ${e.target[2].value}, ${e.target[3].value}, ${e.target[4].value}`;
      const cartItems = cart.map(item => ({ productId: item.id, quantity: item.quantity }));
      await axios.post('http://localhost:5000/api/checkout', { shippingAddress: address, cartItems });
      clearCart();
      setComplete(true);
    } catch (err) {
      showToast(err.response?.data?.msg || 'Failed to place order', 'error');
    }
  };

  if (complete) {
    return (
      <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
        <CheckCircle size={80} color="var(--color-primary)" style={{ margin: '0 auto 2rem' }} />
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>ORDER CONFIRMED!</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', marginBottom: '2rem', fontFamily: 'Inter' }}>
          Thank you for your purchase. Your gear is being prepared for the city.
        </p>
        <button className="btn-primary" onClick={() => window.location.href = '/'}>Return Home</button>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem', borderBottom: '4px solid var(--color-primary)', display: 'inline-block' }}>SECURE CHECKOUT</h1>
      
      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '3rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Shipping Information</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontFamily: 'Inter' }}>First Name</label>
            <input required type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'Inter' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontFamily: 'Inter' }}>Last Name</label>
            <input required type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'Inter' }} />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontFamily: 'Inter' }}>Address</label>
          <input required type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'Inter' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontFamily: 'Inter' }}>City</label>
            <input required type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'Inter' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontFamily: 'Inter' }}>State</label>
            <input required type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'Inter' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontFamily: 'Inter' }}>ZIP</label>
            <input required type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'Inter' }} />
          </div>
        </div>

        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Payment Method</h2>
        <div style={{ padding: '1.5rem', border: '1px solid var(--color-border)', marginBottom: '3rem', backgroundColor: '#f1f5f9' }}>
          <p style={{ color: 'var(--color-text-muted)', fontFamily: 'Inter' }}>Payment processing is bypassed in this demo. Click Submit Order to confirm.</p>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.25rem' }}>
          Submit Order (${total.toFixed(2)})
        </button>
      </form>
    </div>
  );
}
