# Xenia CRM – Marketing Growth OS Frontend

Xenia CRM is an enterprise-grade retail customer relationship management (CRM) client designed for marketing teams. This frontend application provides a sleek, high-fidelity marketing control panel with smart campaign execution, real-time channel previews, and live attribution analytics.

## 🚀 Key Features

* **Zoho Campaigns Style Landing Page:** Sleek, professional enterprise landing page featuring robust typography scale, custom grid layouts, and Zoho-inspired color palette.
* **Dynamic Scroll-Reveal Effects:** Smooth scroll-driven section transitions powered by a React `IntersectionObserver` for clean entry fades.
* **Nightly Shopper Analytics Flowchart:** Interactive SVG + CSS flowchart mapping the automated shopper metrics and campaigns pipeline (Shopper Data ➔ Nightly Analysis ➔ Actions ➔ Campaigns ➔ Dispatch ➔ Tracking ➔ Attribution) with animated marching-pulse dashed connector lines.
* **Brand Logo & Favicon Integration:** Official Valeria cross-mark brand logo integrated across the landing page navigation, footer, CRM application sidebar, and browser tab favicon.
* **Chatbase.io Chatbot Assistant:** Embedded chatbot assistant on the bottom-right corner of the landing page, with automatic iframe cleanup on CRM dashboard transition to prevent interface clutter.
* **Suggested Actions Board:** Surface intelligence recommendations for customer segments (e.g. Bring Back VIP Shoppers, Inactive Customer Recovery Program).
* **Campaign Planner Workspace:** A detailed planning wizard to generate, refine, and edit target campaigns.
* **Premium Channel Previews:** Realistic, side-by-side previews of marketing copy:
  - **WhatsApp:** Styled phone mockup with verification check, live online status indicator, custom interactive banner, promo code coupon ticket, and CTA buttons.
  - **Gmail:** Inbox mockup showing sender info, Subject/Inbox lines, and structured brand newsletter layout.
  - **SMS:** standard carrier message bubble thread with highlighted interactive links.
* **Attribution Webhook Sandbox & Timeline:** Simulates terminal lifecycle handshakes (Sent ➔ Delivered ➔ Opened ➔ Clicked ➔ Promo Applied ➔ Purchased) with actual database order metrics and a detailed status timeline track.
* **Promotion Configuration Center:** Redesigned promotions panel with multi-select filter dropdowns (Cities, Categories, Segments), priority toggles, and validity summaries.
* **Attribution Conversion Funnel:** Real-time analytics charts and flow conversion rates.

---

## 🛠️ Tech Stack

* **Core:** React 18, TypeScript
* **Build Tool:** Vite
* **Styling:** Vanilla CSS (curated HSL palettes, glassmorphism, responsive dashboard grid)
* **Icons:** Lucide React & Flaticon vector assets

---

## 📦 How to Run Locally

### 1. Prerequisite
Ensure the Xenia CRM backend is running on `http://localhost:8000` to feed live shopper segment metrics.

### 2. Install Dependencies
Navigate to the frontend directory and install the packages:
```bash
npm install
```

### 3. Start Development Server
Launch the local dev server:
```bash
npm run dev
```
Open `http://localhost:5174` in your browser.

### 4. Build for Production
To bundle the static assets:
```bash
npm run build
```
The production-ready assets will be generated in the `/dist` directory.
