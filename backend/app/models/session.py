import uuid
from sqlalchemy import Column, String, Integer, Boolean, Date
from app.database import Base

class StudySession(Base):
    __tablename__ = "study_sessions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id = Column(String, nullable=False)
    subject_name = Column(String, nullable=False)
    topic_name = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    duration_minutes = Column(Integer, default=30)
    is_completed = Column(Boolean, default=False)
