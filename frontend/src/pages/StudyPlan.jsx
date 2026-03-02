import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { StudyPlanCard } from '../components/Cards';
import { fetchStudyPlan } from '../api/studyPlanApi';

import '../styles/globals.css';
import '../styles/subjects.css';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function StudyPlan() {
  const [planData, setPlanData] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const studentId = "b32fa76e-030b-4d7f-8003-29993a89fd99";


  useEffect(() => {
    fetchStudyPlan(studentId)
      .then(setPlanData)
      .catch(console.error);
  }, []);

  if (!planData) {
    return <p style={{ color: 'white', padding: '20px' }}>Loading study plan...</p>;
  }

  // 🔁 Create weekly plan from today_plan (final-year safe)
  const weeklyPlan = DAYS.map((day, dayIndex) => ({
    day,
    plans: planData.today_plan.map((item, index) => ({
      id: `${dayIndex}-${index}`,
      subject: item.subject,
      topic: item.topic,
      time: dayIndex === 0 ? "Today" : "Planned",
      duration: `${item.hours}h`,
      difficulty: item.priority_score > 3 ? "Hard" : "Medium",
      isActive: index === 0 && dayIndex === activeDay,
      progress: Math.min(100, Math.round(item.priority_score * 20))
    }))
  }));

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <div className="page-container">
          <header className="page-header">
            <div>
              <h1 className="page-title">
                <span className="title-gradient">Weekly Study Plan</span>
              </h1>
              <p className="page-subtitle">
                AI-generated 7-day personalized schedule
              </p>
            </div>
          </header>

          {/* 🗓️ DAY SELECTOR */}
          <div className="week-tabs">
            {DAYS.map((day, index) => (
              <button
                key={day}
                className={`week-tab ${index === activeDay ? "active" : ""}`}
                onClick={() => setActiveDay(index)}
              >
                {day}
              </button>
            ))}
          </div>

          {/* 🔔 Alerts */}
          {planData.alerts.length > 0 && (
            <div style={{ marginBottom: "16px", color: "#ff6b6b" }}>
              ⚠ {planData.alerts[0].message}
            </div>
          )}

          {/* 📅 DAILY PLAN */}
          <div className="schedule-list">
            {weeklyPlan[activeDay].plans.map((plan, i) => (
              <div key={plan.id} style={{ animationDelay: `${i * 0.1}s` }}>
                <StudyPlanCard plan={plan} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
