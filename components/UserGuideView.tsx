import React from 'react';
import { SectionHeader, GlassNeonCard, Breadcrumb, Button } from './UI';
import { Rocket, BrainCircuit, Swords, Split, Eye, Monitor, Book, Sparkles, ShieldAlert, Bot, ArrowRight } from 'lucide-react';

interface UserGuideViewProps {
  onNavigate: (tab: string) => void;
}

export const UserGuideView: React.FC<UserGuideViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-20">
      <Breadcrumb items={['Home', 'User Guide']} />
      
      <SectionHeader 
        title="User Guide" 
        subtitle="คู่มือการใช้งานสำหรับนักพัฒนา AI มือใหม่ (Bilingual Guide)"
        badge="Manual"
      />

      {/* 1. Getting Started */}
      <section className="space-y-6">
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
      <section className="space-y-6">
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
      <section className="space-y-6">
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