import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  ShieldCheck,
  Award,
  Sparkles,
  Calendar,
  Heart,
  Droplets,
  BookOpen,
  CheckCircle2,
  Building2,
  TreePine,
  Flame,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import { HOSPITAL_DATA, SANCTUARIES } from "@/data/hospital";
import { DOCTORS_ROSTER } from "@/data/doctors";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Heritage & Lineage — Ashtanga Ayurveda Tradition | Aarogya Hospital" },
      {
        name: "description",
        content:
          "Discover the centuries-old Guru-Shishya lineage, classical Ashtanga Hridaya foundations, GMP in-house herbal pharmacy, and the senior Vaidyas behind Aarogya Ayurveda Hospital.",
      },
    ],
  }),
  component: AboutPage,
});

const TIMELINE_MILESTONES = [
  {
    period: "Early 20th Century",
    title: "The Tapasya of the Vaidyam Lineage",
    subtitle: "Ashtanga Hridaya Gurukulam Roots",
    desc: "Founded in the sacred Malabar river valley by royal court physicians (Raja Vaidyas). Medical knowledge was preserved through rigorous Guru-Shishya parampara, memorizing Sanskrit verses and classical preparation methods.",
  },
  {
    period: "1984",
    title: "Establishment of the Riverside Oushadhi Shala",
    subtitle: "Preserving Raw Botanicals & Bronze Cauldron Processing",
    desc: "To counter the industrialization of fake herbal pills, our founders established an authentic, wood-fired bronze Uruli pharmacy to boil classical Kashayams without synthetic preservatives.",
  },
  {
    period: "2008",
    title: "Himalayan Sanctuary in Rishikesh",
    subtitle: "Expanding to Pranic Mountain Foothills",
    desc: "Inaugurated our second sanctuary along the Ganges in Tapovan, Rishikesh, offering high-altitude medicinal flora, pure water springs, and silent meditation retreats.",
  },
  {
    period: "Present Day",
    title: "NABH Accreditation & 100% Paperless EMR",
    subtitle: "Classical Authenticity Meets Clinical Precision",
    desc: "Recognized as a premier NABH-accredited green hospital. Integrating digital pulse telemetry and paperless digital case sheets while fiercely upholding pure Vedic treatments.",
  },
];

const ASHTANGA_PILLARS = [
  { name: "Kaya Chikitsa", trans: "Internal Medicine & Metabolic Care", desc: "Balancing digestive fire (Agni), chronic metabolic disorders, and autoimmune reversal." },
  { name: "Shalya Tantra", trans: "Ayurvedic Surgery & Marma Science", desc: "Non-invasive management of anorectal disorders, fistula (Ksharasutra), and musculoskeletal pain." },
  { name: "Shalakya Tantra", trans: "ENT & Ophthalmology", desc: "Netra Tarpana, Nasya, and treatments for vision preservation and cranial health." },
  { name: "Kaumarabhritya", trans: "Pediatrics & Maternal Health", desc: "Suvarnaprashana gold drops, developmental nourishment, and postnatal care." },
  { name: "Agada Tantra", trans: "Toxicology & Environmental Purification", desc: "Neutralizing modern environmental pesticides, chemical exposure, and food toxicity." },
  { name: "Rasayana Tantra", trans: "Geriatrics, Cellular Rejuvenation & Ojas", desc: "Longevity formulations that arrest biological aging and fortify cellular immunity." },
  { name: "Vajikarana", trans: "Reproductive & Endocrine Vitality", desc: "Hormonal balance, fertility optimization, and vital reproductive vigor." },
  { name: "Bhuta Vidya", trans: "Psycho-Spiritual & Neuro-psychiatry", desc: "Sattvavajaya psychotherapy, Daivavyapashraya healing, and meditation for mental equanimity." },
];

