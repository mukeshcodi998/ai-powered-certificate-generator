# AI-Powered Certificate Generator 🎓✨

A full-stack web application using React and Flask to automatically generate personalized certificate messages using OpenAI/Gemini. Export certificates as PDF, include logos, and generate QR codes for verification.

## Features
- AI-generated personalized messages
- Real-time certificate preview
- Logo upload & QR code verification
- PDF export with jsPDF
- Flask backend with OpenAI integration

## Tech Stack
- Frontend: React + Vite + TypeScript
- Backend: Python (Flask)
- AI: OpenAI API / Gemini
- Extras: QR code, SendGrid (optional), jsPDF

## Run Locally
1. Clone repo
2. Run backend:
    ```
    cd backend
    python -m venv venv
    venv\Scripts\activate
    pip install -r requirements.txt
    python app.py
    ```
3. Run frontend:
    ```
    cd frontend
    npm install
    npm run dev
    ```

## License
[MIT](LICENSE)
