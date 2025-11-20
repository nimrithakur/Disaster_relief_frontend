import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <div className="brand">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Disaster Relief Finder <span className="dot">•</span>
          </Link>
        </div>

        <nav>
          <div className="nav-list">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/missing">Missing</Link>
            <Link className="nav-link" to="/report-missing">Report Missing</Link>
            <Link className="nav-link" to="/report-found">Report Found</Link>
            <Link className="nav-link" to="/donations">Donations</Link>
            {token ? (
              <button onClick={logout} className="nav-link" style={{ padding: '8px 12px' }}>Logout</button>
            ) : (
              <>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
