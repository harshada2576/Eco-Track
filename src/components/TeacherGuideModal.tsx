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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#183D32]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#FAF9F5] rounded-lg shadow-2xl max-w-3xl w-full border border-[#DCDDD3] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#FAF9F5] border-b border-[#DCDDD3] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#E3E7DD] rounded text-[#183D32]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#74786F]">
                Course Evaluator & Academic Guide
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-[#183D32] leading-tight font-normal">
                EWEM Semester Portfolio Evaluation Guide
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#74786F] hover:text-[#183D32] hover:bg-[#E3E7DD]/50 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-sm text-[#292D29] leading-relaxed">
          
          {/* Student Banner */}
          <div className="bg-[#F3F0E7] border border-[#DCDDD3] rounded-md p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-[#74786F] block font-mono text-[11px] uppercase">Candidate Name:</span>
              <strong className="text-[#183D32] text-sm font-sans">{STUDENT_INFO.name}</strong>
            </div>
            <div>
              <span className="text-[#74786F] block font-mono text-[11px] uppercase">Roll Number:</span>
              <strong className="text-[#183D32] font-mono text-sm">{STUDENT_INFO.rollNumber}</strong>
            </div>
            <div>
              <span className="text-[#74786F] block font-mono text-[11px] uppercase">Class & Cohort:</span>
              <strong className="text-[#183D32] text-sm font-sans">{STUDENT_INFO.className}</strong>
            </div>
            <div>
              <span className="text-[#74786F] block font-mono text-[11px] uppercase">Semester:</span>
              <strong className="text-[#183D32] text-sm font-sans">{STUDENT_INFO.semester} ({STUDENT_INFO.academicYear})</strong>
            </div>
          </div>

          {/* Quick Guide Points */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#183D32] flex items-center space-x-2 font-normal">
              <ShieldCheck className="w-5 h-5 text-[#315B45]" />
              <span>How to Evaluate & Verify Submissions</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-md border border-[#DCDDD3] space-y-2">
                <div className="flex items-center space-x-2 text-[#183D32] font-mono text-xs uppercase tracking-wider font-semibold">
                  <FileText className="w-4 h-4 text-[#315B45]" />
                  <span>1. In-Browser Document Preview</span>
                </div>
                <p className="text-xs text-[#292D29]/75 leading-relaxed">
                  Click <strong>"View Document ↗"</strong> on any assignment to open the built-in reading environment. PDFs are embedded directly, Excel workbooks render interactive sheet tabs and cells, and Word documents are formatted into readable typography.
                </p>
              </div>

              <div className="p-4 bg-white rounded-md border border-[#DCDDD3] space-y-2">
                <div className="flex items-center space-x-2 text-[#183D32] font-mono text-xs uppercase tracking-wider font-semibold">
                  <Download className="w-4 h-4 text-[#315B45]" />
                  <span>2. Unmodified Original Downloads</span>
                </div>
                <p className="text-xs text-[#292D29]/75 leading-relaxed">
                  Click the <strong>Download icon</strong> or download button in the viewer to save the unmodified original file (e.g., .xlsx, .pptx, .docx, .pdf) for offline verification, spreadsheet auditing, or grading tools.
                </p>
              </div>

              <div className="p-4 bg-white rounded-md border border-[#DCDDD3] space-y-2">
                <div className="flex items-center space-x-2 text-[#183D32] font-mono text-xs uppercase tracking-wider font-semibold">
                  <Table className="w-4 h-4 text-[#315B45]" />
                  <span>3. Multi-Sheet Data Models</span>
                </div>
                <p className="text-xs text-[#292D29]/75 leading-relaxed">
                  Excel files like <em>State_EWaste_Tracker(Rajasthan).xlsx</em> contain 9 comprehensive worksheets. You can click any sheet tab to inspect tables without leaving the browser.
                </p>
              </div>

              <div className="p-4 bg-white rounded-md border border-[#DCDDD3] space-y-2">
                <div className="flex items-center space-x-2 text-[#183D32] font-mono text-xs uppercase tracking-wider font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#315B45]" />
                  <span>4. Curriculum Alignment</span>
                </div>
                <p className="text-xs text-[#292D29]/75 leading-relaxed">
                  Assignments are grouped into 6 syllabus modules: Coursework, Rajasthan E-Waste Study, Global Benchmarking, E-Revive Platform, Green Buildings, and Campus Initiatives.
                </p>
              </div>
            </div>
          </div>

          {/* Academic Integrity Note */}
          <div className="p-4 bg-[#F3F0E7] border border-[#DCDDD3] rounded-md text-xs space-y-1">
            <h4 className="font-medium text-[#183D32] flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#315B45]" />
              <span>Static Deployment Integrity</span>
            </h4>
            <p className="text-[#292D29]/75 leading-relaxed">
              This portfolio is built as a self-contained static site. All 19 documents are bundled into the asset directory. No external databases or running local servers are needed; the site works permanently at the deployed link and remains fully compatible with Netlify Drop and Vercel.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#FAF9F5] px-6 py-3 border-t border-[#DCDDD3] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#183D32] hover:bg-[#315B45] text-[#FAF9F5] rounded-md text-xs font-medium tracking-wide shadow-sm transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
