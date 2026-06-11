from insightface.app import FaceAnalysis

# Load the InsightFace model once when the application starts.
# Reusing the same model instance improves performance and
# avoids unnecessary memory consumption.
face_app = FaceAnalysis(name="buffalo_l")

face_app.prepare(
    ctx_id=0,
    det_size=(640, 640)
)