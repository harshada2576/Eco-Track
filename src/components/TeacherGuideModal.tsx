import React from 'react';
import { 
  X, 
  HelpCircle, 
  CheckCircle2, 
  FileText, 
  Table, 
  Download, 
  ShieldCheck, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';
import { STUDENT_INFO } from '../data/student';

interface TeacherGuideModalProps {
  onClose: () => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-300 border border-emerald-400/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
                Course Evaluator & Teacher Guide
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white">
                EWEM Semester Portfolio Assessment Instructions
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-sm text-slate-600 leading-relaxed">
          {/* Student Banner */}
          <div className="bg-forest-50 border border-forest-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Student Name:</span>
              <strong className="text-forest-950 text-sm">{STUDENT_INFO.name}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Roll Number:</span>
              <strong className="text-forest-950 font-mono text-sm">{STUDENT_INFO.rollNumber}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Class:</span>
              <strong className="text-forest-950 text-sm">{STUDENT_INFO.className}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Semester:</span>
              <strong className="text-forest-950 text-sm">{STUDENT_INFO.semester}</strong>
            </div>
          </div>

          {/* Quick Guide Points */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>How to Evaluate & Verify Submissions</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center space-x-2 text-forest-800 font-bold text-xs uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-forest-600" />
                  <span>1. In-Browser Document Preview</span>
                </div>
                <p className="text-xs text-slate-600">
                  Click <strong>"View Document"</strong> on any assignment to open the built-in document viewer. PDFs are embedded directly, Excel workbooks render interactive sheet tabs and cells, and Word documents are converted to readable HTML.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center space-x-2 text-forest-800 font-bold text-xs uppercase tracking-wider">
                  <Download className="w-4 h-4 text-forest-600" />
                  <span>2. Direct Original File Download</span>
                </div>
                <p className="text-xs text-slate-600">
                  Click the <strong>Download icon</strong> or download button in the viewer to save the unmodified original file (e.g., .xlsx, .pptx, .docx, .pdf) for offline verification or grading tools.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center space-x-2 text-forest-800 font-bold text-xs uppercase tracking-wider">
                  <Table className="w-4 h-4 text-forest-600" />
                  <span>3. Multi-Sheet Data Models</span>
                </div>
                <p className="text-xs text-slate-600">
                  Excel files like <em>State_EWaste_Tracker(Rajasthan).xlsx</em> contain 9 comprehensive worksheets. You can click any sheet tab to inspect tables without leaving the browser.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center space-x-2 text-forest-800 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-forest-600" />
                  <span>4. Autonomous & Curriculum Alignment</span>
                </div>
                <p className="text-xs text-slate-600">
                  Assignments are grouped into 6 syllabus modules: Coursework, Rajasthan E-Waste Study, Global Benchmarking, E-Revive Platform, Green Buildings, and Campus Initiatives.
                </p>
              </div>
            </div>
          </div>

          {/* Academic Integrity Note */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-1">
            <h4 className="font-bold flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Static Deployment Integrity</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              This portfolio is built as a self-contained static site. All 19 documents are bundled into the asset directory. No external databases or running local servers are needed; the site will work permanently at the deployed link.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-forest-800 hover:bg-forest-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
