/**
 * Classical Ayurvedic treatments catalog, categorized by Doshas (Vata, Pitta, Kapha, Tridosha).
 */

export interface ClassicalTherapyItem {
  id: string;
  name: string;
  sanskrit: string;
  dosha: "Vata" | "Pitta" | "Kapha" | "Tridosha";
  duration: string;
  price: number;
  oilsUsed: string;
  summary: string;
  description: string;
  benefits: string[];
  recommendedCourse: string;
  tagline: string;
}

export const CLASSICAL_TREATMENTS: ClassicalTherapyItem[] = [
  {
    id: "abhyanga",
    name: "Sarvanga Abhyanga",
    sanskrit: "सर्वाङ्ग अभ्यङ्ग",
    dosha: "Vata",
    duration: "60 mins",
    price: 2400,
    oilsUsed: "Warm Dhanwantharam or Mahanarayana Taila",
    tagline: "Rhythmic synchronization massage along arterial hair flow",
    summary: "Full-body synchronization massage with warm classical medicated oils using rhythmic longitudinal strokes.",
    description:
      "Administered by two trained therapists in rhythmic tandem along the direction of venous blood flow (Anuloma). The warm medicated oil penetrates deep into cutaneous pores, pacifying agitated Prana and Vyana Vata.",
    benefits: [
      "Pacifies chronic joint cracking and nervous restlessness",
      "Improves lymph drainage and cutaneous peripheral circulation",
      "Induces profound, restorative natural sleep (Nidra)",
    ],
    recommendedCourse: "3 to 7 consecutive morning sessions",
  },
  {
    id: "shirodhara",
    name: "Shirodhara (Herbal Stream)",
    sanskrit: "शिरोधारा",
    dosha: "Vata",
    duration: "45 mins",
    price: 3200,
    oilsUsed: "Brahmi Taila, Ksheerabala 101, or Chandanadi",
    tagline: "Hypnotic oscillation of warm herbal oil over the third eye",
    summary: "Continuous, hypnotic oscillation of warm herbal oil or medicated milk over the forehead and third eye.",
    description:
      "A steady stream of warm herbal oil flows from an oscillating copper vessel suspended above the Ajna Marma. Stimulates the cranial nerves, dampening sympathetic fight-or-flight overstimulation and replenishing cerebral neurotransmitters.",
    benefits: [
      "Deep clinical relief from chronic insomnia and anxiety",
      "Relieves persistent tension headaches and vascular migraines",
      "Soothes sensory organ exhaustion and computer fatigue",
    ],
    recommendedCourse: "7 to 14 days course",
  },
  {
    id: "janu-basti",
    name: "Janu Basti (Knee Reservoir)",
    sanskrit: "जानु बस्ति",
    dosha: "Vata",
    duration: "45 mins",
    price: 2200,
    oilsUsed: "Murivenna & Kottamchukkadi Taila",
    tagline: "Warm anti-inflammatory herbal oil pool over knee joints",
    summary: "Ring of black gram dough sealed over the knee joints holding warm anti-inflammatory herbal oil.",
    description:
      "A therapeutic reservoir formed from herbal dough retains warm medicated oils over the patellar joint. Continually replenished at constant therapeutic temperature to deeply lubricate eroded cartilage and restore synovial fluid.",
    benefits: [
      "Reduces chronic osteoarthritis crepitus (crackling)",
      "Strengthens knee ligaments, tendons, and patellar stability",
      "Dramatically eases morning stiffness when walking or climbing stairs",
    ],
    recommendedCourse: "5 to 9 sessions with herbal poultice",
  },
  {
    id: "pizhichil",
    name: "Pizhichil (Royal Oil Bath)",
    sanskrit: "पिऴिच्चिल् (तैलाभिषेक)",
    dosha: "Vata",
    duration: "75 mins",
    price: 4500,
    oilsUsed: "Medicated Sahacharadi & Bala Taila (approx. 4 litres)",
    tagline: "The celebrated King of Ayurvedic therapies: warm oil cascades",
    summary: "The celebrated King of Ayurvedic therapies: continuous streams of warm medicated oil squeezed across the body.",
    description:
      "Two to four therapists dip fresh linen cloths into cauldrons of heated medicated herbal oil, gently squeezing continuous warm cascades over the entire body while synchronously massaging the muscles.",
    benefits: [
      "Extraordinary rejuvenation for paralytic and hemiplegic conditions",
      "Reverses degenerative disc disorders and chronic sciatica",
      "Arrests premature physical aging and restores muscle tone",
    ],
    recommendedCourse: "7, 14, or 21 days residential stay",
  },
  {
    id: "takradhara",
    name: "Takradhara (Cooling Buttermilk)",
    sanskrit: "तक्रधारा",
    dosha: "Pitta",
    duration: "50 mins",
    price: 2800,
    oilsUsed: "Medicated A2 buttermilk infused with Musta & Amalaki",
    tagline: "Medicated buttermilk streaming across the forehead",
    summary: "Cooling stream of medicated herbal buttermilk poured continuously across the forehead.",
    description:
      "Prepared by boiling medicinal roots (Cyperus rotundus) in herbal decoctions and blending with cultured cow buttermilk. Specifically cools inflamed Pitta in the brain, pituitary axis, and cutaneous micro-vessels.",
    benefits: [
      "Superior therapy for psoriasis, alopecia, and stress eczema",
      "Relieves burning eyes, high blood pressure, and chronic irritability",
      "Deeply cools hot, hyperactive mental states",
    ],
    recommendedCourse: "7 to 11 consecutive days",
  },
  {
    id: "netra-tarpana",
    name: "Netra Tarpana (Eye Rejuvenation)",
    sanskrit: "नेत्र तर्पण",
    dosha: "Pitta",
    duration: "40 mins",
    price: 1800,
    oilsUsed: "Maha Triphala Ghrita (Medicated Ghee)",
    tagline: "Warm medicinal ghee bath over ocular orbits",
    summary: "Gentle eye bath retaining pure warm medicated ghee within herbal dough walls over the ocular orbits.",
    description:
      "Patients open and blink their eyes within pure, golden herbal ghee. Deeply nourishes the optic nerves, cools retinal inflammation, and pacifies Alochaka Pitta irritated by excessive blue-light exposure.",
    benefits: [
      "Relieves dry eye syndrome, digital eye strain, and burning",
      "Strengthens optic nerve pathways and improves focal clarity",
      "Slows early age-related retinal degenerative changes",
    ],
    recommendedCourse: "3 to 5 treatments with intervals",
  },
  {
    id: "udvartana",
    name: "Udvartana (Dry Herbal Scrub)",
    sanskrit: "उद्वर्तन",
    dosha: "Kapha",
    duration: "50 mins",
    price: 2600,
    oilsUsed: "Kolatekulathadi & Triphala Churna (Dry herbal powders)",
    tagline: "Vigorous upward lymphatic massage with coarse astringent herbs",
    summary: "Vigorous upward lymphatic massage using warm dry medicinal powders to liquefy subcutaneous fat.",
    description:
      "Therapists rub coarse, astringent herbal powders firmly upwards against hair follicles (Pratiloma). Generates internal thermal friction, opens blocked lymphatic ducts, and mobilizes dense subcutaneous Kapha.",
    benefits: [
      "Assists in healthy weight management and cellulite reduction",
      "Exfoliates dead skin cells, giving the skin a healthy golden glow",
      "Dispels physical lethargy and restores metabolic lightness (Laghavam)",
    ],
    recommendedCourse: "7 to 14 sessions alongside diet",
  },
  {
    id: "elakizhi",
    name: "Elakizhi (Leaf Bolus Swedana)",
    sanskrit: "इलय्किऴि (पत्रपिण्ड स्वेद)",
    dosha: "Kapha",
    duration: "60 mins",
    price: 2800,
    oilsUsed: "Castor, Tamarind & Nirgundi leaves fried in herbal oil",
    tagline: "Warm herbal linen pouches tapped rhythmically over joints",
    summary: "Heated herbal linen pouches packed with fresh medicinal leaves tapped rhythmically over stiff joints.",
    description:
      "Freshly chopped medicinal leaves (Arka, Nirgundi, Eranda) are sauteed with rock salt, garlic, and medicated oils in bronze woks, tied into tight linen boluses, and applied rhythmically to sweat out deep inflammatory toxins.",
    benefits: [
      "Outstanding relief from lumbar spondylosis and frozen shoulder",
      "Reduces painful swellings, muscle spasms, and sports injuries",
      "Induces therapeutic sweating without drying the skin",
    ],
    recommendedCourse: "5 to 7 days course",
  },
  {
    id: "navarakizhi",
    name: "Navarakizhi (Shashtika Shali Sweda)",
    sanskrit: "षष्टिकशालि पिण्डस्वेद",
    dosha: "Tridosha",
    duration: "60 mins",
    price: 3600,
    oilsUsed: "Sacred 60-day red rice cooked in Balarishta & cow milk",
    tagline: "Nourishing boluses of medicinal red rice cooked in milk",
    summary: "Nourishing boluses of medicinal red rice cooked in milk massaged over the body to rebuild depleted muscle.",
    description:
      "A prestigious classical rejuvenation therapy (*Brimhana*). Organic Shashtika rice is simmered in concentrated Sida cordifolia (Bala) roots and cow milk. The warm poultices infuse rich nutrients directly into muscle tissue.",
    benefits: [
      "Rehabilitates muscle wasting, dystrophy, and post-viral debility",
      "Enhances skin luminosity, elasticity, and tissue tone",
      "Deeply balances all three doshas and fortifies Ojas",
    ],
    recommendedCourse: "7 to 14 days rejuvenation",
  },
];

