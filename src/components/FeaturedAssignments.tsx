import React from 'react';
import { 
  FileText, 
  Table, 
  Presentation, 
  Image as ImageIcon, 
  Download, 
  Eye, 
  ArrowUpRight,
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
  // Real featured assignments
  const featuredList = assignments.filter((a) => a.featured);
  const leadFeature = featuredList[0] || assignments[0];
  const secondaryFeatures = featuredList.slice(1, 5);

  const getFormatBadge = (ext: string) => {
    switch (ext) {
      case 'PDF':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-[#183D32] text-[#FAF9F5]">PDF</span>;
      case 'XLSX':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-[#315B45] text-[#FAF9F5]">EXCEL</span>;
      case 'PPTX':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-[#B76E4B] text-[#FAF9F5]">SLIDES</span>;
      case 'DOCX':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-[#74786F] text-[#FAF9F5]">DOCUMENT</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-[#A6B49A] text-[#183D32]">{ext}</span>;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#F3F0E7] border-b border-[#DCDDD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-4 border-b border-[#DCDDD3]">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#74786F] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#183D32]" />
              <span>CURATED HIGHLIGHTS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#183D32] leading-tight font-normal">
              Featured Deliverables
            </h2>
            <p className="text-sm text-[#292D29]/75 mt-1 max-w-xl">
              Representative semester submissions covering statutory state e-waste audits, comparative international benchmarks, and empirical building models.
            </p>
          </div>

          <button
            onClick={onBrowseAll}
            className="inline-flex items-center space-x-1.5 text-xs font-medium text-[#183D32] hover:text-[#315B45] tracking-wide transition-colors group"
          >
            <span>View complete archive ({assignments.length} files)</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Lead Featured Card (Prominent Asymmetric Card) */}
        {leadFeature && (
          <div className="mb-8 bg-[#FAF9F5] border border-[#DCDDD3] hover:border-[#183D32] rounded-lg p-6 sm:p-8 transition-all duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center space-x-3 text-xs text-[#74786F]">
                  <span className="font-mono text-[#B76E4B] font-semibold tracking-wider">
                    01 / FEATURED DOSSIER
                  </span>
                  <span>•</span>
                  <span>{leadFeature.category}</span>
                  <span>•</span>
                  <span className="font-mono">{leadFeature.sizeFormatted}</span>
                </div>

                <h3 
                  onClick={() => onViewDocument(leadFeature)}
                  className="font-serif text-2xl sm:text-3xl text-[#183D32] hover:text-[#315B45] cursor-pointer transition-colors leading-snug"
                >
                  {leadFeature.title}
                </h3>

                <p className="text-sm text-[#292D29]/75 leading-relaxed max-w-3xl">
                  {leadFeature.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {leadFeature.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#E3E7DD] text-[#183D32]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#DCDDD3] lg:pl-6">
                <button
                  onClick={() => onViewDocument(leadFeature)}
                  className="px-5 py-3 bg-[#183D32] hover:bg-[#315B45] text-[#FAF9F5] rounded-md text-xs font-medium tracking-wide transition-all inline-flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Document ↗</span>
                </button>

                <a
                  href={resolveDocUrl(leadFeature.url)}
                  download={leadFeature.downloadFilename}
                  className="px-4 py-2.5 bg-transparent hover:bg-[#E3E7DD]/50 text-[#183D32] border border-[#DCDDD3] hover:border-[#183D32] rounded-md text-xs font-medium tracking-wide transition-all inline-flex items-center justify-center space-x-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Original ({leadFeature.extension})</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secondaryFeatures.map((item, index) => {
            const seq = String(index + 2).padStart(2, '0');
            const docUrl = resolveDocUrl(item.url);

            return (
              <div
                key={item.id}
                className="bg-[#FAF9F5] border border-[#DCDDD3] hover:border-[#183D32] rounded-lg p-6 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DCDDD3]">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs text-[#74786F] font-semibold">
                        {seq} / {item.extension}
                      </span>
                      {getFormatBadge(item.extension)}
                    </div>
                    <span className="text-[11px] font-mono text-[#74786F]">
                      {item.sizeFormatted}
                    </span>
                  </div>

                  <span className="text-[11px] font-medium text-[#315B45] uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>

                  <h3 
                    onClick={() => onViewDocument(item)}
                    className="font-serif text-xl text-[#183D32] group-hover:text-[#315B45] cursor-pointer transition-colors leading-snug line-clamp-2"
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#292D29]/75 mt-2 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-[#DCDDD3] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewDocument(item)}
                      className="px-3.5 py-1.5 bg-[#183D32] hover:bg-[#315B45] text-[#FAF9F5] rounded-md text-xs font-medium tracking-wide transition-colors inline-flex items-center space-x-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View document ↗</span>
                    </button>

                    <a
                      href={docUrl}
                      download={item.downloadFilename}
                      className="p-1.5 text-[#74786F] hover:text-[#183D32] hover:bg-[#E3E7DD] border border-[#DCDDD3] rounded-md transition-colors"
                      title="Download original file"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <span className="text-[11px] text-[#74786F] font-mono">
                    {item.academicStage}
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
