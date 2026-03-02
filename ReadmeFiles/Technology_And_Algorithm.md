# Technology Stack and Algorithm Overview

## 1. Technology Stack Selection

### 1.1 Backend – Python & FastAPI
Python is chosen due to its simplicity, extensive library support, and suitability for data analysis and artificial intelligence tasks. FastAPI is used as the backend framework because it is lightweight, fast, and supports RESTful API development efficiently.

---

### 1.2 Frontend – React.js
React.js is selected to build a responsive and interactive user interface. It allows component-based development and efficient state management, making it suitable for dynamic dashboards.

---

### 1.3 Database – PostgreSQL
PostgreSQL is used as the relational database management system due to its reliability, support for complex queries, and ability to handle structured academic data efficiently.

---

### 1.4 AI and Data Processing Libraries
- NumPy and Pandas are used for numerical and data manipulation tasks.
- Scikit-learn is used for implementing basic machine learning models for academic risk analysis.

---

## 2. Algorithm Overview

### 2.1 Priority Scoring Algorithm
The priority scoring algorithm determines which subjects and topics require more attention. The score is calculated based on multiple academic factors such as difficulty level, confidence level, and exam urgency.

**Priority Score Formula:**

Priority Score =
(Difficulty Level × Weight 1) +
(Weakness Level × Weight 2) +
(Exam Weightage × Weight 3) +
(Urgency Factor × Weight 4)

---

### 2.2 Time Allocation Algorithm
The time allocation algorithm distributes the available daily study hours among subjects proportionally based on their priority scores. This ensures balanced study planning and prevents overloading on a single subject.

---

### 2.3 Risk Analysis Logic
In the initial phase, academic risk is identified using rule-based logic by analyzing low confidence levels, high difficulty topics, and proximity of exams. This logic can be extended using machine learning techniques in future enhancements.

---

## 3. Advantages of the Proposed Algorithm
- Provides personalized study recommendations
- Improves time management
- Reduces academic stress
- Offers explainable and transparent decision-making
