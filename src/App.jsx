import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import OfflineIndicator from './components/OfflineIndicator'
import Home from './pages/Home'
import MissingList from './pages/MissingList'
import MissingDetails from './pages/MissingDetails'
import ReportMissing from './pages/ReportMissing'
import ReportFound from './pages/ReportFound'
import Donations from './pages/Donations'
import Login from './pages/Login'
import Signup from './pages/Signup'
import OAuth from './pages/OAuth'
import Logout from './pages/Logout'
import { initSocket } from './utils/socket'
import { initDB } from './utils/offlineDB'

export default function App() {
  useEffect(() => {
    // Initialize socket connection
    initSocket();
    
    // Initialize offline database
    initDB().then(() => {
      console.log('✅ Offline database initialized');
    }).catch(err => {
      console.error('❌ Failed to initialize offline DB:', err);
    });
  }, []);

  return (
    <div className="app-root">
      <OfflineIndicator />
      <Navbar />
      <main style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/missing" element={<MissingList />} />
          <Route path="/missing/:id" element={<MissingDetails />} />
          <Route path="/report-missing" element={<ReportMissing />} />
          <Route path="/report-found" element={<ReportFound />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/oauth" element={<OAuth />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
