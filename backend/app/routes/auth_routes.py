from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.auth_service import (
    hash_password,
    verify_password,
    create_access_token
)
from app.models.student import Student

router = APIRouter(
    tags=["Auth"]
)


# ==============================
# 📝 SIGNUP
# ==============================

@router.post("/signup")
def signup(name: str, email: str, password: str, db: Session = Depends(get_db)):

    # Check if user already exists
    existing_user = db.query(Student).filter(Student.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash password
    hashed_password = hash_password(password)

    # Create new user
    new_user = Student(
        name=name,
        email=email,
        hashed_password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully"}


# ==============================
# 🔑 LOGIN
# ==============================

@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):

    user = db.query(Student).filter(Student.email == email).first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    access_token = create_access_token(
        data={"user_id": user.id}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }