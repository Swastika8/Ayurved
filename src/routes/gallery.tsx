import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Image as ImageIcon,
  Sparkles,
  Eye,
  Maximize2,
  Calendar,
  Layers,
  Camera,
  MapPin,
  Leaf,
  Flower2,
  Heart,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Campus & Sanctuary Gallery — Healing Spaces | Aarogya Hospital" },
      {
        name: "description",
        content:
          "Take a visual journey through Aarogya Ayurveda Hospital: classical wooden Droni therapy suites, 200-species medicinal gardens, lotus ponds, and serene inpatient cottages.",
      },
    ],
  }),
  component: GalleryPage,
});

interface GalleryItem {
  id: string;
  title: string;
  category: "Sanctuary" | "Therapy Suites" | "Herbal Gardens" | "Inpatient Stays";
  location: string;
  description: string;
  aspect: "landscape" | "portrait" | "wide";
  gradient: string;
  specs: string[];
  imageUrl?: string | undefined;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-1",
    title: "Master Panchakarma Droni Suite",
    category: "Therapy Suites",
    location: "Kairali Block, Kerala Sanctuary",
    description: "Carved from a single sacred medicinal Strychnos nux-vomica (Kanjiram) wood trunk, polished with herbal oils to maintain sterile therapeutic resonance.",
    aspect: "landscape",
    gradient: "from-primary/20 via-secondary to-accent/10",
    specs: ["Hand-carved single trunk Droni", "Solid copper Shirodhara oscillation urn", "Ayurvedic steam cabin (Swedana)"],
    imageUrl: "/media/gallery-hospital.jpg",
  },
  {
    id: "g-2",
    title: "Living Oushadhi Botanical Garden",
    category: "Herbal Gardens",
    location: "Periyar Riverside Campus",
    description: "Over 200 rare species of endangered Ayurvedic medicinal flora grown organically according to lunar planting cycles (Vrikshayurveda).",
    aspect: "portrait",
    gradient: "from-primary/25 via-primary/10 to-card",
    specs: ["Organic lunar agriculture", "Rare Shallaki & Ashwagandha cultivars", "Natural spring irrigation"],
  },
  {
    id: "g-3",
    title: "Lotus Meditation Pavilion & Yoga Shala",
    category: "Sanctuary",
    location: "Rishikesh Mountain Foothills",
    description: "Open-air teakwood meditation platform overlooking the sacred river, designed for morning Pranayama and silence (Mouna) retreats.",
    aspect: "wide",
    gradient: "from-accent/20 via-secondary to-primary/15",
    specs: ["Panoramic Himalayan view", "Acoustic resonance design", "Naturally ventilated open architecture"],
    imageUrl: "/media/wellness-scene.jpg",
  },
  {
    id: "g-4",
    title: "Inpatient Healing Cottages",
    category: "Inpatient Stays",
    location: "Kerala Riverside Sanctuary",
    description: "Thatched eco-friendly brick cottages cooled by river breezes, free from electromagnetic smog, ensuring profound nervous system resetting.",
    aspect: "landscape",
    gradient: "from-secondary via-card to-primary/10",
    specs: ["Terracotta tiled natural flooring", "Organic cotton bedding", "Dedicated consultation alcove"],
    imageUrl: "/media/contact-architecture.jpg",
  },
  {
    id: "g-5",
    title: "Oushadha Shala (Traditional Pharmacy)",
    category: "Herbal Gardens",
    location: "Central Campus Laboratory",
    description: "Where raw decoctions (Kashayams), fermented tonics (Arishtams), and medicated clarified butters (Ghritams) simmer in bronze urulis.",
    aspect: "portrait",
    gradient: "from-primary/15 via-secondary to-accent/20",
    specs: ["GMP certified processing", "Traditional wood-fired bronze cauldrons", "Zero preservative policy"],
    imageUrl: "/media/panchakarma-objects.jpg",
  },
  {
    id: "g-6",
    title: "Nadi Pariksha Pulse Examination Chambers",
    category: "Sanctuary",
    location: "Consultation Wing",
    description: "Calm, sound-insulated consulting sanctuaries where senior Vaidyas assess three-finger pulse rhythms to unveil subtle constitutional imbalances.",
    aspect: "landscape",
    gradient: "from-accent/15 via-secondary to-primary/10",
    specs: ["Natural circadian lighting", "Aromatherapeutic Sambrani resin", "Paperless touch diagnostic screen"],
  },
  {
    id: "g-7",
    title: "Satvik Dining Sanctum (Annapurna Hall)",
    category: "Sanctuary",
    location: "Courtyard Center",
    description: "Where nourishing tridoshic meals are freshly prepared thrice daily according to doctor prescriptions and consumed in mindful gratitude.",
    aspect: "landscape",
    gradient: "from-primary/20 via-card to-secondary",
    specs: ["Farm-to-table organic vegetables", "Freshly churned A2 buttermilk", "Tailored seasonal herbs"],
  },
  {
    id: "g-8",
    title: "Shirodhara & Takradhara Chamber",
    category: "Therapy Suites",
    location: "Ayur Bhavan South",
    description: "Dimly lit, temperature-controlled sanctuary with sound-dampening acoustic mud walls dedicated to profound neuro-sensory restoration.",
    aspect: "wide",
    gradient: "from-secondary via-primary/15 to-accent/10",
    specs: ["Acoustic mud insulation", "Filtered continuous oil recycling", "Relaxing water fountain audio"],
  },
];

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ["All", "Sanctuary", "Therapy Suites", "Herbal Gardens", "Inpatient Stays"];

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <PageShell>
      {/* Header Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-secondary/40 to-background border border-border px-6 py-14 sm:px-12 sm:py-20 text-center">
        <div className="mx-auto max-w-3xl space-y-4">
          <Badge variant="outline" className="rounded-full border-primary/30 text-primary px-4 py-1 text-xs">
            <Camera className="size-3.5 text-accent mr-1.5" /> Visual Sanctuary Tour
          </Badge>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-foreground text-balance-display">
            A Living Sanctuary of Healing
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-primary/80">
            Step into our serene grounds: classical wooden Droni suites, organic medicinal botanical nurseries, and peaceful riverside cottages.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Every therapy room, garden pathway, and dining pavilion is oriented according to Vastu Shastra principles to maximize positive prana and tranquility.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="mt-12 space-y-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Fluid Masonry Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer leaf-card p-6 flex flex-col justify-between hover:border-primary/50 hover:shadow-lift transition-all relative overflow-hidden"
            >
              {/* Media Visual Stage with Real Image or Elegant Gradient */}
              <div
                className={`relative w-full rounded-2xl border border-primary/20 bg-gradient-to-tr ${item.gradient} p-5 flex flex-col justify-between overflow-hidden aspect-[4/3] group-hover:scale-[1.01] transition-transform`}
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {item.imageUrl && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 pointer-events-none" />
                )}

                <div className="relative z-10 flex items-center justify-between">
                  <Badge variant="secondary" className="text-[10px] bg-card/85 backdrop-blur-md font-semibold">
                    {item.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-[10px] text-foreground/90 bg-card/85 backdrop-blur-md px-2 py-0.5 rounded-full font-mono">
                    <MapPin className="size-3 text-primary" /> {item.location.split(",")[0]}
                  </span>
                </div>

                {!item.imageUrl ? (
                  <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-4">
                    <div className="size-14 rounded-full bg-card/80 shadow-soft flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <ImageIcon className="size-6 text-primary" />
                    </div>
                    <span className="mt-2 text-[10px] uppercase tracking-wider font-semibold text-primary/80">
                      High-Res Visual Specimen
                    </span>
                  </div>
                ) : (
                  <div className="relative z-10 my-auto" />
                )}

                <div className="relative z-10 flex items-center justify-between text-[11px] text-white/90 border-t border-white/20 pt-2">
                  <span className="flex items-center gap-1 drop-shadow-xs">
                    <Eye className="size-3 text-accent" /> Click to inspect space
                  </span>
                  <Maximize2 className="size-3 text-white drop-shadow-xs group-hover:scale-110 transition-transform" />
                </div>
              </div>

              {/* Title & Excerpt */}
              <div className="pt-4 space-y-2">
                <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs text-primary font-medium">
                <span>View Space Blueprint</span>
                <span className="text-muted-foreground text-[10px]">Photo Slot Active</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Campus Booking Prompt */}
      <section className="mt-20 leaf-card-alt bg-gradient-to-tr from-secondary/60 via-card to-primary/10 p-8 sm:p-12 border-primary/20 text-center max-w-4xl mx-auto space-y-4">
        <Sparkles className="size-6 text-accent mx-auto" />
        <h2 className="font-display text-3xl font-bold text-foreground">
          Experience the Peace of Our Sanctuary in Person
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Whether joining us for day-visit outpatient consultations or checking into our residential cottages for comprehensive Panchakarma, our staff welcomes you with traditional hospitality.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-7 shadow-soft">
            <Link to="/book">Schedule Inpatient or OPD Consultation</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-7">
            <Link to="/contact">Directions & Campus Map</Link>
          </Button>
        </div>
      </section>

      {/* Modal Preview Dialog */}
      <Dialog open={!!activeItem} onOpenChange={(open) => !open && setActiveItem(null)}>
        {activeItem && (
          <DialogContent className="max-w-2xl bg-card border-border rounded-3xl p-6 sm:p-8">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary">{activeItem.category}</Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                  <MapPin className="size-3 text-primary" /> {activeItem.location}
                </span>
              </div>
              <DialogTitle className="font-display text-2xl sm:text-3xl text-foreground font-bold">
                {activeItem.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground leading-relaxed pt-1">
                {activeItem.description}
              </DialogDescription>
            </DialogHeader>

            {activeItem.imageUrl && (
              <div className="rounded-2xl overflow-hidden aspect-video border border-border shadow-md my-2">
                <img src={activeItem.imageUrl} alt={activeItem.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="space-y-4 pt-2">
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-2">
                <span className="text-[11px] font-semibold text-primary uppercase tracking-wider block">
                  Architectural & Classical Specifications
                </span>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {activeItem.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-accent" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-secondary/30 p-3 text-[11px] text-muted-foreground flex items-center justify-between">
                <span>Integrated image uploads ready. Upload high-res photography via Admin.</span>
                <span className="font-mono text-[10px] text-primary">STATUS: PHOTO_SLOT_READY</span>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </PageShell>
  );
}
