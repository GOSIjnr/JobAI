"""
Embeddings module for JobMatch AI Engine
Uses sentence-transformers to convert text to vectors.
"""

from sentence_transformers import SentenceTransformer
from typing import List, Union
import numpy as np

# Global model instance (loaded once)
_model: SentenceTransformer = None


def get_model() -> SentenceTransformer:
    """
    Load the sentence transformer model (lazy loading).
    Uses all-MiniLM-L6-v2 which is fast and accurate.
    ~90MB download on first run.
    """
    global _model
    if _model is None:
        print("[Embeddings] Loading sentence transformer model...")
        _model = SentenceTransformer('all-MiniLM-L6-v2')
        print("[Embeddings] Model loaded successfully!")
    return _model


def embed_text(text: str) -> np.ndarray:
    """
    Convert a single text string to a 384-dimensional vector.
    
    Args:
        text: The text to embed
        
    Returns:
        numpy array of shape (384,)
    """
    model = get_model()
    embedding = model.encode(text, convert_to_numpy=True)
    return embedding


def embed_texts(texts: List[str]) -> np.ndarray:
    """
    Convert multiple texts to vectors in batch (more efficient).
    
    Args:
        texts: List of text strings to embed
        
    Returns:
        numpy array of shape (len(texts), 384)
    """
    model = get_model()
    embeddings = model.encode(texts, convert_to_numpy=True, show_progress_bar=False)
    return embeddings


def cosine_similarity(vec1: np.ndarray, vec2: np.ndarray) -> float:
    """
    Calculate cosine similarity between two vectors.
    
    Returns:
        Float between -1 and 1 (1 = identical, 0 = orthogonal, -1 = opposite)
    """
    dot_product = np.dot(vec1, vec2)
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)
    
    if norm1 == 0 or norm2 == 0:
        return 0.0
    
    return dot_product / (norm1 * norm2)


def cosine_similarity_batch(query_vec: np.ndarray, candidate_vecs: np.ndarray) -> np.ndarray:
    """
    Calculate cosine similarity between a query vector and multiple candidates.
    
    Args:
        query_vec: Single query vector of shape (384,)
        candidate_vecs: Matrix of candidate vectors of shape (n, 384)
        
    Returns:
        Array of similarity scores of shape (n,)
    """
    # Normalize vectors
    query_norm = query_vec / (np.linalg.norm(query_vec) + 1e-10)
    candidate_norms = candidate_vecs / (np.linalg.norm(candidate_vecs, axis=1, keepdims=True) + 1e-10)
    
    # Dot product gives cosine similarity for normalized vectors
    similarities = np.dot(candidate_norms, query_norm)
    return similarities
