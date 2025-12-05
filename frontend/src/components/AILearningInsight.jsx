import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import './AILearningInsight.css'

const AILearningInsight = () => {
  const [showPopup, setShowPopup] = useState(true)

  // Data for Most Active Time
  const activeTimeData = [
    { name: 'Morning', value: 35 },
    { name: 'Afternoon', value: 60 },
    { name: 'Evening', value: 85 },
  ]

  // Data for Learning Pattern
  const learningPatternData = [
    { name: 'Consistent Learner', value: 75, color: '#10B981' },
    { name: 'Fast Learner', value: 15, color: '#34D399' },
    { name: 'Reflective Learner', value: 10, color: '#6EE7B7' },
  ]

  // Consistency Score Data
  const consistencyScore = 57
  const consistencyData = [
    { name: 'Consistent', value: consistencyScore, fill: '#00C9A7' },
    { name: 'Remaining', value: 100 - consistencyScore, fill: '#B8E6D9' },
  ]

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  return (
    <div className="ai-learning-insight">
      {/* Navigation Header */}
      <div className="nav-header">
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo">
            <img 
              src="https://assets.cdn.dicoding.com/original/commons/certificate_logo.png" 
              alt="Dicoding Logo" 
              className="nav-logo-img"
            />
          </div>

          {/* Navigation Menu */}
          <nav className="nav-menu">
            <a href="#home" className="nav-link active">Home</a>
            <a href="#academy" className="nav-link">Academy</a>
            <a href="#challenge" className="nav-link">Challenge</a>
            <a href="#event" className="nav-link">Event</a>
            <a href="#job" className="nav-link">Job</a>
          </nav>

          {/* User Icons */}
          <div className="nav-icons">
            <div className="user-profile">
              <div className="profile-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" fill="#9CA3AF"/>
                  <path d="M6 21c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9l6 6 6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <button className="notification-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="header-section">
        <div className="header-content">
          <h1 className="header-title">Selamat datang Melisa!</h1>
          <p className="header-subtitle">
            Semoga aktivitas belajarmu menyenangkan.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Most Active Time Card */}
        <div className="insight-card">
          <div className="card-header">
            <div className="card-title-section">
              <h2 className="card-title">Most Active Time</h2>
              <p className="card-description">
                Kenali pola waktu belajarmu dan optimalkan jam fokus terbaikmu
              </p>
            </div>
          </div>
          <div className="card-content">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={activeTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" tick={{ fill: '#1E4D72', fontSize: 12 }} />
                  <YAxis hide />
                  <Bar dataKey="value" fill="#1E4D72" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="card-text">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur.
            </p>
            <button className="card-button">LIHAT SELENGKAPNYA</button>
          </div>
        </div>

        {/* Consistency Score Card */}
        <div className="insight-card consistency-card">
          {/* Top Inner Card */}
          <div className="consistency-inner-card consistency-top-inner-card">
            <div className="consistency-main-content">
              {/* Left Section */}
              <div className="consistency-left-section">
                <div className="consistency-level-label-quoted">"Hight"</div>
                <div className="donut-chart-wrapper">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={consistencyData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                      >
                        {consistencyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="donut-chart-center">
                    <span className="consistency-percentage">{consistencyScore}%</span>
                  </div>
                </div>
                <p className="consistency-message">
                  Kamu belajar 4 dari 7 hari<br />
                  minggu ini. Konsistensimu tinggi!
                </p>
              </div>

              {/* Right Section */}
              <div className="consistency-right-section">
                <h2 className="card-title">Consistency Score</h2>
                <p className="card-description">
                  Ketahui seberapa rutin kamu belajar dan ayo tingkatkan konsistensimu perlahan
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Inner Card */}
          <div className="consistency-inner-card consistency-bottom-inner-card">
            <p className="card-text">
              Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien Lorem ipsum dolor sit amet consectetur
            </p>
            <button className="card-button">SELENGKAPNYA &gt;</button>
          </div>
        </div>

        {/* Learning Pattern Card */}
        <div className="insight-card pattern-card">
          {/* Top Inner Card */}
          <div className="pattern-inner-card pattern-top-card">
            <div className="card-header">
              <div className="card-title-section">
                <h2 className="card-title">Learning Pattern</h2>
                <p className="card-description">
                  Temukan pola belajarmu dan ketahui kategori yang mencerminkan caramu belajar
                </p>
              </div>
            </div>
            <div className="pattern-chart-container">
              <div className="pie-chart-wrapper">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={learningPatternData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {learningPatternData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="pattern-legend">
                {learningPatternData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                    <span className="legend-label">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pattern-result">
              <p className="pattern-type">Consistent Learner</p>
            </div>
          </div>

          {/* Bottom Inner Card */}
          <div className="pattern-inner-card pattern-bottom-inner-card">
            <p className="card-text">
              Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien Lorem ipsum dolor sit amet consectetur
            </p>
            <button className="card-button">SELENGKAPNYA &gt;</button>
          </div>
        </div>

        {/* Quote Section */}
        <div className="quote-section">
          <div className="quote-decoration">
            <span className="quote-badge">
              <img 
                src="https://assets.cdn.dicoding.com/original/commons/certificate_logo.png" 
                alt="Dicoding Logo" 
                className="dicoding-logo-small"
              />
            </span>
            <span className="quote-badge">
              <img 
                src="https://assets.cdn.dicoding.com/original/commons/certificate_logo.png" 
                alt="Dicoding Logo" 
                className="dicoding-logo-small"
              />
            </span>
            <span className="quote-badge">
              <img 
                src="https://assets.cdn.dicoding.com/original/commons/certificate_logo.png" 
                alt="Dicoding Logo" 
                className="dicoding-logo-small"
              />
            </span>
          </div>
          <blockquote className="quote-text">
            Hasil yang luar biasa datang bukan dari tindakan yang besar, tetapi dari konsistensi tindakan-tindakan kecil.
          </blockquote>
          <p className="quote-author">- Thorpean Abbot</p>
          <div className="quote-decoration">
            <span className="quote-badge">
              <img 
                src="https://assets.cdn.dicoding.com/original/commons/certificate_logo.png" 
                alt="Dicoding Logo" 
                className="dicoding-logo-small"
              />
            </span>
            <span className="quote-badge">
              <img 
                src="https://assets.cdn.dicoding.com/original/commons/certificate_logo.png" 
                alt="Dicoding Logo" 
                className="dicoding-logo-small"
              />
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer"></div>

      {/* Popup Message */}
      {showPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="popup-title">U Do It amazing Today</h2>

            <div className="popup-text">
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <p>adipiscing elit quisque faucibus ex sapien</p>
              <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>

            <button className="popup-button" onClick={handleClosePopup}>
              KEMBALI
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AILearningInsight

