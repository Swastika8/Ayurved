import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  MapPin,
  Calendar,
  Maximize2,
  X,
  Layers,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SANCTUARY_GALLERY, type GalleryPhoto } from "@/data/gallery";

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

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const categories = [
    "All",
    "Sanctuary Architecture",
    "Panchakarma Theatres",
    "Herbal Herbarium",
    "Living Environment",
  ];

  const locations = ["All", "Kerala", "Rishikesh"];

  const filteredPhotos = useMemo(() => {
    return SANCTUARY_GALLERY.filter((photo) => {
      const matchCat = selectedCategory === "All" || photo.category === selectedCategory;
      const matchLoc = selectedLocation === "All" || photo.location === selectedLocation;
      return matchCat && matchLoc;
    });
  }, [selectedCategory, selectedLocation]);

  return (
    <PageShell>
      {/* 1. Gallery Header */}
      <section className="relative pt-12 pb-14 text-center max-w-4xl mx-auto space-y-5">
        <Badge
          variant="outline"
          className="rounded-full border-primary/30 text-primary px-4 py-1 text-xs tracking-wider uppercase"
        >
          <Sparkles className="size-3.5 text-accent mr-1.5" /> Architectural & Ecological Sanctum
        </Badge>
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
          Sanctuaries of <br />
          <span className="italic text-primary font-serif">Living Harmony</span>
        </h1>
        <p className="font-serif italic text-lg sm:text-2xl text-primary/80 max-w-2xl mx-auto">
          Explore our riverfront Kerala retreat and high-altitude Himalayan haven, carved from single-trunk teakwood, mud acoustic walls, and virgin medicinal groves.
        </p>

        {/* Filter Strip: Locations and Categories */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Location Filters */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-secondary/60 border border-border/80">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  selectedLocation === loc
                    ? "bg-primary text-primary-foreground shadow-lift"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {loc === "All" ? "All Locations" : `${loc} Sanctuary`}
              </button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-accent text-accent-foreground shadow-lift"
                    : "bg-background/80 text-muted-foreground hover:bg-secondary/70 border border-border/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Fluid Asymmetric Architectural Masonry Showcase */}
      <section className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo) => {
            const isWide = photo.span === "wide";
            const isTall = photo.span === "tall";

            return (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className={`group relative rounded-[2.5rem] overflow-hidden cursor-pointer shadow-soft hover:shadow-lift border border-border/80 hover:border-primary/40 transition-all duration-500 flex flex-col justify-end ${
                  isWide ? "lg:col-span-2 min-h-[380px] lg:min-h-[440px]" : isTall ? "min-h-[460px] lg:min-h-[520px]" : "min-h-[360px]"
                }`}
              >
                {/* Visual Image Layer */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Vignette Gradient so typography remains pristine */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
                </div>

                {/* Top Corner Badges */}
                <div className="absolute top-5 inset-x-5 flex items-center justify-between z-10">
                  <span className="text-[11px] font-mono font-medium px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-foreground border border-border/60 flex items-center gap-1.5 shadow-sm">
                    <MapPin className="size-3 text-accent" /> {photo.location}
                  </span>
                  <span className="size-8 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity border border-border/60 shadow-sm">
                    <Maximize2 className="size-3.5" />
                  </span>
                </div>

                {/* Bottom Content Layer Floating over Negative Space */}
                <div className="relative z-10 p-6 sm:p-8 space-y-2 text-white">
                  <span className="text-[11px] font-mono text-amber-300 font-semibold uppercase tracking-wider block">
                    {photo.category}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                    {photo.title}
                  </h3>
                  <p className="font-serif italic text-xs text-white/80">
                    {photo.sanskritSubtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed line-clamp-2 pt-1 group-hover:line-clamp-none transition-all">
                    {photo.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Lightbox Dialog for Full Resolution Visual */}
      <Dialog open={!!activePhoto} onOpenChange={(open) => !open && setActivePhoto(null)}>
        {activePhoto && (
          <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-[2.5rem] bg-card border-border/80">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[65vh]">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-full object-cover filter saturate-[1.12] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="p-8 sm:p-10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
                    {activePhoto.category} • {activePhoto.location} Sanctuary
                  </span>
                  <h2 className="font-display text-2xl sm:text-4xl font-bold text-foreground mt-1">
                    {activePhoto.title}
                  </h2>
                  <p className="font-serif italic text-sm text-primary/80 mt-0.5">
                    {activePhoto.sanskritSubtitle}
                  </p>
                </div>

                <Button asChild size="lg" className="rounded-full px-8 shadow-lift">
                  <Link to="/book">Schedule Sanctuary Tour</Link>
                </Button>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-2">
                {activePhoto.description}
              </p>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* 4. Sanctuary Visit CTA */}
      <section className="p-10 sm:p-16 rounded-[3rem] bg-secondary/30 border border-border/80 text-center space-y-6">
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground max-w-2xl mx-auto">
          Immerse Yourself in Healing Architecture
        </h2>
        <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Plan an inpatient therapeutic retreat at our Kerala river valley estate or Rishikesh mountain hermitage.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8 shadow-lift">
            <Link to="/book">Inpatient Admission Request</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-border">
            <Link to="/contact">Speak with Sanctuary Coordinator</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
