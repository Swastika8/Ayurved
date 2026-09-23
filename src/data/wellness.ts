/**
 * Dinacharya (Daily Routine), Ritucharya (Seasonal Detox),
 * Shad Rasa (6 Tastes), Viruddha Ahara (Incompatible Foods), and Yoga.
 */

export interface DailyRhythmPhase {
  time: string;
  sanskrit: string;
  title: string;
  action: string;
  desc: string;
  doshaInfluence: string;
}

export interface SeasonalRitucharya {
  id: "vasanta" | "grishma" | "varsha" | "sharad" | "hemanta";
  name: string;
  months: string;
  sanskritSeason: string;
  doshaAggravated: string;
  description: string;
  diet: string;
  lifestyle: string;
  recommendedTherapy: string;
}

export interface TasteRasas {
  name: string;
  sanskrit: string;
  elements: string;
  action: string;
  sources: string;
  doshaEffect: string;
}

export const DAILY_DINACHARYA: DailyRhythmPhase[] = [
  {
    time: "4:30 AM – 6:00 AM",
    sanskrit: "Brahma Muhurta & Ushapan",
    title: "Awakening & Pure Hydration",
    action: "Rise in pre-dawn silence, drink warm water from copper vessel",
    desc: "Rise during the tranquil pre-dawn hours when Sattva is pure. Drink a copper vessel glass of warm water to gently awaken intestinal peristalsis.",
    doshaInfluence: "Vata Dominance (Clarity & Elimination)",
  },
  {
    time: "6:00 AM – 7:00 AM",
    sanskrit: "Danta Dhavana & Jihwa Nirlekhana",
    title: "Oral Cleansing & Sensory Awakening",
    action: "Scrape tongue with copper scraper, oil pulling (Gandusha)",
    desc: "Cleanse teeth with astringent herbal powders (Neem/Babool) and scrape the tongue with a copper scraper to remove overnight toxic coating (Ama).",
    doshaInfluence: "Kapha Transition (Sensory clearance)",
  },
  {
    time: "7:00 AM – 7:45 AM",
    sanskrit: "Abhyanga & Swedana",
    title: "Self-Oil Anointing & Warm Bath",
    action: "Warm sesame oil over joints and soles, warm herbal shower",
    desc: "Warm unrefined black sesame oil or tailored herbal oil massaged vigorously over scalp, ears, soles, and body to lubricate joints and pacify Vata.",
    doshaInfluence: "Vata Pacification (Nerve protection)",
  },
  {
    time: "8:00 AM – 9:00 AM",
    sanskrit: "Pranayama & Sattvic Ahara",
    title: "Breath Regulation & Light Breakfast",
    action: "15 minutes Nadi Shodhana, warm spiced stewed apples",
    desc: "Practice 15 minutes of alternate nostril breathing (Nadi Shodhana) followed by warm stewed apples or wholesome spiced kitchari.",
    doshaInfluence: "Prana Vata & Agni Ignition",
  },
  {
    time: "12:00 PM – 1:30 PM",
    sanskrit: "Pradhana Ahara",
    title: "Principal Midday Meal",
    action: "Complete 6-taste meal when solar fire is peak",
    desc: "Eat your largest, most nourishing meal when the sun is highest and digestive fire (Pachaka Agni) is peak. Sit calmly without digital screens.",
    doshaInfluence: "Pitta Dominance (Peak Metabolic Fire)",
  },
  {
    time: "9:30 PM – 10:00 PM",
    sanskrit: "Nidra Vidhi",
    title: "Restorative Sleep Routine",
    action: "Pada Abhyanga (foot massage), warm spiced milk with nutmeg",
    desc: "Gently massage soles with warm Brahmi or sesame oil (Pada Abhyanga). Sip warm spiced milk with nutmeg to ensure uninterrupted cellular rejuvenation.",
    doshaInfluence: "Kapha Induction (Cellular repair)",
  },
];

