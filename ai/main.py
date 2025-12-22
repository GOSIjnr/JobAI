from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import google.generativeai as genai
from dotenv import load_dotenv
import json
from typing import List, Dict, Any

load_dotenv()

app = FastAPI(title="JobMatch AI Service")

# Configure Gemini
GENAI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GENAI_API_KEY:
    print("WARNING: GEMINI_API_KEY not found in environment variables.")
else:
    genai.configure(api_key=GENAI_API_KEY)

class TraitRequest(BaseModel):
    answers: List[Any]  # Accepting list of objects {question, answer}

class TraitResponse(BaseModel):
    recommendations: List[Dict]
    analysis: str

@app.get("/")
def read_root():
    return {"message": "JobMatch AI Service is running (Gemini Powered)"}

@app.post("/recommend-careers")
async def recommend_careers(request: TraitRequest):
    try:
        model = genai.GenerativeModel('gemini-2.0-flash')

        # Static Knowledge Base of Tech Careers
        CAREER_KNOWLEDGE_BASE = [
            {"title": "Frontend Developer", "traits": ["Creative", "Visual", "Tangible Results", "Detail-Oriented", "User-Centric"], "description": "Builds the visible parts of websites and apps users interact with."},
            {"title": "Backend Developer", "traits": ["Logical", "Technical", "System-Oriented", "Problem Solver", "Efficient"], "description": "Builds the server-side logic, databases, and APIs that power applications."},
            {"title": "Full Stack Developer", "traits": ["Adaptable", "Technical", "Creative", "Holistic", "Learner"], "description": "Versatile developer capable of working on both potential frontend and backend components."},
            {"title": "DevOps Engineer", "traits": ["Technical", "Automation", "Reliability", "Security", "System-Oriented"], "description": "Focuses on deploying, scaling, and maintaining infrastructure and CI/CD pipelines."},
            {"title": "Data Scientist", "traits": ["Analytical", "Mathematical", "Pattern-Finder", "Business-Minded", "Investigative"], "description": "Analyzes complex data to help organizations make better decisions."},
            {"title": "UX/UI Designer", "traits": ["Creative", "Empathic", "Visual", "User-Centric", "Communicator"], "description": "Designs intuitive and aesthetically pleasing user interfaces and experiences."},
            {"title": "Cybersecurity Analyst", "traits": ["Security-Minded", "Risk-Averse", "Detail-Oriented", "Investigative", "Protective"], "description": "Protects systems and networks from threats and unauthorized access."},
            {"title": "Product Manager", "traits": ["Leadership", "Business-Minded", "Communicator", "Strategic", "Empathic"], "description": "Guidies the success of a product and leads the cross-functional team that is responsible for improving it."},
            {"title": "QA Engineer", "traits": ["Detail-Oriented", "Critical Thinker", "Reliability", "Process-Oriented", "Breaker"], "description": "Tests software to ensure it meets quality standards and is free of bugs."},
            {"title": "Cloud Architect", "traits": ["Strategic", "Technical", "System-Oriented", "Scalability", "Planner"], "description": "Designs and manages the cloud computing strategy for an organization."},
            {"title": "Mobile App Developer", "traits": ["Creative", "Technical", "User-Centric", "Tangible Results", "Mobile-First"], "description": "Develops applications specifically for mobile devices (iOS/Android)."},
            {"title": "Database Administrator", "traits": ["Organized", "Reliability", "Security", "Detail-Oriented", "Technical"], "description": "Ensures data is stored, organized, and accessible securely and efficiently."},
            {"title": "Solutions Architect", "traits": ["Strategic", "Communicator", "Technical", "Business-Minded", "Problem Solver"], "description": "Designs complex technical solutions to meet business needs."},
            {"title": "Blockchain Developer", "traits": [" innovative", "Cryptographic", "Technical", "Security-Minded", "Decentralized"], "description": "Builds decentralized applications and smart contracts on blockchain platforms."},
            {"title": "Game Developer", "traits": ["Creative", "Technical", "Visual", "Storyteller", "Logic"], "description": "Creates video games for computers, consoles, and mobile devices."}
        ]
        
        prompt = f"""
        You are an expert Career Counselor AI with a specific methodology.
        
        TASK:
        1. Analyze the User's Persona based on their Q&A.
        2. COMPARE the User's Persona against the provided 'CAREER_KNOWLEDGE_BASE'.
        3. For EACH career in the knowledge base, calculate a 'Compatibility Score' (0-100%) based on trait overlap.
        4. SELECT the Top 3 distinct careers with the highest scores.
        
        INPUT DATA:
        User Q&A:
        {json.dumps(request.answers, indent=2)}
        
        CAREER_KNOWLEDGE_BASE:
        {json.dumps(CAREER_KNOWLEDGE_BASE, indent=2)}
        
        OUTPUT FORMAT:
        Return a PURE JSON object (no markdown) with this EXACT structure:
        {{
            "recommendations": [
                {{
                    "title": "Exact Title from Knowledge Base",
                    "description": "Description from Knowledge Base",
                    "match_score": 95,
                    "reasoning": "Detailed explanation of why the user's answers (cite specific traits/answers) match this role's required traits."
                }}
            ],
            "analysis": "A professional summary of the user's identified strengths and work style."
        }}
        """

        response = model.generate_content(prompt)
        text_response = response.text.strip()
        
        # Clean up if model adds markdown code blocks
        if text_response.startswith("```json"):
            text_response = text_response[7:]
        if text_response.endswith("```"):
            text_response = text_response[:-3]
            
        return json.loads(text_response)

    except Exception as e:
        print(f"Error calling Gemini: {e}")
        # Fallback to avoid breaking the UI if API fails
        raise HTTPException(status_code=500, detail=f"AI generation failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
