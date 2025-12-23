"""
Enhanced Trait Scorer for JobMatch AI
Loads data from JSON files - no code changes needed to add careers/questions.
Includes: confidence indicators, skills gap, alternative paths, negative penalties.
"""

import json
import os
from typing import List, Dict, Any, Tuple
from pathlib import Path


# Load data from JSON files
DATA_DIR = Path(__file__).parent / "data"


def _load_json(filename: str) -> Dict:
    """Load JSON file from data directory."""
    filepath = DATA_DIR / filename
    if not filepath.exists():
        raise FileNotFoundError(f"Data file not found: {filepath}")
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def load_careers() -> Tuple[Dict, List[Dict]]:
    """Load careers and categories from JSON."""
    data = _load_json("careers.json")
    categories = {c["id"]: c for c in data.get("categories", [])}
    careers = data.get("careers", [])
    return categories, careers


def load_questions() -> Tuple[Dict, List[Dict]]:
    """Load questions and answer weights from JSON."""
    data = _load_json("questions.json")
    answer_weights = data.get("answerWeights", {})
    questions = data.get("questions", [])
    return answer_weights, questions


# Cache loaded data
_categories, _careers = None, None
_answer_weights, _questions = None, None


def get_careers() -> List[Dict]:
    """Get careers (cached)."""
    global _categories, _careers
    if _careers is None:
        _categories, _careers = load_careers()
    return _careers


def get_categories() -> Dict:
    """Get categories (cached)."""
    global _categories, _careers
    if _categories is None:
        _categories, _careers = load_careers()
    return _categories


def get_questions() -> List[Dict]:
    """Get questions (cached)."""
    global _answer_weights, _questions
    if _questions is None:
        _answer_weights, _questions = load_questions()
    return _questions


def get_answer_weights() -> Dict:
    """Get answer weights (cached)."""
    global _answer_weights, _questions
    if _answer_weights is None:
        _answer_weights, _questions = load_questions()
    return _answer_weights


def calculate_trait_scores(answers: List[Dict[str, str]]) -> Dict[str, float]:
    """
    Calculate trait scores from user answers.
    Uses exact matching against questions.json.
    """
    questions = get_questions()
    answer_weights = get_answer_weights()
    
    # Build question lookup by text
    question_map = {q["text"]: q for q in questions}
    
    trait_scores: Dict[str, float] = {}
    matched_count = 0
    
    for qa in answers:
        question_text = qa.get("question", "").strip()
        answer = qa.get("answer", "Neutral")
        
        # Get answer multiplier
        multiplier = answer_weights.get(answer, 0.0)
        
        # Find matching question
        if question_text in question_map:
            matched_count += 1
            q_data = question_map[question_text]
            q_weight = q_data.get("weight", 1.0)
            traits = q_data.get("traits", {})
            
            for trait, trait_weight in traits.items():
                if trait not in trait_scores:
                    trait_scores[trait] = 0.0
                trait_scores[trait] += trait_weight * multiplier * q_weight
    
    print(f"[TraitScorer] Matched {matched_count}/{len(answers)} questions")
    return trait_scores


def match_careers(trait_scores: Dict[str, float], top_k: int = 3) -> List[Dict]:
    """
    Match user trait profile against career requirements.
    Includes confidence indicators and alternative paths.
    """
    careers = get_careers()
    categories = get_categories()
    results = []
    
    for career in careers:
        career_traits = career.get("traits", {})
        
        # Calculate match score
        score = 0.0
        max_possible = 0.0
        matched_traits = []
        missing_traits = []
        
        for trait, importance in career_traits.items():
            max_possible += importance
            user_score = trait_scores.get(trait, 0.0)
            
            if user_score > 0:
                score += min(user_score, importance)
                matched_traits.append(trait)
            elif user_score < 0:
                # Negative penalty for mismatched traits
                score += user_score * 0.3
            else:
                missing_traits.append(trait)
        
        # Calculate trait coverage (how many career traits the user has)
        trait_coverage = len(matched_traits) / len(career_traits) if career_traits else 0
        
        # Calculate confidence level
        if trait_coverage >= 0.7 and score > max_possible * 0.5:
            confidence = "high"
        elif trait_coverage >= 0.4 or score > 0:
            confidence = "medium"
        else:
            confidence = "low"
        
        # Get category info
        cat_id = career.get("category", "")
        category_info = categories.get(cat_id, {})
        
        results.append({
            "career": career["title"],
            "career_id": career["id"],
            "category": category_info.get("name", ""),
            "category_icon": category_info.get("icon", ""),
            "description": career.get("description", ""),
            "raw_score": score,
            "max_possible": max_possible,
            "matched_traits": matched_traits,
            "missing_traits": missing_traits[:3],  # Top 3 skills to develop
            "trait_coverage": trait_coverage,
            "confidence": confidence,
            "skills": career.get("skills", []),
            "salary_range": career.get("salary_range", ""),
            "growth_outlook": career.get("growth_outlook", "")
        })
    
    # Sort by raw score
    results.sort(key=lambda x: (x["raw_score"], x["trait_coverage"]), reverse=True)
    
    # Normalize scores relative to top match
    if results:
        top_score = results[0]["raw_score"]
        
        if top_score > 0:
            # Normal case: positive scores exist
            for r in results:
                relative = r["raw_score"] / top_score if top_score > 0 else 0
                r["normalized_score"] = int(55 + (relative * 37))  # 55-92 range
        elif top_score == 0:
            # All neutral - no strong preferences
            for i, r in enumerate(results):
                r["normalized_score"] = 50  # Everyone gets baseline
                r["confidence"] = "low"
        else:
            # All negative scores - user disagrees with everything
            # Sort by LEAST negative (closest to 0) - these are "least bad" matches
            results.sort(key=lambda x: x["raw_score"], reverse=True)  # -1 > -5
            
            # Give very low scores to indicate poor confidence
            for i, r in enumerate(results):
                # Scale from 30-45, showing these are weak matches
                r["normalized_score"] = max(25, 45 - (i * 3))
                r["confidence"] = "low"
    
    return results[:top_k]


