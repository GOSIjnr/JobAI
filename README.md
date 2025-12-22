# JobMatch - Unified Platform

JobMatch is a production-grade job matching system composed of three main services working in harmony:

1.  **Frontend** (Next.js): The user interface (Port 3000).
2.  **Backend** (Node.js/Express): The business logic and database manager (Port 4000).
3.  **AI Service** (Python/FastAPI): The intelligence layer for trait extraction (Port 8000).

## 🚀 How to Run the Unified Solution (Recommended)

The easiest way to run all components together as a single software solution is using **Docker Compose**.

### Prerequisites
- Docker Desktop installed and running.

### One-Command Start
Run this command in the root folder:

```bash
docker-compose up --build
```

This will:
1.  Spin up the **PostgreSQL** database.
2.  Spin up the **Qdrant** vector database.
3.  Build and start the **Backend**.
4.  Build and start the **AI Service**.
5.  Build and start the **Frontend**.

**Access the System:**
- **Main App**: [http://localhost:3000](http://localhost:3000)
- **API Docs**: [http://localhost:4000/health](http://localhost:4000/health)
- **AI Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🛠 Manual Setup (Development)

If you prefer running services individually for development, you need 3 separate terminals.

### 1. Database & infrastructure
You still need the databases running.
```bash
docker-compose up -d postgres qdrant redis
```

### 2. Backend (Terminal 1)
```bash
cd backend
npm install
# Generate database client
npx prisma generate
npx prisma db push
# Start server
npm run dev
```
*Runs on http://localhost:4000*

### 3. AI Service (Terminal 2)
```bash
cd ai
# Create venv (optional but recommended)
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
*Runs on http://localhost:8000*

### 4. Frontend (Terminal 3)
```bash
cd frontend
npm install
npm run dev
```
*Runs on http://localhost:3000*

## 🔗 How They Connect

The system uses Environment Variables to link the pieces together.

- **Frontend** talks to Backend via `NEXT_PUBLIC_API_URL` (default: `http://localhost:4000/api`).
- **Backend** talks to AI Service via `AI_SERVICE_URL` (default: `http://localhost:8000`).
- **Backend** talks to Postgres via `DATABASE_URL`.
- **AI Service** talks to Qdrant via `QDRANT_URL`.

## 📁 Folder Structure

- `/backend`: Node.js Express API.
- `/frontend`: Next.js React App.
- `/ai`: Python FastAPI Microservice.
- `/docs`: Detailed architectural documentation.
