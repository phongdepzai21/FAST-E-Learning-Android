import React, { useState } from 'react';
import { 
  LogOut, 
  BookOpen, 
  TrendingUp,
  Award,
  Bell,
  Search,
  LayoutDashboard,
  GraduationCap,
  MessageSquare,
  Zap,
  Star,
  Crown,
  CheckCircle2,
  Menu
} from 'lucide-react';
import { COLORS, MOCK_USER, MOCK_COURSES, MEMBERSHIP_PLANS } from '../constants.ts';

interface AccountProps {
  onLogout: () => void;
}

const Account: React.FC<AccountProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Tiến độ tổng', value: '68%', icon: <TrendingUp size={18} />, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Chứng chỉ', value: '12', icon: <Award size={18} />, color: 'bg-amber-50 text-amber-600' },
    { label: 'Gói hiện tại', value: 'Professional', icon: <Zap size={18} />, color: 'bg-teal-50 text-teal-600' },
    { label: 'Điểm FAST', value: '2.5k', icon: <Star size={18} />, color: 'bg-blue-50 text-blue-600' },
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Bảng tin', icon: <LayoutDashboard size={20} /> },
    { id: 'plans', label: 'Gói Hội viên', icon: <Crown size={20} /> },
    { id: 'courses', label: 'Khóa học', icon: <BookOpen size={20} /> },
    { id: 'certs', label: 'Hồ sơ', icon: <GraduationCap size={20} /> },
  ];

  return (
    <div className="bg-[#f8fafb] min-h-screen flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 hidden lg:flex flex-col sticky top-20 h-[calc(100vh-80px)]">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="relative">
              <img src={MOCK_USER.avatar} alt="User" className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h4 className="font-black text-gray-900 leading-tight">{MOCK_USER.name.split(' ').slice(-2).join(' ')}</h4>
              <p className="text-xs font-bold text-teal-600 uppercase tracking-tighter">Pro Member</p>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${
                  activeTab === item.id 
                  ? 'bg-teal-50 text-teal-700 shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-gray-50">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-400 hover:text-red-600 hover:bg-red-50 font-bold text-sm transition-all"
          >
            <LogOut size={20} />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Mobile Header / Navigation */}
      <div className="lg:hidden bg-white border-b border-gray-100 p-4 sticky top-16 z-40 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <img src={MOCK_USER.avatar} className="w-10 h-10 rounded-xl" alt="" />
            <h4 className="font-black text-gray-900 text-sm">Chào, {MOCK_USER.name.split(' ').pop()}!</h4>
         </div>
         <button onClick={onLogout} className="p-2 text-gray-400 hover:text-red-500">
            <LogOut size={20} />
         </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-10 pb-24 lg:pb-10 space-y-8 max-w-7xl mx-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-gray-100">
                  <div className={`p-2 sm:p-3 rounded-2xl w-fit mb-3 sm:mb-4 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <p className="text-lg sm:text-2xl font-black text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-tighter">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                   Đang học tiếp
                </h3>
                <div className="space-y-4">
                  {MOCK_COURSES.map((course) => (
                    <div key={course.id} className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-50 flex items-center gap-4 sm:gap-6 group transition-all shadow-sm">
                      <img src={course.image} className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl object-cover" alt="" />
                      <div className="flex-1">
                        <h4 className="font-bold text-sm sm:text-base text-gray-900">{course.title}</h4>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 sm:h-2 mt-2">
                          <div className="bg-teal-600 h-full rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                      <button className="hidden sm:block px-4 py-2 bg-teal-600 text-white font-bold text-xs rounded-xl shadow-lg">Tiếp tục</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-700 to-teal-900 rounded-[2.5rem] p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-black mb-3">FAST AI Consultant</h3>
                  <p className="text-teal-100 text-xs sm:text-sm mb-6 leading-relaxed">Hỏi tôi bất cứ điều gì về tiêu chuẩn ISO 22000 ngay!</p>
                  <button className="w-full py-3 bg-white text-teal-800 font-bold rounded-2xl shadow-xl hover:bg-teal-50 transition-colors">
                    Hỏi Trợ Lý Ngay
                  </button>
                </div>
                <Zap size={80} className="absolute -bottom-6 -right-6 text-white/5 rotate-12" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div 
                key={plan.id} 
                className={`bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-xl border-2 flex flex-col ${plan.isPopular ? 'border-teal-500 scale-100 md:scale-105' : 'border-gray-50'}`}
              >
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-2xl font-black mt-2 mb-6" style={{ color: plan.color }}>{plan.price}</p>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-gray-600 font-medium">
                      <CheckCircle2 size={16} className="text-teal-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 sm:py-4 rounded-2xl font-black text-sm shadow-xl ${plan.isPopular ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  style={plan.isPopular ? { backgroundColor: COLORS.primary } : {}}
                >
                  Chọn Gói
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === item.id ? 'text-teal-600' : 'text-gray-400'
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Account;