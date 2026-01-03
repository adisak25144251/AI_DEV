import React from 'react';
import { Award, Download, Share2, CheckCircle } from 'lucide-react';
import { SectionHeader, GlassCard, Button } from './UI';

export const CertificateView: React.FC = () => {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in pb-20">
      <SectionHeader 
        align="center"
        title="Your Certification" 
        subtitle="ยืนยันความสำเร็จของคุณด้วย Digital Certificate ที่ผ่านการรับรองจากระบบ"
      />

      {/* Certificate Frame */}
      <div className="relative p-1 bg-gradient-to-br from-brand-400 via-white to-accent-400 rounded-xl shadow-[0_0_50px_var(--color-accent-primary-dim)]">
        <div className="bg-slate-950 p-8 md:p-12 rounded-lg border border-slate-800 relative overflow-hidden">
          
          {/* Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
             <Award size={400} />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-brand-500 flex items-center justify-center text-slate-950">
                <Award size={32} />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-mono tracking-widest text-slate-400 uppercase">Certificate of Completion</h2>
              <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">
                AI Engineering Foundations
              </h1>
            </div>

            <p className="text-slate-300">This certifies that</p>
            <div className="text-2xl font-bold text-white border-b border-slate-700 inline-block pb-2 px-8 min-w-[300px]">
              Guest Developer
            </div>

            <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
              Has successfully completed the 2026 AI Developer Roadmap, demonstrating proficiency in LLM Integration, RAG Architecture, and Production Deployment.
            </p>

            <div className="pt-8 flex justify-between items-end border-t border-slate-800 mt-8">
              <div className="text-left">
                <div className="text-brand-400 font-bold font-mono text-lg">AI_DEV_2026</div>
                <div className="text-xs text-slate-500">Curriculum V.2.0</div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">{date}</div>
                <div className="text-xs text-slate-500">Date Issued</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="primary" icon={Download}>Download PDF</Button>
        <Button variant="secondary" icon={Share2}>Share to LinkedIn</Button>
      </div>
    </div>
  );
};