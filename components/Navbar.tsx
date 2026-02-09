
import React from 'react';
import { GraduationCap, Bot, Home, User as UserIcon, LayoutGrid } from 'lucide-react';
import { ViewState, ViewStateType } from '../types.ts';
import { User } from '../services/firebase.ts';

interface NavbarProps {
  currentView: ViewStateType;
  onChangeView: (view: ViewStateType) => void;
  user?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView, user = null }) => {
  if (!user) return null;

  const tabs = [
    { label: 'Trang chủ', value: ViewState.HOME, icon: <Home size={22} /> },
    { label: 'Khóa học', value: ViewState.COURSES, icon: <GraduationCap size={22} /> },
    { label: 'FAST AI', value: ViewState.AI_TUTOR, icon: <Bot size={22} />, special: true },
    { label: 'Danh mục', value: ViewState.COURSES, icon: <LayoutGrid size={22} /> },
    { label: 'Cá nhân', value: ViewState.ACCOUNT, icon: <UserIcon size={22} /> },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-2xl border-t border-gray-100 w-full flex-shrink-0 z-50 lg:hidden">
      <div 
        className="flex justify-around items-center h-20 px-2" 
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.75rem)' }}
      >
        {tabs.map((tab, i) => {
          const isActive = currentView === tab.value;
          
          if (tab.special) {
            return (
              <button
                key={i}
                onClick={() => onChangeView(tab.value)}
                className="relative -top-6 flex flex-col items-center"
              >
                <div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 ring-4 ring-white
                    ${isActive ? 'bg-[#007c76] scale-110' : 'bg-gray-900'}
                  `}
                >
                  <Bot size={isActive ? 28 : 24} className="text-white" />
                </div>
                <span className={`text-[8px] font-black mt-1.5 uppercase tracking-widest ${isActive ? 'text-[#007c76]' : 'text-gray-400'}`}>
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={i}
              onClick={() => onChangeView(tab.value)}
              className="flex flex-col items-center justify-center flex-1 transition-all active:scale-95 py-2"
            >
              <div className={`transition-all duration-300 ${isActive ? 'text-[#007c76] scale-110' : 'text-gray-300'}`}>
                {tab.icon}
              </div>
              <span className={`text-[8px] font-black mt-1 uppercase tracking-tighter transition-colors ${isActive ? 'text-[#007c76]' : 'text-gray-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
