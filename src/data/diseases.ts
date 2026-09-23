/**
 * Classical Roganidana conditions, dosha vitiations, root causes, symptoms, and therapies.
 */

export interface AyurvedicDiseaseModel {
  id: string;
  slug: string;
  name: string;
  sanskritName: string;
  category: string;
  dosha: "Vata" | "Pitta" | "Kapha" | "Vata-Pitta" | "Vata-Kapha" | "Pitta-Kapha" | "Tridosha";
  symptoms: string[];
  rootCause: string;
  herbs: string[];
  therapies: string[];
  dietaryTip: string;
  description: string;
}

export const AYURVEDIC_DISEASE_DB: AyurvedicDiseaseModel[] = [
  {
    id: "arthritis",
    slug: "arthritis",
    name: "Osteo & Rheumatoid Arthritis",
    sanskritName: "Sandhivata & Amavata",
    category: "Joints & Musculoskeletal",
    dosha: "Vata",
    symptoms: ["Joint pain", "Morning stiffness", "Swelling", "Crackling joints", "Fatigue"],
    rootCause: "Accumulation of metabolic toxins (Ama) lodging into joints combined with aggravated dry, rough Vata dosha, leading to synovial fluid degradation.",
    herbs: ["Shallaki (Boswellia serrata)", "Nirgundi", "Ashwagandha", "Guggulu formulations", "Rasna"],
    therapies: ["Janu Basti (Warm oil reservoir)", "Elakizhi (Herbal leaf bolus massage)", "Matra Basti (Medicated herbal enema)"],
    dietaryTip: "Strictly avoid dry, cold, raw foods and carbonated drinks. Favour warm sesame oil, ginger tea, and cooked squash.",
    description: "Ayurveda categorizes joint degeneration as Sandhivata (wear-and-tear Vata) and autoimmune inflammation as Amavata (endotoxin-driven). Treatment focuses on digesting joint toxins and restoring synovial nourishment.",
  },
  {
    id: "migraine",
    slug: "migraine",
    name: "Migraine & Chronic Headaches",
    sanskritName: "Ardhavabhedaka & Shirashoola",
    category: "Neurological & Head",
    dosha: "Pitta-Kapha",
    symptoms: ["One-sided throbbing pain", "Photophobia (light sensitivity)", "Nausea", "Visual aura", "Neck stiffness"],
    rootCause: "Constriction of cranial blood vessels and nerve irritation caused by excess metabolic heat (Pitta) and channel blockage (Sroto-rodha).",
    herbs: ["Brahmi (Bacopa monnieri)", "Shankhpushpi", "Godanti Bhasma", "Jatamansi"],
    therapies: ["Shirodhara (Continuous herbal oil streaming)", "Nasya (Nasal herbal oil administration)", "Shirobasti"],
    dietaryTip: "Avoid excessively sour, fermented foods, skipped meals, and midday direct sun exposure.",
    description: "Vascular and tension headaches stem from aggravated Pitta heating the cranial micro-vessels or stagnant Kapha blocking sinus air flow. Soothing cranial oils and nasal errhines provide root relief.",
  },
  {
    id: "insomnia",
    slug: "insomnia",
    name: "Insomnia & Chronic Anxiety",
    sanskritName: "Anidra & Chitta Udvega",
    category: "Mental Wellbeing & Sleep",
    dosha: "Vata",
    symptoms: ["Difficulty falling asleep", "Racing thoughts", "Restless legs", "Night waking", "Daytime brain fog"],
    rootCause: "Hyperactive Prana Vata and Tarpaka Kapha depletion leading to disturbed sensory grounding and nervous system overstimulation.",
    herbs: ["Ashwagandha", "Tagara (Valerian)", "Saraswatarishta", "Brahmi"],
    therapies: ["Ksheeradhara (Warm medicated milk stream)", "Pada Abhyanga (Herbal foot reflexology with Kansa wand)", "Abhyanga"],
    dietaryTip: "Warm spiced milk with nutmeg and cardamom before bedtime. Eliminate blue light screens 1 hour prior to sleep.",
    description: "Inability to maintain continuous sleep indicates depleted Ojas and volatile Prana Vata. Classical streaming and warm oil foot massages re-anchor the nervous system.",
  },
  {
    id: "acid-reflux",
    slug: "acid-reflux",
    name: "GERD & Acidity",
    sanskritName: "Amlapitta",
    category: "Digestive & Metabolic",
    dosha: "Pitta",
    symptoms: ["Heartburn", "Sour belching", "Nausea", "Chest burning", "Mouth ulcers"],
    rootCause: "Aggravation of Pachaka Pitta with sour/liquid qualities, impairing digestive fire (Agni) and regurgitating upward.",
    herbs: ["Amalaki (Indian Gooseberry)", "Yashtimadhu (Licorice)", "Shatavari", "Kamadudha Rasa"],
    therapies: ["Takradhara (Medicated buttermilk streaming)", "Virechana (Therapeutic herbal purgation)", "Mridu Basti"],
    dietaryTip: "Avoid deep-fried food, tomatoes, chilies, and vinegar. Drink fresh coconut water and cumin-coriander tea.",
    description: "When digestive fire is corrupted by incompatible spicy and acidic foods, bile becomes excessively hot and acidic, causing esophageal burning and ulcerations.",
  },
  {
    id: "sinusitis",
    slug: "sinusitis",
    name: "Chronic Sinusitis & Rhinitis",
    sanskritName: "Dushta Pratishyaya & Peenasa",
    category: "Respiratory & ENT",
    dosha: "Kapha",
    symptoms: ["Facial pressure", "Post-nasal drip", "Congested nostrils", "Loss of smell", "Morning sneezing"],
    rootCause: "Stagnant, heavy Kapha mucus clogging cranial sinus pockets (Shringataka Marma) aggravated by cold ambient drafts.",
    herbs: ["Sitopaladi Churna", "Trikatu (Long pepper, black pepper, ginger)", "Haridra (Curcumin)", "Tulsi"],
    therapies: ["Nasya (Anu Taila / Shadbindu drops)", "Mukha Abhyanga & Nadi Swedana (Facial steam therapy)"],
    dietaryTip: "Eliminate refrigerated dairy, ice water, and heavy night yogurts. Consume warm black pepper soups.",
    description: "Chronic sinus inflammation is treated as stagnant cranial Kapha. Medicated nasal drops (*Nasya*) dissolve mucus reservoirs and stimulate olfactory nerve renewal.",
  },
  {
    id: "pcod",
    slug: "pcod",
    name: "PCOS / PCOD & Hormonal Imbalance",
    sanskritName: "Artava Kshaya & Granthi",
    category: "Women's Health & Endocrine",
    dosha: "Kapha",
    symptoms: ["Irregular cycles", "Weight gain", "Acne & hirsutism", "Mood swings", "Ovarian follicles"],
    rootCause: "Channel obstruction in the reproductive tissue channel (Artavavaha Srotas) caused by metabolic insulin sluggishness and Kapha-Medas vitiation.",
    herbs: ["Kanchanara Guggulu", "Varunadi Kashayam", "Shatavari", "Lodhra", "Ashoka"],
    therapies: ["Uttara Basti (Specialised reproductive cleanse)", "Udvartana (Herbal dry powder weight massage)", "Virechana"],
    dietaryTip: "Strict elimination of refined sugar and processed flour. Daily morning fenugreek seed water infusion.",
    description: "Polycystic ovaries result from blocked micro-circulatory channels and sluggish metabolic fire (*Meda Dhatvagni*). Deep Shodhana clears cystic stagnation and re-establishes natural ovulatory rhythms.",
  },
  {
    id: "eczema",
    slug: "eczema",
    name: "Eczema & Psoriasis",
    sanskritName: "Vicharchika & Kitibha",
    category: "Dermatological & Blood",
    dosha: "Pitta-Kapha",
    symptoms: ["Dry itchy plaques", "Red inflamed skin", "Weeping lesions", "Flaking scales", "Burning sensations"],
    rootCause: "Accumulation of toxic Pitta and impure blood tissue (Rakta Dhatu) manifesting through cutaneous layers with dry rough Vata or oozing Kapha.",
    herbs: ["Khadira (Acacia catechu)", "Neem (Azadirachta indica)", "Manjistha", "Sarivadyasava"],
    therapies: ["Virechana (Herbal purgation)", "Raktamokshana (Medicinal leech therapy)", "Takradhara with cooling buttermilk"],
    dietaryTip: "Avoid sour curd, seafood, fermented foods, and nightshades. Cook with bitter gourd, ghee, and turmeric.",
    description: "Ayurveda views chronic skin diseases (Kushta Roga) as systemic blood and liver toxicity rather than mere dermal conditions. Purging toxic bile through Virechana permanently reverses skin inflammation.",
  },
];
