import React, { useState } from 'react';
import { RESOURCES } from '../constants';
import { Search, ExternalLink, Hash, BookOpen, Tag as TagIcon, LayoutGrid, List } from 'lucide-react';
import { SectionHeader, GlassCard, Badge, Button, Breadcrumb } from './UI';

const ResourcesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Extract unique tags
  const allTags = Array.from(new Set(RESOURCES.flatMap(r => r.tags)));

  const filteredResources = RESOURCES.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? resource.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
       <Breadcrumb items={['Home', 'Resources', selectedTag ? `#${selectedTag}` : 'Library']} />

      <div className="text-center pb-8 border-b border-slate-800/50">
        <SectionHeader 
          align="center"
          title="คลังทรัพยากร (Resources Library)" 
          subtitle="แหล่งรวมความรู้ เครื่องมือ และคอร์สเรียนที่คัดสรรมาแล้ว เพื่อช่วยให้คุณไปถึงเป้าหมายได้เร็วขึ้น"
        />
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center sticky top-20 z-30 bg-slate-950/80 backdrop-blur-md p-4 rounded-xl border border-slate-800 shadow-glass">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text"
            placeholder="ค้นหาชื่อคอร์ส, เครื่องมือ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-600 text-sm"
          />
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Tag Filters */}
      <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-slate-500 text-sm mr-2">
            <TagIcon size={16} /> <span className="font-medium">Filter by:</span>
          </div>
          <button 
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedTag === null ? 'bg-brand-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-slate-500'
            }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button 
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                selectedTag === tag 
                  ? 'bg-accent-600 text-white border-accent-600' 
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500'
              }`}
            >
              #{tag}
            </button>
          ))}
      </div>

      {/* Results Grid */}
      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
        {filteredResources.length > 0 ? (
          filteredResources.map((resource, idx) => (
            <a 
              key={idx} 
              href={resource.url}
              className="group"
            >
              <GlassCard className="h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" >
                    <BookOpen size={12} className="mr-1 inline" /> {resource.category}
                  </Badge>
                  {resource.isFree && <Badge variant="success">Free</Badge>}
                </div>
                
                <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-brand-400 transition-colors flex items-center gap-2">
                  {resource.title}
                  <ExternalLink size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-slate-500" />
                </h3>
                
                <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/50 mt-auto">
                  {resource.tags.map(tag => (
                    <span key={tag} className="text-xs text-slate-500 flex items-center gap-0.5 px-1.5 py-0.5 bg-slate-950 rounded">
                      <Hash size={10} />{tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </a>
          ))
        ) : (
          <div className="col-span-full py-16 text-center">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 mb-4">
               <Search size={32} className="text-slate-700" />
             </div>
             <h3 className="text-lg font-medium text-slate-300">ไม่พบข้อมูลที่ตรงกับคำค้นหา</h3>
             <p className="text-slate-500 mt-2">ลองเปลี่ยนคำค้นหาหรือเลือก Tag อื่น</p>
             <Button variant="ghost" className="mt-4" onClick={() => { setSearchTerm(''); setSelectedTag(null); }}>
               ล้างตัวกรองทั้งหมด
             </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesView;