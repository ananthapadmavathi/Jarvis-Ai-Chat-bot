const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function generateResponse(messages) {

    const systemPrompt = `
You are Jarvis, an intelligent AI assistant inspired by Tony Stark's JARVIS.

Rules:
- Keep responses short and natural.
- Be friendly and professional.
- Don't use markdown unless requested.
- Answer directly.
`;

    const prompt = `
${systemPrompt}

${messages
    .map(msg => `${msg.role === "user" ? "User" : "Jarvis"}: ${msg.content}`)
    .join("\n")}

Jarvis:
`;

    // Fallback models (highest priority first)
    const models = [
        "models/gemini-3.5-flash",
        "models/gemini-3.1-flash-lite",
        "models/gemini-2.0-flash",
        "models/gemini-2.0-flash-lite"
    ];

    let lastError;

    for (const model of models) {

        try {

            console.log(`Trying model: ${model}`);

            const response = await ai.models.generateContent({
                model,
                contents: prompt,
                config: {
                    temperature: 0.7,
                    maxOutputTokens: 1024
                }
            });

            console.log(`✅ Using ${model}`);

            return response.text.trim();

        } catch (error) {

            console.log(`❌ ${model} failed`);

            lastError = error;

            // Try the next model
            continue;
        }
    }

    throw lastError;
}

module.exports = generateResponse;