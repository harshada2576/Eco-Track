import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryCards } from './components/CategoryCards';
import { FeaturedAssignments } from './components/FeaturedAssignments';
import { FilterBar } from './components/FilterBar';
import { AssignmentCard } from './components/AssignmentCard';
import { AssignmentTable } from './components/AssignmentTable';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { Footer } from './components/Footer';
import { RAW_ASSIGNMENTS } from './data/assignments';
import { Assignment } from './types';
import { STUDENT_INFO } from './data/student';
import { 
  FolderSearch, 
  ArrowUpRight,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'home' | 'assignments'>('home');
  const [activeDocument, setActiveDocument] = useState<Assignment | null>(null);
  const [showTeacherGuide, setShowTeacherGuide] = useState<boolean>(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedFormat, setSelectedFormat] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Total coursework size
  const totalSizeBytes = useMemo(() => {
    return RAW_ASSIGNMENTS.reduce((acc, curr) => acc + curr.sizeBytes, 0);
  }, []);

  // Filtered assignments
  const filteredAssignments = useMemo(() => {
    return RAW_ASSIGNMENTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
        return false;
      }

      // Format filter
      if (selectedFormat !== 'ALL') {
        if (selectedFormat === 'IMAGE') {
          if (item.extension !== 'JPG' && item.extension !== 'PNG') return false;
        } else if (item.extension !== selectedFormat) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(query);
        const inFilename = item.filename.toLowerCase().includes(query);
        const inDescription = item.description.toLowerCase().includes(query);
        const inTags = item.tags.some((t) => t.toLowerCase().includes(query));
        const inCategory = item.category.toLowerCase().includes(query);

        return inTitle || inFilename || inDescription || inTags || inCategory;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedFormat]);

  const isFiltered = searchQuery.trim() !== '' || selectedCategory !== 'ALL' || selectedFormat !== 'ALL';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedFormat('ALL');
  };

  const handleSelectCategoryFromHome = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentTab('assignments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrowseAll = () => {
    setSelectedCategory('ALL');
    setSelectedFormat('ALL');
    setSearchQuery('');
    setCurrentTab('assignments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#292D29]">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTeacherGuide={() => setShowTeacherGuide(true)}
        totalAssignments={RAW_ASSIGNMENTS.length}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {currentTab === 'home' ? (
          <div>
            {/* Hero Section */}
            <HeroSection
              onBrowseAll={handleBrowseAll}
              onExploreCategory={handleSelectCategoryFromHome}
              totalAssignments={RAW_ASSIGNMENTS.length}
              totalSizeBytes={totalSizeBytes}
            />

            {/* Category Cards Section */}
            <CategoryCards onSelectCategory={handleSelectCategoryFromHome} />

            {/* Featured Coursework Section */}
            <FeaturedAssignments
              assignments={RAW_ASSIGNMENTS}
              onViewDocument={(doc) => setActiveDocument(doc)}
              onBrowseAll={handleBrowseAll}
            />

            {/* Academic Rigour & Curriculum Statement */}
            <section className="py-16 sm:py-20 bg-[#FAF9F5] border-b border-[#DCDDD3]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#183D32] rounded-lg p-8 sm:p-12 text-[#FAF9F5] border border-[#315B45]">
                  <div className="max-w-3xl space-y-4">
                    <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#A6B49A]">
                      <ShieldCheck className="w-4 h-4 text-[#A6B49A]" />
                      <span>SYLLABUS ALIGNMENT & ASSESSMENT INTEGRITY</span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF9F5] leading-tight font-normal">
                      Rigorous Environmental & Waste Management Research
                    </h2>

                    <p className="text-sm sm:text-base text-[#E3E7DD]/80 leading-relaxed font-normal">
                      Every submission reflects systematic empirical research into national and state-level electronic waste compliance, circular economy design, carbon footprint audits, and LEED green building benchmarks. All documents are hosted locally as unmodified static files for direct grading.
                    </p>

                    <div className="pt-4 flex flex-wrap gap-4">
                      <button
                        onClick={handleBrowseAll}
                        className="px-6 py-3 bg-[#FAF9F5] hover:bg-[#E3E7DD] text-[#183D32] font-medium rounded-md text-xs sm:text-sm tracking-wide transition-colors inline-flex items-center space-x-2 shadow-sm"
                      >
                        <span>Inspect Complete Archive ({RAW_ASSIGNMENTS.length} Deliverables)</span>
                        <ArrowUpRight className="w-4 h-4 text-[#183D32]" />
                      </button>

                      <button
                        onClick={() => setShowTeacherGuide(true)}
                        className="px-5 py-3 bg-transparent hover:bg-[#315B45]/50 text-[#FAF9F5] font-medium rounded-md text-xs sm:text-sm tracking-wide border border-[#A6B49A]/40 transition-colors inline-flex items-center space-x-2"
                      >
                        <BookOpen className="w-4 h-4 text-[#A6B49A]" />
                        <span>Read Evaluator Guide</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* All Assignments Archive View */
          <div className="py-10 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Header */}
              <div className="mb-8 pb-6 border-b border-[#DCDDD3]">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#74786F] mb-2">
                  <span>EWEM PORTFOLIO</span>
                  <span>•</span>
                  <span>SEMESTER V ARCHIVE</span>
                </div>
                
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#183D32] leading-tight font-normal">
                  All Coursework & Deliverables
                </h1>
                
                <p className="text-xs sm:text-sm text-[#292D29]/75 mt-2 max-w-2xl leading-relaxed">
                  Browse, search, inspect in-browser, and download original assignment documents. Every file is self-contained and ready for faculty review.
                </p>
              </div>

              {/* Filter Bar */}
              <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedFormat={selectedFormat}
                onFormatChange={setSelectedFormat}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onReset={handleResetFilters}
                isFiltered={isFiltered}
                totalFiltered={filteredAssignments.length}
                totalAssignments={RAW_ASSIGNMENTS.length}
              />

              {/* Assignments Listing */}
              {filteredAssignments.length === 0 ? (
                <div className="bg-[#FAF9F5] rounded-lg border border-[#DCDDD3] p-12 text-center space-y-4">
                  <FolderSearch className="w-10 h-10 text-[#74786F] mx-auto" />
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl text-[#183D32]">
                      No assignments found matching your criteria
                    </h3>
                    <p className="text-xs text-[#74786F] max-w-md mx-auto">
                      Try clearing your search query or choosing a different category or file format.
                    </p>
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-[#183D32] hover:bg-[#315B45] text-[#FAF9F5] rounded-md text-xs font-medium tracking-wide transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAssignments.map((assignment, index) => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      onView={(doc) => setActiveDocument(doc)}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <AssignmentTable
                  assignments={filteredAssignments}
                  onView={(doc) => setActiveDocument(doc)}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTeacherGuide={() => setShowTeacherGuide(true)}
      />

      {/* Document Viewer Modal */}
      {activeDocument && (
        <DocumentViewerModal
          assignment={activeDocument}
          onClose={() => setActiveDocument(null)}
        />
      )}

      {/* Teacher Guide Modal */}
      {showTeacherGuide && (
        <TeacherGuideModal
          onClose={() => setShowTeacherGuide(false)}
        />
      )}
    </div>
  );
};

export default App;
