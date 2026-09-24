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
import { CLASSICAL_TREATMENTS, DOSHA_METADATA, type ClassicalTherapyItem } from "@/data/treatments";
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

export function TreatmentsPage() {
  const [activeDosha, setActiveDosha] = useState<"All" | "Vata" | "Pitta" | "Kapha" | "Tridosha">("All");

  const filteredTherapies = useMemo(() => {
    if (activeDosha === "All") return CLASSICAL_TREATMENTS;
    return CLASSICAL_TREATMENTS.filter((t) => t.dosha === activeDosha);
  }, [activeDosha]);

  const doshaMeta = DOSHA_METADATA;

  return (
    <PageShell>
      {/* IMMERSIVE FULL-SCREEN ATMOSPHERIC APOTHECARY HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden py-16 lg:py-24 border-b border-border">
        {/* Full-Screen Environmental Background Covering Entire Viewport */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <video
            src="/media/treatments.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center filter saturate-[1.12] contrast-[1.08] brightness-[0.96]"
          />
          {/* Transparent Dark Scrim: ZERO whitish milky fog, letting the amber medicated oils & bronze glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 w-full">
          <div className="max-w-2xl lg:max-w-3xl space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="rounded-full border-white/20 text-[#e6ca65] px-3.5 py-1 text-xs bg-black/40 backdrop-blur-md">
                <Sparkles className="size-3.5 text-accent mr-1.5" /> Authentic Shirodhara & Droni Chikitsa
              </Badge>
              <Badge className="bg-[#d4af37]/25 text-[#f3e5ab] border border-[#d4af37]/35 rounded-full text-xs backdrop-blur-md">
                Lineage Formulations
              </Badge>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance-display">
              Classical Ayurvedic <br />
              <span className="font-serif italic font-normal text-[#e6ca65]">Therapies</span> & Droni Rituals
            </h1>

            <p className="font-serif italic text-lg sm:text-2xl text-[#f3e5ab] leading-relaxed max-w-xl">
              “Yatha Ksheeram Samasthepi Dehe Vyapi Pravartate, <br className="hidden sm:inline" />
              Tatha Tailam Guneh Srotamsyanupravishati.”
              <span className="block text-xs font-sans not-italic text-white/80 mt-1.5">
                — Just as pure essence permeates every cell, medicated warm oils permeate the microscopic tissue channels (Srotas).
              </span>
            </p>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl">
              Ayurveda never treats an isolated symptom. Every oil formulation, massage stroke velocity, and thermal steam bath is calibrated strictly to your constitutional Dosha disequilibrium — Vata, Pitta, or Kapha.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 shadow-lift bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                <Link to="/book">Consult a Vaidya for Prescription</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-7 border-white/30 text-white bg-black/35 backdrop-blur-md hover:bg-black/55 hover:text-white">
                <a href="#dosha-catalog">Browse Dosha Catalog</a>
              </Button>
            </div>

            {/* Micro Feature Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20 max-w-md">
              <div>
                <span className="font-display text-2xl font-bold text-white block">100%</span>
                <span className="text-xs text-white/75">Wild-Harvested Herbs</span>
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-[#e6ca65] block">Single-Wood</span>
                <span className="text-xs text-white/75">Teak Droni Beds</span>
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-accent block">Kerala</span>
                <span className="text-xs text-white/75">Tandem Therapists</span>
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
