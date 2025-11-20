import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function OAuth(){
  const navigate = useNavigate()
  const [msg, setMsg] = useState('Completing sign-in...')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const err = params.get('error')
    if (token) {
      localStorage.setItem('token', token)
      setMsg('Sign-in successful. Redirecting...')
      setTimeout(() => navigate('/'), 800)
    } else if (err) {
      if (err === 'google_not_configured') setMsg('Google sign-in is not configured on the server.')
      else if (err === 'facebook_not_configured') setMsg('Facebook sign-in is not configured on the server.')
      else if (err === 'no_token') setMsg('Authentication completed but no token was received.')
      else setMsg('Sign-in failed. Please try again.')
    } else {
      setMsg('No token received. Please try signing in again.')
    }
  }, [navigate])

  return (
    <div style={{ padding:30, textAlign:'center' }}>
      <h3>{msg}</h3>
    </div>
  )
}
