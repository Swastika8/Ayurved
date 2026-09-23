import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  Calendar,
  Building2,
  ShieldCheck,
  HeartHandshake,
  MessageSquare,
  AlertTriangle,
  ChevronDown,
  Navigation,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HOSPITAL_DATA, SANCTUARIES } from "@/data/hospital";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Sanctuary Campuses — Aarogya Classical Ayurveda" },
      {
        name: "description",
        content:
          "Visit our healing sanctuaries across Kerala and Rishikesh. Contact our senior Vaidya triage team for appointments, inpatient admissions, and emergency guidance.",
      },
    ],
  }),
  component: ContactPage,
});

const FAQS = [
  {
    q: "How do I choose between an Outpatient visit and an Inpatient Panchakarma retreat?",
    a: "Outpatient consultations are ideal for initial pulse analysis (Nadi Pariksha), dietary recommendations, and addressing non-acute imbalances. For deep cellular detoxification, chronic auto-immune issues, or profound burnout, our 7, 14, or 21-day inpatient retreats at Kerala or Rishikesh provide round-the-clock Vaidya supervision and prepared Sattvic nutrition.",
  },
  {
    q: "What should I pack for my residential hospital admission?",
    a: "We recommend loose, natural cotton clothing, any past diagnostic reports, and personal toiletries. We provide organic treatment robes, towels, medicated bath decoctions, and custom herbal tooth powders during your stay.",
  },
  {
    q: "Can a family member or attendant stay with me during treatments?",
    a: "Yes. Our Deluxe Garden Suites and Riverfront Cottages accommodate one accompanying family member. Attendants are also provided with three wholesome organic Sattvic meals daily and are welcome to attend daily morning meditation.",
  },
  {
    q: "Is treatment at Aarogya covered by health insurance policies?",
    a: "Yes. As a NABH-accredited classical hospital, treatments and inpatient Panchakarma packages at Aarogya are recognized under the AYUSH guidelines of the Insurance Regulatory and Development Authority of India (IRDAI).",
  },
  {
    q: "What if I experience an acute medical emergency?",
    a: "Ayurveda excels at chronic management and holistic rejuvenation. For hyper-acute critical emergencies, our campuses maintain 24/7 tie-ups with adjacent multi-specialty tertiary allopathic emergency hospitals.",
  },
];

