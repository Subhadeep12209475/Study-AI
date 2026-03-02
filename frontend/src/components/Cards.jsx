import '../styles/cards.css';

export function SubjectCard({ subject }) {
  const riskColors = {
    high: 'danger',
    medium: 'warning',
    low: 'success'
  };

  return (
    <div className={`subject-card card-${riskColors[subject.risk]}`}>
      <div className="subject-card-header">
        <div className="subject-icon">{subject.icon}</div>
        <span className={`risk-badge badge-${riskColors[subject.risk]}`}>
          {subject.risk} risk
        </span>
      </div>

      <h3 className="subject-title">{subject.name}</h3>
      <p className="subject-topic">{subject.topic}</p>

      <div className="subject-stats">
        <div className="stat-item">
          <span className="stat-label">Progress</span>
          <span className="stat-value">{subject.progress}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Hours</span>
          <span className="stat-value">{subject.hours}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Next Exam</span>
          <span className="stat-value">{subject.nextExam}d</span>
        </div>
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${subject.progress}%` }}
        ></div>
      </div>

      <div className="subject-actions">
        <button className="btn-card btn-primary-card">Continue Study</button>
        <button className="btn-card btn-secondary-card">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="19" cy="12" r="1"/>
            <circle cx="5" cy="12" r="1"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export function StudyPlanCard({ plan }) {
  return (
    <div className={`study-plan-card ${plan.isActive ? 'active-session' : ''}`}>
      <div className="plan-time">
        {plan.isActive && <span className="live-badge">LIVE</span>}
        <span className="time-range">{plan.time}</span>
      </div>

      <div className="plan-content">
        <h4 className="plan-subject">{plan.subject}</h4>
        <p className="plan-topic">{plan.topic}</p>
        
        {plan.isActive && (
          <div className="plan-progress">
            <div className="progress-bar-sm">
              <div 
                className="progress-fill-sm" 
                style={{ width: `${plan.progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{plan.progress}% complete</span>
          </div>
        )}

        <div className="plan-tags">
          <span className="tag tag-duration">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {plan.duration}
          </span>
          <span className="tag tag-difficulty">{plan.difficulty}</span>
        </div>
      </div>
    </div>
  );
}

export function RiskAlert({ alert }) {
  const alertTypes = {
    danger: { icon: '⚠️', gradient: 'var(--gradient-danger)' },
    warning: { icon: '⚡', gradient: 'var(--gradient-warning)' },
    info: { icon: 'ℹ️', gradient: 'var(--gradient-secondary)' }
  };

  const alertType = alertTypes[alert.type] || alertTypes.info;

  return (
    <div className={`risk-alert alert-${alert.type}`}>
      <div className="alert-icon-wrapper">
        <span className="alert-icon">{alertType.icon}</span>
      </div>
      <div className="alert-content">
        <h4 className="alert-title">{alert.title}</h4>
        <p className="alert-message">{alert.message}</p>
      </div>
      <button className="btn-alert">{alert.action}</button>
    </div>
  );
}
