import { useState, useEffect, useRef } from 'react';
import '../styles/navbar.css';

export default function Navbar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const notifRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  // Shrink navbar on scroll
  useEffect(() => {
    const el = document.querySelector('.main-content') || window;
    const onScroll = () => setScrolled((el.scrollTop || window.scrollY) > 20);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Close notif panel on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ⌘K shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const toggleTheme = () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    setDarkMode(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const notifications = [
    { id: 1, icon: '⚠️', color: 'notif-red',    title: 'Physics at risk',        sub: 'Only 3 days to exam',        time: '2m ago',  unread: true  },
    { id: 2, icon: '🔥', color: 'notif-orange',  title: '5-day streak!',           sub: 'Keep the momentum going',    time: '1h ago',  unread: true  },
    { id: 3, icon: '📅', color: 'notif-purple',  title: 'Session reminder',        sub: 'Maths scheduled at 4 PM',    time: '3h ago',  unread: true  },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      {/* subtle top highlight line */}
      <div className="navbar-highlight" />

      <div className="navbar-content">

        {/* ── SEARCH ── */}
        <div className={`search-wrap ${searchFocused ? 'search-focused' : ''}`}>
          <div className="search-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>

          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search subjects, topics, exams…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />

          {searchValue && (
            <button className="search-clear" onClick={() => { setSearchValue(''); inputRef.current?.focus(); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}

          {!searchValue && (
            <kbd className="search-kbd">
              <span>⌘</span>K
            </kbd>
          )}
        </div>

        {/* ── ACTIONS ── */}
        <div className="navbar-actions">

          {/* Notifications */}
          <div className="notif-wrap" ref={notifRef}>
            <button
              className={`action-btn notif-btn ${notifOpen ? 'action-btn-active' : ''}`}
              onClick={() => setNotifOpen(!notifOpen)}
              title="Notifications"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="notif-badge">3</span>
            </button>

            {/* Dropdown panel */}
            {notifOpen && (
              <div className="notif-panel">
                <div className="notif-panel-header">
                  <span className="notif-panel-title">Notifications</span>
                  <button className="notif-mark-all">Mark all read</button>
                </div>
                <div className="notif-list">
                  {notifications.map(n => (
                    <div key={n.id} className={`notif-item ${n.unread ? 'notif-unread' : ''}`}>
                      <div className={`notif-icon ${n.color}`}>{n.icon}</div>
                      <div className="notif-body">
                        <p className="notif-title">{n.title}</p>
                        <p className="notif-sub">{n.sub}</p>
                      </div>
                      <span className="notif-time">{n.time}</span>
                    </div>
                  ))}
                </div>
                <div className="notif-panel-footer">
                  <button className="notif-view-all">View all notifications →</button>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="action-divider" />

          {/* Quick Add */}
          <button className="action-btn" title="Quick add">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </button>

          {/* Theme Toggle */}
          <button className={`action-btn theme-btn ${darkMode ? 'theme-light' : 'theme-dark'}`} onClick={toggleTheme} title="Toggle theme">
            <div className="theme-icon-wrap">
              {darkMode ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </div>
          </button>

          {/* Settings */}
          <button className="action-btn" title="Settings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>

          {/* Divider */}
          <div className="action-divider" />

          {/* Avatar */}
          <button className="avatar-btn" title="Profile">
            <div className="avatar-ring">
              <div className="avatar-inner">SM</div>
            </div>
            <div className="avatar-status" />
          </button>

        </div>
      </div>
    </nav>
  );
}
