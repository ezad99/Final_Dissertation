import os
from dotenv import load_dotenv
from .constants import QUESTION_CONSTANTS
import openai
import asyncio

load_dotenv()

api_key = os.getenv('OPENAI_API_KEY')

if not api_key:
    raise ValueError(
        "OpenAI API key not found. Ensure it is set correctly in .env file")

openai.api_key = api_key


def process_text_question(question_type: int, question: str) -> str:
    question_type = QUESTION_CONSTANTS.get(question_type)

    completion = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": question_type,
            },
            {
                "role": "user",
                "content": question,
            }
        ],
        temperature=0.2,
        max_tokens=800,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        response_format={
            "type": "text"
        }
    )

    print(completion.choices[0].message)
    response_text = completion.choices[0].message
    return response_text


async def warm_up_openai():
    """Send a small request to OpenAI to prevent cold starts."""
    try:
        print("Warming up OpenAI API...")
        await process_text_question(1, "Warm-up request")
        print("OpenAI API warmed up successfully!")
    except Exception as e:
        print(f"OpenAI warm-up failed: {e}")


def main():
    process_text_question(1, "How to create a quicksort algorithm")

if __name__ == "__main__":
    main()
