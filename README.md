# Xenia CRM Frontend

Xenia CRM is a retail marketing platform designed to help marketing teams identify customer opportunities, create targeted campaigns, manage promotions, track customer engagement, and measure campaign performance.

The frontend provides a unified workspace for campaign planning, shopper management, voice outreach, attribution tracking, and marketing analytics.

---

## Features

### Shopper Management

* View and manage shopper profiles
* Customer segmentation and audience targeting
* Individual shopper journey and engagement history
* CSV import for customer onboarding

### Suggested Actions

* Identify high-potential marketing opportunities
* Customer re-engagement recommendations
* Segment-based campaign suggestions
* Explainable audience selection criteria

### Campaign Management

* Campaign planning and review workflow
* Audience selection and targeting
* Promotion selection and configuration
* Approval and dispatch process

### Campaign Content Creation

* AI-assisted marketing content generation
* Campaign message drafting
* Channel-specific content previews
* Editable campaign messaging

### Multi-Channel Campaign Previews

Preview campaign content across:

* WhatsApp
* Email
* SMS

Realistic channel previews help marketers validate communication before launch.

### Voice Campaigns

* AI-generated voice campaign scripts
* Voice advertisement generation
* Campaign approval workflow
* Active, Scheduled, and Historical Voice Campaign tracking

### Promotion Management

* Create and manage promotional campaigns
* Target by city, category, and customer segment
* Promotion validity and usage controls
* Promotion performance tracking

### Campaign Tracking & Attribution

Track campaign lifecycle events:

```text
Sent
→ Delivered
→ Opened
→ Clicked
→ Promo Applied
→ Purchased
```

Features include:

* Attribution tracking
* Customer engagement timelines
* Revenue attribution
* Conversion funnel analysis

### Reporting

* Campaign performance reporting
* Voice campaign reporting
* PDF report export
* Historical campaign analysis

---

## Technology Stack

### Frontend

* React 18
* TypeScript
* Vite
* CSS
* Lucide React

### Integrations

* FastAPI Backend
* PostgreSQL (Neon)
* Groq API
* ElevenLabs API

---

## Local Development

### Prerequisites

Ensure the Xenia CRM backend is running and accessible.

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Application URL:

```text
http://localhost:5174
```

### Production Build

```bash
npm run build
```

Production assets will be generated inside:

```text
/dist
```

---

## Deployment

### Vercel

Create a Vercel project and connect the frontend repository.

Configure the following environment variable:

```env
VITE_API_BASE_URL=<backend-api-url>
```

Deploy the application using the standard Vite build process.

---

## Project Overview

Xenia CRM was built to demonstrate a complete retail marketing workflow:

```text
Customer Data
        ↓
Audience Identification
        ↓
Campaign Planning
        ↓
Content Creation
        ↓
Campaign Approval
        ↓
Campaign Dispatch
        ↓
Customer Engagement Tracking
        ↓
Revenue Attribution
        ↓
Reporting
```

The platform combines campaign management, customer engagement tracking, promotion management, voice outreach, and attribution reporting into a single marketing workspace.
