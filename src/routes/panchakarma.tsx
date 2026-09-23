import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Panchakarma3DStage } from "@/components/ayurveda/Panchakarma3DStage";
import {
  Sparkles,
  Droplets,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Flame,
  Wind,
  HeartPulse,
  Activity,
  Layers,
  Utensils,
  Video,
} from "lucide-react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export const Route = createFileRoute("/panchakarma")({
  head: () => ({
    meta: [
      { title: "Panchakarma Deep Dive — 5 Master Bio-Purifications | Aarogya Hospital" },
      {
        name: "description",
        content:
          "Detailed clinical protocols for the five classical Panchakarma therapies: Vamana, Virechana, Basti, Nasya, and Raktamokshana. 3D animated walkthroughs and inpatient schedules.",
      },
    ],
  }),
  component: PanchakarmaPage,
});

interface PanchakarmaTherapyDetail {
  id: "vamana" | "virechana" | "basti" | "nasya" | "raktamokshana";
  name: string;
  sanskrit: string;
  meaning: string;
  targetDosha: string;
  governingOrgan: string;
  duration: string;
  videoTitle: string;
  videoSubtitle: string;
  videoBadge: string;
  summary: string;
  purvakarma: string;
  procedure: string[];
  paschatkarma: string;
  indications: string[];
  contraindications: string[];
  herbalMedicaments: string;
}

