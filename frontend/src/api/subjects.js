const BASE_URL = "http://127.0.0.1:8000";

/* =========================
   Get all subjects by student
========================= */
export async function fetchSubjects(studentId) {
  const res = await fetch(
    `${BASE_URL}/subjects/student/${studentId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch subjects");
  }

  return res.json();
}

/* =========================
   Create a new subject
========================= */
export async function createSubject(payload) {
  const res = await fetch(`${BASE_URL}/subjects/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create subject");
  }

  return res.json();
}

/* =========================
   Get single subject by ID
========================= */
export async function fetchSubjectById(subjectId) {
  const res = await fetch(
    `${BASE_URL}/subjects/${subjectId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch subject details");
  }

  return res.json();
}

/* =========================
   Update subject (future use)
========================= */
export async function updateSubject(subjectId, payload) {
  const res = await fetch(
    `${BASE_URL}/subjects/${subjectId}`,
    {
      method: "PUT", // use PATCH if you prefer partial updates
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update subject");
  }

  return res.json();
}
