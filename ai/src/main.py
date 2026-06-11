from fastapi import FastAPI

from api.routes import router

app = FastAPI()

# Register all API endpoints
app.include_router(router)