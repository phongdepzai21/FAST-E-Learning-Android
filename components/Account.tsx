
import React, { useState } from 'react';
import { 
  LogOut, 
  BookOpen, 
  TrendingUp,
  Award,
  LayoutDashboard,
  GraduationCap,
  Zap,
  Star,
  Crown,
  CheckCircle2,
  Terminal,
  Activity,
  Database,
  ShieldCheck,
  FileText,
  Lock,
  ChevronRight,
  X
} from 'lucide-react';
import { COLORS, MOCK_COURSES, MEMBERSHIP_PLANS } from '../constants.ts';
import { User } from '../services/firebase.ts';

interface AccountProps {
  user: User;
  userProfile?: any;
  onLogout: () => void;
}

// Fixed SimpleModal definition by making children optional to prevent TS missing prop errors in JSX
const SimpleModal = ({ title, isOpen, onClose, children }: { title: string, isOpen: boolean, onClose: () => void, children?: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 max-h-[85vh] overflow-y-auto animate-slide-up relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-400"><X size={20} /></button>
        </div>
        <div className="text-gray-600 text-sm leading-relaxed space-y-4">
          {children}
        </div>
        <button onClick={onClose} className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl mt-8">ĐÃ HIỂU</button>
      </div>
    </div>
  );
};

