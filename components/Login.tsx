
import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, ArrowRight, Loader2, AlertCircle, ChevronLeft } from 'lucide-react';
import { COLORS, LOGO_URL } from '../constants.ts';
import { loginWithEmail, registerWithEmail, signInWithGoogle } from '../services/firebase.ts';

const Login = ({ onSuccess }: { onSuccess: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password);
      }
      onSuccess();
    } catch (err: any) {
      console.error(err);
      setError('Email hoặc mật khẩu không chính xác.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      onSuccess();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Bạn đã đóng cửa sổ đăng nhập.');
      } else {
        setError('Lỗi kết nối Google. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Màn hình khởi đầu (Splash Screen)
  if (!showForm) {
    return (
      <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col items-center justify-between p-10 animate-fade-in relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-60"></div>

        <div className="w-full flex flex-col items-center mt-24 z-10">
          <img src={LOGO_URL} alt="FAST Logo" className="h-32 w-auto mb-6 animate-slide-up object-contain" />
          <div className="text-center space-y-1">
            <p className="text-[12px] font-black uppercase tracking-[0.3em] text-[#007c76]">
              Food All Standard
            </p>
            <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-gray-400">
              & Training
            </p>
          </div>
        </div>

        <div className="w-full z-10 space-y-4 mb-10">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold flex items-center gap-3 animate-shake mb-4">
              <AlertCircle size={16} className="shrink-0" /> {error}
            </div>
          )}
          
          <button 
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-4 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center gap-4 font-bold text-gray-700 shadow-sm active:scale-95 transition-all disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                <img src="https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png" className="w-5 h-5" alt="Google" />
                <span className="text-sm">Tiếp tục với Google</span>
              </>
            )}
          </button>

          <button 
            onClick={() => { setIsLogin(true); setShowForm(true); setError(''); }}
            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black shadow-xl shadow-gray-200 active:scale-95 transition-all text-sm"
          >
            Đăng nhập với Email
          </button>

          <button 
            onClick={() => { setIsLogin(false); setShowForm(true); setError(''); }}
            className="w-full py-4 text-[#007c76] font-black text-xs uppercase tracking-widest active:opacity-60 transition-all"
          >
            Tạo tài khoản mới
          </button>
        </div>

        <p className="text-[9px] text-gray-300 font-bold uppercase tracking-[0.2em] mt-4">
          FAST E-Learning • Version 2.5.0
        </p>
      </div>
    );
  }

  // Màn hình Form (Email Auth)
  return (
    <div className="min-h-screen bg-white max-w-md mx-auto p-8 animate-slide-up flex flex-col">
      <header className="flex items-center justify-between mb-12">
        <button 
          onClick={() => setShowForm(false)}
          className="p-2 rounded-xl bg-gray-50 text-gray-400 active:scale-90 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-end">
          <span className="text-[8px] font-black text-[#007c76] uppercase tracking-tighter">Food All Standard</span>
          <span className="text-[8px] font-bold text-gray-300 uppercase tracking-tighter">& Training</span>
        </div>
      </header>

      <div className="mb-10">
        <h3 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
          {isLogin ? 'Chào mừng!' : 'Tham gia ngay!'}
        </h3>
        <p className="text-gray-400 font-bold text-sm leading-relaxed">
          {isLogin 
            ? 'Đăng nhập để tiếp tục lộ trình đào tạo chuyên nghiệp của bạn.' 
            : 'Đăng ký tài khoản để bắt đầu học HACCP & ISO cùng FAST.'}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold flex items-center gap-3">
          <AlertCircle size={16} className="shrink-0" /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 flex-1">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#007c76] transition-colors" size={18} />
            <input
              type="email" required placeholder="Email của bạn"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#007c76] outline-none transition-all font-bold text-gray-700 placeholder:text-gray-300 shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mật khẩu</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#007c76] transition-colors" size={18} />
            <input
              type="password" required placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#007c76] outline-none transition-all font-bold text-gray-700 placeholder:text-gray-300 shadow-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 mt-6 bg-[#007c76] text-white font-black rounded-2xl shadow-xl shadow-teal-100 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="animate-spin" size={24} /> : (isLogin ? 'ĐĂNG NHẬP' : 'TẠO TÀI KHOẢN')}
        </button>
      </form>

      <div className="mt-10 text-center pb-8">
        <p className="text-gray-400 font-bold text-xs">
          {isLogin ? "Bạn chưa có tài khoản? " : "Bạn đã có tài khoản? "}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-[#007c76] font-black underline underline-offset-4 decoration-2"
          >
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
