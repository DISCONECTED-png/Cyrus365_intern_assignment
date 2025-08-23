# 📝 AI Exam Paper Generator

A simple **full-stack web application** for primary school math teachers.  
Teachers can enter a math topic and number of questions, and the app will generate an exam paper using **Google Gemini API**.

---

## ✨ Features
- 🎯 Generate math exam questions based on topic & count.
- 📋 Optionally include an **Answer Key**.
- 🌗 Built-in **Dark Mode** (default) + Light Mode toggle.
- 📑 Copy generated exam to clipboard with **toast notification**.
- 🔒 Backend-secured API key (never exposed to frontend).
- 🖥️ Responsive, clean UI with smooth animations.

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express
- **AI Integration:** Google Gemini API (`@google/generative-ai`)

---

## 📂 Project Structure
\`\`\`
.
├── backend/
│   ├── server.js       # Express server with Gemini integration
│   ├── package.json
│   └── .env            # Contains GEMINI_API_KEY, CORS_ORIGIN
│
├── frontend/
│   ├── src/
│   │   └── App.jsx     # React UI
│   ├── package.json
│   └── vite.config.js
│
└── README.md
\`\`\`

---

## ⚡ Setup Instructions

### 1️⃣ Clone Repository
\`\`\`bash
git clone https://github.com/your-username/ai-exam-paper-generator.git
cd ai-exam-paper-generator
\`\`\`

### 2️⃣ Backend Setup
\`\`\`bash
cd backend
npm install
\`\`\`

Create a \`.env\` file in \`/backend\` with:
\`\`\`env
PORT=5000
GEMINI_API_KEY=your_google_api_key
CORS_ORIGIN=http://localhost:5173,https://your-frontend-domain.vercel.app
\`\`\`

Run backend locally:
\`\`\`bash
npm start
\`\`\`

---

### 3️⃣ Frontend Setup
\`\`\`bash
cd frontend
npm install
\`\`\`

Create a \`.env\` file in \`/frontend\` with:
\`\`\`env
VITE_API_BASE_URL=http://localhost:5000
\`\`\`

Run frontend locally:
\`\`\`bash
npm run dev
\`\`\`

---

## 🌍 Deployment

### Backend (Vercel/Render)
- Deploy the \`backend\` folder.
- Add environment variables in host dashboard:
  - \`GEMINI_API_KEY\`
  - \`CORS_ORIGIN=https://your-frontend-domain.vercel.app\`

### Frontend (Vercel/Netlify)
- Deploy the \`frontend\` folder.
- Add env var:
  - \`VITE_API_BASE_URL=https://your-backend-domain.vercel.app\`

---

## 📹 Demo Video
https://drive.google.com/file/d/1jfyKaUO65T3rYum3gQsUAet9XW1sCgjA/view?usp=sharing
---

## 🧑‍💻 Author
Built with ❤️ for **Cyrus365 Internship Assignment**
EOF
