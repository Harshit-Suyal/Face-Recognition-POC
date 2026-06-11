import numpy as np


def cosine_similarity(v1, v2):
    """
    Calculate the cosine similarity between
    two face embeddings.

    The result is a value between -1 and 1:

    1.0  -> identical embeddings
    0.0  -> no similarity
    -1.0 -> opposite direction

    For face recognition, values closer to 1
    indicate a stronger match.
    """

    # Convert incoming lists into NumPy arrays
    v1 = np.array(v1)
    v2 = np.array(v2)

    # Apply cosine similarity formula
    return float(
        np.dot(v1, v2)
        /
        (
            np.linalg.norm(v1)
            * np.linalg.norm(v2)
        )
    )