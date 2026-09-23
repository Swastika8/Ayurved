/**
 * The Five Classical Panchakarma Therapies (Vamana, Virechana, Basti, Nasya, Raktamokshana),
 * preparatory stages (Purvakarma), restorative diet (Paschatkarma), and 3D visual specs.
 */

export interface PanchakarmaTherapyDetail {
  id: "vamana" | "virechana" | "basti" | "nasya" | "raktamokshana";
  name: string;
  sanskrit: string;
  meaning: string;
  targetDosha: string;
  governingOrgan: string;
  duration: string;
  hotspotCoordinates?: { top: string; left: string };
  summary: string;
  purvakarma: string;
  procedure: string[];
  paschatkarma: string;
  indications: string[];
  contraindications: string[];
  herbalMedicaments: string;
}

export interface TherapyVisualSpec {
  id: string;
  name: string;
  sanskrit: string;
  dosha: string;
  targetDhatu: string;
  srotas: string;
  image: string;
  animationType: "nasya" | "snehapan" | "swedan" | "abhyang" | "vasti" | "virechan" | "vaman";
  animationDescription: string;
  clinicalPurpose: string;
  purvakarma: string;
  pradhanakarma: string;
  paschatkarma: string;
}

export const PANCHAKARMA_THERAPIES: Record<string, PanchakarmaTherapyDetail> = {
  vamana: {
    id: "vamana",
    name: "Vamana Karma (Therapeutic Emesis)",
    sanskrit: "वमन कर्म",
    meaning: "Physiological elimination of aggravated Kapha through the upper gastric pathway",
    targetDosha: "Kapha (Primary) & Pitta (Secondary)",
    governingOrgan: "Chest, Lungs, Stomach & Upper Gastrointestinal tract",
    duration: "7 to 10 days complete protocol",
    hotspotCoordinates: { top: "34%", left: "48%" },
    summary:
      "Vamana is the premier Shodhana procedure for eradicating deep-seated Kapha disorders. When Kapha congests bronchial pathways or creates persistent metabolic lethargy, controlled emesis removes toxins before they can enter the deeper tissues.",
    purvakarma:
      "3-5 days of internal oleation (Snehapana) with gradually increasing doses of medicated ghee (Indukantha Ghrita) until stools become unctuous, followed by full-body Abhyanga and steam (Swedana) to mobilize toxins into the stomach.",
    procedure: [
      "Patient is served sweet milk or sugarcane juice to fill the stomach and cushion mucosal lining.",
      "Vaidya administers powdered Madanaphala (Randia dumetorum) and Yashtimadhu (Licorice) decoction.",
      "Controlled physiological expulsion occurs in 4 to 8 gentle bouts under constant pulse and blood pressure monitoring.",
      "Assessment of Shuddhi (purification degree) by checking mucus, bile, and Pitta clearance.",
    ],
    paschatkarma:
      "Dhumapana (medicinal herbal smoking with turmeric) to soothe vocal cords, followed by Samsarjana Krama: a strict graduated dietary diet starting from warm rice water (Manda) progressing to seasoned lentils (Yusha).",
    indications: [
      "Bronchial Asthma & chronic bronchitis",
      "Psoriasis, chronic eczema & vitiligo",
      "Metabolic sluggishness, obesity & high cholesterol",
      "Chronic allergic rhinitis & sinus congestion",
    ],
    contraindications: [
      "Severe hypertension & cardiac conditions",
      "Acute peptic ulcers or hematemesis",
      "Pregnancy, emaciation & extreme elderly fragility",
    ],
    herbalMedicaments: "Madanaphala, Yashtimadhu, Vacha, Pippali, Saindhava salt",
  },
  virechana: {
    id: "virechana",
    name: "Virechana Karma (Therapeutic Purgation)",
    sanskrit: "विरेचन कर्म",
    meaning: "Elimination of aggravated Pitta and toxic bile through the lower gastrointestinal pathway",
    targetDosha: "Pitta (Primary) & Rakta Dhatu (Blood)",
    governingOrgan: "Liver, Gallbladder, Spleen & Small Intestine",
    duration: "8 to 12 days complete protocol",
    hotspotCoordinates: { top: "45%", left: "54%" },
    summary:
      "Virechana is classical Ayurveda's most universally tolerated and effective cleansing therapy for chronic inflammatory and liver conditions. It purges toxic Pitta and metabolic heat through controlled herbal purgation.",
    purvakarma:
      "Internal intake of medicated bitter ghee (Guggulutiktaka or Mahatiktaka Ghrita) for 3-7 days, followed by two days of Abhyanga and steam to direct Pitta toxins toward the small intestine (Amashaya to Pakwashaya).",
    procedure: [
      "On the scheduled morning, patient takes warm herbal purgative (Trivrit Lehyam or Castor formulation) at approximately 8:00 AM.",
      "Controlled purgation commences within 1-2 hours, purging toxic bile, stagnant acids, and accumulated Pitta.",
      "The clinical team counts and evaluates each bout (*Vega*) to monitor hydration and therapeutic depth.",
      "The therapy concludes naturally when yellowish clear mucus appears, marking complete intestinal renewal.",
    ],
    paschatkarma:
      "Rest in a warm draft-free room. The patient follows a 3 to 7-day Samsarjana Krama liquid-to-solid diet to safely rekindle digestive fire (Agni).",
    indications: [
      "Chronic dermatitis, urticaria, acne & skin pigmentation",
      "Liver inflammation, jaundice & sluggish bile secretion",
      "Severe acid reflux (GERD), gastritis & burning ulcers",
      "Gout, hyperuricemia & burning feet syndrome",
    ],
    contraindications: [
      "Ulcerative colitis in bleeding acute phase",
      "Severe diarrhea or dysentery",
      "Acute fever or severe dehydration",
    ],
    herbalMedicaments: "Trivrit (Operculina turpethum), Haritaki, Aragvadha (Cassia fistula), Castor oil",
  },
  basti: {
    id: "basti",
    name: "Basti Karma (Medicated Herbal Enema)",
    sanskrit: "बस्ति कर्म",
    meaning: "The Supreme Master Therapy: cleansing and nourishing Vata at its primary seat (the colon)",
    targetDosha: "Vata (Governs 80+ Classical Diseases)",
    governingOrgan: "Colon, Nervous System, Spine, Bones & Joints",
    duration: "8 (Yoga Basti), 15 (Kala Basti), or 30 days (Karma Basti)",
    hotspotCoordinates: { top: "58%", left: "47%" },
    summary:
      "Charaka Samhita proclaims Basti to be 'Ardha Chikitsa' (half of all medical science). Because the large intestine is the primary biological seat of Vata dosha, introducing warm herbal decoctions and unctuous oils here rectifies neuromuscular, skeletal, and degenerative disorders throughout the entire body.",
    purvakarma:
      "Abhyanga with Dhanwantharam Taila followed by localized herbal steam over the lower back, pelvis, and abdomen to relax pelvic sphincter muscles.",
    procedure: [
      "Administered using traditional smooth cannula nozzles while patient lies in Left Lateral position.",
      "Alternates between Niruha Basti (cleansing decoction with honey, rock salt, herbal paste, and oil) and Anuvasana Basti (pure nourishing herbal oil).",
      "The oil Basti is retained for several hours, lubricating deep skeletal and neural tissues.",
      "The decoction Basti is expelled within 15 to 45 minutes, drawing out heavy metabolic Ama.",
    ],
    paschatkarma:
      "Warm herbal bath followed by nourishing, easily digestible warm rice gruel with rock salt and cow ghee.",
    indications: [
      "Osteoarthritis, rheumatoid arthritis & osteoporosis",
      "Sciatica, lumbar disc prolapse & cervical spondylosis",
      "Chronic constipation, flatulence & irritable bowel",
      "Parkinsonism, motor-neuron disorders & hemiplegia",
    ],
    contraindications: [
      "Acute rectal bleeding or active hemorrhoids",
      "Severe intestinal perforation or bowel obstruction",
      "Immediate post-operative abdominal wounds",
    ],
    herbalMedicaments: "Dashamoola decoction, Erandamoola, Sahacharadi Taila, Rock salt, Pure raw honey",
  },
  nasya: {
    id: "nasya",
    name: "Nasya Karma (Nasal Errhine Therapy)",
    sanskrit: "नस्य कर्म",
    meaning: "Administration of medicated oils into nostrils—the direct gateway to the brain and cranial senses",
    targetDosha: "Urdhva Jatrugata (All Doshas in Head, Neck, Eyes & Brain)",
    governingOrgan: "Cranial Cavity, Sinuses, Eyes, Ears & Pituitary Axis",
    duration: "7 to 14 days consecutive course",
    hotspotCoordinates: { top: "18%", left: "50%" },
    summary:
      "Classical aphorism: 'Nasa Hi Shiraso Dvaram' (The nose is the doorway to the brain). By instilling precise drops of herbalized oils through the nasal passages, Nasya clears stagnant sinus fluids, stimulates cranial nerve circulation, and balances neuro-endocrine function.",
    purvakarma:
      "Gentle face, neck, and shoulder massage (Mukha Abhyanga) followed by localized herbal steam (Nadi Swedana) directed at cheeks, forehead, and bridge of nose to open cranial micro-channels.",
    procedure: [
      "Patient reclines comfortably with neck slightly extended backward.",
      "Vaidya instills measured drops of warm medicated oil (Anu Taila or Shadbindu) into each nostril.",
      "Patient inhales smoothly, allowing the medicine to permeate the retro-pharyngeal and sinus spaces.",
      "Secretions reaching the throat are gently spat out into a spittoon; never swallowed.",
    ],
    paschatkarma:
      "Warm water gargles with rock salt, followed by soothing herbal smoke inhalation (Dhumapana) to clear residual mucus. Patient rests indoors away from cold wind.",
    indications: [
      "Chronic migraines, tension headaches & cluster headaches",
      "Chronic sinusitis, allergic rhinitis & nasal polyps",
      "Premature greying of hair and alopecia",
      "Cervical spondylosis, frozen shoulder & facial paralysis (Bell's Palsy)",
    ],
    contraindications: [
      "Immediately after food or heavy water consumption",
      "Acute coryza (heavy active running nose) with high fever",
      "Intoxication or severe bleeding nasal trauma",
    ],
    herbalMedicaments: "Anu Taila, Shadbindu Taila, Ksheerabala 101, Brahmi Ghrita",
  },
  raktamokshana: {
    id: "raktamokshana",
    name: "Raktamokshana (Blood Purification & Jalauka)",
    sanskrit: "रक्तमोक्षण कर्म (जलौकावचारण)",
    meaning: "Precise biological therapeutic blood purification using medicinal non-venomous leeches (Jalauka)",
    targetDosha: "Pitta & Rakta Dhatu (Blood Tissue)",
    governingOrgan: "Micro-capillary Beds, Skin Layers & Venous Valves",
    duration: "1 to 3 sessions scheduled at 7-day intervals",
    hotspotCoordinates: { top: "72%", left: "44%" },
    summary:
      "When toxins permeate deep into the blood plasma (*Rakta Dhatu*) causing stubborn skin pathologies or localized vascular swelling, Sushruta Samhita prescribes Raktamokshana. We specialize in painless medicinal leech therapy (Jalaukavacharana) using certified sterile laboratory-cultured leeches.",
    purvakarma:
      "Purification of the affected skin area with turmeric water. Leeches are activated in turmeric-infused water to stimulate appetite before gentle placement.",
    procedure: [
      "Medicinal leech (Hirudo medicinalis) is positioned directly over the area of venous stagnation or inflammation.",
      "The leech punctures the skin painlessly (secreting natural anesthetics and vasodilators) and extracts stagnant deoxygenated blood.",
      "The session lasts 30 to 50 minutes until the leech detaches naturally.",
      "The site is dressed with sterile antiseptic turmeric and Shatadhauta Ghrita (100-times washed ghee).",
    ],
    paschatkarma:
      "Sterile bandage dressing. The patient is advised to avoid direct sunlight, spicy food, and strenuous exercise for 24 hours.",
    indications: [
      "Varicose veins & chronic venous stasis ulcers",
      "Severe localized eczema, psoriasis plaques & stubborn acne",
      "Sciatica and localized bursitis / joint effusion",
      "Alopecia areata and thrombosed micro-vessels",
    ],
    contraindications: [
      "Hemophilia or bleeding coagulopathies",
      "Severe anemia (Hemoglobin < 8 g/dL)",
      "Active systemic sepsis or extreme cachexia",
    ],
    herbalMedicaments: "Pure Turmeric powder, Triphala Kashayam, Shatadhauta Ghrita, Jatyadi Taila",
  },
};

