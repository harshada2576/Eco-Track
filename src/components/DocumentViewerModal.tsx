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
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  RefreshCw, 
  AlertCircle,
  ArrowDown
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

// Sanitize HTML string to prevent XSS injection from document conversion
const sanitizeHtml = (html: string): string => {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\son\w+=(['"]).*?\1/gi, '')
    .replace(/href=(['"])javascript:.*?\1/gi, 'href="#"');
};

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
          setDocxHtml(sanitizeHtml(result.value));
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#183D32]/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 transition-all duration-200">
      <div 
        className={`bg-[#FAF9F5] rounded-lg shadow-2xl flex flex-col w-full transition-all duration-300 border border-[#DCDDD3] overflow-hidden ${
          isFullscreen 
            ? 'h-[98vh] max-w-[98vw]' 
            : 'h-[92vh] max-w-6xl'
        }`}
      >
        {/* Editorial Reading Environment: Top Header Bar */}
        <div className="bg-[#FAF9F5] px-6 py-4 border-b border-[#DCDDD3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Breadcrumb & Title */}
          <div className="min-w-0 space-y-1">
            <div className="flex items-center space-x-2 text-xs text-[#74786F] font-mono">
              <span>Coursework</span>
              <span>/</span>
              <span className="text-[#315B45] font-medium">{assignment.category}</span>
              <span>/</span>
              <span className="uppercase text-[10px] px-1.5 py-0.2 rounded bg-[#E3E7DD] text-[#183D32] font-semibold">
                {assignment.extension}
              </span>
            </div>

            <h2 className="font-serif text-xl sm:text-2xl text-[#183D32] truncate leading-tight font-normal">
              {assignment.title}
            </h2>
          </div>

          {/* Action Bar */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Prominent but restrained Download Action */}
            <a
              href={docUrl}
              download={assignment.downloadFilename}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#183D32] hover:bg-[#315B45] text-[#FAF9F5] text-xs font-medium tracking-wide rounded-md shadow-sm transition-colors"
              title="Download original file"
            >
              <ArrowDown className="w-3.5 h-3.5" />
              <span>Download original ({assignment.sizeFormatted})</span>
            </a>

            {/* Open in Separate Tab */}
            <a
              href={docUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#74786F] hover:text-[#183D32] hover:bg-[#E3E7DD]/50 border border-[#DCDDD3] rounded-md transition-colors hidden sm:inline-flex"
              title="Open file in separate browser tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-[#74786F] hover:text-[#183D32] hover:bg-[#E3E7DD]/50 border border-[#DCDDD3] rounded-md transition-colors hidden md:inline-flex"
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-[#74786F] hover:text-[#183D32] hover:bg-[#E3E7DD]/50 border border-[#DCDDD3] rounded-md transition-colors"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metadata Strip */}
        <div className="bg-[#F3F0E7] border-b border-[#DCDDD3] px-6 py-2 text-xs text-[#74786F] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3 font-mono text-[11px]">
            <span className="text-[#292D29] bg-white px-2 py-0.5 rounded border border-[#DCDDD3]">
              {assignment.filename}
            </span>
            <span className="hidden md:inline">
              Author: <strong className="text-[#292D29] font-sans">{assignment.author}</strong>
            </span>
            <span className="hidden lg:inline">
              Stage: <strong className="text-[#292D29] font-sans">{assignment.academicStage}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-1">
            {assignment.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-[#E3E7DD]/70 text-[#183D32] rounded font-mono text-[10px]">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto bg-[#F3F0E7]/40 p-3 sm:p-5 flex flex-col relative">
          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-3 py-16">
              <RefreshCw className="w-7 h-7 text-[#183D32] animate-spin" />
              <p className="text-xs font-mono text-[#74786F]">Loading document payload...</p>
            </div>
          )}

          {loadError && (
            <div className="m-4 p-6 bg-[#FAF9F5] border border-[#B76E4B]/40 rounded-lg text-center space-y-3 max-w-xl mx-auto">
              <AlertCircle className="w-8 h-8 text-[#B76E4B] mx-auto" />
              <h3 className="font-serif text-lg text-[#183D32]">Browser Preview Notice</h3>
              <p className="text-xs text-[#292D29]/75 leading-relaxed">{loadError}</p>
              <div className="pt-2 flex justify-center space-x-3">
                <a
                  href={docUrl}
                  download={assignment.downloadFilename}
                  className="px-4 py-2 bg-[#183D32] hover:bg-[#315B45] text-[#FAF9F5] text-xs font-medium rounded-md inline-flex items-center space-x-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Original ({assignment.sizeFormatted})</span>
                </a>
                <a
                  href={docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-transparent border border-[#DCDDD3] hover:bg-[#E3E7DD]/50 text-[#183D32] text-xs font-medium rounded-md inline-flex items-center space-x-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
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
                <div className="flex-1 w-full h-full flex flex-col rounded-md overflow-hidden border border-[#DCDDD3] bg-white shadow-sm">
                  <iframe
                    src={`${docUrl}#toolbar=1&navpanes=1`}
                    title={assignment.title}
                    className="w-full h-full flex-1 border-0 min-h-[550px]"
                  />
                  <div className="bg-[#FAF9F5] px-4 py-2 border-t border-[#DCDDD3] text-xs text-[#74786F] flex items-center justify-between">
                    <span className="flex items-center space-x-1.5 font-mono text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#315B45]" />
                      <span>Original authentic PDF rendered directly from deployed static bundle.</span>
                    </span>
                    <a
                      href={docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#183D32] hover:underline font-medium inline-flex items-center space-x-1 text-[11px]"
                    >
                      <span>Standalone viewer</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              {/* EXCEL VIEWER */}
              {assignment.extension === 'XLSX' && workbook && (
                <div className="flex-1 flex flex-col bg-white rounded-md border border-[#DCDDD3] overflow-hidden min-h-[500px]">
                  {/* Ledger Tab Bar & Filter */}
                  <div className="bg-[#F3F0E7] border-b border-[#DCDDD3] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center space-x-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
                      <span className="font-mono text-xs text-[#74786F] uppercase tracking-wider flex items-center space-x-1 mr-1">
                        <Layers className="w-3.5 h-3.5 text-[#315B45]" />
                        <span>Worksheets:</span>
                      </span>
                      {workbook.SheetNames.map((name) => (
                        <button
                          key={name}
                          onClick={() => handleSheetChange(name)}
                          className={`px-3 py-1 text-xs font-mono rounded transition-all whitespace-nowrap ${
                            activeSheet === name
                              ? 'bg-[#183D32] text-[#FAF9F5] font-medium'
                              : 'bg-white text-[#292D29] hover:bg-[#E3E7DD] border border-[#DCDDD3]'
                          }`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <div className="relative flex-1 sm:w-60">
                        <Search className="w-3.5 h-3.5 text-[#74786F] absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={excelSearch}
                          onChange={(e) => setExcelSearch(e.target.value)}
                          placeholder="Filter cells in sheet..."
                          className="w-full pl-8 pr-3 py-1 text-xs border border-[#DCDDD3] rounded focus:outline-none focus:border-[#183D32] bg-white font-mono"
                        />
                      </div>
                      <span className="font-mono text-[11px] text-[#74786F] whitespace-nowrap">
                        {filteredRows.length > 0 ? `${filteredRows.length - 1} rows` : '0 rows'}
                      </span>
                    </div>
                  </div>

                  {/* Excel Sheet Table Grid */}
                  <div className="flex-1 overflow-auto max-h-[650px] p-2 bg-white">
                    {filteredRows.length === 0 ? (
                      <div className="py-12 text-center text-[#74786F] text-xs font-mono">
                        No rows matching filter in "{activeSheet}".
                      </div>
                    ) : (
                      <table className="min-w-full divide-y divide-[#DCDDD3] text-xs border-collapse font-mono">
                        <thead className="bg-[#F3F0E7] sticky top-0 z-10">
                          <tr>
                            <th className="px-2 py-1.5 text-center text-[10px] text-[#74786F] bg-[#F3F0E7] border border-[#DCDDD3] w-12">
                              #
                            </th>
                            {filteredRows[0]?.map((col: any, colIdx: number) => (
                              <th
                                key={colIdx}
                                className="px-3 py-1.5 text-left text-xs font-semibold text-[#183D32] bg-[#F3F0E7] border border-[#DCDDD3] tracking-wider whitespace-nowrap"
                              >
                                {col !== '' && col !== undefined ? String(col) : `Col ${colIdx + 1}`}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-[#DCDDD3]/70">
                          {filteredRows.slice(1).map((row, rowIdx) => (
                            <tr key={rowIdx} className="hover:bg-[#F3F0E7]/60 transition-colors">
                              <td className="px-2 py-1 text-center text-[10px] text-[#74786F] bg-[#FAF9F5] border border-[#DCDDD3] select-none">
                                {rowIdx + 1}
                              </td>
                              {filteredRows[0]?.map((_, colIdx: number) => (
                                <td
                                  key={colIdx}
                                  className="px-3 py-1 text-[#292D29] border border-[#DCDDD3] whitespace-pre-wrap max-w-md font-sans text-xs"
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

                  {/* Excel Footer */}
                  <div className="bg-[#FAF9F5] px-4 py-2 border-t border-[#DCDDD3] text-xs text-[#74786F] flex items-center justify-between">
                    <span className="font-mono text-[11px]">
                      Sheet: <strong className="text-[#183D32]">{activeSheet}</strong> ({workbook.SheetNames.length} total sheets in workbook)
                    </span>
                    <a
                      href={docUrl}
                      download={assignment.downloadFilename}
                      className="text-[#183D32] font-medium hover:underline inline-flex items-center space-x-1 text-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Unmodified Workbook (.xlsx)</span>
                    </a>
                  </div>
                </div>
              )}

              {/* WORD (DOCX) VIEWER */}
              {assignment.extension === 'DOCX' && docxHtml && (
                <div className="flex-1 flex flex-col bg-white rounded-md border border-[#DCDDD3] overflow-hidden min-h-[500px]">
                  <div className="bg-[#F3F0E7] px-6 py-2.5 border-b border-[#DCDDD3] flex items-center justify-between text-xs text-[#74786F]">
                    <span className="flex items-center space-x-1.5 font-mono text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#315B45]" />
                      <span>Rendered in publication typography using Mammoth engine</span>
                    </span>
                    <a
                      href={docUrl}
                      download={assignment.downloadFilename}
                      className="text-[#183D32] font-medium hover:underline inline-flex items-center space-x-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .docx</span>
                    </a>
                  </div>
                  <div className="flex-1 overflow-auto p-6 md:p-12 max-w-3xl mx-auto w-full bg-white">
                    <div 
                      className="docx-rendered-content"
                      dangerouslySetInnerHTML={{ __html: docxHtml }}
                    />
                  </div>
                </div>
              )}

              {/* POWERPOINT (PPTX) VIEWER */}
              {assignment.extension === 'PPTX' && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#FAF9F5] rounded-md border border-[#DCDDD3] text-center space-y-6">
                  <div className="w-16 h-16 rounded-md bg-[#F3F0E7] text-[#B76E4B] border border-[#DCDDD3] flex items-center justify-center">
                    <Presentation className="w-8 h-8" />
                  </div>
                  <div className="max-w-xl space-y-2">
                    <span className="px-3 py-1 rounded text-xs font-mono bg-[#E3E7DD] text-[#183D32]">
                      PowerPoint Presentation ({assignment.slideCount ? `${assignment.slideCount} Slides` : 'Master Deck'})
                    </span>
                    <h3 className="font-serif text-2xl text-[#183D32]">{assignment.title}</h3>
                    <p className="text-xs sm:text-sm text-[#292D29]/75 leading-relaxed">
                      {assignment.description}
                    </p>
                  </div>

                  {/* Suggest companion PDF deck if E-Revive */}
                  {assignment.id.includes('e_revive') && (
                    <div className="p-4 bg-[#F3F0E7] border border-[#DCDDD3] rounded-md max-w-lg text-left text-xs text-[#292D29] flex items-start space-x-3">
                      <FileText className="w-4 h-4 text-[#315B45] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-medium text-[#183D32]">High-Resolution Visual Edition Available:</strong>
                        <span className="text-[#74786F]">
                          For full in-browser visual slide preview without PowerPoint installed, browse the companion E-Revive PDF slide deck in the portfolio archive.
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={docUrl}
                      download={assignment.downloadFilename}
                      className="px-5 py-2.5 bg-[#183D32] hover:bg-[#315B45] text-[#FAF9F5] text-xs font-medium rounded-md tracking-wide shadow-sm transition-all inline-flex items-center space-x-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Presentation ({assignment.sizeFormatted})</span>
                    </a>
                    <a
                      href={docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-transparent border border-[#DCDDD3] hover:bg-[#E3E7DD]/50 text-[#183D32] text-xs font-medium rounded-md tracking-wide transition-all inline-flex items-center space-x-2"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open File Directly</span>
                    </a>
                  </div>
                </div>
              )}

              {/* IMAGE VIEWER */}
              {(assignment.extension === 'JPG' || assignment.extension === 'PNG') && (
                <div className="flex-1 flex flex-col bg-[#292D29] rounded-md overflow-hidden items-center justify-center p-4">
                  <div className="relative max-h-[75vh] flex items-center justify-center">
                    <img
                      src={docUrl}
                      alt={assignment.title}
                      className="max-h-[70vh] max-w-full object-contain rounded border border-[#74786F]/40 shadow-xl"
                    />
                  </div>
                  <div className="w-full mt-3 bg-[#183D32] text-[#FAF9F5] px-4 py-2 rounded text-xs flex items-center justify-between font-mono">
                    <span>{assignment.title} • {assignment.sizeFormatted}</span>
                    <a
                      href={docUrl}
                      download={assignment.downloadFilename}
                      className="text-[#A6B49A] hover:text-white font-medium inline-flex items-center space-x-1"
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

        {/* Footer Bar */}
        <div className="bg-[#FAF9F5] border-t border-[#DCDDD3] px-6 py-3 flex flex-wrap items-center justify-between text-xs text-[#74786F] gap-2">
          <p className="max-w-2xl text-[#292D29]/75 leading-relaxed">
            <strong className="text-[#183D32] font-medium">Academic Context:</strong> {assignment.description}
          </p>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#E3E7DD] hover:bg-[#DCDDD3] text-[#183D32] font-medium rounded-md transition-colors"
            >
              Back to Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
