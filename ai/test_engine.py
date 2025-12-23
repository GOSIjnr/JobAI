"""
Test script for the custom AI engine.
Run with: python test_engine.py
"""

import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_imports():
    """Test that all modules import correctly."""
    print("Testing imports...")
    
    try:
        from knowledge_base import CAREERS, get_career_text_for_embedding
        print(f"  ✓ knowledge_base loaded ({len(CAREERS)} careers)")
    except Exception as e:
        print(f"  ✗ knowledge_base failed: {e}")
        return False
    
    try:
        from embeddings import embed_text, cosine_similarity
        print("  ✓ embeddings loaded")
    except Exception as e:
        print(f"  ✗ embeddings failed: {e}")
        return False
    
    try:
        from matching_engine import MatchingEngine
        print("  ✓ matching_engine loaded")
    except Exception as e:
        print(f"  ✗ matching_engine failed: {e}")
        return False
    
    return True


def test_embedding():
    """Test that embeddings work."""
    print("\nTesting embeddings...")
    
    from embeddings import embed_text
    
    text = "I enjoy building user interfaces and visual designs"
    embedding = embed_text(text)
    
    print(f"  ✓ Embedded text to vector of shape {embedding.shape}")
    return True


def test_matching():
    """Test the full matching pipeline."""
    print("\nTesting matching engine...")
    
    from matching_engine import get_engine
    
    engine = get_engine()
    
    # Sample answers (creative/frontend focused)
    sample_answers = [
        {"question": "I am drawn to visual aesthetics", "answer": "Strongly Agree"},
        {"question": "I prefer tangible results I can see", "answer": "Strongly Agree"},
        {"question": "I enjoy spotting patterns in data", "answer": "Disagree"},
        {"question": "I care about security vulnerabilities", "answer": "Neutral"},
    ]
    
    result = engine.recommend(sample_answers, top_k=3)
    
    print(f"  ✓ Got {len(result['recommendations'])} recommendations:")
    for rec in result['recommendations']:
        print(f"    - {rec['title']} ({rec['match_score']}%)")
    
    return True


if __name__ == "__main__":
    print("=" * 50)
    print("JobMatch AI Engine Test Suite")
    print("=" * 50)
    
    if not test_imports():
        print("\n❌ Import tests failed!")
        sys.exit(1)
    
    if not test_embedding():
        print("\n❌ Embedding tests failed!")
        sys.exit(1)
    
    if not test_matching():
        print("\n❌ Matching tests failed!")
        sys.exit(1)
    
    print("\n" + "=" * 50)
    print("✅ All tests passed!")
    print("=" * 50)
