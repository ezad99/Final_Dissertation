import os
from dotenv import load_dotenv
from .constants import QUESTION_CONSTANTS
import openai

# Load environment variables from .env file
load_dotenv()

api_key = os.getenv('OPENAI_API_KEY')

# Ensure the API key is available
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
  return completion.choices[0].message

def main():
    # Call your main logic here
    process_text_question(1,"How to create a quicksort algorithm")

if __name__ == "__main__":
    main()