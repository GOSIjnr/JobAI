"""
Enhanced Matching Engine for JobMatch AI
Fully JSON-driven with advanced features.
"""

from typing import List, Dict, Any

from trait_scorer import (
    calculate_trait_scores,
    match_careers,
    get_trait_profile_summary,
    get_trait_profile_visual,
    get_alternative_paths,
    get_skills_gap,
    get_careers,
    get_categories,
    reload_data
)


class MatchingEngine:
    """
    Production-quality matching engine.
    Features:
    - JSON-driven careers and questions (no code changes needed)
    - Confidence indicators
    - Skills gap analysis
    - Alternative career paths
    - Trait visualization data
    """
    
    def __init__(self):
        # Trigger data loading
        careers = get_careers()
        categories = get_categories()
        print(f"[MatchingEngine] Loaded {len(careers)} careers across {len(categories)} categories")
    
    def recommend(self, answers: List[Dict[str, str]], top_k: int = 3) -> Dict[str, Any]:
        """
        Get career recommendations with full analysis.
        """
        # Step 1: Calculate trait scores
        trait_scores = calculate_trait_scores(answers)
        
        # Log top traits
        sorted_traits = sorted(trait_scores.items(), key=lambda x: x[1], reverse=True)
        top_5 = dict(sorted_traits[:5])
        print(f"[MatchingEngine] Top traits: {top_5}")
        
        # Step 2: Get more matches for alternative paths
        all_matches = match_careers(trait_scores, top_k=10)
        career_matches = all_matches[:top_k]
        
        # Step 3: Build recommendations with rich data
        recommendations = []
        for match in career_matches:
            # Get alternative paths
            alternatives = get_alternative_paths(match["career"], all_matches)
            
            # Get skills gap
            skills_gap = get_skills_gap(match)
            
            recommendations.append({
                "title": match["career"],
                "category": match["category"],
                "category_icon": match.get("category_icon", ""),
                "description": match["description"],
                "match_score": match["normalized_score"],
                "confidence": match["confidence"],
                "reasoning": self._generate_reasoning(match),
                "matched_traits": match["matched_traits"],
                "skills_required": match.get("skills", [])[:5],
                "salary_range": match.get("salary_range", ""),
                "growth_outlook": match.get("growth_outlook", ""),
                "skills_gap": skills_gap,
                "alternative_paths": alternatives
            })
        
        # Step 4: Generate trait profile
        trait_profile = get_trait_profile_visual(trait_scores)
        
        # Step 5: Generate analysis
        analysis = self._generate_analysis(answers, recommendations, trait_scores)
        
        # Count answer distribution
        answer_dist = self._count_answers(answers)
        
        # Step 6: Detect low engagement (80%+ negative answers)
        negative_count = answer_dist.get("Disagree", 0) + answer_dist.get("Strongly Disagree", 0)
        total_answers = len(answers)
        low_engagement = (negative_count / total_answers) >= 0.8 if total_answers > 0 else False
        
        # Generate special message for low engagement
        if low_engagement:
            analysis = (
                "Your responses suggest that traditional career assessment questions "
                "might not capture your unique strengths and interests. This is completely normal — "
                "it could mean you're exploring paths outside typical categories, going through a "
                "transition period, or that our questions simply didn't resonate with you. "
                "Consider retaking the assessment with fresh perspective, or explore careers "
                "that we haven't covered yet."
            )
        
        return {
            "recommendations": recommendations,
            "analysis": analysis,
            "trait_profile": trait_profile,
            "answer_distribution": answer_dist,
            "total_questions": len(answers),
            "low_engagement": low_engagement,
            "engagement_message": "These results should be taken with caution as most responses were negative." if low_engagement else None
        }
    
    def _generate_reasoning(self, match: Dict) -> str:
        """Generate reasoning based on matched traits and confidence."""
        traits = match.get("matched_traits", [])
        confidence = match.get("confidence", "medium")
        career = match["career"]
        
        if not traits:
            return f"Your profile shows general compatibility with {career}."
        
        trait_list = ", ".join(traits[:4])
        
        if confidence == "high":
            return (
                f"Strong match! Your {trait_list} traits directly align with "
                f"the core requirements for {career}."
            )
        elif confidence == "medium":
            return (
                f"Good match. You demonstrate {trait_list} tendencies that are "
                f"valuable for {career}."
            )
        else:
            return (
                f"Potential match. While you show some {trait_list} traits, "
                f"developing additional skills would strengthen your fit for {career}."
            )
    
    def _generate_analysis(self, answers: List[Dict], recommendations: List[Dict], trait_scores: Dict[str, float]) -> str:
        """Generate professional analysis."""
        if not recommendations:
            return "Unable to generate analysis. Please complete more questions."
        
        top = recommendations[0]
        trait_summary = get_trait_profile_summary(trait_scores)
        
        positive = sum(1 for a in answers if a.get("answer") in ["Agree", "Strongly Agree"])
        negative = sum(1 for a in answers if a.get("answer") in ["Disagree", "Strongly Disagree"])
        
        confidence_text = {
            "high": "very confident",
            "medium": "fairly confident",
            "low": "tentative"
        }
        
        return (
            f"Based on {len(answers)} responses ({positive} positive, {negative} negative), "
            f"we are {confidence_text.get(top['confidence'], 'fairly confident')} that "
            f"{top['title']} is your best match. "
            f"Your strongest traits are: {trait_summary}. "
            f"{'Consider the alternative paths suggested if you want to explore different industries.' if top.get('alternative_paths') else ''}"
        )
    
    def _count_answers(self, answers: List[Dict]) -> Dict[str, int]:
        """Count distribution of answers."""
        counts = {
            "Strongly Agree": 0,
            "Agree": 0,
            "Neutral": 0,
            "Disagree": 0,
            "Strongly Disagree": 0
        }
        for a in answers:
            answer = a.get("answer", "Neutral")
            if answer in counts:
                counts[answer] += 1
        return counts
    
    def reload(self):
        """Reload data from JSON files."""
        reload_data()
        careers = get_careers()
        categories = get_categories()
        print(f"[MatchingEngine] Reloaded {len(careers)} careers")


# Singleton instance
_engine: MatchingEngine = None


def get_engine() -> MatchingEngine:
    """Get or create the matching engine singleton."""
    global _engine
    if _engine is None:
        _engine = MatchingEngine()
    return _engine