export const THERAPY_SPECS: TherapyVisualSpec[] = [
  {
    id: "nasya",
    name: "Nasya Chikitsa",
    sanskrit: "नासा हि शिरसो द्वारम्",
    dosha: "Kapha & Prana Vata",
    targetDhatu: "Majja (Nervous) & Shiras (Cranial)",
    srotas: "Pranavaha & Manovaha Srotas",
    image: "/media/panchakarma/nasya.jpg",
    animationType: "nasya",
    animationDescription: "Suspended medicated golden oil drop detaches and falls rhythmically into the ceramic vessel.",
    clinicalPurpose: "Nose is the gateway to the brain and consciousness. Purges deep seated toxins from cranial, sinuses, and sensory faculties.",
    purvakarma: "Facial steam with eucalyptus decoction and gentle Marma massage over temples and cheeks.",
    pradhanakarma: "Instillation of 4-8 drops of warm Anu Taila / Ksheerabala 101 into each nostril with deep inhalation.",
    paschatkarma: "Medicated smoke inhalation (Dhoomapana) and warm saline gargling (Kavala) to expel loosened Kapha.",
  },
  {
    id: "snehapan",
    name: "Snehapana (Internal Oleation)",
    sanskrit: "स्नेहो मृदुकरो देहे",
    dosha: "Vata & Pitta",
    targetDhatu: "All 7 Dhatus (Rasa through Shukra)",
    srotas: "Annavaha & Rasavaha Srotas",
    image: "/media/panchakarma/snehapan.jpg",
    animationType: "snehapan",
    animationDescription: "Undulating golden liquid level and amber light refraction within the medicinal bottle.",
    clinicalPurpose: "Progressive administration of medicated ghee to saturate cellular tissues, softening lipid-soluble metabolic toxins.",
    purvakarma: "Deepana and Pachana (enhancing digestive fire with ginger and Trikatu) for 3 days.",
    pradhanakarma: "Increasing daily dosages of warm medicated ghee (e.g. Mahatiktaka Ghrita) taken early morning on an empty stomach.",
    paschatkarma: "Sipping hot water throughout the day until digestive fire digests the ghee completely.",
  },
  {
    id: "swedan",
    name: "Swedana (Herbal Sudation)",
    sanskrit: "स्वेदघ्नो गौरवनिग्रहः",
    dosha: "Kapha & Vata",
    targetDhatu: "Mamsa (Muscle) & Meda (Fat)",
    srotas: "Swedavaha Srotas (Sweat channels)",
    image: "/media/panchakarma/swedan.jpg",
    animationType: "swedan",
    animationDescription: "Curving herbal steam plumes continuously rising from the carved ceramic dome apertures.",
    clinicalPurpose: "Dilates microscopic physiological channels (Srotas), liquifying stubborn toxins and driving them toward the gut.",
    purvakarma: "Complete full-body synchronized oil massage (Abhyanga) to protect superficial tissues.",
    pradhanakarma: "Patient rests in cedar wood steam chamber infused with Dashamoola, Nirgundi, and camphor leaves while head is kept cool.",
    paschatkarma: "Gradual cooling, warm herbal sponge bath, and resting in a wind-free sanctuary.",
  },
  {
    id: "abhyang",
    name: "Sarvanga Abhyanga",
    sanskrit: "अभ्यङ्गमाचरेन्नित्यं स जराश्रमवातहा",
    dosha: "Vata Pacification",
    targetDhatu: "Twak (Skin) & Asthi-Sandhi (Joints)",
    srotas: "Rasavaha & Asthivaha Srotas",
    image: "/media/panchakarma/abhyang.jpg",
    animationType: "abhyang",
    animationDescription: "Breathing golden prana rays and rhythmic healing aura pulsing from the golden palms around the sacred droplet.",
    clinicalPurpose: "Rhythmic synchronization massage with warm classical medicated oils along the direction of hair follicles (Anuloma).",
    purvakarma: "Selection of specific herbal oils (Mahanarayana or Dhanwantharam) calibrated to patient's pulse.",
    pradhanakarma: "Two therapists massage in tandem with 7 classical postural positions to stimulate 107 Marma points.",
    paschatkarma: "Herbal gram flour (Snana Choorna) bath to remove excess surface oil without depleting dermal moisture.",
  },
  {
    id: "vasti",
    name: "Vasti / Basti Chikitsa",
    sanskrit: "बस्तिर्वातहराणां श्रेष्ठः",
    dosha: "Vata Supreme Cure",
    targetDhatu: "Asthi (Bones), Majja (Nerves), Pakvashaya (Colon)",
    srotas: "Purishavaha & Asthivaha Srotas",
    image: "/media/panchakarma/vasti.jpg",
    animationType: "vasti",
    animationDescription: "Rhythmic golden liquid flow and warm resonance from the traditional wooden and brass Basti Netra spout.",
    clinicalPurpose: "Regarded as 'Ardha Chikitsa' (half of all Ayurvedic treatments). Eradicates 80+ chronic neurological and joint disorders.",
    purvakarma: "Local lower back and abdominal Abhyanga followed by Nadi Sweda (tubular localized steam).",
    pradhanakarma: "Administration of either oil enema (Anuvasana) or decoction enema (Niruha) using classical brass Basti Netra.",
    paschatkarma: "Resting in left lateral position, hot water bath after evacuation, and light rice gruel (Yavagu).",
  },
  {
    id: "virechan",
    name: "Virechana Karma",
    sanskrit: "विरेचनं पित्तहराणाम्",
    dosha: "Pitta Root Purge",
    targetDhatu: "Rakta (Blood) & Yakrit (Liver)",
    srotas: "Raktavaha & Purishavaha Srotas",
    image: "/media/panchakarma/virechan.jpg",
    animationType: "virechan",
    animationDescription: "Subtle continuous rotation of the golden bio-purification vortex and botanical elements.",
    clinicalPurpose: "Controlled herbal purgation designed to purge excess bile, inflamed heat, and liver toxins through the gut.",
    purvakarma: "Three to seven days of internal Snehapana with bitter medicated ghee, followed by general Abhyanga.",
    pradhanakarma: "Morning administration of Trivrit Lehyam or Castor formulation with warm herbal decoction.",
    paschatkarma: "Graduated Samsarjana Krama dietary cycle starting with clear rice water and progressing to light lentil soups.",
  },
  {
    id: "vaman",
    name: "Vamana Karma",
    sanskrit: "वमनं श्लेष्महराणाम्",
    dosha: "Kapha Root Purge",
    targetDhatu: "Kleda (Metabolic mucus) & Uras (Chest)",
    srotas: "Pranavaha & Annavaha Srotas",
    image: "/media/panchakarma/vaman.jpg",
    animationType: "vaman",
    animationDescription: "Floating botanical particles and subtle levitation of the Triphala medicinal spoon above the herbal decoction bowl.",
    clinicalPurpose: "Controlled therapeutic emesis to evacuate sticky congested Kapha from the stomach and respiratory micro-channels.",
    purvakarma: "Intensive Snehapana until digestive saturation, followed by heavy Kapha-stimulating diet the evening prior.",
    pradhanakarma: "Administration of Yashtimadhu decoction and Madanaphala powder under continuous pulse monitoring.",
    paschatkarma: "Turmeric smoke inhalation (Dhumapana), complete silence (Mouna), and strict Samsarjana Krama diet.",
  },
];

export const PANCHAKARMA_3D_OBJECTS = THERAPY_SPECS;
