import React from 'react';
import { Search, X, LayoutGrid, List, RotateCcw } from 'lucide-react';
import { CATEGORIES_META } from '../data/assignments';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  onReset: () => void;
  isFiltered: boolean;
  totalFiltered: number;
  totalAssignments: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedFormat,
  onFormatChange,
  viewMode,
  onViewModeChange,
  onReset,
  isFiltered,
  totalFiltered,
  totalAssignments
}) => {
  const formats = [
    { label: 'All Formats', value: 'ALL' },
    { label: 'PDFs', value: 'PDF' },
    { label: 'Excel (.xlsx)', value: 'XLSX' },
    { label: 'Word (.docx)', value: 'DOCX' },
    { label: 'Slides (.pptx)', value: 'PPTX' },
    { label: 'Posters / Images', value: 'IMAGE' },
  ];

  return (
    <div className="bg-[#FAF9F5] rounded-lg border border-[#DCDDD3] p-4 sm:p-5 space-y-4 mb-8">
      {/* Top Row: Search Input + View Mode Toggle + Reset */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Search Field */}
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 text-[#74786F] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, topic, or filename (e.g., Rajasthan, LEED, Dixon, E-Revive, WEEE)..."
            className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-[#F3F0E7] border border-[#DCDDD3] rounded-md focus:outline-none focus:border-[#183D32] focus:bg-[#FAF9F5] text-[#292D29] placeholder-[#74786F] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#74786F] hover:text-[#183D32]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode & Reset Controls */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
          {isFiltered && (
            <button
              onClick={onReset}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-[#B76E4B] border border-[#B76E4B]/40 hover:bg-[#B76E4B]/10 rounded-md transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}

          <div className="flex items-center bg-[#F3F0E7] p-1 rounded-md border border-[#DCDDD3]">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded text-xs transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#183D32] text-[#FAF9F5]'
                  : 'text-[#74786F] hover:text-[#183D32]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded text-xs transition-all ${
                viewMode === 'table'
                  ? 'bg-[#183D32] text-[#FAF9F5]'
                  : 'text-[#74786F] hover:text-[#183D32]'
              }`}
              title="Catalogue Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills (Horizontal scrollable) */}
      <div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => onCategoryChange('ALL')}
            className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-all font-medium ${
              selectedCategory === 'ALL'
                ? 'bg-[#183D32] text-[#FAF9F5]'
                : 'bg-transparent border border-[#DCDDD3] text-[#292D29] hover:bg-[#E3E7DD]/50'
            }`}
          >
            All Modules ({totalAssignments})
          </button>

          {CATEGORIES_META.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onCategoryChange(cat.name)}
              className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                selectedCategory === cat.name
                  ? 'bg-[#183D32] text-[#FAF9F5] font-medium'
                  : 'bg-transparent border border-[#DCDDD3] text-[#292D29] hover:bg-[#E3E7DD]/50'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                selectedCategory === cat.name ? 'bg-[#315B45] text-[#FAF9F5]' : 'bg-[#E3E7DD] text-[#183D32]'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Format Pills & Count Indicator */}
      <div className="pt-3 border-t border-[#DCDDD3] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-1.5 overflow-x-auto">
          <span className="font-mono text-[#74786F] text-[10px] uppercase tracking-wider mr-1">FORMAT:</span>
          {formats.map((fmt) => (
            <button
              key={fmt.value}
              onClick={() => onFormatChange(fmt.value)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                selectedFormat === fmt.value
                  ? 'bg-[#315B45] text-[#FAF9F5] font-medium'
                  : 'bg-transparent border border-[#DCDDD3] text-[#74786F] hover:text-[#183D32] hover:bg-[#E3E7DD]/40'
              }`}
            >
              {fmt.label}
            </button>
          ))}
        </div>

        <div className="text-[#74786F] font-mono text-[11px]">
          Showing <strong className="text-[#183D32] font-semibold">{totalFiltered}</strong> of {totalAssignments} assignments
        </div>
      </div>
    </div>
  );
};