const PANCHAKARMA_THERAPIES: Record<string, PanchakarmaTherapyDetail> = {
  vamana: {
    id: "vamana",
    name: "Vamana Karma (Therapeutic Emesis)",
    sanskrit: "वमन कर्म",
    meaning: "Physiological elimination of aggravated Kapha through the upper gastric pathway",
    targetDosha: "Kapha (Primary) & Pitta (Secondary)",
    governingOrgan: "Chest, Lungs, Stomach & Upper Gastrointestinal tract",
    duration: "7 to 10 days complete protocol",
    videoTitle: "Vamana 3D Sequence: Gastric & Bronchial Cleansing",
    videoSubtitle: "Anatomical rendering of Kapha liquefaction through internal Snehana and controlled therapeutic emesis.",
    videoBadge: "3D Animation Ready",
    summary:
      "Vamana is the premier Shodhana procedure for eradicating deep-seated Kapha disorders. When Kapha congests bronchial pathways or creates persistent metabolic lethargy, controlled emesis removes toxins before they can enter the deeper tissues.",
    purvakarma:
      "3-5 days of internal oleation (Snehapana) with gradually increasing doses of medicated ghee (Indukantha Ghrita) until stools become unctuous, followed by full-body Abhyanga and steam (Swedana) to mobilize toxins into the stomach.",
    procedure: [
      "Patient is served sweet milk or sugarcane juice to fill the stomach and cushion mucosal lining.",
      "Vaidya administers powdered Madanaphala (Randia dumetorum) and Yashtimadhu (Licorice) decoction.",
      "Controlled physiological expulsion occurs in 4 to 8 gentle bouts under constant pulse and blood pressure monitoring.",
      "Assessment of Shuddhi (purification degree) by checking mucus, bile, and Pitta clearance.",
    ],
    paschatkarma:
      "Dhumapana (medicinal herbal smoking with turmeric) to soothe vocal cords, followed by Samsarjana Krama: a strict graduated dietary diet starting from warm rice water (Manda) progressing to seasoned lentils (Yusha).",
    indications: [
      "Bronchial Asthma & chronic bronchitis",
      "Psoriasis, chronic eczema & vitiligo",
      "Metabolic sluggishness, obesity & high cholesterol",
      "Chronic allergic rhinitis & sinus congestion",
    ],
    contraindications: [
      "Severe hypertension & cardiac conditions",
      "Acute peptic ulcers or hematemesis",
      "Pregnancy, emaciation & extreme elderly fragility",
    ],
    herbalMedicaments: "Madanaphala, Yashtimadhu, Vacha, Pippali, Saindhava salt",
  },
  virechana: {
    id: "virechana",
    name: "Virechana Karma (Therapeutic Purgation)",
    sanskrit: "विरेचन कर्म",
    meaning: "Elimination of aggravated Pitta and toxic bile through the lower gastrointestinal pathway",
    targetDosha: "Pitta (Primary) & Rakta Dhatu (Blood)",
    governingOrgan: "Liver, Gallbladder, Spleen & Small Intestine",
    duration: "8 to 12 days complete protocol",
    videoTitle: "Virechana 3D Sequence: Hepato-Biliary Purification",
    videoSubtitle: "Step-by-step visualization of bile drainage, liver detoxification, and small intestinal clearance.",
    videoBadge: "3D Animation Ready",
    summary:
      "Virechana is classical Ayurveda's most universally tolerated and effective cleansing therapy for chronic inflammatory and liver conditions. It purges toxic Pitta and metabolic heat through controlled herbal purgation.",
    purvakarma:
      "Internal intake of medicated bitter ghee (Guggulutiktaka or Mahatiktaka Ghrita) for 3-7 days, followed by two days of Abhyanga and steam to direct Pitta toxins toward the small intestine (Amashaya to Pakwashaya).",
    procedure: [
      "On the scheduled morning, patient takes warm herbal purgative (Trivrit Lehyam or Castor formulation) at approximately 8:00 AM.",
      "Controlled purgation commences within 1-2 hours, purging toxic bile, stagnant acids, and accumulated Pitta.",
      "The clinical team counts and evaluates each bout (*Vega*) to monitor hydration and therapeutic depth.",
      "The therapy concludes naturally when yellowish clear mucus appears, marking complete intestinal renewal.",
    ],
    paschatkarma:
      "Rest in a warm draft-free room. The patient follows a 3 to 7-day Samsarjana Krama liquid-to-solid diet to safely rekindle digestive fire (Agni).",
    indications: [
      "Chronic dermatitis, urticaria, acne & skin pigmentation",
      "Liver inflammation, jaundice & sluggish bile secretion",
      "Severe acid reflux (GERD), gastritis & burning ulcers",
      "Gout, hyperuricemia & burning feet syndrome",
    ],
    contraindications: [
      "Ulcerative colitis in bleeding acute phase",
      "Severe diarrhea or dysentery",
      "Acute fever or severe dehydration",
    ],
    herbalMedicaments: "Trivrit (Operculina turpethum), Haritaki, Aragvadha (Cassia fistula), Castor oil",
  },
  basti: {
    id: "basti",
    name: "Basti Karma (Medicated Herbal Enema)",
    sanskrit: "बस्ति कर्म",
    meaning: "The Supreme Master Therapy: cleansing and nourishing Vata at its primary seat (the colon)",
    targetDosha: "Vata (Governs 80+ Classical Diseases)",
    governingOrgan: "Colon, Nervous System, Spine, Bones & Joints",
    duration: "8 (Yoga Basti), 15 (Kala Basti), or 30 days (Karma Basti)",
    videoTitle: "Basti 3D Sequence: Colon to Cellular Translocation",
    videoSubtitle: "Micro-animation of lipid-soluble herbal decoctions absorbing through the colonic mucosa into the central nervous system.",
    videoBadge: "3D Animation Ready",
    summary:
      "Charaka Samhita proclaims Basti to be 'Ardha Chikitsa' (half of all medical science). Because the large intestine is the primary biological seat of Vata dosha, introducing warm herbal decoctions and unctuous oils here rectifies neuromuscular, skeletal, and degenerative disorders throughout the entire body.",
    purvakarma:
      "Abhyanga with Dhanwantharam Taila followed by localized herbal steam over the lower back, pelvis, and abdomen to relax pelvic sphincter muscles.",
    procedure: [
      "Administered using traditional smooth cannula nozzles while patient lies in Left Lateral position.",
      "Alternates between **Niruha Basti** (cleansing decoction with honey, rock salt, herbal paste, and oil) and **Anuvasana Basti** (pure nourishing herbal oil).",
      "The oil Basti is retained for several hours, lubricating deep skeletal and neural tissues.",
      "The decoction Basti is expelled within 15 to 45 minutes, drawing out heavy metabolic Ama.",
    ],
    paschatkarma:
      "Warm herbal bath followed by nourishing, easily digestible warm rice gruel with rock salt and cow ghee.",
    indications: [
      "Osteoarthritis, rheumatoid arthritis & osteoporosis",
      "Sciatica, lumbar disc prolapse & cervical spondylosis",
      "Chronic constipation, flatulence & irritable bowel",
      "Parkinsonism, motor-neuron disorders & hemiplegia",
    ],
    contraindications: [
      "Acute rectal bleeding or active hemorrhoids",
      "Severe intestinal perforation or bowel obstruction",
      "Immediate post-operative abdominal wounds",
    ],
    herbalMedicaments: "Dashamoola decoction, Erandamoola, Sahacharadi Taila, Rock salt, Pure raw honey",
  },
  nasya: {
    id: "nasya",
    name: "Nasya Karma (Nasal Errhine Therapy)",
    sanskrit: "नस्य कर्म",
    meaning: "Administration of medicated oils into nostrils—the direct gateway to the brain and cranial senses",
    targetDosha: "Urdhva Jatrugata (All Doshas in Head, Neck, Eyes & Brain)",
    governingOrgan: "Cranial Cavity, Sinuses, Eyes, Ears & Pituitary Axis",
    duration: "7 to 14 days consecutive course",
    videoTitle: "Nasya 3D Sequence: Olfactory to Limbic Pathway",
    videoSubtitle: "Visualization of medicated lipid molecules crossing the cribriform plate to nourish cranial nerves and pituitary glands.",
    videoBadge: "3D Animation Ready",
    summary:
      "Classical aphorism: 'Nasa Hi Shiraso Dvaram' (The nose is the doorway to the brain). By instilling precise drops of herbalized oils through the nasal passages, Nasya clears stagnant sinus fluids, stimulates cranial nerve circulation, and balances neuro-endocrine function.",
    purvakarma:
      "Gentle face, neck, and shoulder massage (Mukha Abhyanga) followed by localized herbal steam (Nadi Swedana) directed at cheeks, forehead, and bridge of nose to open cranial micro-channels.",
    procedure: [
      "Patient reclines comfortably with neck slightly extended backward.",
      "Vaidya instills measured drops of warm medicated oil (Anu Taila or Shadbindu) into each nostril.",
      "Patient inhales smoothly, allowing the medicine to permeate the retro-pharyngeal and sinus spaces.",
      "Secretions reaching the throat are gently spat out into a spittoon; never swallowed.",
    ],
    paschatkarma:
      "Warm water gargles with rock salt, followed by soothing herbal smoke inhalation (Dhumapana) to clear residual mucus. Patient rests indoors away from cold wind.",
    indications: [
      "Chronic migraines, tension headaches & cluster headaches",
      "Chronic sinusitis, allergic rhinitis & nasal polyps",
      "Premature greying of hair and alopecia",
      "Cervical spondylosis, frozen shoulder & facial paralysis (Bell's Palsy)",
    ],
    contraindications: [
      "Immediately after food or heavy water consumption",
      "Acute coryza (heavy active running nose) with high fever",
      "Intoxication or severe bleeding nasal trauma",
    ],
    herbalMedicaments: "Anu Taila, Shadbindu Taila, Ksheerabala 101, Brahmi Ghrita",
  },
  raktamokshana: {
    id: "raktamokshana",
    name: "Raktamokshana (Blood Purification & Jalauka)",
    sanskrit: "रक्तमोक्षण कर्म (जलौकावचारण)",
    meaning: "Precise biological therapeutic blood purification using medicinal non-venomous leeches (Jalauka)",
    targetDosha: "Pitta & Rakta Dhatu (Blood Tissue)",
    governingOrgan: "Micro-capillary Beds, Skin Layers & Venous Valves",
    duration: "1 to 3 sessions scheduled at 7-day intervals",
    videoTitle: "Raktamokshana 3D Sequence: Medicinal Leech Enzyme Secretion",
    videoSubtitle: "High-magnification visualization of Hirudin enzymes breaking down micro-thrombi and localized inflammatory congestion.",
    videoBadge: "3D Animation Ready",
    summary:
      "When toxins permeate deep into the blood plasma (*Rakta Dhatu*) causing stubborn skin pathologies or localized vascular swelling, Sushruta Samhita prescribes Raktamokshana. We specialize in painless medicinal leech therapy (Jalaukavacharana) using certified sterile laboratory-cultured leeches.",
    purvakarma:
      "Purification of the affected skin area with turmeric water. Leeches are activated in turmeric-infused water to stimulate appetite before gentle placement.",
    procedure: [
      "Medicinal leech (Hirudo medicinalis) is positioned directly over the area of venous stagnation or inflammation.",
      "The leech punctures the skin painlessly (secreting natural anesthetics and vasodilators) and extracts stagnant deoxygenated blood.",
      "The session lasts 30 to 50 minutes until the leech detaches naturally.",
      "The site is dressed with sterile antiseptic turmeric and Shatadhauta Ghrita (100-times washed ghee).",
    ],
    paschatkarma:
      "Sterile bandage dressing. The patient is advised to avoid direct sunlight, spicy food, and strenuous exercise for 24 hours.",
    indications: [
      "Varicose veins & chronic venous stasis ulcers",
      "Severe localized eczema, psoriasis plaques & stubborn acne",
      "Sciatica and localized bursitis / joint effusion",
      "Alopecia areata and thrombosed micro-vessels",
    ],
    contraindications: [
      "Hemophilia or bleeding coagulopathies",
      "Severe anemia (Hemoglobin < 8 g/dL)",
      "Active systemic sepsis or extreme cachexia",
    ],
    herbalMedicaments: "Pure Turmeric powder, Triphala Kashayam, Shatadhauta Ghrita, Jatyadi Taila",
  },
};

