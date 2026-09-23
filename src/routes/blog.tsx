import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Calendar,
  Clock,
  Search,
  Sparkles,
  ArrowRight,
  UserCheck,
  Tag,
  Share2,
  Bookmark,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Wisdom Blog — Classical Ayurveda Insights & Healing Articles | Aarogya Hospital" },
      {
        name: "description",
        content:
          "Explore authentic Ayurvedic health publications, seasonal detox guides (Ritucharya), herbal monographs, and clinical case studies authored by our Vaidyas.",
      },
    ],
  }),
  component: BlogPage,
});

interface ArticleModel {
  id: string;
  title: string;
  category: "Ritucharya" | "Herbal Remedies" | "Panchakarma" | "Mind & Sattva" | "Diet & Digestion";
  readTime: string;
  author: string;
  date: string;
  snippet: string;
  content: string[];
  keyHerbs?: string[];
}

const ARTICLES_DATABASE: ArticleModel[] = [
  {
    id: "spring-kapha-detox",
    title: "Navigating Vasanta: The Science of Melting Spring Kapha",
    category: "Ritucharya",
    readTime: "6 min read",
    author: "Dr. Ananya Varma, BAMS (Senior Physician)",
    date: "March 18, 2026",
    snippet:
      "Why lethargy, hay fever, and heavy sinuses appear every spring, and how classical Vamana and dry powder massage (Udvartana) liberate your body from accumulated winter toxins.",
    content: [
      "In classical Ayurveda, late winter (Shishira) is a period of deep internal consolidation. Cold winds close the skin pores, trapping bodily heat and fostering a natural buildup of dense, unctuous Kapha dosha.",
      "As the sun turns northwards (Uttarayana) in spring (Vasanta), ambient solar rays dissolve and liquefy this dormant Kapha. Just as winter snow on Himalayan slopes melts under the spring sun, internal mucus surges into the stomach, lungs, and sinuses.",
      "The primary therapeutic intervention for this seasonal shift is Vamana (therapeutic emesis) under clinical supervision, followed by dry herbal powder brushing (Udvartana) using barley, triphala, and chickpea flour to stimulate lymphatic drainage.",
      "At home, replace heavy dairy and oily curries with warm ginger-infused black pepper soups, aged honey water, and roasted grains.",
    ],
    keyHerbs: ["Trikatu", "Haridra (Curcumin)", "Pippali", "Triphala"],
  },
  {
    id: "ashwagandha-myth-fact",
    title: "Ashwagandha (Withania Somnifera): Clarifying Modern Misconceptions",
    category: "Herbal Remedies",
    readTime: "8 min read",
    author: "Acharya Madhavan Namboodiri (Ayurvedacharya)",
    date: "March 10, 2026",
    snippet:
      "Modern wellness brands sell Ashwagandha as a blanket stress supplement. Classical texts teach that this hot, heavy root can aggravate high Pitta if taken without proper Anupana (carrier vehicle).",
    content: [
      "Ashwagandha translates to 'the smell of a horse'—alluding both to its unique earthy aroma and the primeval stamina and strength (*Bala*) it imparts to depleted tissues.",
      "While Western herbalism categorizes it simply as an 'adaptogen', classical Dravyaguna defines its specific energetics: Ushna (heating in potency), Guru (heavy to digest), and Snigdha (unctuous).",
      "Because of its heating nature, prescribing raw Ashwagandha capsules to patients with elevated Pitta, acid reflux, or liver inflammation frequently triggers insomnia and skin breakouts.",
      "To unlock its authentic Rasayana (longevity) power safely, it must be boiled in whole organic cow's milk with cooling spices like green cardamom, or processed into fermented Arishtams.",
    ],
    keyHerbs: ["Ashwagandha", "Shatavari", "Yashtimadhu", "Cardamom"],
  },
  {
    id: "shirodhara-neurology",
    title: "Shirodhara: What Happens in the Brain Under Warm Medicated Streaming?",
    category: "Panchakarma",
    readTime: "7 min read",
    author: "Dr. Rajesh K. Nair, MD (Ayu)",
    date: "February 28, 2026",
    snippet:
      "Modern clinical studies reveal that the continuous rhythmic oscillation of warm herbal oil over the forehead stimulates the Ajna Marma, triggering profound alpha-wave parasympathetic dominance.",
    content: [
      "Shirodhara is perhaps the most universally recognizable Ayurvedic therapy. Yet, it is neither a simple head massage nor a superficial spa indulgence—it is a specialized neuro-vascular therapeutic protocol.",
      "The constant, rhythmic oscillation of warm medicated oil (like Brahmi Taila or Ksheerabala) over the glabella stimulates the Trigeminal and Ophthalmic nerve branches, transmitting impulses to the autonomic regulatory center in the brainstem.",
      "EEG clinical studies conducted at our hospital confirm a rapid shift from anxious high-frequency Beta brainwaves to serene, restorative Alpha and Theta rhythms within 12 minutes of continuous streaming.",
      "Shirodhara is clinically indicated for intractable insomnia, generalized anxiety, tension headaches, cognitive fatigue, and diabetic neuropathy.",
    ],
    keyHerbs: ["Brahmi", "Shankhpushpi", "Jatamansi", "Ksheerabala Taila"],
  },
  {
    id: "circadian-agni",
    title: "The Biological Clocks of Agni: Why Midnight Snacking Disrupts Metabolism",
    category: "Diet & Digestion",
    readTime: "5 min read",
    author: "Dr. Meera Nambiar, BAMS",
    date: "February 14, 2026",
    snippet:
      "Charaka Samhita detailed circadian metabolic rhythms 3,000 years ago. Discover how aligning your meal timing with solar elevation prevents metabolic endotoxemia (Ama).",
    content: [
      "Our digestive capacity (Agni) is governed directly by the solar principle (Surya Mandala). When the sun is directly overhead at midday, our digestive bile and enzyme secretion peak.",
      "Conversely, after sunset, bodily physiology naturally transitions into cellular repair and cleansing. Eating heavy proteins, cheese, or dense desserts after 8:30 PM overwhelms sluggish digestive enzymes.",
      "Undigested food residues ferment in the gut, producing Ama—a sticky, foul-smelling endotoxin that seeps through intestinal mucosal membranes into lymphatic and arterial channels.",
      "By adhering to the classical rule—eating your largest meal between 12:00 PM and 1:30 PM and consuming a light, warm soup before sunset—patients routinely reverse chronic bloating, high triglycerides, and brain fog.",
    ],
    keyHerbs: ["Sunthi (Dry ginger)", "Jeeraka (Cumin)", "Dhanyaka (Coriander)", "Ajwain"],
  },
  {
    id: "ojas-immunity",
    title: "Cultivating Ojas: The Supreme Subtle Essence of Immunity and Radiance",
    category: "Mind & Sattva",
    readTime: "9 min read",
    author: "Acharya Madhavan Namboodiri",
    date: "January 22, 2026",
    snippet:
      "In Ayurveda, true immunity is not a hyperactive inflammatory shield, but Ojas—the refined nectar distilled through harmonious digestion, pure thoughts, and restorative sleep.",
    content: [
      "The human body consists of seven foundational tissues: Plasma (*Rasa*), Blood (*Rakta*), Muscle (*Mamsa*), Fat (*Medas*), Bone (*Asthi*), Marrow/Nerve (*Majja*), and Reproductive (*Shukra*).",
      "Each tissue takes roughly five days to refine into the next. At the pinnacle of this 35-day metabolic distillation lies Ojas—the supreme physiological essence responsible for disease resistance, cellular luminescence, and emotional equanimity.",
      "Chronic mental stress, angry outbursts, erratic sleep, and artificial stimulants directly deplete Ojas, manifesting as chronic exhaustion, recurring colds, and fragile resilience.",
      "Ojas is restored through Sattvic nourishment: pure A2 cow ghee, soaked peeled almonds, meditational silence (Mouna), deep forest immersion, and loving kindness.",
    ],
    keyHerbs: ["Amalaki", "Gold Bhasma", "Guduchi", "Saffron"],
  },
];

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<ArticleModel | null>(null);

  const categories = ["All", "Ritucharya", "Herbal Remedies", "Panchakarma", "Diet & Digestion", "Mind & Sattva"];

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATABASE.filter((art) => {
      const matchesCat = selectedCategory === "All" || art.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredStory = ARTICLES_DATABASE[0];

  return (
    <PageShell>
      {/* Magazine Editorial Header */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-secondary/40 to-background border border-border px-6 py-14 sm:px-12 sm:py-20">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <Badge variant="outline" className="rounded-full border-primary/30 text-primary px-4 py-1 text-xs">
            <BookOpen className="size-3.5 text-accent mr-1.5" /> Aarogya Ayurvedic Health Journal
          </Badge>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-foreground text-balance-display">
            Vedic Wisdom for Modern Wholeness
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-primary/80">
            Authoritative clinical monographs, seasonal living guides, and authentic classical perspectives authored by our senior physicians.
          </p>

          {/* Search bar inside header */}
          <div className="pt-4 max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search herbal articles, remedies, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-3 rounded-full bg-card border-border shadow-soft"
            />
          </div>
        </div>
      </section>

      {/* Featured Editorial Story: 3D Manuscript Stage */}
      {featuredStory && !searchQuery && selectedCategory === "All" && (
        <section className="mt-14">
          <div
            onClick={() => setActiveArticle(featuredStory)}
            className="group cursor-pointer rounded-[2.5rem] border border-border bg-card p-6 sm:p-10 lg:p-12 shadow-soft hover:shadow-lift transition-all hover:border-primary/40 relative overflow-hidden grid lg:grid-cols-12 gap-10 items-center"
          >
            {/* Editorial Content (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                  {featuredStory.category}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="size-3 text-accent" /> {featuredStory.readTime}
                </span>
                <span className="text-xs text-muted-foreground">• {featuredStory.date}</span>
                <Badge variant="outline" className="border-accent/40 text-accent font-medium text-[10px]">
                  Classical Monograph
                </Badge>
              </div>

              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground group-hover:text-primary transition-colors leading-[1.2]">
                {featuredStory.title}
              </h2>

              <p className="font-serif italic text-base text-primary/80">
                “Hemante Shishire Chaiva Kaphah Sanchayamacharet, Vasantarkamshubhirbhinno Hanti Kayagnimagatah.”
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {featuredStory.snippet}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-semibold text-foreground/80">Key Botanical Formulations:</span>
                {featuredStory.keyHerbs?.map((herb) => (
                  <span
                    key={herb}
                    className="text-[11px] bg-secondary/80 text-foreground px-3 py-1 rounded-full border border-border font-medium"
                  >
                    {herb}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/70">
                <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                  <UserCheck className="size-4 text-accent" />
                  <span>{featuredStory.author}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:translate-x-1.5 transition-transform">
                  Read Full Publication <ArrowRight className="size-4" />
                </span>
              </div>
            </div>

            {/* 3D Visual Layer: The Open Study Manuscript (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[2rem] border border-primary/25 overflow-hidden shadow-lift aspect-[4/3] bg-secondary/30 group">
                <img
                  src="/media/blog-animation.jpg"
                  alt="3D Ayurvedic Physician Study Desk and Open Manuscript"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Organic Warm Lighting Gradient (does not obscure the asset) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

                {/* HTML/CSS Badges layered over the visual */}
                <div className="absolute top-3.5 left-3.5 bg-card/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-border text-[11px] font-medium text-foreground flex items-center gap-1.5 shadow-sm">
                  <BookOpen className="size-3 text-primary" />
                  <span>Vaidya Study Desk</span>
                </div>

                <div className="absolute bottom-3.5 inset-x-3.5 bg-card/95 backdrop-blur-md p-3 rounded-2xl border border-primary/20 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-mono block">Archived Folio</span>
                      <span className="text-xs font-bold text-foreground">Ritucharya Manuscript Vol. IV</span>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                      Peer-Reviewed
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Pills Bar */}
      <section className="mt-14 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-soft font-semibold"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs text-muted-foreground font-mono">
            Showing {filteredArticles.length} publications
          </span>
        </div>

        {/* Magazine Grid Layout */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group cursor-pointer leaf-card p-6 flex flex-col justify-between hover:shadow-lift hover:border-primary/40 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="outline" className="text-[11px] border-primary/30 text-primary">
                    {article.category}
                  </Badge>
                  <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                    <Clock className="size-3" /> {article.readTime}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {article.snippet}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-border/60">
                <div className="text-[11px] text-muted-foreground flex items-center justify-between">
                  <span>{article.author.split(",")[0]}</span>
                  <span>{article.date}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-primary pt-1">
                  <span>Read Article</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Subscription Box */}
      <section className="mt-20 leaf-card bg-gradient-to-br from-secondary/50 via-card to-primary/5 p-8 sm:p-12 border-primary/20 text-center max-w-3xl mx-auto space-y-4">
        <Sparkles className="size-6 text-accent mx-auto" />
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
          Receive Weekly Ayurvedic Healing Dispatches
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
          Delivered every Sunday: Seasonal recipes, classical herbal monographs, and practical home remedies from our Vaidya council.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for subscribing to the Aarogya Wisdom Journal.");
          }}
          className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
        >
          <Input
            type="email"
            placeholder="Enter your email address..."
            required
            className="rounded-full bg-background"
          />
          <Button type="submit" className="rounded-full px-6 shrink-0 shadow-soft">
            Subscribe
          </Button>
        </form>
      </section>

      {/* Full Article Reader Dialog */}
      <Dialog open={!!activeArticle} onOpenChange={(open) => !open && setActiveArticle(null)}>
        {activeArticle && (
          <DialogContent className="max-w-3xl bg-card border-border max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-10">
            <DialogHeader className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{activeArticle.category}</Badge>
                <span className="text-xs text-muted-foreground">• {activeArticle.readTime}</span>
              </div>
              <DialogTitle className="font-display text-2xl sm:text-4xl text-foreground font-bold leading-tight">
                {activeArticle.title}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-primary font-medium flex items-center gap-1.5 pt-1">
                <UserCheck className="size-4" /> By {activeArticle.author} • Published on {activeArticle.date}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-foreground/90 font-sans">
              {activeArticle.content.map((paragraph, index) => (
                <p key={index} className="text-sm sm:text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {activeArticle.keyHerbs && (
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 mt-6">
                  <h4 className="font-display text-base font-semibold text-primary flex items-center gap-1.5 mb-2">
                    <Sparkles className="size-4 text-accent" /> Key Herbs & Decoctions Mentioned
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeArticle.keyHerbs.map((h, i) => (
                      <span key={i} className="text-xs bg-card px-3 py-1 rounded-full border border-border font-medium">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-border mt-8">
                <div className="text-xs text-muted-foreground">
                  Consult our physicians for personalized medicinal advice tailored to your Prakriti.
                </div>
                <Button asChild className="rounded-full px-5 text-xs">
                  <Link to="/book">Book Consultation With Our Vaidyas</Link>
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </PageShell>
  );
}
