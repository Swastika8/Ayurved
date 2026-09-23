import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Wind,
  Flame,
  Droplets,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Layers,
} from "lucide-react";
import { useTreatments } from "@/lib/queries";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export const Route = createFileRoute("/treatments")({
  head: () => ({
    meta: [
      { title: "Classical Ayurvedic Treatments — Categorized by Doshas | Aarogya Hospital" },
      {
        name: "description",
        content:
          "Explore authentic Ayurvedic therapies categorized by Vata, Pitta, and Kapha: Abhyanga, Shirodhara, Janu Basti, Pizhichil, Udvartana, and Kizhi therapies.",
      },
    ],
  }),
  component: TreatmentsPage,
});

interface ClassicalTherapyItem {
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
}

const CLASSICAL_TREATMENTS: ClassicalTherapyItem[] = [
  {
    id: "abhyanga",
    name: "Sarvanga Abhyanga",
    sanskrit: "सर्वाङ्ग अभ्यङ्ग",
    dosha: "Vata",
    duration: "60 mins",
    price: 2400,
    oilsUsed: "Warm Dhanwantharam or Mahanarayana Taila",
    summary: "Full-body synchronization massage with warm classical medicated oils using rhythmic longitudinal strokes.",
    description:
      "Administered by two therapists in rhythmic tandem along the direction of venous blood flow (Anuloma). The warm medicated oil penetrates deep into cutaneous pores, pacifying agitated Prana and Vyana Vata.",
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

export function TreatmentsPage() {
  const [activeDosha, setActiveDosha] = useState<"All" | "Vata" | "Pitta" | "Kapha" | "Tridosha">("All");

  const filteredTherapies = useMemo(() => {
    if (activeDosha === "All") return CLASSICAL_TREATMENTS;
    return CLASSICAL_TREATMENTS.filter((t) => t.dosha === activeDosha);
  }, [activeDosha]);

  const doshaMeta = {
    Vata: {
      title: "Vata Pacifying Therapies (Air & Ether)",
      desc: "For ailments driven by dryness, coldness, crackling joints, restlessness, or nervous exhaustion. Characterized by warm, deep unctuous herbal oils.",
      badge: "bg-primary/10 text-primary border-primary/20",
    },
    Pitta: {
      title: "Pitta Pacifying Therapies (Fire & Water)",
      desc: "For inflammation, hyper-acidity, skin rashes, burning sensations, and intense irritability. Characterized by cooling herbs, ghee, and buttermilk.",
      badge: "bg-accent/20 text-accent-foreground border-accent/30",
    },
    Kapha: {
      title: "Kapha Pacifying Therapies (Water & Earth)",
      desc: "For sluggish metabolism, fluid retention, heavy sinuses, weight gain, and joint stiffness. Characterized by stimulating herbal powders and leaf steam.",
      badge: "bg-destructive/10 text-destructive border-destructive/20",
    },
    Tridosha: {
      title: "Tridosha Balancing & Rejuvenation (Rasayana)",
      desc: "Comprehensive therapies tailored to harmonize all three constitutional elements and fortify bodily vitality (Ojas).",
      badge: "bg-secondary text-foreground border-border",
    },
  };

  return (
    <PageShell>
      {/* 3D Levitating Apothecary Hero Stage */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-card via-secondary/30 to-primary/5 border border-border p-6 sm:p-12 lg:p-14 shadow-soft">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Asymmetrical Content Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="rounded-full border-primary/30 text-primary px-3.5 py-1 text-xs">
                <Sparkles className="size-3.5 text-accent mr-1.5" /> Authentic Shirodhara & Droni Chikitsa
              </Badge>
              <Badge className="bg-accent/15 text-accent-foreground border-accent/20 rounded-full text-xs">
                Lineage Formulations
              </Badge>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance-display leading-[1.15]">
              Classical Ayurvedic <span className="italic text-primary font-normal">Therapies</span> & Droni Rituals
            </h1>

            <p className="font-serif italic text-lg sm:text-xl text-primary/85">
              “Yatha Ksheeram Samasthepi Dehe Vyapi Pravartate, <br className="hidden sm:inline" />
              Tatha Tailam Guneh Srotamsyanupravishati.”
            </p>
            <p className="text-xs font-sans text-muted-foreground italic">
              — Just as pure essence permeates every cell, medicated warm oils permeate the micro-channels (Srotas) of the human body.
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Ayurveda never treats an isolated symptom. Every oil formulation, massage velocity, and thermal steam bath is calibrated strictly to your constitutional Dosha imbalance — Vata, Pitta, or Kapha.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 shadow-lift">
                <Link to="/book">Consult a Vaidya for Prescription</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                <a href="#dosha-catalog">Browse Dosha Catalog</a>
              </Button>
            </div>

            {/* Micro Feature Indicators */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/70 max-w-md">
              <div>
                <span className="font-display text-lg font-bold text-foreground block">100%</span>
                <span className="text-[11px] text-muted-foreground">Wild-Harvested Herbs</span>
              </div>
              <div>
                <span className="font-display text-lg font-bold text-primary block">Single-Wood</span>
                <span className="text-[11px] text-muted-foreground">Teak Droni Beds</span>
              </div>
              <div>
                <span className="font-display text-lg font-bold text-accent block">Kerala</span>
                <span className="text-[11px] text-muted-foreground">Tandem Therapists</span>
              </div>
            </div>
          </div>

          {/* 3D Levitating Asset Column (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 -m-6 bg-gradient-to-tr from-accent/10 via-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-md mx-auto aspect-square rounded-[2.5rem] bg-gradient-to-b from-card/80 to-secondary/40 border border-primary/20 p-6 flex flex-col items-center justify-center shadow-lift overflow-hidden group">
              {/* Floating 3D Artwork Layer */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src="/media/treatments.png"
                  alt="3D Levitating Ayurvedic Vessels and Herbs"
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(26,60,44,0.18)] animate-levitate transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Floating HTML/CSS Badges over negative space */}
              <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-border text-[11px] font-medium text-foreground flex items-center gap-1.5 shadow-sm">
                <Sparkles className="size-3 text-accent" />
                <span>3D Apothecary Layer</span>
              </div>

              <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-primary/20 text-[11px] font-semibold text-primary flex items-center gap-1.5 shadow-sm">
                <span>Hand-Crafted Bronze & Teak</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Dosha Filter Tabs */}
      <section id="dosha-catalog" className="mt-16 space-y-8 scroll-mt-24">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(["All", "Vata", "Pitta", "Kapha", "Tridosha"] as const).map((dosha) => {
            const count = dosha === "All" ? CLASSICAL_TREATMENTS.length : CLASSICAL_TREATMENTS.filter((t) => t.dosha === dosha).length;
            return (
              <button
                key={dosha}
                onClick={() => setActiveDosha(dosha)}
                className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeDosha === dosha
                    ? "bg-primary text-primary-foreground shadow-lift"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-border"
                }`}
              >
                <span>{dosha === "All" ? "All Therapies" : `${dosha} Balancing`}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeDosha === dosha ? "bg-white/20 text-white" : "bg-card text-muted-foreground"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dosha Philosophy Context Box if a specific dosha is active */}
        {activeDosha !== "All" && (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 text-center max-w-2xl mx-auto space-y-1">
            <h3 className="font-display text-lg font-bold text-primary">
              {doshaMeta[activeDosha].title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {doshaMeta[activeDosha].desc}
            </p>
          </div>
        )}

        {/* Cinematic Classical Chikitsa Video Stage */}
        <div className="max-w-4xl mx-auto my-6">
          <MediaPlaceholder
            title="Authentic Droni & Shirodhara Cinematic Demonstration"
            subtitle="Watch how warm medicated oils are rhythmically applied in tandem according to Sushruta Samhita clinical guidelines."
            badge="Live Therapy Demonstration"
            aspectRatio="16/9"
            previewUrl="/media/treatments.mp4"
            duration="3:12 mins"
          />
        </div>

        {/* Fluid Organic Therapies Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTherapies.map((therapy) => (
            <div
              key={therapy.id}
              className="leaf-card p-6 flex flex-col justify-between hover:shadow-lift hover:border-primary/50 transition-all space-y-5 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={`text-[11px] font-medium ${doshaMeta[therapy.dosha].badge}`}>
                    {therapy.dosha} Pacifying
                  </Badge>
                  <span className="text-xs font-mono font-medium text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3 text-primary" /> {therapy.duration}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {therapy.name}
                  </h3>
                  <span className="font-serif italic text-xs text-primary/80 block mt-0.5">
                    {therapy.sanskrit}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {therapy.summary}
                </p>

                {/* Oils & Formulations Tag */}
                <div className="rounded-xl bg-secondary/50 p-2.5 text-[11px] text-foreground/90 border border-border/60">
                  <strong className="text-primary font-semibold block text-[10px] uppercase tracking-wider">
                    Medicaments & Oils:
                  </strong>
                  <span>{therapy.oilsUsed}</span>
                </div>

                {/* Benefits Bullet Points */}
                <ul className="space-y-1.5 text-xs text-muted-foreground pt-1">
                  {therapy.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Card Action and Pricing */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted-foreground block">Session Fee</span>
                  <span className="font-bold text-base text-foreground">
                    ₹{therapy.price.toFixed(0)}
                  </span>
                </div>
                <Button asChild size="sm" className="rounded-full px-5 text-xs shadow-soft">
                  <Link to="/book">
                    Book Therapy <ArrowRight className="size-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Physician Evaluation Note Banner */}
      <section className="mt-20 leaf-card-alt bg-gradient-to-tr from-secondary/60 via-card to-primary/10 p-8 sm:p-12 border-primary/20 text-center max-w-4xl mx-auto space-y-4">
        <ShieldCheck className="size-8 text-primary mx-auto" />
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
          Every Therapy Begins with a Nadi Pariksha Assessment
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          In adherence to hospital protocol, all therapies are prescribed by our resident Vaidyas after pulse diagnosis to select the exact temperature, pressure, and herbal formulation best suited to your Prakriti.
        </p>
        <div className="pt-2">
          <Button asChild size="lg" className="rounded-full px-8 shadow-soft">
            <Link to="/book">Schedule Initial Doctor Consultation</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
