import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTreatments } from "@/lib/queries";

export const Route = createFileRoute("/treatments")({
  head: () => ({
    meta: [
      { title: "Ayurvedic Treatments — Abhyanga, Shirodhara & more" },
      {
        name: "description",
        content:
          "Abhyanga, Shirodhara, Elakizhi, Netra Tarpana and Udvartana: durations, benefits and fees for each Ayurvedic therapy.",
      },
      { property: "og:title", content: "Ayurvedic Treatments" },
      {
        property: "og:description",
        content: "Durations, benefits and fees for each classical Ayurvedic therapy.",
      },
    ],
  }),
  component: Treatments,
});

function Treatments() {
  const { data, isLoading } = useTreatments();

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="font-display text-4xl">Treatments</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Every therapy is prescribed after a consultation, so the oils, herbs and duration suit your
          constitution and current condition.
        </p>

        {isLoading && <p className="mt-8 text-sm text-muted-foreground">Loading treatments…</p>}

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {(data ?? []).map((t) => (
            <Card key={t.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl">{t.name}</h2>
                  <span className="whitespace-nowrap text-sm text-muted-foreground">
                    {t.duration}
                  </span>
                </div>
                <p className="mt-2 text-sm text-primary">{t.summary}</p>
                <p className="mt-3 text-sm text-muted-foreground">{t.description}</p>
                {t.benefits.length > 0 && (
                  <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                    {t.benefits.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-accent">•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {t.price ? `₹${Number(t.price).toFixed(0)}` : "Fee on consultation"}
                  </span>
                  <Button asChild size="sm">
                    <Link to="/book">Book a consultation</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
