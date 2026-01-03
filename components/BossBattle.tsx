import React, { useState, useEffect } from 'react';
import { BOSS_BATTLES } from '../constants';
import { SectionHeader, GlassNeonCard, Button, CodeBlock } from './UI';
import { ShieldAlert, Timer, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export const BossBattle: React.FC = () => {
  const scenario = BOSS_BATTLES[0];
  const [timeLeft, setTimeLeft] = useState(scenario.timeLimit);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState('lost');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  const handleChoice = (optId: string, isCorrect: boolean) => {
    setSelectedOption(optId);
    setGameState(isCorrect ? 'won' : 'lost');
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto pb-20">
      <SectionHeader title="Boss Battle: Scenario Mode" subtitle="ทดสอบความสามารถในการแก้ปัญหาจริง ภายใต้ความกดดัน" badge="Challenge" />

      <GlassNeonCard className={`relative overflow-hidden border-2 transition-colors duration-500 ${
         gameState === 'playing' ? 'border-red-500/30' : 
         gameState === 'won' ? 'border-emerald-500' : 'border-red-600'
      }`}>
         
         {/* HUD Header */}
         <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
               <div className={`p-2 rounded-lg ${gameState === 'playing' ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
                  <ShieldAlert size={24} />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{scenario.title}</h3>
                  <span className="text-xs text-red-400 font-mono uppercase tracking-widest">Severity: Critical</span>
               </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-2xl font-bold text-white">
               <Timer className={timeLeft < 10 ? 'text-red-500 animate-bounce' : 'text-slate-400'} />
               <span className={timeLeft < 10 ? 'text-red-500' : ''}>00:{timeLeft.toString().padStart(2, '0')}</span>
            </div>
         </div>

         {/* Context */}
         <div className="bg-black/50 p-4 rounded-lg mb-6 border border-red-900/30">
            <p className="text-slate-300 mb-2">{scenario.description}</p>
            <div className="font-mono text-sm text-yellow-400 bg-yellow-900/10 p-2 rounded border border-yellow-900/30 flex gap-2 items-center">
               <AlertTriangle size={14} /> Context: "{scenario.context}"
            </div>
         </div>

         {/* Options */}
         <div className="space-y-3">
            {scenario.options.map((opt) => (
               <button
                 key={opt.id}
                 disabled={gameState !== 'playing'}
                 onClick={() => handleChoice(opt.id, opt.isCorrect)}
                 className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    gameState !== 'playing' && selectedOption === opt.id 
                       ? (opt.isCorrect ? 'border-emerald-500 bg-emerald-500/10' : 'border-red-500 bg-red-500/10')
                       : 'border-slate-700 bg-slate-800/50 hover:border-brand-400 hover:bg-slate-800'
                 }`}
               >
                  <code className="block text-sm font-mono text-brand-200 mb-1">{opt.code}</code>
                  {gameState !== 'playing' && selectedOption === opt.id && (
                     <p className={`text-xs mt-2 ${opt.isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                        {opt.isCorrect ? <CheckCircle2 size={14} className="inline mr-1"/> : <XCircle size={14} className="inline mr-1"/>}
                        {opt.feedback}
                     </p>
                  )}
               </button>
            ))}
         </div>

         {/* Result Overlay */}
         {gameState === 'won' && (
            <div className="mt-8 text-center animate-slide-up">
               <h2 className="text-3xl font-black text-emerald-400 mb-2">THREAT NEUTRALIZED</h2>
               <p className="text-slate-400">คุณได้รับ Badge: <span className="text-yellow-400 font-bold">Security Guardian</span></p>
               <Button className="mt-4" onClick={() => window.location.reload()}>Next Level</Button>
            </div>
         )}
         
         {gameState === 'lost' && (
            <div className="mt-8 text-center animate-slide-up">
               <h2 className="text-3xl font-black text-red-500 mb-2">SYSTEM COMPROMISED</h2>
               <p className="text-slate-400">API Key ถูกขโมย! ลองใหม่อีกครั้ง</p>
               <Button variant="ghost" className="mt-4" onClick={() => window.location.reload()}>Retry Simulation</Button>
            </div>
         )}

      </GlassNeonCard>
    </div>
  );
};