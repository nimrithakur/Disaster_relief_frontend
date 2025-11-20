// import React, { useState } from 'react'
// import api from '../services/api'
// import { useNavigate, Link } from 'react-router-dom'
// import INDIA_STATES from '../data/indiaLocations'

// export default function ReportMissing(){
//   const [form, setForm] = useState({ name:'', age:'', gender:'', state:'India', city:'', lastSeenText:'' })
//   const [files, setFiles] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const navigate = useNavigate();

//   const token = localStorage.getItem('token')

//   const submit = async (e) => {
//     e.preventDefault();
//     setError('')
//     if (!token) return setError('You must be logged in to submit a report.');
//   const fd = new FormData();
//   // combine city/state into the lastSeenText for more structured location info
//   const combinedLocation = `${form.city ? form.city + ', ' : ''}${form.state && form.state !== 'India' ? form.state + ' - ' : ''}${form.lastSeenText || ''}`.trim();
//   const payload = { ...form, lastSeenText: combinedLocation };
//   Object.entries(payload).forEach(([k,v])=> fd.append(k, v));
//     if (files) Array.from(files).forEach(f=> fd.append('photos', f));
//     try{
//       setLoading(true)
//       await api.post('/missing', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
//       alert('Reported');
//       setForm({ name:'', age:'', gender:'', lastSeenText:'' });
//       setFiles(null);
//       navigate('/missing')
//     }catch(e){
//       console.error(e);
//       setError(e?.response?.data?.message || e.message || 'Submission failed');
//     }finally{ setLoading(false) }
//   }

//   return (
//     <div className="report-missing-page">
//       <div className="page-bg"></div>
//       <div className="container">
//       <h2>Report Missing Person</h2>
//       {!token ? (
//         <div className="card">
//           <p className="muted-small">You need to <Link to="/login">login</Link> or <Link to="/signup">create an account</Link> to submit a report.</p>
//         </div>
//       ) : null}

//       <form onSubmit={submit} className="card">
//         {error && <div style={{ color:'var(--danger)', marginBottom:8 }}>{error}</div>}
//         <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
//         <input type="number" placeholder="Age" min={0} max={120} value={form.age} onChange={e=>setForm({...form, age:e.target.value})} />
//         <select value={form.gender} onChange={e=>setForm({...form, gender:e.target.value})}>
//           <option value="">Select gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//           <option value="prefer_not">Prefer not to say</option>
//         </select>
//         <select value={form.state} onChange={e=>{ setForm({...form, state:e.target.value, city:''}) }}>
//           <option>India</option>
//           {INDIA_STATES.map(s=> <option key={s.name}>{s.name}</option>)}
//         </select>
//         <input list="cities" placeholder="City / District (optional)" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} />
//         <datalist id="cities">
//           {(function(){
//             const st = form.state && form.state !== 'India' ? INDIA_STATES.find(s=>s.name === form.state) : null
//             const cities = st ? st.cities : Array.from(new Set(INDIA_STATES.flatMap(s=>s.cities))).slice(0,120)
//             return cities.map(c=> <option key={c} value={c} />)
//           })()}
//         </datalist>
//   <input placeholder="Last seen (additional details / landmark)" value={form.lastSeenText} onChange={e=>setForm({...form, lastSeenText:e.target.value})} />
//         <label style={{ fontSize:12, color:'var(--muted)' }}>Attach photos (optional)</label>
//         <input type="file" multiple onChange={e=>setFiles(e.target.files)} />
//         <div style={{ marginTop:10 }}>
//           <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Report'}</button>
//         </div>
//       </form>
//       </div>
//     </div>
//   )
// }


import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'
import INDIA_STATES from '../data/indiaLocations'
import uploadImage  from '../services/uploadService'

export default function ReportMissing(){
  const [form, setForm] = useState({ 
    name:'', 
    age:'', 
    gender:'', 
    state:'India', 
    city:'', 
    lastSeenText:'' 
  })

  const [files, setFiles] = useState(null)
  const [photoUrls, setPhotoUrls] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  const submit = async (e) => {
    e.preventDefault();
    setError('')
    
    if (!token) 
      return setError('You must be logged in to submit a report.');

    try {
      setLoading(true)

      let uploadedUrls = [];

      // If images exist, upload them one by one
      if (files && files.length > 0) {
        for (const file of files) {
          const res = await uploadImage(file);
          if (res.imageUrl) uploadedUrls.push(res.imageUrl);
        }
      }

      const combinedLocation = `${form.city ? form.city + ', ' : ''}${form.state && form.state !== 'India' ? form.state + ' - ' : ''}${form.lastSeenText || ''}`.trim();
      
      const payload = { 
        ...form, 
        lastSeenText: combinedLocation,
        photos: uploadedUrls   // store Cloudinary URLs
      };

      await api.post('/missing', payload);

      alert('Reported successfully!');

      setForm({ name:'', age:'', gender:'', state:'India', city:'', lastSeenText:'' });
      setFiles(null);
      setPhotoUrls([]);
      navigate('/missing');

    } catch(err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="report-missing-page">
      <div className="page-bg"></div>
      <div className="container">
        <h2>Report Missing Person</h2>

        {!token ? (
          <div className="card">
            <p className="muted-small">
              You need to <Link to="/login">login</Link> or 
              <Link to="/signup"> create an account</Link> to submit a report.
            </p>
          </div>
        ) : null}

        <form onSubmit={submit} className="card">
          {error && (
            <div style={{ color:'var(--danger)', marginBottom:8 }}>
              {error}
            </div>
          )}

          <input 
            placeholder="Name" 
            value={form.name} 
            onChange={e=>setForm({...form, name:e.target.value})} 
            required 
          />

          <input 
            type="number" 
            placeholder="Age" 
            min={0} 
            max={120} 
            value={form.age} 
            onChange={e=>setForm({...form, age:e.target.value})} 
          />

          <select 
            value={form.gender} 
            onChange={e=>setForm({...form, gender:e.target.value})}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not">Prefer not to say</option>
          </select>

          <select 
            value={form.state} 
            onChange={e=>{ setForm({...form, state:e.target.value, city:''}) }}
          >
            <option>India</option>
            {INDIA_STATES.map(s=> <option key={s.name}>{s.name}</option>)}
          </select>

          <input 
            list="cities" 
            placeholder="City / District (optional)" 
            value={form.city} 
            onChange={e=>setForm({...form, city:e.target.value})} 
          />

          <datalist id="cities">
            {(function(){
              const st = form.state && form.state !== 'India' 
                ? INDIA_STATES.find(s=>s.name === form.state) 
                : null;

              const cities = st 
                ? st.cities 
                : Array.from(new Set(INDIA_STATES.flatMap(s=>s.cities))).slice(0,120)

              return cities.map(c=> <option key={c} value={c} />)
            })()}
          </datalist>

          <input 
            placeholder="Last seen (additional details / landmark)" 
            value={form.lastSeenText} 
            onChange={e=>setForm({...form, lastSeenText:e.target.value})} 
          />

          <label style={{ fontSize:12, color:'var(--muted)' }}>
            Attach photos (optional)
          </label>

          <input 
            type="file" 
            multiple 
            onChange={e=> setFiles(e.target.files)} 
          />

          <div style={{ marginTop:10 }}>
            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

