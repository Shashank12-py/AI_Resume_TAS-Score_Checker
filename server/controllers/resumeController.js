import { parseResume } from "../utils/resumeParser.js";
import { extractKeywords } from "../utils/keywordExtractor.js";
import { calculateATSScore } from "../utils/atsScore.js";
import { analyzeWithGemini } from "../utils/aiAnalyzer.js";

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const extractedText = await parseResume(req.file.buffer);
        res.json({
            preview: extractedText.substring(0, 500) + "...",
            text: extractedText
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const analyzeResume = async (req, res) => {
    try {
        const { resumeText, jobDescription } = req.body;
        if (!resumeText || !jobDescription) {
            return res.status(400).json({ error: "Missing resumeText or jobDescription" });
        }

        const jdKeywords = extractKeywords(jobDescription);
        const resumeKeywords = extractKeywords(resumeText);
        const score = calculateATSScore(jdKeywords, resumeKeywords);

        const aiSuggestions = await analyzeWithGemini(resumeText, jobDescription);

        res.json({
            success: true,
            atsScore: score,
            suggestions: aiSuggestions
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};