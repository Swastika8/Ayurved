/**
 * Senior Vaidyas, pulse diagnosticians, and clinical specialists.
 */

export interface DoctorProfile {
  id: string;
  name: string;
  sanskritTitle: string;
  speciality: string;
  qualifications: string;
  yearsExperience: number;
  consultationFee: number;
  sanctuaryId: "kerala" | "rishikesh" | "both";
  bio: string;
  clinicalExpertise: string[];
  opdSchedule: string;
  languages: string[];
  image: string;
}

export const DOCTORS_ROSTER: DoctorProfile[] = [
  {
    id: "dr-ks-namboodiri",
    name: "Dr. K. S. Namboodiri, BAMS, MD (Ayu)",
    sanskritTitle: "मुख्य वैद्य एवं नाड़ी परीक्षा विशेषज्ञ",
    speciality: "Chief Vaidya & Nadi Pariksha Specialist",
    qualifications: "BAMS, MD (Ayurveda), Senior Pulse Diagnostician",
    yearsExperience: 28,
    consultationFee: 1200,
    sanctuaryId: "kerala",
    bio: "Lineage pulse diagnostician with over 28 years of clinical practice restoring Tridosha equilibrium, chronic metabolic harmony, and digestive health.",
    clinicalExpertise: [
      "Eight-Fold Pulse Reading (Ashtavidha Pariksha)",
      "Autoimmune & Metabolic Disorders",
      "Panchakarma Protocol Supervision",
      "Rasayana Longevity Therapeutics",
    ],
    opdSchedule: "Mon, Wed, Fri: 8:00 AM – 2:00 PM IST",
    languages: ["Malayalam", "English", "Sanskrit", "Hindi"],
    image: "/media/gallery-hospital.jpg",
  },
  {
    id: "dr-ananya-varma",
    name: "Dr. Ananya Varma, BAMS",
    sanskritTitle: "स्त्रीरोग एवं शोधन विशेषज्ञ",
    speciality: "Classical Panchakarma & Stree Roga (Women's Health)",
    qualifications: "BAMS, Fellow in Classical Shodhana (Kerala)",
    yearsExperience: 16,
    consultationFee: 950,
    sanctuaryId: "kerala",
    bio: "Specializing in gentle classical detoxification, hormonal rebalancing, post-partum restoration, and autoimmune skin equilibrium.",
    clinicalExpertise: [
      "PCOS / PCOD & Menstrual Disorders",
      "Post-Partum Rejuvenation (Sutika Paricharya)",
      "Virechana & Blood Cleansing (Raktamokshana)",
      "Hormonal Thyroid Equilibrium",
    ],
    opdSchedule: "Tue, Thu, Sat: 9:00 AM – 3:30 PM IST",
    languages: ["English", "Hindi", "Malayalam"],
    image: "/media/wellness-scene.jpg",
  },
  {
    id: "dr-madhavan-kutty",
    name: "Dr. Madhavan Kutty, BAMS",
    sanskritTitle: "अस्थि-सन्धि एवं मर्म चिकित्सा विशेषज्ञ",
    speciality: "Spine, Joint & Marma Therapy (Asthi-Sandhi)",
    qualifications: "BAMS, Traditional Kalari Marma Expert",
    yearsExperience: 22,
    consultationFee: 1000,
    sanctuaryId: "rishikesh",
    bio: "Pioneer in non-surgical chronic spine relief, sciatica alleviation, cervical spondylosis, and classical Janu Basti treatment protocols.",
    clinicalExpertise: [
      "Sciatica & Lumbar Disc Disorders",
      "Osteoarthritis & Rheumatoid Arthritis",
      "107 Vital Energy Points (Marma Chikitsa)",
      "Cervical Spondylosis Rehabilitation",
    ],
    opdSchedule: "Mon – Sat: 8:30 AM – 1:30 PM IST",
    languages: ["English", "Hindi", "Malayalam", "Tamil"],
    image: "/media/contact-architecture.jpg",
  },
  {
    id: "dr-rajeshwar-iyer",
    name: "Dr. Rajeshwar Iyer, BAMS, Ph.D.",
    sanskritTitle: "द्रव्यगुण एवं रसशास्त्र अनुसंधान विशेषज्ञ",
    speciality: "Classical Rasashastra & Herbology Research",
    qualifications: "BAMS, Ph.D. in Ayurvedic Pharmacology",
    yearsExperience: 19,
    consultationFee: 850,
    sanctuaryId: "both",
    bio: "Leading specialist in botanical immuno-modulators (Rasayanas), autoimmune skin conditions (Kushta Roga), and preventative pediatric immunity.",
    clinicalExpertise: [
      "Classical Herbology (Dravyaguna Vijnana)",
      "Psoriasis & Chronic Dermatitis",
      "Heavy Metal Detoxification",
      "Cellular Rejuvenation Formulations",
    ],
    opdSchedule: "Wed, Thu, Fri: 11:00 AM – 5:00 PM IST",
    languages: ["English", "Tamil", "Hindi", "Sanskrit"],
    image: "/media/appointment.jpg",
  },
];
