# Swasthyam Ayurvedic Hospital

A responsive Ayurvedic clinic UI inspired by the information architecture of [Alok Clinic](https://www.alokclinic.com/). Original interface, copy, and branding in forest green, terracotta, warm ivory, and muted sage. No reference-site photography is used.

## Run locally

Requires Node.js 20 or newer. No dependencies or build step.

```sh
npm start
```

Open `http://127.0.0.1:4173`. Serve the `dist` directory on any static host for deployment. Run `npm run check` for JavaScript syntax validation.

## Included

- Responsive desktop, tablet, and mobile layouts
- Accessible mobile navigation and manually controlled hero slides
- Six treatment cards with category filters and detail dialogs
- One doctor introduction with a stock portrait placeholder, three readable journal articles, and FAQ accordions
- Booking preview with date and form validation, a local confirmation summary, focus management, and no data submission
- Locally bundled stock photos and fonts; no runtime asset CDN dependencies
- Reduced motion support, keyboard focus states, native modal focus containment, and skip navigation

## Demo content

The hospital is Swasthyam and the site presents one doctor. The doctor’s name, professional details, portrait, hospital location, and visiting hours still need to be supplied. The current portrait is an independent stock photo placeholder. Booking is a browser-only demo: no appointment is sent, no email is generated, and no entries are persisted. Replace sample content and integrate a real booking service before using this for an actual clinic.

## Assets

Photos are independent Unsplash placeholder assets. The reproducible source URLs are listed in `download-assets.py`. Fonts are DM Sans and DM Serif Display, downloaded from Google Fonts and served locally. Neither photos nor fonts are loaded from the reference clinic.

The deployable static output is `dist/`. This project has no build step or third-party runtime dependencies.
