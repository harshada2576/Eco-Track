import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  FileText, 
  Table, 
  Presentation, 
  Image as ImageIcon, 
  Search, 
  Layers, 
  ChevronRight,
  Info,
  Maximize2,
  Minimize2,
  CheckCircle2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';
import { Assignment } from '../types';
import { resolveDocUrl } from '../data/assignments';

interface DocumentViewerModalProps {
  assignment: Assignment | null;
  onClose: () => void;
  onSelectRelated?: (assignment: Assignment) => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  assignment,
  onClose,
  onSelectRelated
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Excel state
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [activeSheet, setActiveSheet] = useState<string>('');
  const [sheetData, setSheetData] = useState<any[][]>([]);
  const [excelSearch, setExcelSearch] = useState<string>('');

  // Docx state
  const [docxHtml, setDocxHtml] = useState<string>('');

  // Reset when document changes
  useEffect(() => {
    if (!assignment) return;

    setLoading(true);
    setLoadError(null);
    setWorkbook(null);
    setActiveSheet('');
    setSheetData([]);
    setExcelSearch('');
    setDocxHtml('');

    const docUrl = resolveDocUrl(assignment.url);

    if (assignment.extension === 'XLSX') {
      fetch(docUrl)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch spreadsheet`);
          return res.arrayBuffer();
        })
        .then((buf) => {
          const wb = XLSX.read(buf, { type: 'array' });
          setWorkbook(wb);
          const firstSheet = wb.SheetNames[0] || '';
          setActiveSheet(firstSheet);
          if (firstSheet) {
            const ws = wb.Sheets[firstSheet];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' }) as any[][];
            setSheetData(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error loading Excel file:', err);
          setLoadError(err.message || 'Could not parse spreadsheet in browser. You can still download the original file.');
          setLoading(false);
        });
    } else if (assignment.extension === 'DOCX') {
      fetch(docUrl)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch Word document`);
          return res.arrayBuffer();
        })
        .then((buf) => {
          return mammoth.convertToHtml({ arrayBuffer: buf });
        })
        .then((result) => {
          setDocxHtml(result.value);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error loading Word document:', err);
          setLoadError(err.message || 'Could not preview Word document in browser. You can still download the original file.');
          setLoading(false);
        });
    } else {
      // PDF or Image
      setLoading(false);
    }
  }, [assignment]);

  // Handle switching sheets in Excel
  const handleSheetChange = (sheetName: string) => {
    if (!workbook) return;
    setActiveSheet(sheetName);
    const ws = workbook.Sheets[sheetName];
    if (ws) {
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' }) as any[][];
      setSheetData(data);
    }
  };

  if (!assignment) return null;

  const docUrl = resolveDocUrl(assignment.url);

  // Filter Excel rows based on search
  const filteredRows = sheetData.filter((row, idx) => {
    if (idx === 0) return true; // keep header
    if (!excelSearch.trim()) return true;
    return row.some((cell) =>
      String(cell).toLowerCase().includes(excelSearch.toLowerCase())
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 transition-all duration-200">
      <div 
        className={`bg-white rounded-2xl shadow-2xl flex flex-col w-full transition-all duration-300 border border-slate-200 overflow-hidden ${
          isFullscreen 
            ? 'h-[98vh] max-w-[98vw]' 
            : 'h-[92vh] max-w-6xl'
        }`}
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-forest-700/50">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="p-2 bg-white/10 rounded-lg text-emerald-300 shrink-0">
              {assignment.extension === 'PDF' && <FileText className="w-5 h-5" />}
              {assignment.extension === 'XLSX' && <Table className="w-5 h-5" />}
              {assignment.extension === 'PPTX' && <Presentation className="w-5 h-5" />}
              {assignment.extension === 'DOCX' && <FileText className="w-5 h-5 text-blue-300" />}
              {(assignment.extension === 'JPG' || assignment.extension === 'PNG') && <ImageIcon className="w-5 h-5 text-amber-300" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {assignment.extension}
                </span>
                <span className="text-xs text-slate-300 truncate hidden sm:inline">
                  {assignment.category}
                </span>
                <span className="text-xs text-slate-400">• {assignment.sizeFormatted}</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white truncate leading-tight mt-0.5">
                {assignment.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {/* Direct Download Button */}
            <a
              href={docUrl}
              download={assignment.downloadFilename}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-lg shadow-sm transition-colors"
              title="Download original file"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            {/* Open in New Window/Tab */}
            <a
              href={docUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors hidden sm:inline-flex"
              title="Open file in separate browser tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors hidden md:inline-flex"
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-header / Metadata Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-2 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <span className="font-mono text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded">
              {assignment.filename}
            </span>
            <span className="hidden md:inline text-slate-500">
              Author: <strong className="text-slate-700">{assignment.author}</strong>
            </span>
            <span className="hidden lg:inline text-slate-500">
              Academic Stage: <strong className="text-slate-700">{assignment.academicStage}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-1">
            {assignment.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-forest-50 text-forest-800 rounded-full border border-forest-200 text-[11px]">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto bg-slate-100/70 p-2 sm:p-4 flex flex-col relative">
          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-3 py-16">
              <RefreshCw className="w-8 h-8 text-forest-600 animate-spin" />
              <p className="text-sm font-medium text-slate-600">Reading and rendering document content...</p>
            </div>
          )}

          {loadError && (
            <div className="m-4 p-5 bg-amber-50 border border-amber-200 rounded-xl text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
              <h3 className="font-semibold text-slate-800">Browser Preview Notice</h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">{loadError}</p>
              <div className="pt-2 flex justify-center space-x-3">
                <a
                  href={docUrl}
                  download={assignment.downloadFilename}
                  className="px-4 py-2 bg-forest-800 hover:bg-forest-700 text-white text-xs font-semibold rounded-lg inline-flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Original ({assignment.sizeFormatted})</span>
                </a>
                <a
                  href={docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg inline-flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Directly</span>
                </a>
              </div>
            </div>
          )}

          {/* RENDER BY TYPE */}
          {!loading && !loadError && (
            <>
              {/* PDF VIEWER */}
              {assignment.extension === 'PDF' && (
                <div className="flex-1 w-full h-full flex flex-col rounded-xl overflow-hidden border border-slate-300 shadow-sm bg-white">
                  <iframe
                    src={`${docUrl}#toolbar=1&navpanes=1`}
                    title={assignment.title}
                    className="w-full h-full flex-1 border-0 min-h-[600px]"
                  />
                  <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                    <span className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Original authentic PDF rendered directly from deployed bundle.</span>
                    </span>
                    <a
                      href={docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest-700 hover:underline font-medium inline-flex items-center space-x-1"
                    >
                      <span>Open in standalone viewer</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              {/* EXCEL VIEWER */}
              {assignment.extension === 'XLSX' && workbook && (
                <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-slate-300 overflow-hidden min-h-[500px]">
                  {/* Excel Sheet Tabs & Search */}
                  <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center space-x-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1 mr-1">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Worksheets:</span>
                      </span>
                      {workbook.SheetNames.map((name) => (
                        <button
                          key={name}
                          onClick={() => handleSheetChange(name)}
                          className={`px-3 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                            activeSheet === name
                              ? 'bg-forest-800 text-white shadow-sm'
                              : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                          }`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <div className="relative flex-1 sm:w-60">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={excelSearch}
                          onChange={(e) => setExcelSearch(e.target.value)}
                          placeholder="Filter cells in sheet..."
                          className="w-full pl-8 pr-3 py-1 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-forest-500 bg-white"
                        />
                      </div>
                      <span className="text-[11px] text-slate-500 whitespace-nowrap">
                        {filteredRows.length > 0 ? `${filteredRows.length - 1} rows` : '0 rows'}
                      </span>
                    </div>
                  </div>

                  {/* Excel Sheet Table Grid */}
                  <div className="flex-1 overflow-auto max-h-[650px] p-2">
                    {filteredRows.length === 0 ? (
                      <div className="py-12 text-center text-slate-500 text-xs">
                        No rows matching filter in "{activeSheet}".
                      </div>
                    ) : (
                      <table className="min-w-full divide-y divide-slate-200 text-xs border-collapse font-mono">
                        <thead className="bg-slate-50 sticky top-0 z-10">
                          <tr>
                            <th className="px-2 py-1.5 text-left text-[11px] font-bold text-slate-400 bg-slate-100 border border-slate-300 w-12 text-center">
                              #
                            </th>
                            {filteredRows[0]?.map((col: any, colIdx: number) => (
                              <th
                                key={colIdx}
                                className="px-3 py-1.5 text-left text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-300 tracking-wider whitespace-nowrap"
                              >
                                {col !== '' && col !== undefined ? String(col) : `Col ${colIdx + 1}`}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                          {filteredRows.slice(1).map((row, rowIdx) => (
                            <tr key={rowIdx} className="hover:bg-forest-50/50 transition-colors">
                              <td className="px-2 py-1 text-center text-[10px] text-slate-400 bg-slate-50 border border-slate-200 select-none">
                                {rowIdx + 1}
                              </td>
                              {filteredRows[0]?.map((_, colIdx: number) => (
                                <td
                                  key={colIdx}
                                  className="px-3 py-1 text-slate-800 border border-slate-200 whitespace-pre-wrap max-w-md font-sans text-xs"
                                >
                                  {row[colIdx] !== undefined && row[colIdx] !== null ? String(row[colIdx]) : ''}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  {/* Excel Footer Info */}
                  <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                    <span>
                      Active Sheet: <strong className="text-forest-800">{activeSheet}</strong> ({workbook.SheetNames.length} total sheets in workbook)
                    </span>
                    <a
                      href={docUrl}
                      download={assignment.downloadFilename}
                      className="text-forest-700 font-semibold hover:underline inline-flex items-center space-x-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Unmodified Workbook (.xlsx)</span>
                    </a>
                  </div>
                </div>
              )}

              {/* WORD (DOCX) VIEWER */}
              {assignment.extension === 'DOCX' && docxHtml && (
                <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-slate-300 overflow-hidden min-h-[500px]">
                  <div className="bg-slate-100 px-5 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center space-x-1.5 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Converted from native DOCX using Mammoth document engine</span>
                    </span>
                    <a
                      href={docUrl}
                      download={assignment.downloadFilename}
                      className="text-forest-700 font-semibold hover:underline inline-flex items-center space-x-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Original .docx</span>
                    </a>
                  </div>
                  <div className="flex-1 overflow-auto p-6 md:p-10 max-w-4xl mx-auto w-full bg-white shadow-inner">
                    <div 
                      className="docx-rendered-content prose prose-slate max-w-none font-sans"
                      dangerouslySetInnerHTML={{ __html: docxHtml }}
                    />
                  </div>
                </div>
              )}

              {/* POWERPOINT (PPTX) VIEWER */}
              {assignment.extension === 'PPTX' && (
                <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-slate-300 text-center space-y-6">
                  <div className="w-20 h-20 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-md">
                    <Presentation className="w-10 h-10" />
                  </div>
                  <div className="max-w-xl space-y-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
                      PowerPoint Presentation ({assignment.slideCount ? `${assignment.slideCount} Slides` : 'Master Deck'})
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{assignment.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {assignment.description}
                    </p>
                  </div>

                  {/* If this is E-Revive PPTX, suggest viewing the companion PDF deck */}
                  {assignment.id.includes('e_revive') && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl max-w-lg text-left text-xs text-emerald-900 flex items-start space-x-3">
                      <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-semibold">High-Resolution Slide Deck Available as PDF:</strong>
                        <span>
                          For instant in-browser slide viewing without PowerPoint installed, browse the companion E-Revive PDF deck in the portfolio.
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                    <a
                      href={docUrl}
                      download={assignment.downloadFilename}
                      className="px-6 py-3 bg-forest-800 hover:bg-forest-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all inline-flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Presentation ({assignment.sizeFormatted})</span>
                    </a>
                    <a
                      href={docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl transition-all inline-flex items-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open File Directly</span>
                    </a>
                  </div>
                </div>
              )}

              {/* IMAGE VIEWER */}
              {(assignment.extension === 'JPG' || assignment.extension === 'PNG') && (
                <div className="flex-1 flex flex-col bg-slate-950 rounded-xl overflow-hidden shadow-md items-center justify-center p-4">
                  <div className="relative max-h-[75vh] flex items-center justify-center">
                    <img
                      src={docUrl}
                      alt={assignment.title}
                      className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl border border-slate-800"
                    />
                  </div>
                  <div className="w-full mt-3 bg-slate-900/90 text-slate-300 px-4 py-2 rounded-lg text-xs flex items-center justify-between">
                    <span>{assignment.title} • {assignment.sizeFormatted}</span>
                    <a
                      href={docUrl}
                      download={assignment.downloadFilename}
                      className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center space-x-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download High-Res Original</span>
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer / Description Bar */}
        <div className="bg-white border-t border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
          <p className="max-w-2xl text-slate-700 leading-relaxed">
            <strong className="text-slate-900">Academic Context:</strong> {assignment.description}
          </p>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
            >
              Back to Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
