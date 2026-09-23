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
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSiteContent } from "@/hooks/useSiteContent";
import { SymptomDiseaseLookup } from "@/components/ayurveda/SymptomDiseaseLookup";
import { CinematicIntro } from "@/components/ayurveda/CinematicIntro";
import { HOSPITAL_DATA } from "@/data/hospital";
import { CLASSICAL_TREATMENTS } from "@/data/treatments";
import { PANCHAKARMA_THERAPIES } from "@/data/panchakarma";
import { DOCTORS_ROSTER } from "@/data/doctors";
import { useDoctors, useTreatments } from "@/lib/queries";

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
  const { announcement } = useSiteContent();
  const { data: treatments } = useTreatments();
  const { data: doctors } = useDoctors();

  const displayTreatments = treatments?.length ? treatments.slice(0, 6) : CLASSICAL_TREATMENTS.slice(0, 6);
  const displayDoctors = doctors?.length ? doctors : DOCTORS_ROSTER.map((doc) => ({
    id: doc.id,
    full_name: doc.name,
    speciality: doc.speciality,
    qualifications: doc.qualifications,
    years_experience: doc.yearsExperience,
    consultation_fee: doc.consultationFee,
    bio: doc.bio,
    is_active: true,
  }));

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
      {/* Cinematic Full-Screen Video Entrance on first session visit */}
      <CinematicIntro />

      {/* Top hospital announcement if enabled */}
      {announcement?.active && (
        <div className="bg-primary/10 border-b border-primary/20 py-2.5 px-4 text-center text-xs text-primary font-medium">
          <p className="mx-auto max-w-6xl flex items-center justify-center gap-2">
            <Sparkles className="size-3.5 text-accent" /> {announcement.text}
          </p>
        </div>
      )}

      {/* IMMERSIVE ENVIRONMENTAL HERO SECTION (NO CONTAINED IMAGE CARDS) */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-8 pb-20">
        {/* Full-width 3D atmospheric environmental video layer extending across the right & behind content */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            src="/media/home.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 right-0 w-full lg:w-[65%] h-full object-cover object-center opacity-85 filter contrast-[1.05]"
          />
          {/* Organic atmospheric gradient blending the video seamlessly into warm ivory/cream background */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 lg:via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
          <div className="absolute top-1/4 left-1/3 size-96 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 w-full py-12 lg:py-16">
          <div className="max-w-2xl lg:max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-secondary/80 backdrop-blur-md px-4 py-1.5 text-xs text-primary font-medium shadow-xs">
              <Leaf className="size-3.5 text-accent" />
              <span>{HOSPITAL_DATA.tradition} • Kerala & Rishikesh</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.06] text-balance-display">
              Root-Cause Healing, <br />
              <span className="font-serif italic font-normal text-primary">
                Sacred Vedic Precision.
              </span>
            </h1>

            <p className="font-serif italic text-lg sm:text-2xl text-primary/90 max-w-xl leading-relaxed">
              “Swasthyasya Swasthya Rakshanam, Aturasya Vikara Prashamanam Ch”
              <span className="block text-xs font-sans not-italic text-muted-foreground mt-1.5">
                Preserve the vitality of the healthy, and eradicate the roots of disease in the afflicted.
              </span>
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Experience classical hospital healthcare: authentic 5-phase Panchakarma bio-purification, in-house pharmacopoeia prepared in bronze urulis, and zero-paper digital case records.
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
              <Button asChild variant="outline" size="lg" className="rounded-full px-7 border-primary/30 bg-background/60 backdrop-blur-sm hover:bg-background">
                <Link to="/panchakarma">Explore Panchakarma Therapies</Link>
              </Button>
            </div>
          </div>

          {/* Floating Organic Quick-Stats Ribbon */}
          <div className="mt-20 leaf-card bg-card/85 backdrop-blur-md p-6 sm:p-8 border-primary/20 shadow-lift">
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
                  Patients Restored
                </p>
              </div>
              <div className="space-y-1 pt-4 md:pt-0">
                <p className="font-display text-3xl sm:text-4xl font-bold text-accent">100% Pure</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  In-House GMP Pharmacy
                </p>
              </div>
              <div className="space-y-1 pt-4 md:pt-0">
                <p className="font-display text-3xl sm:text-4xl font-bold text-foreground">18 Vaidyas</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Resident Specialists
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS OF OUR CARE (CLINICAL HIGHLIGHTS) */}
      <section className="py-16 border-t border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {clinicalHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="leaf-card p-7 space-y-3 hover:border-primary/50 hover:shadow-soft transition-all group bg-card"
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

      {/* PANCHAKARMA ATMOSPHERIC SHOWCASE (LARGE 3D VISUAL BACKDROP LAYER, NO SMALL CARD) */}
      <section className="relative overflow-hidden py-24 bg-card border-y border-border">
        {/* Large 3D Mandala Environment Layer extending across the entire section */}
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply">
          <img
            src="/media/panchakarma-main.jpg"
            alt="Panchakarma 3D Mandala Environment"
            className="w-full h-full object-cover object-right-top filter saturate-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-card" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl space-y-5">
            <Badge className="bg-primary/15 text-primary border-primary/30 text-xs">
              Master Bio-Purification
            </Badge>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground leading-tight">
              Panchakarma: The Five Classical Detox Therapies
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Panchakarma is not a mere massage; it is an intensive 3-phase cellular purification (*Purvakarma, Pradhanakarma, and Paschatkarma*) designed to dislodge deeply rooted endotoxins from tissues and expel them through physiological channels.
            </p>

            <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-foreground/90">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                <span><strong>Vamana</strong> — Therapeutic emesis for Kapha lung & stomach disorders</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                <span><strong>Virechana</strong> — Master purgation for Pitta liver & blood purification</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                <span><strong>Basti</strong> — Herbal enema; the master cure for 80+ Vata ailments</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                <span><strong>Nasya</strong> — Medicated errhine for cranial, sinus, and sensory clarity</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                <span><strong>Raktamokshana</strong> — Jalauka leech therapy for stubborn blood pathologies</span>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild size="lg" className="rounded-full px-8 gap-2 shadow-soft">
                <Link to="/panchakarma">
                  Deep Dive Into Panchakarma Protocols <ArrowRight className="size-4" />
                </Link>
              </Button>
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
            {displayTreatments.map((t) => (
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
            {displayDoctors.map((doc) => (
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
