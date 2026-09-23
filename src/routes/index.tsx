import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Leaf,
  HeartPulse,
  Droplets,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Calendar,
  Stethoscope,
  Activity,
  FileCheck2,
  CheckCircle2,
  Clock,
  Award,
  Video,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useDoctors, useTreatments } from "@/lib/queries";
import { SymptomDiseaseLookup } from "@/components/ayurveda/SymptomDiseaseLookup";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import heroImage from "@/assets/hero-ayurveda.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aarogya Ayurveda Hospital — Classical Panchakarma & Vedic Care" },
      {
        name: "description",
        content:
          "Classical Ashtanga Ayurveda hospital offering pure Panchakarma therapies, authentic pulse diagnosis (Nadi Pariksha), and paperless digital healthcare records.",
      },
      { property: "og:title", content: "Aarogya Classical Ayurveda Hospital" },
      {
        property: "og:description",
        content: "Rooted in the Ashtanga Hridaya tradition: Panchakarma, herbal medicine, and paperless patient records.",
      },
    ],
  }),
  component: HomePage,
});

export function HomePage() {
  const { hospital, announcement } = useSiteContent();
  const { data: treatments } = useTreatments();
  const { data: doctors } = useDoctors();

  const clinicalHighlights = [
    {
      icon: Droplets,
      title: "Authentic 5-Stage Panchakarma",
      text: "Vamana, Virechana, Basti, Nasya, and Raktamokshana executed in single-trunk teakwood Dronis with unadulterated medicated oils.",
    },
    {
      icon: Activity,
      title: "Nadi Pariksha Pulse Diagnosis",
      text: "Subtle assessment of three-finger radial arterial velocity to identify latent metabolic toxicity (Ama) and doshic disequilibrium.",
    },
    {
      icon: FileCheck2,
      title: "100% Paperless Digital EMR",
      text: "Prescriptions, dosha evaluations, dietary charts, and verified tax invoices stored securely and downloadable as tamper-proof PDFs.",
    },
  ];

  return (
    <PageShell>
      {/* Top hospital announcement if enabled */}
      {announcement?.active && (
        <div className="bg-primary/10 border-b border-primary/20 py-2.5 px-4 text-center text-xs text-primary font-medium">
          <p className="mx-auto max-w-6xl flex items-center justify-center gap-2">
            <Sparkles className="size-3.5 text-accent" /> {announcement.text}
          </p>
        </div>
      )}

      {/* HERO SECTION WITH ORGANIC CURVATURE & UPFRONT SYMPTOM LOOKUP */}
      <section className="relative overflow-hidden pt-6 pb-16 lg:py-20">
        {/* Ambient background glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute -top-10 right-10 size-80 rounded-full bg-accent/5 blur-2xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Hero Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-secondary/60 px-4 py-1.5 text-xs text-primary font-medium">
                <Leaf className="size-3.5 text-accent" />
                <span>Ashtanga Hridaya Lineage • Kerala & Rishikesh Sanctuaries</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08] text-balance-display">
                Root-Cause Healing, <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-primary">
                  Sacred Vedic Precision.
                </span>
              </h1>

              <p className="font-serif italic text-lg sm:text-xl text-primary/80 max-w-xl">
                “Swasthyasya Swasthya Rakshanam, Aturasya Vikara Prashamanam Ch”
                <span className="block text-xs font-sans not-italic text-muted-foreground mt-1">
                  Preserve the health of the healthy, and completely cure the ailments of the afflicted.
                </span>
              </p>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                Experience authentic Ayurvedic hospital care: authentic Panchakarma bio-purification, in-house herbal formulations prepared in bronze urulis, and zero-paper digital case records.
              </p>

              {/* Upfront Interactive Symptom & Disease Lookup Bar */}
              <div className="pt-2 max-w-xl">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-accent" /> Instant Symptom & Ayurvedic Protocol Search:
                </span>
                <SymptomDiseaseLookup />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full px-8 shadow-lift gap-2 bg-primary hover:bg-primary/90">
                  <Link to="/book">
                    <Calendar className="size-4 text-accent" /> Book a Consultation
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-7 border-primary/30">
                  <Link to="/panchakarma">Explore Panchakarma Therapies</Link>
                </Button>
              </div>
            </div>

            {/* Right Hero Visual Stage with Organic Leaf Mask */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Organic decorative backdrop ring */}
                <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-accent/20 via-primary/10 to-transparent blur-xl pointer-events-none" />

                <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-border/80 bg-card shadow-lift">
                  <video
                    src="/media/home.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={heroImage}
                    className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating Trust Badge */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-card/90 backdrop-blur-md p-4 border border-border/80 shadow-soft flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                        <Award className="size-5" />
                      </span>
                      <div>
                        <p className="font-display text-sm font-bold text-foreground">
                          NABH Green Hospital Certified
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          Ashtanga Ayurveda Standard
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[10px] bg-accent/20 text-accent-foreground font-semibold">
                      100% Paperless
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Organic Quick-Stats Ribbon */}
          <div className="mt-16 leaf-card bg-gradient-to-r from-card via-secondary/40 to-card p-6 sm:p-8 border-primary/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-border">
              <div className="space-y-1">
                <p className="font-display text-3xl sm:text-4xl font-bold text-primary">40+ Years</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Vaidya Heritage & Lineage
                </p>
              </div>
              <div className="space-y-1 pt-4 md:pt-0">
                <p className="font-display text-3xl sm:text-4xl font-bold text-primary">50,000+</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Patients Successfully Healed
                </p>
              </div>
              <div className="space-y-1 pt-4 md:pt-0">
                <p className="font-display text-3xl sm:text-4xl font-bold text-accent">100% Pure</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  In-House GMP Formulations
                </p>
              </div>
              <div className="space-y-1 pt-4 md:pt-0">
                <p className="font-display text-3xl sm:text-4xl font-bold text-foreground">18 Vaidyas</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Resident Senior Physicians
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS OF OUR CARE (CLINICAL HIGHLIGHTS) */}
      <section className="py-12 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {clinicalHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="leaf-card p-7 space-y-3 hover:border-primary/50 hover:shadow-soft transition-all group"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-xs">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PANCHAKARMA 3D / VIDEO SHOWCASE STAGE */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                Master Bio-Purification
              </Badge>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground leading-tight">
                Panchakarma: The Five Classical Detox Therapies
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Panchakarma is not a mere massage; it is an intensive 3-phase cellular purification (*Purvakarma, Pradhanakarma, and Paschatkarma*) designed to dislodge deeply rooted endotoxins from tissues and expel them through physiological channels.
              </p>

              <div className="space-y-2 pt-2 text-xs text-foreground/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" />
                  <span><strong>Vamana</strong> — Therapeutic emesis for Kapha lung & stomach disorders</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" />
                  <span><strong>Virechana</strong> — Master purgation for Pitta liver & blood purification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" />
                  <span><strong>Basti</strong> — Herbal enema; the master cure for 80+ Vata ailments</span>
                </div>
              </div>

              <div className="pt-4">
                <Button asChild className="rounded-full px-6 gap-2">
                  <Link to="/panchakarma">
                    Deep Dive Into Panchakarma Protocols <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Media Placeholder Video Slot */}
            <div className="lg:col-span-7">
              <MediaPlaceholder
                title="Panchakarma 3D Anatomical Visualization"
                subtitle="Live 3D cinematic sequence detailing Snehana (internal oleation), Swedana (steam dilation), and targeted toxin elimination."
                badge="3D Animation Active"
                aspectRatio="16/9"
                previewUrl="/media/home.mp4"
                duration="2:45 mins"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TREATMENTS ORGANIC SHOWCASE */}
      <section className="py-16 border-t border-border/60 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Badge variant="outline" className="border-primary/30 text-primary text-xs mb-2">
                Hospital Therapies
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Classical Healing Therapies
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Administered daily by trained Panchakarma therapists under senior Vaidya supervision.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full self-start sm:self-auto">
              <Link to="/treatments">
                View All Therapies <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(treatments ?? []).slice(0, 6).map((t) => (
              <div
                key={t.id}
                className="leaf-card p-6 flex flex-col justify-between hover:shadow-lift hover:border-primary/40 transition-all space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-[10px] font-mono">
                      {t.duration || "45-60 mins"}
                    </Badge>
                    {t.price && (
                      <span className="text-xs font-semibold text-primary">
                        ₹{Number(t.price).toFixed(0)}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-bold text-foreground">
                    {t.name}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {t.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                  <Button asChild size="sm" variant="ghost" className="text-xs text-primary p-0 hover:bg-transparent">
                    <Link to="/treatments">Learn procedure →</Link>
                  </Button>
                  <Button asChild size="sm" className="rounded-full text-xs px-4">
                    <Link to="/book">Book Slot</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SENIOR VAIDYA COUNCIL (DOCTOR HIGHLIGHTS) */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="outline" className="border-primary/30 text-primary text-xs">
              Medical Council
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Our Senior Ayurvedic Physicians
            </h2>
            <p className="text-sm text-muted-foreground">
              Trained in venerable Gurukulam traditions and university hospitals, our Vaidyas diagnose disease through three-finger Nadi Pariksha and personalized constitution charting.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(doctors ?? []).map((doc) => (
              <div
                key={doc.id}
                className="leaf-card-alt p-6 space-y-4 flex flex-col justify-between hover:shadow-lift hover:border-primary/40 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary font-display font-bold text-lg">
                      {doc.full_name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {doc.full_name}
                      </h3>
                      <p className="text-xs text-primary font-medium">{doc.speciality}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-muted-foreground font-mono">
                    {doc.qualifications} • {doc.years_experience} Years Clinical Practice
                  </p>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {doc.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground block">OPD Fee</span>
                    <span className="font-bold text-foreground">
                      ₹{Number(doc.consultation_fee).toFixed(0)}
                    </span>
                  </div>
                  <Button asChild size="sm" className="rounded-full px-5 text-xs">
                    <Link to="/book">Consult Doctor</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAPERLESS HEALTHCARE COMMITMENT BANNER */}
      <section className="py-12 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="leaf-card bg-gradient-to-br from-primary/10 via-secondary/30 to-background p-8 sm:p-12 border-primary/25 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <Badge className="bg-primary text-primary-foreground rounded-full text-xs">
                Zero-Paper Hospital Initiative
              </Badge>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Your Complete Ayurvedic Case History, Always at Hand
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                We eliminate paper folders. Your Nadi Pariksha notes, herbal prescription dosages, Panchakarma progress logs, and GST invoices are permanently stored in your encrypted patient portal and downloadable as standardized PDF documents with a single click.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end gap-3">
              <Button asChild size="lg" className="rounded-full px-7 shadow-soft">
                <Link to="/dashboard">Access Patient Portal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
