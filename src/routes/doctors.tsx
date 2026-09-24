import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DOCTORS_ROSTER } from "@/data/doctors";
import {
  Sparkles,
  Calendar,
  Clock,
  Stethoscope,
  Globe2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Award,
} from "lucide-react";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Senior Vaidyas & Pulse Diagnosticians — Aarogya Ayurveda Hospital" },
      {
        name: "description",
        content:
          "Meet our lineage Ayurvedic physicians, Ashtavidha Nadi Pariksha diagnosticians, and Panchakarma directors at Kerala and Rishikesh.",
      },
    ],
  }),
  component: DoctorsDirectoryPage,
});

export function DoctorsDirectoryPage() {
  return (
    <PageShell>
      {/* 1. EDITORIAL HERO: VAIDYA SANCTUARY */}
      <section className="relative pt-12 pb-20 overflow-hidden border-b border-border/70">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/5 text-primary px-4 py-1.5 rounded-full text-xs tracking-wider uppercase font-semibold"
          >
            <Sparkles className="size-3.5 mr-2 text-accent" /> Clinical Lineage & Pulse Diagnosticians
          </Badge>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
            Custodians of <br />
            <span className="text-primary italic font-serif">Classical Chikitsa</span>
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
            Our Senior Vaidyas combine decades of classical Gurukula lineage, Eight-Fold Pulse Diagnosis (<em className="text-foreground">Ashtavidha Pariksha</em>), and hospital-grade inpatient clinical oversight.
          </p>
        </div>
      </section>

      {/* 2. EDITORIAL PROFILES (NOT GENERIC CARDS): LARGE PORTRAITS, SANSKRIT TITLES, RICH CREDENTIALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-24">
          {DOCTORS_ROSTER.map((doctor, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={doctor.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-b border-border/50 pb-20 last:border-b-0"
              >
                {/* Large Editorial Portrait Column */}
                <div
                  className={`lg:col-span-5 relative ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-card border border-border/80">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-center filter saturate-[1.08] contrast-[1.05] transition-transform duration-700 hover:scale-105"
                    />
                    {/* Subtle Warm Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Sanctuary Badge on Image */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                      <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        <Building2 className="size-3.5 text-accent" />
                        {doctor.sanctuaryId === "kerala"
                          ? "Kerala Sanctuary"
                          : doctor.sanctuaryId === "rishikesh"
                          ? "Rishikesh Sanctuary"
                          : "Kerala & Rishikesh"}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 font-semibold text-accent">
                        ₹{doctor.consultationFee} Consultation
                      </span>
                    </div>
                  </div>
                </div>

                {/* Editorial Narrative & Credentials Column */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-accent/40 bg-accent/10 text-accent font-semibold text-xs">
                        {doctor.yearsExperience} Years Clinical Lineage
                      </Badge>
                      <span className="font-serif italic text-xs text-primary/80">
                        {doctor.sanskritTitle}
                      </span>
                    </div>

                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                      {doctor.name}
                    </h2>

                    <p className="text-sm font-semibold text-primary">
                      {doctor.speciality} · <span className="text-muted-foreground font-normal">{doctor.qualifications}</span>
                    </p>
                  </div>

                  <p className="text-base text-muted-foreground leading-relaxed font-light">
                    {doctor.bio}
                  </p>

                  {/* Clinical Expertise Tags */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Clinical Focus & Shodhana Supervision
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {doctor.clinicalExpertise.map((exp, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-secondary/70 text-foreground border border-border/80"
                        >
                          <CheckCircle2 className="size-3 text-primary" /> {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Schedule & Languages */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/60 text-xs">
                    <div className="flex items-start gap-2.5">
                      <Clock className="size-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground">OPD Schedule</p>
                        <p className="text-muted-foreground">{doctor.opdSchedule}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Globe2 className="size-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground">Consultation Languages</p>
                        <p className="text-muted-foreground">{doctor.languages.join(", ")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <Button asChild className="rounded-full px-6 text-xs font-semibold gap-2 shadow-soft">
                      <Link to="/book">
                        <Calendar className="size-3.5 text-accent" /> Book Consultation with {doctor.name.split(" ")[1]}
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full px-5 text-xs">
                      <Link to="/about">Explore Lineage Tradition</Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
