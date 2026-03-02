import { useState } from "react";
import { updateSubject } from "../api/subjects";
import "../styles/subject.css";

export default function EditSubjectModal({ subject, onClose, onUpdated }) {
  const [name, setName] = useState(subject.name);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await updateSubject(subject.id, {
        name: name.trim(),
      });
      onUpdated(); // refresh list
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
        <h2>Edit Subject</h2>

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
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
