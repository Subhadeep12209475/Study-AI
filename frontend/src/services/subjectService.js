const BASE_URL = "http://127.0.0.1:8000";

export async function fetchSubjects(studentId) {
  const res = await fetch(`${BASE_URL}/subjects/${studentId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch subjects");
  }
  return res.json();
}
