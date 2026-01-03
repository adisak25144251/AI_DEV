import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { GlassCard } from './UI';
import { GoogleGenAI } from "@google/genai";
import { ROADMAP_PHASES, GLOSSARY_DATA, BOSS_BATTLES, CAREER_SKILLS } from '../constants';

const PRESET_PROMPTS = [
  "แนะนำ Project สำหรับ Beginner หน่อย",
  "ขออธิบาย Concept ของ RAG แบบง่ายๆ",
  "GitHub Flow คืออะไร?",
  "ทำไมต้องใช้ Vector Database?"
];

// 1. Construct Knowledge Base from App Constants (RAG-lite)
const buildContext = () => {
  const phases = ROADMAP_PHASES.map(p => 
    `- Phase ${p.id}: ${p.title} (${p.description}). Tech: ${p.tools.join(', ')}. Project: ${p.project?.title}`
  ).join('\n');
  
  const glossary = GLOSSARY_DATA.slice(0, 10).map(g => `${g.term}: ${g.definition}`).join('\n');
  
  return `
    [CURRICULUM CONTEXT]
    ${phases}

    [KEY TERMS]
    ${glossary}

    [BOSS BATTLES]
    ${BOSS_BATTLES.map(b => b.title + ": " + b.description).join('\n')}
  `;
};

export const AIMentor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "สวัสดีครับ! ผมคือ AI Mentor ประจำแพลตฟอร์มนี้ ผมรู้ข้อมูลทุก Phase ใน Roadmap ถามเกี่ยวกับบทเรียนหรือปรึกษา Career Path ได้เลยครับ" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    if (isLoading) return;

    // 1. Add User Message
    const userMsg = { role: 'user' as const, text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Initialize Gemini
      // Note: In a real production app, call a backend API route to hide the key.
      // Since this is a client-side demo, we assume process.env.API_KEY is available.
      const apiKey = process.env.API_KEY;
      
      if (!apiKey) {
        throw new Error("API Key not found");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // 3. Construct System Prompt with Context
      const contextData = buildContext();
      const systemInstruction = `
        You are an expert Senior AI Engineer and Mentor for the "AI Dev Platform 2026".
        Your goal is to guide users from Beginner to AI Engineer using the Socratic method (guide them, don't just give code).
        
        [YOUR KNOWLEDGE BASE]:
        ${contextData}

        [INSTRUCTIONS]:
        1. Answer in Thai language (Natural, Encouraging, Professional).
        2. Always reference the specific "Phase" or "Project" in the curriculum if relevant.
        3. If the user asks for code, explain the logic first, then provide a snippet.
        4. Keep answers concise (under 150 words) unless asked for details.
        5. Be motivating!
      `;

      // 4. Call API
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          // Pass simplified history (last 5 turns) to keep context but save tokens
          ...messages.slice(-5).map(m => ({
            role: m.role === 'model' ? 'model' : 'user',
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text }] }
        ],
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7, // Creative but grounded
        }
      });

      const reply = response.text || "ขออภัยครับ ระบบกำลังประมวลผลหนักเกินไป ลองถามใหม่นะครับ";

      setMessages(prev => [...prev, { role: 'model', text: reply }]);

    } catch (error) {
      console.error("AI Error:", error);
      let errorMsg = "ขออภัยครับ เกิดข้อขัดข้องในการเชื่อมต่อกับสมองกล";
      if (!process.env.API_KEY) {
        errorMsg = "System Error: API_KEY is missing in environment variables.";
      }
      setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
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
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px] md:w-[400px] animate-slide-up">
          <GlassCard className="flex flex-col h-[600px] p-0 border-brand-500/50 shadow-2xl relative overflow-hidden bg-slate-950/95">
            
            {/* Header */}
            <div className="p-4 bg-brand-500/10 border-b border-brand-500/20 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-2 font-bold text-brand-400">
                <Sparkles size={18} /> AI Mentor <span className="text-[10px] bg-emerald-500 text-slate-900 px-2 py-0.5 rounded-full font-bold">ONLINE</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><X size={20}/></button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.role === 'model' && (
                     <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center mr-2 border border-brand-500/50 shrink-0">
                        <Bot size={16} className="text-brand-400"/>
                     </div>
                  )}
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user' 
                    ? 'bg-brand-500 text-slate-900 rounded-br-none font-medium' 
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none shadow-lg'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                   <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center mr-2 border border-brand-500/50">
                      <Bot size={16} className="text-brand-400"/>
                   </div>
                   <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-700 flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-brand-400"/>
                      <span className="text-xs text-slate-400">Thinking...</span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {!isLoading && messages.length < 3 && (
              <div className="p-2 flex gap-2 overflow-x-auto scrollbar-hide border-t border-slate-800 bg-slate-900/50">
                 {PRESET_PROMPTS.map((p, i) => (
                   <button key={i} onClick={() => handleSend(p)} className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-brand-400 hover:bg-brand-500/10 transition-colors">
                     {p}
                   </button>
                 ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="ถามเกี่ยวกับ Roadmap หรือ Code..."
                disabled={isLoading}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500 disabled:opacity-50"
              />
              <button 
                onClick={() => handleSend(input)} 
                disabled={isLoading || !input.trim()}
                className="p-2 bg-brand-500 text-slate-900 rounded-lg hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={18} />
              </button>
            </div>
            
          </GlassCard>
        </div>
      )}
    </>
  );
};
