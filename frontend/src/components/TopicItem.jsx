export default function TopicItem({ topic, onToggle, onEdit, onDelete }) {
  return (
    <div className={`topic-item ${topic.completed ? "done" : ""}`}>
      <label className="topic-left">
        <input
          type="checkbox"
          checked={topic.completed}
          onChange={() => onToggle(topic)}
        />
        <span>{topic.title}</span>
      </label>

      <div className="topic-actions">
        <button onClick={() => onEdit(topic)}>Edit</button>
        <button className="danger" onClick={() => onDelete(topic.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
