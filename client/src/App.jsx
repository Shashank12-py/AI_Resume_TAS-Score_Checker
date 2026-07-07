import React from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login/index";
import Register from "./components/Register/index";
import YourResumes from "./components/YourResumes/index";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">📄</span> ATS Analyzer
        </Link>
        <div className="nav-links">
          {token ? (
            <>
              <Link to="/" className="nav-link">Dashboard</Link>
              <button className="nav-link logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link register-link">Register</Link>
            </>
          )}
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <YourResumes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        <p>© 2026 ATS Resume Analyzer — Built with AI</p>
      </footer>
    </div>
  );
};

export default App;
