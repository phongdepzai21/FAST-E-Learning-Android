import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { COLORS, LOGO_URL } from '../constants.ts';

const Login = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <div className="min-h-screen w-full bg-white relative flex flex-col items-center overflow-x-hidden font-sans py-6 sm:py-12">
      {/* Header Area: Logo and Slogan carefully aligned */}
      <div className="w-full max-w-2xl px-6 mb-8 sm:mb-16 flex items-start gap-4 sm:gap-8 animate-fade-in">
        <div className="flex-shrink-0">
          <img 
            src={LOGO_URL} 
            alt="FAST Logo" 
            className="h-14 sm:h-20 w-auto object-contain" 
          />
        </div>
        
        <div className="flex flex-col items-start justify-center pt-6 sm:pt-8">
          <span className="text-[9px] sm:text-[13px] font-black tracking-[0.1em] uppercase text-gray-400 text-left leading-tight whitespace-nowrap">
            FOOD ALL STANDARD &<br />TRAINING
          </span>
          <div className="h-0.5 sm:h-1 w-8 sm:w-12 bg-[#007c76] mt-2 rounded-full" style={{ backgroundColor: COLORS.primary }}></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center animate-slide-up flex-1 justify-center -mt-8 sm:-mt-16">
        <div className="w-full text-center mb-10 sm:mb-14">
          <h3 className="text-4xl sm:text-6xl font-black text-gray-900 mb-3 tracking-tight">
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </h3>
          <p className="text-gray-400 font-bold text-base sm:text-xl">
            {isLogin ? 'Chào mừng bạn trở lại với FAST.' : 'Bắt đầu lộ trình chuyên gia ngay.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-5 sm:space-y-8">
          {!isLogin && (
            <div className="space-y-1 sm:space-y-2">
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Họ và tên</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#007c76] transition-colors" size={20} />
                <input
                  type="text" required placeholder="Họ và tên của bạn"
                  className="w-full pl-14 pr-6 py-4 sm:py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#007c76] outline-none transition-all font-bold text-gray-700 placeholder:text-gray-300 shadow-sm text-lg"
                />
              </div>
            </div>
          )}

          <div className="space-y-1 sm:space-y-2">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Email của bạn</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#007c76] transition-colors" size={20} />
              <input
                type="email" required placeholder="Email của bạn"
                className="w-full pl-14 pr-6 py-4 sm:py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#007c76] outline-none transition-all font-bold text-gray-700 placeholder:text-gray-300 shadow-sm text-lg"
              />
            </div>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Mật khẩu</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#007c76] transition-colors" size={20} />
              <input
                type="password" required placeholder="••••••••"
                className="w-full pl-14 pr-6 py-4 sm:py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#007c76] outline-none transition-all font-bold text-gray-700 placeholder:text-gray-300 shadow-sm text-lg"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-sm font-black text-[#007c76] hover:underline" style={{ color: COLORS.primary }}>
              Quên mật khẩu?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-5 sm:py-6 text-white font-black text-xl sm:text-2xl rounded-2xl shadow-xl shadow-[#007c76]/30 flex items-center justify-center gap-4 transition-all transform hover:-translate-y-1 active:scale-95 group overflow-hidden relative"
            style={{ backgroundColor: COLORS.primary }}
          >
            {isLogin ? 'Đăng nhập' : 'Đăng ký ngay'}
            <ArrowRight size={24} className="transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-10 sm:mt-16 text-center">
          <p className="text-gray-400 font-bold text-base sm:text-lg">
            {isLogin ? "Bạn chưa có tài khoản? " : "Bạn đã có tài khoản? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#007c76] font-black underline underline-offset-4 decoration-2"
              style={{ color: COLORS.primary, textDecorationColor: COLORS.primary }}
            >
              {isLogin ? 'Đăng ký' : 'Đăng nhập'}
            </button>
          </p>
        </div>
      </div>
      
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-teal-50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-50 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none opacity-40"></div>
    </div>
  );
};

export default Login;