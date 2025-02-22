import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI, OpenAIError
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

class Question(BaseModel):
    document_text: str
    question: str

# Ensure the OpenRouter API key is set
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY") 


if not OPENROUTER_API_KEY:
    raise OpenAIError("OpenRouter API key must be set")

# Initialize OpenAI client for OpenRouter
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
)

@router.post("/")
async def ask_question(question: Question):
    # Prepare the payload for the DeepSeek-R1 model via OpenRouter
    messages = [
        {
            "role": "user",
            "content": f"Document: {question.document_text}\nQuestion: {question.question}\nAnswer: "
        }
    ]
    headers = {
        "HTTP-Referer": os.getenv("YOUR_SITE_URL", ""),  # Optional
        "X-Title": os.getenv("YOUR_SITE_NAME", ""),  # Optional
    }

    try:
        # Make a POST request to the OpenRouter API
        completion = client.chat.completions.create(
            extra_headers=headers,
            extra_body={},
            model="deepseek/deepseek-r1-distill-llama-8b",
            messages=messages
        )
        answer = completion.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error communicating with OpenRouter API: {e}")

    if not answer:
        raise HTTPException(status_code=404, detail="Answer not found")

    return {"answer": answer}
