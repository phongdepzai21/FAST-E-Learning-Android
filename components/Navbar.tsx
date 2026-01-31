import React, { useState } from 'react';
import { Menu, X, GraduationCap, Bot, Home, Info, User as UserIcon } from 'lucide-react';
// Import ViewStateType to use as a TypeScript type
import { ViewState, ViewStateType } from '../types.ts';
import { LOGO_URL, COLORS, MOCK_USER } from '../constants.ts';

interface NavbarProps {
  // Use ViewStateType instead of the ViewState object value
  currentView: ViewStateType;
  // Use ViewStateType instead of the ViewState object value
  onChangeView: (view: ViewStateType) => void;
  isLoggedIn?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView, isLoggedIn = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Trang chủ', value: ViewState.HOME, icon: <Home size={18} /> },
    { label: 'Khóa học', value: ViewState.COURSES, icon: <GraduationCap size={18} /> },
    { label: 'AI Tư vấn', value: ViewState.AI_TUTOR, icon: <Bot size={18} /> },
    { label: 'Về FAST', value: ViewState.ABOUT, icon: <Info size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20">
          {/* Logo Section */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group" 
            onClick={() => onChangeView(isLoggedIn ? ViewState.ACCOUNT : ViewState.HOME)}
          >
            <img className="h-8 sm:h-12 w-auto transition-transform group-hover:scale-105" src={LOGO_URL} alt="FAST Logo" />
            <div className="ml-2 sm:ml-3 flex flex-col justify-center">
              <span className="font-black text-xl sm:text-2xl leading-none tracking-tighter" style={{ color: COLORS.primary }}>FAST</span>
              <span className="text-[7px] sm:text-[8px] font-bold tracking-widest uppercase text-gray-400">Food All Standard</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onChangeView(item.value)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-bold transition-all duration-200 rounded-xl
                  ${currentView === item.value 
                    ? `text-[#007c76] bg-teal-50` 
                    : `text-gray-400 hover:text-[#007c76] hover:bg-gray-50`
                  }`}
                style={currentView === item.value ? { color: COLORS.primary } : {}}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            
            {isLoggedIn ? (
              <button 
                onClick={() => onChangeView(ViewState.ACCOUNT)}
                className="flex items-center gap-3 px-4 py-2 bg-gray-50 hover:bg-teal-50 rounded-2xl border border-gray-100 transition-all group"
              >
                <img src={MOCK_USER.avatar} alt="User" className="w-8 h-8 rounded-xl object-cover border border-teal-200" />
                <span className="text-sm font-bold text-gray-700 group-hover:text-teal-700">{MOCK_USER.name.split(' ').pop()}</span>
              </button>
            ) : (
              <button 
                onClick={() => onChangeView(ViewState.LOGIN)}
                className="px-8 py-3 rounded-2xl text-white font-black text-base shadow-xl shadow-teal-600/20 transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: COLORS.primary }}
              >
                Đăng nhập
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-gray-600 bg-gray-50 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-2 animate-fade-in shadow-2xl">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onChangeView(item.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-bold transition-all
                   ${currentView === item.value 
                    ? `bg-teal-50 text-[#007c76]` 
                    : `text-gray-500 hover:bg-gray-50`
                  }`}
                style={currentView === item.value ? { color: COLORS.primary } : {}}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
             <button 
              onClick={() => {
                onChangeView(isLoggedIn ? ViewState.ACCOUNT : ViewState.LOGIN);
                setIsOpen(false);
              }}
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-5 rounded-2xl text-white font-black text-lg shadow-xl"
              style={{ backgroundColor: COLORS.primary }}
            >
              <UserIcon size={20} />
              {isLoggedIn ? 'Hồ sơ cá nhân' : 'Đăng nhập ngay'}
            </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;