
import React from 'react';
import { Play, Flame, Search, Bell, Star, ArrowRight, Bot } from 'lucide-react';
import { ViewState, ViewStateType } from '../types.ts';
import { COLORS, MOCK_COURSES } from '../constants.ts';
import { User } from '../services/firebase.ts';

interface MobileHomeProps {
  user: User;
  onNavigate: (view: ViewStateType) => void;
}

const MobileHome: React.FC<MobileHomeProps> = ({ user, onNavigate }) => {
  const firstName = user.displayName ? user.displayName.split(' ')[0] : 'Bạn';

  return (
    <div className="px-6 py-6 space-y-8 pb-24 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Chào mừng trở lại,</p>
          <h2 className="text-2xl font-black text-gray-900 leading-none">{firstName}! 👋</h2>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 bg-orange-50 rounded-full border border-orange-100">
          <Flame size={14} className="text-orange-500 fill-orange-500" />
          <span className="text-xs font-black text-orange-700">12 Ngày</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
        <input 
          type="text" 
          placeholder="Tìm khóa học HACCP, ISO..." 
          className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-[#007c76] transition-all text-sm font-medium"
        />
      </div>

      {/* Featured Banner - AI Tutor */}
      <div 
        onClick={() => onNavigate(ViewState.AI_TUTOR)}
        className="relative overflow-hidden p-6 rounded-[2rem] bg-gradient-to-br from-[#007c76] to-[#005c56] text-white shadow-xl shadow-teal-900/20 active:scale-[0.98] transition-transform"
      >
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-white/20 rounded-md text-[10px] font-black uppercase tracking-widest">AI Consultant</span>
          </div>
          <h3 className="text-xl font-black leading-tight">Cần tư vấn ngay <br/>về tiêu chuẩn ISO?</h3>
          <button className="flex items-center gap-2 text-xs font-bold bg-white text-[#007c76] px-4 py-2 rounded-xl shadow-lg">
            Hỏi trợ lý FAST
            <ArrowRight size={14} />
          </button>
        </div>
        <Bot size={120} className="absolute -bottom-6 -right-6 text-white/10 rotate-12" />
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Khóa học</p>
          <p className="text-xl font-black text-gray-900">04 / 12</p>
          <div className="w-full bg-gray-100 h-1 rounded-full mt-2">
            <div className="bg-teal-500 h-full rounded-full" style={{width: '33%'}}></div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Chứng chỉ</p>
          <p className="text-xl font-black text-gray-900">02</p>
          <Star size={16} className="text-yellow-400 fill-yellow-400 mt-1" />
        </div>
      </div>

      {/* Continue Learning */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-black text-gray-900">Đang học tiếp</h4>
          <button className="text-xs font-bold text-[#007c76]" onClick={() => onNavigate(ViewState.COURSES)}>Tất cả</button>
        </div>
        <div className="space-y-4">
          {MOCK_COURSES.slice(0, 2).map((course) => (
            <div 
              key={course.id}
              className="flex items-center gap-4 bg-white p-4 rounded-[1.5rem] shadow-sm active:bg-gray-50 transition-colors"
            >
              <div className="relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden bg-gray-100">
                <img src={course.image} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Play size={16} className="text-white fill-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-sm text-gray-900 truncate">{course.title}</h5>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{course.level} • {course.duration}</p>
                <div className="flex items-center gap-2 mt-2">
                   <div className="flex-1 bg-gray-100 h-1 rounded-full">
                     <div className="bg-[#007c76] h-full rounded-full" style={{width: `${course.progress}%`}}></div>
                   </div>
                   <span className="text-[9px] font-black text-gray-400">{course.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {['HACCP 2024', 'ISO 22000', 'FSSC v6', 'GMP Standard'].map((tag, i) => (
          <button key={i} className="shrink-0 px-4 py-2 bg-teal-50 text-[#007c76] text-xs font-black rounded-xl border border-teal-100">
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileHome;
