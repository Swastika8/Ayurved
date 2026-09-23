import { Link } from "@tanstack/react-router";
import { Leaf, ShieldCheck, HeartHandshake, Phone, Mail, MapPin, Clock, FileCheck2, Sparkles } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

export function SiteFooter() {
  const { hospital } = useSiteContent();

  return (
    <footer className="relative mt-28 border-t border-border bg-gradient-to-b from-card to-secondary/40 text-foreground overflow-hidden">
      {/* Subtle background botanical rings */}
      <div className="absolute top-0 right-0 size-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 size-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      {/* Sanskrit Shloka Blessing Ribbon */}
      <div className="border-b border-border/60 bg-primary/5 py-4 text-center px-4">
        <p className="font-serif italic text-base md:text-lg text-primary tracking-wide">
          “सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥”
        </p>
        <p className="text-[11px] text-muted-foreground uppercase tracking-widest mt-1">
          May all beings be peaceful • May all beings be free from illness • Classical Vedic Prayer for Universal Health
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Col 1 & 2: Hospital Sanctum & Certifications */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
                <Leaf className="size-4" />
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-foreground">
                {hospital.name}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              A classical healing hospital sanctuary following the Ashtanga Hridaya and Charaka Samhita traditions. We integrate authentic Nadi Pariksha pulse diagnosis, custom-formulated herbal medicaments, and traditional Panchakarma bio-purification.
            </p>

            {/* Quality Accreditations */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary font-medium">
                <ShieldCheck className="size-3.5 text-accent" /> NABH Accredited
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary font-medium">
                <FileCheck2 className="size-3.5 text-primary" /> 100% Paperless EMR
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent-foreground font-medium">
                <HeartHandshake className="size-3.5 text-accent" /> Green Leaf Certified
              </span>
            </div>
          </div>

          {/* Col 3: Classical Healing & Therapies */}
          <div className="text-sm space-y-3">
            <h4 className="font-display text-base font-semibold text-foreground tracking-tight">
              Healing Services
            </h4>
            <ul className="space-y-2 text-muted-foreground text-xs">
              <li>
                <Link to="/panchakarma" className="hover:text-primary transition-colors">
                  Panchakarma (5 Shodhanas)
                </Link>
              </li>
              <li>
                <Link to="/treatments" className="hover:text-primary transition-colors">
                  Vata, Pitta & Kapha Therapies
                </Link>
              </li>
              <li>
                <Link to="/diseases" className="hover:text-primary transition-colors">
                  Disease Library & Protocols
                </Link>
              </li>
              <li>
                <Link to="/wellness" className="hover:text-primary transition-colors">
                  Rasayana & Longevity Stays
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-primary transition-colors font-medium text-primary">
                  Book Inpatient / Video OPD →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Wisdom & Experience */}
          <div className="text-sm space-y-3">
            <h4 className="font-display text-base font-semibold text-foreground tracking-tight">
              Wisdom & Sanctuary
            </h4>
            <ul className="space-y-2 text-muted-foreground text-xs">
              <li>
                <Link to="/wellness" className="hover:text-primary transition-colors">
                  Dinacharya & Daily Routine
                </Link>
              </li>
              <li>
                <Link to="/wellness" className="hover:text-primary transition-colors">
                  Ahara & 6-Taste Nutrition
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors">
                  Ritucharya & Seasonal Blog
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-primary transition-colors">
                  Medicinal Botanical Gardens
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  Our Guru-Shishya Heritage
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Sanctuaries & Contact */}
          <div className="text-sm space-y-3">
            <h4 className="font-display text-base font-semibold text-foreground tracking-tight">
              Reach Our Sanctuaries
            </h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                <span>Kerala River Sanctuary & Rishikesh Foothills Center</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-accent shrink-0" />
                <span>+91 (0484) 246-8800</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-primary shrink-0" />
                <span>care@aarogya-ayurveda.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-muted-foreground shrink-0" />
                <span>OPD: 8 AM - 7 PM • Emergency: 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Paperless Healthcare Declaration & Copyright */}
        <div className="mt-14 pt-8 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Aarogya Ayurveda Classical Hospital. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span>Paperless Digital Case Sheets</span>
            <span>•</span>
            <span>NABH Green Standard</span>
            <span>•</span>
            <Link to="/contact" className="hover:underline text-primary">
              Emergency Inquiry
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
