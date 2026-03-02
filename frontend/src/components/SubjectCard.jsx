import { useNavigate } from "react-router-dom";

export default function SubjectCard({ subject }) {
  const navigate = useNavigate();

  const progress =
    subject.total_topics > 0
      ? Math.round((subject.completed_topics / subject.total_topics) * 100)
      : 0;

  return (
    <div className="subject-card">
      {/* HEADER */}
      <div className="subject-card-header">
        <div className="subject-icon">
          {subject.name.charAt(0).toUpperCase()}
        </div>

        <span className={`risk-badge ${subject.risk_level?.toLowerCase()}`}>
          {subject.risk_level} RISK
        </span>
      </div>

      <h3 className="subject-title">{subject.name}</h3>

      {/* PROGRESS */}
      <div className="progress-wrapper">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="progress-text">{progress}%</span>
      </div>

      <div className="subject-meta">
        <span>📘 {subject.completed_topics}/{subject.total_topics} topics</span>
        <span>⏱️ {subject.total_hours}h studied</span>
      </div>

      {/* ACTIONS */}
      <div className="subject-actions">
        <button
          className="btn-primary"
          onClick={() => navigate(`/subjects/${subject.id}`)}
        >
          ▶ Continue
        </button>

        <button
          className="btn-secondary"
          onClick={() => navigate(`/subjects/${subject.id}?mode=manage`)}
        >
          ⚙ Manage
        </button>
      </div>
    </div>
  );
}
