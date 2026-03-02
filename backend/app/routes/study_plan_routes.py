from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.student import Student
from app.models.subject import Subject
from app.models.topic import Topic
from app.models.exam import Exam
from app.services.study_plan_engine import generate_study_plan

router = APIRouter(tags=["AI Study Planner"])


@router.get("/{student_id}")
def get_study_plan(student_id: str, db: Session = Depends(get_db)):


    # 1️⃣ Fetch core data
    student = db.query(Student).filter(Student.id == student_id).first()

    if not student:
        return {"error": "Student not found"}

    subjects = db.query(Subject).filter(
        Subject.student_id == student_id
    ).all()

    topics = db.query(Topic).all()
    exams = db.query(Exam).all()

    # 2️⃣ Generate AI study plan
    plan_data = generate_study_plan(
        student=student,
        subjects=subjects,
        topics=topics,
        exams=exams
    )

    # 3️⃣ Alerts (simple + explainable)
    alerts = []
    if plan_data["risk_subject"]:
        alerts.append({
            "type": "RISK",
            "message": f"High priority subject: {plan_data['risk_subject']}"
        })

    # 4️⃣ Completion stats (dummy but logical for final year)
    completion_rate = min(
        100,
        int((len(plan_data["today_plan"]) / max(1, len(subjects))) * 100)
    )

    # 5️⃣ Final response (frontend-safe)
    return {
        "subjects": [
            {
                "id": s.id,
                "name": s.name,
                "student_id": s.student_id
            }
            for s in subjects
        ],

        "today_plan": plan_data["today_plan"],

        "alerts": alerts,

        "weekly_data": [],  # future scope (mention in viva)

        "stats": {
            "total_hours": plan_data["total_hours"],
            "completion_rate": completion_rate,
            "risk_count": 1 if plan_data["risk_subject"] else 0
        }
    }
