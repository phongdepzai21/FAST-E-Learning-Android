import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Bạn là FAST AI, một chuyên gia tư vấn hàng đầu về An toàn thực phẩm, HACCP, và các tiêu chuẩn ISO (như ISO 22000, FSSC 22000) cho nền tảng "FAST E-Learning".
Mục tiêu của bạn là giúp học viên hiểu rõ các khái niệm, giải đáp thắc mắc về quy trình, luật định và thực hành tốt trong ngành thực phẩm.
Hãy trả lời ngắn gọn, chính xác, chuyên nghiệp nhưng thân thiện. Ngôn ngữ chính là Tiếng Việt.
`;

export const getGeminiResponse = async (userPrompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Lỗi: Chưa cấu hình API Key. Vui lòng kiểm tra môi trường.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using gemini-3-flash-preview for fast, intelligent text responses
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "Xin lỗi, tôi không thể tạo câu trả lời lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã xảy ra lỗi khi kết nối với trợ lý AI. Vui lòng thử lại sau.";
  }
};