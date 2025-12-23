"""
Knowledge Base for JobMatch AI Engine
Contains 25 tech career definitions with traits and descriptions.
"""

from typing import List, Dict

# Trait categories that map to questionnaire categories
TRAIT_CATEGORIES = {
    "analytical": ["logical", "data-driven", "pattern-recognition", "mathematical", "investigative"],
    "technical": ["systems-thinking", "automation", "performance", "infrastructure", "debugging"],
    "creative": ["visual", "design", "aesthetics", "user-centric", "innovative"],
    "leadership": ["organizing", "strategic", "decision-making", "mentoring", "stakeholder-management"],
    "adaptability": ["flexible", "fast-paced", "variety-seeking", "ambiguity-tolerance", "learning-agile"],
    "security": ["risk-aware", "protective", "vulnerability-focused", "compliance", "defensive"],
    "communication": ["explaining", "documentation", "collaboration", "presentation", "empathy"],
    "mobile": ["mobile-first", "cross-platform", "touch-interfaces", "app-lifecycle", "responsive"],
    "testing": ["quality-focused", "detail-oriented", "breaking-things", "automation", "systematic"],
    "learning": ["curious", "self-directed", "trend-aware", "continuous-improvement", "experimental"],
}

# 25 Career definitions with traits and descriptions
CAREERS: List[Dict] = [
    # Development (5)
    {
        "id": "frontend-dev",
        "title": "Frontend Developer",
        "description": "Builds the visible parts of websites and apps that users interact with. Works with HTML, CSS, JavaScript, and modern frameworks like React or Vue.",
        "traits": ["creative", "visual", "user-centric", "detail-oriented", "responsive", "aesthetic"],
        "keywords": ["UI", "user interface", "React", "CSS", "design", "visual", "interactive", "responsive"],
    },
    {
        "id": "backend-dev",
        "title": "Backend Developer",
        "description": "Builds server-side logic, databases, and APIs that power applications. Works with languages like Python, Node.js, Java, or Go.",
        "traits": ["logical", "systems-thinking", "performance", "database", "API", "scalable"],
        "keywords": ["server", "API", "database", "logic", "performance", "scalable", "architecture"],
    },
    {
        "id": "fullstack-dev",
        "title": "Full Stack Developer",
        "description": "Versatile developer capable of working on both frontend and backend. Understands the entire application stack.",
        "traits": ["adaptable", "versatile", "learning-agile", "holistic", "flexible", "broad-knowledge"],
        "keywords": ["full stack", "versatile", "both", "end-to-end", "complete", "all-rounder"],
    },
    {
        "id": "mobile-dev",
        "title": "Mobile App Developer",
        "description": "Develops applications for iOS and Android devices. Works with Swift, Kotlin, React Native, or Flutter.",
        "traits": ["mobile-first", "user-centric", "touch-interfaces", "performance", "cross-platform"],
        "keywords": ["mobile", "iOS", "Android", "app", "phone", "tablet", "native", "responsive"],
    },
    {
        "id": "game-dev",
        "title": "Game Developer",
        "description": "Creates video games for computers, consoles, and mobile devices. Combines programming with creative storytelling.",
        "traits": ["creative", "visual", "storytelling", "physics", "interactive", "immersive"],
        "keywords": ["game", "gaming", "Unity", "Unreal", "3D", "graphics", "interactive", "entertainment"],
    },
    
    # Data & AI (4)
    {
        "id": "data-scientist",
        "title": "Data Scientist",
        "description": "Analyzes complex data to extract insights and build predictive models. Uses statistics, machine learning, and visualization.",
        "traits": ["analytical", "mathematical", "pattern-recognition", "investigative", "data-driven"],
        "keywords": ["data", "analysis", "statistics", "machine learning", "patterns", "insights", "prediction"],
    },
    {
        "id": "data-engineer",
        "title": "Data Engineer",
        "description": "Builds and maintains data pipelines and infrastructure. Ensures data is collected, stored, and accessible.",
        "traits": ["systems-thinking", "infrastructure", "pipeline", "scalable", "reliable", "ETL"],
        "keywords": ["pipeline", "ETL", "data warehouse", "infrastructure", "big data", "streaming"],
    },
    {
        "id": "ml-engineer",
        "title": "Machine Learning Engineer",
        "description": "Deploys and scales machine learning models in production. Bridges data science and software engineering.",
        "traits": ["mathematical", "systems-thinking", "optimization", "scalable", "production", "MLOps"],
        "keywords": ["ML", "machine learning", "models", "deployment", "training", "AI", "neural networks"],
    },
    {
        "id": "ai-researcher",
        "title": "AI Researcher",
        "description": "Advances the field of artificial intelligence through research. Publishes papers and develops new algorithms.",
        "traits": ["investigative", "mathematical", "innovative", "experimental", "theoretical", "curious"],
        "keywords": ["research", "AI", "algorithms", "papers", "innovation", "breakthrough", "theory"],
    },
    
    # Infrastructure (4)
    {
        "id": "devops-engineer",
        "title": "DevOps Engineer",
        "description": "Bridges development and operations. Automates deployment, scaling, and infrastructure management.",
        "traits": ["automation", "infrastructure", "CI/CD", "monitoring", "reliable", "efficient"],
        "keywords": ["DevOps", "CI/CD", "deployment", "automation", "infrastructure", "containers", "Kubernetes"],
    },
    {
        "id": "cloud-architect",
        "title": "Cloud Architect",
        "description": "Designs and oversees cloud computing strategy. Works with AWS, Azure, or GCP to build scalable solutions.",
        "traits": ["strategic", "systems-thinking", "scalable", "cost-optimization", "cloud-native"],
        "keywords": ["cloud", "AWS", "Azure", "GCP", "architecture", "scalable", "distributed"],
    },
    {
        "id": "sre",
        "title": "Site Reliability Engineer",
        "description": "Ensures systems are reliable, scalable, and efficient. Focuses on uptime, incident response, and automation.",
        "traits": ["reliable", "monitoring", "incident-response", "automation", "performance", "on-call"],
        "keywords": ["reliability", "uptime", "SLA", "monitoring", "incidents", "on-call", "automation"],
    },
    {
        "id": "dba",
        "title": "Database Administrator",
        "description": "Manages databases to ensure data is stored securely and efficiently. Handles backups, optimization, and access.",
        "traits": ["organized", "reliable", "security", "performance", "backup", "optimization"],
        "keywords": ["database", "SQL", "backup", "optimization", "storage", "queries", "administration"],
    },
    
    # Security (3)
    {
        "id": "security-analyst",
        "title": "Cybersecurity Analyst",
        "description": "Protects systems and networks from cyber threats. Monitors for attacks and responds to incidents.",
        "traits": ["security", "risk-aware", "protective", "monitoring", "incident-response", "defensive"],
        "keywords": ["security", "threats", "protection", "monitoring", "incidents", "defense", "cyber"],
    },
    {
        "id": "pen-tester",
        "title": "Penetration Tester",
        "description": "Ethically hacks systems to find vulnerabilities before malicious actors do. Tests security defenses.",
        "traits": ["security", "vulnerability-focused", "offensive", "creative", "breaking-things", "investigative"],
        "keywords": ["penetration", "hacking", "vulnerabilities", "testing", "offensive", "exploits", "red team"],
    },
    {
        "id": "security-engineer",
        "title": "Security Engineer",
        "description": "Builds secure systems and implements security controls. Develops security tools and policies.",
        "traits": ["security", "systems-thinking", "compliance", "infrastructure", "automation", "defensive"],
        "keywords": ["security", "engineering", "controls", "policies", "encryption", "authentication"],
    },
    
    # Design & Product (3)
    {
        "id": "ux-designer",
        "title": "UX/UI Designer",
        "description": "Designs intuitive and aesthetically pleasing user interfaces. Focuses on user research and experience.",
        "traits": ["creative", "empathy", "visual", "user-centric", "research", "prototyping"],
        "keywords": ["UX", "UI", "design", "user experience", "interface", "Figma", "prototyping", "research"],
    },
    {
        "id": "product-manager",
        "title": "Product Manager",
        "description": "Leads product strategy, defines roadmaps, and prioritizes features. Organizes cross-functional teams including engineering, design, and business stakeholders. Makes data-driven decisions about what to build next.",
        "traits": ["leadership", "strategic", "stakeholder-management", "data-driven", "communication", "organizing", "decision-making", "business-minded", "prioritization", "team-lead"],
        "keywords": ["product", "strategy", "roadmap", "stakeholders", "prioritization", "features", "business", "leadership", "team", "organize", "lead", "cross-functional", "decisions", "revenue", "market fit"],
    },
    {
        "id": "tech-writer",
        "title": "Technical Writer",
        "description": "Creates documentation, guides, and tutorials. Makes complex technical concepts accessible.",
        "traits": ["communication", "explaining", "documentation", "detail-oriented", "clarity", "organized"],
        "keywords": ["documentation", "writing", "guides", "tutorials", "API docs", "technical", "communication"],
    },
    
    # Quality & Testing (2)
    {
        "id": "qa-engineer",
        "title": "QA Engineer",
        "description": "Tests software to ensure quality and find bugs. Creates test plans and performs manual testing.",
        "traits": ["testing", "quality-focused", "detail-oriented", "systematic", "breaking-things", "patient"],
        "keywords": ["QA", "testing", "quality", "bugs", "test cases", "regression", "manual testing"],
    },
    {
        "id": "test-automation",
        "title": "Test Automation Engineer",
        "description": "Automates testing processes with code. Builds test frameworks and CI/CD integrations.",
        "traits": ["testing", "automation", "systematic", "programming", "CI/CD", "frameworks"],
        "keywords": ["automation", "testing", "Selenium", "frameworks", "CI/CD", "scripting", "automated"],
    },
    
    # Architecture (2)
    {
        "id": "solutions-architect",
        "title": "Solutions Architect",
        "description": "Designs complex technical solutions to meet business needs. Bridges technical and business requirements.",
        "traits": ["strategic", "systems-thinking", "communication", "stakeholder-management", "holistic"],
        "keywords": ["architecture", "solutions", "design", "enterprise", "integration", "requirements"],
    },
    {
        "id": "enterprise-architect",
        "title": "Enterprise Architect",
        "description": "Oversees organization-wide technology strategy. Ensures alignment between IT and business goals.",
        "traits": ["strategic", "leadership", "governance", "long-term", "standardization", "holistic"],
        "keywords": ["enterprise", "strategy", "governance", "standards", "organization", "alignment"],
    },
    
    # Emerging (2)
    {
        "id": "blockchain-dev",
        "title": "Blockchain Developer",
        "description": "Builds decentralized applications and smart contracts. Works with Web3, Ethereum, or Solana.",
        "traits": ["innovative", "security", "decentralized", "cryptographic", "emerging-tech"],
        "keywords": ["blockchain", "Web3", "smart contracts", "crypto", "decentralized", "Ethereum", "Solana"],
    },
    {
        "id": "ar-vr-dev",
        "title": "AR/VR Developer",
        "description": "Creates immersive augmented and virtual reality experiences. Combines 3D graphics with spatial computing.",
        "traits": ["creative", "visual", "3D", "immersive", "innovative", "spatial"],
        "keywords": ["AR", "VR", "augmented reality", "virtual reality", "3D", "immersive", "spatial", "metaverse"],
    },
]


def get_career_by_id(career_id: str) -> Dict | None:
    """Get a career by its ID."""
    for career in CAREERS:
        if career["id"] == career_id:
            return career
    return None


def get_all_careers() -> List[Dict]:
    """Get all career definitions."""
    return CAREERS


def get_career_text_for_embedding(career: Dict) -> str:
    """
    Generate a text representation of a career for embedding.
    Combines title, description, traits, and keywords.
    """
    traits_text = ", ".join(career["traits"])
    keywords_text = ", ".join(career["keywords"])
    return f"{career['title']}: {career['description']} Traits: {traits_text}. Keywords: {keywords_text}."