export function AboutPage() {
  return (
    <PageShell>
      {/* 1. FULL-WIDTH ATMOSPHERIC HERITAGE HERO (No Small Box!) */}
      <section className="relative -mt-6 sm:-mt-10 -mx-4 sm:-mx-8 lg:-mx-12 overflow-hidden min-h-[75vh] lg:min-h-[82vh] flex items-center justify-start border-b border-border/70">
        {/* Full Environmental 3D Architectural Asset */}
        <div className="absolute inset-0 z-0">
          <img
            src="/media/gallery-hospital.jpg"
            alt="Aarogya Ayurvedic Hospital Sanctuary Architecture"
            className="w-full h-full object-cover object-right lg:object-center filter saturate-[1.12] contrast-[1.08] brightness-[0.96]"
          />
          {/* Transparent Dark Scrim: ZERO whitish hue, letting rich heritage architecture & temple grounds glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 pointer-events-none" />
        </div>

        {/* Ambient Botanical Light Wash */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] rounded-full bg-primary/15 blur-[130px] pointer-events-none z-0" />

        {/* Hero Content Floating Over Heritage Environment */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="rounded-full border-white/20 bg-black/40 backdrop-blur-md text-[#e6ca65] px-3.5 py-1 text-xs"
              >
                <BookOpen className="size-3.5 text-accent mr-1.5" /> Our Sacred Lineage & Guru-Shishya Parampara
              </Badge>
              <Badge className="bg-[#d4af37]/25 text-[#f3e5ab] border border-[#d4af37]/35 rounded-full text-xs backdrop-blur-md">
                Est. {HOSPITAL_DATA.foundedYear}
              </Badge>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              A Living Tapestry of <br />
              <span className="italic text-[#e6ca65] font-serif">Classical Vedic Healing</span>
            </h1>

            <p className="font-serif italic text-lg sm:text-2xl text-[#f3e5ab] leading-snug">
              “Rooted in the Ashtanga Hridaya, dedicated to pure bio-purification and unbroken medical lineage.”
            </p>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              {HOSPITAL_DATA.mission} Here, medicine is holy, customized to your biological pulse, and prepared with prayer and classical pharmacology.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 shadow-lift gap-2">
                <Link to="/book">
                  <Calendar className="size-4" /> Book Physician Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-7 bg-background/70 backdrop-blur-sm border-border">
                <Link to="/contact">Explore Sanctuaries</Link>
              </Button>
            </div>

            {/* Certifications Bar */}
            <div className="pt-6 border-t border-border/60 flex flex-wrap gap-2">
              {HOSPITAL_DATA.certifications.map((cert, i) => (
                <span key={i} className="text-[11px] font-mono bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/70 text-foreground/90">
                  ✓ {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Story Timeline: Chronicles of Care */}
      <section className="mt-24 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="border-primary/30 text-primary text-xs">
            Chronicles of Care
          </Badge>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground">
            The Timeline of Our Sanctuary
          </h2>
          <p className="text-sm text-muted-foreground">
            Tracing our journey from traditional riverside Gurukulam to a premier NABH-certified hospital.
          </p>
        </div>

        <div className="relative border-l-2 border-primary/30 ml-4 sm:ml-32 space-y-12 py-4">
          {TIMELINE_MILESTONES.map((item, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-12 group">
              <div className="absolute -left-[17px] top-1.5 size-8 rounded-full bg-card border-2 border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-soft">
                <Leaf className="size-3.5" />
              </div>

              <div className="p-8 rounded-[2rem] bg-card border border-border/80 group-hover:border-primary/40 transition-all shadow-soft max-w-3xl space-y-2">
                <span className="font-mono text-xs text-accent font-semibold uppercase tracking-wider block">
                  {item.period}
                </span>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="font-serif italic text-sm text-primary font-medium">
                  {item.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. The 8 Classical Branches (Ashtanga Ayurveda) */}
      <section className="mt-28 rounded-[3rem] bg-secondary/30 p-8 sm:p-16 border border-border/80 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
            Complete Medical System
          </Badge>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground">
            The Eight Pillars of Ashtanga Hridaya
          </h2>
          <p className="text-sm text-muted-foreground">
            Classical Ayurveda is an exhaustive octopartite healthcare science covering every dimension of human biology.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ASHTANGA_PILLARS.map((pillar, i) => (
            <div key={i} className="p-6 rounded-2xl bg-card border border-border/80 shadow-soft space-y-2.5 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {pillar.name}
                </h3>
                <p className="font-serif italic text-xs text-primary font-medium">
                  {pillar.trans}
                </p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Senior Vaidyas Roster Preview */}
      <section className="mt-28 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="border-primary/30 text-primary text-xs">
            Faculty of Medicine
          </Badge>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground">
            Our Senior Vaidyas & Lineage Masters
          </h2>
          <p className="text-sm text-muted-foreground">
            Direct disciples of traditional Ashtanga lineages blending Vedic diagnostics with modern lab assessments.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {DOCTORS_ROSTER.map((doc) => (
            <div key={doc.id} className="p-6 rounded-[2rem] bg-card border border-border/80 shadow-soft space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                  {doc.experience}
                </Badge>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {doc.name}
                </h3>
                <p className="text-xs text-primary font-medium">{doc.specialty}</p>
                <p className="text-[11px] font-mono text-muted-foreground">{doc.qualification}</p>
                <p className="text-xs text-muted-foreground leading-relaxed pt-1 line-clamp-3">
                  {doc.bio}
                </p>
              </div>
              <Button asChild size="sm" variant="outline" className="rounded-full w-full border-primary/30 text-xs">
                <Link to="/book">Book with {doc.name.split(" ")[1]}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
