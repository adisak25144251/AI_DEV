import React, { useState } from 'react';
import { SectionHeader, GlassNeonCard, CodeBlock, Button, Breadcrumb } from './UI';
import { Terminal, Activity, DollarSign, Server, Play } from 'lucide-react';

export const SimulationLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'dashboard' | 'editor'>('terminal');

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
      <Breadcrumb items={['Home', 'Labs', 'Production Simulator']} />
      
      <SectionHeader 
        title="Production Simulator" 
        subtitle="จำลองสถานการณ์จริงของ AI Engineer ทั้งการ Deploy, การดู Cost และการ Monitor ระบบ"
        badge="Hands-on Lab"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-2">
           <button 
             onClick={() => setActiveTab('terminal')}
             className={`w-full p-3 rounded-lg flex items-center gap-3 text-sm font-bold transition-all ${activeTab === 'terminal' ? 'bg-brand-500 text-slate-900' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
           >
             <Terminal size={18} /> Terminal
           </button>
           <button 
             onClick={() => setActiveTab('dashboard')}
             className={`w-full p-3 rounded-lg flex items-center gap-3 text-sm font-bold transition-all ${activeTab === 'dashboard' ? 'bg-brand-500 text-slate-900' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
           >
             <Activity size={18} /> Ops Dashboard
           </button>
           <button 
             onClick={() => setActiveTab('editor')}
             className={`w-full p-3 rounded-lg flex items-center gap-3 text-sm font-bold transition-all ${activeTab === 'editor' ? 'bg-brand-500 text-slate-900' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
           >
             <Server size={18} /> Deploy Config
           </button>
           
           <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Lab Status</h4>
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Running
              </div>
              <div className="mt-2 text-xs text-slate-400">Uptime: 00:12:45</div>
           </div>
        </div>

        {/* Main Viewport */}
        <div className="lg:col-span-3 h-[500px]">
           
           {/* Terminal View */}
           {activeTab === 'terminal' && (
             <GlassNeonCard className="h-full font-mono text-sm bg-black/90 flex flex-col p-0 overflow-hidden border-slate-800">
               <div className="bg-slate-900 p-2 flex gap-2 border-b border-slate-800">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 <div className="text-xs text-slate-500 ml-2">user@ai-dev-box:~/project</div>
               </div>
               <div className="p-4 space-y-2 text-slate-300 flex-1 overflow-y-auto">
                 <div>$ docker build -t rag-api .</div>
                 <div className="text-slate-500">[+] Building 2.4s (12/12) FINISHED</div>
                 <div className="text-emerald-500">{'>'} ={'>'} writing image sha256:3a9... done</div>
                 <div>$ docker run -p 8000:8000 rag-api</div>
                 <div className="text-blue-400">INFO: Started server process [1]</div>
                 <div className="text-blue-400">INFO: Waiting for application startup.</div>
                 <div className="text-blue-400">INFO: Application startup complete.</div>
                 <div className="text-blue-400">INFO: Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)</div>
                 <div className="flex items-center gap-1">
                    <span className="text-green-500">➜</span>
                    <span className="animate-pulse w-2 h-4 bg-slate-500 inline-block"></span>
                 </div>
               </div>
             </GlassNeonCard>
           )}

           {/* Dashboard View */}
           {activeTab === 'dashboard' && (
             <GlassNeonCard className="h-full flex flex-col">
                <div className="grid grid-cols-3 gap-4 mb-6">
                   <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                      <div className="text-xs text-slate-500 uppercase">Total Tokens</div>
                      <div className="text-2xl font-bold text-white">1,240k</div>
                      <div className="text-xs text-emerald-400">+12% vs last hr</div>
                   </div>
                   <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                      <div className="text-xs text-slate-500 uppercase">Est. Cost</div>
                      <div className="text-2xl font-bold text-white">$4.20</div>
                      <div className="text-xs text-slate-400">GPT-4o usage</div>
                   </div>
                   <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                      <div className="text-xs text-slate-500 uppercase">Latency (P95)</div>
                      <div className="text-2xl font-bold text-orange-400">1.2s</div>
                      <div className="text-xs text-slate-400">Needs optimization</div>
                   </div>
                </div>

                <div className="flex-1 bg-slate-900/30 rounded-lg border border-slate-800 p-4 relative flex items-end justify-between gap-1">
                   {/* Fake Chart */}
                   {[40, 60, 45, 70, 80, 50, 65, 90, 75, 60, 85, 95].map((h, i) => (
                      <div key={i} className="w-full bg-brand-500/50 hover:bg-brand-400 transition-colors rounded-t" style={{ height: `${h}%`}}></div>
                   ))}
                   <div className="absolute top-2 right-2 text-xs text-slate-500">Requests / Minute</div>
                </div>
             </GlassNeonCard>
           )}

           {/* Editor View */}
           {activeTab === 'editor' && (
              <GlassNeonCard className="h-full p-0 flex flex-col bg-slate-950">
                 <div className="bg-slate-900 p-2 border-b border-slate-800 text-xs text-slate-400 flex justify-between">
                    <span>docker-compose.yml</span>
                    <Button variant="ghost" className="h-6 text-xs py-0 px-2 text-brand-400"><Play size={10} className="mr-1"/> Deploy</Button>
                 </div>
                 <div className="flex-1 overflow-auto p-4">
                    <CodeBlock language="yaml" code={`version: '3.8'
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
    depends_on:
      - vectordb

  vectordb:
    image: semitechnologies/weaviate:1.19.6
    ports:
      - "8080:8080"
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'`} />
                 </div>
              </GlassNeonCard>
           )}

        </div>
      </div>
    </div>
  );
};