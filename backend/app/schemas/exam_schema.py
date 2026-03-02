from pydantic import BaseModel
from datetime import date

class ExamCreate(BaseModel):
    exam_date: date
    weightage: int
    subject_id: str
