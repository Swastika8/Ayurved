import { Link } from "@tanstack/react-router";
import {
  Leaf,
  Menu,
  Moon,
  Sun,
  Bell,
  Sparkles,
  User,
  Calendar,
  ShieldCheck,
  Stethoscope,
  ChevronDown,
  Layers,
  FileCheck2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useUserNotifications } from "@/lib/queries";
import { markNotificationAsRead } from "@/lib/notifications";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/treatments", label: "Treatments" },
  { to: "/panchakarma", label: "Panchakarma" },
  { to: "/wellness", label: "Wellness" },
  { to: "/diseases", label: "Disease Library" },
  { to: "/blog", label: "Wisdom Blog" },
  { to: "/gallery", label: "Sanctuary" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle colour theme"
      onClick={() => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
      }}
      className="rounded-full size-8"
    >
      {dark ? <Sun className="size-4 text-accent" /> : <Moon className="size-4 text-foreground/80" />}
    </Button>
  );
}

function NotificationBell({ userId }: { userId?: string | undefined }) {
  const { data: notifications, refetch } = useUserNotifications(userId || "");
  const unreadCount = 2; // Always show simulated healthcare reminders

  const sampleNotifications = [
    {
      id: "n-1",
      title: "Upcoming Video Consultation",
      body: "Dr. Ananya Varma at 11:30 AM today. Please keep prior lab records handy.",
      time: "45m ago",
      type: "appointment",
    },
    {
      id: "n-2",
      title: "Paperless Prescription Issued",
      body: "Your Panchakarma recovery prescription (Kizhi & Kashayam) is ready to download.",
      time: "2h ago",
      type: "prescription",
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full size-8"
          aria-label="View notifications"
        >
          <Bell className="size-4 text-foreground/80" />
          <span className="absolute right-1 top-1 flex size-2 rounded-full bg-accent animate-pulse" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 text-xs shadow-lift rounded-2xl bg-card border-border">
        <div className="flex items-center justify-between border-b border-border p-3 bg-secondary/30 rounded-t-2xl">
          <div className="flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-accent" />
            <span className="font-semibold text-sm text-foreground">Care Reminders</span>
          </div>
          <Badge variant="secondary" className="text-[10px] bg-accent/20 text-accent-foreground font-semibold">
            {unreadCount} Active
          </Badge>
        </div>
        <div className="max-h-72 overflow-y-auto divide-y divide-border">
          {sampleNotifications.map((n) => (
            <div key={n.id} className="p-3 space-y-1 hover:bg-secondary/20 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{n.title}</span>
                <span className="text-[10px] text-muted-foreground">{n.time}</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">{n.body}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-border p-2.5 text-center bg-secondary/15 rounded-b-2xl">
          <Link
            to="/dashboard"
            className="text-[11px] font-medium text-primary hover:underline flex items-center justify-center gap-1"
          >
            <FileCheck2 className="size-3" /> View All Patient Records & Alerts →
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function SiteHeader() {
  const { user, isAdmin, isDoctor, signOut } = useAuth();
  const { hospital } = useSiteContent();

  const accountLink = isAdmin ? "/admin" : isDoctor ? "/doctor" : "/dashboard";
  const accountRoleLabel = isAdmin ? "Administrator" : isDoctor ? "Chief Vaidya" : "Registered Patient";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md transition-all">
      {/* Top micro announcement banner */}
      <div className="hidden sm:flex items-center justify-between px-6 py-1 bg-primary/10 border-b border-primary/15 text-[11px] text-primary">
        <div className="flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-accent animate-ping" />
          <span>Classical Ashtanga Ayurveda Sanctuary • NABH & Green Leaf Certified Hospital</span>
        </div>
        <div className="flex items-center gap-4 text-foreground/80">
          <span>Emergency Vaidya Helpline: <strong>+91 (0484) 246-8800</strong></span>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1 text-primary font-medium">
            <FileCheck2 className="size-3" /> 100% Paperless Digital Records
          </span>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* Brand Logo with Organic Leaf Emblem */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground shadow-soft transition-transform group-hover:scale-105">
            <Leaf className="size-5" />
          </span>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight text-foreground leading-none">
              {hospital.name}
            </span>
            <span className="font-serif italic text-xs text-primary/80 tracking-wide mt-0.5">
              Classical Healing Sanctum
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-primary font-semibold shadow-xs" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions & Authenticated Controls */}
        <div className="flex items-center gap-2">
          {/* Theme switcher */}
          <ThemeToggle />

          {/* If authenticated: Show Care Notifications & User Menu */}
          {user ? (
            <>
              {/* Notification bell for active patient/doctor */}
              <NotificationBell userId={user.id} />

              {/* Logged in User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2 rounded-full border-primary/25 bg-secondary/40 text-xs px-3 py-1.5 shadow-xs"
                  >
                    <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </span>
                    <span className="hidden sm:inline font-medium text-foreground">
                      {user.email?.split("@")[0] || "Account"}
                    </span>
                    <Badge variant="secondary" className="hidden md:inline-flex text-[9px] px-1.5 py-0 bg-primary/10 text-primary">
                      {accountRoleLabel}
                    </Badge>
                    <ChevronDown className="size-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 rounded-2xl p-2 bg-card border-border shadow-lift">
                  <DropdownMenuLabel className="px-2 py-1.5">
                    <p className="text-xs font-semibold text-foreground truncate">{user.email}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{accountRoleLabel}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                    <Link to={accountLink} className="flex items-center gap-2 px-2 py-1.5 text-xs">
                      {isAdmin ? (
                        <ShieldCheck className="size-3.5 text-destructive" />
                      ) : isDoctor ? (
                        <Stethoscope className="size-3.5 text-accent" />
                      ) : (
                        <User className="size-3.5 text-primary" />
                      )}
                      <div>
                        <p className="font-semibold text-foreground">My Portal Dashboard</p>
                        <p className="text-[10px] text-muted-foreground">Clinical records & appointments</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-2 py-1">
                    Simulate Role
                  </DropdownMenuLabel>
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                    <Link to="/dashboard" className="flex items-center gap-2 px-2 py-1 text-xs">
                      <User className="size-3 text-primary" /> Patient Portal
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                    <Link to="/doctor" className="flex items-center gap-2 px-2 py-1 text-xs">
                      <Stethoscope className="size-3 text-accent" /> Vaidya OPD
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                    <Link to="/admin" className="flex items-center gap-2 px-2 py-1 text-xs">
                      <ShieldCheck className="size-3 text-destructive" /> Hospital Admin
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="rounded-xl cursor-pointer text-destructive focus:text-destructive flex items-center gap-2 px-2 py-1.5 text-xs"
                  >
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            /* Visitor / Guest CTA: Sign In link */
            <Button asChild size="sm" variant="ghost" className="rounded-full text-xs px-3 hover:bg-secondary">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}

          {/* Book Consultation Button */}
          <Button
            asChild
            size="sm"
            className="rounded-full px-4 text-xs font-semibold gap-1.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lift hover:shadow-soft transition-all"
          >
            <Link to="/book">
              <Calendar className="size-3.5 text-accent" /> Book Consultation
            </Link>
          </Button>

          {/* Mobile Navigation Drawer */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-full size-9" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-card border-border p-6 overflow-y-auto">
              <div className="mb-6 flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-2xl bg-primary text-primary-foreground">
                  <Leaf className="size-4" />
                </span>
                <span className="font-display text-base font-bold leading-none">{hospital.name}</span>
              </div>

              <div className="space-y-4">
                {user ? (
                  <div className="p-3 rounded-2xl bg-secondary/50 border border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground truncate">{user.email}</span>
                      <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary">
                        {accountRoleLabel}
                      </Badge>
                    </div>
                    <Link
                      to={accountLink}
                      className="block text-center p-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium"
                    >
                      Enter {accountRoleLabel} Portal
                    </Link>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-secondary/40 border border-primary/15 text-xs space-y-2">
                    <p className="font-serif italic text-primary font-medium">
                      “Swasthyasya Swasthya Rakshanam”
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Classical Ashtanga Ayurveda Sanctuary with NABH Green Leaf hospital accreditation.
                    </p>
                  </div>
                )}

                <nav className="flex flex-col gap-1 text-sm">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="rounded-xl px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="my-2 border-t border-border" />
                  <Link
                    to="/book"
                    className="rounded-xl bg-primary text-primary-foreground px-4 py-2.5 font-medium flex items-center justify-center gap-2 shadow-soft"
                  >
                    <Calendar className="size-4 text-accent" /> Book Consultation
                  </Link>
                  <Link
                    to={user ? accountLink : "/auth"}
                    className="rounded-xl px-4 py-2 font-medium text-foreground flex items-center gap-2 hover:bg-secondary transition-colors"
                  >
                    <User className="size-4" /> {user ? "My Health Portal" : "Sign In / Register"}
                  </Link>
                  {user && (
                    <button
                      type="button"
                      onClick={() => signOut()}
                      className="text-left rounded-xl px-4 py-2 font-medium text-destructive hover:bg-destructive/10 transition-colors text-sm"
                    >
                      Sign Out
                    </button>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
