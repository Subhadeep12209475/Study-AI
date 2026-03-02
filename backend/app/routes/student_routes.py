from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.student import Student
from app.schemas.student_schema import StudentCreate

router = APIRouter(prefix="/students", tags=["Students"])

@router.post("/")
def create_student(data: StudentCreate, db: Session = Depends(get_db)):
    student = Student(**data.dict())
    db.add(student)
    db.commit()
    db.refresh(student)
    return student
