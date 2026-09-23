/**
 * Curated hospital sanctuary photography, healing suites, and architecture.
 */

export interface GalleryPhoto {
  id: string;
  title: string;
  sanskritSubtitle: string;
  category: "Sanctuary Architecture" | "Panchakarma Theatres" | "Herbal Herbarium" | "Living Environment";
  description: string;
  image: string;
  location: "Kerala" | "Rishikesh";
  span?: "tall" | "wide" | "normal";
}

export const SANCTUARY_GALLERY: GalleryPhoto[] = [
  {
    id: "hospital-exterior",
    title: "Sacred Riverfront Courtyard",
    sanskritSubtitle: "औषध वन एवं शान्ति कुटीर",
    category: "Sanctuary Architecture",
    description: "Traditional Kerala Vastu architecture with clay-tiled courtyards, teakwood pillars, and cool natural river breeze along the Periyar valley.",
    image: "/media/contact-architecture.jpg",
    location: "Kerala",
    span: "wide",
  },
  {
    id: "droni-theatre",
    title: "Single-Trunk Teak Droni Suite",
    sanskritSubtitle: "काष्ठ द्रोणी चिकित्सा मण्डप",
    category: "Panchakarma Theatres",
    description: "Carved from single centenarian teak logs, seasoned with medicinal sesame oil over six months to ensure therapeutic purity during Abhyanga.",
    image: "/media/wellness-scene.jpg",
    location: "Kerala",
    span: "tall",
  },
  {
    id: "himalayan-ashram",
    title: "Himalayan Foothills Sanctuary",
    sanskritSubtitle: "तपोवन हिमालय आश्रम",
    category: "Living Environment",
    description: "Our high-altitude retreat in Rishikesh overlooking the sacred Ganges, where patient suites are oriented for optimal solar dawn absorption.",
    image: "/media/gallery-hospital.jpg",
    location: "Rishikesh",
    span: "normal",
  },
  {
    id: "apothecary-desk",
    title: "Vaidya Pulse Diagnosis Desk",
    sanskritSubtitle: "नाड़ी परीक्षा एवं ग्रन्थ पीठ",
    category: "Living Environment",
    description: "Hand-crafted rosewood consultation desk where pulse velocities are recorded alongside classical palm-leaf manuscripts.",
    image: "/media/appointment.jpg",
    location: "Kerala",
    span: "normal",
  },
  {
    id: "panchakarma-sanctum",
    title: "Classical Bronze Shirodhara Urulis",
    sanskritSubtitle: "पञ्चकर्म ओषध भाण्ड",
    category: "Panchakarma Theatres",
    description: "Hand-hammered bell metal vessels and copper oil streams calibrated for steady, laminar therapeutic flow.",
    image: "/media/panchakarma-objects.jpg",
    location: "Kerala",
    span: "wide",
  },
  {
    id: "study-manuscripts",
    title: "Vaidya Herbarium & Research Library",
    sanskritSubtitle: "विद्या पीठ एवं ग्रन्थालय",
    category: "Herbal Herbarium",
    description: "Preserving authentic palm-leaf commentaries on Charaka and Sushruta Samhitas, alongside dried botanical specimens.",
    image: "/media/blog-animation.jpg",
    location: "Kerala",
    span: "normal",
  },
];
