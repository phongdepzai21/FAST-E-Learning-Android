
import React from 'react';
import { Play, Flame, Star, ArrowRight, Bot, Crown, Sparkles, ShieldCheck } from 'lucide-react';
import { ViewState } from '../types.ts';
import { MOCK_COURSES, VIP_EMAILS } from '../constants.ts';

const MobileHome = ({ user, userProfile, onNavigate }) => {
  const firstName = user.displayName ? user.displayName.split(' ')[0] : 'Học viên';
  const isVIP = VIP_EMAILS.includes(user.email || '') || userProfile?.isVIP;

  return (
    <div className="px-5 py-6 space-y-8 view-transition pb-10 max-w-2xl mx-auto">
      {/* Greeting */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#007c76]" />
            <span className="text-[10px] font-black text-[#007c76] uppercase tracking-widest">Học viện FAST</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Chào {firstName}! 👋</h2>
          <p className="text-xs text-gray-400 font-medium italic">Học hôm nay, an toàn ngày mai.</p>
        </div>
        {isVIP && (
          <div className="bg-amber-400 text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1.5 shadow-lg shadow-amber-200">
            <Crown size={12} fill="currentColor" /> VIP
          </div>
        )}
      </div>

      {/* AI Hero Banner */}
      <div 
        onClick={() => onNavigate(ViewState.AI_TUTOR)}
        className="relative overflow-hidden p-7 rounded-[2.5rem] bg-[#007c76] text-white shadow-xl shadow-teal-900/10 active:scale-[0.98] transition-all cursor-pointer group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-3xl"></div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <Bot size={20} className="text-teal-200" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-teal-100">Cố vấn Food Safety AI</span>
          </div>
          <h3 className="text-xl font-black leading-tight">Giải đáp HACCP & ISO <br/>ngay lập tức</h3>
          <p className="text-teal-50/80 text-[11px] font-medium max-w-[180px]">Chat với AI để tra cứu tiêu chuẩn TCVN và quy trình kiểm soát mối nguy.</p>
          <button className="bg-white text-[#007c76] px-5 py-2.5 rounded-2xl text-[10px] font-black flex items-center gap-2 group-hover:gap-3 transition-all">
            HỎI AI NGAY
            <ArrowRight size={12} />
          </button>
        </div>
        <Sparkles size={120} className="absolute -bottom-10 -right-10 text-white/5 opacity-20 rotate-12" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm text-center">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Điểm tích lũy</p>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-xl font-black text-gray-900">{userProfile?.points || 0}</span>
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm text-center">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Khóa học</p>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-xl font-black text-gray-900">{userProfile?.completedCourses || 0}/3</span>
            <div className="w-6 h-6 rounded-lg bg-teal-50 flex items-center justify-center text-[#007c76]">
              <Play size={12} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-black text-gray-900 text-lg">Lộ trình đào tạo</h4>
          <button onClick={() => onNavigate(ViewState.COURSES)} className="text-[10px] font-black text-[#007c76] uppercase tracking-widest">Tất cả</button>
        </div>
        <div className="grid gap-4">
          {MOCK_COURSES.map((course) => (
            <div 
              key={course.id} 
              className="group bg-white p-4 rounded-[2rem] shadow-sm border border-gray-50 flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer"
              onClick={() => onNavigate(ViewState.COURSES)}
            >
               <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                  <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
               </div>
               <div className="flex-1 min-w-0">
                  <span className="text-[8px] font-black text-[#007c76] uppercase tracking-widest bg-teal-50 px-2 py-0.5 rounded-full">{course.tags[0]}</span>
                  <h5 className="font-bold text-gray-900 text-[13px] mt-1.5 truncate">{course.title}</h5>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#007c76]" style={{width: `${course.progress}%`}}></div>
                    </div>
                    <span className="text-[9px] font-bold text-gray-400">{course.progress}%</span>
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
