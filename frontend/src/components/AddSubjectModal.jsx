import { useState } from "react";
import { createSubject } from "../api/subjects";
import "../styles/subject.css";

export default function AddSubjectModal({ studentId, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await createSubject({
        name,
        student_id: studentId,
      });
      onCreated();   // refresh list
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h2>Add New Subject</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Subject name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={loading || !name.trim()}>
  {loading ? "Adding..." : "Add Subject"}
</button>
          </div>
        </form>
      </div>
    </div>
  );
}
