import { Link, useLocation } from 'react-router-dom';
import '../styles/sidebar.css';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { id: 'subjects', icon: '📚', label: 'Subjects', path: '/subjects' },
    { id: 'study-plan', icon: '📅', label: 'Study Plan', path: '/study-plan' },
    { id: 'exams', icon: '📝', label: 'Exams', path: '/exams' },
    { id: 'topics', icon: '🎯', label: 'Topics', path: '/topics' },
    { id: 'profile', icon: '👤', label: 'Profile', path: '/profile' }
  ];

  return (
    <aside className="sidebar">
      {/* 🔰 HEADER */}
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">🎓</div>
          <div className="logo-text">
            <h2>Let's Study</h2>
            <span>Pro Planner</span>
          </div>
        </div>
      </div>

      {/* 🧭 NAVIGATION */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          <span className="nav-section-title">MAIN MENU</span>

          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {isActive && <div className="active-indicator" />}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* 📊 FOOTER */}
      <div className="sidebar-footer">
        <div className="study-stats-mini">
          <div className="stat-mini">
            <div className="stat-mini-icon">⏱️</div>
            <div className="stat-mini-content">
              <span className="stat-mini-value">0h</span>
              <span className="stat-mini-label">This Month</span>
            </div>
          </div>

          <div className="progress-ring">
            <svg width="60" height="60">
              <circle
                cx="30"
                cy="30"
                r="26"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="4"
              />
              <circle
                cx="30"
                cy="30"
                r="26"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeDasharray="163.36"
                strokeDashoffset="40.84"
                strokeLinecap="round"
                transform="rotate(-90 30 30)"
                className="progress-circle"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%" />
              </defs>
            </svg>
            <div className="progress-ring-text">0%</div>
          </div>
        </div>

        {/* 👤 USER */}
        <div className="user-profile">
          <div className="user-avatar">
            <img
              src="https://api.dicebear.com/7.x/personas/svg?seed=Subhadeep&clothing=blazer,shirt"
              alt="User"
            />
            <div className="user-status"></div>
          </div>
          <div className="user-info">
            <span className="user-name">Subhadeep Mukherjee</span>
            <span className="user-role">Student</span>
          </div>
          <button className="user-menu-btn">⋯</button>
        </div>
      </div>
    </aside>
  );
}
