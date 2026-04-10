import { useState } from 'react'
import '../styles/dashboard.css'

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="company-name">AsanShipCo</h1>
          <p className="subtitle">Shipping Management System</p>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Sidebar Navigation */}
        <aside className="sidebar">
          <nav className="nav-menu">
            <button
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview
            </button>
            <button
              className={`nav-item ${activeTab === 'shipments' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipments')}
            >
              📦 Shipments
            </button>
            <button
              className={`nav-item ${activeTab === 'tracking' ? 'active' : ''}`}
              onClick={() => setActiveTab('tracking')}
            >
              📍 Tracking
            </button>
            <button
              className={`nav-item ${activeTab === 'routes' ? 'active' : ''}`}
              onClick={() => setActiveTab('routes')}
            >
              🗺️ Routes
            </button>
            <button
              className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              📈 Reports
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {activeTab === 'overview' && (
            <section className="content-section">
              <h2 className="section-title">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📦</div>
                  <div className="stat-info">
                    <p className="stat-label">Total Shipments</p>
                    <p className="stat-value">1,248</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">✅</div>
                  <div className="stat-info">
                    <p className="stat-label">Delivered</p>
                    <p className="stat-value">1,087</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🚚</div>
                  <div className="stat-info">
                    <p className="stat-label">In Transit</p>
                    <p className="stat-value">128</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⏳</div>
                  <div className="stat-info">
                    <p className="stat-label">Pending</p>
                    <p className="stat-value">33</p>
                  </div>
                </div>
              </div>

              {/* Recent Shipments Table */}
              <div className="recent-shipments">
                <h3>Recent Shipments</h3>
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Tracking #</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Status</th>
                        <th>Expected Delivery</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#ASC-001234</td>
                        <td>New York</td>
                        <td>Los Angeles</td>
                        <td><span className="status-badge delivered">Delivered</span></td>
                        <td>Apr 08, 2026</td>
                      </tr>
                      <tr>
                        <td>#ASC-001235</td>
                        <td>Chicago</td>
                        <td>Miami</td>
                        <td><span className="status-badge in-transit">In Transit</span></td>
                        <td>Apr 12, 2026</td>
                      </tr>
                      <tr>
                        <td>#ASC-001236</td>
                        <td>Seattle</td>
                        <td>Denver</td>
                        <td><span className="status-badge pending">Pending</span></td>
                        <td>Apr 15, 2026</td>
                      </tr>
                      <tr>
                        <td>#ASC-001237</td>
                        <td>Boston</td>
                        <td>Atlanta</td>
                        <td><span className="status-badge in-transit">In Transit</span></td>
                        <td>Apr 11, 2026</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'shipments' && (
            <section className="content-section">
              <h2 className="section-title">Manage Shipments</h2>
              <div className="placeholder-content">
                <p>Shipments management interface will be displayed here.</p>
                <button className="create-btn">+ Create New Shipment</button>
              </div>
            </section>
          )}

          {activeTab === 'tracking' && (
            <section className="content-section">
              <h2 className="section-title">Track Shipments</h2>
              <div className="placeholder-content">
                <input type="text" placeholder="Enter tracking number..." className="search-input" />
                <p>Enter a tracking number to view shipment details and location.</p>
              </div>
            </section>
          )}

          {activeTab === 'routes' && (
            <section className="content-section">
              <h2 className="section-title">Route Management</h2>
              <div className="placeholder-content">
                <p>Route optimization and management interface will be displayed here.</p>
              </div>
            </section>
          )}

          {activeTab === 'reports' && (
            <section className="content-section">
              <h2 className="section-title">Reports & Analytics</h2>
              <div className="placeholder-content">
                <p>Analytics and reporting interface will be displayed here.</p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
