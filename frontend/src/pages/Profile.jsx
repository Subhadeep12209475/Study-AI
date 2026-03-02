import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import '../styles/globals.css';
import '../styles/subject.css';
import '../styles/profile.css';

export default function Profile() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    studyReminders: true,
    darkMode: true
  });

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <div className="page-container">
          <header className="page-header">
            <div>
              <h1 className="page-title"><span className="title-gradient">Profile Settings</span></h1>
              <p className="page-subtitle">Manage your account and preferences</p>
            </div>
          </header>

          <div className="profile-container">
            <div className="profile-grid">
              {/* Profile Sidebar */}
              <div className="profile-sidebar">
                <div className="profile-card">
                  <div className="profile-avatar-section">
                    <div className="profile-avatar">
                      <img src="https://api.dicebear.com/7.x/personas/svg?seed=Subhadeep&clothing=blazer,shirt" alt="Profile" />
                      <div className="avatar-badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                        </svg>
                      </div>
                    </div>
                    <h2 className="profile-name">Subhadeep Mukherjee </h2>
                    <p className="profile-role">Computer Science Student</p>
                    <div className="profile-stats">
                      <div className="stat-item">
                        <span className="stat-value">12</span>
                        <span className="stat-label">Subjects</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">142h</span>
                        <span className="stat-label">Study Time</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">8</span>
                        <span className="stat-label">Exams</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="profile-card quick-actions">
                  <button className="action-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    Study History
                  </button>
                  <button className="action-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10 9 9 9 8 9"/>
                    </svg>
                    Achievements
                  </button>
                  <button className="action-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
                    </svg>
                    Preferences
                  </button>
                </div>
              </div>

              {/* Profile Main */}
              <div className="profile-main">
                <div className="settings-section">
                  <div className="section-header">
                    <h3 className="section-title">Personal Information</h3>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input type="text" className="form-input" defaultValue="Alex" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input type="text" className="form-input" defaultValue="Johnson" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" defaultValue="alex.johnson@university.edu" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Bio</label>
                    <textarea className="form-input form-textarea" placeholder="Tell us about yourself..."></textarea>
                  </div>
                  <button className="btn-save">Save Changes</button>
                </div>

                <div className="settings-section">
                  <div className="section-header">
                    <h3 className="section-title">Notifications</h3>
                  </div>
                  <div className="toggle-group">
                    <div className="toggle-info">
                      <h4>Email Notifications</h4>
                      <p>Receive updates about your study progress</p>
                    </div>
                    <div className={`toggle-switch ${settings.emailNotifications ? 'active' : ''}`} 
                         onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})}>
                    </div>
                  </div>
                  <div className="toggle-group">
                    <div className="toggle-info">
                      <h4>Study Reminders</h4>
                      <p>Get reminded about upcoming study sessions</p>
                    </div>
                    <div className={`toggle-switch ${settings.studyReminders ? 'active' : ''}`}
                         onClick={() => setSettings({...settings, studyReminders: !settings.studyReminders})}>
                    </div>
                  </div>
                  <div className="toggle-group">
                    <div className="toggle-info">
                      <h4>Dark Mode</h4>
                      <p>Use dark theme across the application</p>
                    </div>
                    <div className={`toggle-switch ${settings.darkMode ? 'active' : ''}`}
                         onClick={() => setSettings({...settings, darkMode: !settings.darkMode})}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}