import React, { useState } from 'react';
import { LucideIcon, ChevronRight, ChevronDown, Copy, Check, Zap, BookOpen, Layers, Star, Rocket, Cpu, Activity, Sparkles } from 'lucide-react';

// --- Design Tokens Wrapper Components ---

export const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
}> = ({ title, subtitle, badge, align = 'left' }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'} space-y-4 relative z-10`}>
    {/* Dynamic Decorative Line based on theme (border-radius handled by CSS var) */}
    {align === 'left' && <div className="w-12 h-1.5 bg-gradient-to-r from-brand-400 to-transparent mb-4 rounded-full shadow-[0_0_10px_var(--color-accent-primary)]"></div>}
    {align === 'center' && <div className="w-16 h-1.5 bg-gradient-to-r from-transparent via-brand-400 to-transparent mx-auto mb-4 rounded-full shadow-[0_0_10px_var(--color-accent-primary)]"></div>}

    {badge && (
      <span className="inline-flex items-center px-3 py-1 text-xs font-mono font-bold tracking-widest text-brand-400 border border-brand-500/30 mb-2 uppercase bg-brand-500/10 rounded-[var(--radius-btn)]">
        // {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight relative z-10 text-[var(--color-text-main)]">
      {title}
    </h2>
    {subtitle && (
      <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto leading-relaxed font-light">
        {subtitle}
      </p>
    )}
  </div>
);

// --- New Spec: GlassNeonCard ---
export const GlassNeonCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}> = ({ children, className = '', hoverEffect = true }) => (
  <div className={`
    glass-panel p-6 relative overflow-hidden group
    transition-all duration-300 ease-out
    ${hoverEffect ? 'hover:border-brand-500/50 hover:shadow-[0_0_20px_var(--color-accent-primary-dim)] hover:-translate-y-1' : ''}
    ${className}
  `}>
    {/* Theme-Specific Specular Highlight */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
    
    {/* Neon Edge / Liquid Shine Animation */}
    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <div className="relative z-10 text-[var(--color-text-main)]">
      {children}
    </div>
  </div>
);

// Backward compatibility alias
export const GlassCard = GlassNeonCard;

// --- New Spec: NeonTagPill ---
export const NeonTagPill: React.FC<{
  children: React.ReactNode;
  variant?: 'brand' | 'accent' | 'success' | 'outline' | 'warning';
}> = ({ children, variant = 'outline' }) => {
  const styles = {
    brand: 'text-brand-400 border-brand-400 bg-brand-400/10 shadow-[0_0_5px_var(--color-accent-primary-dim)]',
    accent: 'text-accent-400 border-accent-400 bg-accent-400/10 shadow-[0_0_5px_var(--color-accent-secondary-dim)]',
    success: 'text-emerald-400 border-emerald-500 bg-emerald-500/10',
    warning: 'text-orange-400 border-orange-500 bg-orange-500/10',
    outline: 'text-[var(--color-text-muted)] border-[var(--glass-border)] bg-[var(--glass-bg)]',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${styles[variant]}`}>
      {children}
    </span>
  );
};

export const Badge = NeonTagPill;

export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, variant = 'primary', icon: Icon, className = '', disabled }) => {
  // Using var(--radius-btn) for theme adaptability
  const baseStyle = "inline-flex items-center justify-center gap-2 px-6 py-3 font-bold tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm rounded-[var(--radius-btn)]";
  
  const variants = {
    primary: "bg-brand-500 hover:bg-brand-400 text-slate-950 shadow-[0_0_15px_var(--color-accent-primary-dim)] border border-brand-400 relative overflow-hidden group",
    secondary: "bg-[var(--glass-bg)] hover:bg-[var(--glass-highlight)] text-[var(--color-text-main)] border border-[var(--glass-border)] backdrop-blur-md",
    ghost: "bg-transparent hover:bg-white/5 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"></div>
      )}
      {Icon && <Icon size={18} className="relative z-10" />}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export const Callout: React.FC<{
  title?: string;
  children: React.ReactNode;
  type?: 'info' | 'tip';
}> = ({ title, children, type = 'info' }) => (
  <div className={`p-5 rounded-[var(--radius-card)] border-l-4 backdrop-blur-sm ${type === 'info' ? 'bg-[var(--glass-bg)] border-brand-400' : 'bg-[var(--glass-bg)] border-emerald-500'} my-6 relative overflow-hidden`}>
    <div className={`absolute inset-0 opacity-10 ${type === 'info' ? 'bg-gradient-to-r from-brand-400' : 'bg-gradient-to-r from-emerald-500'} to-transparent pointer-events-none`}></div>
    {title && <h4 className={`text-sm font-bold mb-2 uppercase tracking-wider flex items-center gap-2 ${type === 'info' ? 'text-brand-400' : 'text-emerald-400'}`}>
       {type === 'info' ? 'ℹ INFO' : '✓ TIP'} : {title}
    </h4>}
    <div className="text-[var(--color-text-main)] text-sm leading-relaxed relative z-10">{children}</div>
  </div>
);

export const Breadcrumb: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-6 font-mono uppercase tracking-wider opacity-80">
    <span className="text-brand-400">ROOT</span>
    {items.map((item, index) => (
      <React.Fragment key={index}>
        <ChevronRight size={10} />
        <span className={index === items.length - 1 ? 'text-[var(--color-text-main)] font-bold' : ''}>{item}</span>
      </React.Fragment>
    ))}
  </div>
);

export const Accordion: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-[var(--glass-border)] rounded-[var(--radius-card)] overflow-hidden bg-[var(--glass-bg)] backdrop-blur-sm transition-all hover:border-[var(--glass-highlight)]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-left hover:bg-white/5 transition-colors group"
      >
        <span className="font-semibold text-[var(--color-text-main)] group-hover:text-brand-400 transition-colors">{title}</span>
        {isOpen ? <ChevronDown size={20} className="text-brand-400" /> : <ChevronRight size={20} className="text-[var(--color-text-muted)]" />}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 text-[var(--color-text-muted)] text-sm border-t border-[var(--glass-border)] leading-relaxed bg-black/10">
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  );
};

export const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = 'bash' }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-bg-elev1)] border border-[var(--glass-border)] font-mono text-sm my-6 shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-[var(--glass-border)]">
        <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest opacity-50">{language}</span>
        <button onClick={handleCopy} className="text-[var(--color-text-muted)] hover:text-white transition-colors">
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-slate-300">
        <pre className="font-light"><code className="block">{code}</code></pre>
      </div>
    </div>
  );
};

// --- New Spec: HeroSection (Dynamic per Theme) ---
export const HeroSection: React.FC<{
  onStart: () => void;
  onBrowse: () => void;
  currentTheme: string;
}> = ({ onStart, onBrowse, currentTheme }) => {
  
  // Dynamic 3D Object Render
  const renderHeroObject = () => {
    switch (currentTheme) {
      case 'liquid':
        return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-brand-400 to-accent-400 rounded-full blur-[60px] opacity-40 animate-morph mix-blend-screen"></div>;
      case 'quantum':
         return (
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-brand-500/20 rounded-full animate-spin-slow">
             <div className="absolute inset-0 border border-accent-400/20 rounded-full rotate-45 scale-75"></div>
             <div className="absolute inset-0 bg-brand-500/5 blur-[80px]"></div>
           </div>
         );
      case 'aurora':
         return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] bg-gradient-to-r from-brand-400 via-accent-400 to-brand-600 blur-[100px] opacity-20 animate-pulse-slow"></div>;
      case 'cyberpunk':
        return (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]">
            <div className="absolute inset-0 border-4 border-brand-400 rotate-45 animate-glitch opacity-70 mix-blend-overlay"></div>
            <div className="absolute inset-0 border-4 border-accent-400 -rotate-12 animate-pulse opacity-70 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-brand-500/10 blur-[50px]"></div>
          </div>
        );
      case 'noir':
        return (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-white/20 rounded-full animate-spin-slow" style={{ perspective: '1000px' }}>
             <div className="w-full h-full border border-red-500/30 rounded-full animate-ping opacity-20"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border border-white/40 rotate-45"></div>
             </div>
          </div>
        );
      default: // Crystal (Default)
         return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>;
    }
  };

  return (
    <div className="text-center mb-24 space-y-8 animate-fade-in relative perspective-1000">
      
      {/* Background Object */}
      <div className="-z-10 pointer-events-none">
        {renderHeroObject()}
      </div>

      {/* Status Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--glass-bg)] border border-brand-400 backdrop-blur-md text-xs text-brand-400 font-bold uppercase tracking-widest shadow-[0_0_15px_var(--color-accent-primary-dim)] mb-8 hover:scale-105 transition-transform cursor-default">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400"></span>
        </span>
        System Updated: 2026 Patch
      </div>
      
      {/* Dynamic Heading */}
      <div className="relative z-10 transform hover:scale-105 transition-transform duration-700 ease-out">
        <h1 className="text-6xl md:text-8xl font-black text-[var(--color-text-main)] tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl">
          CRAFT YOUR <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-white to-brand-400 animate-shine bg-[length:200%_auto]">
            FUTURE SELF
          </span>
        </h1>
        <div className="h-1 w-24 bg-brand-400 mx-auto rounded-full shadow-[0_0_20px_var(--color-accent-primary-dim)] mb-6"></div>
      </div>
      
      <p className="max-w-2xl mx-auto text-xl text-[var(--color-text-muted)] leading-relaxed font-light">
        Interactive Roadmap สำหรับนักพัฒนาที่ต้องการ <span className="text-[var(--color-text-main)] font-medium">Evolution</span> สู่ AI Engineer 
        ด้วยโครงสร้างการเรียนรู้แบบ <span className="text-brand-400 font-mono">Step-by-Step</span>
      </p>

      {/* Glass Stat Chips */}
      <div className="flex flex-wrap justify-center gap-4 my-8">
         {[
           { label: 'Phases', val: '06', icon: Layers },
           { label: 'Steps', val: '04', icon: Rocket },
           { label: 'Goal', val: '01', icon: Star },
         ].map((stat, i) => (
           <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-[var(--radius-card)] bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur hover:border-brand-400 transition-colors group">
              <div className="p-2 bg-white/5 rounded-md text-brand-400 group-hover:text-slate-950 group-hover:bg-brand-400 transition-all">
                <stat.icon size={18} />
              </div>
              <div className="text-left">
                 <div className="text-2xl font-bold text-[var(--color-text-main)] leading-none font-mono">{stat.val}</div>
                 <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-bold">{stat.label}</div>
              </div>
           </div>
         ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
        <Button 
          variant="primary" 
          onClick={onStart}
          icon={Zap}
          className="text-lg px-10 py-4"
        >
          Start Sequence
        </Button>
        <Button 
          variant="secondary" 
          onClick={onBrowse}
          icon={BookOpen}
          className="text-lg px-10 py-4"
        >
          Access Data
        </Button>
      </div>
    </div>
  );
};