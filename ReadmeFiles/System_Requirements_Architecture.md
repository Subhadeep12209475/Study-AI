# System Requirements and Architecture

## 1. Hardware Requirements
- Processor: Intel i3 or above
- RAM: Minimum 8 GB
- Storage: Minimum 50 GB free space
- Internet Connection (for development and testing)

---

## 2. Software Requirements
- Operating System: Windows 10 / Linux / macOS
- Programming Language: Python 3.10+
- Backend Framework: FastAPI
- Frontend Framework: React.js
- Database: PostgreSQL
- Libraries:
  - SQLAlchemy
  - Scikit-learn
  - Pandas
  - NumPy
- Tools:
  - VS Code
  - Git
  - Browser (Chrome/Firefox)

---

## 3. System Architecture Overview
The system follows a client-server architecture where the frontend interacts with the backend through RESTful APIs. The backend handles data processing, priority analysis, and risk evaluation using AI-based logic, while the database stores student academic data.

---

## 4. Architecture Components
- **Frontend:** Provides user interface for students to enter academic data and view study plans.
- **Backend:** Processes requests, performs priority calculations, and generates study plans.
- **Database:** Stores user profiles, subjects, topics, and exam information.
- **AI Logic Module:** Analyzes difficulty, confidence, and exam urgency to generate optimized outputs.

---

## 5. Architecture Diagram (Description)
The student interacts with the web interface to submit academic details. The backend processes this data using AI-based algorithms and stores relevant information in the database. The processed results are sent back to the frontend for visualization.
