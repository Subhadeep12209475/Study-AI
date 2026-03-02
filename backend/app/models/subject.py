import uuid
from sqlalchemy import Column, String
from app.database import Base


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    student_id = Column(String, nullable=False)
