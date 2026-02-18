import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'

export default function Donations(){
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ type:'money', amount:'', description:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(()=>{ api.get('/donations').then(r=> setItems(r.data)).catch(()=>{}) },[])

  const token = localStorage.getItem('token')

  const submit = async (e) => {
    e.preventDefault();
    setError('')
    if (!token) return setError('You must be logged in to pledge a donation.');
    try{
      setLoading(true)
      const payload = { ...form }
      if (payload.type === 'money'){
        const n = parseFloat(String(payload.amount).replace(/,/g, ''))
        if (!Number.isFinite(n) || n <= 0) throw new Error('Please enter a valid donation amount')
        payload.amount = n
      }
      await api.post('/donations', payload);
      alert('Donation pledged');
      setForm({ type:'money', amount:'', description:'' });
    }catch(e){ console.error(e); setError(e?.response?.data?.message || e.message || 'Error') }
    finally{ setLoading(false) }
  }

  return (
    <div className="donations-page">
      <div className="page-bg"></div>
      <div className="container">
      <h2>Donations</h2>
      <div className="card">
        {!token ? (
          <div style={{ marginBottom: 8 }} className="muted-small">Please <Link to="/login">login</Link> to pledge a donation.</div>
        ) : null}

        <form onSubmit={submit}>
          {error && <div style={{ color:'var(--danger)', marginBottom:8 }}>{error}</div>}
          <select value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
            <option value="money">Money</option>
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
            <option value="other">Other</option>
          </select>
          {form.type === 'money' && <input placeholder="Amount" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} />}
          <input placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
          <div style={{ marginTop:10 }}>
            <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Pledge'}</button>
          </div>
        </form>
      </div>

      <div style={{ marginTop:12 }}>
        {items.map(d => (
          <div key={d._id} className="card">
            <div>Type: {d.type}</div>
            <div>Amount: {d.amount}</div>
            <div>Status: {d.status}</div>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}
