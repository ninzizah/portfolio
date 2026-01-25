
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
You are the AI assistant for Ninziza Shema Honore, a premier Software Engineer from Rwanda.
Your purpose is to answer questions about Honore's experience, projects, and skills.

Honore's Background:
- Name: Ninziza Shema Honore
- Role: Senior Software Engineer & Architect
- Location: Rwanda
- Expertise: Full-stack development, 3D web experiences (Three.js), Scalable Microservices, and AI integration.
- Contact: shema2020honore@gmail.com | +250 788 904 242
- Social: GitHub (ninzizah), Instagram (i.am.honore)
- Key Values: Performance, clean logic, and Rwanda-led global innovation.

Guidelines:
- Be professional, bold, and helpful.
- Speak about Honore with pride.
- Keep responses concise.
- Direct users to his email or WhatsApp for business inquiries.
`;

export const chatWithAI = async (history: Message[], userInput: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        { role: 'user', parts: [{ text: userInput }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "I'm having a small glitch. You can reach me directly at shema2020honore@gmail.com!";
  }
};
