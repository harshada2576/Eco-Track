# ECO-TRACK — EWEM Academic Research Portfolio
## Environmental & Waste Management (EWEM) — Semester V (2026–2027)

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Security: Hardened](https://img.shields.io/badge/Security-Hardened%20%26%20Sanitized-183D32.svg)](#security--hardening-guarantees)
[![License: Academic](https://img.shields.io/badge/License-Academic%20Evaluation-315B45.svg)](#academic-credentials)

> **Official Semester V Academic Portfolio** for **Environmental and Waste Management (EWEM)**.  
> Designed and architected as a premium editorial sustainability research publication and self-contained static web portfolio. Faculty evaluators can browse, search, inspect in-browser, and download original course submissions without requiring external backend servers or database connections.

---

## Academic Credentials

| Attribute | Details |
|---|---|
| **Student Name** | **Harshada Avhad** |
| **Roll Number** | **`24102B0023`** |
| **Class & Cohort** | **CMPN-B** |
| **Semester** | **Semester V** |
| **Subject** | **Environmental and Waste Management (EWEM)** |
| **Academic Session** | **2026–2027** |
| **Portfolio Title** | **ECO-TRACK — EWEM Academic Portfolio** |
| **Live Deployment** | [eco-track-ten-inky.vercel.app](https://eco-track-ten-inky.vercel.app/) |

---

## Visual Design System & Editorial Identity

ECO-TRACK is intentionally art-directed as a high-end environmental research publication, avoiding generic AI-generated templates and saturated neon effects in favor of natural pigments, warm paper surfaces, and deliberate typography:

### 1. Color Palette
- **Deep Forest (`#183D32`):** Primary headings, high-contrast actions, and brand marks.
- **Moss Green (`#315B45`):** Secondary headers, active pill controls, and module indicators.
- **Muted Sage (`#A6B49A`):** Accents, subtle metadata tags, and border highlights.
- **Warm Paper (`#F3F0E7`):** Card panels, document reading headers, and table head rows.
- **Soft Cream (`#FAF9F5`):** Main page canvas and clean card surfaces.
- **Light Sage Surface (`#E3E7DD`):** Category tags, metadata chips, and quiet hover states.
- **Terracotta / Clay (`#B76E4B`):** Selective editorial highlights and slide deck badges.
- **Charcoal (`#292D29`):** High-readability body typography.
- **Subtle Border (`#DCDDD3`):** Fine hairline separators and card outlines.

### 2. Typography System
- **Display & Headings:** `Instrument Serif` (Google Fonts) — confident, academic, and editorial.
- **Body & UI Controls:** `DM Sans` (Google Fonts) — crisp, modern, and readable across dense data tables and file descriptions.
- **Code & File Paths:** `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas` — clean technical metadata representation.

### 3. Restrained Radii & Layout
- Controls and buttons: `4–6px`
- Dossier and assignment cards: `8–10px`
- Reading panels: `12–14px`
- Asymmetric two-column hero featuring authentic campus awareness drive campaign artifacts (`IMG-20260907-WA0003.jpg`).

---

## Core Technical Capabilities

1. **100% Self-Contained Static Architecture:**
   - Zero runtime database or external API dependencies.
   - Deploys instantly to **Vercel** or **Netlify Drop**.
   - All 19 course deliverables are bundled directly into `public/documents/`.
2. **Interactive In-Browser Document Viewers:**
   - **PDFs:** Full-height embedded sandbox with standalone tab view and direct download.
   - **Excel Workbooks (`.xlsx`):** SheetJS-powered ledger interface with multi-worksheet tabs (e.g. 9 sheets in the Rajasthan State Tracker, 4 sheets in LEED benchmarks) and live cell searching.
   - **Word Documents (`.docx`):** Mammoth-rendered publication typography with serverless sanitization.
   - **PowerPoint (`.pptx`):** Slide deck architecture briefs with slide count metrics and companion PDF slide deck recommendations.
   - **Posters & Images (`.jpg`, `.png`):** High-resolution responsive lightbox.
3. **Faculty Evaluator Tooling:**
   - **Catalogue Search:** Real-time query matching across titles, filenames, descriptions, and tags.
   - **6 Curated Thematic Modules:** Grouped by Rajasthan e-waste, EU WEEE benchmarking, LEED green building, E-Revive circular economy platform, foundational coursework, and campus outreach.
   - **Dual View Modes:** Grid dossier cards and publication-grade tabular catalogue.
   - **Evaluator Guide Modal:** Step-by-step verification instructions available directly from the header.

---

## Security & Hardening Guarantees

ECO-TRACK implements defense-in-depth principles appropriate for static academic portfolios:

1. **Zero Secret Exposure:**
   - No private keys, database passwords, API tokens, or personal identifiers are stored in code or repository history.
   - `.gitignore` rigorously protects local environment files (`.env*`), temporary builds (`dist/`), and caches.
2. **XSS Protection & HTML Sanitization:**
   - In-browser Word (`.docx`) previews via Mammoth are passed through a custom sanitization pipeline in [`DocumentViewerModal.tsx`](src/components/DocumentViewerModal.tsx) that strips executable script blocks, inline `on*` event handlers, and `javascript:` URI schemes.
3. **Reverse-Tabnabbing Defense:**
   - Every external link opening in a new window enforces `rel="noopener noreferrer"` to prevent window hijacking.
4. **HTTP Security Headers (`vercel.json`):**
   - `X-Content-Type-Options: nosniff` — prevents MIME-type sniffing.
   - `X-Frame-Options: SAMEORIGIN` — restricts unauthorized framing while permitting internal modal embeds.
   - `Referrer-Policy: strict-origin-when-cross-origin` — protects referrer privacy.
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()` — disables unnecessary browser hardware access.
5. **No Untrusted File Uploads:**
   - The application does not accept user-uploaded files at runtime; all parsed documents are verified static course assets bundled at build time.

---

## Verified Deliverables Manifest (19 Files)

| # | Deliverable Title | Filename | Type | Size | Thematic Module |
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

## Local Development & Build Commands

### Prerequisites
- Node.js (version 18 or higher)
- PowerShell or bash terminal

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173/` in your web browser.

### 3. Production Build & Typecheck
```bash
npm run build
```
Executes TypeScript compilation (`tsc`) followed by Vite production bundling into `dist/`.

### 4. Local Production Preview
```bash
npm run preview
```
Serves the generated `dist/` directory at `http://localhost:4173/`.

---

## Deployment Workflows

### Vercel Deployment
1. Connect the GitHub repository to [Vercel](https://vercel.com/).
2. Framework preset: `Vite`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. [`vercel.json`](vercel.json) configures SPA rewrites and production HTTP security headers.

### Netlify Drop
1. Run `npm run build`.
2. Drag and drop the `dist/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
3. [`public/_redirects`](public/_redirects) preserves client-side routing on hard refreshes.

---

## Academic Integrity
- **Original Source Integrity:** All 19 documents are unmodified original coursework files.
- **Static Delivery:** Hosted locally as static assets for permanent evaluator access.
- **Author Attribution:** Harshada Avhad (Roll 24102B0023, CMPN-B).
