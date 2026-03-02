import "./aiCoachPopup.css";
import { useState, useRef, useEffect, useCallback } from "react";

// ── SYSTEM PROMPT ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an expert AI Study Coach embedded inside "Let's Study" — a premium student productivity app. Your name is Nova.

Your personality:
- Warm, encouraging, and direct. Never robotic.
- You give SPECIFIC, actionable advice — not generic motivational fluff.
- You use data from the student's context when available.
- You're concise: most replies are 2–4 sentences unless the student asks for a plan.
- You use occasional emojis naturally (not excessively).
- When giving study plans or lists, use clear formatting with line breaks.

Your capabilities:
- Analyze weak subjects and recommend focus areas
- Build personalized study schedules
- Give Pomodoro / spaced repetition / active recall tips
- Motivate students during low-energy periods
- Break down complex topics into manageable chunks
- Predict exam readiness based on current progress

Student context (use this to personalize responses):
- App: Let's Study (study planner with subjects, topics, sessions, exams)
- The student tracks subjects, study hours, completion rates, and upcoming exams
- You can reference "their dashboard", "their subjects", "their streak" etc.

Keep responses focused on studying, learning, productivity, and academic success. 
If asked something completely unrelated, gently redirect to study topics.`;

// ── QUICK SUGGESTIONS ─────────────────────────────────────────────────────────
const SUGGESTIONS = [
  { label: "Weak areas", prompt: "What are my weakest study areas and how should I fix them?" },
  { label: "Make study plan", prompt: "Create a 5-day study plan for my upcoming exams." },
  { label: "Best techniques", prompt: "What are the most effective study techniques I should use?" },
  { label: "I'm unmotivated", prompt: "I'm feeling really unmotivated to study. Help me get started." },
  { label: "Pomodoro tips", prompt: "How should I use the Pomodoro technique effectively?" },
  { label: "Exam strategy", prompt: "Give me a strategy for the last 3 days before an exam." },
];

// ── CALL ANTHROPIC API ─────────────────────────────────────────────────────────
async function callClaude(messages) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.text,
      })),
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text || "Sorry, I couldn't generate a response.";
}

// ── TIMESTAMP ─────────────────────────────────────────────────────────────────
function timestamp() {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

// ── FORMATTED MESSAGE ──────────────────────────────────────────────────────────
function FormattedText({ text }) {
  // Bold (**text**), inline code (`code`), line breaks
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\n)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**"))
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part.startsWith("`") && part.endsWith("`"))
          return <code key={i} className="aic-inline-code">{part.slice(1, -1)}</code>;
        if (part === "\n") return <br key={i} />;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
export default function AiCoachPopup() {
  const [open, setOpen]         = useState(false);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [unread, setUnread]     = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hey! 👋 I'm **Nova**, your AI Study Coach. I can help you build study plans, find weak spots, and keep you on track.\n\nWhat do you need help with today?",
      time: timestamp(),
      id: "welcome",
    },
  ]);

  const chatEndRef  = useRef(null);
  const inputRef    = useRef(null);
  const textareaRef = useRef(null);

  // scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // focus input when opening
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // auto-resize textarea
  const autoResize = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }, []);

  const sendMessage = useCallback(async (overrideText) => {
    const text = (overrideText || input).trim();
    if (!text || loading) return;

    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setError("");

    // Add user message
    const userMsg = { role: "user", text, time: timestamp(), id: Date.now() + "u" };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Build history for API (exclude welcome, include all real messages + new user msg)
      const history = [...messages.filter(m => m.id !== "welcome"), userMsg]
        .filter(m => m.role === "user" || m.role === "ai");

      const replyText = await callClaude(history);

      const aiMsg = {
        role: "ai",
        text: replyText,
        time: timestamp(),
        id: Date.now() + "a",
      };

      setMessages((prev) => [...prev, aiMsg]);
      if (!open) setUnread((n) => n + 1);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, open]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      role: "ai",
      text: "Chat cleared! 🧹 What would you like to work on?",
      time: timestamp(),
      id: "cleared",
    }]);
    setError("");
  };

  return (
    <>
      {/* mobile overlay */}
      {open && <div className="aic-overlay" onClick={() => setOpen(false)} />}

      {/* ── POPUP ── */}
      <div className={`aic-popup ${open ? "aic-popup--open" : ""} ${expanded ? "aic-popup--expanded" : ""}`}>

        {/* top shimmer */}
        <div className="aic-popup-shimmer" />

        {/* ── HEADER ── */}
        <div className="aic-header">
          <div className="aic-header-left">
            <div className="aic-bot-avatar">
              <span>✦</span>
              <div className="aic-avatar-ring" />
            </div>
            <div className="aic-header-info">
              <div className="aic-header-name">
                Nova
                <span className="aic-pro-badge">AI</span>
              </div>
              <div className="aic-header-status">
                <span className="aic-status-dot" />
                Study Coach · Always online
              </div>
            </div>
          </div>

          <div className="aic-header-actions">
            <button className="aic-hbtn" title="Expand" onClick={() => setExpanded(e => !e)}>
              {expanded ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                  <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                  <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              )}
            </button>
            <button className="aic-hbtn" title="Clear chat" onClick={clearChat}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
            </button>
            <button className="aic-hbtn aic-hbtn-close" onClick={() => setOpen(false)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── MESSAGES ── */}
        <div className="aic-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`aic-msg aic-msg--${msg.role}`}>
              {msg.role === "ai" && (
                <div className="aic-msg-avatar">✦</div>
              )}
              <div className="aic-msg-content">
                <div className={`aic-bubble aic-bubble--${msg.role}`}>
                  <FormattedText text={msg.text} />
                </div>
                <span className="aic-msg-time">{msg.time}</span>
              </div>
              {msg.role === "user" && (
                <div className="aic-msg-avatar aic-msg-avatar--user">ME</div>
              )}
            </div>
          ))}

          {/* typing indicator */}
          {loading && (
            <div className="aic-msg aic-msg--ai">
              <div className="aic-msg-avatar">✦</div>
              <div className="aic-typing-bubble">
                <span /><span /><span />
              </div>
            </div>
          )}

          {/* error */}
          {error && (
            <div className="aic-error-msg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
              <button onClick={() => setError("")}>✕</button>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* ── SUGGESTIONS ── */}
        {messages.length <= 2 && !loading && (
          <div className="aic-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s.label} className="aic-chip" onClick={() => sendMessage(s.prompt)}>
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* ── INPUT ── */}
        <div className="aic-input-area">
          <div className="aic-input-wrap">
            <textarea
              ref={inputRef}
              className="aic-input"
              value={input}
              onChange={(e) => { setInput(e.target.value); autoResize(); }}
              onKeyDown={handleKeyDown}
              placeholder="Ask Nova anything about studying…"
              rows={1}
              disabled={loading}
            />
            <button
              className={`aic-send ${loading ? "aic-send--loading" : ""} ${input.trim() ? "aic-send--active" : ""}`}
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              title="Send (Enter)"
            >
              {loading ? (
                <div className="aic-send-spinner" />
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              )}
            </button>
          </div>
          <p className="aic-input-hint">Enter to send · Shift+Enter for new line</p>
        </div>
      </div>

      {/* ── FAB ── */}
      <button
        className={`aic-fab ${open ? "aic-fab--open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        title="AI Study Coach"
      >
        <span className="aic-fab-icon">
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.06-1.37L2 22l1.37-4.94A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2z"/>
              <path d="M8 10h8M8 14h5"/>
            </svg>
          )}
        </span>
        {!open && unread > 0 && (
          <span className="aic-fab-badge">{unread}</span>
        )}
        {!open && <span className="aic-fab-pulse" />}
      </button>
    </>
  );
}
