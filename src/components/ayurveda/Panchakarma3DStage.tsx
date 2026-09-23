import { useState } from "react";
import { Sparkles, Play, Pause, Info, Flame, Droplets, Wind, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

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
    name: "Virechana (Purgation)",
    sanskrit: "विरेचनं पित्तहराणाम्",
    dosha: "Pitta Supreme Cure",
    targetDhatu: "Rakta (Blood) & Yakrit (Liver/Spleen)",
    srotas: "Raktavaha & Purishavaha Srotas",
    image: "/media/panchakarma/virechan.jpg",
    animationType: "virechan",
    animationDescription: "Continuous rotational vortex of sacred botanical leaves and golden energy representing hepatic and gut purification.",
    clinicalPurpose: "Elimination of accumulated excess bile, acidic metabolic toxins, and chronic inflammatory skin disorders.",
    purvakarma: "Adequate internal oleation (Snehapana) and sudation (Swedana) until toxic signs appear in alimentary tract.",
    pradhanakarma: "Administration of customized herbal purgative compound (Eranda Taila, Trivrit Lehyam, or Avipattikar Churna).",
    paschatkarma: "Strict gradual reintroduction of light diet over 3 to 7 days (Samsarjana Krama).",
  },
  {
    id: "vaman",
    name: "Vamana (Therapeutic Emesis)",
    sanskrit: "वमनं कफहराणाम्",
    dosha: "Kapha Supreme Cure",
    targetDhatu: "Rasa, Meda & Amashaya (Stomach)",
    srotas: "Pranavaha & Udakavaha Srotas",
    image: "/media/panchakarma/vaman.jpg",
    animationType: "vaman",
    animationDescription: "Botanical prana micro-particles floating from fresh Triphala, neem leaves, and sacred decoction bowl.",
    clinicalPurpose: "Upward expulsion of deep-seated stagnant Kapha mucous toxins from the stomach, lungs, and lymph system.",
    purvakarma: "Diet dominated by Kapha-aggravating foods (curd, black gram) the night before to provoke toxins into stomach.",
    pradhanakarma: "Consumption of Madanaphala decoction, licorice milk, and calamus powder under continuous physician pulse monitoring.",
    paschatkarma: "Resting, medicated dhoomapana (smoke), and strict observance of light nourishing gruels.",
  },
];

