
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Bạn là FAST AI, một chuyên gia tư vấn hàng đầu về An toàn thực phẩm, HACCP, và các tiêu chuẩn ISO (như ISO 22000, FSSC 22000) cho nền tảng "FAST E-Learning".
Mục tiêu của bạn là giúp học viên hiểu rõ các khái niệm, giải đáp thắc mắc về quy trình, luật định và thực hành tốt trong ngành thực phẩm.
Hãy trả lời ngắn gọn, chính xác, chuyên nghiệp nhưng thân thiện. Ngôn ngữ chính là Tiếng Việt.
`;

export const getGeminiResponse = async (userPrompt: string): Promise<string> => {
  try {
    // Correctly initialize GoogleGenAI using process.env.API_KEY directly as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "FAST AI chưa thể trả lời câu hỏi này lúc này. Bạn hãy thử đặt câu hỏi khác nhé.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã xảy ra lỗi khi kết nối với FAST AI. Vui lòng kiểm tra lại kết nối mạng của bạn.";
  }
};
