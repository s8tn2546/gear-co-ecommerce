import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useApp();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '6rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleRegister} className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '450px', borderTop: '4px solid var(--color-primary)' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', textAlign: 'center' }}>JOIN US</h1>
        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '2.5rem', fontFamily: 'Inter' }}>Create your free account today</p>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontFamily: 'Inter' }}>Full Name</label>
          <input type="text" required value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '1rem', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'Inter' }} placeholder="John Doe" />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontFamily: 'Inter' }}>Email Address</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '1rem', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'Inter' }} placeholder="you@example.com" />
        </div>
        
        <div style={{ marginBottom: '2.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontFamily: 'Inter' }}>Password</label>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '1rem', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'Inter' }} placeholder="••••••••" />
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
          CREATE ACCOUNT
        </button>
        
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontFamily: 'Inter' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-text-main)', fontWeight: 700, textDecoration: 'underline' }}>Sign in</Link>
        </p>
      </form>
    </div>
  );
}
