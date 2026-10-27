import React from 'react';
import { 
  Building2, 
  Cpu, 
  Globe2, 
  Leaf, 
  GraduationCap, 
  Sparkles, 
  ArrowRight,
  FolderOpen
} from 'lucide-react';
import { CATEGORIES_META } from '../data/assignments';

interface CategoryCardsProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onSelectCategory }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Globe2': return <Globe2 className="w-6 h-6" />;
      case 'Leaf': return <Leaf className="w-6 h-6" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      default: return <FolderOpen className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-12 bg-white border-b border-forest-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1 text-xs font-bold text-forest-700 uppercase tracking-wider mb-1">
              <span>Curated Portfolio Modules</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
              Academic Categories
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Coursework is classified into 6 focus areas derived from syllabus deliverables and research milestones.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Select any category to view its assignments
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_META.map((cat) => (
            <div
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className="group relative bg-offwhite-50 hover:bg-white rounded-2xl p-6 border border-forest-100 hover:border-forest-300 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-forest-800 text-emerald-300 group-hover:scale-110 transition-transform">
                    {getIcon(cat.icon)}
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${cat.badgeBg}`}>
                    {cat.count} {cat.count === 1 ? 'Document' : 'Documents'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-forest-800 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-forest-700 group-hover:text-forest-900">
                <span>View Coursework</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
