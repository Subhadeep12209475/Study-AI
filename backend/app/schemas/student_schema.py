from pydantic import BaseModel

class StudentCreate(BaseModel):
    name: str
    email: str
    daily_study_hours: int
