# 🤖 Jarvis - AI Chatbot

Jarvis is a full-stack AI chatbot web application built using **Node.js, Express.js, MongoDB Atlas, and Google Gemini AI**. It allows users to have intelligent conversations with an AI assistant while maintaining conversation history and context.

---

## 🚀 Features

- 💬 AI-powered chatbot using Google Gemini
- 📝 Conversation history
- ➕ Create new conversations
- 📂 View previous conversations
- 🗑 Delete conversations
- 🧠 Context retained within each conversation
- 🌐 Responsive web interface
- ⚡ Express.js REST API
- ☁ MongoDB Atlas database

---

## 🛠 Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### AI Model
- Google Gemini API

---

## 📁 Project Structure

```
Jarvis/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── README.md
└── .gitignore
```

---

## ⚙ Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/jarvis-ai-chatbot.git
```

---

### Navigate to backend

```bash
cd backend
```

---

### Install dependencies

```bash
npm install
```

---

### Create a `.env` file

```env
PORT=5000
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

### Run the backend

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## 💻 Open the Application

Open your browser and visit

```
http://localhost:5000
```

---

## 📌 API Endpoints

### Create Conversation

```
POST /api/conversations
```

---

### Get All Conversations

```
GET /api/conversations
```

---

### Get One Conversation

```
GET /api/conversations/:id
```

---

### Delete Conversation

```
DELETE /api/conversations/:id
```

---

### Send Chat Message

```
POST /api/chat
```

Request Body

```json
{
    "conversationId":"YOUR_CONVERSATION_ID",
    "message":"Hello Jarvis"
}
```

---

## 🌟 Future Improvements

- Persistent memory across conversations
- User authentication
- Voice input/output
- Image upload support
- Dark/Light theme toggle
- Streaming AI responses
- Conversation search
- Export chats as PDF

---

## 👨‍💻 Author Padmavathi

Developed as part of the **K-Hub Junior Developer Intern Selection Task (2026-27)**.