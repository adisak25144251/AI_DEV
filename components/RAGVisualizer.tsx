import React, { useState } from 'react';
import { SectionHeader, GlassNeonCard } from './UI';
import { FileText, Database, ArrowRight, BrainCircuit, Search } from 'lucide-react';

export const RAGVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    { id: 1, title: 'Document', icon: FileText, desc: 'Raw PDF/Text Data', data: 'Context: "Company revenue in Q3 was $5M..."' },
    { id: 2, title: 'Chunking', icon: SplitIcon, desc: 'Split into smaller pieces', data: 'Chunk 1: "Company revenue in Q3..."\nChunk 2: "...was $5M due to AI adoption."' },
    { id: 3, title: 'Embedding', icon: BrainCircuit, desc: 'Convert text to vectors', data: '[0.12, -0.54, 0.88, 0.01, ...]' },
    { id: 4, title: 'Vector DB', icon: Database, desc: 'Store & Index', data: 'Index: "finance-v1"\nMetrics: Cosine Similarity' },
    { id: 5, title: 'Retrieval', icon: Search, desc: 'Find relevant chunks', data: 'Query: "What was Q3 revenue?"\nMatch: Chunk 1 (Score: 0.92)' },
  ];

  // Helper component for custom split icon
  function SplitIcon(props: any) {
    return (
      <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M12 3v18" />
      </svg>
    )
  }

  return (
    <div className="animate-fade-in pb-12">
      <SectionHeader title="RAG Studio Visualizer" subtitle="ทำความเข้าใจการทำงานของ RAG Pipeline แบบเจาะลึก (Click to Inspect)" badge="Visualizer" />
      
      <div className="relative">
         {/* Connecting Line */}
         <div className="absolute top-8 left-0 w-full h-1 bg-slate-800 -z-10 hidden md:block"></div>

         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {steps.map((step, i) => (
               <button 
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all group ${
                     activeStep === step.id 
                     ? 'bg-brand-500/20 border-brand-400 scale-105 shadow-[0_0_20px_var(--color-accent-primary-dim)]' 
                     : 'bg-slate-900 border-slate-700 hover:border-slate-500'
                  }`}
               >
                  <div className={`p-3 rounded-full mb-3 ${activeStep === step.id ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                     <step.icon size={20} />
                  </div>
                  <h4 className="font-bold text-white text-sm">{step.title}</h4>
                  <p className="text-[10px] text-slate-500 uppercase mt-1">{step.desc}</p>
                  
                  {i < steps.length - 1 && (
                     <ArrowRight className="absolute -right-5 top-8 text-slate-600 hidden md:block" size={16} />
                  )}
               </button>
            ))}
         </div>

         {/* Inspection Panel */}
         <div className="mt-8">
            <GlassNeonCard className="min-h-[200px] flex items-center justify-center border-brand-500/30">
               {activeStep ? (
                  <div className="w-full text-left animate-fade-in">
                     <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-brand-500 rounded text-black">
                           {React.createElement(steps[activeStep-1].icon, { size: 18 })}
                        </div>
                        <h3 className="text-xl font-bold text-white">Step {activeStep}: {steps[activeStep-1].title}</h3>
                     </div>
                     <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-brand-200 border border-brand-500/20">
                        <pre className="whitespace-pre-wrap">{steps[activeStep-1].data}</pre>
                     </div>
                  </div>
               ) : (
                  <div className="text-center text-slate-500">
                     <BrainCircuit size={48} className="mx-auto mb-4 opacity-20" />
                     <p>Click on a step above to inspect the data flow.</p>
                  </div>
               )}
            </GlassNeonCard>
         </div>
      </div>
    </div>
  );
};