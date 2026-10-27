import React from 'react';
import { Download, Eye, ExternalLink, FileText, Table as TableIcon, Presentation, Image as ImageIcon } from 'lucide-react';
import { Assignment } from '../types';
import { resolveDocUrl } from '../data/assignments';

interface AssignmentTableProps {
  assignments: Assignment[];
  onView: (assignment: Assignment) => void;
}

export const AssignmentTable: React.FC<AssignmentTableProps> = ({ assignments, onView }) => {
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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="px-4 py-3.5">Format</th>
              <th className="px-4 py-3.5">Assignment Title & Filename</th>
              <th className="px-4 py-3.5 hidden md:table-cell">Category</th>
              <th className="px-4 py-3.5 hidden lg:table-cell">Academic Stage</th>
              <th className="px-4 py-3.5">Size</th>
              <th className="px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {assignments.map((item) => {
              const docUrl = resolveDocUrl(item.url);
              return (
                <tr key={item.id} className="hover:bg-forest-50/40 transition-colors">
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    {getFormatBadge(item.extension)}
                  </td>
                  <td className="px-4 py-3.5">
                    <div 
                      onClick={() => onView(item)}
                      className="font-bold text-slate-900 hover:text-forest-800 cursor-pointer text-sm"
                    >
                      {item.title}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 truncate max-w-sm sm:max-w-md mt-0.5">
                      {item.filename}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap hidden md:table-cell">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap hidden lg:table-cell text-slate-500">
                    {item.academicStage}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 font-medium">
                    {item.sizeFormatted}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-right space-x-1.5">
                    <button
                      onClick={() => onView(item)}
                      className="px-3 py-1.5 bg-forest-800 hover:bg-forest-700 text-white rounded-lg text-xs font-semibold inline-flex items-center space-x-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                    <a
                      href={docUrl}
                      download={item.downloadFilename}
                      className="p-1.5 text-slate-600 hover:text-forest-900 hover:bg-slate-100 border border-slate-200 rounded-lg inline-flex items-center transition-colors"
                      title="Download Original"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
