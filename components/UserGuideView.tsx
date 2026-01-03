import React, { useState, useEffect } from 'react';
import { SectionHeader, GlassNeonCard, Breadcrumb, Button, CodeBlock } from './UI';
import { Rocket, BrainCircuit, Swords, Split, Eye, Monitor, Book, Sparkles, ShieldAlert, Bot, ArrowRight, Smartphone, Globe, Wifi, Download, List, Zap, Cloud, Share, MoreVertical, Copy } from 'lucide-react';

interface UserGuideViewProps {
  onNavigate: (tab: string) => void;
}

// Global variable to capture the event if it fires before component mounts
let deferredPrompt: any = null;
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
}

export const UserGuideView: React.FC<UserGuideViewProps> = ({ onNavigate }) => {
  const [installReady, setInstallReady] = useState(false);

  useEffect(() => {
    // Check if the event was already captured globally
    if (deferredPrompt) {
      setInstallReady(true);
    }

    // Also listen locally in case it fires now
    const handler = (e: any) => {
      e.preventDefault();
      deferredPrompt = e;
      setInstallReady(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        }
        deferredPrompt = null;
        setInstallReady(false);
      });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Adjust for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20 relative">
      <Breadcrumb items={['Home', 'User Guide']} />
      
      <SectionHeader 
        title="User Guide" 
        subtitle="คู่มือการใช้งานสำหรับนักพัฒนา AI มือใหม่ (Bilingual Guide)"
        badge="Manual"
      />

      {/* Sticky Table of Contents */}
      <div className="sticky top-20 z-40 bg-slate-950/80 backdrop-blur-md p-2 rounded-xl border border-slate-800 shadow-glass flex gap-2 overflow-x-auto scrollbar-hide mb-8">
         <div className="flex items-center px-3 text-slate-500 border-r border-slate-800 mr-2">
            <List size={18} />
         </div>
         {[
           { id: 'guide-start', label: '1. Start', icon: Rocket },
           { id: 'guide-nav', label: '2. Navigation', icon: Monitor },
           { id: 'guide-magic', label: '3. Features', icon: Sparkles },
           { id: 'guide-mobile', label: '4. Mobile & PWA', icon: Smartphone },
         ].map((item) => (
           <button 
             key={item.id}
             onClick={() => scrollToSection(item.id)}
             className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-brand-500 hover:text-slate-900 hover:border-brand-500 transition-all text-xs font-bold uppercase whitespace-nowrap group"
           >
             <item.icon size={14} className="text-slate-400 group-hover:text-slate-900" /> {item.label}
           </button>
         ))}
      </div>

      {/* 1. Getting Started */}
      <section id="guide-start" className="space-y-6">
        <div className="flex items-center gap-3 text-brand-400">
           <Rocket size={28} />
           <h3 className="text-2xl font-bold text-white">1. การเริ่มต้นใช้งาน (Getting Started)</h3>
        </div>
        <GlassNeonCard>
           <p className="text-slate-300 mb-4 leading-relaxed">
             เมื่อคุณเข้าสู่เว็บไซต์ครั้งแรก ระบบจะนำคุณเข้าสู่ <strong>Cinematic Onboarding</strong> เพื่อเริ่มภารกิจของคุณ
             <br/>
             <span className="text-slate-500 italic">Upon your first visit, you will encounter the Cinematic Onboarding to initialize your mission.</span>
           </p>
           <ul className="space-y-4 text-sm text-slate-400 list-disc pl-5">
              <li>
                <strong className="text-white block mb-1">Start Mission</strong>
                คลิกปุ่มเพื่อเริ่มภารกิจ (Click to start).
              </li>
              <li>
                <strong className="text-white block mb-1">Select Class (เลือกสายอาชีพ)</strong>
                เลือกบทบาทที่ต้องการ เช่น AI Architect หรือ Product Builder (Choose your specialized role).
              </li>
              <li>
                <strong className="text-white block mb-1">Confirm</strong>
                ยืนยันเพื่อเข้าสู่ Dashboard ส่วนตัว (Confirm to enter dashboard).
              </li>
           </ul>
        </GlassNeonCard>
      </section>

      {/* 2. Navigation */}
      <section id="guide-nav" className="space-y-6">
        <div className="flex items-center gap-3 text-brand-400">
           <Monitor size={28} />
           <h3 className="text-2xl font-bold text-white">2. เมนูหลัก (Navigation)</h3>
        </div>
        <p className="text-slate-400 text-sm mb-2">คลิกที่การ์ดด้านล่างเพื่อไปยังหน้านั้นๆ (Click cards to navigate):</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             { icon: Rocket, title: "Journey", desc: "ภาพรวมเส้นทาง 4 ขั้นตอน (Overview)", target: 'journey' },
             { icon: BrainCircuit, title: "My Skills", desc: "กราฟทักษะ 3D Skill Mirror", target: 'profile' },
             { icon: Book, title: "Projects", desc: "Roadmap บทเรียนและโปรเจกต์", target: 'roadmap' },
             { icon: Swords, title: "Battle", desc: "Boss Battles โหมดทดสอบวิกฤต", target: 'battle' },
             { icon: Split, title: "Playground", desc: "ทดสอบ Prompt (Model Comparison)", target: 'playground' },
             { icon: Eye, title: "RAG Viz", desc: "ดูภาพจำลอง RAG Pipeline", target: 'visualizer' },
           ].map((item, i) => (
             <button 
               key={i} 
               onClick={() => onNavigate(item.target)}
               className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-brand-400 hover:bg-slate-800 transition-all group text-left"
             >
                <div className="group-hover:scale-110 transition-transform text-brand-400">
                  <item.icon size={24} />
                </div>
                <div>
                   <div className="font-bold text-white group-hover:text-brand-400 transition-colors">{item.title}</div>
                   <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
                <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-slate-500" size={16} />
             </button>
           ))}
        </div>
      </section>

      {/* 3. Magic Features */}
      <section id="guide-magic" className="space-y-6">
        <div className="flex items-center gap-3 text-brand-400">
           <Sparkles size={28} />
           <h3 className="text-2xl font-bold text-white">3. ฟีเจอร์พิเศษ (Magic Features)</h3>
        </div>
        <GlassNeonCard className="space-y-6">
           <div className="flex gap-4 items-start">
              <div className="shrink-0 p-2 bg-brand-500/10 rounded-lg h-fit text-brand-400"><BrainCircuit size={20}/></div>
              <div className="flex-grow">
                <h4 className="font-bold text-lg text-white mb-1">Skill Mirror</h4>
                <p className="text-sm text-slate-400 mb-2">กราฟเรดาร์แสดงค่าพลัง 5 ด้าน (Frontend, Backend, AI Theory, DevOps, Ethics) ค่าพลังจะเพิ่มขึ้นเมื่อคุณเรียนจบ Phase หรือทำ Project สำเร็จ</p>
                <button onClick={() => onNavigate('profile')} className="text-xs font-bold text-brand-400 hover:text-white flex items-center gap-1">
                   Go to Profile <ArrowRight size={12}/>
                </button>
              </div>
           </div>
           
           <div className="flex gap-4 items-start">
              <div className="shrink-0 p-2 bg-red-500/10 rounded-lg h-fit text-red-400"><Swords size={20}/></div>
              <div className="flex-grow">
                <h4 className="font-bold text-lg text-white mb-1">Boss Battles</h4>
                <p className="text-sm text-slate-400 mb-2">สถานการณ์จำลองวิกฤต (Crisis Simulation) ที่มีเวลาจำกัด คุณต้องเลือกวิธีแก้ปัญหาที่ถูกต้องเพื่อกู้ระบบให้ทันเวลา</p>
                <button onClick={() => onNavigate('battle')} className="text-xs font-bold text-red-400 hover:text-white flex items-center gap-1">
                   Enter Battle Arena <ArrowRight size={12}/>
                </button>
              </div>
           </div>

           <div className="flex gap-4 items-start">
              <div className="shrink-0 p-2 bg-emerald-500/10 rounded-lg h-fit text-emerald-400"><Bot size={20}/></div>
              <div className="flex-grow">
                <h4 className="font-bold text-lg text-white mb-1">AI Mentor</h4>
                <p className="text-sm text-slate-400">คลิกไอคอนหุ่นยนต์มุมขวาล่างเพื่อถามคำถาม Mentor จะเน้น "สอนให้คิด" และชี้เป้าบทเรียน ไม่เฉลย Code ให้ลอกโดยตรง</p>
              </div>
           </div>
        </GlassNeonCard>
      </section>

      {/* 4. Deployment & Access (New) */}
      <section id="guide-mobile" className="space-y-6">
        <div className="flex items-center gap-3 text-brand-400">
           <Smartphone size={28} />
           <h3 className="text-2xl font-bold text-white">4. การใช้งานบนมือถือและเครื่องอื่น</h3>
        </div>
        <GlassNeonCard className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Option 1: PWA */}
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 flex flex-col">
                 <div className="flex items-center gap-2 mb-2 text-brand-400">
                    <Smartphone size={20} /> <span className="font-bold">ติดตั้งลงมือถือ (PWA)</span>
                 </div>
                 
                 {installReady ? (
                    <>
                        <p className="text-sm text-slate-400 mb-4 flex-grow">
                            ติดตั้งเป็น App ลงบนเครื่องเพื่อการใช้งานที่ลื่นไหลที่สุด (รองรับ Offline)
                        </p>
                        <Button 
                        onClick={handleInstallClick}
                        variant='primary'
                        className="w-full text-xs"
                        icon={Download}
                        >
                        Install App Now
                        </Button>
                    </>
                 ) : (
                    <div className="mt-2 space-y-4">
                        <p className="text-sm text-slate-400 mb-2">
                           <span className="text-yellow-400 font-bold">Manual Install:</span> วิธีติดตั้งเอง (หากปุ่ม Install ไม่ขึ้น)
                        </p>
                        
                        <div className="p-3 bg-black/40 rounded-lg border border-slate-700 group hover:border-blue-500/30 transition-colors">
                            <h5 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                                <Share size={14} className="text-blue-400"/> iOS (Safari)
                            </h5>
                            <p className="text-[10px] text-slate-400 pl-6 leading-relaxed">
                                1. กดปุ่ม <strong>Share</strong> (ด้านล่าง)<br/>
                                2. เลื่อนลงแล้วเลือก <strong>"Add to Home Screen"</strong>
                            </p>
                        </div>

                        <div className="p-3 bg-black/40 rounded-lg border border-slate-700 group hover:border-green-500/30 transition-colors">
                            <h5 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                                <MoreVertical size={14} className="text-green-400"/> Android (Chrome)
                            </h5>
                            <p className="text-[10px] text-slate-400 pl-6 leading-relaxed">
                                1. กดปุ่ม <strong>Menu</strong> (3 จุดมุมขวาบน)<br/>
                                2. เลือก <strong>"Install App"</strong> หรือ "Add to Home Screen"
                            </p>
                        </div>
                    </div>
                 )}
              </div>

              {/* Option 2: Deployment */}
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                 <div className="flex items-center gap-2 mb-2 text-emerald-400">
                    <Globe size={20} /> <span className="font-bold">Deploy จริง (Cloud)</span>
                 </div>
                 <p className="text-sm text-slate-400 mb-3">
                    นำเว็บขึ้นออนไลน์ถาวรผ่าน Cloud Server เพื่อให้เข้าถึงได้จากทุกที่และแชร์ให้คนอื่นดูได้
                 </p>
                 <div className="text-xs text-slate-500 space-y-2">
                    <div className="flex flex-col gap-2">
                       <span className="font-bold text-white">Vercel (แนะนำ):</span>
                       <a href="https://vercel.com/new" target="_blank" className="text-brand-400 hover:underline flex items-center gap-1">
                          Deploy via Vercel <ArrowRight size={10}/>
                       </a>
                       <span className="text-[10px] opacity-70">เชื่อมต่อ GitHub Repo เข้ากับ Vercel.com เพื่อรับ URL ฟรี (เช่น my-app.vercel.app)</span>
                    </div>
                 </div>
              </div>
              
              {/* Option 3: Local Network */}
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                 <div className="flex items-center gap-2 mb-2 text-orange-400">
                    <Wifi size={20} /> <span className="font-bold">WiFi วงเดียวกัน (LAN)</span>
                 </div>
                 <p className="text-xs text-slate-400 mb-2">
                    เปิดดูในมือถือที่ต่อ WiFi เดียวกันกับคอมพิวเตอร์:
                 </p>
                 <ol className="list-decimal pl-4 space-y-1 text-xs text-slate-500 mb-3">
                    <li>เปิด Terminal ในโปรเจกต์</li>
                    <li>รันคำสั่ง <span className="text-emerald-400 font-mono bg-black px-1 rounded">npm run dev -- --host</span></li>
                    <li>ดู IP Address ที่ขึ้นใน Terminal (เช่น 192.168.1.5:5173)</li>
                    <li>พิมพ์ IP นั้นใน Browser มือถือ</li>
                 </ol>
              </div>

              {/* Option 4: Tunneling (Different WiFi) */}
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-2 bg-blue-500/10 rounded-bl-xl text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                    Recommended
                 </div>
                 <div className="flex items-center gap-2 mb-2 text-blue-400">
                    <Cloud size={20} /> <span className="font-bold">ต่างวงแลน (Tunneling)</span>
                 </div>
                 <p className="text-xs text-slate-400 mb-3">
                    วิธีเปิดดูผ่าน 4G/5G หรือ WiFi คนละที่กับคอมพิวเตอร์ (ไม่ต้อง Deploy):
                 </p>
                 
                 <div className="space-y-2">
                    <div className="bg-black p-3 rounded-lg border border-slate-800 group relative">
                       <code className="text-xs font-mono text-blue-300 block mb-1">npx localtunnel --port 5173</code>
                       <p className="text-[10px] text-slate-600 italic">// รันคำสั่งนี้ใน Terminal ใหม่ ขณะที่เปิด Server อยู่</p>
                       
                       <button 
                         onClick={() => navigator.clipboard.writeText('npx localtunnel --port 5173')}
                         className="absolute top-2 right-2 p-1.5 bg-slate-800 text-slate-400 hover:text-white rounded transition-colors"
                         title="Copy Command"
                       >
                          <Copy size={12} />
                       </button>
                    </div>
                    
                    <p className="text-[10px] text-slate-500">
                       <span className="text-blue-400 font-bold">ผลลัพธ์:</span> คุณจะได้ลิงก์ (เช่น https://lazy-cat.loca.lt) ส่งให้เพื่อนหรือเปิดบนมือถือได้ทันที
                    </p>
                 </div>
              </div>

           </div>
        </GlassNeonCard>
      </section>

      <div className="p-6 bg-gradient-to-r from-brand-900/40 to-slate-900 border border-brand-500/30 rounded-2xl text-center">
         <h4 className="font-bold text-xl text-white mb-2">พร้อมเริ่มภารกิจหรือยัง?</h4>
         <p className="text-sm text-slate-400 mb-4">คลิกที่เมนู <strong>Journey</strong> เพื่อเริ่มก้าวแรกสู่การเป็น AI Engineer</p>
         <Button onClick={() => onNavigate('journey')} className="mx-auto" icon={Rocket}>
            Start Journey
         </Button>
      </div>

    </div>
  );
};