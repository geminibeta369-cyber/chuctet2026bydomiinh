
import { GoogleGenAI } from "@google/genai";
import { WishTheme } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function generateAIWish(theme: WishTheme, customPrompt?: string): Promise<string> {
  try {
    const prompt = customPrompt || `Hãy viết 1 lời chúc Tết Nguyên Đán năm Bính Ngọ 2026 bằng tiếng Việt theo phong cách ${theme}. Lời chúc nên ngắn gọn (dưới 50 từ), súc tích và mang ý nghĩa may mắn, tài lộc. Đừng dùng markdown, chỉ trả về văn bản thuần túy.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    return response.text?.trim() || "Chúc mừng năm mới Bính Ngọ 2026, vạn sự như ý!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Chúc mừng năm mới Bính Ngọ 2026! An khang thịnh vượng, vạn sự như ý!";
  }
}
