import React from 'react';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react';
import { COLORS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center mb-4">
                <span className="font-bold text-2xl" style={{ color: COLORS.primary }}>FAST</span>
             </div>
             <p className="text-gray-400 text-sm">
               Food All Standard & Training. Đối tác tin cậy trong đào tạo và tư vấn hệ thống quản lý an toàn thực phẩm.
             </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Khóa Học</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">HACCP Cơ bản & Nâng cao</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">ISO 22000:2018</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FSSC 22000</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Đánh giá viên nội bộ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Liên Hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <MapPin size={16} className="mr-2" />
                <span>Ho Chi Minh City, Vietnam</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                <span>+84 123 456 789</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                <span>contact@fast-elearning.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Kết nối</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} FAST E-Learning. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;