import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare } from 'lucide-react';
import { GlassCard } from './UI';

const PRESET_PROMPTS = [
  "แนะนำ Project สำหรับ Beginner หน่อย",
  "ขออธิบาย Concept ของ RAG แบบง่ายๆ",
  "GitHub Flow คืออะไร?",
  "ทำไมต้องใช้ Vector Database?"
];

const MOCK_RESPONSES: Record<string, string> = {
  "default": "ผมเป็น AI Mentor จำลอง (Simulation Mode) ในเวอร์ชันเต็มผมจะสามารถเชื่อมต่อกับ LLM เพื่อตอบคำถามเชิงลึกได้ ตอนนี้แนะนำให้ลองกดดู Projects ในหน้า Roadmap ครับ",
  "RAG": "RAG (Retrieval-Augmented Generation) คือเทคนิคที่ช่วยให้ AI ตอบคำถามจากข้อมูลส่วนตัวของเราได้ โดยการนำข้อมูลไปค้นหาใน Vector DB ก่อน แล้วส่งให้ AI สรุปครับ",
  "Project": "สำหรับ Beginner แนะนำ Project 'CLI Data Processor' ใน Phase 1 ครับ เป็นการฝึก Logic และ File Handling ที่ดีมาก",
  "Git": "GitHub Flow เน้นความเรียบง่าย: 1. Create Branch 2. Commit 3. Open PR 4. Merge เหมาะกับทีมที่ Deploy บ่อยๆ ครับ"
};

export const AIMentor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "สวัสดีครับ! ผมคือ AI Mentor ผู้ช่วยส่วนตัวของคุณ ติดขัดตรงไหนถามได้เลยครับ" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add User Message
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput("");

    // Simulate AI Delay & Response
    setTimeout(() => {
      let response = MOCK_RESPONSES['default'];
      if (text.toLowerCase().includes('rag')) response = MOCK_RESPONSES['RAG'];
      else if (text.toLowerCase().includes('project')) response = MOCK_RESPONSES['Project'];
      else if (text.toLowerCase().includes('git')) response = MOCK_RESPONSES['Git'];

      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Trigger */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-brand-500 text-slate-900 shadow-[0_0_20px_var(--color-accent-primary-dim)] hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Bot size={28} />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px] md:w-[400px] animate-slide-up">
          <GlassCard className="flex flex-col h-[500px] p-0 border-brand-500/50 shadow-2xl relative overflow-hidden">
            
            {/* Header */}
            <div className="p-4 bg-brand-500/10 border-b border-brand-500/20 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-2 font-bold text-brand-400">
                <Sparkles size={18} /> AI Mentor <span className="text-[10px] bg-brand-500 text-slate-900 px-2 py-0.5 rounded-full">BETA</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><X size={20}/></button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' 
                    ? 'bg-brand-500 text-slate-900 rounded-br-none' 
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div className="p-2 flex gap-2 overflow-x-auto scrollbar-hide border-t border-slate-800 bg-slate-900/50">
               {PRESET_PROMPTS.map((p, i) => (
                 <button key={i} onClick={() => handleSend(p)} className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-brand-400 hover:bg-brand-500/10 transition-colors">
                   {p}
                 </button>
               ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Ask about code, concepts..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
              />
              <button onClick={() => handleSend(input)} className="p-2 bg-brand-500 text-slate-900 rounded-lg hover:bg-brand-400">
                <Send size={18} />
              </button>
            </div>
            
          </GlassCard>
        </div>
      )}
    </>
  );
};