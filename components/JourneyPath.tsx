import React from 'react';
import { JOURNEY_STEPS } from '../constants';
import { BookOpen, Code2, Bot, Rocket, ArrowRight } from 'lucide-react';
import { SectionHeader, GlassNeonCard, NeonTagPill } from './UI';

const iconMap: Record<string, React.FC<any>> = {
  BookOpen, Code2, Bot, Rocket
};

interface JourneyPathProps {
    onNavigate?: (tabId: string) => void;
}

const JourneyPath: React.FC<JourneyPathProps> = ({ onNavigate }) => {
  return (
    <div className="relative animate-fade-in">
      <div className="text-center mb-16">
        <SectionHeader 
          align="center"
          badge="Start Here"
          title="เส้นทาง 4 ขั้นตอน (The Journey)" 
          subtitle="กระบวนการพัฒนาตัวเองจากผู้เริ่มต้นสู่นักสร้างนวัตกรรมในยุค AI ที่ถูกออกแบบมาให้ทำตามได้จริง"
        />
      </div>

      {/* Connection Line (Desktop) */}
      <div className="hidden lg:block absolute top-[55%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-neon-cyan)] to-transparent z-0 opacity-30"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {JOURNEY_STEPS.map((step, index) => {
          const Icon = iconMap[step.iconName];
          return (
            <div key={step.id} className="relative group h-full cursor-pointer" onClick={() => onNavigate && onNavigate(step.targetTab)}>
              <GlassNeonCard className="h-full flex flex-col items-center text-center pt-8 border-t-4 border-t-transparent hover:border-t-[var(--color-neon-cyan)]">
                <div className="
                  w-16 h-16 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] 
                  flex items-center justify-center mb-6 text-[var(--color-neon-cyan)]
                  shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:scale-110 group-hover:bg-[var(--color-neon-cyan)] group-hover:text-slate-950 transition-all duration-300
                ">
                  <Icon size={32} />
                </div>
                
                <div className="absolute top-4 right-4 text-5xl font-bold text-[var(--color-text-muted)] opacity-20 select-none pointer-events-none font-mono">
                  0{step.id}
                </div>

                <h3 className="text-xl font-bold text-[var(--color-text-main)] mb-3">{step.title}</h3>
                <p className="text-[var(--color-text-muted)] text-sm mb-6 leading-relaxed flex-grow">{step.description}</p>
                
                <div className="w-full pt-4 border-t border-[var(--glass-border)]">
                  <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Focus Area</span>
                  <NeonTagPill variant="brand">{step.focusArea}</NeonTagPill>
                </div>
              </GlassNeonCard>

              {/* Mobile Arrow */}
              {index < JOURNEY_STEPS.length - 1 && (
                <div className="flex justify-center py-4 lg:hidden text-[var(--color-text-muted)]">
                  <ArrowRight size={24} className="rotate-90 md:rotate-0" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JourneyPath;