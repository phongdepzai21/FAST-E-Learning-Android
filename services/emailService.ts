
import emailjs from '@emailjs/browser';

// Các thông số EmailJS đã được cập nhật từ dashboard của người dùng
const EMAILJS_SERVICE_ID = 'service_q86r4ap'; 
const EMAILJS_TEMPLATE_ID = 'template_1nq488j';
const EMAILJS_PUBLIC_KEY = '5XW2wWLI4bXG9aVEo';

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPEmail = async (email: string, otp: string) => {
  try {
    const templateParams = {
      to_email: email,
      otp_code: otp,
      app_name: 'FAST E-Learning',
    };

    // Khởi tạo EmailJS với Public Key được cung cấp
    emailjs.init(EMAILJS_PUBLIC_KEY);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    return response;
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw error;
  }
};
