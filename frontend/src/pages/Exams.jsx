import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import '../styles/globals.css';
import '../styles/subject.css';
import '../styles/exams.css';

export default function Exams() {
  const upcomingExams = [
    { id: 1, subject: 'Mathematics', topic: 'Calculus II Final', date: 'Mar 15, 2024', daysLeft: 12, priority: 'high', prepared: 34 },
    { id: 2, subject: 'Physics', topic: 'Quantum Mechanics Midterm', date: 'Mar 21, 2024', daysLeft: 18, priority: 'medium', prepared: 58 },
    { id: 3, subject: 'Computer Science', topic: 'Algorithms Final', date: 'Mar 28, 2024', daysLeft: 25, priority: 'low', prepared: 82 }
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <div className="page-container">
          <header className="page-header">
            <div>
              <h1 className="page-title"><span className="title-gradient">Upcoming Exams</span></h1>
              <p className="page-subtitle">Track your exam schedule and preparation</p>
            </div>
            <button className="btn-header btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Exam
            </button>
          </header>

          <div className="exams-grid">
            {upcomingExams.map((exam, i) => (
              <div key={exam.id} className={`exam-card priority-${exam.priority}`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="exam-header">
                  <h3>{exam.subject}</h3>
                  <span className={`priority-badge badge-${exam.priority}`}>{exam.priority} priority</span>
                </div>
                <p className="exam-topic">{exam.topic}</p>
                <div className="exam-meta">
                  <div className="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span>{exam.date}</span>
                  </div>
                  <div className="meta-item countdown">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>{exam.daysLeft} days left</span>
                  </div>
                </div>
                <div className="exam-progress">
                  <div className="progress-header">
                    <span>Preparation</span>
                    <span className="progress-percent">{exam.prepared}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${exam.prepared}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
