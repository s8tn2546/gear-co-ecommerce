import React, { useEffect, useState } from 'react';
import { Package, Clock, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/checkout/orders');
        setOrders(res.data);
      } catch(err) {
        console.error("Failed to load orders", err);
      }
    };
    if (user) {
      fetchOrders();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
      
      {/* Sidebar */}
      <div className="glass-panel" style={{ padding: '1.5rem', alignSelf: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 600, marginBottom: '1rem' }}>
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <h2 style={{ fontSize: '1.25rem' }}>{user?.name}</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{user?.email}</p>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: '#f1f5f9', fontWeight: 500, width: '100%', textAlign: 'left' }}>
            <Package size={18} /> Orders
          </button>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', color: '#ef4444', fontWeight: 500, width: '100%', textAlign: 'left', marginTop: 'auto' }}>
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Order History</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)', fontFamily: 'Inter' }}>You haven't placed any orders yet.</p>
          ) : orders.map(order => (
            <div key={order.id} style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: '0.25rem' }}>ID: {order.id.slice(-6).toUpperCase()}</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={14} /> {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.25rem' }}>${order.totalAmount.toFixed(2)}</div>
                <span style={{ backgroundColor: '#111', color: 'white', padding: '0.25rem 0.6rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
