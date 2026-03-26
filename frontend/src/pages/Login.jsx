import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '6rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleLogin} className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '450px', borderTop: '4px solid var(--color-primary)' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', textAlign: 'center' }}>SIGN IN</h1>
        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '2.5rem', fontFamily: 'Inter' }}>Access your gear tracker and history</p>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontFamily: 'Inter' }}>Email Address</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '1rem', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'Inter' }} placeholder="you@example.com" />
        </div>
        
        <div style={{ marginBottom: '2.5rem' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600, fontFamily: 'Inter' }}>
            <span>Password</span>
            <a href="#" style={{ color: 'var(--color-primary)', fontSize: '0.875rem' }}>Forgot?</a>
          </label>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '1rem', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'Inter' }} placeholder="••••••••" />
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
          LOGIN
        </button>
        
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontFamily: 'Inter' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--color-text-main)', fontWeight: 700, textDecoration: 'underline' }}>Create one</Link>
        </p>
      </form>
    </div>
  );
}
