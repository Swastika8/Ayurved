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
} from "lucide-react";
import { useDoctors } from "@/lib/queries";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

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

export function AboutPage() {
  const { data: doctors } = useDoctors();

  const timelineMilestones = [
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

  const ashtangaPillars = [
    { name: "Kaya Chikitsa", trans: "Internal Medicine & Metabolic Care", desc: "Balancing digestive fire (Agni), chronic metabolic disorders, and autoimmune reversal." },
    { name: "Shalya Tantra", trans: "Ayurvedic Surgery & Marma Science", desc: "Non-invasive management of anorectal disorders, fistula (Ksharasutra), and musculoskeletal pain." },
    { name: "Shalakya Tantra", trans: "ENT & Ophthalmology", desc: "Netra Tarpana, Nasya, and treatments for vision preservation and cranial health." },
    { name: "Kaumarabhritya", trans: "Pediatrics & Maternal Health", desc: "Suvarnaprashana gold drops, developmental nourishment, and postnatal care." },
    { name: "Agada Tantra", trans: "Toxicology & Environmental Purification", desc: "Neutralizing modern environmental pesticides, chemical exposure, and food toxicity." },
    { name: "Rasayana Tantra", trans: "Geriatrics, Cellular Rejuvenation & Ojas", desc: "Longevity formulations that arrest biological aging and fortify cellular immunity." },
    { name: "Vajikarana", trans: "Reproductive & Endocrine Vitality", desc: "Hormonal balance, fertility optimization, and vital reproductive vigor." },
    { name: "Bhuta Vidya", trans: "Psycho-Spiritual & Neuro-psychiatry", desc: "Sattvavajaya psychotherapy, Daivavyapashraya healing, and meditation for mental equanimity." },
  ];

  return (
    <PageShell>
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-secondary/40 to-background border border-border px-6 py-14 sm:px-12 sm:py-20 text-center">
        <div className="mx-auto max-w-3xl space-y-4">
          <Badge variant="outline" className="rounded-full border-primary/30 text-primary px-4 py-1 text-xs">
            <BookOpen className="size-3.5 text-accent mr-1.5" /> Our Sacred Lineage & Philosophy
          </Badge>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-foreground text-balance-display">
            A Living Tapestry of Classical Vedic Healing
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-primary/80">
            Rooted in the Ashtanga Hridaya, Dedicated to Pure Bio-Purification
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Aarogya Ayurveda Hospital was founded on a non-negotiable vow: never to dilute classical healing into generic commercial spa therapies. Here, medicine is holy, customized to your pulse, and prepared with devotion.
          </p>
        </div>
      </section>

      {/* Visual Campus & Sanctuary Documentary Stage */}
      <section className="mt-14">
        <MediaPlaceholder
          title="Sanctuary Documentary: The Living Lineage of Aarogya"
          subtitle="A cinematic journey through our sacred medicinal gardens, single-trunk Droni carving, and morning Vaidya consultations."
          badge="Heritage Film Active"
          aspectRatio="21/9"
          previewUrl="/media/intro.mp4"
          duration="2:15 mins"
          details={[
            "Interviews with chief Vaidyas on Ashtanga Hridaya lineage",
            "Behind-the-scenes in our wood-fired bronze pharmacy",
            "Patient healing stories across 3 generations"
          ]}
        />
      </section>

      {/* Interactive Story Timeline: The Heritage Scroll */}
      <section className="mt-20 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="outline" className="border-primary/30 text-primary text-xs">
            Chronicles of Care
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            The Timeline of Our Healing Sanctuary
          </h2>
          <p className="text-sm text-muted-foreground">
            Tracing our journey from traditional village Gurukulam to a certified NABH modern hospital.
          </p>
        </div>

        <div className="relative border-l-2 border-primary/30 ml-4 sm:ml-32 space-y-12 py-4">
          {timelineMilestones.map((item, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-12 group">
              {/* Timeline marker with pulsing leaf badge */}
              <div className="absolute -left-[17px] top-1.5 size-8 rounded-full bg-card border-2 border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-soft">
                <Leaf className="size-3.5" />
              </div>

              <div className="leaf-card p-6 sm:p-8 space-y-2 border-border/80 group-hover:border-primary/40 transition-all max-w-3xl">
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

      {/* The 8 Branches of Classical Ayurveda (Ashtanga Ayurveda) */}
      <section className="mt-24 rounded-[2.5rem] bg-secondary/30 p-8 sm:p-14 border border-border">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
            Complete Medical System
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            The Eight Pillars of Ashtanga Ayurveda
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Classical Ayurveda is an all-encompassing medical science encompassing surgery, psychiatry, pediatrics, and longevity. Our hospital houses specialized departments across all eight branches.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ashtangaPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-card p-5 space-y-2 hover:border-primary/40 hover:shadow-soft transition-all"
            >
              <span className="text-[10px] font-mono text-primary font-bold">0{idx + 1}</span>
              <h3 className="font-display text-lg font-bold text-foreground">{pillar.name}</h3>
              <p className="font-serif italic text-xs text-accent font-semibold">{pillar.trans}</p>
              <p className="text-xs text-muted-foreground leading-relaxed pt-1">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Certified Physicians & Vaidyas */}
      <section className="mt-24 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="outline" className="border-primary/30 text-primary text-xs">
            The Healing Council
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Senior Vaidyas & Clinical Directors
          </h2>
          <p className="text-sm text-muted-foreground">
            Our physicians undergo rigorous classical pulse diagnosis training in addition to accredited university surgical and medical degrees.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(doctors ?? []).map((doc) => (
            <div
              key={doc.id}
              className="leaf-card p-6 flex flex-col justify-between hover:shadow-lift hover:border-primary/40 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground font-display font-bold text-lg shadow-soft">
                    {doc.full_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">{doc.full_name}</h3>
                    <p className="text-xs text-primary font-medium">{doc.speciality}</p>
                  </div>
                </div>

                <div className="rounded-xl bg-secondary/50 p-2.5 text-xs text-muted-foreground border border-border">
                  <span className="font-semibold text-foreground">Credentials: </span>
                  {doc.qualifications} • {doc.years_experience} Years Hospital Practice
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                  {doc.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted-foreground block">OPD Consultation</span>
                  <span className="font-bold text-sm text-foreground">₹{Number(doc.consultation_fee).toFixed(0)}</span>
                </div>
                <Button asChild size="sm" className="rounded-full text-xs px-5">
                  <Link to="/book">Consult Vaidya</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Zero Compromise Quality Standards */}
      <section className="mt-20 leaf-card-alt bg-gradient-to-tr from-secondary/50 via-card to-primary/10 p-8 sm:p-12 border-primary/25 text-center max-w-4xl mx-auto space-y-4">
        <ShieldCheck className="size-8 text-primary mx-auto" />
        <h2 className="font-display text-3xl font-bold text-foreground">
          Our Threefold Sanctum Promise
        </h2>
        <div className="grid sm:grid-cols-3 gap-6 pt-4 text-left">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
              <CheckCircle2 className="size-4 text-primary" /> 100% Herb Purity
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Never using adulterated commercial extracts. All decoctions brewed fresh on-site in bronze urulis.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
              <CheckCircle2 className="size-4 text-primary" /> Pulse-Led Precision
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              No generic packages. Every therapy regimen is personalized to your three-finger Nadi Pariksha reading.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
              <CheckCircle2 className="size-4 text-primary" /> Paperless Records
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Encrypted, digital health cards that sync prescriptions, diets, and lab reports right to your phone.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
