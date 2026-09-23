import { useState } from "react";
import { Sparkles, Play, Pause, Activity, ShieldCheck, ArrowRight, Layers, Droplets } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PANCHAKARMA_3D_OBJECTS, type TherapyVisualSpec } from "@/data/panchakarma";

export function Panchakarma3DStage() {
  const [selectedId, setSelectedId] = useState<string>("nasya");
  const [isAnimated, setIsAnimated] = useState<boolean>(true);

  const activeTherapy = PANCHAKARMA_3D_OBJECTS.find((t) => t.id === selectedId) || PANCHAKARMA_3D_OBJECTS[0]!;

  return (
    <div className="relative py-12">
      {/* Ambient Environmental Light Gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-primary/10 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] rounded-full bg-accent/15 blur-[120px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="size-3.5 text-accent" /> Living 3D Anatomical & Procedural Canvas
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            The Seven Sacred Instruments of Shodhana
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Inspect the physical and energetic artifacts of classical Panchakarma. Each therapy utilizes tailored organic media and precision anatomical vectors to dislodge vitiated Doshas.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start lg:self-end">
          <span className="text-xs text-muted-foreground font-mono">ANIMATION PHYSICS:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAnimated(!isAnimated)}
            className="rounded-full px-4 gap-2 text-xs border-primary/30 bg-background/80 backdrop-blur-sm"
          >
            {isAnimated ? (
              <>
                <Pause className="size-3 text-accent" /> Active Simulation
              </>
            ) : (
              <>
                <Play className="size-3 text-primary" /> Paused
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Therapy Selector: Sleek Organic Navigation Strip (No Boxy Cards) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 scrollbar-none border-b border-border/60">
        {PANCHAKARMA_3D_OBJECTS.map((therapy) => {
          const isSelected = therapy.id === selectedId;
          return (
            <button
              key={therapy.id}
              onClick={() => setSelectedId(therapy.id)}
              className={`px-5 py-3 rounded-full text-left transition-all duration-300 shrink-0 flex items-center gap-3 cursor-pointer ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-lift scale-[1.02]"
                  : "bg-background/70 text-muted-foreground hover:bg-secondary/60 hover:text-foreground border border-border/60"
              }`}
            >
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <div>
                <p className="font-display text-sm font-semibold leading-none">
                  {therapy.name.split(" ")[0]}
                </p>
                <p className={`text-[10px] mt-1 ${isSelected ? "text-primary-foreground/80" : "text-primary"}`}>
                  {therapy.dosha.split(" ")[0]}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Uncontained 3D Living Stage */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Massive Uncontained Floating 3D Living Visual (No Card Box!) */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[540px]">
          {/* Circular Decorative Backdrop Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[360px] sm:w-[440px] h-[360px] sm:h-[440px] rounded-full border border-primary/15 animate-[spin_45s_linear_infinite]" />
            <div className="absolute w-[290px] sm:w-[360px] h-[290px] sm:h-[360px] rounded-full border border-dashed border-accent/25 animate-[spin_30s_linear_infinite_reverse]" />
          </div>

          {/* Central 3D Asset: Floating with Organic Edge Blending */}
          <div className="relative w-full max-w-[420px] sm:max-w-[480px] aspect-square flex items-center justify-center animate-levitate">
            <div className="relative w-full h-full rounded-[3rem] overflow-hidden [mask-image:radial-gradient(circle_at_center,black_70%,transparent_100%)] shadow-2xl">
              <img
                src={activeTherapy.image}
                alt={activeTherapy.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* OVERLAID ANIMATED 3D PHYSICS LAYERS */}
              {isAnimated && (
                <>
                  {/* NASYA: Oil Droplet Falling Physics */}
                  {activeTherapy.animationType === "nasya" && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-[28%] left-[50%] -translate-x-1/2">
                        <div className="size-4 rounded-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 shadow-lg shadow-amber-500/50 animate-nasya-drop" />
                      </div>
                      <div className="absolute top-[37%] left-[50%] -translate-x-1/2 size-7 rounded-full border border-amber-300/80 animate-oil-ripple" />
                    </div>
                  )}

                  {/* SNEHAPAN: Liquid Swirl & Refraction */}
                  {activeTherapy.animationType === "snehapan" && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="size-40 rounded-full border border-amber-400/25 bg-amber-400/10 blur-xs animate-liquid-swirl" />
                      <div className="absolute size-28 rounded-full border border-primary/20 animate-prana-pulse" />
                    </div>
                  )}

                  {/* SWEDAN: Curving Rising Steam Wisps */}
                  {activeTherapy.animationType === "swedan" && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-[18%] left-[48%] -translate-x-1/2">
                        <svg className="w-14 h-24 text-accent/70 animate-steam-1" viewBox="0 0 40 80" fill="none">
                          <path
                            d="M20 70 C10 50, 30 30, 20 10"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="absolute top-[15%] left-[55%] -translate-x-1/2">
                        <svg className="w-12 h-20 text-accent/50 animate-steam-2" viewBox="0 0 40 80" fill="none">
                          <path
                            d="M15 65 C25 45, 10 25, 20 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* ABHYANG: Prana Radiance */}
                  {activeTherapy.animationType === "abhyang" && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="size-36 rounded-full bg-accent/20 blur-xl animate-prana-pulse" />
                      <div className="size-52 rounded-full border border-accent/30 animate-pulse" />
                    </div>
                  )}

                  {/* VASTI: Fluid Resonance Flow */}
                  {activeTherapy.animationType === "vasti" && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-[48%] left-[50%] -translate-x-1/2 size-20 rounded-full border border-primary/30 animate-oil-ripple" />
                      <div className="absolute top-[52%] left-[50%] -translate-x-1/2 size-32 rounded-full border border-accent/25 animate-oil-ripple [animation-delay:0.7s]" />
                    </div>
                  )}

                  {/* VIRECHAN: Botanical Vortex */}
                  {activeTherapy.animationType === "virechan" && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="size-48 rounded-full border-2 border-dashed border-emerald-500/30 animate-[spin_12s_linear_infinite]" />
                    </div>
                  )}

                  {/* VAMAN: Decoction Dispersion */}
                  {activeTherapy.animationType === "vaman" && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="size-44 rounded-full bg-emerald-500/10 blur-xl animate-pulse" />
                      <div className="size-32 rounded-full border border-emerald-400/40 animate-liquid-swirl" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: In-depth Clinical & Procedural Anatomy */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary text-primary-foreground text-xs px-3 py-1">
                Target: {activeTherapy.dosha}
              </Badge>
              <Badge variant="outline" className="border-border text-xs">
                Dhatu: {activeTherapy.targetDhatu}
              </Badge>
              <Badge variant="outline" className="border-border text-xs">
                Srotas: {activeTherapy.srotas}
              </Badge>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              {activeTherapy.name}
            </h3>
            <p className="font-serif italic text-lg text-primary/80">
              "{activeTherapy.sanskrit}"
            </p>
          </div>

          <p className="text-base text-muted-foreground leading-relaxed">
            {activeTherapy.clinicalPurpose}
          </p>

          {/* Three Classical Steps (Purva, Pradhana, Paschat) */}
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border/70 space-y-1">
              <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-wider block">
                1. Purvakarma (Preparation)
              </span>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                {activeTherapy.purvakarma}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-1">
              <span className="text-[11px] font-mono font-bold text-accent uppercase tracking-wider block">
                2. Pradhanakarma (Core Shodhana Procedure)
              </span>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                {activeTherapy.pradhanakarma}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/30 border border-border/70 space-y-1">
              <span className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-wider block">
                3. Paschatkarma (Post-Care & Agni Rebuilding)
              </span>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                {activeTherapy.paschatkarma}
              </p>
            </div>
          </div>

          {/* CTA Row */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 shadow-lift">
              <Link to="/book">
                Book Personalized Protocol <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
            <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-mono">
              <ShieldCheck className="size-4 text-primary" /> Supervised by Senior Vaidyas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
