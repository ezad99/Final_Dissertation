# GuruJava

**GuruJava** is an educational AI-powered application designed to assist students in learning programming concepts through structured interactions. Unlike general-purpose language models, GuruJava integrates pedagogical guardrails to ensure that students develop understanding rather than relying solely on direct answers.

The system leverages a modular full-stack architecture using **React (Vite)** on the frontend and **FastAPI** on the backend. It integrates with the **OpenAI API** to deliver educationally tailored responses based on the specific nature of user queries.

## Repository Layout

GuruJava follows a clear separation of concerns between its frontend and backend:

```
Final_Dissertation/
├── backend/                  # FastAPI backend
│   ├── app/
│   ├── main.py
│   └── ...
│
├── frontend/                 # Vite + React frontend
│   ├── src/
│   ├── index.html
│   └── ...
│
├── docker-compose.yml        # Container orchestration
└── README.md
```

- **Frontend**: Developed with React and TypeScript via Vite for a fast and responsive user interface.
- **Backend**: Built with FastAPI to handle API logic, prompt customization, and communication with the OpenAI API.

## Question Types

The application supports four distinct question modes:

1. **How to Write Code**
2. **General Question**
3. **How to Fix Code**
4. **Question from Code**

Each mode is designed to provide context-sensitive guidance. This structure helps reinforce correct practices and deepens understanding through focused interaction.

## User Interface

The user interface prioritizes simplicity and accessibility:

- Clean, single-page layout
- Familiar input structure modeled after conversational agents
- Integrated code editor with syntax highlighting
- Output window for AI responses
- Code and response history tracking

This ensures users can focus on learning objectives without distraction.

## Running the Application (via Docker)

### 1. Clone the Repository

```bash
git clone https://github.com/ezad99/Final_Dissertation
cd Final_Dissertation
```

### 2. Set Up Environment Variables

Create a .env file in the backend/ directory:

```
OPENAI_API_KEY=your-openai-api-key
```

### 3. Build and Start the Application

```bash
docker-compose up --build
```

Frontend: http://localhost:5173

Backend: http://localhost:8000

## Local Development (Without Docker)

### Backend (FastAPI)

```
cd backend
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend (Vite + React)

```
cd frontend
npm install
npm run dev
```
---

License
This project is licensed under the MIT License. See the LICENSE file for more details.