export function ContactPage() {
  const [selectedCampusId, setSelectedCampusId] = useState<string>("kerala-sanctuary");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "Inpatient Panchakarma Admission",
    message: "",
  });

  const activeCampus = SANCTUARIES.find((c) => c.id === selectedCampusId) || SANCTUARIES[0]!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Inquiry received by Senior Triage Vaidya", {
        description: "Our admissions coordinator will contact you within 24 hours.",
      });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "Inpatient Panchakarma Admission",
        message: "",
      });
    }, 1000);
  };

  return (
    <PageShell>
      {/* 1. ATMOSPHERIC ARCHITECTURAL HERO ENVIRONMENT (No Small Card Box!) */}
      <section className="relative -mt-6 sm:-mt-10 -mx-4 sm:-mx-8 lg:-mx-12 overflow-hidden min-h-[70vh] lg:min-h-[78vh] flex items-center justify-start border-b border-border/70">
        {/* Full Environmental Architectural Asset */}
        <div className="absolute inset-0 z-0">
          <img
            src="/media/contact-architecture.jpg"
            alt="Aarogya Ayurvedic Sanctuary Riverfront Architecture"
            className="w-full h-full object-cover object-right lg:object-center filter brightness-[0.92] contrast-[1.05]"
          />
          {/* Subtle Warm Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30 lg:to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 pointer-events-none" />
        </div>

        {/* Ambient Warm Golden & Herbal Glows */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] rounded-full bg-primary/15 blur-[130px] pointer-events-none z-0" />

        {/* Hero Content Floating Over Architecture */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="rounded-full border-primary/40 bg-background/80 backdrop-blur-md text-primary px-3.5 py-1 text-xs"
              >
                <Sparkles className="size-3.5 text-accent mr-1.5" /> Healing Sanctuaries & Triage
              </Badge>
              <Badge className="bg-primary/20 text-primary border-primary/30 rounded-full text-xs backdrop-blur-md">
                24/7 Inpatient Care
              </Badge>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
              Connect with Our <br />
              <span className="italic text-primary font-serif">Senior Vaidyas</span>
            </h1>

            <p className="font-serif italic text-lg sm:text-2xl text-primary/90 leading-snug">
              “Direct communication with dedicated Vaidyas—no call centers or automated triage bots.”
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Whether you are planning a 21-day residential Panchakarma cleanse at our riverfront estate or seeking an initial outpatient pulse diagnosis, our admissions team is here to assist.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-foreground font-mono">
                <Phone className="size-4 text-primary" /> {HOSPITAL_DATA.helpline}
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground font-mono">
                <Mail className="size-4 text-accent" /> {HOSPITAL_DATA.mainEmail}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Direct Inquiry & Admissions Form Section */}
      <section className="mt-20 grid lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Triage Inquiry Form */}
        <div className="lg:col-span-7 rounded-[3rem] bg-card border border-border/80 p-8 sm:p-14 shadow-soft space-y-8">
          <div className="space-y-2">
            <Badge variant="outline" className="text-xs text-primary border-primary/30">
              Direct Admissions
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Send an Inpatient or Clinical Inquiry
            </h2>
            <p className="text-sm text-muted-foreground">
              Your inquiry is forwarded directly to the duty physician for initial clinical evaluation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Full Name *</label>
                <Input
                  required
                  placeholder="e.g. Anand Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="rounded-full bg-secondary/30 border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Phone Number *</label>
                <Input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="rounded-full bg-secondary/30 border-border"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Email Address *</label>
                <Input
                  required
                  type="email"
                  placeholder="anand@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-full bg-secondary/30 border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Nature of Inquiry</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full h-10 px-4 rounded-full bg-secondary/30 border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Inpatient Panchakarma Admission">Inpatient Panchakarma Admission</option>
                  <option value="Outpatient Consultation">Outpatient Pulse Diagnosis</option>
                  <option value="Chronic Condition Guidance">Chronic Condition Guidance</option>
                  <option value="International Patient Support">International Patient Support</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">
                Health Background & Desired Sanctuary Dates
              </label>
              <Textarea
                rows={4}
                placeholder="Mention any current health symptoms, past medical history, or preferred admission dates..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="rounded-2xl bg-secondary/30 border-border resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="rounded-full px-10 shadow-lift w-full sm:w-auto"
            >
              {isSubmitting ? "Routing to Triage Vaidya..." : "Submit Confidential Inquiry"}
            </Button>
          </form>
        </div>

        {/* Right Column: Active Sanctuary Details & Hours */}
        <div className="lg:col-span-5 space-y-8">
          {/* Sanctuary Selection Pills */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
              Select Sanctuary Campus:
            </span>
            <div className="flex gap-2">
              {SANCTUARIES.map((sanctuary) => (
                <button
                  key={sanctuary.id}
                  onClick={() => setSelectedCampusId(sanctuary.id)}
                  className={`flex-1 p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    selectedCampusId === sanctuary.id
                      ? "bg-primary text-primary-foreground border-primary shadow-soft"
                      : "bg-card text-muted-foreground border-border hover:bg-secondary/40"
                  }`}
                >
                  <p className="font-display font-bold text-sm leading-tight">
                    {sanctuary.name.split(" ")[0]}
                  </p>
                  <p className={`text-[10px] mt-0.5 ${selectedCampusId === sanctuary.id ? "text-primary-foreground/80" : "text-primary"}`}>
                    {sanctuary.altitude}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Active Campus Details Card */}
          <div className="p-8 rounded-[2.5rem] bg-card border border-border/80 shadow-soft space-y-6">
            <div>
              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs mb-2">
                {activeCampus.tagline}
              </Badge>
              <h3 className="font-display text-2xl font-bold text-foreground">
                {activeCampus.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                {activeCampus.description}
              </p>
            </div>

            <div className="space-y-3 text-xs text-foreground/80 font-mono">
              <div className="flex items-start gap-2.5">
                <MapPin className="size-4 text-accent shrink-0 mt-0.5" />
                <span>{activeCampus.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="size-4 text-primary shrink-0" />
                <span>{activeCampus.opdHours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="size-4 text-primary shrink-0" />
                <span>{activeCampus.phone}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border/60">
              <span className="text-xs font-semibold text-foreground block mb-2">
                Campus Highlights:
              </span>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {activeCampus.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild className="rounded-full w-full shadow-lift">
              <Link to="/book">Book Consultation at this Sanctuary</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions */}
      <section className="mt-28 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="border-primary/30 text-primary text-xs">
            Clarifications
          </Badge>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground">
            Answers regarding residential stays, treatments, insurance, and medical safety.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {FAQS.map((faq, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-card border border-border/80 shadow-soft space-y-3">
              <h3 className="font-display text-lg font-bold text-foreground">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
