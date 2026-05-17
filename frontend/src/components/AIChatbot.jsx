import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I am your AI HR Assistant. Ask me to compare candidate skills or generate interview questions!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('https://candidate-shortlister-backend.onrender.com/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all duration-300 hover:scale-110 flex items-center justify-center border border-purple-400/20"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Windows Container Panel */}
      {isOpen && (
        <div className="w-[350px] h-[480px] bg-gray-950 border border-gray-800 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden backdrop-blur-xl relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500"></div>
          
          {/* Header */}
          <div className="p-4 bg-gray-900/60 border-b border-gray-800 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Bot size={18} className="text-purple-400" />
              <span className="text-sm font-black tracking-wide text-white">AI HR Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-1 rounded-lg transition-all">
              <X size={16} />
            </button>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-none text-xs">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl font-medium leading-relaxed whitespace-pre-wrap shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-purple-600 text-white rounded-tr-none' 
                    : 'bg-gray-900 text-gray-300 border border-gray-800 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-900 border border-gray-800 text-purple-400 p-3 rounded-xl rounded-tl-none font-bold font-mono animate-pulse">
                  AI is processing...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form Input Control */}
          <form onSubmit={handleSendMessage} className="p-3 bg-gray-900/40 border-t border-gray-800 flex gap-2 items-center shrink-0">
            <input 
              type="text" 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder="Ask for interview questions..." 
              className="flex-1 p-2.5 rounded-xl bg-gray-950 border border-gray-800 text-xs text-white focus:outline-none focus:border-purple-500 transition-all font-medium"
            />
            <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white p-2.5 rounded-xl transition-all shadow-md">
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}