export function Panchakarma3DStage() {
  const [selectedId, setSelectedId] = useState<string>("nasya");
  const [isAnimated, setIsAnimated] = useState<boolean>(true);

  const activeTherapy = THERAPY_SPECS.find((t) => t.id === selectedId) || THERAPY_SPECS[0]!;

  return (
    <div className="space-y-10">
      {/* 1. Interactive Anatomical Hotspots Strip */}
      <div className="leaf-card p-6 bg-card border border-primary/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-accent" /> Seven Individual 3D Therapy Assets
            </span>
            <h3 className="font-display text-2xl font-bold text-foreground mt-0.5">
              Select a Classical Shodhana Therapy
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">3D Animation:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAnimated(!isAnimated)}
              className="leaf-pill text-xs gap-1.5 border-primary/30"
            >
              {isAnimated ? (
                <>
                  <Pause className="size-3 text-accent" /> Active Flow
                </>
              ) : (
                <>
                  <Play className="size-3 text-primary" /> Paused
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Therapy Tabs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-2">
          {THERAPY_SPECS.map((therapy) => {
            const isSelected = therapy.id === selectedId;
            return (
              <button
                key={therapy.id}
                onClick={() => setSelectedId(therapy.id)}
                className={`leaf-card p-3 text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-md ring-1 ring-primary"
                    : "border-border/80 bg-background/60 hover:bg-secondary/40 hover:border-primary/30"
                }`}
              >
                <div className="size-12 rounded-xl overflow-hidden mb-2 bg-card border border-border/80 shrink-0 mx-auto">
                  <img src={therapy.image} alt={therapy.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-center w-full">
                  <p className="font-display text-sm font-bold text-foreground leading-tight truncate">
                    {therapy.name.split(" ")[0]}
                  </p>
                  <p className="text-[10px] text-primary font-medium mt-0.5 truncate">
                    {therapy.dosha.split(" ")[0]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main 3D Visual Layer & Clinical Protocol Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3D Visual Asset with Animated Physics Layer */}
        <div className="lg:col-span-6 space-y-4">
          <div className="leaf-card p-8 bg-gradient-to-br from-card via-secondary/30 to-background border border-primary/25 shadow-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[440px]">
            {/* Ambient Background Glows */}
            <div className="absolute top-10 left-10 size-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 size-48 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

            {/* Base 3D Rendered Object Layer */}
            <div className="relative size-72 sm:size-80 rounded-3xl overflow-hidden shadow-2xl border border-border/80 bg-card">
              <img
                src={activeTherapy.image}
                alt={activeTherapy.name}
                className="w-full h-full object-cover"
              />

              {/* OVERLAID ANIMATED 3D PHYSICS LAYERS */}
              {isAnimated && (
                <>
                  {/* NASYA: Oil Droplet Falling Physics */}
                  {activeTherapy.animationType === "nasya" && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Suspended Golden Drop falling */}
                      <div className="absolute top-[28%] left-[50%] -translate-x-1/2">
                        <div className="size-4 rounded-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 shadow-lg shadow-amber-500/50 animate-nasya-drop" />
                      </div>
                      {/* Vessel Rim Impact Ripple */}
                      <div className="absolute top-[37%] left-[50%] -translate-x-1/2 size-7 rounded-full border border-amber-300/80 animate-oil-ripple" />
                    </div>
                  )}

                  {/* SNEHAPAN: Liquid Swirl & Refraction */}
                  {activeTherapy.animationType === "snehapan" && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="size-36 rounded-full border border-amber-400/25 bg-amber-400/10 blur-xs animate-liquid-swirl" />
                      <div className="absolute size-24 rounded-full border border-primary/20 animate-prana-pulse" />
                    </div>
                  )}

                  {/* SWEDAN: Curving Rising Steam Wisps */}
                  {activeTherapy.animationType === "swedan" && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Steam Plume 1 */}
                      <div className="absolute top-[18%] left-[48%] -translate-x-1/2">
                        <svg className="w-12 h-20 text-accent/70 animate-steam-1" viewBox="0 0 40 80" fill="none">
                          <path
                            d="M20 70 C10 50, 30 30, 20 10"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            className="opacity-75 blur-[0.5px]"
                          />
                        </svg>
                      </div>
                      {/* Steam Plume 2 */}
                      <div className="absolute top-[22%] left-[54%] -translate-x-1/2">
                        <svg className="w-10 h-16 text-amber-200/80 animate-steam-2" viewBox="0 0 40 80" fill="none">
                          <path
                            d="M20 70 C30 50, 10 30, 20 10"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            className="opacity-60 blur-[0.5px]"
                          />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* ABHYANG: Prana Breathing Glow Around Sacred Palms */}
                  {activeTherapy.animationType === "abhyang" && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="size-48 rounded-full bg-radial from-amber-300/30 via-primary/15 to-transparent blur-md animate-prana-pulse" />
                      <div className="absolute size-20 rounded-full border-2 border-amber-400/50 animate-oil-ripple" />
                    </div>
                  )}

                  {/* VASTI: Golden Liquid Pulse */}
                  {activeTherapy.animationType === "vasti" && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-[34%] left-[28%] size-2.5 rounded-full bg-amber-400 shadow-md animate-nasya-drop" />
                      <div className="absolute inset-0 bg-radial from-amber-400/10 via-transparent to-transparent animate-prana-pulse" />
                    </div>
                  )}

                  {/* VIRECHAN: Rotational Botanical Vortex */}
                  {activeTherapy.animationType === "virechan" && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="size-44 rounded-full border-2 border-dashed border-accent/40 animate-liquid-swirl" />
                    </div>
                  )}

                  {/* VAMAN: Floating Herb Particles */}
                  {activeTherapy.animationType === "vaman" && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-[45%] left-[45%] size-2 rounded-full bg-emerald-400/80 animate-steam-1" />
                      <div className="absolute top-[42%] left-[55%] size-1.5 rounded-full bg-amber-300/80 animate-steam-2" />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Micro-Animation Status Label */}
            <div className="mt-5 text-center space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold">
                <Sparkles className="size-3.5 text-accent animate-pulse" />
                {activeTherapy.animationDescription}
              </span>
              <p className="text-[11px] text-muted-foreground font-mono">
                Asset: {activeTherapy.id.toUpperCase()}_3D_LAYER (Active)
              </p>
            </div>
          </div>
        </div>

        {/* Right: Classical Clinical Protocol & Sanskrit Shloka */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                Target: {activeTherapy.dosha}
              </Badge>
              <Badge variant="outline" className="text-xs text-accent border-accent/30">
                Dhatu: {activeTherapy.targetDhatu}
              </Badge>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              {activeTherapy.name}
            </h2>
            <p className="font-serif italic text-base text-accent font-medium mt-1">
              “{activeTherapy.sanskrit}”
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              {activeTherapy.clinicalPurpose}
            </p>
          </div>

          {/* Three Clinical Phases Accordion / Cards */}
          <div className="space-y-3">
            <div className="leaf-card p-4 bg-card border-border/80 space-y-1 text-xs">
              <span className="font-semibold text-primary uppercase tracking-wider text-[11px] block">
                1. Preparatory Phase (Purvakarma)
              </span>
              <p className="text-muted-foreground leading-relaxed">{activeTherapy.purvakarma}</p>
            </div>

            <div className="leaf-card p-4 bg-primary/5 border border-primary/20 space-y-1 text-xs">
              <span className="font-semibold text-accent uppercase tracking-wider text-[11px] block">
                2. Main Shodhana Execution (Pradhanakarma)
              </span>
              <p className="text-foreground/90 leading-relaxed font-medium">{activeTherapy.pradhanakarma}</p>
            </div>

            <div className="leaf-card p-4 bg-card border-border/80 space-y-1 text-xs">
              <span className="font-semibold text-muted-foreground uppercase tracking-wider text-[11px] block">
                3. Post-Purification Restoration (Paschatkarma)
              </span>
              <p className="text-muted-foreground leading-relaxed">{activeTherapy.paschatkarma}</p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="leaf-pill bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md">
              <Link to="/book">
                Book Consultation for {activeTherapy.name.split(" ")[0]}
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" /> Supervised 24/7 by Chief Vaidyas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
