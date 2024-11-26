from pydantic import BaseModel
from fastapi import Body

class TextRequest(BaseModel):
    question_type: int
    question: str
    
class CodeRequest(BaseModel):
    question_type: int
    code: str