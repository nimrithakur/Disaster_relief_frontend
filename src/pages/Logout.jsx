import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout(){
  const navigate = useNavigate()
  
  useEffect(() => {
    localStorage.removeItem('token')
    setTimeout(() => navigate('/login'), 500)
  }, [navigate])
  
  return (
    <div style={{ padding: 30, textAlign: 'center' }}>
      <h3>Logging out...</h3>
    </div>
  )
}
