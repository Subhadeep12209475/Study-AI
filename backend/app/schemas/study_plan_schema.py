from pydantic import BaseModel
from typing import List
from datetime import date


class StudyPlanTopic(BaseModel):
    subject: str
    topic: str
    hours: int
    priority_score: float


class StudyPlanResponse(BaseModel):
    student_id: int
    today_plan: List[StudyPlanTopic]
    risk_subject: str | None
    total_hours: int
