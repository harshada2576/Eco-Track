import React from 'react';
import { 
  FileText, 
  Table, 
  Presentation, 
  Image as ImageIcon, 
  Download, 
  Eye, 
  ExternalLink, 
  Tag, 
  Folder 
} from 'lucide-react';
import { Assignment } from '../types';
import { resolveDocUrl } from '../data/assignments';

interface AssignmentCardProps {
  assignment: Assignment;
  onView: (assignment: Assignment) => void;
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment, onView }) => {
  const docUrl = resolveDocUrl(assignment.url);

  const getFormatBadge = (ext: string) => {
    switch (ext) {
      case 'PDF':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">PDF</span>;
      case 'XLSX':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">EXCEL</span>;
      case 'PPTX':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">PPTX</span>;
      case 'DOCX':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">WORD</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">{ext}</span>;
    }
  };

  const getFormatIcon = (ext: string) => {
    switch (ext) {
      case 'PDF': return <FileText className="w-4 h-4 text-rose-600" />;
      case 'XLSX': return <Table className="w-4 h-4 text-emerald-600" />;
      case 'PPTX': return <Presentation className="w-4 h-4 text-amber-600" />;
      case 'DOCX': return <FileText className="w-4 h-4 text-blue-600" />;
      default: return <ImageIcon className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-forest-300 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-5">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-1.5">
            {getFormatBadge(assignment.extension)}
            <span className="text-[11px] font-medium text-slate-500">
              {assignment.sizeFormatted}
            </span>
          </div>

          <span className="text-[11px] font-medium text-forest-800 bg-forest-50/80 px-2.5 py-0.5 rounded-full border border-forest-100 truncate max-w-[170px]">
            {assignment.category}
          </span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onView(assignment)}
          className="text-base font-bold text-slate-900 group-hover:text-forest-800 transition-colors leading-snug cursor-pointer line-clamp-2"
        >
          {assignment.title}
        </h3>

        {/* Filename */}
        <div className="mt-1.5 flex items-center space-x-1 text-slate-400 font-mono text-[11px] truncate">
          <span className="truncate">{assignment.filename}</span>
        </div>

        {/* Description */}
        <p className="mt-3 text-xs text-slate-600 line-clamp-3 leading-relaxed">
          {assignment.description}
        </p>

        {/* Tags */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
          {assignment.tags.map((tag) => (
            <span 
              key={tag}
              className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="bg-slate-50/80 px-5 py-3 border-t border-slate-100 flex items-center space-x-2">
        <button
          onClick={() => onView(assignment)}
          className="flex-1 px-3 py-2 bg-forest-800 hover:bg-forest-700 text-white rounded-lg text-xs font-semibold inline-flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Document</span>
        </button>

        <a
          href={docUrl}
          download={assignment.downloadFilename}
          className="p-2 text-slate-600 hover:text-forest-900 hover:bg-white border border-slate-200 rounded-lg text-xs transition-colors inline-flex items-center justify-center"
          title="Download original untouched file"
        >
          <Download className="w-4 h-4" />
        </a>

        <a
          href={docUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-slate-600 hover:text-forest-900 hover:bg-white border border-slate-200 rounded-lg text-xs transition-colors inline-flex items-center justify-center"
          title="Open file directly in new browser tab"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
