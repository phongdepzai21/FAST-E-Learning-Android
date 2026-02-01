
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

function App() {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewStateType>(ViewState.HOME);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const isHardcodedVIP = VIP_EMAILS.includes(firebaseUser.email || '');
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          setUserProfile(isHardcodedVIP ? { ...profile, isVIP: true, plan: 'VIP Executive' } : profile);
        } catch (err) {
          if (isHardcodedVIP) setUserProfile({ isVIP: true, plan: 'VIP Executive', points: 9999 });
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isAuthLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-teal-50 border-t-[#007c76] rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-black text-[#007c76] text-xs">F</div>
        </div>
        <span className="mt-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] animate-pulse">FAST E-Learning</span>
      </div>
    );
  }

  if (!user) return <Login onSuccess={() => setCurrentView(ViewState.HOME)} />;

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME: return <MobileHome user={user} userProfile={userProfile} onNavigate={setCurrentView} />;
      case ViewState.COURSES: return <div className="h-full overflow-y-auto pb-24"><CourseList /></div>;
      case ViewState.AI_TUTOR: return <AITutor />;
      case ViewState.ACCOUNT: return <Account user={user} userProfile={userProfile} onLogout={logoutUser} />;
      default: return <MobileHome user={user} userProfile={userProfile} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#f8fafb]">
      {currentView !== ViewState.ACCOUNT && (
        <header className="px-6 pt-6 pb-4 flex justify-between items-center bg-white/80 backdrop-blur-xl sticky top-0 z-40 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#007c76] to-[#005c56] rounded-2xl flex items-center justify-center shadow-lg shadow-teal-900/20">
               <span className="text-white font-black text-lg">F</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-gray-900 text-base tracking-tighter leading-none">FAST</span>
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">E-Learning Platform</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 relative">
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </button>
            <button onClick={() => setCurrentView(ViewState.ACCOUNT)} className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white shadow-md">
              <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} className="w-full h-full object-cover" alt="user" />
            </button>
          </div>
        </header>
      )}
      <main className="flex-grow overflow-y-auto">
        {renderContent()}
      </main>
      <Navbar currentView={currentView} onChangeView={setCurrentView} user={user} />
    </div>
  );
}

export default App;
