from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.subject import Subject
from app.schemas.subject_schema import SubjectCreate

router = APIRouter(
    tags=["Subjects"]
)

# =========================
# Create Subject
# =========================
@router.post("/")
def create_subject(data: SubjectCreate, db: Session = Depends(get_db)):
    subject = Subject(**data.dict())
    db.add(subject)
    db.commit()
    db.refresh(subject)
    return subject


# =========================
# Get ALL Subjects by Student
# =========================
@router.get("/student/{student_id}")
def get_subjects_by_student(student_id: str, db: Session = Depends(get_db)):
    subjects = db.query(Subject).filter(
        Subject.student_id == student_id
    ).all()

    return subjects


# =========================
# Get SINGLE Subject by ID
# =========================
@router.get("/{subject_id}")
def get_subject_by_id(subject_id: str, db: Session = Depends(get_db)):
    subject = db.query(Subject).filter(
        Subject.id == subject_id
    ).first()

    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    return subject
