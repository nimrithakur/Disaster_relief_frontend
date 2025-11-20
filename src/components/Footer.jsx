import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope } from 'react-icons/fa'

export default function Footer(){
  return (
    <footer>
      <div className="container footer-contact-bar">
        <div className="contact-left">
          <div className="contact-item">
            <FaPhone />
            <a href="tel:+919876543210">+91 98765 43210</a>
          </div>
          <div className="contact-item">
            <FaEnvelope />
            <a href="mailto:support@disasterrelief.org">support@disasterrelief.org</a>
          </div>
        </div>

        <div className="contact-center">
          <div className="social-icons">
            <a href="https://facebook.com/disasterrelieforg" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-link social-facebook">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com/disasterrelief" target="_blank" rel="noreferrer" aria-label="Twitter" className="social-link social-twitter">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com/disasterrelief" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-link social-instagram">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com/company/disasterrelief" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-link social-linkedin">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        <div className="contact-right">
          <div style={{ color:'var(--text-muted)', fontSize:14 }}>
            © {new Date().getFullYear()} Disaster Relief Finder
          </div>
        </div>
      </div>
    </footer>
  )
}
