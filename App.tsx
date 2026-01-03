import React, { useState, useEffect } from 'react';
import { BrainCircuit, Layers, Rocket, Menu, X, Github, BookOpen, Wrench, Briefcase, Zap, Settings, Monitor, Sparkles, Droplets, Cpu, Palette, Ghost, Gamepad2, Gem, Award, Library, FlaskConical, RotateCw, Swords, Split, Eye, HelpCircle } from 'lucide-react';
import RoadmapView from './components/RoadmapView';
import JourneyPath from './components/JourneyPath';
import ResourcesView from './components/ResourcesView';
import ToolsView from './components/ToolsView';
import CareerView from './components/CareerView';
import { CertificateView } from './components/CertificateView';
import { GlossaryView } from './components/GlossaryView';
import { AIMentor } from './components/AIMentor';
import { FlashcardView } from './components/FlashcardView';
import { SimulationLab } from './components/SimulationLab';
import { Onboarding } from './components/Onboarding';
import { SkillMirror } from './components/SkillMirror';
import { BossBattle } from './components/BossBattle';
import { PromptPlayground } from './components/PromptPlayground';
import { RAGVisualizer } from './components/RAGVisualizer';
import { UserGuideView } from './components/UserGuideView';
import { Button, HeroSection, GlassNeonCard } from './components/UI';
import { DIAGNOSTIC_QUIZ } from './constants';

enum Tab {
  Journey = 'journey',
  Roadmap = 'roadmap',
  Resources = 'resources',
  Tools = 'tools',
  Career = 'career',
  Certificate = 'certificate',
  Glossary = 'glossary',
  Flashcards = 'flashcards',
  Labs = 'labs',
  Battle = 'battle',
  Playground = 'playground',
  Visualizer = 'visualizer',
  Profile = 'profile',
  Guide = 'guide' // New
}

