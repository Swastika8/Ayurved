import { useState, useMemo } from "react";
import { Search, Sparkles, ArrowRight, Activity, ShieldCheck, HeartPulse, Stethoscope, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface AyurvedicDiseaseModel {
  id: string;
  name: string;
  sanskritName: string;
  category: string;
  dosha: "Vata" | "Pitta" | "Kapha" | "Vata-Pitta" | "Vata-Kapha" | "Pitta-Kapha" | "Tridosha";
  symptoms: string[];
  rootCause: string;
  herbs: string[];
  therapies: string[];
  dietaryTip: string;
}

export const AYURVEDIC_DISEASE_DB: AyurvedicDiseaseModel[] = [
  {
    id: "arthritis",
    name: "Osteo & Rheumatoid Arthritis",
    sanskritName: "Sandhivata & Amavata",
    category: "Joints & Musculoskeletal",
    dosha: "Vata",
    symptoms: ["Joint pain", "Morning stiffness", "Swelling", "Crackling joints", "Fatigue"],
    rootCause: "Accumulation of metabolic toxins (Ama) lodging into joints combined with aggravated dry, rough Vata dosha, leading to synovial fluid degradation.",
    herbs: ["Shallaki (Boswellia serrata)", "Nirgundi", "Ashwagandha", "Guggulu formulations", "Rasna"],
    therapies: ["Janu Basti (Warm oil reservoir)", "Elakizhi (Herbal leaf bolus massage)", "Matra Basti (Medicated herbal enema)"],
    dietaryTip: "Strictly avoid dry, cold, raw foods and carbonated drinks. Favour warm sesame oil, ginger tea, and cooked squash.",
  },
  {
    id: "migraine",
    name: "Migraine & Chronic Headaches",
    sanskritName: "Ardhavabhedaka & Shirashoola",
    category: "Neurological & Head",
    dosha: "Pitta-Kapha",
    symptoms: ["One-sided throbbing pain", "Photophobia (light sensitivity)", "Nausea", "Visual aura", "Neck stiffness"],
    rootCause: "Constriction of cranial blood vessels and nerve irritation caused by excess metabolic heat (Pitta) and channel blockage (Sroto-rodha).",
    herbs: ["Brahmi (Bacopa monnieri)", "Shankhpushpi", "Godanti Bhasma", "Jatamansi"],
    therapies: ["Shirodhara (Continuous herbal oil streaming)", "Nasya (Nasal herbal oil administration)", "Shirobasti"],
    dietaryTip: "Avoid excessively sour, fermented foods, skipped meals, and midday direct sun exposure.",
  },
  {
    id: "insomnia",
    name: "Insomnia & Chronic Anxiety",
    sanskritName: "Anidra & Chitta Udvega",
    category: "Mental Wellbeing & Sleep",
    dosha: "Vata",
    symptoms: ["Difficulty falling asleep", "Racing thoughts", "Restless legs", "Night waking", "Daytime brain fog"],
    rootCause: "Hyperactive Prana Vata and Tarpaka Kapha depletion leading to disturbed sensory grounding and nervous system overstimulation.",
    herbs: ["Ashwagandha", "Tagara (Valerian)", "Saraswatarishta", "Brahmi"],
    therapies: ["Ksheeradhara (Warm medicated milk stream)", "Pada Abhyanga (Herbal foot reflexology with Kansa wand)", "Abhyanga"],
    dietaryTip: "Warm spiced milk with nutmeg and cardamom before bedtime. Eliminate blue light screens 1 hour prior to sleep.",
  },
  {
    id: "acid-reflux",
    name: "GERD & Acidity",
    sanskritName: "Amlapitta",
    category: "Digestive & Metabolic",
    dosha: "Pitta",
    symptoms: ["Heartburn", "Sour belching", "Nausea", "Chest burning", "Mouth ulcers"],
    rootCause: "Aggravation of Pachaka Pitta with sour/liquid qualities, impairing digestive fire (Agni) and regurgitating upward.",
    herbs: ["Amalaki (Indian Gooseberry)", "Yashtimadhu (Licorice)", "Shatavari", "Kamadudha Rasa"],
    therapies: ["Takradhara (Medicated buttermilk streaming)", "Virechana (Therapeutic herbal purgation)", "Mridu Basti"],
    dietaryTip: "Avoid deep-fried food, tomatoes, chilies, and vinegar. Drink fresh coconut water and cumin-coriander tea.",
  },
  {
    id: "sinusitis",
    name: "Chronic Sinusitis & Rhinitis",
    sanskritName: "Dushta Pratishyaya & Peenasa",
    category: "Respiratory & ENT",
    dosha: "Kapha",
    symptoms: ["Facial pressure", "Post-nasal drip", "Congested nostrils", "Loss of smell", "Morning sneezing"],
    rootCause: "Stagnant, heavy Kapha mucus clogging cranial sinus pockets (Shringataka Marma) aggravated by cold ambient drafts.",
    herbs: ["Sitopaladi Churna", "Trikatu (Long pepper, black pepper, ginger)", "Haridra (Curcumin)", "Tulsi"],
    therapies: ["Nasya (Anu Taila / Shadbindu drops)", "Mukha Abhyanga & Nadi Swedana (Facial steam therapy)"],
    dietaryTip: "Eliminate refrigerated dairy, ice water, and heavy night yogurts. Consume warm black pepper soups.",
  },
  {
    id: "pcod",
    name: "PCOS / PCOD & Hormonal Imbalance",
    sanskritName: "Artava Kshaya & Granthi",
    category: "Women's Health & Endocrine",
    dosha: "Kapha",
    symptoms: ["Irregular cycles", "Weight gain", "Acne & hirsutism", "Mood swings", "Ovarian follicles"],
    rootCause: "Channel obstruction in the reproductive tissue channel (Artavavaha Srotas) caused by metabolic insulin sluggishness and Kapha-Medas vitiation.",
    herbs: ["Kanchanara Guggulu", "Varunadi Kashayam", "Shatavari", "Lodhra", "Ashoka"],
    therapies: ["Uttara Basti (Specialised reproductive cleanse)", "Udvartana (Herbal dry powder weight massage)", "Virechana"],
    dietaryTip: "Strict elimination of refined sugar and processed flour. Daily morning fenugreek seed water infusion.",
  },
  {
    id: "eczema",
    name: "Eczema & Psoriasis",
    sanskritName: "Vicharchika & Kitibha",
    category: "Dermatological & Blood",
    dosha: "Pitta-Kapha",
    symptoms: ["Dry itchy plaques", "Red inflamed skin", "Weeping lesions", "Flaking scales", "Burning sensations"],
    rootCause: "Toxins in the blood tissue (Rakta Dhatu) triggered by incompatible food combinations (Viruddha Ahara) and weakened liver clearance.",
    herbs: ["Manjistha", "Khadira (Acacia catechu)", "Neem (Azadirachta indica)", "Sarivadyasava"],
    therapies: ["Raktamokshana (Leech or gentle blood purification)", "Takradhara", "Virechana"],
    dietaryTip: "Strict prohibition of fish with milk, sour curd, and fermented alcohol. Take aloe vera pulp with turmeric.",
  },
  {
    id: "fatty-liver",
    name: "Fatty Liver & Metabolic Fatigue",
    sanskritName: "Yakrit Roga & Medoroga",
    category: "Digestive & Metabolic",
    dosha: "Kapha",
    symptoms: ["Abdominal fullness", "Chronic fatigue", "Sluggish digestion", "Elevated enzymes", "Brain heaviness"],
    rootCause: "Excess fat and toxins accumulating in liver hepatocytes (Yakrit) impeding bile production and cellular Agni.",
    herbs: ["Kalmegh (Andrographis)", "Bhumi Amalaki", "Katuki (Picrorhiza kurroa)", "Punarnava"],
    therapies: ["Virechana (Master liver detox)", "Deepana-Pachana herbal decoctions"],
    dietaryTip: "Include bitter greens (dandelion, bitter gourd), barley water, and eliminate alcohol and saturated hydrogenated oils.",
  },
];

export function SymptomDiseaseLookup({
  className = "",
  initialSearch = "",
}: {
  className?: string;
  initialSearch?: string;
}) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedDisease, setSelectedDisease] = useState<AyurvedicDiseaseModel | null>(null);

  const filteredDiseases = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return AYURVEDIC_DISEASE_DB.filter(
      (d) =>
        d.name.toLowerCase().includes(term) ||
        d.sanskritName.toLowerCase().includes(term) ||
        d.category.toLowerCase().includes(term) ||
        d.symptoms.some((s) => s.toLowerCase().includes(term)) ||
        d.herbs.some((h) => h.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  const quickPills = [
    { label: "Joints & Arthritis", term: "arthritis" },
    { label: "Migraine & Headaches", term: "migraine" },
    { label: "Sleep & Anxiety", term: "insomnia" },
    { label: "Acidity & Digestion", term: "acid" },
    { label: "PCOS / PCOD", term: "pcod" },
    { label: "Skin & Eczema", term: "eczema" },
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Search Input Box with Organic Leaf Curve */}
      <div className="relative rounded-[2rem] border-2 border-primary/20 bg-card p-2 shadow-soft transition-all duration-300 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
        <div className="flex items-center px-4">
          <Search className="size-5 text-primary/70 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type a symptom or condition (e.g. Arthritis, Migraine, Insomnia, Acidity)..."
            className="w-full bg-transparent px-3 py-3 text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-hidden"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-xs text-muted-foreground hover:text-foreground px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto px-4 py-2 border-t border-border/60 text-xs no-scrollbar">
          <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1 shrink-0">
            <Sparkles className="size-3 text-accent" /> Popular lookups:
          </span>
          {quickPills.map((pill) => (
            <button
              key={pill.label}
              onClick={() => setSearchTerm(pill.term)}
              className="shrink-0 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[11px] text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live Dropdown Results */}
      {searchTerm.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-96 overflow-y-auto rounded-3xl border border-border bg-card/95 p-3 shadow-lift backdrop-blur-md">
          {filteredDiseases.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              <p>No exact Ayurvedic match found for "{searchTerm}".</p>
              <p className="mt-1 text-xs">
                Try searching for symptoms like <em>joint, head, sleep, skin</em> or discuss with our{" "}
                <Link to="/assistant" className="text-primary underline font-medium">
                  AI Ayurvedic Assistant
                </Link>.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="px-3 py-1 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Classical Conditions Found ({filteredDiseases.length})
              </div>
              {filteredDiseases.map((d) => (
                <div
                  key={d.id}
                  onClick={() => setSelectedDisease(d)}
                  className="group flex items-center justify-between rounded-2xl p-3.5 transition-all hover:bg-primary/5 cursor-pointer border border-transparent hover:border-primary/20"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                        {d.name}
                      </span>
                      <span className="font-serif italic text-xs text-muted-foreground">
                        ({d.sanskritName})
                      </span>
                      <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                        {d.dosha}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      Key symptoms: {d.symptoms.join(" • ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-primary shrink-0 group-hover:translate-x-1 transition-transform">
                    <span>Explore Protocol</span>
                    <ChevronRight className="size-4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Full Clinical Detail Modal */}
      <Dialog open={!!selectedDisease} onOpenChange={(open) => !open && setSelectedDisease(null)}>
        {selectedDisease && (
          <DialogContent className="max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
            <div className="relative w-full h-32 rounded-2xl overflow-hidden mb-3 border border-border shadow-xs">
              <img src="/media/disease_lookup.jpg" alt="Ayurvedic Diagnosis" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-3.5 text-xs text-white/90 font-medium flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-accent" /> Authentic Nidana & Chikitsa Protocol
              </div>
            </div>

            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="text-xs font-normal">
                  {selectedDisease.category}
                </Badge>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                  Dosha: {selectedDisease.dosha} Imbalance
                </Badge>
              </div>
              <DialogTitle className="font-display text-2xl sm:text-3xl text-foreground">
                {selectedDisease.name}
              </DialogTitle>
              <DialogDescription className="font-serif italic text-base text-primary/80">
                Classical Sanskrit: {selectedDisease.sanskritName}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-6 text-sm">
              {/* Root Cause / Samprapti */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-1.5">
                <div className="flex items-center gap-2 font-display text-base font-semibold text-primary">
                  <Activity className="size-4 text-accent" />
                  Ayurvedic Pathogenesis (*Samprapti*)
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {selectedDisease.rootCause}
                </p>
              </div>

              {/* Classical Herbs & Formulations */}
              <div>
                <h4 className="font-display text-base font-semibold text-foreground flex items-center gap-2 mb-2">
                  <ShieldCheck className="size-4 text-primary" /> Key Healing Herbs (*Oushadha*)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDisease.herbs.map((h, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Hospital Therapies */}
              <div>
                <h4 className="font-display text-base font-semibold text-foreground flex items-center gap-2 mb-2">
                  <HeartPulse className="size-4 text-accent" /> Hospital Therapies & Panchakarma
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                  {selectedDisease.therapies.map((t, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-primary shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dietary & Lifestyle Rule */}
              <div className="rounded-xl border border-border bg-secondary/30 p-3.5 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Dietary Guideline (*Pathya*): </span>
                {selectedDisease.dietaryTip}
              </div>

              {/* Consultation Call to Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  Personalized Nadi Pariksha consultation available online or at hospital.
                </div>
                <Button asChild className="w-full sm:w-auto gap-2 rounded-full px-6">
                  <Link to="/book">
                    <Stethoscope className="size-4" /> Book Consultation for this Condition
                  </Link>
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
