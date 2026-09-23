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
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { useSiteContent } from "@/hooks/useSiteContent";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Sanctuary Campuses — Aarogya Classical Ayurveda" },
      {
        name: "description",
        content:
          "Visit our healing sanctuaries across Kerala, Rishikesh, Varanasi, and Bengaluru. Contact our senior Vaidya triage team for appointments, inpatient admissions, and emergency guidance.",
      },
      { property: "og:title", content: "Contact & Sanctuaries — Aarogya Ayurveda" },
      {
        property: "og:description",
        content:
          "Four peaceful campuses dedicated to classical Panchakarma, Nadi Pariksha, and holistic rejuvenation.",
      },
    ],
  }),
  component: ContactPage,
});

interface Campus {
  id: string;
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  specialization: string[];
  inpatientBeds: number;
  highlight: string;
  mediaPlaceholderTitle: string;
}

const campuses: Campus[] = [
  {
    id: "kerala",
    name: "Kerala Riverside Sanctuary",
    tagline: "Global Center for Classical Panchakarma & Herbology",
    address: "Aluva Riverbanks, Near Periyar Reserve, Ernakulam, Kerala 683101",
    phone: "+91 484 298 4401",
    email: "kerala@aarogya-ayurveda.org",
    hours: "06:00 AM – 08:30 PM (Daily Inpatient Care 24/7)",
    specialization: [
      "14–28 Day Intensive Panchakarma",
      "Traditional Wooden Droni Suites",
      "450+ Species Botanical Garden",
      "Sattvic Ayurvedic Dining Shala",
    ],
    inpatientBeds: 60,
    highlight: "Riverfront cottages with individual therapeutic herb steam enclosures.",
    mediaPlaceholderTitle: "Kerala Riverfront Sanctuary — 3D Architecture & Droni Wing Tour",
  },
  {
    id: "rishikesh",
    name: "Rishikesh Himalayan Retreat",
    tagline: "Pranayama, Marma Therapy & Respiratory Sanctuary",
    address: "Tapovan Foothills, Badrinath Marg, Rishikesh, Uttarakhand 249192",
    phone: "+91 135 243 8812",
    email: "rishikesh@aarogya-ayurveda.org",
    hours: "06:30 AM – 07:30 PM (Meditation & OPD)",
    specialization: [
      "Prana & Marma Chikitsa",
      "Himalayan Herbal Formulations",
      "Ashtanga Yoga & Dhyana Mandapam",
      "Chronic Stress & Insomnia Relief",
    ],
    inpatientBeds: 35,
    highlight: "High-altitude microclimate optimal for chronic respiratory & nervous system balancing.",
    mediaPlaceholderTitle: "Rishikesh Mountain Shala — 3D Atmosphere & Meditation Pavilion",
  },
  {
    id: "varanasi",
    name: "Varanasi Heritage Healing Center",
    tagline: "Classical Asthi-Sandhi & Rasashastra Excellence",
    address: "Assi Ghat Marg, Shivala Heritage Enclave, Varanasi, UP 221005",
    phone: "+91 542 227 9104",
    email: "varanasi@aarogya-ayurveda.org",
    hours: "08:00 AM – 08:00 PM (Daily)",
    specialization: [
      "Janu & Kati Basti Specialized Clinics",
      "Classical Agnikarma & Raktamokshana",
      "Authentic Classical Rasashastra",
      "Ghat-Facing Convalescence Balconies",
    ],
    inpatientBeds: 40,
    highlight: "Historical lineage center practicing uninterrupted classical therapies since 1928.",
    mediaPlaceholderTitle: "Varanasi Heritage Center — Architecture & Classical Pharmacy Walkthrough",
  },
  {
    id: "bengaluru",
    name: "Bengaluru Urban OPD & Diagnostic",
    tagline: "Modern Paperless Ayurvedic Outpatient Clinic",
    address: "14th Main Road, Indiranagar 2nd Stage, Bengaluru, Karnataka 560038",
    phone: "+91 80 4120 7733",
    email: "bengaluru@aarogya-ayurveda.org",
    hours: "08:30 AM – 08:30 PM (Mon to Sat)",
    specialization: [
      "Comprehensive Nadi Pariksha OPD",
      "Computerized Dosha Diagnostics",
      "Digital Paperless Herbal Dispensary",
      "Post-Retreat Long-Term Care Triage",
    ],
    inpatientBeds: 10,
    highlight: "Convenient metropolitan hub for ongoing pulse assessments and herb replenishments.",
    mediaPlaceholderTitle: "Bengaluru Integrated Clinic — Digital OPD & Diagnostics Hub",
  },
];

