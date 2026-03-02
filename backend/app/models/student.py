import uuid
from sqlalchemy import Column, String, Integer
from app.database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    name = Column(String, nullable=False)

    email = Column(String, unique=True, index=True, nullable=False)

    hashed_password = Column(String, nullable=False)

    daily_study_hours = Column(Integer, default=2)