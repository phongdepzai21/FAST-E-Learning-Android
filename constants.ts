
import { Course, User } from './types';

export const COLORS = {
  primary: '#007c76',
  secondary: '#005c56',
  accent: '#facc15',
  text: '#1f2937',
  white: '#ffffff',
  lightGray: '#f9fafb',
  success: '#10b981',
  vip: '#f59e0b',
  standard: '#0ea5e9',
  pro: '#8b5cf6'
};

export const VIP_EMAILS = [
  "h1h4@gmail.com",
  "hkc@gmail.com", // Email yêu cầu
  "khoaitay041116@gmail.com"
];

export const LOGO_URL = "https://www.dropbox.com/scl/fi/jhuyhtd5bwdgqaza4ivkt/BetterImage_1769225491368.png?rlkey=hgb7cxj3tioijr09n6sc5l6t0&st=90eeg283&raw=1";

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'HACCP: Kiểm soát Mối nguy Nâng cao',
    description: 'Phân tích sâu các mối nguy vật lý, hóa học và sinh học trong dây chuyền sản xuất thực phẩm hiện đại.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    duration: '8 giờ',
    level: 'Advanced',
    tags: ['HACCP', 'ISO 22000'],
    progress: 85
  },
  {
    id: '2',
    title: 'ISO 22000:2018 Đánh giá viên trưởng',
    description: 'Khóa học đào tạo kỹ năng đánh giá hệ thống quản lý an toàn thực phẩm theo tiêu chuẩn ISO quốc tế.',
    image: 'https://images.unsplash.com/photo-1454165833762-02ad50e8988d?auto=format&fit=crop&w=800&q=80',
    duration: '40 giờ',
    level: 'Advanced',
    tags: ['ISO', 'Audit'],
    progress: 42
  }
];

export const MEMBERSHIP_PLANS = [
  {
    id: 'standard',
    name: 'Standard',
    price: 'Miễn phí',
    features: ['Truy cập 5 khóa học cơ bản', 'Tài liệu PDF', 'FAST AI cơ bản'],
    color: COLORS.standard,
    icon: 'Book'
  },
  {
    id: 'vip',
    name: 'VIP Executive',
    price: '2.999k / tháng',
    features: ['Đào tạo 1-1 với Chuyên gia', 'Đánh giá doanh nghiệp', 'Báo cáo xu hướng Food Safety', 'Sự kiện Offline'],
    color: COLORS.vip,
    icon: 'Crown'
  }
];
