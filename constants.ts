
import { Course } from './types';

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
  "hkc@gmail.com",
  "khoaitay041116@gmail.com"
];

export const LOGO_URL = "https://www.dropbox.com/scl/fi/jhuyhtd5bwdgqaza4ivkt/BetterImage_1769225491368.png?rlkey=hgb7cxj3tioijr09n6sc5l6t0&st=90eeg283&raw=1";

export const MOCK_COURSES: Course[] = [
  {
    id: 'haccp-01',
    title: 'HACCP: 7 Nguyên tắc Vàng',
    description: 'Hướng dẫn chi tiết thiết lập hệ thống phân tích mối nguy và điểm kiểm soát tới hạn theo chuẩn quốc tế.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    duration: '12 giờ',
    level: 'Cơ bản',
    tags: ['HACCP', 'TCVN'],
    progress: 0
  },
  {
    id: 'iso-22000',
    title: 'ISO 22000:2018 Hệ thống Quản lý',
    description: 'Xây dựng chuỗi cung ứng thực phẩm an toàn từ nông trại đến bàn ăn theo tiêu chuẩn ISO mới nhất.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    duration: '24 giờ',
    level: 'Nâng cao',
    tags: ['ISO', 'Management'],
    progress: 0
  },
  {
    id: 'tcvn-labelling',
    title: 'TCVN: Quy định Ghi nhãn Thực phẩm',
    description: 'Cập nhật các quy định pháp luật Việt Nam mới nhất về ghi nhãn và công bố chất lượng thực phẩm.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    duration: '6 giờ',
    level: 'Pháp luật',
    tags: ['TCVN', 'Labelling'],
    progress: 0
  }
];

export const MEMBERSHIP_PLANS = [
  {
    id: 'standard',
    name: 'Standard',
    price: 'Miễn phí',
    features: ['Truy cập khóa TCVN cơ bản', 'Tài liệu PDF tiêu chuẩn', 'FAST AI Chat'],
    color: COLORS.standard,
    icon: 'Book'
  },
  {
    id: 'vip',
    name: 'VIP Executive',
    price: '2.999k / khóa',
    features: ['Chứng chỉ HACCP quốc tế', 'Tư vấn ISO 1-1', 'Báo cáo mối nguy hàng tuần', 'FAST AI Pro'],
    color: COLORS.vip,
    icon: 'Crown'
  }
];
