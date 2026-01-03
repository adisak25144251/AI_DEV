import React from 'react';
import { GlassNeonCard, SectionHeader } from './UI';

export const SkillMirror: React.FC = () => {
  // Mock Data - In real app, this comes from quiz/progress
  const stats = {
    frontend: 80,
    backend: 60,
    aiTheory: 40,
    devOps: 30,
    ethics: 90
  };

  // Radar Chart Calculation logic for SVG
  const size = 300;
  const center = size / 2;
  const radius = 100;
  const metrics = Object.keys(stats);
  const angleSlice = (Math.PI * 2) / metrics.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleSlice - Math.PI / 2;
    const r = (value / 100) * radius;
    return [center + Math.cos(angle) * r, center + Math.sin(angle) * r];
  };

  const polyPoints = metrics.map((key, i) => getCoordinates(stats[key as keyof typeof stats], i)).join(' ');
  const bgPolyPoints = metrics.map((_, i) => getCoordinates(100, i)).join(' ');
  const midPolyPoints = metrics.map((_, i) => getCoordinates(50, i)).join(' ');

  return (
    <div className="animate-fade-in pb-12">
      <SectionHeader title="AI Skill Mirror" subtitle="กระจกสะท้อนทักษะของคุณในปัจจุบัน (Interactive Visualization)" badge="Signature Exp" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
           <div className="relative w-[300px] h-[300px]">
              <svg width={size} height={size} className="overflow-visible drop-shadow-[0_0_15px_var(--color-accent-primary-dim)]">
                 {/* Background Grid */}
                 <polygon points={bgPolyPoints} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                 <polygon points={midPolyPoints} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                 
                 {/* Axis Lines */}
                 {metrics.map((_, i) => {
                    const [x, y] = getCoordinates(100, i);
                    return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="rgba(255,255,255,0.1)" />;
                 })}

                 {/* Data Polygon */}
                 <polygon 
                   points={polyPoints} 
                   fill="var(--color-accent-primary)" 
                   fillOpacity="0.3" 
                   stroke="var(--color-accent-primary)" 
                   strokeWidth="2"
                   className="animate-morph"
                 />
                 
                 {/* Labels */}
                 {metrics.map((key, i) => {
                    const [x, y] = getCoordinates(115, i);
                    return (
                      <text 
                        key={i} 
                        x={x} 
                        y={y} 
                        textAnchor="middle" 
                        dominantBaseline="middle" 
                        className="text-[10px] fill-slate-400 font-mono uppercase font-bold"
                      >
                        {key}
                      </text>
                    );
                 })}
              </svg>
           </div>
        </div>

        <div className="space-y-4">
           <GlassNeonCard className="bg-brand-900/10 border-brand-500/30">
              <h3 className="text-xl font-bold text-white mb-2">Analysis Report</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                คุณมีความแข็งแกร่งด้าน <strong className="text-brand-400">Ethics & Frontend</strong> แต่ควรเสริมทักษะด้าน <strong className="text-orange-400">DevOps</strong> เพื่อให้เป็น AI Engineer ที่ครบเครื่อง
              </p>
              <div className="space-y-2">
                 {Object.entries(stats).map(([key, val]) => (
                    <div key={key} className="flex items-center gap-4 text-xs">
                       <span className="w-20 uppercase font-mono text-slate-500">{key}</span>
                       <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-brand-600 to-brand-400" style={{ width: `${val}%` }}></div>
                       </div>
                       <span className="text-white font-bold">{val}%</span>
                    </div>
                 ))}
              </div>
           </GlassNeonCard>
        </div>
      </div>
    </div>
  );
};