export const SEASONAL_RITUCHARYA: Record<string, SeasonalRitucharya> = {
  vasanta: {
    id: "vasanta",
    name: "Vasanta (Spring Season)",
    months: "Mid-March – Mid-May",
    sanskritSeason: "वसन्तः (कफ विलयन कालः)",
    doshaAggravated: "Kapha Liquefaction",
    description: "As the sun warms the earth, accumulated winter Kapha melts within the body, triggering seasonal allergies, sluggish digestion, and respiratory heaviness.",
    diet: "Favour light, dry, warm foods. Incorporate honey, barley, ginger, and roasted grains. Strictly avoid heavy curd, sweets, and midday sleep.",
    lifestyle: "Undergo Vamana or herbal steam therapy. Practice vigorous Surya Namaskar and dry powder Udvartana body brushing.",
    recommendedTherapy: "Vamana Karma & Udvartana",
  },
  grishma: {
    id: "grishma",
    name: "Grishma (Summer Season)",
    months: "Mid-May – Mid-July",
    sanskritSeason: "ग्रीष्मः (पित्त सञ्चयः, वात प्रकोपः)",
    doshaAggravated: "Pitta Aggravation & Vata Depletion",
    description: "Intense solar rays draw moisture from flora and fauna. Bodily strength is naturally lowest, and digestive fire weakens.",
    diet: "Favour naturally cooling sweet, light, liquid foods. Drink coconut water, sattu, cooling buttermilk, and milk with cardamom.",
    lifestyle: "Wear cooling white cotton or silk, avoid midday exertion, practice Sheetali pranayama, and take moonlit strolls.",
    recommendedTherapy: "Takradhara & Chandana Lepam",
  },
  varsha: {
    id: "varsha",
    name: "Varsha (Monsoon Season)",
    months: "Mid-July – Mid-September",
    sanskritSeason: "वर्षा (वात प्रकोपः, अग्नि मन्दता)",
    doshaAggravated: "Vata Aggravation & Damp Agni",
    description: "Heavy rain clouds and wet earth extinguish internal digestive fire (Agni), causing widespread joint stiffness and digestive sluggishness.",
    diet: "Favour easily digestible, warm cooked meals with light oils. Consume warm ginger decoctions and aged grains.",
    lifestyle: "Ideal period for classical Panchakarma cleansing (Karkidaka Chikitsa). Protect feet from dampness.",
    recommendedTherapy: "Karkidaka Chikitsa & Basti",
  },
  sharad: {
    id: "sharad",
    name: "Sharad (Autumn Season)",
    months: "Mid-September – Mid-November",
    sanskritSeason: "शरद् (पित्त प्रकोप कालः)",
    doshaAggravated: "Pitta Flare-up",
    description: "Sudden intense sunshine following heavy rains heats the body, causing sudden flare-ups of acid reflux, skin eruptions, and anger.",
    diet: "Favour sweet, bitter, and astringent tastes. Use pure cow ghee, bitter gourd, green gram, and Indian gooseberry (Amla).",
    lifestyle: "Therapeutic Virechana (purgation) and Raktamokshana are classical autumn treatments. Avoid direct sun and daytime naps.",
    recommendedTherapy: "Virechana Karma & Raktamokshana",
  },
  hemanta: {
    id: "hemanta",
    name: "Hemanta & Shishira (Winter Season)",
    months: "Mid-November – Mid-March",
    sanskritSeason: "हेमन्तः एवं शिशिरः (अग्नि दीप्तिः)",
    doshaAggravated: "Strong Digestive Agni & Vata Vulnerability",
    description: "Cold ambient winds close skin pores, confining digestive heat internally. Digestion is at its peak power.",
    diet: "Nutritious, substantial meals are celebrated: sesame seeds, warm almond milk, black gram, root vegetables, and herbal lehyams.",
    lifestyle: "Daily morning warm sesame oil Abhyanga followed by herbal warm water baths. Sunbathe during gentle morning hours.",
    recommendedTherapy: "Navarakizhi & Pizhichil Rejuvenation",
  },
};

