import { useState } from "react";

export default function TopicModal({ initialValue = "", onSave, onClose }) {
  const [title, setTitle] = useState(initialValue);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(title.trim());
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h2>{initialValue ? "Edit Topic" : "Add Topic"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Topic title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
