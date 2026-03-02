const BASE_URL = "http://127.0.0.1:8000";

/* Fetch topics for a subject */
export async function fetchTopics(subjectId) {
  const res = await fetch(`${BASE_URL}/topics/${subjectId}`);
  if (!res.ok) throw new Error("Failed to fetch topics");
  return res.json();
}

/* Create topic */
export async function createTopic(payload) {
  const res = await fetch(`${BASE_URL}/topics/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create topic");
  return res.json();
}

/* Update topic (edit / complete) */
export async function updateTopic(topicId, payload) {
  const res = await fetch(`${BASE_URL}/topics/${topicId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update topic");
  return res.json();
}

/* Delete topic */
export async function deleteTopic(topicId) {
  const res = await fetch(`${BASE_URL}/topics/${topicId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete topic");
}
