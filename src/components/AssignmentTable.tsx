import React from 'react';
import { Download, Eye, ExternalLink } from 'lucide-react';
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
    <div className="bg-[#FAF9F5] rounded-lg border border-[#DCDDD3] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#DCDDD3] text-left text-xs">
          <thead className="bg-[#F3F0E7] text-[#183D32] font-mono uppercase tracking-wider text-[11px]">
            <tr>
              <th className="px-4 py-3.5">Format</th>
              <th className="px-4 py-3.5">Assignment Title & Filename</th>
              <th className="px-4 py-3.5 hidden md:table-cell">Thematic Domain</th>
              <th className="px-4 py-3.5 hidden lg:table-cell">Academic Stage</th>
              <th className="px-4 py-3.5">Volume</th>
              <th className="px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCDDD3]/60 bg-[#FAF9F5]">
            {assignments.map((item, index) => {
              const docUrl = resolveDocUrl(item.url);
              return (
                <tr key={item.id} className="hover:bg-[#F3F0E7]/60 transition-colors">
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    {getFormatBadge(item.extension)}
                  </td>
                  <td className="px-4 py-3.5">
                    <div 
                      onClick={() => onView(item)}
                      className="font-serif text-base text-[#183D32] hover:text-[#315B45] cursor-pointer transition-colors"
                    >
                      {item.title}
                    </div>
                    <div className="text-[11px] font-mono text-[#74786F] truncate max-w-sm sm:max-w-md mt-0.5">
                      {item.filename}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap hidden md:table-cell">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#E3E7DD] text-[#183D32]">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap hidden lg:table-cell text-[#74786F]">
                    {item.academicStage}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-[#74786F] font-mono">
                    {item.sizeFormatted}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-right space-x-1.5">
                    <button
                      onClick={() => onView(item)}
                      className="px-3 py-1.5 bg-[#183D32] hover:bg-[#315B45] text-[#FAF9F5] rounded-md text-xs font-medium tracking-wide inline-flex items-center space-x-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                    <a
                      href={docUrl}
                      download={item.downloadFilename}
                      className="p-1.5 text-[#74786F] hover:text-[#183D32] hover:bg-[#E3E7DD] border border-[#DCDDD3] rounded-md inline-flex items-center transition-colors"
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
