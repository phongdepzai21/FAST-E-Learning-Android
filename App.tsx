import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseList from './components/CourseList';
import AITutor from './components/AITutor';
import Footer from './components/Footer';
import Login from './components/Login';
import Account from './components/Account';
import { ViewState } from './types';
import { COLORS } from './constants';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LOGIN);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView(ViewState.ACCOUNT);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView(ViewState.LOGIN);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.LOGIN:
        return <Login onSuccess={handleLoginSuccess} />;
      case ViewState.HOME:
        return (
          <>
            <Hero onStart={() => isLoggedIn ? setCurrentView(ViewState.COURSES) : setCurrentView(ViewState.LOGIN)} />
            <CourseList />
          </>
        );
      case ViewState.COURSES:
        return (
          <div className="pt-8">
            <CourseList />
          </div>
        );
      case ViewState.AI_TUTOR:
        return <AITutor />;
      case ViewState.ACCOUNT:
        return isLoggedIn ? <Account onLogout={handleLogout} /> : <Login onSuccess={handleLoginSuccess} />;
      case ViewState.ABOUT:
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h2 className="text-4xl font-extrabold mb-6" style={{color: COLORS.primary}}>Về FAST E-Learning</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
                    FAST (Food All Standard & Training) được thành lập với sứ mệnh nâng cao chất lượng an toàn thực phẩm 
                    thông qua giáo dục và công nghệ.
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-xl mb-3 text-gray-800">Sứ Mệnh</h3>
                        <p className="text-gray-500">Phổ cập kiến thức chuẩn hóa về an toàn thực phẩm cho mọi doanh nghiệp.</p>
                    </div>
                    <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-xl mb-3 text-gray-800">Tầm Nhìn</h3>
                        <p className="text-gray-500">Trở thành nền tảng đào tạo số 1 về tiêu chuẩn chất lượng thực phẩm.</p>
                    </div>
                    <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-xl mb-3 text-gray-800">Giá Trị Cốt Lõi</h3>
                        <p className="text-gray-500">Kiến thức chuẩn xác - Phát triển bền vững.</p>
                    </div>
                </div>
            </div>
        );
      default:
        return <Login onSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#374151] bg-[#f8fafb]">
      {/* Hide Navbar completely on Login screen as requested */}
      {currentView !== ViewState.LOGIN && (
        <Navbar currentView={currentView} onChangeView={setCurrentView} isLoggedIn={isLoggedIn} />
      )}
      <main className="flex-grow">
        {renderContent()}
      </main>
      {currentView !== ViewState.LOGIN && currentView !== ViewState.ACCOUNT && <Footer />}
    </div>
  );
}

export default App;