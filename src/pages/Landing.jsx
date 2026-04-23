import { Link } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import '../styles/landing.css';

function Landing() {
  return (
    <>
      <Navbar isLoggedIn={false} />
      <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1><img src="/tab2.png" alt="Truck" className="logo-icon" /> AsanShipCo</h1>
          <p>Professional Vehicle Shipping & Logistics</p>
          <Link to="/login" className="hero-cta">
            Get Started
          </Link>
        </div>
        <div className="hero-background">
          <div className="shape-1"></div>
          <div className="shape-2"></div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <h2>About AsanShipCo</h2>
          <p>
            We are a leading provider of professional vehicle shipping and logistics services. With years of experience
            and a commitment to excellence, we ensure your vehicles are delivered safely and on time.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🚗</div>
              <h3>Vehicle Shipping</h3>
              <p>Safe and reliable shipping for all types of vehicles across the country.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📍</div>
              <h3>Real-Time Tracking</h3>
              <p>Track your shipment in real-time with our advanced tracking system.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💼</div>
              <h3>Professional Management</h3>
              <p>Expert handling and customer support throughout the shipping process.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>Fast Delivery</h3>
              <p>Quick and efficient delivery with flexible scheduling options.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <ul className="features-list">
            <li>✅ Experienced team with 20+ years in logistics</li>
            <li>✅ Full insurance coverage for all shipments</li>
            <li>✅ 24/7 customer support</li>
            <li>✅ Competitive pricing and flexible payment options</li>
            <li>✅ Nationwide coverage</li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Ship Your Vehicle?</h2>
          <p>Join thousands of satisfied customers who trust AsanShipCo</p>
          <Link to="/login" className="cta-button">
            Login
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 AsanShipCo. All rights reserved.</p>
      </footer>
      </div>
    </>
  );
}

export default Landing;
