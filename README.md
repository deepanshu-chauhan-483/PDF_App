# FastAPI PDF Q&A API

## Overview
This project is a FastAPI-based service that allows users to upload PDF documents and ask questions based on their content. It extracts text from PDFs using PyMuPDF and integrates with OpenRouter's AI models for question-answering. A React frontend is provided for an interactive user experience.

## Features
- Upload and process PDF files.
- Extract text from uploaded PDFs.
- Utilize OpenRouter's AI for answering questions based on document content.
- Interactive frontend built with React and Tailwind CSS.
- Organized API with FastAPI routers.

## Technologies Used
### Backend:
- Python
- FastAPI
- OpenAI API (via OpenRouter)
- PyMuPDF (fitz) for PDF processing
- LangChain & LangChain-Community
- ChromaDB
- Dotenv for environment management

### Frontend:
- React.js
- Tailwind CSS
- React Icons
- React Markdown

## Installation & Setup
### Prerequisites
- Python 3.8+
- Node.js and npm
- OpenRouter API key
- FastAPI framework
- Uvicorn for running the server

### Backend Installation Steps
1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd <repository_directory>
   ```
2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     OPENROUTER_API_KEY=<your_openrouter_api_key>
     YOUR_SITE_URL=<your_site_url>
     YOUR_SITE_NAME=<your_site_name>
     ```

### Frontend Installation Steps
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Usage
### Running the Backend Server
Start the FastAPI application with Uvicorn:
```sh
uvicorn main:app --reload
```

### Running the Frontend
```sh
npm run dev
```

### API Endpoints
#### `POST /upload/`
**Description:** Uploads a PDF file and extracts its text.
**Request:** Multipart Form Data with a PDF file.
**Response:**
```json
{
  "filename": "example.pdf",
  "text": "Extracted text from PDF..."
}
```

#### `POST /question/`
**Description:** Submits a question about an uploaded document.
**Request Body:**
```json
{
  "document_text": "Extracted text from PDF...",
  "question": "What is the main topic?"
}
```
**Response:**
```json
{
  "answer": "The document discusses..."
}
```

## Application Flow
1. **User Uploads PDF:**
   - The frontend allows users to select and upload a PDF file.
   - The file is sent to the backend via the `/upload/` endpoint.
   - The backend extracts text using PyMuPDF and returns it to the frontend.

2. **User Asks a Question:**
   - The frontend provides an input box for the user to enter a question.
   - The extracted text along with the question is sent to the `/question/` endpoint.
   - The backend sends the question to OpenRouter's AI model for processing.
   - The AI model returns a response, which is displayed on the frontend.

3. **Displaying Responses:**
   - The frontend updates the chat interface with both the user's question and the AI-generated response.
   - Markdown formatting is applied for better readability.

4. **Error Handling:**
   - If the upload fails, an error message is displayed.
   - If the AI fails to generate an answer, an appropriate error response is shown.

## Frontend Components
### File Upload Component
- Allows users to upload PDF files.
- Extracts and displays the filename.
- Sends the file to the backend for text extraction.

### Question Form Component
- Accepts user questions related to the uploaded document.
- Sends the question to the backend for processing.
- Displays AI-generated responses in a chat-like format.

### App Structure
- `FileUpload.js`: Handles PDF file selection and upload.
- `QuestionForm.js`: Manages the question submission and response display.
- `App.js`: Integrates both components for a seamless user experience.

## Error Handling
- Returns `500 Internal Server Error` if there is an issue communicating with OpenRouter.
- Returns `404 Not Found` if no answer is found.
- Displays user-friendly error messages on the frontend.

## Demo Video
You can watch the demo video here:
https://drive.google.com/file/d/1_prxz1AYiS5h-CUEdYV2U3Jvl8wgUOtH/view?usp=sharing


## Contributing
Feel free to fork this repository and submit pull requests with improvements.

## License
This project is licensed under the MIT License.


## Creator
Deepanshu Chauhan deepanshuchauhan483@gmail.com

