import React from 'react';
import { TOOLS_DATA } from '../constants';
import { Terminal, Box, GitBranch, Cpu, Wrench, ExternalLink } from 'lucide-react';
import { SectionHeader, GlassCard, Badge, CodeBlock, Breadcrumb } from './UI';

const iconMap: Record<string, React.FC<any>> = {
  Terminal, Container: Box, GitBranch, Cpu, Wrench
};

const ToolsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Breadcrumb items={['Home', 'Tools & Workflows']} />
      
      <SectionHeader 
        title="Tools & Workflows" 
        subtitle="เครื่องมือมาตรฐานอุตสาหกรรมที่ AI Engineer ต้องใช้ให้คล่อง"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TOOLS_DATA.map((tool, idx) => {
          const Icon = tool.iconName ? iconMap[tool.iconName] : Wrench;
          return (
            <a 
              key={idx} 
              href={tool.url || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <GlassCard className="flex flex-col h-full hover:border-[var(--color-neon-cyan)] transition-colors relative">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-neon-cyan)]">
                  <ExternalLink size={16} />
                </div>

                <div className="flex items-start justify-between mb-4 pr-6">
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-brand-400">
                    <Icon size={24} />
                  </div>
                  <Badge variant="accent">{tool.category}</Badge>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">{tool.name}</h3>
                <p className="text-slate-400 text-sm mb-4 flex-grow">{tool.description}</p>
                
                {tool.command && (
                  <div className="mt-auto pointer-events-none">
                    <CodeBlock code={tool.command} />
                  </div>
                )}
              </GlassCard>
            </a>
          );
        })}
      </div>

      {/* Workflow Section Placeholder */}
      <div className="mt-12">
        <SectionHeader title="Essential Workflows" subtitle="กระบวนการทำงานที่พบบ่อย" />
        <GlassCard className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
               <GitBranch className="text-brand-400" size={20} />
               <h3 className="text-lg font-bold text-white">Modern Git Flow</h3>
            </div>
            <p className="text-slate-400 text-sm">การทำงานร่วมกันผ่าน Git โดยใช้ Feature Branch Workflow</p>
            <div className="relative pl-4 border-l-2 border-slate-700 space-y-4 py-2">
               <div className="text-sm">
                  <span className="text-brand-400 font-mono text-xs">01</span> Checkout branch ใหม่จาก main
               </div>
               <div className="text-sm">
                  <span className="text-brand-400 font-mono text-xs">02</span> Commit code และ Push ขึ้น Origin
               </div>
               <div className="text-sm">
                  <span className="text-brand-400 font-mono text-xs">03</span> เปิด Pull Request (PR) เพื่อ Code Review
               </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ToolsView;