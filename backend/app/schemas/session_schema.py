from pydantic import BaseModel
from datetime import date

class SessionCreate(BaseModel):
    student_id: str
    subject_name: str
    topic_name: str
    date: date
    duration_minutes: int = 30

class SessionResponse(SessionCreate):
    id: str
    is_completed: bool

    class Config:
        orm_mode = True
