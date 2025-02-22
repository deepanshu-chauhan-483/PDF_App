import os
from dotenv import load_dotenv
from fastapi import FastAPI
from app.api.endpoints import upload, question

load_dotenv()  # Load environment variables from .env file

app = FastAPI()

app.include_router(upload.router, prefix="/upload", tags=["upload"])
app.include_router(question.router, prefix="/question", tags=["question"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the PDF Q&A API!"}
