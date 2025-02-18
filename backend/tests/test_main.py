import pytest
from fastapi.testclient import TestClient
from fastapi import status
from app.main import app
from app.ai_integration import process_text_question

client = TestClient(app)

@pytest.fixture
def mock_process_text_question(mocker):
    mock = mocker.patch("app.main.process_text_question")
    mock.return_value = "Mocked response"
    return mock


def test_read_root():
    response = client.get("/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"content": "Hello World"}


def test_read_data():
    response = client.get("/data")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"content": "Hello from the other Side"}


def test_post_text(mock_process_text_question):
    # Define the payload for the request
    payload = {"question_type": 1, "question": "What is Quicksort?"}

    # Call the POST request
    response = client.post("/text", json=payload)

    # Ensure the mock was used and the response is as expected
    mock_process_text_question.assert_called_once_with(1, "What is Quicksort?")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"content": "Mocked response"}


def test_post_code(mock_process_text_question):
    # Define the payload for the request
    payload = {"question_type": 2, "code": "def quicksort(arr): pass"}

    # Call the POST request
    response = client.post("/code", json=payload)

    # Ensure the mock was used and the response is as expected
    mock_process_text_question.assert_called_once_with(
        2, "def quicksort(arr): pass")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"content": "Mocked response"}


def test_post_code_question(mock_process_text_question):
    # Define the payload for the request
    payload = {"question_type": 3,
               "code": "def binary_search(arr, target): pass"}

    # Call the POST request
    response = client.post("/code-question", json=payload)

    # Ensure the mock was used and the response is as expected
    mock_process_text_question.assert_called_once_with(
        3, "def binary_search(arr, target): pass")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"content": "Mocked response"}
