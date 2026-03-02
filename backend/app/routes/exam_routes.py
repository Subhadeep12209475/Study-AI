from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.exam import Exam
from app.schemas.exam_schema import ExamCreate

router = APIRouter(prefix="/exams", tags=["Exams"])

@router.post("/")
def create_exam(data: ExamCreate, db: Session = Depends(get_db)):
    exam = Exam(**data.dict())
    db.add(exam)
    db.commit()
    db.refresh(exam)
    return exam
