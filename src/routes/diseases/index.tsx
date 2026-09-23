import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDiseases } from "@/lib/queries";

export const Route = createFileRoute("/diseases/")({
  head: () => ({
    meta: [
      { title: "Ayurvedic Disease Library — Conditions & Therapies" },
      {
        name: "description",
        content:
          "Search conditions and read an Ayurvedic overview: dosha imbalance, recommended therapies, diet and lifestyle guidance.",
      },
      { property: "og:title", content: "Ayurvedic Disease Library" },
      {
        property: "og:description",
        content: "Dosha imbalance, therapies, diet and lifestyle guidance for common conditions.",
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
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="font-display text-4xl">Disease information</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Type a condition or a symptom, or pick one from the list, to see how Ayurveda understands
          and treats it.
        </p>

        <div className="relative mt-8 max-w-xl">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="e.g. arthritis, migraine, bloating"
            className="pl-9"
            aria-label="Search conditions"
          />
        </div>

        {isLoading && <p className="mt-8 text-sm text-muted-foreground">Loading conditions…</p>}
        {!isLoading && results.length === 0 && (
          <p className="mt-8 text-sm text-muted-foreground">
            No condition matches that yet. Try another word, or ask our assistant.
          </p>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((d) => (
            <Link key={d.id} to="/diseases/$slug" params={{ slug: d.slug }}>
              <Card className="h-full transition-shadow hover:shadow-[var(--shadow-lift)]">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-lg">{d.name}</h2>
                    {d.category && (
                      <Badge variant="secondary" className="shrink-0">
                        {d.category}
                      </Badge>
                    )}
                  </div>
                  {d.sanskrit_name && (
                    <p className="mt-1 text-sm italic text-primary">{d.sanskrit_name}</p>
                  )}
                  <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{d.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
