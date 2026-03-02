import uuid
from sqlalchemy import Column, String, Integer, ForeignKey
from app.database import Base

class Exam(Base):
    __tablename__ = "exams"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(150), nullable=False)
    days_left = Column(Integer, nullable=False)

    subject_id = Column(String, ForeignKey("subjects.id"))
