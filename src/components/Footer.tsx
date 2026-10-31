import React from 'react';
import { Leaf, ArrowUp, ShieldCheck } from 'lucide-react';
import { STUDENT_INFO } from '../data/student';

interface FooterProps {
  onNavigate: (tab: 'home' | 'assignments') => void;
  onOpenTeacherGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTeacherGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#183D32] text-[#FAF9F5] pt-14 pb-10 border-t border-[#183D32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#315B45]/60">
          
          {/* Identity & Closing Statement */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-md bg-[#315B45] text-[#FAF9F5] flex items-center justify-center">
                <Leaf className="w-4 h-4 text-[#A6B49A]" />
              </div>
              <span className="font-serif text-xl tracking-wide text-[#FAF9F5] font-normal">
                ECO-TRACK
              </span>
            </div>

            <p className="font-serif text-lg italic text-[#E3E7DD] leading-relaxed max-w-sm">
              "A collection of research, coursework and ideas for a more sustainable future."
            </p>

            <p className="text-xs text-[#A6B49A] leading-relaxed max-w-sm">
              Academic portfolio for <strong>{STUDENT_INFO.subject}</strong>, presenting empirical field investigations, Rajasthan state e-waste data models, and circular product specifications.
            </p>

            <div className="flex items-center space-x-2 text-xs text-[#A6B49A] pt-1 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#A6B49A]" />
              <span>Static & Verified Academic Submissions</span>
            </div>
          </div>

          {/* Student Credentials */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#A6B49A]">
              Student Details
            </h4>
            <ul className="space-y-1.5 text-xs text-[#E3E7DD]/90">
              <li>Candidate: <strong className="text-white font-medium">{STUDENT_INFO.name}</strong></li>
              <li>Roll Number: <strong className="text-white font-mono">{STUDENT_INFO.rollNumber}</strong></li>
              <li>Class & Cohort: <strong className="text-white font-medium">{STUDENT_INFO.className}</strong></li>
              <li>Semester: <strong className="text-white font-medium">{STUDENT_INFO.semester}</strong></li>
              <li>Academic Session: <strong className="text-white font-mono">{STUDENT_INFO.academicYear}</strong></li>
              <li>Subject: <span className="text-[#A6B49A]">{STUDENT_INFO.subject}</span></li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#A6B49A]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#E3E7DD]">
              <li>
                <button
                  onClick={() => { onNavigate('home'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left"
                >
                  Portfolio Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('assignments'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left"
                >
                  All 19 Coursework Deliverables
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTeacherGuide}
                  className="hover:text-white transition-colors text-[#A6B49A] text-left"
                >
                  Evaluator Assessment Guide
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center space-x-1.5 text-[#A6B49A] hover:text-white transition-colors text-xs font-mono"
                >
                  <span>Back to top</span>
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A6B49A] gap-3 font-mono text-[11px]">
          <p>
            © {STUDENT_INFO.academicYear} {STUDENT_INFO.name}. EWEM Academic Portfolio.
          </p>
          <p>
            Self-contained static web portfolio • Ready for teacher grading
          </p>
        </div>

      </div>
    </footer>
  );
};
