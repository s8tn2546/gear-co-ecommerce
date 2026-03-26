import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Products() {
  const { addToCart } = useApp();
  const [products, setProducts] = useState([
    { id: '1', name: 'Citizen Messenger Bag', price: 140.00, description: 'Our iconic seatbelt buckle messenger bag. Tough as nails. Guaranteed for Life.', category: { name: 'Gear' }, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800' },
    { id: '2', name: 'Barrage Cargo Backpack', price: 160.00, description: '100% welded waterproof rolltop backpack with iconic cargo net.', category: { name: 'Gear' }, image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800' },
    { id: '3', name: 'Kadet Sling Bag', price: 95.00, description: 'Minimalist sling bag built to carry everyday essentials.', category: { name: 'Gear' }, image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&q=80&w=800' },
    { id: '4', name: 'Urban Utility Jacket', price: 120.00, description: 'Weatherproof layer designed for the urban commute.', category: { name: 'Apparel' }, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800' },
    { id: '5', name: 'Mini Metro Messenger', price: 120.00, description: 'A smaller version of our iconic Citizen messenger bag.', category: { name: 'Gear' }, image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&q=80&w=800' },
    { id: '6', name: 'Doubletrack Bar Bag', price: 65.00, description: 'Versatile handlebar bag that doubles as a sling.', category: { name: 'Accessories' }, image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800' },
    { id: '7', name: 'Storm Cobra 3.0', price: 180.00, description: 'Fully waterproof, breathable urban cycling jacket.', category: { name: 'Apparel' }, image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&q=80&w=800' },
    { id: '8', name: 'Banya Slides', price: 45.00, description: 'Tough, comfortable slides for post-ride recovery.', category: { name: 'Apparel' }, image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&q=80&w=800' },
  ]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => { 
        if(data.length > 0) setProducts(data.map(p => ({ ...p, image: p.imageUrl })));
      })
      .catch(err => console.log('Using robust mock data.'));
  }, []);

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem', backgroundColor: 'var(--color-bg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem', borderBottom: '4px solid var(--color-primary)', paddingBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '4rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>ALL GEAR</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', fontFamily: 'Inter' }}>Tough, functional equipment for the urban environment.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select style={{ padding: '1rem 1.5rem', fontSize: '1.1rem', borderRadius: '0', border: '2px solid var(--color-text-main)', outline: 'none', backgroundColor: 'white', fontFamily: 'Oswald', textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer' }}>
            <option>All Equipment</option>
            <option>Gear</option>
            <option>Apparel</option>
            <option>Accessories</option>
          </select>
        </div>
      </div>

      <div className="grid-products">
        {products.map(p => (
          <div key={p.id} className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.3s', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}
               onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; e.currentTarget.style.borderColor = 'var(--color-text-main)'; }}
               onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}>
            <div style={{ height: '300px', backgroundImage: `url(${p.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#e5e5e5', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--color-primary)', padding: '0.25rem 0.5rem', fontSize: '0.875rem', fontWeight: 700, color: 'white', fontFamily: 'Oswald', letterSpacing: '0.05em' }}>
                {p.category?.name || 'Gear'}
              </div>
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)', lineHeight: 1.2, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>{p.name}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '1.5rem', flex: 1, lineHeight: 1.5, fontFamily: 'Inter' }}>
                {p.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid var(--color-border)', paddingTop: '1rem' }}>
                <span style={{ fontWeight: 600, fontSize: '1.25rem', color: 'var(--color-text-main)', fontFamily: 'Inter' }}>${Number(p.price).toFixed(2)}</span>
                <button onClick={() => addToCart(p)} style={{ fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '0.05em', transition: 'color 0.2s', padding: '0.5rem', border: 'none', background: 'none' }}
                  onMouseOver={e => e.currentTarget.style.color = 'var(--color-text-main)'}
                  onMouseOut={e => e.currentTarget.style.color = 'var(--color-primary)'}>
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
