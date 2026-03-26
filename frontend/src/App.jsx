import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, ArrowRight } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, cartTotalItems } = useApp();

  return (
    <header style={{ 
      position: 'sticky', top: 0, zIndex: 50, 
      backgroundColor: '#111111',
      color: 'white',
      borderBottom: '4px solid var(--color-primary)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '5rem' }}>
        <Link to="/" style={{ fontWeight: 800, fontSize: '1.75rem', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase' }}>
          <div style={{ background: 'var(--color-primary)', color: 'white', padding: '0.5rem 0.5rem', display: 'flex' }}>
            <ShoppingBag size={24} className="stroke-2" />
          </div>
          <span style={{ color: 'white' }}>Gear Co.</span>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', color: 'white' }}>
          <Link to="/products" style={{ fontWeight: 700, fontSize: '1.1rem', display: 'none', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }} className="md-flex">Gear</Link>
          <Link to="/products" style={{ fontWeight: 700, fontSize: '1.1rem', display: 'none', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }} className="md-flex">Apparel</Link>
          <button style={{ color: 'white' }} aria-label="Search"><Search size={24} /></button>
          
          <Link to={user ? "/dashboard" : "/login"} style={{ color: 'white' }} aria-label="Account">
            <User size={24} />
          </Link>
          
          <Link to="/cart" style={{ position: 'relative', color: 'white' }} aria-label="Cart">
            <ShoppingBag size={24} />
            <span style={{
              position: 'absolute', top: -8, right: -12, 
              background: 'var(--color-primary)', color: 'white', 
              fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.5rem', 
              fontFamily: 'Inter',
            }}>{cartTotalItems}</span>
          </Link>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ color: 'white' }}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="animate-fade-in" style={{ position: 'absolute', top: '5rem', left: 0, right: 0, background: '#111111', borderTop: '1px solid #333', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '4px solid var(--color-primary)' }}>
          <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ padding: '0.5rem', fontWeight: 700, fontSize: '1.25rem', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', color: 'white' }}>Home</Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)} style={{ padding: '0.5rem', fontWeight: 700, fontSize: '1.25rem', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', color: 'var(--color-primary)' }}>Shop Gear</Link>
          <Link to={user ? "/dashboard" : "/login"} onClick={() => setIsMenuOpen(false)} style={{ padding: '0.5rem', fontWeight: 700, fontSize: '1.25rem', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', color: 'white' }}>{user ? "My Account" : "Sign In & Register"}</Link>
        </div>
      )}
    </header>
  );
};

const Home = () => {
  const [featured, setFeatured] = useState([
    { id: '1', name: 'Citizen Messenger Bag', price: 140.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800' },
    { id: '2', name: 'Barrage Cargo Backpack', price: 160.00, image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800' },
    { id: '3', name: 'Kadet Sling Bag', price: 95.00, image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&q=80&w=800' },
    { id: '4', name: 'Urban Utility Jacket', price: 120.00, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800' }
  ]);
  
  React.useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(r => r.json())
      .then(data => {
        if(data.length > 0) setFeatured(data.slice(0, 4).map(p => ({ ...p, image: p.imageUrl })));
      })
      .catch(e => console.log('Using robust mock data.'));
  }, []);
  
  const { addToCart } = useApp();

  return (
    <main className="animate-fade-in">
      <section style={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#111', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
           backgroundImage: 'url("https://images.unsplash.com/photo-1550508126-2b76eebbf32d?q=80&w=1920&auto=format&fit=crop")',
           backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.45 }}></div>
           
        <div className="container" style={{ position: 'relative', zIndex: 10, alignSelf: 'flex-start' }}>
          <h1 style={{ color: 'white', fontSize: 'clamp(3.5rem, 8vw, 7rem)', marginBottom: '1rem', lineHeight: 1, textShadow: '4px 4px 0 var(--color-primary)' }}>
            BUILT FOR THE<br/>CITY
          </h1>
          <p style={{ color: '#e5e5e5', fontSize: '1.25rem', maxWidth: '500px', marginBottom: '2.5rem', fontFamily: 'Inter', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            Thoughtfully designed gear that empowers life on the move. Rugged bags and apparel for the urban commuter.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn-primary">Shop All Gear</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '0.05em' }}>Tough Gear</h2>
            <Link to="/products" style={{ color: 'var(--color-text-main)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Oswald', fontSize: '1.25rem', textTransform: 'uppercase' }}>View All <ArrowRight size={20}/></Link>
          </div>
          
          <div className="grid-products">
            {featured.map(p => (
              <div key={p.id} className="glass-panel" style={{ padding: '0', display: 'flex', flexDirection: 'column', transition: 'all 0.3s', backgroundColor: 'var(--color-surface)', cursor: 'pointer' }}
                   onClick={() => window.location.href='/products'}>
                <div style={{ height: '350px', backgroundImage: `url(${p.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#e5e5e5' }}>
                </div>
                <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '4px solid var(--color-primary)' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.05em' }}>{p.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '1.25rem', color: 'var(--color-text-muted)', fontFamily: 'Inter' }}>${p.price.toFixed(2)}</span>
                    <button style={{ color: 'var(--color-primary)', fontWeight: 700, fontFamily: 'Oswald', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '0.05em', border: 'none', background: 'none' }}
                      onClick={(e) => { e.stopPropagation(); addToCart(p); }}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section style={{ padding: '6rem 0', backgroundColor: '#111', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '3.5rem', color: 'white', marginBottom: '1.5rem' }}>Guaranteed for Life</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem', color: '#aaa', fontFamily: 'Inter' }}>We stand behind everything we make. High-tenacity materials, weatherproof functionality, and lifetime warranty.</p>
          <Link to="/products" className="btn-primary">Learn More</Link>
        </div>
      </section>
    </main>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
          <footer style={{ backgroundColor: '#111', paddingTop: '4rem', paddingBottom: '2rem', color: 'white', borderTop: '4px solid var(--color-primary)' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
              <div>
                <div style={{ background: 'var(--color-primary)', color: 'white', padding: '0.5rem', display: 'inline-flex', marginBottom: '1rem' }}>
                  <ShoppingBag size={32} className="stroke-2" />
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: 'white' }}>
                  GEAR CO.
                </h3>
                <p style={{ color: '#888', maxWidth: '300px', fontFamily: 'Inter' }}>Heritage brand intersection of movement and self-expression. Built for the city.</p>
              </div>
              <div style={{ display: 'flex', gap: '4rem', justifyContent: 'flex-end', fontFamily: 'Oswald', letterSpacing: '0.05em' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a href="#" style={{ color: 'white' }}>Gear</a>
                  <a href="#" style={{ color: 'white' }}>Apparel</a>
                  <a href="#" style={{ color: 'white' }}>Accessories</a>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a href="#" style={{ color: 'var(--color-text-muted)' }}>Support</a>
                  <a href="#" style={{ color: 'var(--color-text-muted)' }}>Locations</a>
                  <a href="#" style={{ color: 'var(--color-text-muted)' }}>About</a>
                </div>
              </div>
            </div>
            <div className="container" style={{ borderTop: '1px solid #333', paddingTop: '2rem', textAlign: 'center', color: '#555', fontFamily: 'Inter', fontSize: '0.875rem' }}>
              &copy; 2026 Gear Co. All rights reserved.
            </div>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
