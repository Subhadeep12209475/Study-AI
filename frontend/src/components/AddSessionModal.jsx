import { useState } from "react";

export default function AddSessionModal({ studentId, onClose, onCreated }) {
  const [subjectName, setSubjectName] = useState("");
  const [topicName, setTopicName] = useState("");
  const [duration, setDuration] = useState(30);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async () => {
    if (!subjectName || !topicName) return alert("Fill all fields");

    const payload = {
      student_id: studentId,
      subject_name: subjectName,
      topic_name: topicName,
      date: today,
      duration_minutes: duration
    };

    await fetch("http://127.0.0.1:8000/sessions/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    onCreated();   // refresh today sessions
    onClose();     // close modal
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h2>Add Study Session</h2>

        <input
          placeholder="Subject (e.g. Science)"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />

        <input
          placeholder="Topic (e.g. Thermodynamics)"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />

        <div className="modal-actions">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={handleSubmit} className="btn-primary">Add</button>
        </div>
      </div>
    </div>
  );
}
