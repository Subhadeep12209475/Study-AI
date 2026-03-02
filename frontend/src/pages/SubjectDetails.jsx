export default function SubjectDetails() {
  /* ---------- SAME LOGIC (unchanged) ---------- */
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isManageMode = searchParams.get("mode") === "manage";

  const [subject, setSubject] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);

  /* ---------- SAME EFFECTS & HANDLERS ---------- */
  // (unchanged — keep exactly as you wrote)

  const totalTopics = topics.length;
  const completedTopics = topics.filter(t => t.completed).length;
  const progress = totalTopics
    ? Math.round((completedTopics / totalTopics) * 100)
    : 0;
  const nextTopic = topics.find(t => !t.completed);

  if (loading) return <div className="loading-state">Loading...</div>;
  if (error) return <div className="error-banner">{error}</div>;

  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">
        <div className="subject-v2">

          {/* ───────── HERO ───────── */}
          <div className="subject-hero">
            <div>
              <button className="back-btn" onClick={() => navigate(-1)}>
                ← Back to Subjects
              </button>

              <h1>{subject.name}</h1>
              <p className="subtitle">
                Track progress, manage topics, and stay consistent
              </p>
            </div>

            <span className={`mode-pill ${isManageMode ? "manage" : "learn"}`}>
              {isManageMode ? "Manage Mode" : "Learning Mode"}
            </span>
          </div>

          {/* ───────── PROGRESS ───────── */}
          <div className="progress-card">
            <div className="progress-header">
              <span>{progress}% completed</span>
              <span>{completedTopics}/{totalTopics} topics</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* ───────── STATS ───────── */}
          <div className="stats-row">
            <Stat title="Total Topics" value={totalTopics} />
            <Stat title="Completed" value={completedTopics} accent="green" />
            <Stat
              title="Remaining"
              value={totalTopics - completedTopics}
              accent="amber"
            />
          </div>

          {/* ───────── RESUME LEARNING ───────── */}
          {!isManageMode && nextTopic && (
            <div className="resume-card">
              <h3>▶ Resume Learning</h3>
              <p>
                Continue with <strong>{nextTopic.title}</strong>
              </p>
              <button
                className="btn-primary"
                onClick={() => toggleComplete(nextTopic)}
              >
                Mark as Completed
              </button>
            </div>
          )}

          {/* ───────── AI INSIGHTS ───────── */}
          <div className="ai-insight-card">
            <h3>🤖 Study Insights</h3>

            {totalTopics === 0 && (
              <p className="info">
                Add topics to unlock AI-powered recommendations.
              </p>
            )}

            {progress > 0 && progress < 50 && (
              <p className="warning">
                Low progress detected — aim to complete one topic today.
              </p>
            )}

            {progress === 100 && (
              <p className="success">
                All topics completed! Time for revision 🚀
              </p>
            )}
          </div>

          {/* ───────── TOPICS ───────── */}
          <div className="topics-card">
            <div className="topics-header">
              <h2>{isManageMode ? "Manage Topics" : "Learning Topics"}</h2>

              {isManageMode && (
                <button
                  className="btn-primary"
                  onClick={() => setShowTopicModal(true)}
                >
                  + Add Topic
                </button>
              )}
            </div>

            {topics.length === 0 ? (
              <div className="empty-topics">
                <p>No topics added yet</p>
                <span>Start by adding your first topic</span>
              </div>
            ) : (
              topics.map(topic => (
                <TopicItem
                  key={topic.id}
                  topic={topic}
                  onToggle={toggleComplete}
                  onEdit={isManageMode ? () => setEditingTopic(topic) : null}
                  onDelete={isManageMode ? handleDeleteTopic : null}
                />
              ))
            )}
          </div>

          {/* ───────── MODALS ───────── */}
          {showTopicModal && (
            <TopicModal
              onSave={handleAddTopic}
              onClose={() => setShowTopicModal(false)}
            />
          )}

          {editingTopic && (
            <TopicModal
              initialValue={editingTopic.title}
              onSave={handleEditTopic}
              onClose={() => setEditingTopic(null)}
            />
          )}
        </div>
      </main>
    </div>
  );
}

/* ───────── SMALL COMPONENT ───────── */
function Stat({ title, value, accent }) {
  return (
    <div className={`stat-box ${accent || ""}`}>
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}