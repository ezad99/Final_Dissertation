from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
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
async def get_text(question_type: int, question: str):
    response = process_text_question(question_type, question)
    return {"content": response}
