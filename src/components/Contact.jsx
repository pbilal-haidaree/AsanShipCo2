// Contact section. Displays WhatsApp, phone, and email links. Supports full and compact modes.
import '../styles/contact.css';

function Contact({ compact = false }) {
  const contactInfo = {
    phone: '+1 (555) 123-4567',
    whatsapp: '+1 (555) 123-4567',
    email: 'contact@asanshipco.com'
  };

  return (
    <section className={`contact-section ${compact ? 'compact' : ''}`}>
      <div className="container">
        {!compact && (
          <>
            <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>Contact</span>
            <h2>Get in Touch</h2>
            <p className="contact-subtitle">We're here to help you with your shipping needs</p>
          </>
        )}
        {compact && <h3 className="contact-compact-title">Need Help? Contact Us</h3>}

        <div className="contact-grid">
          <a
            href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card whatsapp"
          >
            <div className="contact-icon">
              <svg width={compact ? "22" : "28"} height={compact ? "22" : "28"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
              </svg>
            </div>
            <div className="contact-info">
              <h4>WhatsApp</h4>
              <p>{contactInfo.whatsapp}</p>
            </div>
            <span className="contact-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </a>

          <a
            href={`tel:${contactInfo.phone}`}
            className="contact-card phone"
          >
            <div className="contact-icon">
              <svg width={compact ? "22" : "28"} height={compact ? "22" : "28"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </div>
            <div className="contact-info">
              <h4>Phone</h4>
              <p>{contactInfo.phone}</p>
            </div>
            <span className="contact-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </a>

          <a
            href={`mailto:${contactInfo.email}`}
            className="contact-card email"
          >
            <div className="contact-icon">
              <svg width={compact ? "22" : "28"} height={compact ? "22" : "28"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
              </svg>
            </div>
            <div className="contact-info">
              <h4>Email</h4>
              <p>{contactInfo.email}</p>
            </div>
            <span className="contact-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
