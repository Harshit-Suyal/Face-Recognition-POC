import cv2
import numpy as np

from core.face_model import face_app


def generate_embedding(image_bytes):
    """
    Convert image bytes into a face embedding.

    Steps:
    1. Decode uploaded image
    2. Detect face
    3. Generate embedding
    4. Return embedding vector
    """

    np_arr = np.frombuffer(
        image_bytes,
        np.uint8
    )

    img = cv2.imdecode(
        np_arr,
        cv2.IMREAD_COLOR
    )

    faces = face_app.get(img)

    if len(faces) == 0:
        return None

    return (
        faces[0]
        .embedding
        .tolist()
    )