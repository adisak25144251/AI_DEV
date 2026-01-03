import React from 'react';
import { CAREER_SKILLS, FAQ_DATA } from '../constants';
import { Briefcase, HeartHandshake, HelpCircle } from 'lucide-react';
import { SectionHeader, GlassCard, Badge, Accordion, Breadcrumb } from './UI';

const CareerView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
       <Breadcrumb items={['Home', 'Career & Skills']} />

      <SectionHeader 
        title="Career & Soft Skills" 
        subtitle="ทักษะที่นายจ้างมองหา และคำแนะนำในการเตรียมตัวสมัครงานสาย AI"
      />

      {/* Soft Skills Section */}
      <section>
        <div className="flex items-center gap-2 mb-6 text-brand-400">
           <HeartHandshake size={24} />
           <h3 className="text-xl font-bold text-white">Essential Soft Skills</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CAREER_SKILLS.map((item, idx) => (
             <GlassCard key={idx} hoverEffect={false} className="border-l-4 border-l-brand-500">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg text-white">{item.skill}</h4>
                  <Badge variant={item.level === 'Must Have' ? 'warning' : 'success'}>{item.level}</Badge>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
             </GlassCard>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="flex items-center gap-2 mb-6 text-brand-400">
           <HelpCircle size={24} />
           <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
        </div>
        
        <div className="space-y-3">
           {FAQ_DATA.map((faq, idx) => (
             <Accordion key={idx} title={faq.question} defaultOpen={idx === 0}>
               {faq.answer}
             </Accordion>
           ))}
        </div>
      </section>
      
      {/* CTA */}
      <div className="bg-gradient-to-r from-brand-900/40 to-accent-900/40 border border-brand-500/30 rounded-2xl p-8 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">พร้อมเริ่มงานหรือยัง?</h3>
        <p className="text-slate-300 max-w-lg mx-auto">
          อย่าลืมสร้าง Portfolio รวมโปรเจกต์ที่ทำจริงจาก Roadmap นี้เพื่อยืนยันความสามารถของคุณ
        </p>
      </div>

    </div>
  );
};

export default CareerView;