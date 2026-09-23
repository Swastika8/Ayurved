import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sun,
  Moon,
  Compass,
  Utensils,
  Flower2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  Droplets,
  Flame,
  Wind,
} from "lucide-react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export const Route = createFileRoute("/wellness")({
  head: () => ({
    meta: [
      { title: "Wellness & Holistic Living — Dinacharya, Ahara & Ritucharya | Aarogya Hospital" },
      {
        name: "description",
        content:
          "Explore classical Ayurvedic wellness routines: Dinacharya daily sacred rhythms, Ritucharya seasonal detox, Ahara nutritional philosophy, and Dosha-tailored yoga.",
      },
    ],
  }),
  component: WellnessPage,
});

export function WellnessPage() {
  const [selectedSeason, setSelectedSeason] = useState<"vasanta" | "grishma" | "varsha" | "sharad" | "hemanta">("vasanta");

  const seasonalWisdom = {
    vasanta: {
      name: "Vasanta (Spring Season: March – April)",
      doshaAggravated: "Kapha Liquefaction",
      description: "As the sun warms the earth, accumulated winter Kapha melts within the body, triggering seasonal allergies, sluggish digestion, and respiratory heaviness.",
      diet: "Favour light, dry, warm foods. Incorporate honey, barley, ginger, and roasted grains. Strictly avoid heavy curd, sweets, and midday sleep.",
      lifestyle: "Undergo Vamana or herbal steam therapy. Practice vigorous Surya Namaskar and dry powder Udvartana body brushing.",
    },
    grishma: {
      name: "Grishma (Summer Season: May – June)",
      doshaAggravated: "Pitta Aggravation & Vata Depletion",
      description: "Intense solar rays draw moisture from flora and fauna. Bodily strength is naturally lowest, and digestive fire weakens.",
      diet: "Favour naturally cooling sweet, light, liquid foods. Drink coconut water, sattu, cooling buttermilk, and milk with cardamom.",
      lifestyle: "Wear cooling white cotton or silk, avoid midday exertion, practice Sheetali pranayama, and take moonlit strolls.",
    },
    varsha: {
      name: "Varsha (Monsoon Season: July – August)",
      doshaAggravated: "Vata Aggravation & Damp Agni",
      description: "Heavy rain clouds and wet earth extinguish internal digestive fire (Agni), causing widespread joint stiffness and digestive sluggishness.",
      diet: "Favour easily digestible, warm cooked meals with light oils. Consume warm ginger decoctions and aged grains.",
      lifestyle: "Ideal period for classical Panchakarma cleansing (Karkidaka Chikitsa). Protect feet from dampness.",
    },
    sharad: {
      name: "Sharad (Autumn Season: September – October)",
      doshaAggravated: "Pitta Flare-up",
      description: "Sudden intense sunshine following heavy rains heats the body, causing sudden flare-ups of acid reflux, skin eruptions, and anger.",
      diet: "Favour sweet, bitter, and astringent tastes. Use pure cow ghee, bitter gourd, green gram, and Indian gooseberry (Amla).",
      lifestyle: "Therapeutic Virechana (purgation) and Raktamokshana are classical autumn treatments. Avoid direct sun and daytime naps.",
    },
    hemanta: {
      name: "Hemanta & Shishira (Winter Season: November – February)",
      doshaAggravated: "Strong Digestive Agni & Vata Vulnerability",
      description: "Cold ambient winds close skin pores, confining digestive heat internally. Digestion is at its peak power.",
      diet: "Nutritious, substantial meals are celebrated: sesame seeds, warm almond milk, black gram, root vegetables, and herbal lehyams.",
      lifestyle: "Daily morning warm sesame oil Abhyanga followed by herbal warm water baths. Sunbathe during gentle morning hours.",
    },
  };

  const dailyRhythm = [
    {
      time: "4:30 AM – 6:00 AM",
      sanskrit: "Brahma Muhurta & Ushapan",
      title: "Awakening & Pure Hydration",
      desc: "Rise during the tranquil pre-dawn hours when Sattva is pure. Drink a copper vessel glass of warm water to gently awaken intestinal peristalsis.",
      icon: Sun,
    },
    {
      time: "6:00 AM – 7:00 AM",
      sanskrit: "Danta Dhavana & Jihwa Nirlekhana",
      title: "Oral Cleansing & Sensory Awakening",
      desc: "Cleanse teeth with herbal powders (Neem/Babool) and scrape the tongue with a copper or sterling scraper to remove overnight toxic coating (Ama).",
      icon: Sparkles,
    },
    {
      time: "7:00 AM – 7:45 AM",
      sanskrit: "Abhyanga & Swedana",
      title: "Self-Oil Anointing & Warm Bath",
      desc: "Warm unrefined black sesame oil or tailored herbal oil massaged vigorously over scalp, ears, soles, and body to lubricate joints and pacify Vata.",
      icon: Droplets,
    },
    {
      time: "8:00 AM – 9:00 AM",
      sanskrit: "Pranayama & Sattvic Ahara",
      title: "Breath Regulation & Light Breakfast",
      desc: "Practice 15 minutes of alternate nostril breathing (Nadi Shodhana) followed by warm stewed apples or wholesome spiced kitchari.",
      icon: Flame,
    },
    {
      time: "12:00 PM – 1:30 PM",
      sanskrit: "Pradhana Ahara",
      title: "Principal Midday Meal",
      desc: "Eat your largest, most nourishing meal when the sun is highest and digestive fire (Pachaka Agni) is peak. Sit calmly without digital screens.",
      icon: Utensils,
    },
    {
      time: "9:30 PM – 10:00 PM",
      sanskrit: "Nidra Vidhi",
      title: "Restorative Sleep Routine",
      desc: "Gently massage soles with warm Brahmi or sesame oil (Pada Abhyanga). Sip warm spiced milk with nutmeg to ensure uninterrupted cellular rejuvenation.",
      icon: Moon,
    },
  ];

  const sixTastes = [
    {
      name: "Madhura (Sweet)",
      elements: "Earth + Water",
      action: "Nourishes all 7 tissues (Dhatus), increases Ojas, pacifies Vata & Pitta.",
      sources: "Naturally sweet grains, basmati rice, milk, dates, pure ghee.",
      color: "border-primary/30 bg-primary/5",
    },
    {
      name: "Amla (Sour)",
      elements: "Earth + Fire",
      action: "Stimulates sluggish appetite, enhances digestive enzymes, pacifies Vata.",
      sources: "Amalaki (Amla), lemon, pomegranate, fermented buttermilk.",
      color: "border-accent/30 bg-accent/5",
    },
    {
      name: "Lavana (Salty)",
      elements: "Water + Fire",
      action: "Maintains electrolyte balance, clears blockages, pacifies Vata.",
      sources: "Saindhava Lavana (Pure Himalayan pink rock salt).",
      color: "border-border bg-secondary/30",
    },
    {
      name: "Katu (Pungent)",
      elements: "Fire + Air",
      action: "Clears mucus channels, burns Ama toxins, pacifies heavy Kapha.",
      sources: "Black pepper, fresh ginger, pippali, mustard seeds, cumin.",
      color: "border-destructive/30 bg-destructive/5",
    },
    {
      name: "Tikta (Bitter)",
      elements: "Air + Ether",
      action: "Master blood purifier, cleanses liver, reduces inflammation, pacifies Pitta.",
      sources: "Turmeric, neem, bitter gourd, dandelion, fenugreek.",
      color: "border-primary/40 bg-primary/10",
    },
    {
      name: "Kashaya (Astringent)",
      elements: "Air + Earth",
      action: "Heals mucous membranes, tightens tissues, pacifies Pitta & Kapha.",
      sources: "Triphala, green tea, raw bananas, honey, lentils.",
      color: "border-border bg-card",
    },
  ];

  return (
    <PageShell>
      {/* 3D Sanctuary Living Hero Stage */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-card via-secondary/30 to-primary/5 border border-border p-6 sm:p-10 lg:p-14 shadow-soft">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Asymmetrical Typography & Content Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="rounded-full border-primary/30 text-primary px-3.5 py-1 text-xs">
                <Sparkles className="size-3.5 text-accent mr-1.5" /> Timeless Ayurvedic Lifestyle Principles
              </Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full text-xs">
                Dinacharya & Ritucharya
              </Badge>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance-display leading-[1.15]">
              The Living Rhythm of <span className="italic text-primary font-normal">Holistic Wellness</span>
            </h1>

            <p className="font-serif italic text-lg sm:text-xl text-primary/85">
              “When diet is wrong, medicine is of no use. <br className="hidden sm:inline" />
              When diet is correct, medicine is of no need.”
            </p>
            <p className="text-xs font-sans text-muted-foreground italic">
              — Classical Ayurvedic Proverb: Health is an active harmony of body (Sharira), senses (Indriya), mind (Sattva), and spirit (Atma).
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              In classical Ayurveda, wellness is not an intermittent detox or punitive diet. It is an exquisite daily synchronization between your inner metabolic fire (*Agni*) and the natural solar-circadian clock (*Brahma Muhurta* through *Nidra*).
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 shadow-lift gap-2">
                <Link to="/book">
                  <Calendar className="size-4" /> Book a Lifestyle Assessment
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                <Link to="/contact">Explore Inpatient Stays</Link>
              </Button>
            </div>

            {/* Micro Feature Indicators */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/70 max-w-md">
              <div>
                <span className="font-display text-lg font-bold text-foreground block">6 Rasas</span>
                <span className="text-[11px] text-muted-foreground">Every Meal Complete</span>
              </div>
              <div>
                <span className="font-display text-lg font-bold text-primary block">Circadian</span>
                <span className="text-[11px] text-muted-foreground">Solar Agni Timing</span>
              </div>
              <div>
                <span className="font-display text-lg font-bold text-accent block">5 Ritus</span>
                <span className="text-[11px] text-muted-foreground">Seasonal Transitions</span>
              </div>
            </div>
          </div>

          {/* 3D Visual Asset Column (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 -m-6 bg-gradient-to-tr from-accent/15 via-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-md mx-auto aspect-square rounded-[2.5rem] bg-gradient-to-b from-card/80 to-secondary/40 border border-primary/20 p-3 shadow-lift overflow-hidden group">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                <img
                  src="/media/wellness-scene.jpg"
                  alt="3D Ayurvedic Sanctuary Living Scene"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating HTML/CSS Badges over negative space */}
                <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-border text-[11px] font-medium text-foreground flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="size-3 text-accent" />
                  <span>Sanctuary Architecture</span>
                </div>

                <div className="absolute bottom-4 inset-x-4 bg-card/95 backdrop-blur-md p-3.5 rounded-2xl border border-primary/20 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-mono block">Living Environment</span>
                      <span className="text-xs font-bold text-foreground">Natural Wood, Jali & Herbal Vapour</span>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                      Sattvic
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tabs for Wellness Architecture */}
      <section className="mt-16">
        <Tabs defaultValue="dinacharya" className="space-y-12">
          <div className="flex justify-center">
            <TabsList className="rounded-full p-1.5 bg-secondary/60 border border-border h-auto flex flex-wrap justify-center gap-1">
              <TabsTrigger value="dinacharya" className="rounded-full px-5 py-2 text-xs sm:text-sm font-medium">
                <Sun className="size-4 mr-1.5 text-accent" /> Dinacharya (Daily Routine)
              </TabsTrigger>
              <TabsTrigger value="ritucharya" className="rounded-full px-5 py-2 text-xs sm:text-sm font-medium">
                <Compass className="size-4 mr-1.5 text-primary" /> Ritucharya (Seasonal Cycles)
              </TabsTrigger>
              <TabsTrigger value="ahara" className="rounded-full px-5 py-2 text-xs sm:text-sm font-medium">
                <Utensils className="size-4 mr-1.5 text-accent" /> Ahara (6 Tastes Nutrition)
              </TabsTrigger>
              <TabsTrigger value="yoga" className="rounded-full px-5 py-2 text-xs sm:text-sm font-medium">
                <Flower2 className="size-4 mr-1.5 text-primary" /> Yoga & Dosha Alignment
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: Dinacharya Daily Routine */}
          <TabsContent value="dinacharya" className="space-y-10 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="font-display text-3xl font-bold text-foreground">
                Dinacharya: Aligning with Natural Solar Cycles
              </h2>
              <p className="text-sm text-muted-foreground">
                By synchronizing bodily activities with biological Circadian rhythms, you optimize hormonal balance, prevent metabolic toxicity, and sustain youthful vitality.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dailyRhythm.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="leaf-card p-6 space-y-4 hover:border-primary/40 group relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <IconComponent className="size-5" />
                      </span>
                      <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground">
                        {item.time}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="font-serif italic text-xs text-primary/80 font-medium">
                        {item.sanskrit}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Video / 3D Stage for Daily Rituals */}
            <div className="pt-6">
              <MediaPlaceholder
                title="Visual Guide: Classical Morning Dinacharya Rituals"
                subtitle="A calming walkthrough of tongue scraping, Gandusha oil pulling, and Marma self-massage."
                badge="Sanctuary 3D Scene"
                aspectRatio="21/9"
                previewUrl="/media/wellness-scene.jpg"
                duration="5:10 mins"
              />
            </div>
          </TabsContent>

          {/* TAB 2: Ritucharya Seasonal Living */}
          <TabsContent value="ritucharya" className="space-y-10 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="font-display text-3xl font-bold text-foreground">
                Ritucharya: The 6 Seasonal Health Transits
              </h2>
              <p className="text-sm text-muted-foreground">
                As the macrocosm changes with the sun's trajectory (*Adana Kala & Visarga Kala*), our microcosm requires seasonal dietary and detox adjustments.
              </p>
            </div>

            {/* Season Selector Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {(Object.keys(seasonalWisdom) as Array<keyof typeof seasonalWisdom>).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedSeason(key)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    selectedSeason === key
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {seasonalWisdom[key].name.split("(")[0]}
                </button>
              ))}
            </div>

            {/* Current Selected Season Card */}
            <div className="rounded-[2.5rem] border border-border bg-gradient-to-br from-card via-card to-primary/5 p-8 sm:p-12 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-6">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                    {seasonalWisdom[selectedSeason].name}
                  </h3>
                  <Badge className="mt-2 bg-accent/20 text-accent-foreground border-accent/30 text-xs">
                    Primary Influence: {seasonalWisdom[selectedSeason].doshaAggravated}
                  </Badge>
                </div>
                <Button asChild size="sm" className="rounded-full">
                  <Link to="/panchakarma">Explore Seasonal Detox Protocols</Link>
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2 rounded-2xl bg-secondary/40 p-5 border border-border">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Atmospheric Effect
                  </span>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {seasonalWisdom[selectedSeason].description}
                  </p>
                </div>

                <div className="space-y-2 rounded-2xl bg-secondary/40 p-5 border border-border">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    Prescribed Diet (*Ahara*)
                  </span>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {seasonalWisdom[selectedSeason].diet}
                  </p>
                </div>

                <div className="space-y-2 rounded-2xl bg-secondary/40 p-5 border border-border">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Therapeutic Lifestyle (*Vihara*)
                  </span>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {seasonalWisdom[selectedSeason].lifestyle}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: Ahara (6 Tastes Nutrition) */}
          <TabsContent value="ahara" className="space-y-10 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="font-display text-3xl font-bold text-foreground">
                Shad Rasa: The Science of Six Ayurvedic Tastes
              </h2>
              <p className="text-sm text-muted-foreground">
                A truly satisfying Ayurvedic meal includes all six tastes in balance to signal satiety to the nervous system and nourish every bodily tissue (*Sapta Dhatus*).
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sixTastes.map((taste, idx) => (
                <div
                  key={idx}
                  className={`leaf-card-alt p-6 space-y-3 border ${taste.color} hover:shadow-soft transition-all`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-foreground">{taste.name}</h3>
                    <Badge variant="outline" className="text-[10px]">
                      {taste.elements}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Therapeutic Action:</strong> {taste.action}
                  </p>
                  <p className="text-xs text-foreground/80 pt-1 border-t border-border/50">
                    <strong>Wholesome Sources:</strong> {taste.sources}
                  </p>
                </div>
              ))}
            </div>

            {/* Incompatible Foods (Viruddha Ahara) Box */}
            <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-6 sm:p-8 space-y-3">
              <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="size-5 text-destructive" /> Incompatible Food Combinations (*Viruddha Ahara*)
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Classical texts explicitly warn against combining certain foods because they destabilize digestion and generate toxic Ama in the bloodstream. Key combinations to avoid:
              </p>
              <div className="grid sm:grid-cols-3 gap-3 pt-2 text-xs text-foreground/90">
                <div className="p-3 rounded-xl bg-card border border-border">
                  <strong>Milk + Sour Fruits</strong>
                  <p className="text-muted-foreground mt-0.5">Causes curdling in the stomach and blood heat.</p>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border">
                  <strong>Equal Parts Honey & Ghee</strong>
                  <p className="text-muted-foreground mt-0.5">Equal weight combination acts as a cellular poison.</p>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border">
                  <strong>Night Curd (Yogurt) Consumption</strong>
                  <p className="text-muted-foreground mt-0.5">Clogs micro-circulatory channels and spikes Kapha.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 4: Yoga & Dosha Alignment */}
          <TabsContent value="yoga" className="space-y-10 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="font-display text-3xl font-bold text-foreground">
                Yoga & Asana According to Your Prakriti
              </h2>
              <p className="text-sm text-muted-foreground">
                Ayurveda and Yoga are sister sciences. Adapting your asana and pranayama practice to your constitution grounds volatile Vata, cools inflamed Pitta, and activates sluggish Kapha.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Vata Yoga */}
              <div className="leaf-card p-6 space-y-4 border-primary/20">
                <div className="flex items-center gap-2 text-primary font-display font-bold text-xl">
                  <Wind className="size-5 text-accent" /> Vata Balancing Yoga
                </div>
                <p className="text-xs text-muted-foreground">
                  Focus on slow, grounded, warming postures held with steady abdominal breathing. Avoid frantic speed or extreme jumping transitions.
                </p>
                <div className="space-y-1.5 text-xs text-foreground/80">
                  <p><strong>Beneficial Asanas:</strong> Tadasana, Vrikshasana, Paschimottanasana, Balasana.</p>
                  <p><strong>Pranayama:</strong> Nadi Shodhana (Alternate nostril) & Ujjayi breath.</p>
                </div>
              </div>

              {/* Pitta Yoga */}
              <div className="leaf-card p-6 space-y-4 border-accent/30">
                <div className="flex items-center gap-2 text-accent font-display font-bold text-xl">
                  <Flame className="size-5 text-primary" /> Pitta Cooling Yoga
                </div>
                <p className="text-xs text-muted-foreground">
                  Focus on surrendering competition, opening the solar plexus, and releasing abdominal heat. Practice in a cool, ventilated space.
                </p>
                <div className="space-y-1.5 text-xs text-foreground/80">
                  <p><strong>Beneficial Asanas:</strong> Chandra Namaskar (Moon salutations), Bhujangasana, Matsyasana.</p>
                  <p><strong>Pranayama:</strong> Sheetali & Sheetkari cooling breaths.</p>
                </div>
              </div>

              {/* Kapha Yoga */}
              <div className="leaf-card p-6 space-y-4 border-border">
                <div className="flex items-center gap-2 text-foreground font-display font-bold text-xl">
                  <Droplets className="size-5 text-primary" /> Kapha Energizing Yoga
                </div>
                <p className="text-xs text-muted-foreground">
                  Dynamic, heat-building postures that expand the chest, stimulate lymph circulation, and dispel morning lethargy.
                </p>
                <div className="space-y-1.5 text-xs text-foreground/80">
                  <p><strong>Beneficial Asanas:</strong> Vigorous Surya Namaskar, Virabhadrasana series, Dhanurasana.</p>
                  <p><strong>Pranayama:</strong> Kapalabhati & Bhastrika bellows breath.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Residential Rejuvenation Programs Banner */}
      <section className="mt-20 rounded-[2.5rem] bg-gradient-to-tr from-primary via-primary/90 to-primary/80 text-primary-foreground p-8 sm:p-14 shadow-lift relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <Badge className="bg-accent text-accent-foreground rounded-full text-xs font-semibold px-3 py-1">
            Hospital Sanctuary Stays
          </Badge>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
            Immersive 7 to 21-Day Ayurvedic Rejuvenation Retreats
          </h2>
          <p className="text-sm sm:text-base text-primary-foreground/90 leading-relaxed">
            Unplug completely in our riverside healing sanctuary in Kerala or mountain ashram in Rishikesh. Undergo daily doctor evaluations, personalized Panchakarma therapies, tailored organic herbal meals, and meditation.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-soft">
              <Link to="/contact">Inquire About Sanctuary Admission</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/treatments">View All 18 Therapies</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
