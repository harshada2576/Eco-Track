import React from 'react';
import { ArrowUpRight, FileText, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { STUDENT_INFO } from '../data/student';
import { resolveDocUrl } from '../data/assignments';

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
  const posterUrl = resolveDocUrl('/documents/IMG-20260907-WA0003.jpg');

  return (
    <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-[#DCDDD3] bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            
            {/* Metadata Label */}
            <div className="flex items-center space-x-3 text-xs tracking-widest text-[#74786F] uppercase font-mono">
              <span className="w-2 h-2 rounded-full bg-[#315B45]" />
              <span>SEMESTER V / EWEM / 2026–27</span>
            </div>

            {/* Main Editorial Heading */}
            <div className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#183D32] leading-[1.08] tracking-tight font-normal">
                Rethinking the way we manage waste.
              </h1>
              
              <p className="text-base sm:text-lg text-[#292D29]/80 font-normal leading-relaxed max-w-2xl pt-2">
                An academic portfolio presenting semester research, empirical investigations, state-level electronic waste audits, LEED green building benchmarks, and circular economy product architectures for <strong>Environmental and Waste Management (EWEM)</strong>.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onBrowseAll}
                className="px-6 py-3.5 bg-[#183D32] hover:bg-[#315B45] text-[#FAF9F5] rounded-md text-sm font-medium tracking-wide transition-all inline-flex items-center space-x-2 group shadow-sm"
              >
                <span>Explore my work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={() => onExploreCategory('Rajasthan E-Waste Study')}
                className="px-5 py-3.5 bg-transparent hover:bg-[#E3E7DD]/60 text-[#183D32] border border-[#DCDDD3] hover:border-[#183D32] rounded-md text-sm font-medium tracking-wide transition-all inline-flex items-center space-x-2"
              >
                <span>Rajasthan Case Study</span>
                <ArrowRight className="w-4 h-4 text-[#74786F]" />
              </button>
            </div>

            {/* Student Credentials Strip */}
            <div className="pt-6 border-t border-[#DCDDD3]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-[#74786F] block text-[11px] uppercase tracking-wider font-mono">Researcher</span>
                  <span className="font-medium text-[#292D29] text-sm block mt-0.5">{STUDENT_INFO.name}</span>
                </div>
                <div>
                  <span className="text-[#74786F] block text-[11px] uppercase tracking-wider font-mono">Roll Number</span>
                  <span className="font-mono font-medium text-[#292D29] text-sm block mt-0.5">{STUDENT_INFO.rollNumber}</span>
                </div>
                <div>
                  <span className="text-[#74786F] block text-[11px] uppercase tracking-wider font-mono">Class & Cohort</span>
                  <span className="font-medium text-[#292D29] text-sm block mt-0.5">{STUDENT_INFO.className}</span>
                </div>
                <div>
                  <span className="text-[#74786F] block text-[11px] uppercase tracking-wider font-mono">Evaluation</span>
                  <span className="font-medium text-[#315B45] text-sm block mt-0.5 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Photograph Frame & Academic Folio */}
          <div className="lg:col-span-5">
            <div className="bg-[#F3F0E7] border border-[#DCDDD3] rounded-lg p-5 sm:p-6 shadow-sm flex flex-col justify-between">
              
              {/* Top Folio Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#DCDDD3] text-xs">
                <span className="font-mono text-[#74786F] tracking-wider uppercase text-[11px]">
                  ARCHIVE REF: EWEM-V-2026
                </span>
                <span className="px-2 py-0.5 rounded bg-[#E3E7DD] text-[#183D32] font-mono text-[10px] uppercase font-semibold">
                  Coursework Folio
                </span>
              </div>

              {/* Genuine Visual Material (Campus Awareness Campaign / E-Waste Artifact) */}
              <div className="relative group overflow-hidden rounded-md border border-[#DCDDD3] bg-white">
                <img
                  src={posterUrl}
                  alt="Environmental and Waste Management Campus Artifact"
                  className="w-full h-72 sm:h-80 object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#183D32]/80 via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#A6B49A]">
                    Campus Outreach Poster • Seminar Hall Block A
                  </p>
                  <p className="font-serif text-base sm:text-lg italic leading-tight text-[#FAF9F5] mt-0.5">
                    "Old Devices Still Have A Story! Let us give them a better ending!"
                  </p>
                </div>
              </div>

              {/* Editorial Caption */}
              <div className="mt-3 text-center sm:text-left">
                <p className="text-xs text-[#74786F] italic">
                  Environmental & Waste Management — Academic Portfolio
                </p>
              </div>

              {/* Research Volume Stats in restrained editorial row */}
              <div className="grid grid-cols-3 gap-2 pt-4 mt-4 border-t border-[#DCDDD3] text-center">
                <div className="p-2">
                  <span className="font-serif text-2xl text-[#183D32] block leading-none">
                    {totalAssignments}
                  </span>
                  <span className="text-[11px] text-[#74786F] font-mono uppercase mt-1 block">
                    Deliverables
                  </span>
                </div>
                <div className="p-2 border-x border-[#DCDDD3]">
                  <span className="font-serif text-2xl text-[#183D32] block leading-none">
                    6
                  </span>
                  <span className="text-[11px] text-[#74786F] font-mono uppercase mt-1 block">
                    Key Domains
                  </span>
                </div>
                <div className="p-2">
                  <span className="font-serif text-2xl text-[#183D32] block leading-none">
                    {formattedMb} MB
                  </span>
                  <span className="text-[11px] text-[#74786F] font-mono uppercase mt-1 block">
                    Source Volume
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
