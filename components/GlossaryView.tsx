import React, { useState } from 'react';
import { GLOSSARY_DATA } from '../constants';
import { Search, Book } from 'lucide-react';
import { SectionHeader, GlassCard, Breadcrumb } from './UI';

export const GlossaryView: React.FC = () => {
  const [search, setSearch] = useState("");

  const filtered = GLOSSARY_DATA.filter(g => 
    g.term.toLowerCase().includes(search.toLowerCase()) || 
    g.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
       <Breadcrumb items={['Home', 'Knowledge Base', 'Glossary']} />
       
       <SectionHeader title="AI Glossary" subtitle="คลังคำศัพท์และแนวคิดสำคัญที่ AI Engineer ต้องรู้" />

       <div className="relative">
         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
         <input 
            type="text" 
            placeholder="Search terms (e.g., RAG, Embedding)..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white focus:border-brand-500 focus:outline-none transition-all"
         />
       </div>

       <div className="grid grid-cols-1 gap-4">
          {filtered.map((item, idx) => (
            <GlassCard key={idx} className="flex flex-col md:flex-row gap-4 items-start">
               <div className="min-w-[150px]">
                 <h3 className="text-xl font-bold text-brand-400">{item.term}</h3>
                 <span className="text-[10px] uppercase tracking-wider text-slate-500 bg-slate-900 px-2 py-1 rounded mt-2 inline-block">
                   {item.category}
                 </span>
               </div>
               <p className="text-slate-300 leading-relaxed text-sm pt-1">
                 {item.definition}
               </p>
            </GlassCard>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500">No terms found.</div>
          )}
       </div>
    </div>
  );
}