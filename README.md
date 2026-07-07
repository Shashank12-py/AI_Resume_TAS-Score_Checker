# AI-Powered Resume ATS Score & Analyzer

A full-stack application designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS). The application extracts text from PDF resumes, calculates an ATS match score against a job description, and provides AI-generated suggestions for improvement using Google's Gemini AI.

## 🚀 Features

- **User Authentication**: Secure registration and login system with JWT.
- **PDF Resume Parsing**: Automatically extracts text from uploaded PDF files.
- **ATS Scoring Engine**: Calculates a match score based on keyword extraction and comparison.
- **AI-Powered Insights**: Uses Gemini AI to identify missing skills, provide optimization tips, and suggest bullet point improvements.
- **Modern UI**: A clean, responsive dashboard for managing and analyzing resumes.

## 🛠️ Technology Stack

### Backend
- **Node.js & Express**: API framework.
- **MongoDB & Mongoose**: Database for users and resume data.
- **JWT (JSON Web Tokens)**: Authentication.
- **Multer**: Handling file uploads.
- **pdfjs-dist**: Extracting text from PDF buffers.
- **Google Gemini API**: AI analysis.

### Frontend
- **React**: Component-based UI.
- **Vite**: Ultra-fast build tool.
- **React Router**: Client-side routing.
- **Vanilla CSS**: Custom styling with a modern design system.

---

## ⚙️ Setup Instructions

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB).
- [Google Gemini API Key](https://aistudio.google.com/app/apikey).

### 2. Backend Configuration
1. Navigate to the `server` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` folder with the following contents:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

### 3. Frontend Configuration
1. Navigate to the `client` directory.
2. Install dependencies:
   ```bash
   npm install
   ```

### 4. Running the Project
- **Start the Server**:
  ```bash
  cd server
  npm run dev
  ```
- **Start the Client**:
  ```bash
  cd client
  npm run dev
  ```
The application will be available at `http://localhost:3000`.

---

## 📂 Project Structure

```
AI_Resume_ATS-Score_Project/
├── server/                 # Express Backend
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Auth & Upload middleware
│   ├── models/            # Database schemas
│   ├── routes/            # API endpoints
│   ├── utils/             # AI, ATS, and Parser utilities
│   └── server.js          # Entry point
└── client/                 # React Frontend (Vite)
    ├── src/
    │   ├── components/    # UI Components (Login, Register, Dashboard)
    │   ├── App.jsx        # Routing and Layout
    │   └── main.jsx       # Mount point
    └── index.html
```

## 📝 License
This project is for educational purposes. Feel free to use and modify!
