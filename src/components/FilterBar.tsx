import React from 'react';
import { Search, X, LayoutGrid, List, Filter, RotateCcw } from 'lucide-react';
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
    { label: 'Images', value: 'IMAGE' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4 mb-6">
      {/* Top Row: Search Input + View Mode Toggle + Reset */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Search Field */}
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, filename, tag, or topic (e.g., Rajasthan, LEED, Dixon, E-Revive)..."
            className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-600 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-forest-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-forest-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills (Horizontal scrollable) */}
      <div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => onCategoryChange('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-forest-800 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Categories ({totalAssignments})
          </button>

          {CATEGORIES_META.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onCategoryChange(cat.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                selectedCategory === cat.name
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === cat.name ? 'bg-forest-700 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Format Pills & Match Counter */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-1.5 overflow-x-auto">
          <span className="text-slate-400 font-semibold mr-1 uppercase text-[10px] tracking-wider">Format:</span>
          {formats.map((fmt) => (
            <button
              key={fmt.value}
              onClick={() => onFormatChange(fmt.value)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedFormat === fmt.value
                  ? 'bg-emerald-700 text-white font-semibold'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {fmt.label}
            </button>
          ))}
        </div>

        <div className="text-slate-500">
          Showing <strong className="text-forest-900">{totalFiltered}</strong> of {totalAssignments} assignments
        </div>
      </div>
    </div>
  );
};
