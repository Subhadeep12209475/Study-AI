import { useEffect, useMemo, useState } from "react";
import { fetchSubjects } from "../api/subjects";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AddSubjectModal from "../components/AddSubjectModal";
import EditSubjectModal from "../components/EditSubjectModal";
import "../styles/subjects.css";

const STUDENT_ID = "377b8011-45b8-43c1-80ab-3ad60d45c1f6";

const SUBJECT_COLORS = [
  { id: "purple", from: "#a78bfa", to: "#7c3aed", glow: "rgba(167,139,250,0.3)"  },
  { id: "cyan",   from: "#22d3ee", to: "#0891b2", glow: "rgba(34,211,238,0.3)"   },
  { id: "green",  from: "#34d399", to: "#059669", glow: "rgba(52,211,153,0.3)"   },
  { id: "amber",  from: "#fbbf24", to: "#d97706", glow: "rgba(251,191,36,0.3)"   },
  { id: "rose",   from: "#fb7185", to: "#e11d48", glow: "rgba(251,113,133,0.3)"  },
  { id: "blue",   from: "#60a5fa", to: "#2563eb", glow: "rgba(96,165,250,0.3)"   },
];

const SORT_OPTIONS = [
  { value: "name",     label: "Name A–Z"      },
  { value: "progress", label: "Progress"      },
  { value: "risk",     label: "At Risk First" },
  { value: "recent",   label: "Recently Added"},
];

const FILTER_OPTIONS = [
  { value: "all",       label: "All"       },
  { value: "active",    label: "Active"    },
  { value: "at-risk",   label: "At Risk"   },
  { value: "completed", label: "Completed" },
];

function getColorForSubject(id) {
  const idx = id ? id.charCodeAt(0) % SUBJECT_COLORS.length : 0;
  return SUBJECT_COLORS[idx];
}

function getProgress(subject) {
  return subject.progress ?? subject.completion_percentage ?? 0;
}

function getRiskLevel(subject) {
  const p = getProgress(subject);
  if (p < 30) return "high";
  if (p < 60) return "medium";
  return "low";
}

function getStatusLabel(subject) {
  const p = getProgress(subject);
  if (p >= 100) return "completed";
  if (p < 30)   return "at-risk";
  return "active";
}

