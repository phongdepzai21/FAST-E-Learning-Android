
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import MobileHome from './components/MobileHome.tsx';
import CourseList from './components/CourseList.tsx';
import AITutor from './components/AITutor.tsx';
import Login from './components/Login.tsx';
import Account from './components/Account.tsx';
import { ViewState, ViewStateType } from './types.ts';
import { VIP_EMAILS } from './constants.ts';
import { auth, onAuthStateChanged, logoutUser, getUserProfile } from './services/firebase.ts';
import { GraduationCap, Bot, Home, User as UserIcon, Bell, Search, LogOut } from 'lucide-react';

function App() {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewStateType>(ViewState.HOME);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser);
          const isHardcodedVIP = VIP_EMAILS.includes(firebaseUser.email || '');
          const profile = await getUserProfile(firebaseUser.uid);
          setUserProfile(isHardcodedVIP ? { ...profile, isVIP: true, plan: 'VIP Executive' } : profile);
        } else {
          setUser(null);
          setUserProfile(null);
        }
      } catch (err) {
        console.error("Auth process error:", err);
      } finally {
        setIsAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isAuthLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white p-10 text-center">
        <div className="w-12 h-12 border-4 border-teal-50 border-t-[#007c76] rounded-full animate-spin mb-6"></div>
        <span className="text-[11px] font-black text-[#007c76] uppercase tracking-[0.3em] animate-pulse">Khởi động FAST...</span>
      </div>
    );
  }

  if (!user) return <Login onSuccess={() => setCurrentView(ViewState.HOME)} />;

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME: return <MobileHome user={user} userProfile={userProfile} onNavigate={setCurrentView} />;
      case ViewState.COURSES: return <CourseList />;
      case ViewState.AI_TUTOR: return <AITutor />;
      case ViewState.ACCOUNT: return <Account user={user} userProfile={userProfile} onLogout={logoutUser} />;
      default: return <MobileHome user={user} userProfile={userProfile} onNavigate={setCurrentView} />;
    }
  };

  const sidebarItems = [
    { label: 'Trang chủ', value: ViewState.HOME, icon: <Home size={22} /> },
    { label: 'Khóa học', value: ViewState.COURSES, icon: <GraduationCap size={22} /> },
    { label: 'FAST AI', value: ViewState.AI_TUTOR, icon: <Bot size={22} /> },
    { label: 'Tài khoản', value: ViewState.ACCOUNT, icon: <UserIcon size={22} /> },
  ];

  return (
    <div className="h-screen w-full flex bg-[#f8fafb] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-gray-100 flex-col flex-shrink-0">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gradient-to-br from-[#007c76] to-[#005c56] rounded-2xl flex items-center justify-center shadow-lg shadow-teal-900/20">
              <span className="text-white font-black text-xl">F</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-gray-900 text-lg tracking-tighter leading-none">FAST</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">E-Learning</span>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setCurrentView(item.value)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-sm ${
                  currentView === item.value 
                  ? 'bg-teal-50 text-[#007c76]' 
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
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 mb-4">
             <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} className="w-10 h-10 rounded-xl object-cover" alt="user" />
             <div className="flex-1 min-w-0">
               <p className="text-sm font-black text-gray-900 truncate">{user.displayName || 'Học viên'}</p>
               <p className="text-[10px] font-bold text-[#007c76] uppercase tracking-tighter">{userProfile?.plan || 'Standard'}</p>
             </div>
          </div>
          <button onClick={logoutUser} className="w-full py-3 rounded-xl text-xs font-black text-red-400 hover:text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative h-full">
        {/* Responsive Header */}
        <header className="px-6 h-20 sm:h-24 flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40 w-full shrink-0">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="w-10 h-10 bg-gradient-to-br from-[#007c76] to-[#005c56] rounded-2xl flex items-center justify-center shadow-lg">
               <span className="text-white font-black text-lg">F</span>
            </div>
            <span className="font-black text-gray-900 text-lg tracking-tighter">FAST</span>
          </div>

          <div className="hidden sm:flex items-center bg-gray-50 rounded-2xl px-4 py-2.5 w-full max-w-md mx-4 border border-transparent focus-within:border-teal-200 focus-within:bg-white transition-all">
            <Search size={18} className="text-gray-300" />
            <input type="text" placeholder="Tìm khóa học, tài liệu..." className="bg-transparent border-none outline-none ml-3 text-sm font-medium w-full" />
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <button className="relative w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button onClick={() => setCurrentView(ViewState.ACCOUNT)} className="lg:hidden w-10 h-10 rounded-xl overflow-hidden shadow-sm">
              <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} className="w-full h-full object-cover" alt="user" />
            </button>
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-inherit scroll-smooth">
          <div className="max-w-7xl mx-auto w-full h-full">
            {renderContent()}
          </div>
        </main>

        {/* Mobile Navigation */}
        <div className="lg:hidden shrink-0">
          <Navbar currentView={currentView} onChangeView={setCurrentView} user={user} />
        </div>
      </div>
    </div>
  );
}

export default App;
