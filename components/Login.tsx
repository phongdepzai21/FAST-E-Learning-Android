import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { COLORS, LOGO_URL } from '../constants.ts';

interface LoginProps {
  onSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
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
        
        {/* Adjusted Slogan - Lowered with pt-6/pt-8 */}
        <div className="flex flex-col items-start justify-center pt-6 sm:pt-8">
          <span className="text-[9px] sm:text-[13px] font-black tracking-[0.1em] uppercase text-gray-400 text-left leading-tight whitespace-nowrap">
            FOOD ALL STANDARD &<br />TRAINING
          </span>
          <div className="h-0.5 sm:h-1 w-8 sm:w-12 bg-[#007c76] mt-2 rounded-full" style={{ backgroundColor: COLORS.primary }}></div>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center animate-slide-up flex-1 justify-center -mt-8 sm:-mt-16">
        
        <div className="w-full text-center mb-8 sm:mb-10">
          <h3 className="text-3xl sm:text-5xl font-black text-gray-900 mb-2 tracking-tight">
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </h3>
          <p className="text-gray-400 font-bold text-sm sm:text-lg">
            {isLogin ? 'Chào mừng bạn trở lại với FAST.' : 'Bắt đầu lộ trình chuyên gia ngay.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4 sm:space-y-6">
          {!isLogin && (
            <div className="space-y-1 sm:space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] ml-1">Họ và tên</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#007c76] transition-colors" size={18} />
                <input
                  type="text" required placeholder="Họ và tên của bạn"
                  className="w-full pl-14 pr-6 py-3.5 sm:py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#007c76] outline-none transition-all font-bold text-gray-700 placeholder:text-gray-300 shadow-sm"
                />
              </div>
            </div>
          )}

          <div className="space-y-1 sm:space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] ml-1">Email của bạn</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#007c76] transition-colors" size={18} />
              <input
                type="email" required placeholder="Email của bạn"
                className="w-full pl-14 pr-6 py-3.5 sm:py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#007c76] outline-none transition-all font-bold text-gray-700 placeholder:text-gray-300 shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] ml-1">Mật khẩu</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#007c76] transition-colors" size={18} />
              <input
                type="password" required placeholder="••••••••"
                className="w-full pl-14 pr-6 py-3.5 sm:py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#007c76] outline-none transition-all font-bold text-gray-700 placeholder:text-gray-300 shadow-sm"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs font-black text-[#007c76] hover:underline" style={{ color: COLORS.primary }}>
              Quên mật khẩu?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 sm:py-5 text-white font-black text-lg sm:text-xl rounded-2xl shadow-xl shadow-[#007c76]/20 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95 group overflow-hidden relative"
            style={{ backgroundColor: COLORS.primary }}
          >
            {isLogin ? 'Đăng nhập' : 'Đăng ký ngay'}
            <ArrowRight size={22} />
          </button>
        </form>

        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-gray-400 font-bold text-sm">
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
      
      {/* Accents */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-teal-50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-50 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none opacity-40"></div>
    </div>
  );
};

export default Login;