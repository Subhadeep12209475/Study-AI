import uuid
from sqlalchemy import Column, String, Integer, ForeignKey
from app.database import Base

class Topic(Base):
    __tablename__ = "topics"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(150), nullable=False)
    difficulty = Column(Integer, nullable=False)
    confidence = Column(Integer, nullable=False)

    subject_id = Column(String, ForeignKey("subjects.id"))
