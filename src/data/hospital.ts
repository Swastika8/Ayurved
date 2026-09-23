/**
 * Institutional details, sanatoria, contact channels, and accreditations
 * for Aarogya Ayurveda Hospital.
 */

export interface SanctuaryLocation {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  environment: string;
  features: string[];
  opdHours: string;
  inpatientCapacity: number;
  image: string;
}

export interface HospitalConfig {
  name: string;
  sanskritName: string;
  legalEntity: string;
  tagline: string;
  mission: string;
  foundedYear: number;
  tradition: string;
  certifications: string[];
  helpline: string;
  emergencyPhone: string;
  mainEmail: string;
  telehealthEmail: string;
  sanctuaries: SanctuaryLocation[];
  socials: {
    instagram: string;
    youtube: string;
    linkedin: string;
  };
}

export const HOSPITAL_DATA: HospitalConfig = {
  name: "Aarogya Ayurveda Hospital",
  sanskritName: "आरोग्य आयुर्वेद चिकित्सालय",
  legalEntity: "Aarogya Vedic Healthcare Trust & Research Foundation",
  tagline: "Classical Shodhana Chikitsa & Lineage Ashtanga Ayurveda",
  mission: "To eradicate chronic metabolic and autoimmune pathologies at their root through authentic classical Panchakarma, individualized Nadi Pariksha, and pure bronze-fired herbal pharmacology.",
  foundedYear: 1984,
  tradition: "Ashtanga Hridaya & Sushruta Samhita Lineage (Kerala Tradition)",
  certifications: [
    "NABH Green Hospital Certified",
    "Department of AYUSH Certified Center of Excellence",
    "ISO 9001:2015 GMP Certified In-House Oushadhi Shala",
    "Clinical Research Board Accredited",
  ],
  helpline: "+91 (0) 484 290 8800",
  emergencyPhone: "+91 98470 12345",
  mainEmail: "vaidya@aarogya-hospital.org",
  telehealthEmail: "telehealth@aarogya-hospital.org",
  sanctuaries: [
    {
      id: "kerala-sanctuary",
      name: "Kerala River Valley Sanctuary",
      slug: "kerala",
      tagline: "Sub-tropical herbal groves along the holy Periyar River",
      description: "Our flagship healing haven nestled amidst 24 acres of virgin medicinal forest. Hand-carved single-trunk teakwood Droni suites with round-the-clock Vaidya residency.",
      address: {
        line1: "Aarogya Heritage Sanctuary, Riverbank Road",
        line2: "Near Aluva Shiva Temple Valley",
        city: "Kochi / Ernakulam",
        state: "Kerala",
        pincode: "683101",
        country: "India",
      },
      phone: "+91 (0) 484 290 8800",
      email: "kerala@aarogya-hospital.org",
      coordinates: { lat: 10.1076, lng: 76.3516 },
      environment: "Lush tropical rainforest microclimate, natural river breeze, virgin flora.",
      features: [
        "18 Single-Trunk Teak Droni Treatment Theatres",
        "Wood-Fired Bronze Uruli Classical Pharmacy",
        "Organic Medicinal Herbarium (650+ Species)",
        "Private Riverside Inpatient Recovery Cottages",
      ],
      opdHours: "Monday – Saturday: 7:30 AM – 6:30 PM IST",
      inpatientCapacity: 45,
      image: "/media/contact-architecture.jpg",
    },
    {
      id: "rishikesh-sanctuary",
      name: "Rishikesh Himalayan Ashram",
      slug: "rishikesh",
      tagline: "High-altitude pranic sanctuary in the Ganges foothills",
      description: "Dedicated to Rasayana longevity protocols, silent meditation retreats, and chronic respiratory / neural rehabilitation under mountain solar geometry.",
      address: {
        line1: "Ganga View Foothills, Tapovan",
        line2: "Above Lakshman Jhula Valley",
        city: "Rishikesh",
        state: "Uttarakhand",
        pincode: "249192",
        country: "India",
      },
      phone: "+91 (0) 135 244 5500",
      email: "rishikesh@aarogya-hospital.org",
      coordinates: { lat: 30.1362, lng: 78.3242 },
      environment: "High-prana pine foothills, pure spring water, Himalayan air.",
      features: [
        "High-Altitude Botanical Research Laboratory",
        "Sattvic Meditation Hall (Akhanda Shanti)",
        "Nadi Shodhana & Pranayama Shala",
        "Winter Rasayana Rejuvenation Suites",
      ],
      opdHours: "Monday – Sunday: 7:00 AM – 6:00 PM IST",
      inpatientCapacity: 30,
      image: "/media/gallery-hospital.jpg",
    },
  ],
  socials: {
    instagram: "https://instagram.com/aarogya_ayurveda",
    youtube: "https://youtube.com/@aarogya_ayurveda",
    linkedin: "https://linkedin.com/company/aarogya-hospital",
  },
};

export const SANCTUARIES = HOSPITAL_DATA.sanctuaries;
