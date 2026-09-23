import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useDoctors } from "@/lib/queries";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About our Ayurveda hospital — care, team and approach" },
      {
        name: "description",
        content:
          "Who we are, how we practise classical Ayurveda, and the physicians who look after our inpatient and outpatient care.",
      },
      { property: "og:title", content: "About our Ayurveda hospital" },
      {
        property: "og:description",
        content: "Our approach to classical Ayurveda and the physicians behind it.",
      },
    ],
  }),
  component: About,
});

function About() {
  const { hospital } = useSiteContent();
  const { data: doctors } = useDoctors();

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-14">
        <h1 className="font-display text-4xl">About {hospital.name}</h1>
        <p className="mt-4 text-muted-foreground">{hospital.about}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Consult", text: "Dosha assessment, pulse reading and a written plan." },
            { title: "Treat", text: "Panchakarma and therapies in dedicated treatment rooms." },
            { title: "Sustain", text: "Diet, routine and follow-ups to hold the improvement." },
          ].map((s) => (
            <Card key={s.title}>
              <CardContent className="pt-6">
                <h2 className="text-lg">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl">Our physicians</h2>
        <div className="mt-4 space-y-3">
          {(doctors ?? []).map((d) => (
            <Card key={d.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-6">
                <div>
                  <h3 className="text-lg">{d.full_name}</h3>
                  <p className="text-sm text-primary">{d.speciality}</p>
                  <p className="text-xs text-muted-foreground">{d.qualifications}</p>
                </div>
                <Button asChild size="sm" variant="secondary">
                  <Link to="/book">Book</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Text marked [PLACEHOLDER] is sample content. Send us your real hospital story, timings and
          team details and we'll put them in.
        </p>
      </div>
    </PageShell>
  );
}
