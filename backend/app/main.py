from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import student, subject, topic, exam, session

from app.routes.student_routes import router as student_router
from app.routes.subject_routes import router as subject_router
from app.routes.topic_routes import router as topic_router
from app.routes.exam_routes import router as exam_router
from app.routes.study_plan_routes import router as study_plan_router
from app.routes.session_routes import router as session_router
from app.routes.auth_routes import router as auth_router   # ✅ ADD THIS


app = FastAPI(
    title="AI-Based Personalized Study Planner",
    version="1.0"
)

# 🌐 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🗄️ Create DB tables
Base.metadata.create_all(bind=engine)

# 🔗 API Routes
app.include_router(auth_router, prefix="/auth")  # ✅ ADD THIS
app.include_router(student_router, prefix="/students")
app.include_router(subject_router, prefix="/subjects")
app.include_router(topic_router, prefix="/topics")
app.include_router(exam_router, prefix="/exams")
app.include_router(study_plan_router, prefix="/study-plan")
app.include_router(session_router, prefix="/sessions")


# 🏠 Health check
@app.get("/")
def home():
    return {"status": "running"}