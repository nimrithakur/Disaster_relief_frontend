import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'
import { addPendingRegistration, registerSync, isOnline } from '../utils/offlineDB'

export default function Signup(){
  const [form, setForm] = useState({ name:'', email:'', password:'', role: 'user' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('')
    setSuccessMsg('')
    if (!form.name || !form.email || form.password.length < 6) return setError('Please provide name, valid email and a password of at least 6 characters.')
    setLoading(true);
    
    try{
      const res = await api.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      setSuccessMsg('Account created successfully! Redirecting...')
      setTimeout(() => navigate('/'), 1500);
    }catch(err){
      console.error('Signup error:', err?.response || err);
      
      if (!isOnline() || err.message === 'Network Error') {
        try {
          await addPendingRegistration(form);
          await registerSync('sync-registrations');
          setSuccessMsg('You are offline. Your registration has been queued and will be processed when you reconnect.');
          setTimeout(() => navigate('/login'), 3000);
        } catch (offlineErr) {
          setError('Failed to queue registration. Please try again when online.');
        }
      } else {
        setError(err?.response?.data?.message || err.message || 'Sign up failed');
      }
    }finally{ 
      setLoading(false) 
    }
  }

  return (
    <div className="auth-page">
      <div className="page-bg"></div>
      <div className="auth-card">
        <h2>Create your account</h2>
        <div className="auth-sub">Join the community — report or help reunite missing people.</div>

        <form onSubmit={submit}>
          {error && <div style={{ color:'var(--danger)', marginBottom:10, padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>{error}</div>}
          {successMsg && <div style={{ color:'var(--success)', marginBottom:10, padding: '10px', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>{successMsg}</div>}
          <div className="field-row">
            <input placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
            <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
            <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required minLength={6} />
            <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})} required style={{ marginTop: 8 }}>
              <option value="user">User (Report missing persons)</option>
              <option value="volunteer">Volunteer (Submit found reports & help)</option>
            </select>
          </div>

          <div className="auth-actions">
            <div style={{ color:'var(--muted)', fontSize:13 }}>Already have an account? <Link className="auth-link" to="/login">Login</Link></div>
            <div>
              <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
            </div>
          </div>

          <div className="form-note">By creating an account you agree to local community guidelines.</div>
        </form>

        <div className="auth-flair">
          <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=400&q=60" alt="flair1" />
          <img src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=400&q=60" alt="flair2" />
          <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=60" alt="flair3" />
        </div>
      </div>
    </div>
  )
}

