import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Bạn là FAST AI, một chuyên gia tư vấn hàng đầu về An toàn thực phẩm, HACCP, và các tiêu chuẩn ISO (như ISO 22000, FSSC 22000) cho nền tảng "FAST E-Learning".
Mục tiêu của bạn là giúp học viên hiểu rõ các khái niệm, giải đáp thắc mắc về quy trình, luật định và thực hành tốt trong ngành thực phẩm.
Hãy trả lời ngắn gọn, chính xác, chuyên nghiệp nhưng thân thiện. Ngôn ngữ chính là Tiếng Việt.
`;

export const getGeminiResponse = async (userPrompt: string): Promise<string> => {
  // Safe environment check
  let apiKey = '';
  try {
     apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) ? process.env.API_KEY : '';
  } catch (e) {
    console.warn("API Key access warning", e);
  }

  if (!apiKey) {
    return "Lỗi: Hệ thống chưa được cấu hình API Key. Vui lòng thử lại sau.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "Xin lỗi, tôi không thể xử lý yêu cầu lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã xảy ra lỗi khi kết nối với FAST AI. Vui lòng kiểm tra lại kết nối mạng.";
  }
};