/**
 * Centralized navigation configuration for header, footer,
 * and mobile navigation bars.
 */

export interface NavItem {
  label: string;
  sanskritLabel?: string;
  path: string;
  description?: string;
  badge?: string;
}

export const MAIN_NAVIGATION: NavItem[] = [
  {
    label: "Home",
    path: "/",
    description: "Welcome to Aarogya Classical Sanctuary",
  },
  {
    label: "Treatments",
    sanskritLabel: "चिकित्सा",
    path: "/treatments",
    description: "Classical therapies categorized by Doshas",
  },
  {
    label: "Panchakarma",
    sanskritLabel: "पञ्चकर्म",
    path: "/panchakarma",
    badge: "5 Master Cleanses",
    description: "Deep cellular bio-purification protocols",
  },
  {
    label: "Diseases & Roganidana",
    sanskritLabel: "रोगनिदान",
    path: "/diseases",
    description: "Ayurvedic condition index and pathogenesis",
  },
  {
    label: "Wellness & Lifestyle",
    sanskritLabel: "दिनचर्या",
    path: "/wellness",
    description: "Dinacharya, Ritucharya, and 6 Rasas nutrition",
  },
  {
    label: "Sanctuary & Lineage",
    path: "/about",
    description: "Our 40-year Gurukulam lineage and physicians",
  },
  {
    label: "Journal",
    sanskritLabel: "पत्रिका",
    path: "/blog",
    description: "Vedic health monographs and case insights",
  },
  {
    label: "Gallery",
    path: "/gallery",
    description: "Immersive visual tour of hospital campuses",
  },
  {
    label: "Contact & Sanctuary",
    path: "/contact",
    description: "Kerala and Rishikesh hospital locations",
  },
];

export const FOOTER_LINKS = {
  clinical: [
    { label: "Panchakarma Protocols", path: "/panchakarma" },
    { label: "Shirodhara & Droni Chikitsa", path: "/treatments" },
    { label: "Disease Pathology Index", path: "/diseases" },
    { label: "Nadi Pariksha Pulse Reading", path: "/book" },
    { label: "Consultation Booking", path: "/book" },
  ],
  sanctuary: [
    { label: "Kerala Riverside Sanctuary", path: "/contact" },
    { label: "Rishikesh Mountain Ashram", path: "/contact" },
    { label: "Heritage Pharmacy & Oushadhi", path: "/about" },
    { label: "Campus Visual Tour", path: "/gallery" },
    { label: "Inpatient Accommodation", path: "/contact" },
  ],
  lifestyle: [
    { label: "Dinacharya Solar Clock", path: "/wellness" },
    { label: "Ritucharya Seasonal Detox", path: "/wellness" },
    { label: "Shad Rasa Nutritional Guide", path: "/wellness" },
    { label: "Ayurvedic Clinical Journal", path: "/blog" },
    { label: "Dosha-Tailored Yoga", path: "/wellness" },
  ],
  patientPortal: [
    { label: "Patient Dashboard", path: "/dashboard" },
    { label: "Digital EMR & Prescriptions", path: "/dashboard" },
    { label: "Doctor Portal", path: "/doctor" },
    { label: "Administrative Records", path: "/admin" },
  ],
};
