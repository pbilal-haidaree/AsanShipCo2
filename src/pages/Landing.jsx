import { Link } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import Contact from '../components/Contact';
import '../styles/landing.css';

function Landing() {
  return (
    <>
      <Navbar isLoggedIn={false} />
      <div className="landing">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-bg">
            <div className="hero-gradient"></div>
            <div className="hero-pattern"></div>
          </div>
          <div className="hero-content">
            <span className="hero-badge">Trusted by 1,000+ customers worldwide</span>
            <h1>Ship Your Vehicle<br /><span className="hero-highlight">Anywhere, Anytime</span></h1>
            <p className="hero-subtitle">
              Professional vehicle shipping and logistics with real-time tracking,
              full insurance coverage, and dedicated support from pickup to delivery.
            </p>
            <div className="hero-actions">
              <Link to="/login" className="hero-cta primary">
                Get Started
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <a href="#services" className="hero-cta secondary">
                Our Services
              </a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>20+</strong>
                <span>Years Experience</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <strong>50K+</strong>
                <span>Vehicles Shipped</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <strong>99.8%</strong>
                <span>Safe Delivery</span>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about" id="about">
          <div className="container">
            <span className="section-tag">About Us</span>
            <h2>Your Trusted Vehicle<br />Shipping Partner</h2>
            <p className="about-text">
              AsanShipCo is a leading provider of professional vehicle shipping and logistics services.
              With two decades of experience and a commitment to excellence, we ensure your vehicles
              are delivered safely, on time, and with complete peace of mind. From compact cars to
              heavy-duty trucks, we handle it all.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="services" id="services">
          <div className="container">
            <span className="section-tag">What We Offer</span>
            <h2>Our Services</h2>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                    <path d="M5 17H3v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0H9"/>
                    <path d="M10 5l0 6"/>
                  </svg>
                </div>
                <h3>Vehicle Shipping</h3>
                <p>Safe and reliable door-to-door shipping for all types of vehicles across the country and internationally.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/>
                    <path d="M12 2l0 3"/>
                    <path d="M12 19l0 3"/>
                    <path d="M2 12l3 0"/>
                    <path d="M19 12l3 0"/>
                    <path d="M4.93 4.93l2.12 2.12"/>
                    <path d="M16.95 16.95l2.12 2.12"/>
                    <path d="M4.93 19.07l2.12-2.12"/>
                    <path d="M16.95 7.05l2.12-2.12"/>
                  </svg>
                </div>
                <h3>Real-Time Tracking</h3>
                <p>Track your shipment in real-time with our advanced GPS tracking system and get live status updates.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2l4-4"/>
                    <path d="M12 3a12 12 0 0 0 8.5 3A12 12 0 0 1 12 21 12 12 0 0 1 3.5 6 12 12 0 0 0 12 3"/>
                  </svg>
                </div>
                <h3>Full Insurance</h3>
                <p>Every shipment is covered by comprehensive insurance, so your vehicle is protected from start to finish.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 3l0 7l6 0l-8 11l0-7l-6 0l8-11"/>
                  </svg>
                </div>
                <h3>Express Delivery</h3>
                <p>Need it fast? Our express service ensures quick delivery with flexible scheduling and priority handling.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features" id="features">
          <div className="container">
            <span className="section-tag">Why Us</span>
            <h2>Why Choose AsanShipCo?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-check">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <div>
                  <h4>Experienced Team</h4>
                  <p>20+ years in vehicle logistics with certified professionals</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-check">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <div>
                  <h4>Full Insurance Coverage</h4>
                  <p>Comprehensive protection for every shipment, guaranteed</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-check">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <div>
                  <h4>24/7 Support</h4>
                  <p>Round-the-clock customer support via phone, chat, and email</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-check">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <div>
                  <h4>Competitive Pricing</h4>
                  <p>Transparent pricing with no hidden fees and flexible payment options</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-check">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <div>
                  <h4>Nationwide Coverage</h4>
                  <p>Serving all 50 states with international shipping options</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-check">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <div>
                  <h4>Door-to-Door Service</h4>
                  <p>Convenient pickup and delivery right at your doorstep</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <h2>Ready to Ship Your Vehicle?</h2>
            <p>Join thousands of satisfied customers who trust AsanShipCo for safe, reliable vehicle shipping.</p>
            <Link to="/login" className="cta-button">
              Get Started Today
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </section>

        {/* Contact Section */}
        <Contact />

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-brand">
              <img src="/tab2.png" alt="AsanShipCo" className="footer-logo" />
              <span>AsanShipCo</span>
            </div>
            <p>&copy; {new Date().getFullYear()} AsanShipCo. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Landing;
