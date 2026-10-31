import React from 'react';
import { 
  Building2, 
  Cpu, 
  Globe2, 
  Leaf, 
  GraduationCap, 
  Sparkles, 
  ArrowUpRight,
  FolderOpen
} from 'lucide-react';
import { CATEGORIES_META } from '../data/assignments';

interface CategoryCardsProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onSelectCategory }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Globe2': return <Globe2 className="w-5 h-5" />;
      case 'Leaf': return <Leaf className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      default: return <FolderOpen className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF9F5] border-b border-[#DCDDD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Introductory Section (Section 8.C) */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#74786F] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B76E4B]" />
            <span>PORTFOLIO DOMAINS & CURRICULUM</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl text-[#183D32] leading-tight font-normal">
            A semester of research, observations and ideas.
          </h2>
          
          <p className="text-sm sm:text-base text-[#292D29]/75 mt-3 leading-relaxed">
            The coursework is organized across six thematic domains addressing regional electronic waste infrastructure in Rajasthan, international compliance benchmarks, real-world LEED green buildings, and autonomous circular economy systems.
          </p>
        </div>

        {/* Editorial Grid: 6 Categorical Dossiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_META.map((cat, index) => {
            const sequenceNum = String(index + 1).padStart(2, '0');
            return (
              <div
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className="group relative bg-[#F3F0E7]/60 hover:bg-[#FAF9F5] rounded-lg p-6 border border-[#DCDDD3] hover:border-[#183D32] transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Sequence Number & Icon */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#DCDDD3]">
                    <span className="font-mono text-xs text-[#74786F] tracking-wider">
                      {sequenceNum} / MODULE
                    </span>
                    <span className="text-[#315B45] group-hover:text-[#183D32] transition-colors">
                      {getIcon(cat.icon)}
                    </span>
                  </div>

                  {/* Title & Document Count */}
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-xl text-[#183D32] group-hover:text-[#315B45] transition-colors leading-snug">
                        {cat.name}
                      </h3>
                    </div>
                    
                    <p className="text-xs text-[#292D29]/70 leading-relaxed pt-1">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Footer Link & Count */}
                <div className="pt-4 mt-6 border-t border-[#DCDDD3] flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-[#74786F]">
                    {cat.count} {cat.count === 1 ? 'Primary Document' : 'Primary Documents'}
                  </span>
                  
                  <span className="font-medium text-[#183D32] inline-flex items-center space-x-1 group-hover:text-[#315B45]">
                    <span>Inspect archive</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
