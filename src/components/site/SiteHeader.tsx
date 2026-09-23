import { Link } from "@tanstack/react-router";
import { Leaf, Menu, Moon, Sun, Bell, Sparkles, User, Calendar, ShieldCheck, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useUserNotifications } from "@/lib/queries";
import { markNotificationAsRead } from "@/lib/notifications";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/treatments", label: "Treatments" },
  { to: "/panchakarma", label: "Panchakarma" },
  { to: "/diseases", label: "Disease library" },
  { to: "/assistant", label: "AI Assistant" },
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
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}

function NotificationBell({ userId }: { userId: string }) {
  const { data: notifications, refetch } = useUserNotifications(userId);
  const unread = (notifications ?? []).filter((n) => !n.read_at);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="View notifications">
          <Bell className="size-4" />
          {unread.length > 0 && (
            <span className="absolute right-1.5 top-1.5 flex size-2 rounded-full bg-destructive animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 text-xs shadow-lg">
        <div className="flex items-center justify-between border-b border-border p-3">
          <span className="font-semibold text-sm">Notices & Reminders</span>
          {unread.length > 0 && (
            <Badge variant="secondary" className="text-[10px]">
              {unread.length} new
            </Badge>
          )}
        </div>
        <div className="max-h-64 overflow-y-auto divide-y divide-border">
          {(!notifications || notifications.length === 0) ? (
            <p className="p-4 text-center text-muted-foreground">No notices yet.</p>
          ) : (
            notifications.slice(0, 5).map((n) => (
              <div
                key={n.id}
                className={`p-3 space-y-1 transition-colors ${!n.read_at ? "bg-secondary/30" : ""}`}
              >
                <div className="flex items-start justify-between gap-1">
                  <p className="font-medium text-foreground">{n.title}</p>
                  {!n.read_at && (
                    <button
                      onClick={async () => {
                        await markNotificationAsRead(n.id);
                        refetch();
                      }}
                      className="text-[10px] text-primary hover:underline shrink-0"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
                <p className="text-muted-foreground text-[11px] leading-tight">{n.body}</p>
                <p className="text-[9px] text-muted-foreground">
                  {new Date(n.created_at).toLocaleDateString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-border p-2 text-center bg-secondary/10">
          <Link
            to="/dashboard"
            className="text-[11px] font-medium text-primary hover:underline"
          >
            View all reminders in Dashboard →
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function SiteHeader() {
  const { user, isAdmin, isDoctor } = useAuth();
  const { hospital } = useSiteContent();

  const accountLink = isAdmin ? "/admin" : isDoctor ? "/doctor" : "/dashboard";
  const accountLabel = isAdmin ? "Admin Portal" : isDoctor ? "Doctor Portal" : "My account";

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
            <Leaf className="size-4" />
          </span>
          <span className="font-display text-lg leading-none">{hospital.name}</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground font-medium" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ThemeToggle />

          {user && <NotificationBell userId={user.id} />}

          {user ? (
            <Button asChild size="sm" variant="secondary" className="gap-1.5 shadow-sm">
              <Link to={accountLink}>
                {isAdmin ? (
                  <ShieldCheck className="size-3.5 text-primary" />
                ) : isDoctor ? (
                  <Stethoscope className="size-3.5 text-primary" />
                ) : (
                  <User className="size-3.5" />
                )}
                {accountLabel}
              </Link>
            </Button>
          ) : (
            <Button asChild size="sm" variant="secondary" className="hidden sm:inline-flex">
              <Link to="/auth">Sign in</Link>
            </Button>
          )}

          <Button asChild size="sm" className="hidden sm:inline-flex gap-1 shadow-sm">
            <Link to="/book">
              <Calendar className="size-3.5" /> Book
            </Link>
          </Button>

          {/* Mobile Drawer Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mb-6 flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Leaf className="size-4" />
                </span>
                <span className="font-display text-base leading-none">{hospital.name}</span>
              </div>
              <nav className="flex flex-col gap-1 text-sm">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="my-2 border-t border-border" />
                <Link
                  to="/book"
                  className="rounded-md bg-primary/10 px-3 py-2 font-medium text-primary flex items-center gap-2"
                >
                  <Calendar className="size-4" /> Book an appointment
                </Link>
                <Link
                  to={user ? accountLink : "/auth"}
                  className="rounded-md px-3 py-2 font-medium text-foreground flex items-center gap-2"
                >
                  <User className="size-4" /> {user ? accountLabel : "Sign in"}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
