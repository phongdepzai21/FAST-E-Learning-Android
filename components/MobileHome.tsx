
import React from 'react';
import { Play, Flame, Search, Star, ArrowRight, Bot, Crown, Sparkles } from 'lucide-react';
import { ViewState } from '../types.ts';
import { MOCK_COURSES, VIP_EMAILS } from '../constants.ts';

const MobileHome = ({ user, userProfile, onNavigate }) => {
  const firstName = user.displayName ? user.displayName.split(' ')[0] : 'Bạn';
  const isVIP = VIP_EMAILS.includes(user.email || '') || userProfile?.isVIP;

  return (
    <div className="px-6 py-6 space-y-8 pb-32 animate-fade-in">
      {/* Greeting Section */}
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-[#007c76] uppercase tracking-widest">Premium Learning</span>
            {isVIP && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-2 py-0.5 rounded-full text-[8px] font-black shadow-lg shadow-amber-200 animate-pulse">
                <Crown size={8} fill="currentColor" /> VIP
              </div>
            )}
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Chào {firstName}! 👋</h2>
        </div>
        <div className="flex flex-col items-end">
           <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-2xl border border-orange-100 shadow-sm">
             <Flame size={14} className="text-orange-500 fill-orange-500" />
             <span className="text-xs font-black text-orange-700">{userProfile?.streak || 0} Ngày</span>
           </div>
        </div>
      </div>

      {/* Featured AI Banner */}
      <div 
        onClick={() => onNavigate(ViewState.AI_TUTOR)}
        className="relative group overflow-hidden p-8 rounded-[2.5rem] bg-gray-900 text-white shadow-2xl transition-all active:scale-[0.97]"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#007c76] blur-[80px] opacity-40"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500 blur-[60px] opacity-20"></div>
        
        <div className="relative z-10 space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Sparkles size={14} className="text-teal-400" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-400">FAST AI CONSULTANT</span>
          </div>
          <h3 className="text-2xl font-black leading-tight">Gặp gỡ Trợ lý <br/>An toàn Thực phẩm</h3>
          <p className="text-gray-400 text-xs font-medium leading-relaxed max-w-[200px]">Giải đáp mọi thắc mắc về HACCP & ISO trong tích tắc.</p>
          <button className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-2xl text-xs font-black shadow-xl">
            TRÒ CHUYỆN NGAY
            <ArrowRight size={14} />
          </button>
        </div>
        <Bot size={180} className="absolute -bottom-10 -right-10 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Điểm tích lũy</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-gray-900">{isVIP ? 'UNLIMITED' : (userProfile?.points || 0)}</span>
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Khóa học</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-gray-900">{userProfile?.completedCourses || 0}/12</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
               {/* Fix: Changed non-standard 'size' prop to 'width' and 'height' for SVGSVGElement */}
               <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Courses */}
      <section className="space-y-5">
        <div className="flex justify-between items-center px-1">
          <h4 className="font-black text-gray-900 text-lg">Bài học của bạn</h4>
          <button onClick={() => onNavigate(ViewState.COURSES)} className="text-[10px] font-black text-[#007c76] uppercase tracking-widest">Xem tất cả</button>
        </div>
        <div className="space-y-4">
          {MOCK_COURSES.map((course) => (
            <div key={course.id} className="group bg-white p-4 rounded-[2rem] shadow-sm border border-gray-50 flex items-center gap-4 active:bg-gray-50 transition-all">
               <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden shadow-inner bg-gray-100">
                  <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={24} className="text-white fill-white" />
                  </div>
               </div>
               <div className="flex-1 min-w-0 py-1">
                  <span className="text-[8px] font-black text-[#007c76] uppercase tracking-widest bg-teal-50 px-2 py-0.5 rounded-full">{course.tags[0]}</span>
                  <h5 className="font-bold text-gray-900 text-sm mt-1 truncate">{course.title}</h5>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#007c76] to-teal-400 rounded-full" style={{width: `${course.progress}%`}}></div>
                    </div>
                    <span className="text-[10px] font-black text-gray-400">{course.progress}%</span>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MobileHome;