const faqs = [
  {
    q: "How do I choose between an Outpatient visit and an Inpatient Panchakarma retreat?",
    a: "Outpatient consultations are ideal for initial pulse analysis (Nadi Pariksha), dietary recommendations, and addressing non-acute imbalances. For deep cellular detoxification, chronic auto-immune issues, or profound burnout, our 7, 14, or 21-day inpatient retreats at Kerala or Rishikesh provide round-the-clock Vaidya supervision and prepared Sattvic nutrition.",
  },
  {
    q: "What should I pack for my residential hospital admission?",
    a: "We recommend loose, natural cotton clothing (kurta-pyjama or comfortable yoga wear), any past allopathic or diagnostic reports, and personal toiletries. We provide organic treatment robes, towels, medicated bath decoctions, and custom herbal tooth powders during your stay.",
  },
  {
    q: "Can a family member or attendant stay with me during treatments?",
    a: "Yes. Our Deluxe Garden Suites and Riverfront Cottages accommodate one accompanying family member. Attendants are also provided with three wholesome organic Sattvic meals daily and are welcome to attend daily morning meditation and botanical walks.",
  },
  {
    q: "Is treatment at Aarogya covered by health insurance policies?",
    a: "Yes. As a NABH-accredited classical hospital, treatments and inpatient Panchakarma packages at Aarogya are recognized under the AYUSH guidelines of the Insurance Regulatory and Development Authority of India (IRDAI). Our billing desk assists with cashless processing and fast-track reimbursement.",
  },
  {
    q: "What if I experience an acute medical emergency?",
    a: "Ayurveda excels at chronic management and holistic rejuvenation. For hyper-acute critical emergencies (such as acute cardiac arrest, massive trauma, or surgical emergencies), our campuses maintain 24/7 tie-ups with adjacent multi-specialty tertiary allopathic emergency hospitals.",
  },
];

