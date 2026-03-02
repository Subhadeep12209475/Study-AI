# Database Design

## 1. Overview
The database is designed using a relational model to store and manage student academic data efficiently. It ensures data integrity, avoids redundancy, and supports future analytical processing.

---

## 2. Entity Description

### 2.1 User
Stores basic information about the student.
- user_id (Primary Key)
- name
- email
- daily_study_hours

---

### 2.2 Subject
Represents academic subjects taken by the student.
- subject_id (Primary Key)
- user_id (Foreign Key)
- subject_name

---

### 2.3 Topic
Stores topics under each subject.
- topic_id (Primary Key)
- subject_id (Foreign Key)
- topic_name
- difficulty_level
- confidence_level

---

### 2.4 Exam
Stores examination details for subjects.
- exam_id (Primary Key)
- subject_id (Foreign Key)
- exam_date
- weightage

---

### 2.5 Study Plan
Stores generated daily study plans.
- plan_id (Primary Key)
- user_id (Foreign Key)
- plan_date
- generated_plan (JSON)

---

## 3. Relationships Between Entities
- One user can have multiple subjects.
- Each subject can have multiple topics.
- Each subject is associated with one exam.
- One user can have multiple generated study plans.

---

## 4. ER Diagram Description
The ER diagram consists of User as the main entity connected to Subject through a one-to-many relationship. Subject is further connected to Topic and Exam entities. The Study Plan entity is linked with the User entity to store daily AI-generated study schedules.
