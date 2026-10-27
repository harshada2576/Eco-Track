import React from 'react';
import { 
  FileText, 
  Table, 
  Presentation, 
  Image as ImageIcon, 
  Download, 
  Eye, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Assignment } from '../types';
import { resolveDocUrl } from '../data/assignments';

interface FeaturedAssignmentsProps {
  assignments: Assignment[];
  onViewDocument: (assignment: Assignment) => void;
  onBrowseAll: () => void;
}

export const FeaturedAssignments: React.FC<FeaturedAssignmentsProps> = ({
  assignments,
  onViewDocument,
  onBrowseAll
}) => {
  const featuredList = assignments.filter((a) => a.featured).slice(0, 6);

  const getFormatBadge = (ext: string) => {
    switch (ext) {
      case 'PDF':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">PDF</span>;
      case 'XLSX':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">EXCEL</span>;
      case 'PPTX':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">PPTX</span>;
      case 'DOCX':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">WORD</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">{ext}</span>;
    }
  };

  return (
    <section className="py-12 bg-offwhite-100 border-b border-forest-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-forest-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-forest-600" />
              <span>Key Semester Submissions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
              Featured Deliverables
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Major milestones including state-level field models, multi-sheet analytical trackers, and circular economy architecture.
            </p>
          </div>

          <button
            onClick={onBrowseAll}
            className="inline-flex items-center space-x-1 text-xs sm:text-sm font-semibold text-forest-800 hover:text-forest-950 hover:underline"
          >
            <span>View all {assignments.length} assignments</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getFormatBadge(item.extension)}
                    <span className="text-[11px] text-slate-500 font-medium">
                      {item.sizeFormatted}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-forest-700 bg-forest-50 px-2.5 py-0.5 rounded-full border border-forest-100 truncate max-w-[150px]">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center space-x-2">
                <button
                  onClick={() => onViewDocument(item)}
                  className="flex-1 px-3 py-2 bg-forest-800 hover:bg-forest-700 text-white rounded-lg text-xs font-semibold inline-flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Document</span>
                </button>

                <a
                  href={resolveDocUrl(item.url)}
                  download={item.downloadFilename}
                  className="p-2 text-slate-600 hover:text-forest-900 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs transition-colors"
                  title="Download Original"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
