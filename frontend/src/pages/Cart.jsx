import React from 'react';
import { Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useApp();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>YOUR CART IS EMPTY</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', marginBottom: '2.5rem', fontFamily: 'Inter' }}>Check out our rugged gear and apparel.</p>
        <Link to="/products" className="btn-primary">Shop All Gear</Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem', borderBottom: '4px solid var(--color-primary)', display: 'inline-block' }}>SHOPPING CART</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {cart.map(item => (
            <div key={item.id} className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '1.5rem', gap: '1.5rem', border: '1px solid var(--color-border)' }}>
              <div style={{ width: '120px', height: '120px', backgroundColor: '#f1f5f9', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid var(--color-border)' }}></div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontFamily: 'Oswald', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.name}</h3>
                <div style={{ fontWeight: 600, color: 'var(--color-text-muted)', fontFamily: 'Inter' }}>${Number(item.price).toFixed(2)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <select value={item.quantity} onChange={(e) => updateQuantity(item.id, e.target.value)} style={{ padding: '0.5rem', border: '2px solid var(--color-text-main)', fontFamily: 'Oswald', fontSize: '1.1rem', outline: 'none' }}>
                  {[1, 2, 3, 4, 5, 6, 7].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <button onClick={() => removeFromCart(item.id)} style={{ color: 'white', background: 'var(--color-primary)', padding: '0.5rem', border: 'none', cursor: 'pointer' }}><Trash2 size={20} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid var(--color-primary)', border: '1px solid var(--color-border)', backgroundColor: '#fafafa' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>ORDER SUMMARY</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--color-text-muted)', fontFamily: 'Inter' }}>
            <span>Subtotal</span>
            <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--color-text-muted)', fontFamily: 'Inter' }}>
            <span>Estimated Tax</span>
            <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>${tax.toFixed(2)}</span>
          </div>
          <div style={{ borderTop: '2px solid var(--color-border)', margin: '1.5rem 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontWeight: 700, fontSize: '1.5rem', fontFamily: 'Inter' }}>
            <span>Total</span>
            <span style={{ color: 'var(--color-primary)' }}>${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.25rem', fontFamily: 'Oswald', textTransform: 'uppercase' }}>
            Checkout <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
