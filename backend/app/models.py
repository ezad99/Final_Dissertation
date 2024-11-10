from pydantic import BaseModel
from fastapi import Body

class TextRequest(BaseModel):
    question_type: int
    question: str