const Account: React.FC<AccountProps> = ({ user, userProfile, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modalType, setModalType] = useState<'tos' | 'privacy' | null>(null);

  const isVIP = userProfile?.isVIP || userProfile?.plan?.toLowerCase().includes('vip');

  const stats = [
    { label: 'Tiến độ tổng', value: `${userProfile?.progress || 0}%`, icon: <TrendingUp size={18} />, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Chứng chỉ', value: userProfile?.completedCourses || '0', icon: <Award size={18} />, color: 'bg-amber-50 text-amber-600' },
    { label: 'Gói hiện tại', value: userProfile?.plan || 'Standard', icon: <Zap size={18} />, color: 'bg-teal-50 text-teal-600' },
    { label: 'Điểm FAST', value: userProfile?.points || '0', icon: <Star size={18} />, color: 'bg-blue-50 text-blue-600' },
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Bảng tin', icon: <LayoutDashboard size={20} /> },
    { id: 'plans', label: 'Gói Hội viên', icon: <Crown size={20} /> },
    { id: 'courses', label: 'Khóa học', icon: <BookOpen size={20} /> },
    { id: 'settings', label: 'Cài đặt', icon: <ShieldCheck size={20} /> },
  ];

  const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email || 'Guest'}`;
  const displayName = user.displayName || user.email?.split('@')[0] || 'Member';

  return (
    <div className="bg-[#f8fafb] min-h-screen flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 hidden lg:flex flex-col sticky top-20 h-[calc(100vh-80px)]">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="relative">
              <img src={user.photoURL || defaultAvatar} alt="User" className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
              {isVIP && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-400 border-2 border-white rounded-full flex items-center justify-center">
                  <Crown size={12} className="text-white fill-white" />
                </div>
              )}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-black text-gray-900 leading-tight truncate">{displayName}</h4>
              <p className="text-xs font-bold text-teal-600 uppercase tracking-tighter">
                {userProfile?.plan || 'Free Member'}
              </p>
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
        <div className="mt-auto p-8 space-y-4">
           <button onClick={() => setModalType('tos')} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600">Điều khoản</button>
           <button onClick={() => setModalType('privacy')} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 ml-4">Bảo mật</button>
           <button onClick={onLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-400 hover:text-red-600 hover:bg-red-50 font-bold text-sm transition-all border border-transparent hover:border-red-100">
            <LogOut size={20} /> Đăng xuất
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 lg:p-10 pb-24 lg:pb-10 space-y-8 max-w-7xl mx-auto w-full">
        {/* Mobile View */}
        <div className="lg:hidden flex flex-col gap-6">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm flex items-center gap-4">
             <div className="relative">
                <img src={user.photoURL || defaultAvatar} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                {isVIP && <Crown className="absolute -top-2 -left-2 text-amber-500 fill-amber-500 rotate-[-15deg]" size={20} />}
             </div>
             <div className="flex-1">
               <h4 className="font-black text-xl text-gray-900">{displayName}</h4>
               <p className="text-xs font-bold text-teal-600 uppercase tracking-widest">{userProfile?.plan || 'Member'}</p>
             </div>
             <button onClick={onLogout} className="p-3 bg-red-50 text-red-500 rounded-xl active:scale-90 transition-transform"><LogOut size={20} /></button>
          </div>

          <div className="grid grid-cols-2 gap-3">
             {stats.slice(0, 4).map((stat, i) => (
               <div key={i} className="bg-white p-4 rounded-3xl border border-gray-50 shadow-sm flex flex-col items-center text-center">
                 <div className={`p-2 rounded-xl mb-2 ${stat.color}`}>{stat.icon}</div>
                 <span className="text-sm font-black text-gray-900">{stat.value}</span>
                 <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{stat.label}</span>
               </div>
             ))}
          </div>

          <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-50 space-y-1">
            <button onClick={() => setModalType('tos')} className="w-full flex items-center justify-between p-4 rounded-2xl active:bg-gray-50 text-sm font-bold text-gray-700">
               <div className="flex items-center gap-3"><FileText size={18} className="text-gray-400" /> Điều khoản dịch vụ</div>
               <ChevronRight size={16} />
            </button>
            <button onClick={() => setModalType('privacy')} className="w-full flex items-center justify-between p-4 rounded-2xl active:bg-gray-50 text-sm font-bold text-gray-700">
               <div className="flex items-center gap-3"><Lock size={18} className="text-gray-400" /> Chính sách bảo mật</div>
               <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Dashboard Content (Desktop & Mobile) */}
        {activeTab === 'dashboard' && (
          <div className="hidden lg:block space-y-8 animate-fade-in">
            <div className="grid grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
                  <div className={`p-3 rounded-2xl w-fit mb-4 ${stat.color}`}>{stat.icon}</div>
                  <p className="text-2xl font-black text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
            {/* Thêm biểu đồ tiến độ giả định ở đây nếu cần */}
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="grid md:grid-cols-3 gap-8 animate-fade-in py-4">
            {MEMBERSHIP_PLANS.map((plan) => {
              const isCurrent = userProfile?.plan?.toLowerCase() === plan.name.toLowerCase();
              return (
                <div key={plan.id} className={`bg-white rounded-[2.5rem] p-8 shadow-xl border-2 flex flex-col relative ${isCurrent ? 'border-[#007c76] scale-105' : 'border-gray-50'}`}>
                  {isCurrent && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#007c76] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Gói hiện tại</div>}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-2xl font-black mb-6" style={{ color: plan.color }}>{plan.price}</p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                        <CheckCircle2 size={16} className="text-teal-500 shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-4 rounded-2xl font-black text-sm shadow-xl transition-all ${isCurrent ? 'bg-gray-100 text-gray-400' : 'bg-[#007c76] text-white active:scale-95'}`}>
                    {isCurrent ? 'Gói của bạn' : 'Nâng cấp ngay'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modals */}
      <SimpleModal title="Điều khoản sử dụng" isOpen={modalType === 'tos'} onClose={() => setModalType(null)}>
        <p className="font-bold text-gray-900 uppercase text-[10px] tracking-widest">Quy định chung</p>
        <p>FAST E-Learning cung cấp nội dung đào tạo chuyên sâu về an toàn thực phẩm. Học viên có trách nhiệm bảo mật tài khoản cá nhân và không được phép chia sẻ cho người khác.</p>
        <p className="font-bold text-gray-900 uppercase text-[10px] tracking-widest">Quyền lợi VIP</p>
        <p>Thành viên VIP sẽ được truy cập vào tất cả khóa học nâng cao, tài liệu độc quyền và nhận hỗ trợ 1:1 từ chuyên gia thông qua Trợ lý AI nâng cao.</p>
      </SimpleModal>

      <SimpleModal title="Chính sách bảo mật" isOpen={modalType === 'privacy'} onClose={() => setModalType(null)}>
        <p>Dữ liệu của bạn được quản lý bởi Google Firebase Services. Chúng tôi thu thập email và thông tin học tập để cá nhân hóa lộ trình đào tạo.</p>
        <p>Thông tin thanh toán (nếu có) được xử lý qua cổng thanh toán trung gian bảo mật cấp độ ngân hàng, chúng tôi không lưu giữ thông tin thẻ của bạn.</p>
      </SimpleModal>
    </div>
  );
};

export default Account;
