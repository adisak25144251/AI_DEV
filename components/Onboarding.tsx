import React, { useState } from 'react';
import { Button, GlassNeonCard, NeonTagPill } from './UI';
import { Rocket, Code2, BrainCircuit, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<string | null>(null);

  const roles = [
    { id: 'architect', title: 'AI Architect', icon: BrainCircuit, desc: 'เน้นการออกแบบระบบ RAG, Agents และ Architecture ภาพรวม' },
    { id: 'builder', title: 'Product Builder', icon: Rocket, desc: 'เน้นการสร้าง App จริง ใช้งานได้เลย (Vercel, API, UI)' },
    { id: 'researcher', title: 'Deep Researcher', icon: Code2, desc: 'เจาะลึกทฤษฎี Model, Fine-tuning และ Math เบื้องหลัง' },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-900/40 via-black to-black"></div>
      
      {/* Grid Animation */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      <div className="relative z-10 w-full max-w-2xl animate-fade-in">
        {step === 0 && (
           <div className="text-center space-y-8">
              <div className="inline-block p-4 rounded-full bg-brand-500/10 border border-brand-500/50 mb-4 animate-pulse-slow">
                 <BrainCircuit size={48} className="text-brand-400" />
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                INITIATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">SEQUENCE</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-lg mx-auto leading-relaxed">
                ยินดีต้อนรับสู่ AI Dev Platform 2026<br/>
                แพลตฟอร์มการเรียนรู้รูปแบบใหม่ที่คุณคือตัวเอก
              </p>
              <Button onClick={() => setStep(1)} className="px-12 py-4 text-lg bg-white text-black hover:bg-slate-200 border-none shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                 Start Mission
              </Button>
           </div>
        )}

        {step === 1 && (
          <div className="space-y-8 animate-slide-up">
             <div className="text-center">
               <h2 className="text-3xl font-bold text-white mb-2">Select Your Class</h2>
               <p className="text-slate-400">เส้นทางการเรียนรู้ของคุณจะถูกปรับเปลี่ยนตามบทบาทที่เลือก</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roles.map(r => (
                  <button 
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`p-6 rounded-xl border transition-all text-left group relative overflow-hidden ${
                       role === r.id 
                       ? 'bg-brand-600/20 border-brand-400 shadow-[0_0_20px_var(--color-accent-primary-dim)]' 
                       : 'bg-slate-900/50 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                     <r.icon size={32} className={`mb-4 ${role === r.id ? 'text-brand-400' : 'text-slate-500 group-hover:text-white'}`} />
                     <h3 className="text-xl font-bold text-white mb-2">{r.title}</h3>
                     <p className="text-sm text-slate-400 leading-relaxed">{r.desc}</p>
                     
                     {role === r.id && (
                       <div className="absolute inset-0 border-2 border-brand-400 rounded-xl animate-pulse"></div>
                     )}
                  </button>
                ))}
             </div>

             <div className="flex justify-center pt-8">
               <Button 
                 onClick={onComplete} 
                 disabled={!role}
                 className="w-full md:w-auto px-12"
                 icon={ArrowRight}
               >
                 Confirm Selection
               </Button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};