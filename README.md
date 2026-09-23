# Aarogya Ayurveda Hospital Platform

A modern, paperless Ayurveda hospital management and consultation web application built with **TanStack Start**, **React 19**, **Tailwind CSS v4**, and **Supabase**.

## Features

### 🌿 Public Portal
- **Ayurvedic Disease Information Library**: Detailed conditions, dosha imbalances, recommended therapies, herbal formulations, and diet/lifestyle advice.
- **Panchakarma Explorer**: Interactive step-by-step illustrations of classical therapies (Vamana, Virechana, Basti, Nasya, Raktamokshana) with benefits and protocols.
- **Doctor Directory & Treatments**: Complete listings of doctors, qualifications, specialties, and clinical services.

### 🧘 Patient Portal
- **Appointment Booking**: Select doctor, consultation reason, date, and live available slots.
- **Patient Dashboard**: Upcoming and past visits, consultation history, and downloadable PDF prescriptions.
- **Ayurveda AI Assistant**: Symptom guidance and preparation assistance with medical disclaimer guardrails.

### 🩺 Doctor Portal
- Daily consultation schedule and appointment queues.
- Digital diagnosis, dosha assessments, therapy recommendations, and prescription creation.
- Availability and slot management.

### 🛡️ Admin Portal
- Hospital content administration (treatments, Panchakarma, disease library).
- Doctor and patient account management.
- Appointment schedules and record monitoring.

---

## Tech Stack
- **Framework**: TanStack Start (fullstack SSR with Vite)
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide React icons, Radix UI primitives
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS)
- **ORM & Migrations**: Drizzle ORM
- **Document Generation**: jsPDF client-side prescription exporter

---

## Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm or bun

### Installation
```bash
# Clone the repository
git clone https://github.com/Swastika8/Ayurved.git
cd Ayurved

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Fill in your Supabase project URL and API keys in .env

# Run development server
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```
