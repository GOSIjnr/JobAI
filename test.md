# JobMatch Testing Guide

This guide explains how to run the full JobMatch stack and serves as a manual testing protocol to verify the AI's career recommendations.

## 🚀 1. How to Run All Services

Since this is a distributed system, you need to run the **Database**, **Backend**, **AI Service**, and **Frontend** simultaneously.

### Option A: Docker Compose (Recommended)
If you have Docker installed, you can run everything with one command:
```bash
docker-compose up --build
```
*Access:*
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- AI Service: http://localhost:8000

### Option B: Manual Terminal Startup
If running locally without Docker for the apps, you need **3 separate terminals**.

**Terminal 1: Backend**
```bash
cd backend
npm run dev
```

**Terminal 2: AI Service**
```bash
cd ai
# Ensure venv is active if you use one
python main.py
```

**Terminal 3: Frontend**
```bash
cd frontend
npm run dev
```

---

## 🧪 2. Test Personas

Use these specific answer patterns to verify if the AI correctly identifies different "Tech DNA" profiles.

### 🎨 Persona A: The Visual Creator
**Target Role:** UX/UI Designer / Frontend Developer

**How to Answer:**
- **Strongly Agree** to:
    - "I am drawn to visual aesthetics, color theory, and typography."
    - "I prefer tangible results I can see and touch (like a UI)..."
    - "I enjoy sketching or designing layouts..."
- **Disagree** to:
    - "I enjoy configuring and securing computer networks..."
    - "I worry about how to break a system..."

**Expected Result:**
- **#1 Recommendation:** UX/UI Designer OR Frontend Developer
- **Match Score:** > 90%
- **Key Traits Identified:** Creative, Visual, User-Centric.

---

### 🕵️‍♂️ Persona B: The Data Detective
**Target Role:** Data Scientist / Data Analyst

**How to Answer:**
- **Strongly Agree** to:
    - "I enjoy spotting patterns and trends in large sets of information."
    - "I like making decisions based on hard data..."
    - "I truly enjoy solving complex logical puzzles..."
- **Neutral/Disagree** to:
    - "I find satisfaction in organizing people..." (Leadership)
    - "I am drawn to visual aesthetics..."

**Expected Result:**
- **#1 Recommendation:** Data Scientist
- **Match Score:** > 90%
- **Key Traits Identified:** Analytical, Mathematical, Pattern-Finder.

---

### 🛡️ Persona C: The System Guardian
**Target Role:** DevOps Engineer / Cybersecurity Analyst

**How to Answer:**
- **Strongly Agree** to:
    - "I prefer understanding how a machine works 'under the hood'..."
    - "I enjoy configuring and securing computer networks..."
    - "I worry about how to break a system or finding its vulnerabilities."
    - "I prioritize stability, safety, and reliability..."
- **Disagree** to:
    - "I prefer visual aesthetics..."

**Expected Result:**
- **#1 Recommendation:** DevOps Engineer OR Cybersecurity Analyst
- **Match Score:** > 85%
- **Key Traits Identified:** Security-Minded, Technical, Reliability.

---

### 👔 Persona D: The Product Leader
**Target Role:** Product Manager / Solutions Architect

**How to Answer:**
- **Strongly Agree** to:
    - "I find satisfaction in organizing people and resources..."
    - "I enjoy mentoring others..."
    - "I am interested in the business side of products..."
    - "I prefer working collaboratively in a team..."

**Expected Result:**
- **#1 Recommendation:** Product Manager
- **Match Score:** > 85%
- **Key Traits Identified:** Leadership, Business-Minded, Strategic.
