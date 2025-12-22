# Architecture

JobMatch follows a microservices-inspired monorepo architecture.

## Components

### 1. Backend (Node.js)
- **Framework**: Express.js
- **Database**: PostgreSQL (via Prisma)
- **Role**: Handles user data, questionnaires, and orchestration of matching.

### 2. AI Service (Python)
- **Framework**: FastAPI
- **Role**: Performs "heavy lifting" AI tasks:
    - Trait extraction (LLM integration)
    - Vector embeddings generation
    - Matching logic (Cosine similarity)

### 3. Frontend (Next.js)
- **Framework**: Next.js 14+ (App Router)
- **UI Driver**: Tailwind CSS
- **Role**: User interface for Landing Page, Questionnaire, and Results.

## Data Flow
1. User submits answers via Frontend.
2. Backend receives answers, saves to Postgres.
3. Backend calls AI Service to extract traits.
4. AI Service returns traits.
5. Backend/AI Service computes matches against Job Vectors (stored in Qdrant).
6. Results returned to Frontend.
