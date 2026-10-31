import React, { useState } from 'react';
import { Leaf, Menu, X, ArrowUpRight, BookOpen } from 'lucide-react';
import { STUDENT_INFO } from '../data/student';

interface NavbarProps {
  currentTab: 'home' | 'assignments';
  onNavigate: (tab: 'home' | 'assignments') => void;
  onOpenTeacherGuide: () => void;
  totalAssignments: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenTeacherGuide,
  totalAssignments
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: 'home' | 'assignments') => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#DCDDD3] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Editorial Monogram */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 rounded-md bg-[#183D32] text-[#FAF9F5] flex items-center justify-center transition-transform group-hover:scale-95">
              <Leaf className="w-4 h-4 text-[#A6B49A]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-lg tracking-wide text-[#183D32] group-hover:text-[#315B45] transition-colors font-normal">
                  ECO-TRACK
                </span>
                <span className="text-[10px] tracking-widest uppercase font-mono px-1.5 py-0.5 rounded bg-[#E3E7DD] text-[#183D32]">
                  EWEM
                </span>
              </div>
            </div>
          </div>

          {/* Student Academic Details (Center on Desktop) */}
          <div className="hidden lg:flex items-center space-x-2.5 text-xs text-[#74786F] border-x border-[#DCDDD3] px-4 py-1">
            <span className="font-medium text-[#292D29]">{STUDENT_INFO.name}</span>
            <span className="text-[#A6B49A]">•</span>
            <span>Roll <strong className="font-mono text-[#292D29] font-medium">{STUDENT_INFO.rollNumber}</strong></span>
            <span className="text-[#A6B49A]">•</span>
            <span>{STUDENT_INFO.className}</span>
            <span className="text-[#A6B49A]">•</span>
            <span className="font-mono">{STUDENT_INFO.academicYear}</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-1.5 rounded-md text-xs tracking-wide transition-all ${
                currentTab === 'home'
                  ? 'bg-[#183D32] text-[#FAF9F5] font-medium'
                  : 'text-[#292D29] hover:text-[#183D32] hover:bg-[#E3E7DD]/50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('assignments')}
              className={`px-3.5 py-1.5 rounded-md text-xs tracking-wide transition-all flex items-center space-x-1.5 ${
                currentTab === 'assignments'
                  ? 'bg-[#183D32] text-[#FAF9F5] font-medium'
                  : 'text-[#292D29] hover:text-[#183D32] hover:bg-[#E3E7DD]/50'
              }`}
            >
              <span>Coursework</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                currentTab === 'assignments' ? 'bg-[#315B45] text-[#FAF9F5]' : 'bg-[#E3E7DD] text-[#183D32]'
              }`}>
                {totalAssignments}
              </span>
            </button>

            <button
              onClick={onOpenTeacherGuide}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#183D32] border border-[#DCDDD3] hover:border-[#183D32] hover:bg-[#E3E7DD]/40 transition-all"
              title="Academic Evaluator Guide"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#315B45]" />
              <span>Teacher Guide</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#292D29] hover:text-[#183D32] hover:bg-[#E3E7DD] rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#DCDDD3] bg-[#FAF9F5] px-4 pt-3 pb-4 space-y-3 shadow-lg">
          <div className="pb-2 border-b border-[#DCDDD3] text-xs text-[#74786F] space-y-0.5">
            <p className="font-semibold text-[#183D32]">{STUDENT_INFO.name} ({STUDENT_INFO.rollNumber})</p>
            <p>{STUDENT_INFO.className} • {STUDENT_INFO.semester} • {STUDENT_INFO.academicYear}</p>
          </div>

          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => handleNav('home')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                currentTab === 'home'
                  ? 'bg-[#183D32] text-[#FAF9F5]'
                  : 'text-[#292D29] hover:bg-[#E3E7DD]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('assignments')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${
                currentTab === 'assignments'
                  ? 'bg-[#183D32] text-[#FAF9F5]'
                  : 'text-[#292D29] hover:bg-[#E3E7DD]'
              }`}
            >
              <span>Coursework Archive</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#E3E7DD] text-[#183D32]">
                {totalAssignments} files
              </span>
            </button>
            <button
              onClick={() => {
                onOpenTeacherGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-[#183D32] border border-[#DCDDD3] hover:bg-[#E3E7DD] flex items-center justify-between"
            >
              <span>Teacher Evaluation Guide</span>
              <ArrowUpRight className="w-4 h-4 text-[#74786F]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
