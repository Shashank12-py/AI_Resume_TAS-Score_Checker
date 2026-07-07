import React, { useState } from "react";
import "./index.css";

const YourResumes = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [analysisResult, setAnalysisResult] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUploadAndAnalyze = async () => {
        if (!selectedFile) {
            setError("Please select a PDF file first.");
            return;
        }

        setLoading(true);
        setError("");
        setAnalysisResult(null);

        const token = localStorage.getItem("token");

        try {
            // Step 1: Upload and Extract Text
            const formData = new FormData();
            formData.append("resume", selectedFile);

            const uploadResponse = await fetch("/resume/upload", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            if (!uploadResponse.ok) {
                const errorText = await uploadResponse.text();
                throw new Error(errorText || "Resume upload parse failed.");
            }

            const uploadData = await uploadResponse.json();

            // Step 2: Request ATS analysis using extracted text against job description criteria
            const rawData = {
                resumeText: uploadData.text,
                jobDescription: `Junior Full Stack Developer. Requirements: Proficiency in HTML, CSS, JavaScript, and React. Experience with Node.js, Express, and REST APIs. Familiarity with MongoDB or NoSQL database. Understanding of Git.`
            };

            const analyzeResponse = await fetch("/resume/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(rawData)
            });

            const analysisData = await analyzeResponse.json();
            if (analyzeResponse.ok) {
                setAnalysisResult(analysisData);
                setShowModal(true);
            } else {
                throw new Error(analysisData.error || "Analysis engine failure.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const report = analysisResult?.suggestions;

    return (
        <div className="resume-container">
            <h2>Upload & Analyze Your Resume</h2>
            <div className="upload-box">
                <input type="file" accept=".pdf" onChange={handleFileChange} />
                <button onClick={handleUploadAndAnalyze} disabled={loading}>
                    {loading ? "Processing Report..." : "Scan Match Score"}
                </button>
            </div>

            {error && <p className="error-text">{error}</p>}

            {analysisResult && (
                <button className="view-btn" onClick={() => setShowModal(true)}>View Analysis Report</button>
            )}

            {showModal && analysisResult && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
                        <h2>ATS Evaluation Summary</h2>
                        <div className="score-badge">Match Score: {analysisResult.atsScore}%</div>

                        <h3>Missing Critical Skills</h3>
                        <ul>
                            {report?.missingSkills?.map((skill, index) => <li key={index}>{skill}</li>) || <li>None noted</li>}
                        </ul>

                        <h3>Optimization Tips</h3>
                        <ul>
                            {report?.optimizationTips?.map((tip, index) => <li key={index}>{tip}</li>) || <li>None noted</li>}
                        </ul>

                        <h3>Bullet Point Alignment Action Items</h3>
                        <ul>
                            {report?.bulletPointImprovements?.map((item, index) => <li key={index}>{item}</li>) || <li>No optimization needed</li>}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default YourResumes;