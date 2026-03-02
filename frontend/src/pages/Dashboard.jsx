import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { SubjectCard, StudyPlanCard, RiskAlert } from "../components/Cards";
import Loader from "../components/Loader";
import "../styles/globals.css";
import "../styles/dashboard.css";
import AddSessionModal from "../components/AddSessionModal";
import AiCoachPopup from "../components/AiCoachPopup";

export default function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [todayPlan, setTodayPlan] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [focusTime, setFocusTime] = useState(1500);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showAddSession, setShowAddSession] = useState(false);
  const [activeTimerMode, setActiveTimerMode] = useState("focus");

  const studentId = "377b8011-45b8-43c1-80ab-3ad60d45c1f6";

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/study-plan/${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        setSubjects(data.subjects || []);
        setAlerts(data.alerts || []);
        setWeeklyData(data.weekly_data || []);
        setStats(data.stats || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard API error:", err);
        setLoading(false);
      });
  }, []);

  const loadTodaySessions = () => {
    fetch(`http://127.0.0.1:8000/sessions/today/${studentId}`)
      .then((res) => res.json())
      .then((data) => setTodayPlan(data || []))
      .catch((err) => console.error("Today Sessions API error:", err));
  };

  useEffect(() => {
    loadTodaySessions();
  }, []);

  useEffect(() => {
    let interval;
    if (isTimerRunning && focusTime > 0) {
      interval = setInterval(() => setFocusTime((prev) => prev - 1), 1000);
    } else if (focusTime === 0) {
      setIsTimerRunning(false);
      alert("Focus session complete! Time for a break.");
      setFocusTime(1500);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, focusTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const timerProgress = ((1500 - focusTime) / 1500) * 100;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (timerProgress / 100) * circumference;

  if (loading) return <Loader />;

  const aiInsights = [
    {
      icon: "🎯",
      color: "insight-purple",
      title: "Peak Performance",
      description: "Your best study hours are 9 AM – 11 AM based on completion rates.",
      tag: "Optimized",
    },
    {
      icon: "🔥",
      color: "insight-orange",
      title: "Study Streak",
      description: "5 days in a row! You're building serious momentum.",
      tag: "On Fire",
    },
    {
      icon: "💡",
      color: "insight-cyan",
      title: "Smart Tip",
      description: "Break Physics into 25-min sessions for 40% better retention.",
      tag: "New",
    },
  ];

  const mockBarHeights = [65, 30, 85, 50, 70, 45, 80];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <div className="dashboard-container">

          {/* ── AMBIENT BG ORBS ── */}
          <div className="bg-orb bg-orb-1" />
          <div className="bg-orb bg-orb-2" />
          <div className="bg-orb bg-orb-3" />

          {/* ── HEADER ── */}
          <header className="dashboard-header">
            <div className="header-left">
              <div className="header-eyebrow">
                <span className="live-dot" />
                Live Dashboard
              </div>
              <h1 className="page-title">
                Study <span className="title-gradient">Analytics</span>
              </h1>
              <p className="page-subtitle">
                Track your progress and optimize your learning journey
              </p>
            </div>
            <div className="header-right">
              <div className="header-date-card">
                <span className="date-label">Today</span>
                <span className="date-value">
                  {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                </span>
              </div>
            </div>
          </header>

          {/* ── STATS GRID ── */}
          <div className="stats-grid">
            <div className="stat-card stat-primary">
              <div className="stat-card-bg" />
              <div className="stat-top">
                <div className="stat-icon-wrap stat-icon-purple">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                </div>
                <span className="stat-badge stat-badge-purple">+2 this week</span>
              </div>
              <div className="stat-body">
                <p className="stat-label">Active Subjects</p>
                <h3 className="stat-value">{subjects.length || "—"}</h3>
              </div>
              <div className="stat-bar">
                <div className="stat-bar-fill stat-bar-purple" style={{ width: "60%" }} />
              </div>
            </div>

            <div className="stat-card stat-success">
              <div className="stat-card-bg" />
              <div className="stat-top">
                <div className="stat-icon-wrap stat-icon-green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <span className="stat-badge stat-badge-green">↑ 12% week</span>
              </div>
              <div className="stat-body">
                <p className="stat-label">Study Hours</p>
                <h3 className="stat-value">{stats?.total_hours || 0}<span className="stat-unit">h</span></h3>
              </div>
              <div className="stat-bar">
                <div className="stat-bar-fill stat-bar-green" style={{ width: `${Math.min((stats?.total_hours || 0) * 5, 100)}%` }} />
              </div>
            </div>

            <div className="stat-card stat-warning">
              <div className="stat-card-bg" />
              <div className="stat-top">
                <div className="stat-icon-wrap stat-icon-amber">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <span className="stat-badge stat-badge-amber">Above avg</span>
              </div>
              <div className="stat-body">
                <p className="stat-label">Completion Rate</p>
                <h3 className="stat-value">{stats?.completion_rate || 0}<span className="stat-unit">%</span></h3>
              </div>
              <div className="stat-bar">
                <div className="stat-bar-fill stat-bar-amber" style={{ width: `${stats?.completion_rate || 0}%` }} />
              </div>
            </div>

            <div className="stat-card stat-danger">
              <div className="stat-card-bg" />
              <div className="stat-top">
                <div className="stat-icon-wrap stat-icon-red">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </div>
                <span className="stat-badge stat-badge-red">Needs care</span>
              </div>
              <div className="stat-body">
                <p className="stat-label">Subjects At Risk</p>
                <h3 className="stat-value">{stats?.risk_count || 0}</h3>
              </div>
              <div className="stat-bar">
                <div className="stat-bar-fill stat-bar-red" style={{ width: `${(stats?.risk_count || 0) * 20}%` }} />
              </div>
            </div>
          </div>

          {/* ── AI COACH BANNER ── */}
          <div className="ai-coach-banner">
            <div className="ai-coach-banner__glow" />
            <div className="ai-coach-banner__left">
              <div className="ai-coach-avatar">
                <span>🤖</span>
                <div className="ai-coach-pulse" />
              </div>
              <div className="ai-coach-text">
                <div className="ai-coach-title">
                  AI Study Coach
                  <span className="pro-badge">PRO</span>
                  <span className="online-badge">
                    <span className="online-dot" />
                    Online
                  </span>
                </div>
                <p className="ai-coach-subtitle">
                  I've analyzed your patterns — you perform <strong>22% better</strong> in morning sessions.
                  Chat with me via the <strong>🤖 button</strong> below-right!
                </p>
              </div>
            </div>
            <div className="ai-coach-pills">
              <span className="ai-pill ai-pill-purple">📊 Weak areas found</span>
              <span className="ai-pill ai-pill-orange">🔥 5-day streak</span>
              <span className="ai-pill ai-pill-blue">⚡ Schedule ready</span>
            </div>
          </div>

          {/* ── SCHEDULE + TIMER ── */}
          <div className="two-col-grid">

            {/* Today's Schedule */}
            <div className="glass-card">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-icon">📅</span>
                  <h2 className="card-title">Today's Schedule</h2>
                </div>
                <button className="btn-add" onClick={() => setShowAddSession(true)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Add Session
                </button>
              </div>

              {showAddSession && (
                <AddSessionModal
                  studentId={studentId}
                  onClose={() => setShowAddSession(false)}
                  onCreated={loadTodaySessions}
                />
              )}

              <div className="schedule-body">
                {todayPlan.length > 0 ? (
                  <div className="session-list">
                    {todayPlan.map((session) => (
                      <div key={session.id} className={`session-item ${session.is_completed ? "session-done" : ""}`}>
                        <div className="session-indicator" />
                        <div className="session-info">
                          <h4 className="session-subject">{session.subject_name}</h4>
                          <p className="session-topic">📘 {session.topic_name}</p>
                        </div>
                        <div className="session-meta">
                          <span className="session-duration">{session.duration_minutes}m</span>
                          <span className={`session-status ${session.is_completed ? "status-done" : "status-pending"}`}>
                            {session.is_completed ? "✓" : "○"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <p className="empty-title">No sessions yet</p>
                    <p className="empty-sub">Add a session to plan your day</p>
                  </div>
                )}
              </div>
            </div>

            {/* Focus Timer */}
            <div className="glass-card timer-card">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-icon">🎯</span>
                  <h2 className="card-title">Focus Timer</h2>
                </div>
                <div className="timer-mode-tabs">
                  <button
                    className={`mode-tab ${activeTimerMode === "focus" ? "mode-tab-active" : ""}`}
                    onClick={() => { setActiveTimerMode("focus"); setFocusTime(1500); setIsTimerRunning(false); }}
                  >Focus</button>
                  <button
                    className={`mode-tab ${activeTimerMode === "break" ? "mode-tab-active" : ""}`}
                    onClick={() => { setActiveTimerMode("break"); setFocusTime(300); setIsTimerRunning(false); }}
                  >Break</button>
                </div>
              </div>

              <div className="timer-body">
                <div className="timer-ring-wrap">
                  <svg className="timer-ring" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" className="ring-track" />
                    <circle
                      cx="60" cy="60" r="54"
                      className="ring-progress"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                    />
                  </svg>
                  <div className="timer-display">
                    <span className="timer-time">{formatTime(focusTime)}</span>
                    <span className="timer-label">{activeTimerMode === "focus" ? "Pomodoro" : "Short Break"}</span>
                  </div>
                </div>

                <div className="timer-controls">
                  <button
                    className={`btn-timer-main ${isTimerRunning ? "btn-pause" : "btn-start"}`}
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                  >
                    {isTimerRunning ? (
                      <><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause</>
                    ) : (
                      <><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Start</>
                    )}
                  </button>
                  <button
                    className="btn-timer-reset"
                    onClick={() => { setFocusTime(activeTimerMode === "focus" ? 1500 : 300); setIsTimerRunning(false); }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-5"/></svg>
                    Reset
                  </button>
                </div>
                <p className="timer-hint">25 min focus · 5 min break</p>
              </div>
            </div>
          </div>

          {/* ── WEEKLY PROGRESS ── */}
          <div className="glass-card weekly-card">
            <div className="card-header">
              <div className="card-title-group">
                <span className="card-icon">📊</span>
                <h2 className="card-title">Weekly Progress</h2>
              </div>
              <span className="card-tag">This Week</span>
            </div>
            <div className="chart-area">
              <div className="chart-bars">
                {(weeklyData.length > 0 ? weeklyData : days.map((d, i) => ({ day: d, value: mockBarHeights[i] }))).map((day, index) => (
                  <div key={index} className="bar-col">
                    <div className="bar-wrap">
                      <div
                        className="bar-fill"
                        style={{ height: `${day.value}%` }}
                        data-value={`${day.value}%`}
                      >
                        <div className="bar-glow" />
                      </div>
                    </div>
                    <span className="bar-label">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── AI INSIGHTS ── */}
          <section className="insights-section">
            <div className="section-header">
              <div className="card-title-group">
                <span className="card-icon">🤖</span>
                <h2 className="card-title">AI-Powered Insights</h2>
              </div>
              <span className="card-tag">Live Analysis</span>
            </div>
            <div className="insights-grid">
              {aiInsights.map((insight, index) => (
                <div key={index} className={`insight-card ${insight.color}`}>
                  <div className="insight-shine" />
                  <div className="insight-top">
                    <div className="insight-icon-wrap">{insight.icon}</div>
                    <span className="insight-tag">{insight.tag}</span>
                  </div>
                  <h3 className="insight-title">{insight.title}</h3>
                  <p className="insight-desc">{insight.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── SUBJECTS ── */}
          <section className="subjects-section">
            <div className="section-header">
              <div className="card-title-group">
                <span className="card-icon">📚</span>
                <h2 className="card-title">Subject Overview</h2>
              </div>
            </div>
            <div className="subjects-grid">
              {subjects.length > 0 ? (
                subjects.map((subject) => (
                  <SubjectCard key={subject.id} subject={subject} />
                ))
              ) : (
                <div className="subjects-empty">
                  <p>No subjects added yet. Start by adding your first subject!</p>
                </div>
              )}
            </div>
          </section>

          {/* ── ALERTS ── */}
          {alerts.length > 0 && (
            <section className="alerts-section">
              <div className="section-header">
                <div className="card-title-group">
                  <span className="card-icon">⚠️</span>
                  <h2 className="card-title">Alerts & Recommendations</h2>
                </div>
              </div>
              <div className="alerts-grid">
                {alerts.map((alert) => (
                  <RiskAlert key={alert.id} alert={alert} />
                ))}
              </div>
            </section>
          )}

        </div>
        <AiCoachPopup />
      </main>
    </div>
  );
}
