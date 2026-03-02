from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.topic import Topic
from app.schemas.topic_schema import TopicCreate

router = APIRouter(
    tags=["Topics"]
)

# =========================
# Get topics by subject
# =========================
@router.get("/{subject_id}")
def get_topics_by_subject(subject_id: str, db: Session = Depends(get_db)):
    topics = db.query(Topic).filter(
        Topic.subject_id == subject_id
    ).all()

    return topics


# =========================
# Create topic
# =========================
@router.post("/")
def create_topic(data: TopicCreate, db: Session = Depends(get_db)):
    topic = Topic(**data.dict())
    db.add(topic)
    db.commit()
    db.refresh(topic)
    return topic


# =========================
# Update topic
# =========================
@router.put("/{topic_id}")
def update_topic(topic_id: str, data: dict, db: Session = Depends(get_db)):
    topic = db.query(Topic).filter(Topic.id == topic_id).first()

    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    for key, value in data.items():
        setattr(topic, key, value)

    db.commit()
    db.refresh(topic)
    return topic


# =========================
# Delete topic
# =========================
@router.delete("/{topic_id}")
def delete_topic(topic_id: str, db: Session = Depends(get_db)):
    topic = db.query(Topic).filter(Topic.id == topic_id).first()

    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    db.delete(topic)
    db.commit()

    return {"message": "Topic deleted"}
