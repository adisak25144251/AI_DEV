import React, { useState } from 'react';
import { FLASHCARDS_DATA } from '../constants';
import { SectionHeader, GlassNeonCard, Button, Breadcrumb } from './UI';
import { RotateCcw, Check, X, Shuffle } from 'lucide-react';

export const FlashcardView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [streak, setStreak] = useState(0);

  const currentCard = FLASHCARDS_DATA[currentIndex];

  const handleNext = (remembered: boolean) => {
    setIsFlipped(false);
    setTimeout(() => {
        if (remembered) setStreak(s => s + 1);
        else setStreak(0);
        
        // Simple rotation
        setCurrentIndex((prev) => (prev + 1) % FLASHCARDS_DATA.length);
    }, 300);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in pb-20">
      <Breadcrumb items={['Home', 'Review', 'Flashcards']} />
      
      <SectionHeader 
        align="center"
        title="Neural Flashcards" 
        subtitle="ระบบทบทวนความรู้แบบ Spaced Repetition ช่วยให้คุณจดจำ Concept ยากๆ ได้แม่นยำขึ้น"
        badge="Review Mode"
      />

      <div className="text-center mb-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-brand-400 text-xs font-bold border border-slate-700">
          🔥 Streak: {streak} cards
        </span>
      </div>

      <div 
        className="relative h-[350px] cursor-pointer group perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`w-full h-full relative preserve-3d transition-all duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <GlassNeonCard className="absolute inset-0 backface-hidden flex flex-col items-center justify-center text-center p-8 border-brand-500/30">
             <div className="absolute top-4 left-4 text-xs font-mono text-slate-500 uppercase tracking-widest">{currentCard.category}</div>
             <div className="absolute top-4 right-4 text-xs font-bold text-slate-500">{currentIndex + 1} / {FLASHCARDS_DATA.length}</div>
             <h3 className="text-2xl font-bold text-white">{currentCard.front}</h3>
             <p className="mt-8 text-xs text-brand-400 animate-pulse">Click to Reveal</p>
          </GlassNeonCard>

          {/* Back */}
          <GlassNeonCard className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center text-center p-8 border-emerald-500/30">
             <div className="absolute top-4 left-4 text-xs font-mono text-emerald-500 uppercase tracking-widest">Answer</div>
             <p className="text-lg text-slate-200 leading-relaxed">{currentCard.back}</p>
          </GlassNeonCard>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
         <Button 
            variant="ghost" 
            onClick={(e) => { e.stopPropagation(); handleNext(false); }}
            className="text-red-400 hover:bg-red-900/20"
            icon={X}
         >
            Forgot
         </Button>
         <Button 
            variant="ghost" 
            onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }}
            icon={RotateCcw}
         >
            Flip
         </Button>
         <Button 
            variant="primary" 
            onClick={(e) => { e.stopPropagation(); handleNext(true); }}
            className="bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500"
            icon={Check}
         >
            Remembered
         </Button>
      </div>
    </div>
  );
};