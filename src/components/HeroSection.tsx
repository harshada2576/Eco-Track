import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  DownloadCloud, 
  Sparkles 
} from 'lucide-react';
import { STUDENT_INFO } from '../data/student';

interface HeroSectionProps {
  onBrowseAll: () => void;
  onExploreCategory: (category: string) => void;
  totalAssignments: number;
  totalSizeBytes: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBrowseAll,
  onExploreCategory,
  totalAssignments,
  totalSizeBytes
}) => {
  const formattedMb = (totalSizeBytes / (1024 * 1024)).toFixed(1);

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-forest-50 via-offwhite-50 to-white border-b border-forest-100/60">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-forest-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading, Academic Intro & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-forest-100/80 border border-forest-200 text-forest-900 text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-forest-700" />
              <span>Official Academic Submission • Semester V (2026–2027)</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-forest-950 tracking-tight leading-tight">
                ECO-TRACK
                <span className="block text-xl sm:text-2xl md:text-3xl font-medium text-forest-700 mt-1 font-serif">
                  EWEM Semester Assignment Portfolio
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                A verified repository of coursework, field studies, state-level e-waste audits, and sustainability engineering models completed for <strong>Environmental & Waste Management (EWEM)</strong>.
              </p>
            </div>

            {/* Student Verified Metadata Badge */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-forest-100 shadow-sm shadow-forest-900/5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Student Credentials</span>
                </span>
                <span className="inline-flex items-center space-x-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Verified Submissions</span>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Student Name</span>
                  <span className="font-bold text-slate-800 text-sm">{STUDENT_INFO.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Roll Number</span>
                  <span className="font-bold text-slate-800 font-mono text-sm">{STUDENT_INFO.rollNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Class & Division</span>
                  <span className="font-bold text-slate-800 text-sm">{STUDENT_INFO.className}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Semester & Year</span>
                  <span className="font-bold text-slate-800 text-sm">{STUDENT_INFO.semester}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onBrowseAll}
                className="px-6 py-3.5 bg-forest-800 hover:bg-forest-700 text-white font-semibold rounded-xl shadow-md shadow-forest-900/10 hover:shadow-lg transition-all inline-flex items-center space-x-2 text-sm group"
              >
                <span>Browse All {totalAssignments} Assignments</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onExploreCategory('Rajasthan E-Waste Study')}
                className="px-5 py-3.5 bg-white hover:bg-forest-50 text-forest-900 border border-forest-200 font-semibold rounded-xl transition-all text-sm shadow-sm"
              >
                View State Case Studies
              </button>
            </div>
          </div>

          {/* Right Column: Visual Summary Metric Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950 text-white p-6 sm:p-7 shadow-xl border border-forest-700/60 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <BookOpen className="w-40 h-40 text-emerald-400" />
              </div>

              <div className="relative space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Coursework Summary
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Semester V Deliverables
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    All original documents bundled into static assets for uninterrupted teacher evaluation and download.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 backdrop-blur-sm">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white block">
                      {totalAssignments}
                    </span>
                    <span className="text-xs text-emerald-300 font-medium">
                      Real Coursework Files
                    </span>
                  </div>

                  <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 backdrop-blur-sm">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white block">
                      6
                    </span>
                    <span className="text-xs text-emerald-300 font-medium">
                      Curated Categories
                    </span>
                  </div>

                  <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 backdrop-blur-sm">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white block">
                      {formattedMb} MB
                    </span>
                    <span className="text-xs text-emerald-300 font-medium">
                      Total Document Volume
                    </span>
                  </div>

                  <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 backdrop-blur-sm">
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block">
                      100%
                    </span>
                    <span className="text-xs text-emerald-300 font-medium">
                      Offline / Static Ready
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center space-x-1.5">
                    <DownloadCloud className="w-4 h-4 text-emerald-400" />
                    <span>PDFs, XLSX, DOCX, PPTX, Images</span>
                  </span>
                  <span className="text-emerald-400 font-semibold">Ready to Grade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
