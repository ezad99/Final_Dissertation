from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware

from .models import TextRequest, CodeRequest
from .ai_integration import *

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"content": "Hello World"}


@app.get("/data")
def read_data():
    return {"content": "Hello from the other Side"}


@app.post("/text")
async def post_text(payload: TextRequest):
    response = process_text_question(payload.question_type, payload.question)
    return {"content": response}


@app.post("/code")
async def post_code(payload: CodeRequest):
    response = process_text_question(payload.question_type, payload.code)
    return {"content": response}

@app.post("/code-question")
async def post_code_question(payload: CodeRequest):
    response = process_text_question(payload.question_type, payload.code)
    return {"content": response}
