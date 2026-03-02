import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import SubjectDetails from "./pages/SubjectDetails";
import StudyPlan from "./pages/StudyPlan";
import Profile from "./pages/Profile";
import AICoachWidget from "./components/AiCoachPopup";

//import "./styles/AICoachWidget.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/subjects" replace />} />

        {/* Main Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subjects/:subjectId" element={<SubjectDetails />} />
        <Route path="/study-plan" element={<StudyPlan />} />
        <Route path="/profile" element={<Profile />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/subjects" replace />} />
      </Routes>

      {/* AI Coach floating button — visible on ALL pages */}
      <AICoachWidget />
    </Router>
  );
}

export default App;
