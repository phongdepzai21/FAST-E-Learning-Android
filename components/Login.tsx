
import React, { useState, useMemo, useEffect } from 'react';
import { Mail, Lock, Loader2, AlertCircle, Eye, EyeOff, Shield, CheckCircle2, KeyRound, RefreshCw } from 'lucide-react';
import { LOGO_URL } from '../constants.ts';
import { loginWithEmail, registerWithEmail, signInWithGoogle } from '../services/firebase.ts';
import { generateOTP, sendOTPEmail } from '../services/emailService.ts';

interface LoginProps {
  onSuccess: () => void;
}

type AuthStep = 'INPUT' | 'OTP_VERIFY';

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<AuthStep>('INPUT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // OTP State
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [userOTP, setUserOTP] = useState('');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const passwordStrength = useMemo(() => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  }, [password]);

  const handleStartAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        // Đăng nhập thẳng không cần OTP (hoặc tùy chỉnh nếu muốn)
        await loginWithEmail(email, password);
        onSuccess();
      } else {
        // Đăng ký: Gửi OTP trước
        if (password.length < 6) throw new Error('Mật khẩu quá ngắn.');
        
        const otp = generateOTP();
        setGeneratedOTP(otp);
        
        // Gửi email qua EmailJS
        await sendOTPEmail(email, otp);
        
        setStep('OTP_VERIFY');
        setTimer(60);
      }
    } catch (err: any) {
      setError(err.message || 'Lỗi hệ thống.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (userOTP === generatedOTP) {
      try {
        await registerWithEmail(email, password);
        onSuccess();
      } catch (err: any) {
        setError('Không thể tạo tài khoản. Có thể email đã tồn tại.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Mã OTP không chính xác. Vui lòng thử lại.');
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0) return;
    setIsLoading(true);
    try {
      const otp = generateOTP();
      setGeneratedOTP(otp);
      await sendOTPEmail(email, otp);
      setTimer(60);
      setError(null);
    } catch (err) {
      setError('Gửi lại mã thất bại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      onSuccess();
    } catch (err: any) {
      setError('Không thể đăng nhập bằng Google.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'OTP_VERIFY') {
    return (
      <div className="h-full w-full bg-white flex flex-col p-8 sm:p-12 animate-fade-in">
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <div className="mb-10 text-center">
            <div className="w-20 h-20 bg-teal-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6">
              <KeyRound className="text-[#007c76]" size={32} />
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Xác thực Email</h1>
            <p className="text-gray-400 text-xs mt-2 font-medium">Mã OTP đã được gửi đến <span className="text-gray-900 font-bold">{email}</span></p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3">
              <AlertCircle className="text-red-500 shrink-0" size={18} />
              <p className="text-red-600 text-xs font-bold leading-tight">{error}</p>
            </div>
          )}

          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div className="flex justify-between gap-2">
              <input
                type="text"
                maxLength={6}
                value={userOTP}
                onChange={(e) => setUserOTP(e.target.value.replace(/\D/g, ''))}
                placeholder="Nhập 6 số"
                className="w-full text-center tracking-[1em] text-2xl font-black py-4 bg-gray-50 border border-transparent focus:border-teal-500 focus:bg-white rounded-2xl outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || userOTP.length < 6}
              className="w-full bg-[#007c76] text-white py-4 rounded-2xl font-black text-sm shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Xác nhận & Đăng ký'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={handleResendOTP}
              disabled={timer > 0 || isLoading}
              className={`text-xs font-bold flex items-center justify-center gap-2 mx-auto ${timer > 0 ? 'text-gray-300' : 'text-[#007c76]'}`}
            >
              <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
              {timer > 0 ? `Gửi lại mã sau ${timer}s` : 'Gửi lại mã OTP'}
            </button>
            <button 
              onClick={() => setStep('INPUT')}
              className="mt-4 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-600"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white flex flex-col p-8 sm:p-12 animate-fade-in overflow-y-auto">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full py-10">
        <div className="mb-10 text-center">
          <div className="w-20 h-20 bg-teal-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal-900/5">
            <img src={LOGO_URL} className="w-12 h-12 object-contain" alt="FAST Logo" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            {isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-medium">FAST - Food All Standard & Training</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 animate-shake">
            <AlertCircle className="text-red-500 shrink-0" size={18} />
            <p className="text-red-600 text-xs font-bold leading-tight">{error}</p>
          </div>
        )}

        <form onSubmit={handleStartAuth} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email của bạn</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@vidu.com"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-teal-500 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-transparent focus:border-teal-500 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#007c76] text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-teal-900/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : (isLogin ? 'Đăng nhập' : 'Tiếp tục')}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Hoặc</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-white border border-gray-100 text-gray-600 py-4 rounded-2xl font-bold text-sm shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            Tiếp tục với Google
          </button>
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-gray-50 text-center">
        <p className="text-sm text-gray-400 font-medium">
          {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            className="ml-2 text-[#007c76] font-black hover:underline"
          >
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