export const DOSHA_METADATA = {
  Vata: {
    title: "Vata Pacifying Therapies (Air & Ether)",
    desc: "For ailments driven by dryness, coldness, crackling joints, restlessness, or nervous exhaustion. Characterized by warm, deep unctuous herbal oils.",
    badge: "bg-primary/10 text-primary border-primary/20",
    color: "from-emerald-950/20 via-card to-background",
  },
  Pitta: {
    title: "Pitta Pacifying Therapies (Fire & Water)",
    desc: "For inflammation, hyper-acidity, skin rashes, burning sensations, and intense irritability. Characterized by cooling herbs, ghee, and buttermilk.",
    badge: "bg-accent/20 text-accent-foreground border-accent/30",
    color: "from-amber-950/20 via-card to-background",
  },
  Kapha: {
    title: "Kapha Pacifying Therapies (Water & Earth)",
    desc: "For sluggish metabolism, fluid retention, heavy sinuses, weight gain, and joint stiffness. Characterized by stimulating herbal powders and leaf steam.",
    badge: "bg-destructive/10 text-destructive border-destructive/20",
    color: "from-stone-900/20 via-card to-background",
  },
  Tridosha: {
    title: "Tridosha Balancing & Rejuvenation (Rasayana)",
    desc: "Comprehensive therapies tailored to harmonize all three constitutional elements and fortify bodily vitality (Ojas).",
    badge: "bg-secondary text-foreground border-border",
    color: "from-primary/10 via-card to-background",
  },
};
