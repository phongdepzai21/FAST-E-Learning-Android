import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { COLORS } from '../constants';
import { ChatMessage } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Xin chào! Tôi là trợ lý AI của FAST. Bạn cần tư vấn gì về các tiêu chuẩn an toàn thực phẩm (ISO, HACCP, GMP...)?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await getGeminiResponse(inputValue);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
       const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
      <div className="bg-white rounded-t-xl shadow-lg border border-gray-200 p-4 flex items-center justify-between" style={{ borderTop: `4px solid ${COLORS.primary}` }}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-teal-50">
            <Bot size={24} style={{ color: COLORS.primary }} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">FAST AI Consultant</h2>
            <p className="text-xs text-gray-500">Hỏi đáp chuyên sâu về tiêu chuẩn thực phẩm</p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gray-50 overflow-y-auto p-4 space-y-4 shadow-inner border-x border-gray-200">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-gray-200' : 'bg-teal-100'}`}
              >
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} style={{ color: COLORS.primary }} />}
              </div>
              <div
                className={`p-3 rounded-lg text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? `text-white rounded-tr-none` 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}
                style={{ backgroundColor: msg.role === 'user' ? COLORS.primary : '#ffffff' }}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex w-full justify-start">
            <div className="flex max-w-[80%] gap-2 flex-row">
               <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                 <Bot size={16} style={{ color: COLORS.primary }} />
               </div>
               <div className="bg-white p-3 rounded-lg rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-2">
                 <Loader2 className="animate-spin text-teal-600" size={16} />
                 <span className="text-sm text-gray-500">FAST AI đang suy nghĩ...</span>
               </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white p-4 rounded-b-xl shadow-lg border border-gray-200 border-t-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Nhập câu hỏi của bạn về HACCP, ISO..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="px-4 py-2 rounded-lg text-white font-medium transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: COLORS.primary }}
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-center text-gray-400 mt-2">
          AI có thể mắc lỗi. Vui lòng kiểm tra lại thông tin quan trọng với chuyên gia.
        </p>
      </div>
    </div>
  );
};

export default AITutor;