# ECO-TRACK — EWEM Semester Assignment Portfolio Website

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: Academic](https://img.shields.io/badge/License-Academic%20Evaluation-2e593f.svg)](#academic-credentials)

> **Official Semester V Academic Portfolio** for **Environmental and Waste Management (EWEM)**.  
> Developed as a self-contained, 100% static client-side web application designed for seamless faculty review and grading without requiring backend servers or database connections.

---

## Academic Credentials

| Field | Detail |
|---|---|
| **Student Name** | **Harshada Avhad** |
| **Roll Number** | **`24102B0023`** |
| **Class & Division** | **CMPN-B** |
| **Semester** | **Semester V** |
| **Course / Subject** | **Environmental and Waste Management (EWEM)** |
| **Academic Year** | **2026–2027** |
| **Project Title** | **ECO-TRACK — EWEM Semester Portfolio** |

---

## Key Features

1. **Self-Contained Static Architecture:**
   - Zero external servers, Python/Flask backends, or SQL databases.
   - Deploys instantly to **Netlify Drop** (drag-and-drop) or **Vercel**.
   - Offline & permanent: documents are bundled directly into the static distribution bundle.
2. **Interactive Multi-Format Document Viewers:**
   - **PDFs:** Embedded in-browser sandbox with download and open controls.
   - **Excel Workbooks (`.xlsx`):** In-browser SheetJS engine rendering interactive sheet tabs (e.g., all 9 worksheets in the Rajasthan Tracker, 4 worksheets in LEED benchmarks) and live cell filtering.
   - **Word Documents (`.docx`):** Converted to clean, structured HTML via Mammoth.js.
   - **PowerPoint (`.pptx`):** Slide count metrics, architecture summaries, and companion PDF visual links.
   - **Images (`.jpg`, `.png`):** High-resolution responsive viewers for posters and carbon footprint audits.
3. **Faculty & Evaluator Features:**
   - **Full-text Search:** Filter by assignment title, filename, tags, or topic.
   - **6 Curated Syllabus Modules:** Quick jump between course categories.
   - **Format Filters:** Toggle between PDF, Excel, Word, Slides, and Images.
   - **Dual Views:** Grid card view or compact tabular list view for quick grading.
   - **Teacher Evaluation Guide Modal:** Comprehensive verification instructions built into the top navigation.

---

## Directory Organization

The project is structured with strict separation between original source materials, static assets, and source code:

```
Eco track/
├── coursework_source/                # Clean archive of all 19 original coursework files
│   ├── manifest.json                 # Complete metadata inventory
│   ├── Class Task_Upload...pdf
│   ├── Detailed_State_EWaste...PDF
│   ├── E-Revive Presentation...pptx
│   ├── LEED_India_10_Green...xlsx
│   └── ... (all 19 files)
│
├── public/                           # Static assets copied directly to dist during build
│   ├── _redirects                    # Netlify SPA routing rules (prevents 404s on refresh)
│   └── documents/                    # Production-bundled copies of all 19 documents
│
├── src/                              # Application source code (React + TypeScript)
│   ├── components/                   # Modular UI components
│   │   ├── AssignmentCard.tsx        # Grid card with format badge & preview/download
│   │   ├── AssignmentTable.tsx       # Compact table view for professor quick-grading
│   │   ├── CategoryCards.tsx         # 6 portfolio focus modules
│   │   ├── DocumentViewerModal.tsx   # Multi-engine viewer (PDF, XLSX, DOCX, PPTX, Img)
│   │   ├── FeaturedAssignments.tsx   # Highlighted semester deliverables
│   │   ├── FilterBar.tsx             # Search, category pills, format pills, view toggle
│   │   ├── Footer.tsx                # Academic attribution & back to top
│   │   ├── HeroSection.tsx           # Academic branding & student credential badge
│   │   ├── Navbar.tsx                # Top navigation with Teacher Guide trigger
│   │   └── TeacherGuideModal.tsx     # Evaluation instructions modal
│   ├── data/
│   │   ├── assignments.json          # Formatted JSON manifest of all 19 entries
│   │   ├── assignments.ts            # Typed datasets and category metadata
│   │   └── student.ts                # Student profile constants
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces
│   ├── App.tsx                       # Main application shell & router state
│   ├── index.css                     # Tailwind CSS & custom typography
│   ├── main.tsx                      # React root entry point
│   └── vite-env.d.ts                 # Type declarations
│
├── dist/                             # Output of `npm run build` (Ready for Netlify & Vercel)
├── index.html                        # HTML5 document with SEO tags & typography
├── package.json                      # Project dependencies & scripts
├── tailwind.config.js                # Custom environmental color palette
├── tsconfig.json                     # TypeScript compiler configuration
├── vercel.json                       # Vercel deployment & rewrite configuration
└── vite.config.ts                    # Vite build configuration with relative base
```

---

## Complete Assignment Inventory (19 Verified Files)

| # | Assignment Title | Filename | Format | Size | Category |
|---|---|---|:---:|:---:|---|
| 1 | State E-Waste Management Comprehensive Report — Rajasthan | `Detailed_State_EWaste_Management_Report_Rajasthan.PDF` | PDF | 264.6 KB | Rajasthan E-Waste Study |
| 2 | State E-Waste Data Tracker — Rajasthan Multi-Sheet Model | `State_EWaste_Tracker(Rajasthan).xlsx` | XLSX | 42.3 KB | Rajasthan E-Waste Study |
| 3 | E-Waste Management in Rajasthan — Academic Slide Deck | `Rajasthan_E_Waste_Management_Presentation-1.pptx` | PPTX | 181.7 KB | Rajasthan E-Waste Study |
| 4 | Directory & Capacity Analysis of Authorized Recyclers in Rajasthan | `Statewise_EWaste_Companies_Rajasthan.docx` | DOCX | 52.4 KB | Rajasthan E-Waste Study |
| 5 | E-Revive Complete Slide Deck (High-Resolution Visual Edition) | `E-Revive Presentation.pdf` | PDF | 2.11 MB | E-Revive Platform & Innovation |
| 6 | E-Revive Platform Architecture — Executive Summary Deck | `E-Revive Presentation (1).pdf` | PDF | 649.7 KB | E-Revive Platform & Innovation |
| 7 | E-Revive Smart E-Waste Second-Life Platform (Master Slide Deck) | `E-Revive Presentation (1).pptx` | PPTX | 1.20 MB | E-Revive Platform & Innovation |
| 8 | E-Revive E-Waste Recovery Process & Workflow Specification | `E-Revive_Detailed_Process_Workflow.docx` | DOCX | 116.4 KB | E-Revive Platform & Innovation |
| 9 | E-Waste India Scenario & National Comparative Analysis | `E waste India Scenario_Comparison.pdf` | PDF | 3.34 MB | National & Global Benchmarking |
| 10 | Corporate E-Waste Compliance Review — 5 Electronics Companies | `EWEM_31st_august_task.docx` | DOCX | 52.1 KB | National & Global Benchmarking |
| 11 | European Union WEEE Directives — 5-Country Comparative Study | `E_waste_Rules_Comparison_Europe.docx` | DOCX | 49.8 KB | National & Global Benchmarking |
| 12 | Singapore Zero Waste Masterplan — Engineering Case Study | `Singapore_Zero_Waste_Case_Study.pdf` | PDF | 44.5 KB | National & Global Benchmarking |
| 13 | LEED & IGBC Green Building Rating Architecture in India | `LEED Certificate Rating System of Green Building in India.pdf` | PDF | 1.63 MB | Green Buildings & Sustainability |
| 14 | LEED Certified Green Buildings: Point Factors & Structural Strengths | `LEED_10_Buildings_Points_and_Strengths.xlsx` | XLSX | 16.0 KB | Green Buildings & Sustainability |
| 15 | LEED India Top 10 Green Buildings: Verified Score Breakdown | `LEED_India_10_Green_Buildings_Score_Breakdown.xlsx` | XLSX | 20.5 KB | Green Buildings & Sustainability |
| 16 | Assignment 0: Course Insights & Autonomous Curriculum Framework | `EWEM_Assignment0.PDF` | PDF | 368.9 KB | Coursework & Foundational |
| 17 | In-Class Coursework & Technical Write-up | `Class Task_Upload the Write up done in Class.pdf` | PDF | 3.53 MB | Coursework & Foundational |
| 18 | Personal Carbon Footprint Audit & Global Benchmark Assessment | `Screenshot 2026-08-11 213821.png` | PNG | 66.1 KB | Coursework & Foundational |
| 19 | Campus E-Waste Awareness Drive & Quiz Competition Poster | `IMG-20260907-WA0003.jpg` | JPG | 216.7 KB | Campus Initiatives & Awareness |

---

## Local Development & Build Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- Windows PowerShell or any terminal

### 1. Install Dependencies
```powershell
npm install
```

### 2. Run Local Development Server
```powershell
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Build Production Bundle
```powershell
npm run build
```
This runs TypeScript checks (`tsc`) and compiles the application into the `dist/` directory.

### 4. Preview the Production Build Locally
```powershell
npm run preview
```
Open `http://localhost:4173/` to test the exact production bundle.

---

## Deployment Guide

### Option 1: Netlify Drop (Drag-and-Drop) — Recommended
1. Run `npm run build` to ensure the `dist/` folder is fresh.
2. Open your web browser and navigate to **[app.netlify.com/drop](https://app.netlify.com/drop)**.
3. Sign in or sign up (free).
4. Drag and drop the **entire `dist` folder** into the Netlify upload zone.
5. Netlify will deploy the site and provide a permanent public URL (e.g., `https://eco-track-harshada.netlify.app`).
6. Share this link with your course teacher.

### Option 2: Vercel (GitHub Integration or CLI)
1. Push your repository to GitHub.
2. Go to **[vercel.com](https://vercel.com/)** and click **Add New Project**.
3. Import your GitHub repository.
4. Keep standard Vite settings:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**. The included [`vercel.json`](vercel.json) automatically handles client-side routing.

---

## Instructions for Adding Future Assignments

1. Save the new assignment file into `public/documents/`.
2. Also place an archival copy in `coursework_source/`.
3. Open [`src/data/assignments.ts`](src/data/assignments.ts) and append an entry:
   ```typescript
   {
     id: "unique_id_here",
     filename: "Exact_Filename.pdf",
     title: "Display Title for Assignment",
     category: "Coursework & Foundational",
     description: "Brief factual summary...",
     author: "Harshada Avhad",
     academicStage: "Mid-Term Submission",
     tags: ["Tag1", "Tag2"],
     sizeBytes: 1048576,
     sizeFormatted: "1.00 MB",
     extension: "PDF",
     mimeType: "application/pdf",
     url: "/documents/Exact_Filename.pdf",
     downloadFilename: "Exact_Filename.pdf",
     featured: false
   }
   ```
4. Run `npm run build`. The new document will immediately appear in the portfolio and viewer.

---

## Evaluation & Academic Integrity

- **Original Document Integrity:** None of the 19 original files have been modified or altered.
- **Offline / Static Verification:** Every asset is served locally from `/documents/...`.
- **Teacher Guide:** Accessible directly via the "Teacher Guide" button in the website header.
