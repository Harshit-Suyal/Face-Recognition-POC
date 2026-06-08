from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File
import cv2
import numpy as np
from insightface.app import FaceAnalysis
from similarity import cosine_similarity

app = FastAPI()
face_app = FaceAnalysis(name="buffalo_l")

face_app.prepare(
    ctx_id=0,
    det_size=(640,640)
)

@app.post("/embedding")
async def embedding(
        file: UploadFile = File(...)
):

    image_bytes = await file.read()

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
        return {
            "success": False,
            "message": "No Face Detected"
        }

    embedding = (
        faces[0]
        .embedding
        .tolist()
    )

    return {
    "success": True,
    "embedding": embedding
}

@app.post("/compare")
async def compare(
    payload: dict
):

    score = cosine_similarity(
        payload["embedding1"],
        payload["embedding2"]
    )

    return {
    "success": True,
    "score": score
}