export function PanchakarmaPage() {
  const [selectedTherapyKey, setSelectedTherapyKey] = useState<string>("vamana");
  const activeTherapy = PANCHAKARMA_THERAPIES[selectedTherapyKey] ?? PANCHAKARMA_THERAPIES["vamana"]!;

  return (
    <PageShell>
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-secondary/40 to-background border border-border px-6 py-14 sm:px-12 sm:py-20 text-center">
        <div className="mx-auto max-w-4xl space-y-4">
          <Badge variant="outline" className="rounded-full border-primary/30 text-primary px-4 py-1 text-xs">
            <Sparkles className="size-3.5 text-accent mr-1.5" /> Classical Shodhana Chikitsa
          </Badge>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-foreground text-balance-display">
            The Five Classical Panchakarma Therapies
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-primary/80">
            “Dosha Kadachit Kupyanti Jita Langhana Pachanaih, <br className="hidden sm:inline" />
            Jitah Samshodhanairye Tu Na Tesham Punarudbhavah.”
          </p>
          <p className="text-xs font-sans text-muted-foreground max-w-lg mx-auto italic">
            — Charaka Samhita (Diseases managed by fasting or pills may recur; but those eradicated by Panchakarma Shodhana never return.)
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto pt-2">
            Panchakarma is an intensive 3-phase bio-purification hospital protocol that mobilizes cellular toxins (*Ama*), conducts them into the alimentary canal, and expels them via their nearest physiological pathway.
          </p>
        </div>
      </section>

      {/* The 3 Classical Phases of Shodhana */}
      <section className="mt-14 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-display text-3xl font-bold text-foreground">
            The Three Inviolable Clinical Phases
          </h2>
          <p className="text-sm text-muted-foreground">
            A genuine Panchakarma requires preparatory and restorative phases; bypassing them makes the therapy harmful.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="leaf-card p-6 space-y-3 border-primary/20">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-primary font-bold">STAGE 01</span>
              <Badge variant="outline" className="text-[10px]">Preparation</Badge>
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">
              Purvakarma (Mobilization)
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Before expelling toxins, the body undergoes <strong>Deepana & Pachana</strong> (herbal digestive fire igniters), followed by <strong>Snehana</strong> (internal drinking of medicated ghee) and <strong>Swedana</strong> (herbal steam). This softens tissues and slides stubborn toxins toward the GI tract.
            </p>
          </div>

          <div className="leaf-card p-6 space-y-3 border-accent/30 bg-accent/5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-accent font-bold">STAGE 02</span>
              <Badge className="text-[10px] bg-accent/20 text-accent-foreground border-accent/30">Main Expulsion</Badge>
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">
              Pradhanakarma (Expulsion)
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The execution of one or more of the <strong>5 Master Bio-purifications</strong> (Vamana, Virechana, Basti, Nasya, Raktamokshana) under round-the-clock supervision of resident Vaidyas and skilled therapists inside specialized Droni suites.
            </p>
          </div>

          <div className="leaf-card p-6 space-y-3 border-border">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground font-bold">STAGE 03</span>
              <Badge variant="outline" className="text-[10px]">Restoration</Badge>
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">
              Paschatkarma (Rekindling)
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Post-cleanse, digestive fire (*Agni*) is as delicate as a newborn flame. Through <strong>Samsarjana Krama</strong> (a graduated rice water to wholesome grain diet) and <strong>Rasayana</strong> (longevity herbs), tissues rebuild with fresh vitality.
            </p>
          </div>
        </div>
      </section>

      {/* Living 3D Animated Therapy Stage */}
      <section className="mt-20">
        <Panchakarma3DStage />
      </section>

      {/* Master Interactive 5 Therapies Explorer */}
      <section className="mt-24 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="outline" className="border-primary/30 text-primary text-xs">
            Interactive Deep Dive
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Select a Shodhana Therapy to Explore
          </h2>
          <p className="text-sm text-muted-foreground">
            Inspect the anatomical mechanism, designated 3D visualization slot, clinical protocol, and indications.
          </p>
        </div>

        {/* Therapy Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Object.values(PANCHAKARMA_THERAPIES).map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedTherapyKey(item.id)}
              className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedTherapyKey === item.id
                  ? "bg-primary text-primary-foreground shadow-lift"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-border"
              }`}
            >
              <span>{item.name.split("(")[0]}</span>
              <span className="font-serif italic text-xs opacity-75">({item.sanskrit.split(" ")[0]})</span>
            </button>
          ))}
        </div>

        {/* Active Therapy Deep-Dive Container */}
        <div className="rounded-[2.5rem] border border-border bg-card p-6 sm:p-12 shadow-soft space-y-10 animate-fade-in">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border pb-8">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                  {activeTherapy.targetDosha}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Organ: {activeTherapy.governingOrgan}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                  <Clock className="size-3" /> {activeTherapy.duration}
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                {activeTherapy.name}
              </h2>
              <p className="font-serif italic text-base text-primary/80">
                {activeTherapy.sanskrit} — {activeTherapy.meaning}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                {activeTherapy.summary}
              </p>
            </div>

            <Button asChild size="lg" className="rounded-full px-8 shrink-0 self-start lg:self-center shadow-lift">
              <Link to="/book">Schedule Initial Consultation</Link>
            </Button>
          </div>

          {/* 3D / Video Visualization Stage Container */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                <Video className="size-4 text-accent" /> 3D Anatomical Visualization & Protocol Walkthrough:
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">PREVIEW_SLOT: {activeTherapy.id.toUpperCase()}_3D</span>
            </div>
            <MediaPlaceholder
              title={activeTherapy.videoTitle}
              subtitle={activeTherapy.videoSubtitle}
              badge={activeTherapy.videoBadge}
              aspectRatio="21/9"
              previewUrl="/media/panchakarma-main.jpg"
              duration="4:20 mins"
              details={[
                `Cellular dislodging of ${activeTherapy.targetDosha}`,
                `Pre-treatment internal oleation protocol`,
                `Post-treatment Samsarjana Krama dietary cycle`
              ]}
            />
          </div>

          {/* Clinical Protocol Details Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Step-by-Step Procedure */}
            <div className="leaf-card p-6 space-y-4 border-primary/20">
              <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                <Activity className="size-5 text-primary" /> Step-by-Step Hospital Procedure
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground block mb-1">1. Preparatory Phase (Purvakarma):</strong>
                  <p>{activeTherapy.purvakarma}</p>
                </div>

                <div>
                  <strong className="text-foreground block mb-1">2. Main Shodhana Execution:</strong>
                  <ul className="space-y-1.5 pl-2">
                    {activeTherapy.procedure.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="size-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <strong className="text-foreground block mb-1">3. Restoration & Diet (Paschatkarma):</strong>
                  <p>{activeTherapy.paschatkarma}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-border text-xs text-foreground/80">
                <strong>Primary Formulations Used: </strong>
                <span>{activeTherapy.herbalMedicaments}</span>
              </div>
            </div>

            {/* Indications & Contraindications */}
            <div className="space-y-6">
              {/* Indications */}
              <div className="leaf-card-alt p-6 space-y-3 border-primary/20">
                <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-primary" /> Clinical Indications (Who Benefits)
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  {activeTherapy.indications.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="size-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contraindications */}
              <div className="leaf-card-alt p-6 space-y-3 border-destructive/20 bg-destructive/5">
                <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                  <ShieldAlert className="size-5 text-destructive" /> Strict Contraindications
                </h3>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {activeTherapy.contraindications.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="size-1.5 rounded-full bg-destructive shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inpatient Admission Call to Action */}
      <section className="mt-20 leaf-card bg-gradient-to-tr from-secondary/60 via-card to-primary/10 p-8 sm:p-12 border-primary/20 text-center max-w-4xl mx-auto space-y-4">
        <HeartPulse className="size-8 text-primary mx-auto" />
        <h2 className="font-display text-3xl font-bold text-foreground">
          Ready to Cleanse at the Root?
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Panchakarma requires inpatient monitoring or daily outpatient hospital visits. Begin with an online or in-person pulse assessment by our resident Vaidyas.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-8 shadow-soft">
            <Link to="/book">Book Nadi Pariksha & Panchakarma Admission</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-7">
            <Link to="/contact">Sanctuary Accommodation Details</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
