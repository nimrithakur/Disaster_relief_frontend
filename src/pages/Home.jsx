import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaClock, FaHeadset } from 'react-icons/fa'

export default function Home(){
  const [missing, setMissing] = useState([])

  useEffect(()=>{
    api.get('/missing').then(r=> setMissing(r.data)).catch(()=>{})
  },[])

  const items = missing.map(m => ({ id: m._id, lat: m.lastSeenLocation?.lat, lng: m.lastSeenLocation?.lng, title: m.name }))

  return (
    <div className="home-page">
      <div className="page-bg"></div>
      <div className="container">
      <section className="hero home-hero">
        <div className="left">
          <h1 className="float">Find and reunite — faster.</h1>
          <p>Report missing people, mark found reports, and coordinate donations across communities. Your help matters.</p>
          <div className="cta">
            <Link to="/report-missing"><button>Report Missing</button></Link>
            <Link to="/report-found" style={{ marginLeft: 8 }}><button style={{ background: 'rgba(255,255,255,0.06)', color: 'white' }}>Report Found</button></Link>
          </div>
        </div>

        {/* Right side: show hero image and quick stats (remove duplicate map) */}
        <aside style={{ width:360 }}>
          <div className="card" style={{ padding:0, overflow:'hidden' }}>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=60" alt="community" style={{ width:'100%', height:220, objectFit:'cover' }} />
            <div style={{ padding:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', gap:8 }}>
                <div>
                  <div style={{ fontSize:20, fontWeight:700 }}>{missing.length}</div>
                  <div style={{ color:'var(--muted)', fontSize:13 }}>Active reports</div>
                </div>
                <div>
                  <div style={{ fontSize:20, fontWeight:700 }}>{missing.filter(m=>m.status==='found').length}</div>
                  <div style={{ color:'var(--muted)', fontSize:13 }}>Marked found</div>
                </div>
              </div>
              <div style={{ marginTop:12, textAlign:'right' }}>
                <Link to="/missing"><button style={{ padding:'8px 12px' }}>View All</button></Link>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <h2 style={{ marginTop: 8, marginBottom: 24 }}>How Our Platform Helps Save Lives</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 40 }}>
        <div className="card">
          <div style={{ fontSize: 40, marginBottom: 12 }}>🚨</div>
          <h3 style={{ color: 'var(--accent-primary)', marginBottom: 12 }}>Report Missing Person</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
            <strong>When:</strong> Immediately when someone goes missing during a disaster or emergency.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
            <strong>Who:</strong> Family members, friends, or anyone who knows a missing person.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
            <strong>How:</strong> Fill out the report form with details (name, age, last seen location, photos). Our system instantly broadcasts this to volunteers and community members.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            <strong>Why:</strong> The first 48 hours are critical. Quick reporting increases the chances of finding missing persons safe and reuniting families.
          </p>
        </div>

        <div className="card">
          <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
          <h3 style={{ color: 'var(--accent-success)', marginBottom: 12 }}>Report Found Person</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
            <strong>When:</strong> When volunteers or community members locate or identify a missing person.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
            <strong>Who:</strong> Registered volunteers, rescue workers, or trained community helpers.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
            <strong>How:</strong> Match the found person with existing missing reports, add location details and photos for verification.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            <strong>Why:</strong> Instantly notify families and close the search loop. Real-time updates save resources and bring hope to desperate families.
          </p>
        </div>

        <div className="card">
          <div style={{ fontSize: 40, marginBottom: 12 }}>💝</div>
          <h3 style={{ color: 'var(--accent-warning)', marginBottom: 12 }}>Donate & Support</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
            <strong>When:</strong> Anytime you want to help disaster relief efforts and support affected families.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
            <strong>Who:</strong> Anyone - individuals, organizations, or businesses willing to contribute.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
            <strong>How:</strong> Pledge money, food, medical supplies, or other essential resources through our secure platform.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            <strong>Why:</strong> Relief efforts need funding and supplies. Your donations directly help reunite families and provide emergency aid.
          </p>
        </div>
      </div>

      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 107, 0.1))', padding: 32, marginBottom: 40 }}>
        <h3 style={{ fontSize: 28, marginBottom: 20, color: 'var(--text-primary)' }}>Why This Platform Exists</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <div>
            <h4 style={{ color: 'var(--accent-primary)', marginBottom: 8 }}>⏱️ Speed Saves Lives</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>
              During disasters (earthquakes, floods, fires), every minute counts. Our platform provides instant communication between families, volunteers, and rescue teams.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--accent-primary)', marginBottom: 8 }}>🤝 Community Power</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>
              Thousands of eyes are better than dozens. By crowdsourcing search efforts, we create a powerful network of helpers who can spot and report found persons quickly.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--accent-primary)', marginBottom: 8 }}>📱 Real-Time Updates</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>
              Live notifications via WebSockets ensure families get immediate updates when their loved ones are found. No more waiting hours for phone calls or news broadcasts.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--accent-primary)', marginBottom: 8 }}>🎯 Organized Relief</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>
              Centralized donation tracking ensures resources reach those who need them most. Transparent status updates keep everyone informed.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>📋 Recent Missing Reports</h3>
          {missing.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 20 }}>
              No missing reports currently. Great news! 🎉
            </p>
          ) : (
            missing.slice(0, 5).map(m => (
              <div key={m._id} style={{ padding: 12, marginBottom: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: `3px solid ${m.status === 'found' ? 'var(--accent-success)' : 'var(--accent-secondary)'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: 16 }}>{m.name}</strong>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                      Last seen: {m.lastSeenLocation?.text || 'Location unknown'}
                    </div>
                  </div>
                  <div style={{ 
                    padding: '4px 12px', 
                    borderRadius: 12, 
                    fontSize: 12, 
                    fontWeight: 600,
                    background: m.status === 'found' ? 'var(--accent-success)' : 'var(--accent-secondary)',
                    color: 'white'
                  }}>
                    {m.status.toUpperCase()}
                  </div>
                </div>
              </div>
            ))
          )}
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Link to="/missing">
              <button style={{ padding: '10px 20px' }}>View All Missing Reports →</button>
            </Link>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16 }}>🎯 Quick Start Guide</h3>
          <div style={{ marginBottom: 16 }}>
            <h4 style={{ fontSize: 15, color: 'var(--accent-primary)', marginBottom: 8 }}>For Families:</h4>
            <ol style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: 20 }}>
              <li>Create an account (takes 30 seconds)</li>
              <li>Click "Report Missing" and fill out the form</li>
              <li>Upload recent photos for better identification</li>
              <li>Wait for real-time notifications when volunteers report sightings</li>
            </ol>
          </div>
          <div>
            <h4 style={{ fontSize: 15, color: 'var(--accent-success)', marginBottom: 8 }}>For Volunteers:</h4>
            <ol style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: 20 }}>
              <li>Sign up as a "Volunteer" (not regular user)</li>
              <li>Browse missing persons in your area</li>
              <li>When you find someone, click "Report Found"</li>
              <li>Provide location details and verification photos</li>
              <li>System automatically notifies the family</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center', padding: 40 }}>
        <h3 style={{ fontSize: 32, marginBottom: 16 }}>Together We Save Lives</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 18, lineHeight: 1.8, maxWidth: 800, margin: '0 auto 24px' }}>
          Every disaster is a race against time. Our platform connects families, volunteers, and relief workers in real-time, 
          cutting search time from days to hours. Join thousands of helpers making a difference today.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/report-missing">
            <button style={{ padding: '14px 32px', fontSize: 16 }}>Report Someone Missing</button>
          </Link>
          <Link to="/signup">
            <button className="secondary" style={{ padding: '14px 32px', fontSize: 16 }}>Become a Volunteer</button>
          </Link>
          <Link to="/donations">
            <button style={{ background: 'linear-gradient(135deg, var(--accent-warning), var(--accent-secondary))', padding: '14px 32px', fontSize: 16 }}>Make a Donation</button>
          </Link>
        </div>
      </div>

      {/* Professional Contact Section */}
      <div className="contact-section-home" style={{ 
        marginTop: 60, 
        marginBottom: 40,
        background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(124,58,237,0.08))',
        borderRadius: 'var(--radius-xl)',
        padding: 48,
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(12px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0' }}></div>
        
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, marginBottom: 12, background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Get In Touch With Us
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>
            We're here 24/7 to help you during emergencies. Reach out anytime through any of the channels below.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, marginBottom: 48 }}>
          <div className="contact-card-home" style={{
            padding: 24,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255,255,255,0.06)',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            cursor: 'pointer'
          }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <FaPhone size={24} style={{ color: 'var(--accent-primary)' }} />
            </div>
            <h4 style={{ fontSize: 18, marginBottom: 12, color: 'var(--text-primary)' }}>Emergency Helpline</h4>
            <a href="tel:+919876543210" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 16, fontWeight: 500, transition: 'all 0.3s' }}>
              +91 98765 43210
            </a>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <FaClock size={12} /> Available 24/7
            </p>
          </div>

          <div className="contact-card-home" style={{
            padding: 24,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255,255,255,0.06)',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            cursor: 'pointer'
          }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <FaEnvelope size={24} style={{ color: '#7c3aed' }} />
            </div>
            <h4 style={{ fontSize: 18, marginBottom: 12, color: 'var(--text-primary)' }}>Email Support</h4>
            <a href="mailto:support@disasterrelief.org" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 16, fontWeight: 500, transition: 'all 0.3s' }}>
              support@disasterrelief.org
            </a>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <FaHeadset size={12} /> Response within 2 hours
            </p>
          </div>

          <div className="contact-card-home" style={{
            padding: 24,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255,255,255,0.06)',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            cursor: 'pointer'
          }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, rgba(255,107,107,0.2), rgba(255,107,107,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <FaMapMarkerAlt size={24} style={{ color: 'var(--accent-secondary)' }} />
            </div>
            <h4 style={{ fontSize: 18, marginBottom: 12, color: 'var(--text-primary)' }}>Headquarters</h4>
            <span style={{ color: 'var(--text-secondary)', fontSize: 16, fontWeight: 500 }}>
              New Delhi, India
            </span>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 8 }}>
              Serving communities nationwide
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h4 style={{ fontSize: 20, marginBottom: 24, color: 'var(--text-primary)' }}>Connect With Us</h4>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <a href="https://facebook.com/disasterrelieforg" target="_blank" rel="noreferrer" className="social-link-home social-facebook" style={{
              width: 56,
              height: 56,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 16,
              background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              border: '2px solid rgba(255,255,255,0.12)',
              color: '#1877F2',
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(12px)'
            }}>
              <FaFacebookF size={24} />
            </a>
            <a href="https://twitter.com/disasterrelief" target="_blank" rel="noreferrer" className="social-link-home social-twitter" style={{
              width: 56,
              height: 56,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 16,
              background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              border: '2px solid rgba(255,255,255,0.12)',
              color: '#1DA1F2',
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(12px)'
            }}>
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com/disasterrelief" target="_blank" rel="noreferrer" className="social-link-home social-instagram" style={{
              width: 56,
              height: 56,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 16,
              background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              border: '2px solid rgba(255,255,255,0.12)',
              color: '#E1306C',
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(12px)'
            }}>
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com/company/disasterrelief" target="_blank" rel="noreferrer" className="social-link-home social-linkedin" style={{
              width: 56,
              height: 56,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 16,
              background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              border: '2px solid rgba(255,255,255,0.12)',
              color: '#0A66C2',
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(12px)'
            }}>
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
