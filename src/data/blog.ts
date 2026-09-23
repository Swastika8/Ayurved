/**
 * Vedic health publications, clinical monographs, and seasonal guides.
 */

export interface ArticleModel {
  id: string;
  title: string;
  sanskritQuote?: string;
  category: "Ritucharya" | "Herbal Remedies" | "Panchakarma" | "Mind & Sattva" | "Diet & Digestion";
  readTime: string;
  author: string;
  date: string;
  snippet: string;
  content: string[];
  keyHerbs?: string[];
  image?: string;
}

export const BLOG_ARTICLES: ArticleModel[] = [
  {
    id: "spring-kapha-detox",
    title: "Navigating Vasanta: The Science of Melting Spring Kapha",
    sanskritQuote: "हेमन्ते शिशिरे चैव कफः सञ्चयमाचरेत्, वसन्तार्कंशुभिर्भिन्नो हन्ति कायाग्निमागतः।",
    category: "Ritucharya",
    readTime: "6 min read",
    author: "Dr. Ananya Varma, BAMS (Senior Physician)",
    date: "March 18, 2026",
    snippet:
      "Why lethargy, hay fever, and heavy sinuses appear every spring, and how classical Vamana and dry powder massage (Udvartana) liberate your body from accumulated winter toxins.",
    content: [
      "In classical Ayurveda, late winter (Shishira) is a period of deep internal consolidation. Cold winds close the skin pores, trapping bodily heat and fostering a natural buildup of dense, unctuous Kapha dosha.",
      "As the sun turns northwards (Uttarayana) in spring (Vasanta), ambient solar rays dissolve and liquefy this dormant Kapha. Just as winter snow on Himalayan slopes melts under the spring sun, internal mucus surges into the stomach, lungs, and sinuses.",
      "The primary therapeutic intervention for this seasonal shift is Vamana (therapeutic emesis) under clinical supervision, followed by dry herbal powder brushing (Udvartana) using barley, triphala, and chickpea flour to stimulate lymphatic drainage.",
      "At home, replace heavy dairy and oily curries with warm ginger-infused black pepper soups, aged honey water, and roasted grains.",
    ],
    keyHerbs: ["Trikatu", "Haridra (Curcumin)", "Pippali", "Triphala"],
    image: "/media/blog-animation.jpg",
  },
  {
    id: "ashwagandha-myth-fact",
    title: "Ashwagandha (Withania Somnifera): Clarifying Modern Misconceptions",
    sanskritQuote: "गन्धानुकृतेरश्वानां वाजीकरणमुच्यते।",
    category: "Herbal Remedies",
    readTime: "8 min read",
    author: "Acharya Madhavan Namboodiri (Ayurvedacharya)",
    date: "March 10, 2026",
    snippet:
      "Modern wellness brands sell Ashwagandha as a blanket stress supplement. Classical texts teach that this hot, heavy root can aggravate high Pitta if taken without proper Anupana (carrier vehicle).",
    content: [
      "Ashwagandha translates to 'the smell of a horse'—alluding both to its unique earthy aroma and the primeval stamina and strength (*Bala*) it imparts to depleted tissues.",
      "While Western herbalism categorizes it simply as an 'adaptogen', classical Dravyaguna defines its specific energetics: Ushna (heating in potency), Guru (heavy to digest), and Snigdha (unctuous).",
      "Because of its heating nature, prescribing raw Ashwagandha capsules to patients with elevated Pitta, acid reflux, or liver inflammation frequently triggers insomnia and skin breakouts.",
      "To unlock its authentic Rasayana (longevity) power safely, it must be boiled in whole organic cow's milk with cooling spices like green cardamom, or processed into fermented Arishtams.",
    ],
    keyHerbs: ["Ashwagandha", "Shatavari", "Yashtimadhu", "Cardamom"],
  },
  {
    id: "shirodhara-neurology",
    title: "Shirodhara: What Happens in the Brain Under Warm Medicated Streaming?",
    sanskritQuote: "शिरोगतेऽनिले शान्तिर्मूर्ध्नस्तैलेन जायते।",
    category: "Panchakarma",
    readTime: "7 min read",
    author: "Dr. Rajesh K. Nair, MD (Ayu)",
    date: "February 28, 2026",
    snippet:
      "Modern clinical studies reveal that the continuous rhythmic oscillation of warm herbal oil over the forehead stimulates the Ajna Marma, triggering profound alpha-wave parasympathetic dominance.",
    content: [
      "Shirodhara is perhaps the most universally recognizable Ayurvedic therapy. Yet, it is neither a simple head massage nor a superficial spa indulgence—it is a specialized neuro-vascular therapeutic protocol.",
      "The constant, rhythmic oscillation of warm medicated oil (like Brahmi Taila or Ksheerabala) over the glabella stimulates the Trigeminal and Ophthalmic nerve branches, transmitting impulses to the autonomic regulatory center in the brainstem.",
      "EEG clinical studies conducted at our hospital confirm a rapid shift from anxious high-frequency Beta brainwaves to serene, restorative Alpha and Theta rhythms within 12 minutes of continuous streaming.",
      "Shirodhara is clinically indicated for intractable insomnia, generalized anxiety, tension headaches, cognitive fatigue, and diabetic neuropathy.",
    ],
    keyHerbs: ["Brahmi", "Shankhpushpi", "Jatamansi", "Ksheerabala Taila"],
  },
  {
    id: "circadian-agni",
    title: "The Biological Clocks of Agni: Why Midnight Snacking Disrupts Metabolism",
    sanskritQuote: "न दिवा स्वप्यात्, रात्रौ च जागरणं त्यजेत्।",
    category: "Diet & Digestion",
    readTime: "5 min read",
    author: "Dr. Meera Nambiar, BAMS",
    date: "February 14, 2026",
    snippet:
      "Charaka Samhita detailed circadian metabolic rhythms 3,000 years ago. Discover how aligning your meal timing with solar elevation prevents metabolic endotoxemia (Ama).",
    content: [
      "Our digestive capacity (Agni) is governed directly by the solar principle (Surya Mandala). When the sun is directly overhead at midday, our digestive bile and enzyme secretion peak.",
      "Conversely, after sunset, bodily physiology naturally transitions into cellular repair and cleansing. Eating heavy proteins, cheese, or dense desserts after 8:30 PM overwhelms sluggish digestive enzymes.",
      "Undigested food residues ferment in the gut, producing Ama—a sticky, foul-smelling endotoxin that seeps through intestinal mucosal membranes into lymphatic and arterial channels.",
      "By adhering to the classical rule—eating your largest meal between 12:00 PM and 1:30 PM and consuming a light, warm soup before sunset—patients routinely reverse chronic bloating, high triglycerides, and brain fog.",
    ],
    keyHerbs: ["Sunthi (Dry ginger)", "Jeeraka (Cumin)", "Dhanyaka (Coriander)", "Ajwain"],
  },
  {
    id: "ojas-immunity",
    title: "Cultivating Ojas: The Supreme Subtle Essence of Immunity and Radiance",
    sanskritQuote: "ओजः सर्वशरीरस्थं स्निग्धं शीतं स्थिरं सितम्।",
    category: "Mind & Sattva",
    readTime: "9 min read",
    author: "Acharya Madhavan Namboodiri",
    date: "January 22, 2026",
    snippet:
      "In Ayurveda, true immunity is not a hyperactive inflammatory shield, but Ojas—the refined nectar distilled through harmonious digestion, pure thoughts, and restorative sleep.",
    content: [
      "The human body consists of seven foundational tissues: Plasma (*Rasa*), Blood (*Rakta*), Muscle (*Mamsa*), Fat (*Medas*), Bone (*Asthi*), Marrow/Nerve (*Majja*), and Reproductive (*Shukra*).",
      "Each tissue takes roughly five days to refine into the next. At the pinnacle of this 35-day metabolic distillation lies Ojas—the supreme physiological essence responsible for disease resistance, cellular luminescence, and emotional equanimity.",
      "Chronic mental stress, angry outbursts, erratic sleep, and artificial stimulants directly deplete Ojas, manifesting as chronic exhaustion, recurring colds, and fragile resilience.",
      "Ojas is restored through Sattvic nourishment: pure A2 cow ghee, soaked peeled almonds, meditational silence (Mouna), deep forest immersion, and loving kindness.",
    ],
    keyHerbs: ["Amalaki", "Gold Bhasma", "Guduchi", "Saffron"],
  },
];
