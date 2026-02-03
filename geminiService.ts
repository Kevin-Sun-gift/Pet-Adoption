
import { GoogleGenAI } from "@google/genai";
import { Pet, Message } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function chatWithShelterAssistant(pet: Pet, chatHistory: Message[]) {
  const systemInstruction = `
    你是一个宠物领养中心的助手。你正在帮助潜在领养人了解关于 ${pet.name} 的信息。
    ${pet.name} 的基本信息：
    - 品种: ${pet.breed}
    - 距离: ${pet.distance}
    - 年龄: ${pet.age}
    - 性别: ${pet.gender === 'male' ? '公' : '母'}
    - 性格/描述: ${pet.description}
    - 健康状况: ${pet.health.join(', ')}

    你的语气应该是热情、负责且专业的。如果用户问到如何领养，请告诉他们可以点击“申请领养”按钮。
    请始终保持简洁，回答不要太长。
  `;

  const contents = chatHistory.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return response.text || "抱歉，我现在无法回答您的问题。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "连接助手时出了点问题，请稍后再试。";
  }
}
