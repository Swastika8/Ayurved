import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Clock, ClipboardList, Play, Pause } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TherapyAnimation, type TherapyVariant } from "@/components/panchakarma/TherapyAnimation";
import { usePanchakarma, type PanchakarmaStep } from "@/lib/queries";

export const Route = createFileRoute("/panchakarma")({
  head: () => ({
    meta: [
      { title: "Panchakarma — Vamana, Virechana, Basti, Nasya, Raktamokshana" },
      {
        name: "description",
        content:
          "Step-by-step animated explainers of the five Panchakarma therapies with benefits, duration and preparation notes.",
      },
      { property: "og:title", content: "Panchakarma explained, step by step" },
      {
        property: "og:description",
        content: "Animated walkthroughs of Vamana, Virechana, Basti, Nasya and Raktamokshana.",
      },
    ],
  }),
  component: Panchakarma,
});

function StepPlayer({ steps, variant }: { steps: PanchakarmaStep[]; variant: TherapyVariant }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing || steps.length === 0) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % steps.length), 3200);
    return () => clearInterval(timer);
  }, [playing, steps.length]);

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,240px)_1fr]">
      <div>
        <TherapyAnimation variant={variant} />
        <div className="mt-3 flex items-center justify-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setPlaying((p) => !p)}>
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            {playing ? "Pause" : "Play"}
          </Button>
        </div>
      </div>

      <ol className="space-y-2">
        {steps.map((step, i) => {
          const active = i === index;
          return (
            <li key={step.title}>
              <button
                type="button"
                onClick={() => {
                  setIndex(i);
                  setPlaying(false);
                }}
                className={`w-full rounded-lg border p-4 text-left transition-colors ${
                  active
                    ? "border-primary/50 bg-secondary"
                    : "border-border bg-transparent hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="font-medium">{step.title}</span>
                </div>
                {active && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 pl-10 text-sm text-muted-foreground"
                  >
                    {step.detail}
                  </motion.p>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Panchakarma() {
  const { data, isLoading } = usePanchakarma();

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="font-display text-4xl">Panchakarma</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Five classical cleansing therapies. Each one has a preparation phase, the main procedure
          and a carefully graded recovery — press through the steps to see how it unfolds.
        </p>

        {isLoading && <p className="mt-10 text-sm text-muted-foreground">Loading therapies…</p>}

        <div className="mt-10 space-y-10">
          {(data ?? []).map((therapy) => {
            const steps = (therapy.steps as unknown as PanchakarmaStep[]) ?? [];
            return (
              <Card key={therapy.id} id={therapy.slug}>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h2 className="font-display text-2xl">{therapy.name}</h2>
                    {therapy.sanskrit_name && (
                      <span className="text-lg text-primary">{therapy.sanskrit_name}</span>
                    )}
                    <Badge variant="secondary" className="ml-auto gap-1">
                      <Clock className="size-3" /> {therapy.duration}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-primary">{therapy.tagline}</p>
                  <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
                    {therapy.description}
                  </p>

                  <div className="mt-6">
                    <StepPlayer steps={steps} variant={therapy.slug as TherapyVariant} />
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-border p-4">
                      <h3 className="text-base">Benefits</h3>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {therapy.benefits.map((b) => (
                          <li key={b} className="flex gap-2">
                            <span className="text-accent">•</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg border border-border p-4">
                      <h3 className="flex items-center gap-2 text-base">
                        <ClipboardList className="size-4 text-primary" /> Preparation
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {therapy.preparation_notes}
                      </p>
                    </div>
                  </div>

                  <Button asChild className="mt-6" size="sm">
                    <Link to="/book">Book a consultation for {therapy.name}</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="mt-10 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-muted-foreground">
          Panchakarma is only started after a physician confirms you are fit for it. Some therapies
          are unsuitable during pregnancy, in anaemia and in several other conditions.
        </p>
      </div>
    </PageShell>
  );
}