// ── SUBJECT CARD ──────────────────────────────────────
function SubjectCard({ subject, onEdit, onView, index }) {
  const color   = getColorForSubject(subject.id);
  const progress = getProgress(subject);
  const status   = getStatusLabel(subject);
  const risk     = getRiskLevel(subject);
  const initials = subject.name.slice(0, 2).toUpperCase();

  return (
    <div
      className="subj-card"
      style={{ "--card-from": color.from, "--card-to": color.to, "--card-glow": color.glow, animationDelay: `${index * 0.06}s` }}
      onClick={() => onView?.(subject)}
    >
      {/* top gradient accent bar */}
      <div className="subj-card-bar" />

      {/* shimmer on hover */}
      <div className="subj-card-shimmer" />

      <div className="subj-card-inner">
        {/* Header row */}
        <div className="subj-card-head">
          <div className="subj-icon">
            <span>{initials}</span>
            <div className="subj-icon-glow" />
          </div>
          <div className="subj-head-right">
            <span className={`subj-status subj-status-${status}`}>
              {status === "at-risk" ? "⚠ At Risk" : status === "completed" ? "✓ Done" : "● Active"}
            </span>
            {risk === "high" && status !== "completed" && (
              <div className="subj-risk-pulse" title="Needs attention" />
            )}
          </div>
        </div>

        {/* Name */}
        <h3 className="subj-name">{subject.name}</h3>

        {/* Stats row */}
        <div className="subj-stats">
          <div className="subj-stat">
            <span className="subj-stat-val">{subject.topics_count ?? subject.total_topics ?? "—"}</span>
            <span className="subj-stat-lbl">Topics</span>
          </div>
          <div className="subj-stat-div" />
          <div className="subj-stat">
            <span className="subj-stat-val">{subject.sessions_count ?? "—"}</span>
            <span className="subj-stat-lbl">Sessions</span>
          </div>
          <div className="subj-stat-div" />
          <div className="subj-stat">
            <span className="subj-stat-val">{subject.hours_studied ?? "0"}h</span>
            <span className="subj-stat-lbl">Studied</span>
          </div>
        </div>

        {/* Progress */}
        <div className="subj-progress-wrap">
          <div className="subj-progress-row">
            <span className="subj-progress-lbl">Progress</span>
            <span className="subj-progress-val" style={{ color: color.from }}>{progress}%</span>
          </div>
          <div className="subj-progress-track">
            <div
              className="subj-progress-fill"
              style={{ width: `${progress}%`, "--p-from": color.from, "--p-to": color.to }}
            />
          </div>
        </div>

        {/* Next exam */}
        {subject.next_exam_date && (
          <div className="subj-exam-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Exam: {new Date(subject.next_exam_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </div>
        )}

        {/* Actions */}
        <div className="subj-actions">
          <button
            className="subj-btn subj-btn-primary"
            style={{ "--btn-from": color.from, "--btn-to": color.to, "--btn-glow": color.glow }}
            onClick={(e) => { e.stopPropagation(); onView?.(subject); }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            View
          </button>
          <button
            className="subj-btn subj-btn-secondary"
            onClick={(e) => { e.stopPropagation(); onEdit?.(subject); }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

// ── SKELETON CARD ──────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="subj-card subj-skeleton">
      <div className="subj-card-bar skel-bar" />
      <div className="subj-card-inner">
        <div className="skel-row">
          <div className="skel-icon skel-pulse" />
          <div className="skel-badge skel-pulse" />
        </div>
        <div className="skel-title skel-pulse" />
        <div className="skel-stats skel-pulse" />
        <div className="skel-prog skel-pulse" />
        <div className="skel-actions skel-pulse" />
      </div>
    </div>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────
export default function Subjects() {
  const [subjects, setSubjects]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");
  const [searchTerm, setSearchTerm]   = useState("");
  const [sortBy, setSortBy]           = useState("name");
  const [filterBy, setFilterBy]       = useState("all");
  const [viewMode, setViewMode]       = useState("grid"); // grid | list
  const [showAddModal, setShowAddModal]     = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [searchFocused, setSearchFocused]   = useState(false);

  async function loadSubjects() {
    try {
      setLoading(true);
      const data = await fetchSubjects(STUDENT_ID);
      setSubjects(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load subjects. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadSubjects(); }, []);

  function handleSubjectCreated(newSubject) {
    setSubjects((prev) => [newSubject, ...prev]);
  }

  function handleSubjectUpdated(updatedSubject) {
    setSubjects((prev) => prev.map((s) => s.id === updatedSubject.id ? updatedSubject : s));
  }

  // Stats
  const stats = useMemo(() => ({
    total:     subjects.length,
    active:    subjects.filter(s => getStatusLabel(s) === "active").length,
    atRisk:    subjects.filter(s => getStatusLabel(s) === "at-risk").length,
    completed: subjects.filter(s => getStatusLabel(s) === "completed").length,
    avgProgress: subjects.length
      ? Math.round(subjects.reduce((acc, s) => acc + getProgress(s), 0) / subjects.length)
      : 0,
  }), [subjects]);

  // Filter + sort + search
  const filteredSubjects = useMemo(() => {
    let list = [...subjects];

    // filter
    if (filterBy === "active")    list = list.filter(s => getStatusLabel(s) === "active");
    if (filterBy === "at-risk")   list = list.filter(s => getStatusLabel(s) === "at-risk");
    if (filterBy === "completed") list = list.filter(s => getStatusLabel(s) === "completed");

    // search
    if (searchTerm.trim()) {
      list = list.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // sort
    if (sortBy === "name")     list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "progress") list.sort((a, b) => getProgress(b) - getProgress(a));
    if (sortBy === "risk")     list.sort((a, b) => getProgress(a) - getProgress(b));

    return list;
  }, [subjects, filterBy, searchTerm, sortBy]);

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />

        <div className="subjects-page">
          {/* ── AMBIENT ORBS ── */}
          <div className="sp-orb sp-orb-1" />
          <div className="sp-orb sp-orb-2" />

          {/* ── HEADER ── */}
          <header className="sp-header">
            <div className="sp-header-left">
              <div className="sp-eyebrow">
                <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#a78bfa"/></svg>
                Subjects Library
              </div>
              <h1 className="sp-title">
                My <span className="sp-title-grad">Subjects</span>
              </h1>
              <p className="sp-subtitle">
                {subjects.length} {subjects.length === 1 ? "subject" : "subjects"} · {stats.avgProgress}% avg progress
              </p>
            </div>
            <button className="sp-add-btn" onClick={() => setShowAddModal(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Subject
            </button>
          </header>

          {/* ── STAT STRIP ── */}
          <div className="sp-stat-strip">
            {[
              { label: "Total",     val: stats.total,     icon: "📚", accent: "var(--sp-purple)" },
              { label: "Active",    val: stats.active,    icon: "⚡", accent: "var(--sp-green)"  },
              { label: "At Risk",   val: stats.atRisk,    icon: "⚠️", accent: "var(--sp-red)"    },
              { label: "Completed", val: stats.completed, icon: "✅", accent: "var(--sp-cyan)"   },
              { label: "Avg Progress", val: `${stats.avgProgress}%`, icon: "📈", accent: "var(--sp-amber)" },
            ].map((s) => (
              <div className="sp-stat" key={s.label}>
                <span className="sp-stat-icon">{s.icon}</span>
                <div>
                  <div className="sp-stat-val" style={{ color: s.accent }}>{s.val}</div>
                  <div className="sp-stat-lbl">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── TOOLBAR ── */}
          <div className="sp-toolbar">
            {/* Search */}
            <div className={`sp-search ${searchFocused ? "sp-search-focused" : ""}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search subjects…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              {searchTerm && (
                <button className="sp-search-clear" onClick={() => setSearchTerm("")}>✕</button>
              )}
            </div>

            {/* Filters */}
            <div className="sp-filters">
              {FILTER_OPTIONS.map((f) => (
                <button
                  key={f.value}
                  className={`sp-filter-btn ${filterBy === f.value ? "sp-filter-active" : ""}`}
                  onClick={() => setFilterBy(f.value)}
                >
                  {f.label}
                  {f.value !== "all" && (
                    <span className="sp-filter-count">
                      {f.value === "active"    && stats.active}
                      {f.value === "at-risk"   && stats.atRisk}
                      {f.value === "completed" && stats.completed}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="sp-toolbar-right">
              {/* Sort */}
              <div className="sp-sort-wrap">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
                <select className="sp-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              {/* View toggle */}
              <div className="sp-view-toggle">
                <button
                  className={`sp-view-btn ${viewMode === "grid" ? "sp-view-active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Grid view"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                  </svg>
                </button>
                <button
                  className={`sp-view-btn ${viewMode === "list" ? "sp-view-active" : ""}`}
                  onClick={() => setViewMode("list")}
                  title="List view"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                    <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                    <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ── RESULTS COUNT ── */}
          {!loading && (searchTerm || filterBy !== "all") && (
            <div className="sp-results-bar">
              <span>
                Showing <strong>{filteredSubjects.length}</strong> of <strong>{subjects.length}</strong> subjects
              </span>
              {(searchTerm || filterBy !== "all") && (
                <button className="sp-clear-filters" onClick={() => { setSearchTerm(""); setFilterBy("all"); }}>
                  Clear filters ✕
                </button>
              )}
            </div>
          )}

          {/* ── ERROR ── */}
          {error && (
            <div className="sp-error">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
              <button onClick={loadSubjects} className="sp-retry">Retry</button>
            </div>
          )}

          {/* ── CONTENT ── */}
          {loading ? (
            <div className={`sp-grid ${viewMode === "list" ? "sp-list" : ""}`}>
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredSubjects.length === 0 ? (
            <div className="sp-empty">
              <div className="sp-empty-icon">
                {searchTerm ? (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                ) : (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                )}
              </div>
              <h2 className="sp-empty-title">
                {searchTerm ? `No results for "${searchTerm}"` : "No subjects yet"}
              </h2>
              <p className="sp-empty-sub">
                {searchTerm ? "Try a different search term or clear your filters." : "Start building your study library by adding your first subject."}
              </p>
              {!searchTerm && (
                <button className="sp-add-btn sp-empty-cta" onClick={() => setShowAddModal(true)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add Your First Subject
                </button>
              )}
            </div>
          ) : (
            <div className={`sp-grid ${viewMode === "list" ? "sp-list" : ""}`}>
              {filteredSubjects.map((subject, i) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  index={i}
                  onEdit={(s) => setEditingSubject(s)}
                  onView={(s) => console.log("View:", s)}
                />
              ))}
            </div>
          )}

          {/* ── MODALS ── */}
          {showAddModal && (
            <AddSubjectModal
              studentId={STUDENT_ID}
              onClose={() => setShowAddModal(false)}
              onCreated={(s) => { handleSubjectCreated(s); setShowAddModal(false); }}
            />
          )}
          {editingSubject && (
            <EditSubjectModal
              subject={editingSubject}
              onClose={() => setEditingSubject(null)}
              onUpdated={(s) => { handleSubjectUpdated(s); setEditingSubject(null); }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
