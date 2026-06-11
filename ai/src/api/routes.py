from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

from services.embedding_service import (
    generate_embedding
)

from services.similarity_service import (
    cosine_similarity
)

router = APIRouter()


@router.post("/embedding")
async def embedding(
        file: UploadFile = File(...)
):

    image_bytes = await file.read()

    embedding = generate_embedding(
        image_bytes
    )

    if embedding is None:
        return {
            "success": False,
            "message": "No Face Detected"
        }

    return {
        "success": True,
        "embedding": embedding
    }


@router.post("/compare")
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