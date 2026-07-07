import dotenv from "dotenv";
dotenv.config();

const buildPrompt = (resumeText, jobDescription) => `
You are an ATS resume analyzer system.
Compare the following Resume Text against the Job Description.
Return a STRICT JSON object only. Do not wrap inside Markdown format block. Do not include markdown \`\`\`json backticks.

Use this exact structure:
{
  "missingSkills": ["skill1", "skill2"],
  "optimizationTips": ["tip1", "tip2"],
  "bulletPointImprovements": ["improved version of weak phrase 1", "improved version of weak phrase 2"]
}

Resume Text:
${resumeText}

Job Description:
${jobDescription}
`;

export const analyzeWithGemini = async (resumeText, jobDescription) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is undefined");
        }

        const promptText = buildPrompt(resumeText, jobDescription);
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }]
            })
        });

        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawText) throw new Error("Empty response from Gemini API");

        // Clear potential markdown wrapping artifacts cleanly
        const cleanedText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanedText);
    } catch (err) {
        return { error: "Failed parsing AI recommendations structural JSON format.", raw: err.message };
    }
};