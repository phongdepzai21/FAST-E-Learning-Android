
import React, { useState } from 'react';
import { Mail, Lock, Loader2, AlertCircle, ChevronLeft, X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { LOGO_URL } from '../constants.ts';
import { loginWithEmail, registerWithEmail, signInWithGoogle } from '../services/firebase.ts';

const TermsModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 max-h-[85vh] overflow-y-auto animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-50 text-[#007c76] rounded-2xl"><ShieldCheck size={24} /></div>
            <h3 className="text-xl font-black text-gray-900">Điều khoản sử dụng</h3>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-400"><X size={20} /></button>
        </div>
        
        <div className="space-y-6 text-sm text-gray-600 font-medium leading-relaxed">
          <section>
            <h4 className="font-black text-gray-900 mb-2 uppercase text-[10px] tracking-widest">1. Quyền sở hữu nội dung</h4>
            <p>Tất cả bài giảng, tài liệu PDF và video trên FAST E-Learning thuộc bản quyền của Food All Standard & Training. Bạn không được phép ghi hình hoặc chia sẻ tài liệu ra ngoài hệ thống.</p>
          </section>
          <section>
            <h4 className="font-black text-gray-900 mb-2 uppercase text-[10px] tracking-widest">2. Trạng thái VIP & Hội viên</h4>
            <p>Quyền lợi VIP được đồng bộ trực tiếp từ hệ thống quản lý của FAST. Mọi tranh chấp về gói dịch vụ sẽ được giải quyết dựa trên lịch sử giao dịch tại Firebase Console.</p>
          </section>
          <section>
            <h4 className="font-black text-gray-900 mb-2 uppercase text-[10px] tracking-widest">3. Bảo mật tài khoản</h4>
            <p>FAST sử dụng công nghệ bảo mật của Google Firebase. Bạn có trách nhiệm bảo mật mật khẩu và email cá nhân.</p>
          </section>
        </div>

        <button onClick={onClose} className="w-full py-4 bg-[#007c76] text-white font-black rounded-2xl mt-8 shadow-xl shadow-teal-100 flex items-center justify-center gap-2">
          <CheckCircle2 size={18} /> TÔI ĐỒNG Ý VỚI ĐIỀU KHOẢN
        </button>
      </div>
    </div>
  );
};

const Login = ({ onSuccess }: { onSuccess: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
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
      setError(isLogin ? 'Email hoặc mật khẩu không đúng.' : 'Email này đã tồn tại trên hệ thống.');
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
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Lỗi kết nối Google. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!showForm) {
    return (
      <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col items-center justify-between p-10 animate-fade-in relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-60"></div>

        <div className="w-full flex flex-col items-center mt-24 z-10">
          <img src={LOGO_URL} alt="FAST Logo" className="h-32 w-auto mb-6 animate-slide-up object-contain" />
          <div className="text-center space-y-1">
            <p className="text-[12px] font-black uppercase tracking-[0.3em] text-[#007c76]">Food All Standard</p>
            <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-gray-400">& Training</p>
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
        <p className="text-[9px] text-gray-300 font-bold uppercase tracking-[0.2em] mt-4">FAST E-Learning • Version 2.6.0</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto p-8 animate-slide-up flex flex-col">
      <header className="flex items-center justify-between mb-12">
        <button onClick={() => setShowForm(false)} className="p-2 rounded-xl bg-gray-50 text-gray-400 active:scale-90 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-end">
          <span className="text-[8px] font-black text-[#007c76] uppercase">Food All Standard</span>
          <span className="text-[8px] font-bold text-gray-300 uppercase">& Training</span>
        </div>
      </header>

      <div className="mb-10">
        <h3 className="text-3xl font-black text-gray-900 mb-2">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h3>
        <p className="text-gray-400 font-bold text-sm leading-relaxed">
          {isLogin ? 'Nhập thông tin để tiếp tục học tập.' : 'Trở thành chuyên gia an toàn thực phẩm ngay hôm nay.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex-1">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
          <input
            type="email" required placeholder="name@email.com"
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#007c76] outline-none transition-all font-bold text-gray-700 shadow-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mật khẩu</label>
          <input
            type="password" required placeholder="••••••••"
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#007c76] outline-none transition-all font-bold text-gray-700 shadow-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-[#007c76] text-white font-black rounded-2xl shadow-xl shadow-teal-100 flex items-center justify-center gap-3 transition-all disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="animate-spin" size={24} /> : (isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ NGAY')}
        </button>

        {!isLogin && (
          <p className="text-[10px] text-gray-400 font-medium text-center px-4">
            Bằng việc nhấn Đăng ký, bạn đồng ý với <button type="button" onClick={() => setShowTerms(true)} className="text-[#007c76] font-black underline">Điều khoản & Dịch vụ</button> của chúng tôi.
          </p>
        )}
      </form>
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </div>
  );
};

export default Login;