type ThemeType = 'crystal' | 'cyberpunk' | 'quantum' | 'aurora' | 'noir' | 'liquid';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Journey);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // Theme & FX State
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('crystal');
  const [isScanline, setIsScanline] = useState(false);
  
  // Onboarding State
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    // Magic UI: Auto-switch theme based on Tab context
    // This creates the "Theme-as-Learning" experience
    if (activeTab === Tab.Labs || activeTab === Tab.Visualizer) setCurrentTheme('quantum');
    else if (activeTab === Tab.Battle) setCurrentTheme('cyberpunk');
    else if (activeTab === Tab.Career || activeTab === Tab.Guide) setCurrentTheme('aurora');
    else if (activeTab === Tab.Journey) setCurrentTheme('liquid'); // Landing is liquid
    else setCurrentTheme('crystal'); // Default
  }, [activeTab]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const onboarded = localStorage.getItem('ai-dev-onboarded');
    if (onboarded) setHasOnboarded(true);
  }, []);

  const handleOnboardingComplete = () => {
    setHasOnboarded(true);
    localStorage.setItem('ai-dev-onboarded', 'true');
    setActiveTab(Tab.Profile); // Go to Skill Mirror after onboarding
  };

  const menuItems = [
    { id: Tab.Journey, label: 'Journey', icon: Rocket },
    { id: Tab.Profile, label: 'My Skills', icon: BrainCircuit },
    { id: Tab.Roadmap, label: 'Projects', icon: Layers },
    { id: Tab.Battle, label: 'Battle', icon: Swords },
    { id: Tab.Playground, label: 'Playground', icon: Split },
    { id: Tab.Visualizer, label: 'RAG Viz', icon: Eye },
    { id: Tab.Labs, label: 'Labs', icon: FlaskConical },
    { id: Tab.Guide, label: 'Guide', icon: HelpCircle }, // New Menu Item
  ];

  const themes = [
    { id: 'crystal', label: 'Crystal Glass', icon: Gem },
    { id: 'cyberpunk', label: 'Cyberpunk', icon: Gamepad2 },
    { id: 'quantum', label: 'Quantum', icon: Cpu },
    { id: 'aurora', label: 'Aurora Prism', icon: Palette },
    { id: 'noir', label: 'Neon Noir', icon: Ghost },
    { id: 'liquid', label: 'Liquid Particle', icon: Droplets },
  ];

  const handleNavigation = (tabId: string) => {
      const tab = Object.values(Tab).find(t => t === tabId);
      if (tab) {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  };

  if (!hasOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className={`min-h-screen font-sans flex flex-col relative overflow-hidden ${isScanline ? 'scanline-active' : ''}`}>
      
      <AIMentor />

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-[var(--glass-bg)] backdrop-blur-xl border-b border-[var(--glass-border)] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab(Tab.Journey)}>
              <div className="relative">
                 <div className="absolute inset-0 bg-brand-400 blur-xl opacity-20 group-hover:opacity-50 transition-opacity"></div>
                 <div className="relative bg-[var(--color-bg-elev1)] p-2.5 rounded-[var(--radius-btn)] border border-[var(--glass-border)]">
                   <BrainCircuit className="text-brand-400 w-6 h-6" />
                 </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-[var(--color-text-main)] font-mono leading-none">
                  AI_Dev<span className="text-brand-400">.Platform</span>
                </span>
                <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest font-semibold">V2.0 Signature</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center p-1 bg-[var(--glass-bg)] rounded-[var(--radius-btn)] border border-[var(--glass-border)] backdrop-blur-md overflow-x-auto max-w-[600px] scrollbar-hide">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3 py-2 rounded-[calc(var(--radius-btn)-4px)] text-xs font-bold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 relative overflow-hidden whitespace-nowrap ${
                      activeTab === item.id 
                        ? 'text-slate-950 shadow-lg bg-brand-400 border border-brand-400' 
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={14} /> {item.label}
                  </button>
                ))}
              </div>

              {/* Settings Toggle */}
              <div className="relative ml-2">
                <button 
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="p-3 rounded-[var(--radius-btn)] bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--color-text-muted)] hover:text-brand-400 transition-colors"
                >
                  <Settings size={20} className={settingsOpen ? 'rotate-90 transition-transform' : 'transition-transform'} />
                </button>
                
                {settingsOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-[var(--radius-card)] bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-xl p-4 animate-slide-up backdrop-blur-xl">
                    <h4 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-3">Interface Theme</h4>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {themes.map(t => (
                        <button 
                          key={t.id}
                          onClick={() => setCurrentTheme(t.id as ThemeType)}
                          className={`flex flex-col items-center justify-center p-3 rounded-[var(--radius-btn)] border text-xs transition-all ${
                            currentTheme === t.id 
                            ? 'bg-brand-500/20 border-brand-400 text-brand-400' 
                            : 'bg-white/5 border-transparent text-[var(--color-text-muted)] hover:bg-white/10'
                          }`}
                        >
                          <t.icon size={18} className="mb-1" />
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-white/10 focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-[var(--glass-bg)] border-b border-[var(--glass-border)] backdrop-blur-xl animate-slide-down shadow-2xl z-40">
            <div className="flex flex-col p-4 space-y-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors ${
                    activeTab === item.id 
                    ? 'bg-brand-500 text-slate-950 shadow-[0_0_15px_var(--color-accent-primary-dim)]' 
                    : 'text-[var(--color-text-muted)] hover:bg-white/5 hover:text-[var(--color-text-main)]'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Settings Toggle */}
               <div className="pt-4 mt-2 border-t border-[var(--glass-border)]">
                  <p className="text-xs text-[var(--color-text-muted)] uppercase mb-3 px-2">Theme</p>
                  <div className="grid grid-cols-3 gap-2">
                    {themes.map(t => (
                      <button 
                        key={t.id}
                        onClick={() => {
                          setCurrentTheme(t.id as ThemeType);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg border text-[10px] transition-all ${
                          currentTheme === t.id 
                          ? 'bg-brand-500/20 border-brand-400 text-brand-400' 
                          : 'bg-white/5 border-transparent text-[var(--color-text-muted)]'
                        }`}
                      >
                        <t.icon size={14} className="mb-1" />
                        {t.label}
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full relative z-10">
        
        {/* Hero Section */}
        {activeTab === Tab.Journey && (
          <HeroSection 
            onStart={() => setActiveTab(Tab.Roadmap)}
            onBrowse={() => setActiveTab(Tab.Resources)}
            currentTheme={currentTheme}
          />
        )}

        {/* Content Tabs */}
        <div className="min-h-[600px] relative z-20">
          {activeTab === Tab.Journey && <JourneyPath onNavigate={handleNavigation} />}
          {activeTab === Tab.Profile && <SkillMirror />} 
          {activeTab === Tab.Roadmap && <RoadmapView />}
          {activeTab === Tab.Battle && <BossBattle />}
          {activeTab === Tab.Playground && <PromptPlayground />}
          {activeTab === Tab.Visualizer && <RAGVisualizer />}
          {activeTab === Tab.Labs && <SimulationLab />}
          {activeTab === Tab.Flashcards && <FlashcardView />}
          {activeTab === Tab.Resources && <ResourcesView />}
          {activeTab === Tab.Tools && <ToolsView />}
          {activeTab === Tab.Career && <CareerView />}
          {activeTab === Tab.Certificate && <CertificateView />}
          {activeTab === Tab.Glossary && <GlossaryView />}
          {activeTab === Tab.Guide && <UserGuideView onNavigate={handleNavigation} />}
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-[var(--glass-bg)] border-t border-[var(--glass-border)] py-16 backdrop-blur-md mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-3">
                 <div className="p-2 bg-[var(--color-bg-elev1)] rounded-[var(--radius-btn)] border border-[var(--glass-border)] shadow-[0_0_15px_var(--color-accent-primary-dim)]">
                   <BrainCircuit className="text-brand-400 w-6 h-6" />
                 </div>
                 <span className="text-2xl font-bold text-[var(--color-text-main)] font-mono tracking-tight">AI_Dev<span className="text-brand-400">.Platform</span></span>
              </div>
              <p className="text-[var(--color-text-muted)] text-sm max-w-xs font-light">
                World-class learning experience for Thai Developers. <br/>
                Project-based curriculum.
              </p>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors">
                <Github size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                <span className="text-sm font-mono transition-opacity group-hover:text-brand-400">GH_REPO</span>
              </a>
              <span className="text-slate-800 h-8 w-[1px] bg-gradient-to-b from-transparent via-slate-700 to-transparent"></span>
              <p className="text-[var(--color-text-muted)] text-xs font-mono">
                SYSTEM_ID: 2026-SIG
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;