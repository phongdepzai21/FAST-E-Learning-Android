
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import { ChatMessage } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Xin chào! Tôi là FAST AI Consultant. Tôi có thể giúp gì cho bạn về HACCP, ISO 22000 hay TCVN hôm nay?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    try {
      const responseText = await getGeminiResponse(inputValue);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: new Date() }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Lỗi kết nối. Hãy thử lại!", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafb] view-transition">
      <div className="bg-white border-b border-gray-100 p-5 flex items-center gap-4 sticky top-0 z-10">
        <div className="w-11 h-11 rounded-2xl bg-teal-50 flex items-center justify-center">
          <Bot size={22} className="text-[#007c76]" />
        </div>
        <div>
          <h2 className="text-sm font-black text-gray-900 leading-none">FAST AI Consultant</h2>
          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Trực tuyến
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-gray-100 text-gray-500' : 'bg-teal-50 text-[#007c76]'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm font-medium ${msg.role === 'user' ? 'bg-[#007c76] text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-50 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="max-w-[80%] flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center"><Bot size={16} className="text-[#007c76]" /></div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-50 shadow-sm flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-[#007c76]" />
                <span className="text-[10px] font-bold text-gray-400">Đang tra cứu tiêu chuẩn...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100 pb-8">
        <div className="flex gap-2 bg-gray-50 rounded-2xl p-1.5 pr-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-500/10 border border-transparent focus-within:border-teal-100 transition-all">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Tra cứu HACCP, ISO 22000..."
            className="flex-1 bg-transparent px-4 py-3 text-[13px] font-medium outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="w-11 h-11 rounded-xl bg-[#007c76] text-white flex items-center justify-center shadow-lg shadow-teal-900/10 active:scale-90 disabled:opacity-50 transition-all"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
