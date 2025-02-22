from pydantic import BaseModel

class Document(BaseModel):
    filename: str
    text: str
