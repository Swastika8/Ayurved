import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Leaf, Lock, Mail, User as UserIcon, ArrowRight, ShieldCheck, Stethoscope } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In / Register — Aarogya Ayurveda Hospital" },
      {
        name: "description",
        content: "Sign in to access your paperless consultations, prescriptions, Panchakarma schedules, and appointment history.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user, isAdmin, isDoctor } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  // If already authenticated, route to appropriate portal
  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate({ to: "/admin" });
      } else if (isDoctor) {
        navigate({ to: "/doctor" });
      } else {
        navigate({ to: "/dashboard" });
      }
    }
  }, [user, isAdmin, isDoctor, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please provide both email and password.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Welcome back to Aarogya Ayurveda!");
      if (data.user) {
        // Auth provider will trigger role check and navigation
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to sign in";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data.session) {
        // Also ensure profile record exists with full name
        await supabase.from("profiles").upsert({
          id: data.user!.id,
          full_name: fullName.trim(),
          email: email.trim(),
        });

        toast.success("Account created successfully! Welcome to Aarogya.");
        navigate({ to: "/dashboard" });
      } else {
        toast.success("Account created! Please check your email to confirm your account or sign in directly.");
        setActiveTab("signin");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create account";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/dashboard",
        },
      });
      if (error) toast.error(error.message);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Google sign in error";
      toast.error(message);
    }
  };

  return (
    <PageShell>
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 overflow-hidden">
        {/* Full-Screen Atmospheric Background covering the entire screen */}
        <div className="absolute inset-0 z-0">
          <img
            src="/media/login-page.jpg"
            alt="Aarogya Sanctuary"
            className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.06]"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-background/60" />
        </div>

        {/* Centered Glassmorphic Form Card */}
        <div className="relative z-10 w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lift mb-3">
              <Leaf className="size-6 text-accent" />
            </div>
            <h1 className="font-display text-3xl font-bold text-white tracking-tight">Aarogya Ayurveda Portal</h1>
            <p className="mt-1 text-xs text-white/80">
              Classical holistic healing, paperless records, and personal consultations.
            </p>
          </div>

          <Card className="border-white/15 bg-card/90 dark:bg-card/85 backdrop-blur-xl shadow-lift leaf-card">
            <CardHeader className="pb-4">
                <Tabs
                  value={activeTab}
                  onValueChange={(val) => setActiveTab(val as "signin" | "signup")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">New Account</TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="mt-4 space-y-4">
                  <CardDescription>
                    Enter your email and password to access your appointments and medical records.
                  </CardDescription>

                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="signin-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="patient@example.com"
                          className="pl-9"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="signin-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-9"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full gap-2" disabled={loading}>
                      {loading ? "Signing in…" : "Sign In"} <ArrowRight className="size-4" />
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="mt-4 space-y-4">
                  <CardDescription>
                    Create a free patient account to book appointments and receive digital prescriptions.
                  </CardDescription>

                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Ananya Sharma"
                          className="pl-9"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="signup-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="ananya@example.com"
                          className="pl-9"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Minimum 6 characters"
                          className="pl-9"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full gap-2" disabled={loading}>
                      {loading ? "Creating account…" : "Create Patient Account"} <ArrowRight className="size-4" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full gap-2"
                onClick={handleGoogleSignIn}
              >
                <svg className="size-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Sign in with Google
              </Button>
            </CardContent>
          </Card>

          {/* Role testing shortcuts for smooth verification */}
          <div className="rounded-xl border border-dashed border-border bg-secondary/30 p-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              <ShieldCheck className="size-3.5 text-primary" /> Role Access Guidelines
            </div>
            <p className="mt-1">
              New signups automatically receive the <strong>Patient</strong> role and can book appointments immediately.
              Doctors and Hospital Admins have dedicated portals with role permissions managed in the database or Admin panel.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
