# AyurWell Connect

# Ayurveda Hospital Website — Build Plan

A calm, paperless hospital site with three sign-in types, a disease information library, animated Panchakarma explainers, appointments with payment, reminders, and an AI Ayurveda assistant instead of video calls.

## Look and feel

Warm, grounded Ayurveda palette I'll set as the theme: deep herbal green as the primary, warm sand/ivory backgrounds, turmeric-gold accents, soft terracotta for alerts. Elegant serif headings with a clean, highly readable body face. Light and dark both supported. No purple-gradient generic look.

## Pages and features

**Public**

- Home: hospital intro, treatments, doctors, calls to action.

- Disease information: type or pick a condition and see an Ayurvedic overview — description, dosha imbalance, recommended therapies, diet and lifestyle guidance, related treatments, and a "book a consultation" link.

- Panchakarma: five therapies (Vamana, Virechana, Basti, Nasya, Raktamokshana) each with a step-by-step animated illustration of the process, plus benefits, duration, and preparation notes.

- About, contact, treatment pages.

**Patient account**

- Sign up / sign in, profile.

- Book an appointment: pick doctor, date, time slot, reason.

- Pay immediately after booking — payment happens as the final booking step, and the slot is only confirmed once payment succeeds.

- Dashboard: upcoming and past appointments, payment receipts, prescriptions and visit notes shared by the doctor, downloadable as PDF (this is the paperless part).

- Reminders: email reminders before the appointment plus a notice inside the dashboard.

- AI Ayurveda assistant: chat about symptoms, therapies and preparation instructions, with a clear note that it is guidance, not a diagnosis, and a link to book a real consultation.

**Doctor account**

- Today's and upcoming appointments, patient history.

- Write consultation notes and prescriptions that appear in the patient's records.

- Manage availability and time slots.

**Admin account**

- Manage doctors, patients and roles.

- Manage disease library entries, treatment and Panchakarma content, hospital info, timings and announcements — all editable from the admin panel, so information updates need no code changes.

- View appointments and payment records.

## Chat assistant

One ongoing conversation per patient, saved to their account so it's there when they return.

## Order of work

1. Backend setup, sign-in for the three account types, roles, and the shared layout with the new colour theme.

2. Public site: home, disease information library, Panchakarma with animations.

3. Appointments: doctor availability, booking flow, patient and doctor dashboards, records and prescriptions.

4. Payments after booking.

5. Email reminders and in-app notices.

6. AI Ayurveda assistant.

7. Admin panel for all content and information updates.

## Things I need from you along the way

- **Payments:** I'll set up payments through Lovable's built-in provider. I need to know the country your hospital is registered in, and your consultation fees per doctor or per service. Real money needs a verification step you complete yourself; until then it runs in test mode.

- **SMS / WhatsApp reminders:** these need a paid messaging service (e.g. Twilio or a WhatsApp Business provider) and an account in your name. I'll build email + in-app reminders first, then add SMS/WhatsApp once you have that account. Tell me if you already use one.

- **Real content:** doctor names and specialities, treatment descriptions, fees, hospital address, phone, hours. I'll use clearly-marked placeholder text until you send the real details — please don't publish with placeholders.

## Technical notes

- Lovable Cloud for database, auth, storage and server logic. Roles in a separate `user_roles` table with a security-definer `has_role` check; row-level security on every table so patients see only their own records and doctors only their own patients.

- Tables: profiles, user_roles, doctors, availability, appointments, payments, consultations/prescriptions, diseases, treatments, panchakarma_therapies, site_content, notifications.

- Payments via Lovable's built-in payment integration; appointment confirmed on a verified webhook, not on client redirect.

- Reminders via a scheduled job that queues due reminders and sends email; the in-app notice reads the same table.

- Panchakarma animations built with CSS/SVG and Motion — no heavy 3D.

- AI assistant via Lovable AI (default `openai/gpt-6-astra`, streamed), server-side only, with an Ayurveda system prompt and a medical-disclaimer guardrail.

- Records exported to PDF client-side.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/899471f3-4b7d-426b-8d43-7aa3ea223db0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