def get_alternative_paths(primary_career: str, all_results: List[Dict]) -> List[Dict]:
    """
    Suggest alternative career paths based on shared traits.
    """
    # Find careers in different categories with overlapping traits
    categories = get_categories()
    primary = next((r for r in all_results if r["career"] == primary_career), None)
    
    if not primary:
        return []
    
    primary_category = primary.get("category", "")
    alternatives = []
    
    for result in all_results[1:10]:  # Check top 10
        if result["category"] != primary_category:
            shared_traits = set(primary["matched_traits"]) & set(result["matched_traits"])
            if len(shared_traits) >= 2:
                alternatives.append({
                    "career": result["career"],
                    "category": result["category"],
                    "match_score": result["normalized_score"],
                    "shared_traits": list(shared_traits)[:3]
                })
    
    return alternatives[:3]


def get_skills_gap(matched_career: Dict) -> List[Dict]:
    """
    Analyze skills gap and suggest learning paths.
    """
    missing = matched_career.get("missing_traits", [])
    skills = matched_career.get("skills", [])
    
    # Map traits to recommended skills/courses
    trait_to_learning = {
        "technical": {"skill": "Programming", "course": "CS50 or freeCodeCamp"},
        "analytical": {"skill": "Data Analysis", "course": "Google Data Analytics Certificate"},
        "leadership": {"skill": "Leadership", "course": "Management courses on Coursera"},
        "security": {"skill": "Cybersecurity", "course": "CompTIA Security+"},
        "creative": {"skill": "Design Thinking", "course": "Google UX Design Certificate"},
        "database": {"skill": "SQL & Databases", "course": "SQL courses on Khan Academy"},
        "automation": {"skill": "Automation/DevOps", "course": "AWS/Azure certifications"},
        "communication": {"skill": "Communication", "course": "Business writing courses"},
    }
    
    gaps = []
    for trait in missing[:3]:
        if trait in trait_to_learning:
            gaps.append({
                "trait": trait,
                "skill": trait_to_learning[trait]["skill"],
                "suggested_course": trait_to_learning[trait]["course"]
            })
        else:
            gaps.append({
                "trait": trait,
                "skill": trait.replace("-", " ").title(),
                "suggested_course": f"Search for {trait} courses online"
            })
    
    return gaps


def get_trait_profile_summary(trait_scores: Dict[str, float]) -> str:
    """Get top positive traits as a summary."""
    positive = [(t, s) for t, s in trait_scores.items() if s > 0]
    positive.sort(key=lambda x: x[1], reverse=True)
    top = [t[0] for t in positive[:5]]
    return ", ".join(top) if top else "balanced profile"


def get_trait_profile_visual(trait_scores: Dict[str, float]) -> List[Dict]:
    """Get trait scores formatted for visualization."""
    sorted_traits = sorted(trait_scores.items(), key=lambda x: x[1], reverse=True)
    
    # Normalize to 0-100 for visualization
    max_score = max(abs(s) for _, s in sorted_traits) if sorted_traits else 1
    
    return [
        {
            "trait": trait,
            "score": score,
            "normalized": int((score / max_score + 1) * 50) if max_score > 0 else 50,
            "level": "high" if score > 2 else ("medium" if score > 0 else "low")
        }
        for trait, score in sorted_traits[:10]
    ]


def reload_data():
    """Force reload data from JSON files (useful after edits)."""
    global _categories, _careers, _answer_weights, _questions
    _categories, _careers = None, None
    _answer_weights, _questions = None, None
    print("[TraitScorer] Data cache cleared - will reload on next access")
