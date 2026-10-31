import React from 'react';
import { 
  FileText, 
  Table, 
  Presentation, 
  Image as ImageIcon, 
  Download, 
  Eye, 
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { Assignment } from '../types';
import { resolveDocUrl } from '../data/assignments';

interface AssignmentCardProps {
  assignment: Assignment;
  onView: (assignment: Assignment) => void;
  index?: number;
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment, onView, index }) => {
  const docUrl = resolveDocUrl(assignment.url);
  const sequenceStr = index !== undefined ? String(index + 1).padStart(2, '0') : null;

  const getFormatBadge = (ext: string) => {
    switch (ext) {
      case 'PDF':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#183D32] text-[#FAF9F5]">PDF</span>;
      case 'XLSX':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#315B45] text-[#FAF9F5]">XLSX</span>;
      case 'PPTX':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#B76E4B] text-[#FAF9F5]">PPTX</span>;
      case 'DOCX':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#74786F] text-[#FAF9F5]">DOCX</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#A6B49A] text-[#183D32]">{ext}</span>;
    }
  };

  return (
    <div className="bg-[#FAF9F5] rounded-lg border border-[#DCDDD3] hover:border-[#183D32] transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-5">
        
        {/* Header Metadata */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DCDDD3] gap-2">
          <div className="flex items-center space-x-2">
            {sequenceStr && (
              <span className="font-mono text-xs text-[#74786F]">
                {sequenceStr}
              </span>
            )}
            {getFormatBadge(assignment.extension)}
            <span className="text-[11px] font-mono text-[#74786F]">
              {assignment.sizeFormatted}
            </span>
          </div>

          <span className="text-[10px] font-mono uppercase tracking-wider text-[#315B45] bg-[#E3E7DD] px-2 py-0.5 rounded truncate max-w-[170px]">
            {assignment.category}
          </span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onView(assignment)}
          className="font-serif text-lg text-[#183D32] group-hover:text-[#315B45] transition-colors leading-snug cursor-pointer line-clamp-2"
        >
          {assignment.title}
        </h3>

        {/* Source Filename */}
        <p className="mt-1 font-mono text-[11px] text-[#74786F] truncate">
          {assignment.filename}
        </p>

        {/* Description */}
        <p className="mt-2.5 text-xs text-[#292D29]/75 line-clamp-3 leading-relaxed">
          {assignment.description}
        </p>

        {/* Tags */}
        <div className="mt-4 pt-3 border-t border-[#DCDDD3] flex flex-wrap gap-1">
          {assignment.tags.map((tag) => (
            <span 
              key={tag}
              className="text-[10px] font-mono bg-[#E3E7DD]/60 text-[#183D32] px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="bg-[#F3F0E7]/60 px-5 py-3 border-t border-[#DCDDD3] flex items-center justify-between gap-2">
        <button
          onClick={() => onView(assignment)}
          className="px-3 py-1.5 bg-[#183D32] hover:bg-[#315B45] text-[#FAF9F5] rounded-md text-xs font-medium tracking-wide inline-flex items-center space-x-1.5 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View document ↗</span>
        </button>

        <div className="flex items-center space-x-1.5">
          <a
            href={docUrl}
            download={assignment.downloadFilename}
            className="p-1.5 text-[#74786F] hover:text-[#183D32] hover:bg-[#FAF9F5] border border-[#DCDDD3] rounded-md transition-colors"
            title="Download original file"
          >
            <Download className="w-3.5 h-3.5" />
          </a>

          <a
            href={docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-[#74786F] hover:text-[#183D32] hover:bg-[#FAF9F5] border border-[#DCDDD3] rounded-md transition-colors"
            title="Open in standalone tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
