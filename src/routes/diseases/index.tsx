import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles, BookOpen, Activity, ArrowRight, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDiseases } from "@/lib/queries";
import { SymptomDiseaseLookup } from "@/components/ayurveda/SymptomDiseaseLookup";

export const Route = createFileRoute("/diseases/")({
  head: () => ({
    meta: [
      { title: "Ayurvedic Disease & Roganidana Index — Conditions & Shodhana Therapies | Aarogya Hospital" },
      {
        name: "description",
        content:
          "Search conditions and explore classical Ayurvedic Roganidana: Dosha imbalances, root cause pathophysiology, recommended therapies, and dietary protocols.",
      },
      { property: "og:title", content: "Ayurvedic Disease & Roganidana Library — Aarogya Hospital" },
      {
        property: "og:description",
        content: "Root cause pathophysiology, dosha imbalance, and classical Shodhana therapies for chronic ailments.",
      },
    ],
  }),
  component: DiseaseLibrary,
});

function DiseaseLibrary() {
  const { data, isLoading } = useDiseases();
  const [term, setTerm] = useState("");

  const results = useMemo(() => {
    const list = data ?? [];
    const q = term.trim().toLowerCase();
    if (!q) return list;
    return list.filter((d) =>
      [d.name, d.sanskrit_name ?? "", d.category ?? "", ...d.symptoms]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [data, term]);

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
        {/* Full-Bleed 3D Roganidana Pathology Stage */}
        <section className="relative -mt-6 sm:-mt-10 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden min-h-[70vh] flex items-center border-b border-border/70 py-16 px-6 sm:px-12">
          {/* Full Environmental 3D Asset */}
          <div className="absolute inset-0 z-0">
            <img
              src="/media/disease_lookup.jpg"
              alt="3D Ayurvedic Disease and Anatomy Lookup"
              className="w-full h-full object-cover object-right lg:object-center filter brightness-[0.88] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30 lg:to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="leaf-pill px-3.5 py-1 text-xs text-primary border-primary/20 bg-background/80 backdrop-blur-md">
                <Sparkles className="size-3 mr-1 text-accent" />
                Roganidana & Samprapti Explorer
              </Badge>
              <Badge className="bg-primary/20 text-primary border-primary/30 rounded-full text-xs backdrop-blur-md">
                Classical Pathology
              </Badge>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance-display leading-[1.15]">
              Ayurvedic <span className="italic text-primary font-serif">Disease Library</span> & Roganidana
            </h1>

            <p className="font-serif italic text-lg sm:text-xl text-primary/90">
              “Nidane Poorvaroopani Roopaanyupashayastatha, <br className="hidden sm:inline" />
              Sampraptischaiva Vigneyo Roganam Bodhaka Gano.”
            </p>
            <p className="text-xs font-sans text-muted-foreground italic">
              — The 5 Diagnostic Pillars (Pancha Nidana): Etiology, Premonitory Signs, Manifest Symptoms, Exploratory Therapy, and Pathogenesis.
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Ayurveda classifies disease not as a static label, but as a living sequence of metabolic disequilibrium (*Samprapti*) beginning in the digestive tract (*Agni*) and migrating through the subtle tissue channels (*Srotas*).
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 shadow-lift">
                <Link to="/book">Consult a Diagnostician</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6 bg-background/80 backdrop-blur-sm">
                <a href="#quick-lookup">Interactive Symptom Lookup</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Interactive Symptom & Disease Finder */}
        <section id="quick-lookup" className="scroll-mt-24 space-y-6">
          <SymptomDiseaseLookup />
        </section>

        {/* Comprehensive Conditions Directory */}
        <section className="space-y-8 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                All Documented Clinical Conditions
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Filter conditions by English name, Sanskrit classification, or symptom profile
              </p>
            </div>

            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search arthritis, GERD, eczema…"
                className="pl-10 rounded-full bg-card"
                aria-label="Search conditions"
              />
            </div>
          </div>

          {isLoading && <p className="text-sm text-muted-foreground">Connecting to clinical conditions roster…</p>}
          {!isLoading && results.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No condition matches that query. Try another keyword or browse the interactive lookup above.
            </p>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((d) => (
              <Link key={d.id} to="/diseases/$slug" params={{ slug: d.slug }}>
                <div className="leaf-card p-6 h-full flex flex-col justify-between hover:border-primary/50 hover:shadow-lift transition-all space-y-4 group">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {d.name}
                      </h3>
                      {d.category && (
                        <Badge variant="secondary" className="shrink-0 text-[10px]">
                          {d.category}
                        </Badge>
                      )}
                    </div>
                    {d.sanskrit_name && (
                      <p className="text-xs font-serif italic text-primary/80">{d.sanskrit_name}</p>
                    )}
                    <p className="line-clamp-3 text-xs text-muted-foreground leading-relaxed pt-1">
                      {d.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                    <span>Explore Pathology & Protocol</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