function ContactPage() {
  const { hospital } = useSiteContent();
  const [selectedCampus, setSelectedCampus] = useState<string>("kerala");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [campusChoice, setCampusChoice] = useState("Kerala Riverside Sanctuary");
  const [inquiryType, setInquiryType] = useState("Panchakarma Residential Stay");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeCampus = campuses.find((c) => c.id === selectedCampus) || campuses[0]!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      toast.error("Please enter your name and phone number so our Vaidya team can reach you.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Inquiry received! Our Vaidya desk will contact you within 24 hours.");
    }, 1200);
  };

  return (
    <PageShell>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="outline" className="leaf-pill px-4 py-1.5 text-xs text-primary border-primary/20">
              <Sparkles className="size-3.5 mr-1.5 text-accent" />
              Direct Vaidya Connect & Sanctuaries
            </Badge>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground font-semibold leading-tight">
              Healing Sanctuaries &{" "}
              <span className="italic text-primary font-normal">Contact Directory</span>
            </h1>

            <p className="text-sm md:text-base font-serif italic text-accent font-medium tracking-wide">
              “आरोग्यं परमं भाग्यं स्वास्थ्यं सर्वार्थसाधनम्”
              <br />
              <span className="text-xs not-italic text-muted-foreground font-sans">
                (Health is the supreme fortune, the foundation of every human pursuit.)
              </span>
            </p>

            <p className="text-base text-muted-foreground leading-relaxed pt-2">
              Whether you are scheduling your first Nadi Pariksha pulse reading, planning a residential Panchakarma
              retreat, or seeking emergency Vaidya guidance, our care desks are prepared to welcome you.
            </p>
          </div>

          {/* Quick Helplines Strip */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="leaf-card p-5 border border-primary/15 bg-card/80 backdrop-blur-sm shadow-sm flex items-start gap-4">
              <div className="size-11 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0">
                <Phone className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Toll-Free Helpline</p>
                <p className="font-display text-lg font-semibold text-foreground mt-0.5">{hospital.phone}</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Lines open 24/7
                </p>
              </div>
            </div>

            <div className="leaf-card p-5 border border-primary/15 bg-card/80 backdrop-blur-sm shadow-sm flex items-start gap-4">
              <div className="size-11 rounded-xl bg-accent/10 text-accent grid place-items-center shrink-0">
                <MessageSquare className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">WhatsApp Triage</p>
                <p className="font-display text-lg font-semibold text-foreground mt-0.5">+91 98470 12345</p>
                <p className="text-xs text-muted-foreground mt-1">Direct reports & quick queries</p>
              </div>
            </div>

            <div className="leaf-card p-5 border border-primary/15 bg-card/80 backdrop-blur-sm shadow-sm flex items-start gap-4">
              <div className="size-11 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0">
                <Mail className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Admissions Desk</p>
                <p className="font-display text-base font-semibold text-foreground mt-0.5 truncate">{hospital.email}</p>
                <p className="text-xs text-muted-foreground mt-1">Response within 6 hours</p>
              </div>
            </div>

            <div className="leaf-card p-5 border border-primary/15 bg-card/80 backdrop-blur-sm shadow-sm flex items-start gap-4">
              <div className="size-11 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 grid place-items-center shrink-0">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Accredited Care</p>
                <p className="font-display text-base font-semibold text-foreground mt-0.5">NABH & AYUSH Leaf</p>
                <p className="text-xs text-muted-foreground mt-1">Cashless Insurance available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Campus Sanctuaries Interactive Directory */}
      <section className="py-16 md:py-24 border-t border-primary/10 bg-secondary/25">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <Badge variant="secondary" className="leaf-pill px-3 py-1 text-xs text-primary mb-3">
                <Building2 className="size-3.5 mr-1" />
                Physical Campuses
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl text-foreground font-semibold">
                Explore Our Four Sanctuary Locations
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
                Each campus is architected according to sacred Vastu Shastra principles, nestled in restorative
                nature to promote cellular tranquility.
              </p>
            </div>

            {/* Campus Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {campuses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCampus(c.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                    selectedCampus === c.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border"
                  }`}
                >
                  {c.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Campus Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Campus Details Card */}
            <div className="lg:col-span-6 space-y-6">
              <div className="leaf-card p-6 sm:p-8 bg-card border border-primary/15 shadow-sm space-y-6">
                <div>
                  <Badge variant="outline" className="text-xs text-accent border-accent/30 mb-2">
                    {activeCampus.tagline}
                  </Badge>
                  <h3 className="font-display text-3xl font-bold text-foreground">{activeCampus.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{activeCampus.highlight}</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-border/60">
                  <div className="flex items-start gap-3">
                    <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground">Sanctuary Address</p>
                      <p className="text-sm font-medium text-foreground mt-0.5">{activeCampus.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="size-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground">Direct Campus Desk</p>
                      <p className="text-sm font-medium text-foreground mt-0.5">{activeCampus.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="size-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground">Campus Admissions</p>
                      <p className="text-sm font-medium text-foreground mt-0.5">{activeCampus.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="size-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground">OPD & Visiting Schedule</p>
                      <p className="text-sm font-medium text-foreground mt-0.5">{activeCampus.hours}</p>
                    </div>
                  </div>
                </div>

                {/* Campus Facilities & Beds */}
                <div className="pt-4 border-t border-border/60">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Core Specializations
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {activeCampus.inpatientBeds} Inpatient Suites
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeCampus.specialization.map((spec) => (
                      <div key={spec} className="flex items-center gap-2 text-xs text-foreground/85">
                        <CheckCircle2 className="size-3.5 text-accent shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Button asChild className="leaf-pill bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link to="/book">
                      <Calendar className="size-4 mr-2" />
                      Book Consultation at this Campus
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="leaf-pill border-primary/20 hover:bg-primary/5"
                    onClick={() => {
                      navigator.clipboard?.writeText(activeCampus.address);
                      toast.success("Campus address copied to clipboard!");
                    }}
                  >
                    <Navigation className="size-4 mr-2" />
                    Copy GPS Address
                  </Button>
                </div>
              </div>
            </div>

            {/* Media Showcase Container for 3D Video / Photography */}
            <div className="lg:col-span-6 space-y-4">
              <MediaPlaceholder
                type="3d"
                title={activeCampus.mediaPlaceholderTitle}
                caption={`Interactive 3D Vastu walkthrough & treatment room inspection for ${activeCampus.name}. Pre-configured for upcoming drone scanning and real-time WebGL rendering.`}
                aspectRatio="16/9"
                previewUrl="/media/contact-architecture.jpg"
                duration="1:30 mins"
                suggestedPrompt={`Photorealistic cinematic architectural drone view of Aarogya Ayurveda Hospital ${activeCampus.name}, nestled in lush tropical trees, riverbanks, terracotta roof tiles, serene stone pathways, warm morning mist.`}
                technicalSpecs={{
                  resolution: "4K WebGL / 3D Splatting (3840x2160)",
                  duration: "90s interactive orbital walkthrough",
                  codec: "glTF 2.0 / WebM VP9 60fps",
                }}
              />

              <div className="leaf-card p-4 bg-muted/40 border border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <HeartHandshake className="size-4 text-primary" />
                  Complimentary airport / railway station pickup provided for residential Panchakarma admissions.
                </span>
                <Link to="/panchakarma" className="text-primary hover:underline font-medium shrink-0 ml-2">
                  View Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Inpatient & Consultation Inquiry Form */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <Badge variant="outline" className="leaf-pill px-3 py-1 text-xs text-accent border-accent/25">
                <Send className="size-3 mr-1" />
                Vaidya Triage Desk
              </Badge>

              <h2 className="font-display text-3xl sm:text-4xl text-foreground font-semibold leading-tight">
                Send an Admission or General Clinical Inquiry
              </h2>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Have specific health questions, past diagnostic scans, or require custom guidance on choosing an
                inpatient stay? Complete this intake form and our clinical triage officer will review your notes.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Zero Paperwork Delay</h4>
                    <p className="text-xs text-muted-foreground">
                      All health summaries and dietary restrictions are digitally forwarded to attending Vaidyas
                      before your arrival.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-accent/10 text-accent grid place-items-center shrink-0 mt-0.5">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Strict Patient Privacy</h4>
                    <p className="text-xs text-muted-foreground">
                      Compliant with healthcare data confidentiality standards. Your records remain strictly between
                      you and your physician.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 grid place-items-center shrink-0 mt-0.5">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">AYUSH Insurance Guidance</h4>
                    <p className="text-xs text-muted-foreground">
                      Our desk verifies eligibility for cashless inpatient admissions across all recognized Indian
                      insurers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7">
              <div className="leaf-card p-6 sm:p-8 bg-card border border-primary/20 shadow-lg">
                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="size-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 grid place-items-center mx-auto">
                      <CheckCircle2 className="size-8" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">Inquiry Successfully Transmitted</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Thank you, <strong className="text-foreground">{fullName}</strong>. Our clinical coordinator
                      has received your message and will contact you via phone (<span className="text-foreground">{phone}</span>)
                      or email (<span className="text-foreground">{email || "provided email"}</span>) within 24 hours.
                    </p>
                    <div className="pt-4 flex justify-center gap-3">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFullName("");
                          setEmail("");
                          setPhone("");
                          setMessage("");
                        }}
                      >
                        Send Another Inquiry
                      </Button>
                      <Button asChild className="bg-primary text-primary-foreground">
                        <Link to="/book">Schedule Confirmed Slot</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="font-display text-xl font-semibold text-foreground pb-2 border-b border-border">
                      Patient Intake & Inquiry Form
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground">
                          Full Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          placeholder="e.g. Ananya Sharma"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground">
                          Contact Phone / WhatsApp <span className="text-destructive">*</span>
                        </label>
                        <Input
                          placeholder="e.g. +91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground">Email Address</label>
                        <Input
                          type="email"
                          placeholder="e.g. ananya@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground">Preferred Campus</label>
                        <select
                          value={campusChoice}
                          onChange={(e) => setCampusChoice(e.target.value)}
                          className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="Kerala Riverside Sanctuary">Kerala Riverside Sanctuary (Panchakarma HQ)</option>
                          <option value="Rishikesh Himalayan Retreat">Rishikesh Himalayan Retreat (Respiratory/Yoga)</option>
                          <option value="Varanasi Heritage Healing Center">Varanasi Heritage Healing Center (Chronic Joint Care)</option>
                          <option value="Bengaluru Urban OPD & Diagnostic">Bengaluru Urban Clinic (OPD & Follow-ups)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Inquiry Focus / Clinical Need</label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="Panchakarma Residential Stay">14–28 Day Inpatient Panchakarma Detoxification</option>
                        <option value="Chronic Disease Consultation">Chronic Condition Treatment (Arthritis, Skin, Metabolic)</option>
                        <option value="Nadi Pariksha OPD">In-Person Nadi Pariksha (Pulse Assessment) OPD</option>
                        <option value="Online Video Consultation">Telehealth Video Consultation with Senior Vaidya</option>
                        <option value="Ayurvedic Wellness Retreat">Restorative Wellness & Stress-Relief Retreat</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">
                        Health Concerns, Symptoms or Medical History
                      </label>
                      <Textarea
                        placeholder="Please briefly describe your current symptoms, digestion status, duration of illness, or any recent medical reports..."
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="bg-background"
                      />
                    </div>

                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <ShieldCheck className="size-3.5 text-primary" />
                      We do not share your medical information with external third parties.
                    </p>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full leaf-pill bg-primary hover:bg-primary/90 text-primary-foreground h-11 text-sm font-semibold transition-transform active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        "Transmitting Clinical Notes..."
                      ) : (
                        <>
                          <Send className="size-4 mr-2" />
                          Transmit Inquiry to Clinical Desk
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Visiting & Inpatient Stay FAQs */}
      <section className="py-16 md:py-24 border-t border-primary/10 bg-secondary/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <Badge variant="outline" className="leaf-pill px-3 py-1 text-xs text-primary border-primary/20">
              Clear Guidelines
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground font-semibold">
              Frequently Asked Visiting & Admission Questions
            </h2>
            <p className="text-sm text-muted-foreground">
              Everything you need to know before visiting our sanatoriums or arriving for an inpatient stay.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="leaf-card border border-border/80 bg-card overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-display text-lg font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`size-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Direct Booking Callout */}
      <section className="py-16 bg-gradient-to-r from-primary via-primary/95 to-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="size-12 rounded-full bg-accent/20 text-accent grid place-items-center mx-auto border border-accent/30">
            <Sparkles className="size-6" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
            Ready to Begin Your Healing Journey?
          </h2>

          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Reserve a guaranteed OPD slot or video consultation with our senior Ayurvedic physicians. Instant slot
            locking, digital reminders, and simulated digital checkout included.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="leaf-pill bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 shadow-lg shadow-black/20"
            >
              <Link to="/book">
                <Calendar className="size-4 mr-2" />
                Book Your Consultation Now
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="leaf-pill bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20"
            >
              <Link to="/treatments">Explore Treatment Library</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
