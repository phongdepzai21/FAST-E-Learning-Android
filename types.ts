export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  progress?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ViewState {
  HOME = 'HOME',
  COURSES = 'COURSES',
  AI_TUTOR = 'AI_TUTOR',
  ABOUT = 'ABOUT',
  LOGIN = 'LOGIN',
  ACCOUNT = 'ACCOUNT'
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
  joinedDate: string;
}