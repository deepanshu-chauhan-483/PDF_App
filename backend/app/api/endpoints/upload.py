import os
from fastapi import APIRouter, File, UploadFile
import fitz  # PyMuPDF

router = APIRouter()

# Define the directory to save uploaded files
UPLOAD_DIR = "files"

# Create the directory if it doesn't exist
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@router.post("/")
async def upload_pdf(file: UploadFile = File(...)):
    file_location = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_location, "wb") as f:
        f.write(file.file.read())

    # Extract text
    document = fitz.open(file_location)
    text = ""
    for page in document:
        text += page.get_text()

    return {"filename": file.filename, "text": text}
