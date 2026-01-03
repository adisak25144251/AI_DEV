import React, { useState, useEffect } from 'react';
import { ROADMAP_PHASES } from '../constants';
import { CheckCircle2, Laptop, Filter, Check, ChevronDown, ChevronUp, ExternalLink, PlayCircle, Book, GraduationCap, Beaker, Trophy, FileCode, CheckSquare, Clock, AlertCircle } from 'lucide-react';
import { SectionHeader, GlassNeonCard, NeonTagPill, Button, Breadcrumb } from './UI';
import { TopicItem } from '../types';

const RoadmapView: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<number | 'all'>('all');
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set([1]));
  const [completedTopicIds, setCompletedTopicIds] = useState<Set<string>>(new Set());
  const [completedProjects, setCompletedProjects] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedTopics = localStorage.getItem('ai-dev-progress-topics');
      const savedProjects = localStorage.getItem('ai-dev-progress-projects');
      if (savedTopics) setCompletedTopicIds(new Set(JSON.parse(savedTopics)));
      if (savedProjects) setCompletedProjects(new Set(JSON.parse(savedProjects)));
    } catch (e) {
      console.error('Failed to load progress', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('ai-dev-progress-topics', JSON.stringify(Array.from(completedTopicIds)));
      localStorage.setItem('ai-dev-progress-projects', JSON.stringify(Array.from(completedProjects)));
    }
  }, [completedTopicIds, completedProjects, isLoaded]);

  const toggleTopic = (id: string) => {
    const newCompleted = new Set(completedTopicIds);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedTopicIds(newCompleted);
  };

  const toggleProject = (id: string) => {
    const newCompleted = new Set(completedProjects);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedProjects(newCompleted);
  }

  const togglePhaseExpand = (id: number) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedPhases(newExpanded);
  }

  const handleToolClick = (tool: string) => {
    const query = encodeURIComponent(`${tool} official documentation`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  }

  const getIconForType = (type: string) => {
    switch (type) {
        case 'video': return <PlayCircle size={14} />;
        case 'course': return <GraduationCap size={14} />;
        case 'lab': return <Beaker size={14} className="text-brand-400" />;
        default: return <Book size={14} />;
    }
  }

  const filteredPhases = selectedPhase === 'all' 
    ? ROADMAP_PHASES 
    : ROADMAP_PHASES.filter(p => p.id === selectedPhase);

  const totalTopics = filteredPhases.reduce((acc, phase) => acc + phase.topics.length, 0);
  const totalProjects = filteredPhases.reduce((acc, phase) => acc + (phase.project ? 1 : 0), 0);
  
  const completedTopicCount = filteredPhases.reduce((acc, phase) => 
    acc + phase.topics.filter(t => completedTopicIds.has(t.id)).length, 0
  );
  const completedProjectCount = filteredPhases.reduce((acc, phase) => 
    acc + (phase.project && completedProjects.has(phase.project.id) ? 1 : 0), 0
  );

  // Gamification: 10XP per Topic, 100XP per Project
  const currentXP = (completedTopicIds.size * 10) + (completedProjects.size * 100);
  const currentLevel = Math.floor(currentXP / 200) + 1;

  const progressPercentage = totalTopics === 0 ? 0 : Math.round(((completedTopicCount + (completedProjectCount * 5)) / (totalTopics + (totalProjects * 5))) * 100);

  return (
    <div className="space-y-8 animate-slide-up">
      <Breadcrumb items={['Home', 'Roadmap', selectedPhase === 'all' ? 'All Phases' : `Phase ${selectedPhase}`]} />

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="flex-1">
          <SectionHeader 
            title="Roadmap & Projects" 
            subtitle="เรียนรู้ผ่านการลงมือทำ (Project-based) พร้อมแล็บปฏิบัติจริง เก็บคะแนน XP เพื่อปลดล็อกใบรับรอง"
            badge="Learning Platform"
          />
        </div>
        
        {/* Gamification HUD */}
        <div className="glass-panel p-5 rounded-xl flex items-center gap-6 shadow-[0_0_20px_var(--color-neon-cyan-dim)] border border-[var(--color-neon-cyan)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-accent-500/10 backdrop-blur-3xl -z-10"></div>
          
          {/* Level Ring */}
          <div className="relative w-16 h-16 flex items-center justify-center">
             <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                <path className="text-brand-400 transition-all duration-1000 ease-out" strokeDasharray={`${progressPercentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-[10px] uppercase text-[var(--color-text-muted)] font-bold">LVL</span>
                <span className="text-xl font-black text-brand-400">{currentLevel}</span>
              </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold flex items-center gap-2">
              <Trophy size={12} className="text-yellow-500" /> Total XP
            </div>
            <div className="text-3xl font-bold text-[var(--color-text-main)] leading-none font-mono tracking-tight text-glow">
              {currentXP} <span className="text-xs text-[var(--color-text-muted)] font-normal">pts</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-mono">
              Completed: {completedTopicCount} Topics, {completedProjectCount} Projects
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide border-b border-[var(--glass-border)]">
        <Button 
          variant={selectedPhase === 'all' ? 'primary' : 'ghost'} 
          onClick={() => setSelectedPhase('all')}
          className="rounded-full text-sm py-1.5"
        >
          <Filter size={14} /> All Phases
        </Button>
        {ROADMAP_PHASES.map(phase => (
          <Button
            key={phase.id}
            variant={selectedPhase === phase.id ? 'primary' : 'ghost'}
            onClick={() => setSelectedPhase(phase.id)}
            className="rounded-full text-sm py-1.5 whitespace-nowrap"
          >
            Phase {phase.id}
          </Button>
        ))}
      </div>

      {/* Timeline Layout */}
      <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[var(--color-neon-cyan)]/20 before:via-[var(--glass-border)] before:to-transparent">
        {filteredPhases.map((phase) => {
          const isExpanded = expandedPhases.has(phase.id);
          const isPhaseComplete = isLoaded && phase.topics.every(t => completedTopicIds.has(t.id)) && (!phase.project || completedProjects.has(phase.project.id));
          
          return (
            <div key={phase.id} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
              
              {/* Timeline Marker */}
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-4 shadow-lg z-10 shrink-0 transition-colors duration-500
                md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2
                ${isPhaseComplete 
                   ? 'bg-emerald-500 text-slate-950 border-emerald-600 shadow-[0_0_15px_#10b981]' 
                   : 'bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--color-text-muted)] shadow-[0_0_10px_rgba(0,0,0,0.5)]'
                }
              `}>
                <span className="font-bold text-xs font-mono">{phase.id}</span>
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                <GlassNeonCard className={`p-0 transition-all ${isExpanded ? 'border-[var(--color-neon-cyan)]/50' : ''}`}>
                  {/* Card Header */}
                  <div 
                    onClick={() => togglePhaseExpand(phase.id)}
                    className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className={`w-12 h-1 rounded-full bg-[var(--color-neon-cyan)] shadow-[0_0_8px_var(--color-neon-cyan-dim)]`}></div>
                      {isExpanded ? <ChevronUp size={20} className="text-[var(--color-text-muted)]" /> : <ChevronDown size={20} className="text-[var(--color-text-muted)]" />}
                    </div>
                    
                    <h3 className="text-xl font-bold text-[var(--color-text-main)] mb-1 group-hover:text-[var(--color-neon-cyan)] transition-colors">
                      {phase.title.split(":")[1]}
                    </h3>
                    <p className="text-[var(--color-neon-cyan)] text-sm font-medium tracking-wide">{phase.subtitle}</p>
                    
                    {/* New Metadata: Time & Prereqs */}
                    <div className="flex gap-4 mt-3 text-xs text-[var(--color-text-muted)] font-mono">
                       <span className="flex items-center gap-1"><Clock size={12}/> {phase.estimatedHours} Hours</span>
                       {phase.prerequisites.length > 0 && (
                          <span className="flex items-center gap-1 text-orange-400"><AlertCircle size={12}/> Req: {phase.prerequisites.join(", ")}</span>
                       )}
                    </div>

                    {isExpanded && <p className="text-[var(--color-text-muted)] text-sm mt-4 leading-relaxed">{phase.description}</p>}
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-0 space-y-6 animate-slide-up border-t border-[var(--glass-border)] mt-2">
                      
                      {/* Topics Section */}
                      <div className="pt-4">
                        <h4 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-3 flex items-center gap-2">
                          <CheckCircle2 size={12} /> Modules & Labs
                        </h4>
                        <div className="grid gap-2">
                          {phase.topics.map((topic, idx) => {
                            const isDone = completedTopicIds.has(topic.id);
                            const Icon = getIconForType(topic.type);
                            return (
                              <div key={idx} className="flex gap-2 group/item">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); toggleTopic(topic.id); }}
                                  className={`
                                    flex-grow flex items-center gap-3 p-3 rounded-lg text-left transition-all border
                                    ${isDone 
                                      ? 'bg-emerald-500/10 border-emerald-500/50' 
                                      : 'bg-slate-900/30 border-[var(--glass-border)] hover:bg-white/5'
                                    }
                                  `}
                                >
                                  <div className={`
                                    w-5 h-5 rounded flex items-center justify-center shrink-0 border
                                    ${isDone ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-slate-600'}
                                  `}>
                                    {isDone && <Check size={14} strokeWidth={3} />}
                                  </div>
                                  <span className={`text-sm ${isDone ? 'text-[var(--color-text-muted)] line-through' : 'text-[var(--color-text-main)]'}`}>
                                    {topic.title}
                                  </span>
                                </button>
                                
                                <a
                                  href={topic.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`flex items-center gap-2 px-4 rounded-lg border border-[var(--glass-border)] transition-colors
                                    ${topic.type === 'lab' ? 'bg-brand-500/10 text-brand-400 hover:bg-brand-500/20' : 'bg-slate-900/30 text-[var(--color-text-muted)] hover:text-[var(--color-neon-cyan)]'}
                                  `}
                                >
                                  {Icon}
                                  <span className="hidden sm:inline text-xs font-bold uppercase">{topic.type}</span>
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Capstone Project Card */}
                      {phase.project && (
                        <div className="mt-6 rounded-xl overflow-hidden border border-brand-500/30 bg-gradient-to-br from-brand-900/20 to-transparent">
                           <div className="p-4 border-b border-brand-500/20 flex justify-between items-center bg-brand-500/5">
                              <div className="flex items-center gap-2 text-brand-400 font-bold">
                                 <FileCode size={18} /> CAPSTONE PROJECT
                              </div>
                              <NeonTagPill variant="brand">+100 XP</NeonTagPill>
                           </div>
                           <div className="p-5">
                              <h4 className="text-lg font-bold text-white mb-2">{phase.project.title}</h4>
                              <p className="text-sm text-slate-400 mb-4">{phase.project.description}</p>
                              
                              <div className="flex gap-3">
                                <Button 
                                  variant="secondary" 
                                  className="py-2 px-4 text-xs"
                                  onClick={() => setShowProjectDetails(showProjectDetails === phase.project!.id ? null : phase.project!.id)}
                                >
                                  {showProjectDetails === phase.project.id ? 'Hide Specs' : 'View Specs'}
                                </Button>
                                <button 
                                  onClick={() => toggleProject(phase.project!.id)}
                                  className={`flex-1 flex items-center justify-center gap-2 rounded-[var(--radius-btn)] font-bold text-sm border transition-all
                                    ${completedProjects.has(phase.project.id) 
                                      ? 'bg-emerald-500 text-slate-950 border-emerald-500' 
                                      : 'bg-transparent border-brand-400 text-brand-400 hover:bg-brand-400/10'}
                                  `}
                                >
                                  {completedProjects.has(phase.project.id) ? 'Project Completed!' : 'Mark as Complete'}
                                </button>
                              </div>

                              {/* Project Specs Detail */}
                              {showProjectDetails === phase.project.id && (
                                <div className="mt-4 pt-4 border-t border-brand-500/20 animate-fade-in text-sm text-slate-300">
                                   <div className="mb-4">
                                      <strong className="block text-brand-400 mb-2 uppercase text-xs">Tasks Checklist:</strong>
                                      <ul className="space-y-1">
                                        {phase.project.tasks.map((task, i) => (
                                          <li key={i} className="flex items-center gap-2"><CheckSquare size={14} className="text-slate-500"/> {task}</li>
                                        ))}
                                      </ul>
                                   </div>
                                   <div>
                                      <strong className="block text-brand-400 mb-2 uppercase text-xs">Acceptance Criteria (Rubric):</strong>
                                      <ul className="list-disc pl-4 space-y-1 text-slate-400">
                                         {phase.project.rubric.map((r, i) => <li key={i}>{r}</li>)}
                                      </ul>
                                   </div>
                                   {phase.project.templateUrl && (
                                     <a href={phase.project.templateUrl} target="_blank" className="mt-4 inline-flex items-center gap-2 text-brand-400 hover:underline">
                                       <ExternalLink size={14}/> Open Starter Template
                                     </a>
                                   )}
                                </div>
                              )}
                           </div>
                        </div>
                      )}

                      {/* Tools Stack */}
                      <div className="pt-2">
                         <div className="flex flex-wrap gap-2">
                           {phase.tools.map((tool, tIdx) => (
                             <button key={tIdx} onClick={() => handleToolClick(tool)} className="hover:scale-105 transition-transform opacity-70 hover:opacity-100">
                                <NeonTagPill variant="outline">{tool}</NeonTagPill>
                             </button>
                           ))}
                         </div>
                      </div>

                    </div>
                  )}
                </GlassNeonCard>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapView;