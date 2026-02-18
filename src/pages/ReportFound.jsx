// import React, { useEffect, useState } from 'react'
// import api from '../services/api'
// import { useNavigate, Link } from 'react-router-dom'

// export default function ReportFound(){
//   const [missing, setMissing] = useState([])
//   const [form, setForm] = useState({ missingPersonId:'', notes:'', locationText:'' })
//   const [files, setFiles] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [userRole, setUserRole] = useState(null)
//   const navigate = useNavigate()

//   const token = localStorage.getItem('token')

//   useEffect(()=>{ 
//     api.get('/missing').then(r=> setMissing(r.data)).catch(()=>{})
//     if (token) {
//       api.get('/auth/me').then(r=> setUserRole(r.data.role)).catch(()=>{})
//     }
//   },[])

//   const submit = async (e) => {
//     e.preventDefault();
//     setError('')
//     if (!token) return setError('You must be logged in as a volunteer to submit found reports.')
//     const fd = new FormData();
//     Object.entries(form).forEach(([k,v])=> fd.append(k, v));
//     if (files) Array.from(files).forEach(f=> fd.append('photos', f));
//     try{
//       setLoading(true)
//       // ✅ FIXED: Added Authorization header with Bearer token
//       await api.post('/found', fd, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       alert('Found report submitted');
//       setForm({ missingPersonId:'', notes:'', locationText:'' });
//       setFiles(null);
//       navigate('/missing')
//     }catch(e){ 
//       console.error(e); 
//       const errMsg = e?.response?.data?.message || e.message || 'Submission failed';
//       if (e?.response?.status === 403) {
//         setError(`Access Denied: ${errMsg}. You need Volunteer or Admin role. Current role: ${userRole || 'unknown'}`);
//       } else {
//         setError(errMsg);
//       }
//     }
//     finally{ setLoading(false) }
//   }

//   return (
//     <div className="report-found-page">
//       <div className="page-bg"></div>
//       <div className="container">
//       <h2>Report Found Person (volunteer)</h2>
//       {!token ? (
//         <div className="card"><p className="muted-small">You must <Link to="/login">login</Link> as a volunteer to submit found reports.</p></div>
//       ) : userRole && userRole === 'user' ? (
//         <div className="card" style={{ background: 'var(--danger)', color: 'white', padding: 16, marginBottom: 16 }}>
//           <p style={{ margin: 0, fontWeight: 600 }}>⚠️ Access Denied: Your account role is "{userRole}"</p>
//           <p style={{ margin: '8px 0 0 0', fontSize: 14 }}>
//             You need <strong>Volunteer</strong> or <strong>Admin</strong> role to submit found reports.
//             <br/>Please create a new account with Volunteer role at <Link to="/signup" style={{ color: 'white', textDecoration: 'underline' }}>Signup</Link>.
//           </p>
//         </div>
//       ) : null}

//       <form onSubmit={submit} className="card">
//         {error && <div style={{ color:'var(--danger)', marginBottom:8 }}>{error}</div>}
//         <select value={form.missingPersonId} onChange={e=>setForm({...form, missingPersonId:e.target.value})} required>
//           <option value="">Select missing person</option>
//           {missing.map(m=> <option key={m._id} value={m._id}>{m.name}</option>)}
//         </select>
//         <textarea placeholder="Notes" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
//         <input placeholder="Location description (where found)" value={form.locationText} onChange={e=>setForm({...form, locationText:e.target.value})} />
//         <label style={{ fontSize:12, color:'var(--muted)' }}>Attach photos (optional)</label>
//         <input type="file" multiple onChange={e=>setFiles(e.target.files)} />
//         <div style={{ marginTop:10 }}>
//           <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Found Report'}</button>
//         </div>
//       </form>
//       </div>
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react'
import api from '../services/api'
import uploadService from '../services/uploadService'
import { useNavigate, Link } from 'react-router-dom'

export default function ReportFound(){
  const [missing, setMissing] = useState([])
  const [form, setForm] = useState({
    missingPersonId:'',
    notes:'',
    locationText:''
  })
  const [files, setFiles] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userRole, setUserRole] = useState(null)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  useEffect(()=>{ 
    api.get('/missing')
      .then(r=> setMissing(r.data))
      .catch(()=>{})

    if (token) {
      api.get('/auth/me')
        .then(r=> setUserRole(r.data.role))
        .catch(()=>{})
    }
  },[])

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    if (!token) return setError('You must be logged in as a volunteer to submit found reports.')

    try{
      setLoading(true)
      let uploadedPhotos = []

      // ----------------------------------------
      // 1️⃣ Upload images to Cloudinary
      // ----------------------------------------
      if (files && files.length > 0) {
        uploadedPhotos = await uploadService.uploadToCloudinary(files)
      }

      // ----------------------------------------
      // 2️⃣ Send report to backend
      // ----------------------------------------
      await api.post('/found', {
        ...form,
        photos: uploadedPhotos   
      })

      alert('Found report submitted')

      setForm({ missingPersonId:'', notes:'', locationText:'' })
      setFiles(null)
      navigate('/missing')

    } catch(e){
      console.error(e)

      const errMsg = e?.response?.data?.message || e.message || 'Submission failed'
      
      if (e?.response?.status === 403) {
        setError(
          `Access Denied: ${errMsg}. You need Volunteer or Admin role. Current role: ${userRole || 'unknown'}`
        )
      } else {
        setError(errMsg)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="report-found-page">
      <div className="page-bg"></div>
      <div className="container">
      <h2>Report Found Person (volunteer)</h2>

      {!token ? (
        <div className="card">
          <p className="muted-small">
            You must <Link to="/login">login</Link> as a volunteer to submit found reports.
          </p>
        </div>
      ) : userRole && userRole === 'user' ? (
        <div 
          className="card"
          style={{
            background: 'var(--danger)',
            color: 'white',
            padding: 16,
            marginBottom: 16
          }}
        >
          <p style={{ margin: 0, fontWeight: 600 }}>
            ⚠️ Access Denied: Your account role is "{userRole}"
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: 14 }}>
            You need <strong>Volunteer</strong> or <strong>Admin</strong> role to submit found reports.
            <br/>
            Please create a new account with Volunteer role at{' '}
            <Link to="/signup" style={{ color: 'white', textDecoration: 'underline' }}>
              Signup
            </Link>
          </p>
        </div>
      ) : null}

      <form onSubmit={submit} className="card">

        {error && <div style={{ color:'var(--danger)', marginBottom:8 }}>{error}</div>}

        <select 
          value={form.missingPersonId}
          onChange={e=>setForm({ ...form, missingPersonId: e.target.value })}
          required
        >
          <option value="">Select missing person</option>
          {missing.map(m=> (
            <option key={m._id} value={m._id}>{m.name}</option>
          ))}
        </select>

        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={e=>setForm({ ...form, notes: e.target.value })}
        />

        <input
          placeholder="Location description (where found)"
          value={form.locationText}
          onChange={e=>setForm({ ...form, locationText: e.target.value })}
        />

        <label style={{ fontSize:12, color:'var(--muted)' }}>
          Attach photos (optional)
        </label>
        <input type="file" multiple onChange={e=>setFiles(e.target.files)} />

        <div style={{ marginTop:10 }}>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Found Report'}
          </button>
        </div>
      </form>
      </div>
    </div>
  )
}

