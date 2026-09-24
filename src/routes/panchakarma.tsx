import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Panchakarma3DStage } from "@/components/ayurveda/Panchakarma3DStage";
import { PANCHAKARMA_THERAPIES, type PanchakarmaTherapyDetail } from "@/data/panchakarma";
import { SANCTUARIES } from "@/data/hospital";
import {
  Sparkles,
  Droplets,
  Clock,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Flame,
  Wind,
  Activity,
  CheckCircle2,
  Calendar,
  Layers,
} from "lucide-react";

export const Route = createFileRoute("/panchakarma")({
  head: () => ({
    meta: [
      { title: "Panchakarma Deep Dive — 5 Master Bio-Purifications | Aarogya Hospital" },
      {
        name: "description",
        content:
          "Detailed clinical protocols for the five classical Panchakarma therapies: Vamana, Virechana, Basti, Nasya, and Raktamokshana. Uncontained 3D anatomical models and inpatient schedules.",
      },
    ],
  }),
  component: PanchakarmaPage,
});

export function PanchakarmaPage() {
  const [selectedTherapyKey, setSelectedTherapyKey] = useState<string>("vamana");
  const deepDiveRef = useRef<HTMLDivElement>(null);

  const activeTherapy: PanchakarmaTherapyDetail =
    PANCHAKARMA_THERAPIES[selectedTherapyKey] || PANCHAKARMA_THERAPIES.vamana!;

  const handleHotspotClick = (key: string) => {
    setSelectedTherapyKey(key);
    deepDiveRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageShell>
      {/* 1. Grand Atmospheric Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        {/* Ambient Environmental Gradients */}
        <div className="absolute top-0 left-1/3 w-[650px] h-[650px] rounded-full bg-primary/10 blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/2 right-0 w-[550px] h-[550px] rounded-full bg-accent/15 blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/5 text-primary px-4 py-1.5 rounded-full text-xs tracking-wider uppercase font-semibold"
          >
            <Sparkles className="size-3.5 mr-2 text-accent" /> Classical Shodhana Chikitsa
          </Badge>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
            The Five Master <br />
            <span className="text-primary italic font-serif">Bio-Purifications</span>
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
            Ayurveda does not merely mask chronic symptoms. Panchakarma systematically liquefies, mobilizes, and evacuates deep cellular toxins (<em className="text-foreground">Ama</em>) through the body's natural physiological pathways.
          </p>
        </div>

        {/* 2. MASSIVE CENTRAL FULL-WIDTH MANDALA STAGE (FULL SCREEN BACKGROUND) */}
        <div className="mt-14 relative w-full min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Subtle Rotating Sacred Geometry Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 opacity-40">
            <div className="w-[500px] sm:w-[700px] lg:w-[950px] h-[500px] sm:h-[700px] lg:h-[950px] rounded-full border border-primary/20 animate-[spin_120s_linear_infinite]" />
            <div className="absolute w-[400px] sm:w-[550px] lg:w-[750px] h-[400px] sm:h-[550px] lg:h-[750px] rounded-full border border-dashed border-accent/25 animate-[spin_80s_linear_infinite_reverse]" />
          </div>

          {/* Full-Screen Background Image Layer */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <img
              src="/media/panchakarma-main.jpg"
              alt="Panchakarma Sacred Biological Diagram"
              className="w-full h-full object-cover object-center filter saturate-[1.05] contrast-[1.02] opacity-75 dark:opacity-50"
            />
            <div className="absolute inset-0 bg-radial from-transparent via-background/60 to-background" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
          </div>

            {/* Interactive Anatomical Hotspots Overlaid on the Mandala */}
            <div className="absolute inset-0 max-w-5xl mx-auto pointer-events-none">
              {/* Hotspot 1: Nasya (Head / Cranial) */}
              <div
                style={{ top: "18%", left: "50%" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-pointer z-20"
                onClick={() => handleHotspotClick("nasya")}
              >
                <div className="relative flex items-center justify-center">
                  <div className="size-10 rounded-full bg-accent/30 animate-ping absolute" />
                  <div className="size-11 rounded-full bg-background/90 border-2 border-accent text-accent shadow-lift flex items-center justify-center backdrop-blur-md transition-transform group-hover:scale-125">
                    <Wind className="size-5" />
                  </div>
                  {/* Floating Pill Label */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-14 bg-background/95 border border-accent/30 text-foreground text-xs px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
                    <strong className="text-accent font-semibold">Nasya:</strong> Cranial & Sinus Flush
                  </div>
                </div>
              </div>

              {/* Hotspot 2: Vamana (Chest / Gastric) */}
              <div
                style={{ top: "34%", left: "48%" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-pointer z-20"
                onClick={() => handleHotspotClick("vamana")}
              >
                <div className="relative flex items-center justify-center">
                  <div className="size-10 rounded-full bg-primary/30 animate-ping absolute" />
                  <div className="size-11 rounded-full bg-background/90 border-2 border-primary text-primary shadow-lift flex items-center justify-center backdrop-blur-md transition-transform group-hover:scale-125">
                    <Droplets className="size-5" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-14 bg-background/95 border border-primary/30 text-foreground text-xs px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
                    <strong className="text-primary font-semibold">Vamana:</strong> Kapha Emesis
                  </div>
                </div>
              </div>

              {/* Hotspot 3: Virechana (Liver / Small Intestine) */}
              <div
                style={{ top: "48%", left: "54%" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-pointer z-20"
                onClick={() => handleHotspotClick("virechana")}
              >
                <div className="relative flex items-center justify-center">
                  <div className="size-10 rounded-full bg-amber-500/30 animate-ping absolute" />
                  <div className="size-11 rounded-full bg-background/90 border-2 border-amber-600 text-amber-600 shadow-lift flex items-center justify-center backdrop-blur-md transition-transform group-hover:scale-125">
                    <Flame className="size-5" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-14 bg-background/95 border border-amber-500/30 text-foreground text-xs px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
                    <strong className="text-amber-600 font-semibold">Virechana:</strong> Pitta & Liver Purge
                  </div>
                </div>
              </div>

              {/* Hotspot 4: Basti (Colon / Supreme Vata Seat) */}
              <div
                style={{ top: "62%", left: "47%" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-pointer z-20"
                onClick={() => handleHotspotClick("basti")}
              >
                <div className="relative flex items-center justify-center">
                  <div className="size-10 rounded-full bg-primary/30 animate-ping absolute" />
                  <div className="size-11 rounded-full bg-background/90 border-2 border-primary text-primary shadow-lift flex items-center justify-center backdrop-blur-md transition-transform group-hover:scale-125">
                    <Layers className="size-5" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-14 bg-background/95 border border-primary/30 text-foreground text-xs px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
                    <strong className="text-primary font-semibold">Basti:</strong> Ardha Chikitsa (Enema)
                  </div>
                </div>
              </div>

              {/* Hotspot 5: Raktamokshana (Blood / Micro-Vascular) */}
              <div
                style={{ top: "78%", left: "44%" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-pointer z-20"
                onClick={() => handleHotspotClick("raktamokshana")}
              >
                <div className="relative flex items-center justify-center">
                  <div className="size-10 rounded-full bg-rose-500/30 animate-ping absolute" />
                  <div className="size-11 rounded-full bg-background/90 border-2 border-rose-600 text-rose-600 shadow-lift flex items-center justify-center backdrop-blur-md transition-transform group-hover:scale-125">
                    <Activity className="size-5" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-14 bg-background/95 border border-rose-500/30 text-foreground text-xs px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
                    <strong className="text-rose-600 font-semibold">Raktamokshana:</strong> Leech Therapy
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Instruction Banner below Mandala */}
        <div className="text-center mt-6">
          <p className="text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider">
            ✦ Click any anatomical hotspot above to explore the clinical protocol and 3D simulation ✦
          </p>
        </div>
      </section>

      {/* 3. The Three Classical Phases (Purva, Pradhana, Paschat) */}
      <section className="mt-24 pt-12 border-t border-border/60">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider font-mono">
            Scientific Protocol
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            The Three Inviolable Stages of Cleansing
          </h2>
          <p className="text-sm text-muted-foreground">
            Charaka Samhita warns that administering expulsion without proper preparation is like trying to squeeze oil from a dry seed.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="p-8 rounded-[2rem] bg-secondary/30 border border-border/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-primary font-bold">PHASE 01</span>
              <Badge variant="outline" className="text-[10px]">Preparation</Badge>
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">
              Purvakarma (Oleation & Steam)
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Consists of <strong>Snehapana</strong> (graduated internal intake of medicated ghee) and <strong>Swedana</strong> (herbal sudation). Lipophilic molecules penetrate cell membranes, softening hardened toxins and steering them into the digestive canal.
            </p>
          </div>

          <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/25 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-accent font-bold">PHASE 02</span>
              <Badge className="text-[10px] bg-accent/20 text-accent-foreground border-accent/30">Main Expulsion</Badge>
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">
              Pradhanakarma (Expulsion)
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The execution of the designated Master Bio-purification (Vamana, Virechana, Basti, Nasya, or Raktamokshana) under round-the-clock pulse and metabolic monitoring inside specialized teak-wood Droni suites.
            </p>
          </div>

          <div className="p-8 rounded-[2rem] bg-secondary/30 border border-border/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground font-bold">PHASE 03</span>
              <Badge variant="outline" className="text-[10px]">Restoration</Badge>
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">
              Paschatkarma (Agni Rekindling)
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Post-cleanse, digestive fire is like a delicate spark. Through <strong>Samsarjana Krama</strong> (a graduated warm rice water to wholesome grain diet) and <strong>Rasayana</strong> herbs, tissues regenerate with fresh immunological vitality.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Living 3D Animated Therapy Stage Component */}
      <section className="mt-28">
        <Panchakarma3DStage />
      </section>

      {/* 5. Master Interactive 5 Therapies Explorer */}
      <section ref={deepDiveRef} className="mt-28 pt-12 border-t border-border/60 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="border-primary/30 text-primary text-xs">
            Clinical Protocols
          </Badge>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground">
            Explore Classical Protocols
          </h2>
          <p className="text-sm text-muted-foreground">
            Select any Shodhana therapy to view anatomical mechanisms, preparatory rules, and indications.
          </p>
        </div>

        {/* Therapy Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {Object.values(PANCHAKARMA_THERAPIES).map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedTherapyKey(item.id)}
              className={`rounded-full px-6 py-3 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                selectedTherapyKey === item.id
                  ? "bg-primary text-primary-foreground shadow-lift scale-105"
                  : "bg-background/80 text-muted-foreground hover:bg-secondary/70 border border-border"
              }`}
            >
              <span>{item.name.split("(")[0]}</span>
              <span className="font-serif italic text-xs opacity-75">({item.sanskrit.split(" ")[0]})</span>
            </button>
          ))}
        </div>

        {/* Active Therapy Deep-Dive Container */}
        <div className="rounded-[3rem] border border-border/80 bg-card p-8 sm:p-14 shadow-soft space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border/80 pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs px-3 py-1">
                  Target: {activeTherapy.targetDosha}
                </Badge>
                <Badge variant="outline" className="text-xs px-3 py-1">
                  Seat: {activeTherapy.governingOrgan}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                  <Clock className="size-3.5" /> Duration: {activeTherapy.duration}
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                {activeTherapy.name}
              </h2>
              <p className="font-serif italic text-lg text-primary/80">
                {activeTherapy.sanskrit} — {activeTherapy.meaning}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                {activeTherapy.summary}
              </p>
            </div>

            <Button asChild size="lg" className="rounded-full px-8 shrink-0 self-start lg:self-center shadow-lift">
              <Link to="/book">Schedule Initial Consultation</Link>
            </Button>
          </div>

          {/* Clinical Protocol Details Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Step-by-Step Procedure */}
            <div className="p-8 rounded-[2rem] bg-secondary/20 border border-border/80 space-y-5">
              <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2.5">
                <Activity className="size-5 text-primary" /> Step-by-Step Clinical Procedure
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground block mb-1">1. Preparatory Phase (Purvakarma):</strong>
                  <p>{activeTherapy.purvakarma}</p>
                </div>

                <div>
                  <strong className="text-foreground block mb-1">2. Main Shodhana Execution:</strong>
                  <ul className="space-y-2 pl-1">
                    {activeTherapy.procedure.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="size-2 rounded-full bg-primary shrink-0 mt-1.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <strong className="text-foreground block mb-1">3. Restoration & Diet (Paschatkarma):</strong>
                  <p>{activeTherapy.paschatkarma}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/60 text-xs text-foreground/80">
                <strong className="text-foreground">Key Classical Medicaments:</strong> {activeTherapy.herbalMedicaments}
              </div>
            </div>

            {/* Indications & Contraindications */}
            <div className="space-y-6">
              <div className="p-8 rounded-[2rem] bg-secondary/20 border border-border/80 space-y-4">
                <h4 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                  <ShieldCheck className="size-5 text-primary" /> Classical Clinical Indications
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                  {activeTherapy.indications.map((ind, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 rounded-[2rem] bg-destructive/5 border border-destructive/20 space-y-4">
                <h4 className="font-display text-lg font-bold text-destructive flex items-center gap-2">
                  <ShieldAlert className="size-5 text-destructive" /> Strict Contraindications
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  {activeTherapy.contraindications.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="size-1.5 rounded-full bg-destructive shrink-0 mt-2" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Inpatient Sanctuaries Section */}
      <section className="mt-28 pt-12 border-t border-border/60">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <Badge variant="outline" className="border-primary/30 text-primary text-xs">
            Inpatient Healing
          </Badge>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground">
            Classical Inpatient Sanctuaries
          </h2>
          <p className="text-base text-muted-foreground">
            Experience authentic Panchakarma in serene, bio-resonant environments in Kerala and the Rishikesh Himalayas.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {SANCTUARIES.map((sanctuary) => (
            <div key={sanctuary.id} className="p-8 rounded-[2.5rem] bg-card border border-border/80 space-y-4 shadow-soft">
              <div className="flex items-center justify-between">
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                  {sanctuary.tagline}
                </Badge>
                <span className="text-xs font-mono text-muted-foreground">{sanctuary.altitude}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                {sanctuary.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {sanctuary.description}
              </p>
              <div className="pt-2 text-xs text-foreground/80 space-y-1 font-mono">
                <p>📍 {sanctuary.location}</p>
                <p>🌿 Climate: {sanctuary.climate}</p>
              </div>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full w-full border-primary/30">
                  <Link to="/book">Request Inpatient Admission</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
