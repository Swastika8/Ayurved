import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & visiting hours — Ayurveda hospital" },
      {
        name: "description",
        content:
          "Hospital address, phone, email and OPD timings, plus a direct link to book an Ayurvedic consultation online.",
      },
      { property: "og:title", content: "Contact our Ayurveda hospital" },
      { property: "og:description", content: "Address, phone, email and OPD timings." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { hospital } = useSiteContent();

  const rows = [
    { icon: MapPin, label: "Address", value: hospital.address },
    { icon: Phone, label: "Phone", value: hospital.phone },
    { icon: Mail, label: "Email", value: hospital.email },
    { icon: Clock, label: "Hours", value: hospital.hours },
  ];

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="font-display text-4xl">Contact us</h1>
        <p className="mt-3 text-muted-foreground">
          For appointments, please book online — it reserves your slot and sends you a reminder.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {rows.map((row) => (
            <Card key={row.label}>
              <CardContent className="pt-6">
                <span className="grid size-9 place-items-center rounded-full bg-secondary text-primary">
                  <row.icon className="size-4" />
                </span>
                <h2 className="mt-3 text-base">{row.label}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{row.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="surface-card mt-8 flex flex-wrap items-center justify-between gap-4 p-6">
          <p className="text-sm text-muted-foreground">
            Emergencies are not handled online. Please call the hospital directly.
          </p>
          <Button asChild>
            <Link to="/book">Book an appointment</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
