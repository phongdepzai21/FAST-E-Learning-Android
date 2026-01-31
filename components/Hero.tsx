import React from 'react';
import { ArrowRight, ShieldCheck, BookOpen, Award } from 'lucide-react';
import { COLORS } from '../constants.ts';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 pt-10 pb-8 sm:pt-16 sm:pb-24 lg:pt-32 lg:pb-32 lg:max-w-2xl lg:w-full">
          <main className="text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block mb-1">Chuyên gia đào tạo</span>
              <span className="block" style={{ color: COLORS.primary }}>Tiêu chuẩn Thực phẩm</span>
            </h1>
            <p className="mt-4 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              FAST (Food All Standard & Training) cung cấp giải pháp E-Learning toàn diện về HACCP, ISO 22000, FSSC và các tiêu chuẩn an toàn thực phẩm quốc tế.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onStart}
                className="flex items-center justify-center px-8 py-4 border border-transparent text-base font-black rounded-2xl text-white shadow-xl shadow-teal-600/20 transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: COLORS.primary }}
              >
                Xem Khóa Học
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                className="flex items-center justify-center px-8 py-4 border border-transparent text-base font-black rounded-2xl transition-all hover:bg-teal-100"
                style={{ color: COLORS.primary, backgroundColor: '#e0f2f1' }}
              >
                Tư vấn AI
              </button>
            </div>
          </main>
        </div>
      </div>
      
      {/* Background Image - Optimized for Desktop & Mobile */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 h-64 sm:h-72 lg:h-full w-full">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=1200&q=80"
          alt="Food safety inspection"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/0 via-gray-50/20 to-gray-50 lg:bg-gradient-to-r lg:from-gray-50 lg:via-gray-50/10 lg:to-transparent"></div>
      </div>
      
      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-20">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {[
            { icon: <ShieldCheck size={32} />, title: "Chuẩn Quốc Tế", desc: "Nội dung cập nhật theo phiên bản mới nhất của ISO, HACCP." },
            { icon: <BookOpen size={32} />, title: "Học Mọi Lúc", desc: "Nền tảng linh hoạt, truy cập bài giảng 24/7 trên mọi thiết bị." },
            { icon: <Award size={32} />, title: "Chứng Chỉ Uy Tín", desc: "Nhận chứng chỉ có giá trị cao trong ngành thực phẩm." }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 bg-white/80 backdrop-blur rounded-[2rem] shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="p-4 rounded-2xl bg-teal-50 text-teal-600 mb-6" style={{ color: COLORS.primary }}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="mt-3 text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;