import React from 'react';
import { Leaf, ArrowUp, GraduationCap, ShieldCheck } from 'lucide-react';
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
    <footer className="bg-forest-950 text-white pt-12 pb-8 border-t border-forest-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-forest-800/80">
          {/* Brand & Summary */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-forest-800 text-emerald-300 flex items-center justify-center border border-forest-700">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white">
                ECO-TRACK
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Academic semester portfolio for <strong>Environmental & Waste Management (EWEM)</strong>, presenting original research, e-waste lifecycle models, and sustainability engineering audits.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Static & Verified Submissions</span>
            </div>
          </div>

          {/* Student Details */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Student Credentials
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>Student Name: <strong className="text-white">{STUDENT_INFO.name}</strong></li>
              <li>Roll Number: <strong className="text-white font-mono">{STUDENT_INFO.rollNumber}</strong></li>
              <li>Class & Div: <strong className="text-white">{STUDENT_INFO.className}</strong></li>
              <li>Semester: <strong className="text-white">{STUDENT_INFO.semester}</strong></li>
              <li>Academic Year: <strong className="text-white">{STUDENT_INFO.academicYear}</strong></li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => { onNavigate('home'); scrollToTop(); }}
                  className="hover:text-emerald-300 transition-colors"
                >
                  Portfolio Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('assignments'); scrollToTop(); }}
                  className="hover:text-emerald-300 transition-colors"
                >
                  All 19 Coursework Files
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTeacherGuide}
                  className="hover:text-emerald-300 transition-colors text-emerald-400 font-medium"
                >
                  Teacher Evaluation Guide
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center space-x-1 text-slate-400 hover:text-white transition-colors pt-1"
                >
                  <span>Back to top</span>
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>
            © {STUDENT_INFO.academicYear} Harshada Avhad. Built for EWEM Semester Evaluation.
          </p>
          <p className="text-[11px] text-slate-500">
            Deployed as a self-contained static web application. Compatible with Netlify Drop and Vercel.
          </p>
        </div>
      </div>
    </footer>
  );
};
