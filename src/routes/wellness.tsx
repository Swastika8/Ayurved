import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sun,
  Moon,
  Compass,
  Utensils,
  Flower2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  Droplets,
  Flame,
  Wind,
  AlertTriangle,
  Clock,
} from "lucide-react";
import {
  DAILY_DINACHARYA,
  SEASONAL_RITUCHARYA,
  SIX_TASTES,
  VIRUDDHA_AHARA,
  DOSHA_YOGA,
} from "@/data/wellness";

export const Route = createFileRoute("/wellness")({
  head: () => ({
    meta: [
      { title: "Wellness & Holistic Living — Dinacharya, Ahara & Ritucharya | Aarogya Hospital" },
      {
        name: "description",
        content:
          "Explore classical Ayurvedic wellness routines: Dinacharya daily sacred rhythms, Ritucharya seasonal detox, Ahara nutritional philosophy, and Dosha-tailored yoga.",
      },
    ],
  }),
  component: WellnessPage,
});

export function WellnessPage() {
  const [selectedSeason, setSelectedSeason] = useState<string>("vasanta");

  const currentSeasonalData = SEASONAL_RITUCHARYA[selectedSeason] || SEASONAL_RITUCHARYA.vasanta!;

  return (
    <PageShell>
      {/* 1. FULL-WIDTH ATMOSPHERIC SANCTUARY HERO ENVIRONMENT (No Small Card Box!) */}
      <section className="relative -mt-6 sm:-mt-10 -mx-4 sm:-mx-8 lg:-mx-12 overflow-hidden min-h-[75vh] lg:min-h-[82vh] flex items-center justify-start border-b border-border/70">
        {/* Full Environmental 3D Visual Asset Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/media/wellness-scene.jpg"
            alt="Ayurvedic Sanctuary Living Environment"
            className="w-full h-full object-cover object-right lg:object-center filter saturate-[1.12] contrast-[1.08] brightness-[0.96]"
          />
          {/* Transparent Dark Scrim: ZERO whitish hue, letting lush sanctuary greens & warm golds glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 pointer-events-none" />
        </div>

        {/* Ambient Warm Golden Glows */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] rounded-full bg-primary/15 blur-[130px] pointer-events-none z-0" />

        {/* Hero Content Floating Over Atmospheric Environment */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="rounded-full border-white/20 bg-black/40 backdrop-blur-md text-[#e6ca65] px-3.5 py-1 text-xs"
              >
                <Sparkles className="size-3.5 text-accent mr-1.5" /> Living Ayurvedic Sanctuary Philosophy
              </Badge>
              <Badge className="bg-[#d4af37]/25 text-[#f3e5ab] border border-[#d4af37]/35 rounded-full text-xs backdrop-blur-md">
                Dinacharya & Ritucharya
              </Badge>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              The Living Rhythm of <br />
              <span className="italic text-[#e6ca65] font-serif">Holistic Wellness</span>
            </h1>

            <p className="font-serif italic text-lg sm:text-2xl text-[#f3e5ab] leading-snug">
              “When diet is wrong, medicine is of no use. <br className="hidden sm:inline" />
              When diet is correct, medicine is of no need.”
            </p>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Wellness in Ayurveda is not a punitive temporary cleanse. It is the exquisite daily synchronization between your inner metabolic fire (<em className="text-white">Agni</em>) and the planetary circadian clock (<em className="text-white">Brahma Muhurta</em> through <em className="text-white">Nidra</em>).
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 shadow-lift gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                <Link to="/book">
                  <Calendar className="size-4" /> Book Lifestyle Assessment
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-7 border-white/30 text-white bg-black/35 backdrop-blur-md hover:bg-black/55 hover:text-white">
                <Link to="/contact">Explore Sanctuary Stays</Link>
              </Button>
            </div>

            {/* Micro Circadian Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/60 max-w-lg">
              <div className="bg-background/60 backdrop-blur-md p-3 rounded-2xl border border-border/60">
                <span className="font-display text-lg font-bold text-foreground block">6 Rasas</span>
                <span className="text-[11px] text-muted-foreground">Every Meal Complete</span>
              </div>
              <div className="bg-background/60 backdrop-blur-md p-3 rounded-2xl border border-border/60">
                <span className="font-display text-lg font-bold text-primary block">Circadian</span>
                <span className="text-[11px] text-muted-foreground">Solar Agni Timing</span>
              </div>
              <div className="bg-background/60 backdrop-blur-md p-3 rounded-2xl border border-border/60">
                <span className="font-display text-lg font-bold text-accent block">5 Ritus</span>
                <span className="text-[11px] text-muted-foreground">Seasonal Transitions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Ayurvedic Lifestyle Architecture Tabs */}
      <section className="mt-20">
        <Tabs defaultValue="dinacharya" className="space-y-14">
          <div className="flex justify-center">
            <TabsList className="rounded-full p-1.5 bg-secondary/60 border border-border h-auto flex flex-wrap justify-center gap-1">
              <TabsTrigger value="dinacharya" className="rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold">
                <Sun className="size-4 mr-2 text-accent" /> Dinacharya (Daily Routine)
              </TabsTrigger>
              <TabsTrigger value="ritucharya" className="rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold">
                <Compass className="size-4 mr-2 text-primary" /> Ritucharya (Seasonal Cycles)
              </TabsTrigger>
              <TabsTrigger value="ahara" className="rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold">
                <Utensils className="size-4 mr-2 text-accent" /> Ahara (6 Tastes Nutrition)
              </TabsTrigger>
              <TabsTrigger value="yoga" className="rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold">
                <Flower2 className="size-4 mr-2 text-primary" /> Yoga & Dosha Alignment
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: Dinacharya Daily Routine */}
          <TabsContent value="dinacharya" className="space-y-12 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                Solar Synchronization
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Dinacharya: Aligning with the Circadian Clock
              </h2>
              <p className="text-sm text-muted-foreground">
                By synchronizing bodily activities with biological Circadian cycles, you optimize endocrine secretions, prevent metabolic toxicity, and sustain ageless cellular vigor.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {DAILY_DINACHARYA.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-[2rem] bg-card border border-border/80 hover:border-primary/40 transition-all duration-300 shadow-soft space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-primary font-semibold flex items-center gap-1.5">
                        <Clock className="size-3.5" /> {item.time}
                      </span>
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {item.doshaInfluence.split(" ")[0]}
                      </Badge>
                    </div>

                    <h3 className="font-display text-xl font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="font-serif italic text-xs text-primary/80">
                      {item.sanskrit}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/60 text-[11px] font-mono text-foreground/80">
                    <strong className="text-accent">Prescription:</strong> {item.action}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* TAB 2: Ritucharya Seasonal Cycles */}
          <TabsContent value="ritucharya" className="space-y-12 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                Cosmic Adaptability
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Ritucharya: Seasonal Preservation & Transition
              </h2>
              <p className="text-sm text-muted-foreground">
                As the seasons shift from solar northern ascent (Adana Kala) to lunar release (Visarga Kala), the body requires precise dietary modifications to prevent Dosha accumulation.
              </p>
            </div>

            {/* Season Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {Object.values(SEASONAL_RITUCHARYA).map((season) => (
                <button
                  key={season.id}
                  onClick={() => setSelectedSeason(season.id)}
                  className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedSeason === season.id
                      ? "bg-primary text-primary-foreground shadow-lift scale-105"
                      : "bg-background/80 text-muted-foreground hover:bg-secondary/70 border border-border"
                  }`}
                >
                  {season.name.split(" ")[0]} ({season.months.split(" ")[0]})
                </button>
              ))}
            </div>

            {/* Active Season Card */}
            <div className="rounded-[3rem] border border-border/80 bg-card p-8 sm:p-14 shadow-soft space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border/80 pb-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-primary font-bold">{currentSeasonalData.months}</span>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                    {currentSeasonalData.name}
                  </h3>
                  <p className="font-serif italic text-base text-primary/80">
                    {currentSeasonalData.sanskritSeason}
                  </p>
                </div>
                <Badge className="bg-accent/15 text-accent-foreground border-accent/30 text-sm px-4 py-1.5 self-start lg:self-center">
                  Aggravated: {currentSeasonalData.doshaAggravated}
                </Badge>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed">
                {currentSeasonalData.description}
              </p>

              <div className="grid gap-6 md:grid-cols-3 pt-2">
                <div className="p-6 rounded-2xl bg-secondary/30 border border-border/80 space-y-2">
                  <h4 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                    <Utensils className="size-4 text-primary" /> Seasonal Diet (Ahara)
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {currentSeasonalData.diet}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-secondary/30 border border-border/80 space-y-2">
                  <h4 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                    <Compass className="size-4 text-accent" /> Recommended Regimen (Vihara)
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {currentSeasonalData.lifestyle}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
                  <h4 className="font-display text-base font-bold text-primary flex items-center gap-2">
                    <Sparkles className="size-4 text-accent" /> Hospital Shodhana Therapy
                  </h4>
                  <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                    {currentSeasonalData.recommendedTherapy}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: Ahara (Nutrition & 6 Tastes) */}
          <TabsContent value="ahara" className="space-y-12 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                Shad Rasa
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                The Science of Six Tastes (Shad Rasa)
              </h2>
              <p className="text-sm text-muted-foreground">
                An authentic Ayurvedic meal incorporates all six tastes to satisfy physical nourishment, neuro-chemical satiety, and metabolic digestion.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SIX_TASTES.map((taste, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-card border border-border/80 shadow-soft space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs font-mono">
                      {taste.elements}
                    </Badge>
                    <span className="font-serif italic text-xs text-primary">{taste.sanskrit}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {taste.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {taste.action}
                  </p>
                  <div className="pt-2 border-t border-border/60 text-xs text-foreground/80 space-y-1">
                    <p><strong>Natural Sources:</strong> {taste.sources}</p>
                    <p className="text-primary font-medium"><strong>Dosha Effect:</strong> {taste.doshaEffect}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Incompatible Foods (Viruddha Ahara) Warning Strip */}
            <div className="rounded-[2.5rem] bg-destructive/5 border border-destructive/20 p-8 sm:p-10 space-y-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="size-6 text-destructive shrink-0" />
                <div>
                  <h3 className="font-display text-xl font-bold text-destructive">
                    Viruddha Ahara: Incompatible Food Combinations
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Classical texts identify food combinations that ferment toxic free-radicals (Gara Visha) in the gut.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {VIRUDDHA_AHARA.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-background/80 border border-destructive/15 space-y-1.5">
                    <span className="text-xs font-bold text-foreground block">{item.combination}</span>
                    <p className="text-[11px] text-muted-foreground">{item.reason}</p>
                    <span className="text-[10px] font-mono text-destructive block">Consequence: {item.hazard}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 4: Yoga & Dosha Alignment */}
          <TabsContent value="yoga" className="space-y-12 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                Asana & Pranayama
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Dosha-Specific Yoga Therapy
              </h2>
              <p className="text-sm text-muted-foreground">
                Yoga and Ayurveda are sister sciences. Asanas are prescribed therapeutically based on an individual's constitution and current Vikriti.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {DOSHA_YOGA.map((yoga, idx) => (
                <div key={idx} className="p-8 rounded-[2.5rem] bg-card border border-border/80 shadow-soft space-y-5">
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                    {yoga.dosha} Balancing
                  </Badge>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {yoga.focus}
                  </h3>
                  <div className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                    <div>
                      <strong className="text-foreground block mb-1">Recommended Asanas:</strong>
                      <p>{yoga.recommendedAsanas.join(", ")}</p>
                    </div>
                    <div>
                      <strong className="text-foreground block mb-1">Pranayama Practice:</strong>
                      <p>{yoga.pranayama}</p>
                    </div>
                    <div>
                      <strong className="text-foreground block mb-1">Pacing & Temperature:</strong>
                      <p>{yoga.pacing}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* 3. Personalized Assessment CTA */}
      <section className="mt-28 p-10 sm:p-16 rounded-[3rem] bg-primary text-primary-foreground text-center space-y-6 shadow-lift">
        <h2 className="font-display text-3xl sm:text-5xl font-bold max-w-2xl mx-auto">
          Begin Your Tailored Dinacharya Protocol
        </h2>
        <p className="text-base text-primary-foreground/85 max-w-xl mx-auto leading-relaxed">
          Receive a pulse-diagnosis-based daily routine, custom herbal tea blends, and seasonal nutrition guidelines directly from our senior Vaidyas.
        </p>
        <Button asChild size="lg" variant="secondary" className="rounded-full px-10 font-bold text-foreground shadow-lift">
          <Link to="/book">Schedule Physician Assessment</Link>
        </Button>
      </section>
    </PageShell>
  );
}
