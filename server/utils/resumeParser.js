import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function parseResume(fileBuffer) {
    try {
        if (!fileBuffer || fileBuffer.length === 0) {
            throw new Error("Received empty buffer");
        }
        const uint8Array = new Uint8Array(fileBuffer);
        const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
        const pdf = await loadingTask.promise;

        let extractedText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map((item) => item.str).join(" ");
            extractedText += pageText + "\n";
        }
        return extractedText;
    } catch (err) {
        throw new Error("Failed to parse PDF text: " + err.message);
    }
}