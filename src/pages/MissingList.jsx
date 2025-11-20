import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import INDIA_STATES from '../data/indiaLocations'

export default function MissingList(){
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [stateFilter, setStateFilter] = useState('India')
  const [cityFilter, setCityFilter] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchItems = async (opts = {}) => {
    setLoading(true)
    try{
      const params = {}
      if (opts.search !== undefined) params.q = opts.search
      // prefer city then state when filtering
      if (opts.city) params.location = `${opts.city}, ${opts.state || ''}`
      else if (opts.state && opts.state !== 'India') params.location = opts.state
      const res = await api.get('/missing', { params })
      setItems(res.data)
    }catch(err){ console.error('Failed to load missing list', err) }
    finally{ setLoading(false) }
  }

  useEffect(()=>{ fetchItems({ search, state: stateFilter, city: cityFilter }) },[])

  return (
    <div className="missing-list-page">
      <div className="page-bg"></div>
      <div className="container">
      <h2>Missing People Across India</h2>

      <div style={{ display:'flex', gap:12, marginBottom:16, alignItems:'center', flexWrap:'wrap' }}>
        <input placeholder="Search by name or keyword (city, landmark)" value={search} onChange={e=>setSearch(e.target.value)} style={{ flex:1, minWidth:220 }} />
        <select value={stateFilter} onChange={e=>setStateFilter(e.target.value)} style={{ marginLeft:8, minWidth:200 }}>
          <option>India</option>
          {INDIA_STATES.map(s=> <option key={s.name} value={s.name}>{s.name}</option>)}
        </select>
        <input list="cities" placeholder="City / District (optional)" value={cityFilter} onChange={e=>setCityFilter(e.target.value)} style={{ marginLeft:8, minWidth:200 }} />
        <datalist id="cities">
          {(function(){
            const st = stateFilter && stateFilter !== 'India' ? INDIA_STATES.find(s=>s.name === stateFilter) : null
            const cities = st ? st.cities : Array.from(new Set(INDIA_STATES.flatMap(s=>s.cities))).slice(0,200)
            return cities.map(c=> <option key={c} value={c} />)
          })()}
        </datalist>
        <button onClick={()=>fetchItems({ search, city: cityFilter, state: stateFilter })} style={{ marginLeft:8 }}>Search</button>
      </div>

      {loading ? <div className="card">Loading...</div> : null}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap:12 }}>
        {items.map(it => (
          <div className="card" key={it._id}>
            <div style={{ display:'flex', gap:12, alignItems:'center' }}>
              <div style={{ width:96, height:72, flex:'0 0 96px' }}>
                <img src={(it.photos && it.photos[0]) || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=60'} alt="thumb" style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:8 }} />
              </div>
              <div style={{ flex:1 }}>
                <h4 style={{ margin:0 }}>{it.name} <small style={{ color:'var(--muted)', fontSize:12 }}>({it.status})</small></h4>
                <div style={{ color:'var(--muted)', fontSize:13 }}>Last seen: {it.lastSeenLocation?.text || 'Unknown'}</div>
                <div style={{ marginTop:8 }}><Link to={`/missing/${it._id}`}>View Details</Link></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}
