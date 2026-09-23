import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDisease } from "@/lib/queries";

export const Route = createFileRoute("/diseases/$slug")({
  head: () => ({
    meta: [
      { title: "Condition overview — Ayurvedic Disease Library" },
      {
        name: "description",
        content:
          "Ayurvedic overview of the condition: dosha imbalance, symptoms, recommended therapies, diet and lifestyle guidance.",
      },
      { property: "og:title", content: "Condition overview — Ayurvedic Disease Library" },
      {
        property: "og:description",
        content: "Dosha imbalance, therapies, diet and lifestyle guidance.",
      },
    ],
  }),
  component: DiseaseDetail,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-lg">{title}</h2>
        <div className="mt-3 text-sm text-muted-foreground">{children}</div>
      </CardContent>
    </Card>
  );
}

function DiseaseDetail() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useDisease(slug);

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-14">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link to="/diseases">
            <ArrowLeft className="size-4" /> All conditions
          </Link>
        </Button>

        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {!isLoading && !data && (
          <p className="text-sm text-muted-foreground">
            We don't have an entry for this condition yet.
          </p>
        )}

        {data && (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-4xl">{data.name}</h1>
              {data.category && <Badge variant="secondary">{data.category}</Badge>}
            </div>
            {data.sanskrit_name && (
              <p className="mt-2 text-lg italic text-primary">{data.sanskrit_name}</p>
            )}
            <p className="mt-5 text-muted-foreground">{data.description}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Section title="Dosha imbalance">{data.dosha_imbalance}</Section>
              <Section title="Common symptoms">
                <ul className="space-y-1">
                  {data.symptoms.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="text-accent">•</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </Section>
              <Section title="Recommended therapies">
                <ul className="space-y-1">
                  {data.recommended_therapies.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="text-accent">•</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </Section>
              <Section title="Commonly used herbs">
                <div className="flex flex-wrap gap-2">
                  {data.herbs.map((h) => (
                    <Badge key={h} variant="outline">
                      {h}
                    </Badge>
                  ))}
                </div>
              </Section>
              <Section title="Diet guidance">{data.diet_guidance}</Section>
              <Section title="Lifestyle guidance">{data.lifestyle_guidance}</Section>
            </div>

            <div className="surface-card mt-10 flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <h2 className="text-lg">Treatment is always individual</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  This page is educational. A physician decides your actual therapies and medicines.
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild>
                  <Link to="/book">Book a consultation</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/panchakarma">See Panchakarma</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </PageShell>
  );
}
