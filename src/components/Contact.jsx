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
        <h2>Get in Touch</h2>
        <p className="contact-subtitle">We're here to help you with your shipping needs</p>
        
        <div className="contact-grid">
          <a
            href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card whatsapp"
          >
            <div className="contact-icon">
              <span>💬</span>
            </div>
            <h3>WhatsApp</h3>
            <p>{contactInfo.whatsapp}</p>
            <span className="contact-link">Message us →</span>
          </a>

          <a
            href={`tel:${contactInfo.phone}`}
            className="contact-card phone"
          >
            <div className="contact-icon">
              <span>📞</span>
            </div>
            <h3>Phone</h3>
            <p>{contactInfo.phone}</p>
            <span className="contact-link">Call us →</span>
          </a>

          <a
            href={`mailto:${contactInfo.email}`}
            className="contact-card email"
          >
            <div className="contact-icon">
              <span>✉️</span>
            </div>
            <h3>Email</h3>
            <p>{contactInfo.email}</p>
            <span className="contact-link">Send email →</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
