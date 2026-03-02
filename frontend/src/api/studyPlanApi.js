const BASE_URL = "http://localhost:8000";

/**
 * Fetch AI-generated study plan for a student
 * @param {number} studentId
 */
export const fetchStudyPlan = async (studentId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/study-plan/${studentId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch study plan");
    }

    return await response.json();
  } catch (error) {
    console.error("Study Plan API Error:", error);
    throw error;
  }
};
