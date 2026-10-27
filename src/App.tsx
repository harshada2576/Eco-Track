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
  BookOpen, 
  CheckCircle2, 
  FolderSearch, 
  FileCheck, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Search
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
    <div className="min-h-screen flex flex-col bg-offwhite-50 text-slate-800">
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

            {/* Academic Syllabus & Verification Callout */}
            <section className="py-12 bg-white border-b border-forest-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-forest-900 to-forest-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
                  <div className="max-w-2xl space-y-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      Syllabus Alignment & Course Evaluation
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Rigorous Environmental & Waste Management Studies
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Every submission reflects systematic research into national and state-level e-waste compliance, circular economy design, empirical carbon footprint calculations, and LEED green building benchmarks.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-4">
                      <button
                        onClick={handleBrowseAll}
                        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors inline-flex items-center space-x-2"
                      >
                        <span>Inspect All 19 Assignments</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowTeacherGuide(true)}
                        className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs sm:text-sm border border-white/20 transition-colors"
                      >
                        Read Evaluator Guide
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* All Assignments View */
          <div className="py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-xs text-forest-700 font-semibold mb-1">
                  <span>EWEM Portfolio</span>
                  <span>•</span>
                  <span>Semester V Coursework</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
                  All Coursework & Deliverables
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                  Browse, search, inspect in-browser, and download original assignment documents. Every file is self-contained and ready for grading.
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
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                  <FolderSearch className="w-12 h-12 text-slate-400 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-800">
                      No assignments found matching your filter
                    </h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Try clearing your search query or selecting a different category or file format.
                    </p>
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-forest-800 hover:bg-forest-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAssignments.map((assignment) => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      onView={(doc) => setActiveDocument(doc)}
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
