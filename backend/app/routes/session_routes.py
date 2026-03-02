from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date

from app.database import get_db
from app.models.session import StudySession
from app.schemas.session_schema import SessionCreate, SessionResponse

router = APIRouter(tags=["Sessions"])


@router.post("/", response_model=SessionResponse)
def add_session(data: SessionCreate, db: Session = Depends(get_db)):
    session = StudySession(**data.dict())
    db.add(session)
    db.commit()
    db.refresh(session)
    return session


@router.get("/today/{student_id}", response_model=list[SessionResponse])
def today_sessions(student_id: str, db: Session = Depends(get_db)):
    today = date.today()
    return db.query(StudySession).filter(
        StudySession.student_id == student_id,
        StudySession.date == today
    ).all()
