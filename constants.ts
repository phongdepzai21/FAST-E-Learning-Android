import { Course, User } from './types';

export const COLORS = {
  primary: '#007c76',
  secondary: '#005c56',
  accent: '#facc15',
  text: '#1f2937',
  white: '#ffffff',
  lightGray: '#f9fafb',
  success: '#10b981',
  vip: '#8b5cf6',
  standard: '#0ea5e9',
  pro: '#f59e0b'
};

export const LOGO_URL = "https://www.dropbox.com/scl/fi/jhuyhtd5bwdgqaza4ivkt/BetterImage_1769225491368.png?rlkey=hgb7cxj3tioijr09n6sc5l6t0&st=90eeg283&raw=1";

export const MOCK_USER: User = {
  name: "Nguyễn Văn Chuyên",
  email: "chuyen.nv@food-industry.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chuyen",
  role: "Quản lý Chất lượng (QA Manager)",
  joinedDate: "15/10/2023"
};

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
    id: 'pro',
    name: 'Professional',
    price: '499k / tháng',
    features: ['Toàn bộ 50+ khóa học', 'Chứng chỉ chuẩn ISO', 'FAST AI không giới hạn', 'Hỗ trợ Mentor'],
    color: COLORS.primary,
    isPopular: true,
    icon: 'Zap'
  },
  {
    id: 'vip',
    name: 'VIP Executive',
    price: '999k / tháng',
    features: ['Đào tạo 1-1 với Chuyên gia', 'Đánh giá doanh nghiệp', 'Báo cáo xu hướng Food Safety', 'Sự kiện Offline'],
    color: COLORS.vip,
    icon: 'Crown'
  }
];

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'HACCP: Kiểm soát Mối nguy Nâng cao',
    description: 'Phân tích sâu các mối nguy vật lý, hóa học và sinh học trong dây chuyền sản xuất thực phẩm hiện đại.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    duration: '8 giờ',
    level: 'Advanced',
    tags: ['HACCP', 'Advanced', 'Quality Control'],
    progress: 85
  },
  {
    id: '2',
    title: 'ISO 22000:2018 Đánh giá viên trưởng',
    description: 'Khóa học đào tạo kỹ năng đánh giá hệ thống quản lý an toàn thực phẩm theo tiêu chuẩn ISO quốc tế.',
    image: 'https://images.unsplash.com/photo-1454165833762-02ad50e8988d?auto=format&fit=crop&w=800&q=80',
    duration: '40 giờ',
    level: 'Advanced',
    tags: ['ISO', 'Audit', 'Leadership'],
    progress: 42
  },
  {
    id: '3',
    title: 'Văn hóa An toàn Thực phẩm (Food Safety Culture)',
    description: 'Xây dựng và duy trì văn hóa an toàn thực phẩm bền vững trong tổ chức.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    duration: '5 giờ',
    level: 'Intermediate',
    tags: ['Culture', 'Management'],
    progress: 10
  }
];