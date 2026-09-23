import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

export function SiteFooter() {
  const { hospital } = useSiteContent();

  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <Leaf className="size-4" />
            </span>
            <span className="font-display text-lg">{hospital.name}</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{hospital.tagline}</p>
        </div>

        <div className="text-sm">
          <h3 className="font-display text-base">Visit us</h3>
          <p className="mt-3 text-muted-foreground">{hospital.address}</p>
          <p className="mt-2 text-muted-foreground">{hospital.hours}</p>
        </div>

        <div className="text-sm">
          <h3 className="font-display text-base">Reach us</h3>
          <p className="mt-3 text-muted-foreground">{hospital.phone}</p>
          <p className="mt-2 text-muted-foreground">{hospital.email}</p>
        </div>

        <div className="text-sm">
          <h3 className="font-display text-base">Explore</h3>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>
              <Link to="/treatments" className="hover:text-foreground">
                Treatments
              </Link>
            </li>
            <li>
              <Link to="/panchakarma" className="hover:text-foreground">
                Panchakarma
              </Link>
            </li>
            <li>
              <Link to="/diseases" className="hover:text-foreground">
                Disease library
              </Link>
            </li>
            <li>
              <Link to="/book" className="hover:text-foreground">
                Book an appointment
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70 px-4 py-5 text-center text-xs text-muted-foreground">
        Information on this site is educational and does not replace a consultation with a qualified
        Ayurvedic physician.
      </div>
    </footer>
  );
}
