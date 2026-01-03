import React, { useState } from 'react';
import { PLAYGROUND_PRESETS } from '../constants';
import { SectionHeader, GlassNeonCard, Button, CodeBlock } from './UI';
import { Split, Play, Zap } from 'lucide-react';

export const PromptPlayground: React.FC = () => {
  const [systemPrompt, setSystemPrompt] = useState(PLAYGROUND_PRESETS[0].systemPrompt);
  const [userPrompt, setUserPrompt] = useState(PLAYGROUND_PRESETS[0].userPrompt);
  const [outputA, setOutputA] = useState("");
  const [outputB, setOutputB] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = () => {
     setLoading(true);
     // Simulate API Latency and distinct model personalities
     setTimeout(() => {
        setOutputA(`[GPT-4o Sim]\nBased on your request "${userPrompt.substring(0, 20)}...", here is the result:\n\nDetailed and structured response adhering strictly to system prompt.`);
        setOutputB(`[Claude 3.5 Sim]\nHere is the analysis:\n\nNatural, nuanced language focusing on the intent of "${userPrompt.substring(0, 20)}...".`);
        setLoading(false);
     }, 1500);
  };

  return (
    <div className="animate-fade-in pb-12">
      <SectionHeader title="Prompt Playground" subtitle="เปรียบเทียบผลลัพธ์จากโมเดลระดับโลกแบบ Side-by-Side (Simulation)" badge="Lab Tool" />
      
      {/* Controls */}
      <GlassNeonCard className="mb-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-xs font-bold text-slate-400 uppercase">System Prompt</label>
               <textarea 
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm font-mono text-brand-100 h-24 focus:border-brand-500 focus:outline-none"
               />
            </div>
            <div className="space-y-2">
               <label className="text-xs font-bold text-slate-400 uppercase">User Prompt</label>
               <textarea 
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm font-mono text-white h-24 focus:border-brand-500 focus:outline-none"
               />
            </div>
         </div>
         
         <div className="mt-4 flex gap-2 justify-end border-t border-white/10 pt-4">
             {PLAYGROUND_PRESETS.map((p, i) => (
                <button key={i} onClick={() => { setSystemPrompt(p.systemPrompt); setUserPrompt(p.userPrompt); }} className="text-xs px-3 py-1 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800">
                   Load: {p.name}
                </button>
             ))}
             <Button onClick={handleRun} disabled={loading} icon={Play}>
                {loading ? 'Generating...' : 'Run Comparison'}
             </Button>
         </div>
      </GlassNeonCard>

      {/* Output Split View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="border border-blue-500/30 bg-blue-900/5 rounded-xl p-4 min-h-[300px]">
            <div className="flex items-center gap-2 mb-4 border-b border-blue-500/20 pb-2">
               <Zap size={16} className="text-blue-400" />
               <span className="font-bold text-blue-100">Model A (GPT-4o Sim)</span>
            </div>
            {loading ? <div className="animate-pulse h-4 w-3/4 bg-blue-500/20 rounded"></div> : <pre className="whitespace-pre-wrap text-sm text-blue-100 font-mono">{outputA}</pre>}
         </div>
         
         <div className="border border-orange-500/30 bg-orange-900/5 rounded-xl p-4 min-h-[300px]">
            <div className="flex items-center gap-2 mb-4 border-b border-orange-500/20 pb-2">
               <Zap size={16} className="text-orange-400" />
               <span className="font-bold text-orange-100">Model B (Claude 3.5 Sim)</span>
            </div>
            {loading ? <div className="animate-pulse h-4 w-3/4 bg-orange-500/20 rounded"></div> : <pre className="whitespace-pre-wrap text-sm text-orange-100 font-mono">{outputB}</pre>}
         </div>
      </div>
    </div>
  );
};