from datetime import date


def urgency_score(exam_date):
    days_left = (exam_date - date.today()).days
    return max(0, 30 - days_left) / 30


def topic_priority(topic, exam):
    return (
        topic.difficulty * 0.4 +
        (5 - topic.confidence) * 0.3 +
        exam.weightage * 0.2 +
        urgency_score(exam.exam_date) * 0.1
    )


def generate_study_plan(student, subjects, topics, exams):
    plan = []
    risk_subject = None
    highest_risk = 0

    for subject in subjects:
        subject_topics = [t for t in topics if t.subject_id == subject.id]
        exam = next((e for e in exams if e.subject_id == subject.id), None)

        if not exam or not subject_topics:
            continue

        scored_topics = []

        for topic in subject_topics:
            score = topic_priority(topic, exam)
            scored_topics.append((topic, score))

            if score > highest_risk:
                highest_risk = score
                risk_subject = subject.name

        scored_topics.sort(key=lambda x: x[1], reverse=True)

        # Pick TOP 1 topic per subject (safe for final year)
        topic, score = scored_topics[0]

        plan.append({
            "subject": subject.name,
            "topic": topic.name,
            "priority_score": round(score, 2)
        })

    hours_per_topic = max(
        1, student.daily_study_hours // max(1, len(plan))
    )

    for p in plan:
        p["hours"] = hours_per_topic

    return {
        "student_id": student.id,
        "today_plan": plan,
        "risk_subject": risk_subject,
        "total_hours": student.daily_study_hours
    }
