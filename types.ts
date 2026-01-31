
// Sử dụng object thay cho Enum để trình duyệt không bị lỗi cú pháp khi load trực tiếp
export const ViewState = {
  HOME: 'HOME',
  COURSES: 'COURSES',
  AI_TUTOR: 'AI_TUTOR',
  ABOUT: 'ABOUT',
  LOGIN: 'LOGIN',
  ACCOUNT: 'ACCOUNT'
} as const;

// Type representing the values of ViewState
export type ViewStateType = typeof ViewState[keyof typeof ViewState];

// Exporting interfaces to be used across components
export interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
  joinedDate: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: string;
  tags: string[];
  progress: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
