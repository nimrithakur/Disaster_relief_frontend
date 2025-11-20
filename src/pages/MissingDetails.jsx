import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function MissingDetails(){
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{ api.get(`/missing/${id}`).then(r=> setItem(r.data)).catch(()=>{}) },[id])

  const markFound = async ()=>{
    try{
      await api.put(`/missing/${id}/status`, { status: 'found' });
      navigate('/missing');
    }catch(e){ console.error(e) }
  }

  if(!item) return (
    <div className="missing-details-page">
      <div className="page-bg"></div>
      <div className="container">Loading...</div>
    </div>
  )

  return (
    <div className="missing-details-page">
      <div className="page-bg"></div>
      <div className="container">
      <h2>{item.name}</h2>
      <div className="card">
        <div style={{ display:'flex', gap:16, alignItems:'flex-start' }}>
          <div style={{ flex:'0 0 360px' }}>
            <img src={(item.photos && item.photos[0]) || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=60'} alt="main" style={{ width:'100%', borderRadius:10 }} />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ marginBottom:8 }}><strong>Age:</strong> {item.age}</div>
            <div style={{ marginBottom:8 }}><strong>Gender:</strong> {item.gender}</div>
            <div style={{ marginBottom:8 }}><strong>Last seen:</strong> {item.lastSeenLocation?.text}</div>
            <div style={{ marginBottom:8 }}><strong>Status:</strong> {item.status}</div>
            {item.photos && item.photos.length > 1 && (
              <div style={{ marginTop:10, display:'flex', gap:8 }}>
                {item.photos.slice(1).map(p => <img key={p} src={p} alt="photo" style={{ width:100, height:80, objectFit:'cover', borderRadius:8 }} />)}
              </div>
            )}
          </div>
        </div>
        <div style={{ marginTop:12 }}>
          <button onClick={markFound}>Mark as Found (volunteer only)</button>
        </div>
      </div>
      </div>
    </div>
  )
}
