from pydantic import BaseModel
from uuid import UUID

class TopicCreate(BaseModel):
    name: str
    difficulty: int
    confidence: int
    subject_id: UUID

class TopicResponse(TopicCreate):
    id: UUID

    model_config = {
        "from_attributes": True
    }
