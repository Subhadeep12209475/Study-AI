from pydantic import BaseModel
from uuid import UUID

class SubjectCreate(BaseModel):
    name: str
    student_id: UUID

class SubjectResponse(BaseModel):
    id: UUID
    name: str
    student_id: UUID

    model_config = {
        "from_attributes": True
    }
