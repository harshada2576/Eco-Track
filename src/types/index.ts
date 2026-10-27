export type FileExtension = 'PDF' | 'XLSX' | 'PPTX' | 'DOCX' | 'JPG' | 'PNG';

export type CategoryName =
  | 'Coursework & Foundational'
  | 'Rajasthan E-Waste Study'
  | 'National & Global Benchmarking'
  | 'E-Revive Platform & Innovation'
  | 'Green Buildings & Sustainability'
  | 'Campus Initiatives & Awareness';

export interface Assignment {
  id: string;
  filename: string;
  title: string;
  category: CategoryName;
  description: string;
  author: string;
  academicStage: string;
  tags: string[];
  sizeBytes: number;
  sizeFormatted: string;
  extension: FileExtension;
  mimeType: string;
  url: string;
  downloadFilename: string;
  sheetNames?: string[];
  slideCount?: number;
  featured?: boolean;
}

export interface StudentProfile {
  name: string;
  rollNumber: string;
  className: string;
  semester: string;
  subject: string;
  subjectCode?: string;
  academicYear: string;
  institution?: string;
  portfolioName: string;
}
