import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate();
  React.useEffect(()=>{
    const params = new URLSearchParams(window.location.search)
    const err = params.get('error')
    if (err) {
      if (err === 'google_not_configured') setError('Google sign-in is not configured on the server.')
      else if (err === 'facebook_not_configured') setError('Facebook sign-in is not configured on the server.')
      else if (err === 'no_token') setError('Authentication completed but no token was received.')
      else setError('Social sign-in failed. Please try again.')
    }
  }, [])

  const submit = async (e) => {
    e.preventDefault();
    setError('')
    if (!form.email || !form.password) return setError('Please provide email and password.')
    setLoading(true);
    try{
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    }catch(e){
      console.error('Login error:', e?.response || e);
      setError(e?.response?.data?.message || e.message || 'Login failed');
    }finally{ setLoading(false) }
  }

  return (
    <div className="auth-page">
      <div className="page-bg"></div>
      <div className="auth-card">
        <h2>Welcome back</h2>
        <div className="auth-sub">Sign in to report or help reunite missing people.</div>

        <form onSubmit={submit}>
          {error && <div style={{ color:'var(--danger)', marginBottom:10 }}>{error}</div>}
          <div className="social-row">
            <button type="button" className="social-btn" onClick={()=>{ window.location.href = 'http://localhost:5000/api/auth/google' }}>Continue with Google</button>
            <button type="button" className="social-btn" onClick={()=>{ window.location.href = 'http://localhost:5000/api/auth/facebook' }}>Continue with Facebook</button>
          </div>

          <div style={{ textAlign:'center', color:'var(--muted)', marginBottom:12 }}>or use your email</div>

          <div className="field-row">
            <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
            <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
          </div>

          <div className="auth-actions">
            <div>
              <Link className="auth-link" to="/signup">Create account</Link>
            </div>
            <div>
              <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
            </div>
          </div>

          <div className="form-note">Forgot your password? Contact admin for a reset.</div>
        </form>

        <div className="auth-flair" style={{ marginTop: 14 }}>
          <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=60" alt="f1" />
          <img src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=400&q=60" alt="f2" />
          <img src="https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&w=400&q=60" alt="f3" />
        </div>
      </div>
    </div>
  )
}
