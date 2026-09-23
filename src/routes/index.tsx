import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, HeartPulse, Droplets, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useDoctors, useTreatments } from "@/lib/queries";
import heroImage from "@/assets/hero-ayurveda.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aarogya Ayurveda Hospital — Panchakarma & Ayurvedic Care" },
      {
        name: "description",
        content:
          "Classical Panchakarma therapies, Ayurvedic consultations and a searchable disease library. Book a consultation with our physicians online.",
      },
      { property: "og:title", content: "Aarogya Ayurveda Hospital" },
      {
        property: "og:description",
        content: "Classical Panchakarma, herbal medicine and paperless patient records.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { hospital, announcement } = useSiteContent();
  const { data: treatments } = useTreatments();
  const { data: doctors } = useDoctors();

  return (
    <PageShell>
      {announcement?.active && (
        <div className="bg-primary text-primary-foreground">
          <p className="mx-auto max-w-6xl px-4 py-2 text-center text-sm">{announcement.text}</p>
        </div>
      )}

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <Badge variant="secondary" className="mb-5 gap-1">
              <Leaf className="size-3" /> Rooted in classical Ayurveda
            </Badge>
            <h1 className="text-balance-display font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              {hospital.tagline}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              Panchakarma, herbal medicine and lifestyle counselling under one roof — with your
              prescriptions, visit notes and receipts kept paperless in your own account.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/book">
                  Book a consultation <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/diseases">Explore the disease library</Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                { value: "5", label: "Panchakarma therapies" },
                { value: "20+", label: "Conditions covered" },
                { value: "Daily", label: "OPD & therapy slots" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-display text-2xl">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Panchakarma treatment room with wooden therapy table, brass oil vessels and fresh herbs"
              width={1600}
              height={1008}
              className="w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-lift)]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Droplets,
              title: "Authentic Panchakarma",
              text: "All five classical therapies, performed by trained therapists under physician supervision.",
            },
            {
              icon: HeartPulse,
              title: "Root-cause consultation",
              text: "Dosha assessment, pulse reading and a plan covering medicine, diet and daily routine.",
            },
            {
              icon: ShieldCheck,
              title: "Paperless records",
              text: "Prescriptions, visit notes and payment receipts always available in your account.",
            },
          ].map((item) => (
            <Card key={item.title} className="border-border/80">
              <CardContent className="pt-6">
                <span className="grid size-10 place-items-center rounded-full bg-secondary text-primary">
                  <item.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl">Treatments</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Classical therapies offered daily at the hospital.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/treatments">
              All treatments <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(treatments ?? []).slice(0, 6).map((t) => (
            <Card key={t.id}>
              <CardContent className="pt-6">
                <h3 className="text-lg">{t.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.summary}</p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {t.duration}
                  {t.price ? ` · ₹${Number(t.price).toFixed(0)}` : ""}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl">Our physicians</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Placeholder profiles — send us the real names, photos and fees and they update instantly
          from the admin panel.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(doctors ?? []).map((d) => (
            <Card key={d.id}>
              <CardContent className="pt-6">
                <h3 className="text-lg">{d.full_name}</h3>
                <p className="text-sm text-primary">{d.speciality}</p>
                <p className="mt-2 text-xs text-muted-foreground">{d.qualifications}</p>
                <p className="mt-3 text-sm text-muted-foreground">{d.bio}</p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {d.years_experience} years · Consultation ₹{Number(d.consultation_fee).toFixed(0)}
                </p>
                <Button asChild size="sm" className="mt-4">
                  <Link to="/book">Book</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="surface-card flex flex-wrap items-center justify-between gap-6 p-8">
          <div className="max-w-xl">
            <Badge className="mb-3 gap-1" variant="secondary">
              <Sparkles className="size-3" /> AI Ayurveda assistant
            </Badge>
            <h2 className="font-display text-2xl">Not sure where to begin?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Ask our Ayurveda assistant about symptoms, therapies and how to prepare for a
              Panchakarma course. It offers guidance only — never a diagnosis.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/assistant">Open the assistant</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
