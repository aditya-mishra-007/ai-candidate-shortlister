# 🤖 AI Candidate Shortlister

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![AI Powered](https://img.shields.io/badge/AI-Powered-purple)
![Deployment](https://img.shields.io/badge/Deployment-Render-brightgreen)
![UI/UX](https://img.shields.io/badge/UI-Modern-blueviolet)

An AI-powered candidate shortlisting web application that helps recruiters collect candidate details, define job requirements, and shortlist suitable candidates efficiently.  
Built with a clean React frontend, Express backend, MongoDB database, and AI chatbot integration.

> 💡 Designed to simplify the hiring process by combining candidate management with AI-powered assistance.

---

## 🚀 Live Demo

👉 https://ai-candidate-shortlister-portal.onrender.com/

---

## 📸 Screenshots

### Home / Candidate Form
<img src="https://github.com/user-attachments/assets/46c21a36-804f-4a22-81a7-9961f25c655b" width="70%" />

### AI Chatbot / Shortlisting Result
<img src="https://github.com/user-attachments/assets/47f217f5-13d9-4c3e-a1c1-d67580ece8e6" width="35%" />

---

## ✨ Key Features

- 📝 **Candidate Application Form** — Collect candidate details through a simple and responsive form
- 💼 **Job Requirement Input** — Add job requirements to compare with candidate profiles
- 🤖 **AI Chatbot Assistant** — Interactive AI assistant for recruitment-related help
- 📋 **Candidate List Management** — View and manage submitted candidate details
- ⭐ **Shortlist Display** — Display shortlisted candidates based on matching criteria
- ⚡ **Fast Backend APIs** — Express.js APIs for candidate and matching operations
- 📱 **Responsive Design** — Works smoothly on desktop and mobile devices
- 🌐 **Deployed Application** — Hosted online using Render

---

## 🛠️ Tech Stack

### Frontend

- React.js (Vite)
- CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### AI Integration

- OpenRouter API / AI Chatbot

### Deployment

- Render

---

## 📁 Project Structure

```text
AI-CANDIDATE-SHORTLISTER/
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   │   ├── candidateRoutes.js
│   │   └── matchRoutes.js
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AIChatbot.jsx
│   │   │   ├── CandidateForm.jsx
│   │   │   ├── CandidateList.jsx
│   │   │   ├── JobRequirement.jsx
│   │   │   └── ShortlistDisplay.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   └── package.json
│
└── README.md

## 🚀 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/aditya-mishra-007/ai-candidate-shortlister.git
cd ai-candidate-shortlister
```

---

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file in the **backend** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key
```

---

### 4. Run the Application

#### Start Backend

```bash
cd backend
npm start
```

#### Start Frontend

```bash
cd frontend
npm run dev
```

---

## 🔌 API Routes

### Candidate Routes

* POST /api/candidates
* GET /api/candidates

### Matching Routes

* POST /api/match

---

## 🌐 Deployment

* Frontend & Backend deployed on Render
* Database hosted on MongoDB Atlas
* AI chatbot powered by OpenRouter API

---

## 🎯 Purpose of the Project

This project was built to:

* Practice full-stack MERN development
* Integrate AI features into a real-world web application
* Build a recruitment-focused candidate management system
* Learn backend API handling and deployment
* Create a portfolio-ready AI-based project

---

## 🚀 Future Improvements

* 📄 Resume upload feature
* ⭐ AI-based candidate scoring
* 🔍 Candidate search and filtering
* 🔐 Recruiter/Admin login
* 📧 Email notification system

---

## 👨‍💻 Author

**Aditya Mishra**
GitHub: [https://github.com/aditya-mishra-007](https://github.com/aditya-mishra-007)

---
