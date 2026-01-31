import React from 'react';
import { ArrowRight, ShieldCheck, BookOpen, Award } from 'lucide-react';
import { COLORS } from '../constants';
import { ViewState } from '../types';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Chuyên gia đào tạo</span>{' '}
                <span className="block xl:inline" style={{ color: COLORS.primary }}>Tiêu chuẩn Thực phẩm</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                FAST (Food All Standard & Training) cung cấp giải pháp E-Learning toàn diện về HACCP, ISO 22000, FSSC và các tiêu chuẩn an toàn thực phẩm quốc tế.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={onStart}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white md:py-4 md:text-lg md:px-10 transition-colors"
                    style={{ backgroundColor: COLORS.primary }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = COLORS.secondary)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = COLORS.primary)}
                  >
                    Xem Khóa Học
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    style={{ color: COLORS.primary, backgroundColor: '#e0f2f1' }}
                  >
                    Tư vấn AI
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
          alt="Food safety inspection"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent lg:via-gray-50/20"></div>
      </div>
      
      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-3 rounded-full bg-teal-50 text-teal-600 mb-4">
              <ShieldCheck size={32} style={{ color: COLORS.primary }} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Chuẩn Quốc Tế</h3>
            <p className="mt-2 text-gray-500">Nội dung cập nhật theo các phiên bản mới nhất của ISO, HACCP, CODEX.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-3 rounded-full bg-teal-50 text-teal-600 mb-4">
              <BookOpen size={32} style={{ color: COLORS.primary }} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Học Mọi Lúc</h3>
            <p className="mt-2 text-gray-500">Nền tảng E-Learning linh hoạt, truy cập bài giảng 24/7 trên mọi thiết bị.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-3 rounded-full bg-teal-50 text-teal-600 mb-4">
              <Award size={32} style={{ color: COLORS.primary }} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Chứng Chỉ Uy Tín</h3>
            <p className="mt-2 text-gray-500">Hoàn thành khóa học và nhận chứng nhận có giá trị trong ngành thực phẩm.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;