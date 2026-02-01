
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import MobileHome from './components/MobileHome.tsx';
import CourseList from './components/CourseList.tsx';
import AITutor from './components/AITutor.tsx';
import Login from './components/Login.tsx';
import Account from './components/Account.tsx';
import { ViewState, ViewStateType } from './types.ts';
import { auth, onAuthStateChanged, User, logoutUser } from './services/firebase.ts';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewStateType>(ViewState.HOME);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setCurrentView(ViewState.HOME);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-[100]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-teal-100 border-t-[#007c76] rounded-full animate-spin"></div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">FAST E-Learning</span>
        </div>
      </div>
    );
  }

  // NẾU CHƯA ĐĂNG NHẬP: Bắt buộc hiển thị màn hình Login
  if (!user) {
    return <Login onSuccess={() => setCurrentView(ViewState.HOME)} />;
  }

  // NẾU ĐÃ ĐĂNG NHẬP: Hiển thị giao diện chính của App
  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <MobileHome user={user} onNavigate={setCurrentView} />;
      case ViewState.COURSES:
        return <div className="pb-24"><CourseList /></div>;
      case ViewState.AI_TUTOR:
        return <AITutor />;
      case ViewState.ACCOUNT:
        return <Account user={user} onLogout={handleLogout} />;
      default:
        return <MobileHome user={user} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafb] flex flex-col font-sans max-w-md mx-auto shadow-2xl relative overflow-x-hidden">
      {/* Top Header - Đơn giản cho Mobile */}
      {currentView !== ViewState.ACCOUNT && (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#007c76] rounded-xl flex items-center justify-center shadow-lg shadow-teal-900/10">
               <span className="text-white font-black text-sm">F</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-gray-900 text-sm tracking-tighter leading-none">FAST</span>
              <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Standard & Training</span>
            </div>
          </div>
          <button 
            onClick={() => setCurrentView(ViewState.ACCOUNT)} 
            className="w-9 h-9 rounded-xl overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100"
          >
            <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="avatar" />
          </button>
        </header>
      )}

      <main className="flex-grow overflow-y-auto">
        {renderContent()}
      </main>

      {/* Bottom Navigation Bar */}
      <Navbar currentView={currentView} onChangeView={setCurrentView} user={user} />
    </div>
  );
}

export default App;
