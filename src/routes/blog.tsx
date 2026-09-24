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
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BLOG_ARTICLES, type ArticleModel } from "@/data/blog";

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

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<ArticleModel | null>(null);

  const categories = ["All", "Ritucharya", "Herbal Remedies", "Panchakarma", "Diet & Digestion", "Mind & Sattva"];

  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((art) => {
      const matchesCat = selectedCategory === "All" || art.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredStory = BLOG_ARTICLES[0]!;

  return (
    <PageShell>
      {/* 1. Magazine Editorial Header */}
      <section className="relative pt-12 pb-14 text-center max-w-4xl mx-auto space-y-5">
        <Badge
          variant="outline"
          className="rounded-full border-primary/30 text-primary px-4 py-1 text-xs tracking-wider uppercase"
        >
          <BookOpen className="size-3.5 text-accent mr-1.5" /> Aarogya Ayurvedic Health Journal
        </Badge>
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
          Vedic Wisdom for <br />
          <span className="italic text-primary font-serif">Modern Wholeness</span>
        </h1>
        <p className="font-serif italic text-lg sm:text-2xl text-primary/80 max-w-2xl mx-auto">
          Authoritative clinical monographs, seasonal living guides, and authentic classical perspectives authored by our senior physicians.
        </p>

        {/* Search bar inside header */}
        <div className="pt-4 max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search herbal articles, remedies, or authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 pr-4 py-3 rounded-full bg-card border-border/80 shadow-soft text-sm"
          />
        </div>
      </section>

      {/* 2. FEATURED EDITORIAL STORY: UNCONTAINED STILL-LIFE VISUAL (No Small Card Box!) */}
      {featuredStory && !searchQuery && selectedCategory === "All" && (
        <section className="relative -mt-6 sm:-mt-10 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden min-h-[65vh] flex items-center border-b border-border/70 py-16 px-6 sm:px-12 mb-16">
          {/* Full-Screen Section Background */}
          <div className="absolute inset-0 z-0">
            <img
              src="/media/blog-animation.jpg"
              alt="Ayurvedic Physician Study Desk and Palm Leaf Manuscript"
              className="w-full h-full object-cover object-right lg:object-center filter brightness-[0.88] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30 lg:to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary/20 text-primary border-primary/30 text-xs px-3 py-1 backdrop-blur-md">
                {featuredStory.category}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                <Clock className="size-3 text-accent" /> {featuredStory.readTime}
              </span>
              <span className="text-xs text-muted-foreground font-mono">• {featuredStory.date}</span>
              <Badge variant="outline" className="border-accent/40 text-accent font-medium text-[10px] bg-background/80 backdrop-blur-sm">
                Featured Monograph
              </Badge>
            </div>

            <h2
              onClick={() => setActiveArticle(featuredStory)}
              className="font-display text-3xl sm:text-5xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer leading-[1.15]"
            >
              {featuredStory.title}
            </h2>

            {featuredStory.sanskritQuote && (
              <p className="font-serif italic text-base sm:text-lg text-primary/90 leading-relaxed">
                “{featuredStory.sanskritQuote}”
              </p>
            )}

            <p className="text-base text-muted-foreground leading-relaxed">
              {featuredStory.snippet}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-semibold text-foreground/80">Key Botanical Formulations:</span>
              {featuredStory.keyHerbs?.map((herb) => (
                <span
                  key={herb}
                  className="text-xs bg-secondary/80 text-foreground px-3 py-1 rounded-full border border-border/80 font-medium backdrop-blur-sm"
                >
                  {herb}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border/70">
              <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                <UserCheck className="size-4 text-accent" />
                <span>{featuredStory.author}</span>
              </div>
              <Button
                onClick={() => setActiveArticle(featuredStory)}
                className="rounded-full px-6 shadow-lift text-xs gap-1.5"
              >
                Read Full Publication <ArrowRight className="size-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* 3. Category Filter Chips */}
      <section className="mb-12">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lift scale-105"
                  : "bg-secondary/60 text-muted-foreground hover:bg-secondary border border-border/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 4. Editorial Article Grid */}
      <section className="space-y-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group cursor-pointer rounded-[2.5rem] bg-card border border-border/80 p-8 hover:border-primary/40 transition-all duration-300 shadow-soft hover:shadow-lift flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {article.category}
                  </Badge>
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3 text-accent" /> {article.readTime}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {article.title}
                </h3>

                {article.sanskritQuote && (
                  <p className="font-serif italic text-xs text-primary/80 line-clamp-1">
                    “{article.sanskritQuote}”
                  </p>
                )}

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {article.snippet}
                </p>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium truncate max-w-[180px]">
                  {article.author.split(",")[0]}
                </span>
                <span className="text-primary font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="size-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <p className="text-base text-muted-foreground">No articles found matching "{searchQuery}".</p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
              Reset Search Filters
            </Button>
          </div>
        )}
      </section>

      {/* 5. Complete Article Reading Modal Dialog */}
      <Dialog open={!!activeArticle} onOpenChange={(open) => !open && setActiveArticle(null)}>
        {activeArticle && (
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-8 sm:p-12 rounded-[2.5rem] bg-card border-border/80">
            <DialogHeader className="space-y-4 text-left border-b border-border/70 pb-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                  {activeArticle.category}
                </Badge>
                <span className="text-xs font-mono text-muted-foreground">• {activeArticle.readTime}</span>
                <span className="text-xs font-mono text-muted-foreground">• {activeArticle.date}</span>
              </div>

              <DialogTitle className="font-display text-2xl sm:text-4xl font-bold text-foreground leading-tight">
                {activeArticle.title}
              </DialogTitle>

              {activeArticle.sanskritQuote && (
                <p className="font-serif italic text-base sm:text-lg text-primary/90">
                  “{activeArticle.sanskritQuote}”
                </p>
              )}

              <DialogDescription className="text-xs sm:text-sm text-foreground/80 font-medium">
                Authored by {activeArticle.author}
              </DialogDescription>
            </DialogHeader>

            {/* Article Content Paragraphs */}
            <div className="space-y-5 py-6 text-sm sm:text-base text-foreground/90 leading-relaxed font-sans">
              {activeArticle.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Botanical Formulations Footer */}
            {activeArticle.keyHerbs && activeArticle.keyHerbs.length > 0 && (
              <div className="pt-4 border-t border-border/70 space-y-2">
                <span className="text-xs font-semibold text-foreground">Classical Botanical Medicaments:</span>
                <div className="flex flex-wrap gap-2">
                  {activeArticle.keyHerbs.map((herb) => (
                    <Badge key={herb} variant="outline" className="text-xs border-primary/30">
                      {herb}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 flex justify-end">
              <Button asChild size="sm" className="rounded-full px-6">
                <Link to="/book">Consult Authoring Vaidya</Link>
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </PageShell>
  );
}
