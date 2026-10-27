import React from 'react';
import { Leaf, GraduationCap, FileCheck, HelpCircle, User } from 'lucide-react';
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
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-forest-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-forest-700 to-forest-900 text-white flex items-center justify-center shadow-md shadow-forest-900/10 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-forest-950 group-hover:text-forest-700 transition-colors">
                  ECO-TRACK
                </span>
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  EWEM Portfolio
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                {STUDENT_INFO.semester} • {STUDENT_INFO.academicYear}
              </p>
            </div>
          </div>

          {/* Student Info Pill (Center / Desktop) */}
          <div className="hidden lg:flex items-center space-x-3 px-3.5 py-1.5 rounded-full bg-forest-50/70 border border-forest-200/60 text-xs">
            <span className="flex items-center space-x-1.5 text-forest-900 font-semibold">
              <User className="w-3.5 h-3.5 text-forest-600" />
              <span>{STUDENT_INFO.name}</span>
            </span>
            <span className="text-forest-300">•</span>
            <span className="text-slate-600">
              Roll: <strong className="font-semibold tracking-wide text-slate-800">{STUDENT_INFO.rollNumber}</strong>
            </span>
            <span className="text-forest-300">•</span>
            <span className="text-slate-600">
              Class: <strong>{STUDENT_INFO.className}</strong>
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                currentTab === 'home'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-forest-800 hover:bg-forest-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('assignments')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                currentTab === 'assignments'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-forest-800 hover:bg-forest-50'
              }`}
            >
              <span>All Work</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                currentTab === 'assignments' ? 'bg-emerald-500 text-forest-950' : 'bg-forest-100 text-forest-800'
              }`}>
                {totalAssignments}
              </span>
            </button>

            {/* Teacher Verification Guide Button */}
            <button
              onClick={onOpenTeacherGuide}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              title="Guide for Teacher & Evaluator"
            >
              <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" />
              <span className="hidden sm:inline">Teacher Guide</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
