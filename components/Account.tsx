import React, { useState } from 'react';
import { 
  Settings, 
  LogOut, 
  BookOpen, 
  Trophy, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Award,
  Bell,
  Search,
  LayoutDashboard,
  GraduationCap,
  MessageSquare,
  FileText,
  Zap,
  Star,
  Crown,
  CheckCircle2
} from 'lucide-react';
import { COLORS, MOCK_USER, MOCK_COURSES, MEMBERSHIP_PLANS } from '../constants';

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
    { id: 'dashboard', label: 'Bảng điều khiển', icon: <LayoutDashboard size={20} /> },
    { id: 'plans', label: 'Gói Hội viên', icon: <Crown size={20} /> },
    { id: 'courses', label: 'Khóa học của tôi', icon: <BookOpen size={20} /> },
    { id: 'certs', label: 'Chứng chỉ & Hồ sơ', icon: <GraduationCap size={20} /> },
    { id: 'ai', label: 'FAST AI Tư vấn', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="bg-[#f8fafb] min-h-screen flex">
      {/* Sidebar */}
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

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-10 space-y-10 max-w-7xl mx-auto overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Xin chào, {MOCK_USER.name}! 👋</h1>
            <p className="text-gray-500 font-medium">Bắt đầu hành trình nâng tầm an toàn thực phẩm chuẩn quốc tế.</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Tìm kiếm..." className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none shadow-sm" />
            </div>
            <button className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-400 relative hover:text-teal-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={`p-3 rounded-2xl w-fit mb-4 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-black text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Learning Content */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <Clock className="text-teal-600" /> Đang học tiếp
                </h3>
                <div className="space-y-4">
                  {MOCK_COURSES.map((course) => (
                    <div key={course.id} className="bg-white p-5 rounded-3xl border border-gray-50 flex items-center gap-6 group hover:border-teal-100 transition-all shadow-sm">
                      <img src={course.image} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt="" />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors">{course.title}</h4>
                        <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                          <div className="bg-teal-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-teal-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-teal-600/20">Tiếp tục</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick AI Card */}
              <div className="bg-gradient-to-br from-teal-700 to-teal-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden h-fit">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4">FAST AI Assistant</h3>
                  <p className="text-teal-100 text-sm mb-6 leading-relaxed">Bạn có câu hỏi về ISO 22000? Đừng ngần ngại hỏi tôi ngay!</p>
                  <button className="w-full py-3 bg-white text-teal-800 font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2 hover:bg-teal-50 transition-colors">
                    <MessageSquare size={18} />
                    Bắt đầu hỏi
                  </button>
                </div>
                <Zap size={120} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">Chọn gói đào tạo của bạn</h2>
              <p className="text-gray-500 font-medium max-w-2xl mx-auto">Nâng cấp tài khoản để truy cập vào lộ trình chuyên gia và nhận chứng chỉ quốc tế.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {MEMBERSHIP_PLANS.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`bg-white rounded-[2.5rem] p-8 shadow-xl border-2 transition-all hover:-translate-y-2 flex flex-col ${plan.isPopular ? 'border-teal-500 scale-105' : 'border-gray-50'}`}
                >
                  {plan.isPopular && (
                    <span className="bg-teal-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full w-fit mb-4">Phổ biến nhất</span>
                  )}
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-2xl font-black mt-2" style={{ color: plan.color }}>{plan.price}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50" style={{ color: plan.color }}>
                      {plan.icon === 'Crown' ? <Crown size={32} /> : plan.icon === 'Zap' ? <Zap size={32} /> : <BookOpen size={32} />}
                    </div>
                  </div>
                  <ul className="space-y-4 flex-1 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                        <CheckCircle2 size={18} className="text-teal-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button 
                    className={`w-full py-4 rounded-2xl font-black text-sm shadow-xl transition-all ${plan.isPopular ? 'bg-teal-600 text-white shadow-teal-600/20' : 'bg-gray-100 text-gray-700'}`}
                    style={plan.isPopular ? { backgroundColor: COLORS.primary } : {}}
                  >
                    Chọn Gói Này
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Account;