export const SIX_TASTES: TasteRasas[] = [
  {
    name: "Madhura (Sweet)",
    sanskrit: "मधुर रस",
    elements: "Earth + Water",
    action: "Nourishes all 7 tissues (Dhatus), increases Ojas, pacifies Vata & Pitta.",
    sources: "Naturally sweet grains, basmati rice, milk, dates, pure ghee.",
    doshaEffect: "↓ Vata, ↓ Pitta, ↑ Kapha",
  },
  {
    name: "Amla (Sour)",
    sanskrit: "अम्ल रस",
    elements: "Earth + Fire",
    action: "Stimulates sluggish appetite, enhances digestive enzymes, pacifies Vata.",
    sources: "Amalaki (Amla), lemon, pomegranate, fermented buttermilk.",
    doshaEffect: "↓ Vata, ↑ Pitta, ↑ Kapha",
  },
  {
    name: "Lavana (Salty)",
    sanskrit: "लवण रस",
    elements: "Water + Fire",
    action: "Maintains electrolyte balance, clears blockages, pacifies Vata.",
    sources: "Saindhava Lavana (Pure Himalayan pink rock salt).",
    doshaEffect: "↓ Vata, ↑ Pitta, ↑ Kapha",
  },
  {
    name: "Katu (Pungent)",
    sanskrit: "कटु रस",
    elements: "Fire + Air",
    action: "Clears mucus channels, burns Ama toxins, pacifies heavy Kapha.",
    sources: "Black pepper, fresh ginger, pippali, mustard seeds, cumin.",
    doshaEffect: "↑ Vata, ↑ Pitta, ↓ Kapha",
  },
  {
    name: "Tikta (Bitter)",
    sanskrit: "तिक्त रस",
    elements: "Air + Ether",
    action: "Master blood purifier, cleanses liver, reduces inflammation, pacifies Pitta.",
    sources: "Turmeric, neem, bitter gourd, dandelion, fenugreek.",
    doshaEffect: "↑ Vata, ↓ Pitta, ↓ Kapha",
  },
  {
    name: "Kashaya (Astringent)",
    sanskrit: "कषाय रस",
    elements: "Air + Earth",
    action: "Heals mucous membranes, tightens tissues, pacifies Pitta & Kapha.",
    sources: "Triphala, green tea, raw bananas, honey, lentils.",
    doshaEffect: "↑ Vata, ↓ Pitta, ↓ Kapha",
  },
];

export interface IncompatibleFood {
  combination: string;
  reason: string;
  hazard: string;
}

export const VIRUDDHA_AHARA: IncompatibleFood[] = [
  {
    combination: "Milk + Sour Citrus / Fruits",
    reason: "Curdles in the stomach, producing toxic acid fermentation",
    hazard: "Skin flare-ups (Eczema), hyperacidity, toxic Ama",
  },
  {
    combination: "Honey + Heated Equal Ratio Ghee",
    reason: "Heating honey alters molecular density, producing toxic chemical metabolites",
    hazard: "Cellular clogging, irreversible free-radical formation",
  },
  {
    combination: "Fish + Whole Milk",
    reason: "Extreme potency conflict (Fish is heating; Milk is cooling)",
    hazard: "Severe blood vitiation (Rakta Dushti) & leukoderma",
  },
  {
    combination: "Nightshades (Tomato) + Yogurt",
    reason: "Fermentative antagonism in the small intestine",
    hazard: "Arthritic flare-ups, lymphatic congestion",
  },
];

export interface DoshaYoga {
  dosha: "Vata" | "Pitta" | "Kapha";
  focus: string;
  recommendedAsanas: string[];
  pranayama: string;
  pacing: string;
}

export const DOSHA_YOGA: DoshaYoga[] = [
  {
    dosha: "Vata",
    focus: "Grounding, Pelvic Stability & Warming Presence",
    recommendedAsanas: ["Vrikshasana (Tree Pose)", "Paschimottanasana", "Balasana", "Supta Baddha Konasana"],
    pranayama: "Nadi Shodhana (Alternate Nostril) with gentle retention",
    pacing: "Slow, mindful, holding poses in steady warmth without rush",
  },
  {
    dosha: "Pitta",
    focus: "Cooling, Heart-Opening & Surrender",
    recommendedAsanas: ["Chandra Namaskar (Moon Salutation)", "Bhujangasana", "Matsyasana", "Setu Bandhasana"],
    pranayama: "Sheetali & Sheetkari (Cooling Breath)",
    pacing: "Moderate rhythm with non-competitive, relaxed exhalations",
  },
  {
    dosha: "Kapha",
    focus: "Invigorating, Chest Expansion & Metabolic Heat",
    recommendedAsanas: ["Surya Namaskar (Sun Salutations - 12 rounds)", "Virabhadrasana", "Dhanurasana", "Ustrasana"],
    pranayama: "Bhastrika (Bellows Breath) & Kapalabhati",
    pacing: "Dynamic, vigorous flow to stimulate lymphatic drainage and sweat",
  },
];
