import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Calendar,
  Clock,
  FileText,
  CreditCard,
  Bell,
  User as UserIcon,
  Download,
  Plus,
  ArrowRight,
  LogOut,
  Leaf,
  CheckCircle2,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  usePatientAppointments,
  usePatientConsultations,
  usePatientPayments,
  useUserNotifications,
  useUserProfile,
} from "@/lib/queries";
import { generatePrescriptionPdf, generateReceiptPdf } from "@/lib/pdf-generator";
import { markNotificationAsRead } from "@/lib/notifications";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Patient Dashboard — Aarogya Ayurveda Hospital" },
      {
        name: "description",
        content: "View your appointments, download paperless prescriptions and visit notes, and review payment receipts.",
      },
    ],
  }),
  component: PatientDashboardPage,
});

function PatientDashboardPage() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const { data: profile, refetch: refetchProfile } = useUserProfile(user?.id);
  const { data: appointments, refetch: refetchAppointments } = usePatientAppointments(user?.id);
  const { data: consultations } = usePatientConsultations(user?.id);
  const { data: payments } = usePatientPayments(user?.id);
  const { data: notifications, refetch: refetchNotifications } = useUserNotifications(user?.id);

  const [activeTab, setActiveTab] = useState("appointments");

  // Profile Edit Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // Sync profile fields
  useState(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setPhone(profile.phone || "");
      setAddress(profile.address || "");
      setDob(profile.date_of_birth || "");
    }
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSavingProfile(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          phone,
          address,
          date_of_birth: dob || null,
        })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Profile updated successfully!");
      refetchProfile();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update profile";
      toast.error(message);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status: "cancelled" })
        .eq("id", appointmentId);
      if (error) throw error;
      toast.success("Appointment cancelled.");
      refetchAppointments();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to cancel appointment";
      toast.error(message);
    }
  };

  const handleMarkRead = async (notificationId: string) => {
    await markNotificationAsRead(notificationId);
    refetchNotifications();
  };

  if (authLoading) {
    return (
      <PageShell>
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading your patient record…</p>
        </div>
      </PageShell>
    );
  }

  if (!user) {
    return (
      <PageShell>
        <div className="mx-auto flex min-h-[calc(100vh-16rem)] max-w-md items-center justify-center px-4 py-16">
          <Card className="w-full text-center">
            <CardHeader>
              <div className="mx-auto mb-2 grid size-12 place-items-center rounded-full bg-secondary text-primary">
                <UserIcon className="size-6" />
              </div>
              <CardTitle className="font-display text-2xl">Patient Portal Sign In</CardTitle>
              <CardDescription>
                Please sign in to view your scheduled visits, paperless prescriptions, and billing receipts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/auth">Sign In / Register</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/book">Book an Appointment</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageShell>
    );
  }

  const unreadCount = (notifications ?? []).filter((n) => !n.read_at).length;

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Patient Greeting & Quick Action Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1 text-xs">
                <Leaf className="size-3 text-primary" /> Patient Portal
              </Badge>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount} new notice{unreadCount > 1 ? "s" : ""}
                </Badge>
              )}
            </div>
            <h1 className="mt-1 font-display text-3xl sm:text-4xl">
              Namaste, {profile?.full_name || user.email?.split("@")[0] || "Patient"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Your paperless clinical records, active treatment plans, and appointment reminders.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button asChild size="sm" className="gap-1.5 shadow-sm">
              <Link to="/book">
                <Plus className="size-4" /> Book Consultation
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="gap-1.5">
              <Link to="/assistant">
                <Sparkles className="size-4 text-primary" /> AI Assistant
              </Link>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="gap-1.5 text-muted-foreground"
              onClick={async () => {
                await signOut();
                navigate({ to: "/" });
              }}
            >
              <LogOut className="size-4" /> Sign out
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
            <TabsTrigger value="appointments" className="gap-1.5 text-xs sm:text-sm">
              <Calendar className="size-4" /> Appointments
            </TabsTrigger>
            <TabsTrigger value="prescriptions" className="gap-1.5 text-xs sm:text-sm">
              <FileText className="size-4" /> Prescriptions ({consultations?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="receipts" className="gap-1.5 text-xs sm:text-sm">
              <CreditCard className="size-4" /> Receipts
            </TabsTrigger>
            <TabsTrigger value="notifications" className="relative gap-1.5 text-xs sm:text-sm">
              <Bell className="size-4" /> Reminders
              {unreadCount > 0 && (
                <span className="ml-1 flex size-2 rounded-full bg-destructive" />
              )}
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-1.5 text-xs sm:text-sm">
              <UserIcon className="size-4" /> My Profile
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: APPOINTMENTS */}
          <TabsContent value="appointments" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Consultation Schedule</h2>
              <Button asChild size="sm" variant="secondary" className="gap-1 text-xs">
                <Link to="/book">
                  <Plus className="size-3.5" /> Book Another Visit
                </Link>
              </Button>
            </div>

            {(!appointments || appointments.length === 0) ? (
              <Card className="border-dashed p-8 text-center">
                <Calendar className="mx-auto mb-3 size-10 text-muted-foreground/60" />
                <h3 className="font-medium">No appointments booked yet</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Choose a doctor and date to schedule your first classical consultation.
                </p>
                <Button asChild size="sm" className="mt-4">
                  <Link to="/book">Book Now</Link>
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4">
                {appointments.map((appt) => {
                  const isUpcoming =
                    new Date(`${appt.appointment_date}T${appt.start_time}`) >= new Date() &&
                    appt.status !== "cancelled";

                  return (
                    <Card key={appt.id} className="border-border transition-all hover:border-primary/40">
                      <CardContent className="flex flex-wrap items-center justify-between gap-4 pt-6">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold">{appt.doctors?.full_name}</span>
                            <Badge
                              variant={
                                appt.status === "confirmed"
                                  ? "default"
                                  : appt.status === "completed"
                                  ? "secondary"
                                  : appt.status === "cancelled"
                                  ? "destructive"
                                  : "outline"
                              }
                              className="text-[10px] capitalize"
                            >
                              {appt.status.replace("_", " ")}
                            </Badge>
                          </div>
                          <p className="text-xs text-primary">{appt.doctors?.speciality}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="size-3.5" /> {appt.appointment_date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="size-3.5" /> {appt.start_time.slice(0, 5)}
                            </span>
                          </div>
                          {appt.reason && (
                            <p className="mt-1 text-xs text-muted-foreground italic">
                              "{appt.reason}"
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {isUpcoming && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs text-destructive hover:bg-destructive/10"
                              onClick={() => handleCancelAppointment(appt.id)}
                            >
                              Cancel
                            </Button>
                          )}
                          <Button asChild size="sm" variant="secondary" className="gap-1 text-xs">
                            <Link to="/book">
                              Reschedule <ArrowRight className="size-3" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* TAB 2: PRESCRIPTIONS & VISIT NOTES */}
          <TabsContent value="prescriptions" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl">Paperless Medical Records</h2>
                <p className="text-xs text-muted-foreground">
                  Consultation summaries, dosha evaluations, and prescribed remedies issued by your doctors.
                </p>
              </div>
            </div>

            {(!consultations || consultations.length === 0) ? (
              <Card className="border-dashed p-8 text-center">
                <FileText className="mx-auto mb-3 size-10 text-muted-foreground/60" />
                <h3 className="font-medium">No consultation records yet</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Once your physician completes your consultation session, your diagnosis and prescription
                  will be published here as a downloadable PDF.
                </p>
              </Card>
            ) : (
              <div className="grid gap-6">
                {consultations.map((c) => (
                  <Card key={c.id} className="border-border">
                    <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 pb-3">
                      <div>
                        <Badge variant="outline" className="mb-1 text-xs font-mono">
                          Visit Date: {c.visit_date}
                        </Badge>
                        <CardTitle className="text-lg">
                          Consultation with {c.doctors?.full_name}
                        </CardTitle>
                        <CardDescription>{c.doctors?.speciality}</CardDescription>
                      </div>

                      <Button
                        size="sm"
                        className="gap-1.5"
                        onClick={() => {
                          generatePrescriptionPdf({
                            patientName: profile?.full_name || user.email || "Patient",
                            patientEmail: user.email,
                            doctorName: c.doctors?.full_name || "Ayurvedic Physician",
                            doctorSpeciality: c.doctors?.speciality,
                            doctorQualifications: c.doctors?.qualifications || undefined,
                            visitDate: c.visit_date,
                            diagnosis: c.diagnosis || undefined,
                            doshaAssessment: c.dosha_assessment || undefined,
                            notes: c.notes || undefined,
                            prescription: c.prescription || undefined,
                            therapyPlan: c.therapy_plan || undefined,
                            followUpDate: c.follow_up_date || undefined,
                          });
                        }}
                      >
                        <Download className="size-4" /> Download PDF Prescription
                      </Button>
                    </CardHeader>

                    <CardContent className="space-y-4 pt-0 text-sm">
                      {c.dosha_assessment && (
                        <div className="rounded-lg bg-secondary/30 p-3">
                          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                            Dosha Assessment:
                          </span>
                          <p className="mt-1 text-xs text-foreground">{c.dosha_assessment}</p>
                        </div>
                      )}

                      {c.diagnosis && (
                        <div>
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Clinical Diagnosis:
                          </span>
                          <p className="mt-0.5 text-sm font-medium">{c.diagnosis}</p>
                        </div>
                      )}

                      {c.prescription && (
                        <div>
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Prescribed Medicines & Dosages:
                          </span>
                          <div className="mt-1 whitespace-pre-wrap rounded-lg border border-border bg-card p-3 font-mono text-xs text-foreground">
                            {c.prescription}
                          </div>
                        </div>
                      )}

                      {c.therapy_plan && (
                        <div>
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Therapy / Panchakarma Plan:
                          </span>
                          <p className="mt-0.5 text-xs text-foreground">{c.therapy_plan}</p>
                        </div>
                      )}

                      {c.notes && (
                        <div>
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Dietary & Lifestyle Advice:
                          </span>
                          <p className="mt-0.5 text-xs text-muted-foreground">{c.notes}</p>
                        </div>
                      )}

                      {c.follow_up_date && (
                        <div className="text-xs font-medium text-primary">
                          Recommended Follow-Up Date: {c.follow_up_date}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 3: RECEIPTS */}
          <TabsContent value="receipts" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Payment History & Tax Receipts</h2>
            </div>

            {(!payments || payments.length === 0) ? (
              <Card className="border-dashed p-8 text-center">
                <CreditCard className="mx-auto mb-3 size-10 text-muted-foreground/60" />
                <h3 className="font-medium">No payment records found</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Receipts for consultations and Panchakarma therapies are automatically stored here.
                </p>
              </Card>
            ) : (
              <div className="grid gap-3">
                {payments.map((p) => (
                  <Card key={p.id} className="border-border">
                    <CardContent className="flex flex-wrap items-center justify-between gap-4 pt-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-primary">
                            {p.receipt_number || "RCP-ONLINE"}
                          </span>
                          <Badge variant="outline" className="text-[10px] text-emerald-600 dark:text-emerald-400">
                            Paid (₹{Number(p.amount).toFixed(2)})
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Date: {new Date(p.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })} · Method: {p.provider || "Online"}
                        </p>
                        {p.appointments?.doctors?.full_name && (
                          <p className="text-xs text-foreground">
                            Doctor: {p.appointments.doctors.full_name}
                          </p>
                        )}
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-xs"
                        onClick={() => {
                          generateReceiptPdf({
                            receiptNumber: p.receipt_number || "RCP-ONLINE",
                            patientName: profile?.full_name || user.email || "Patient",
                            doctorName: p.appointments?.doctors?.full_name || "Aarogya Hospital",
                            appointmentDate: p.appointments?.appointment_date || new Date().toISOString().split("T")[0] || "",
                            amount: Number(p.amount),
                            paidAt: new Date(p.created_at).toLocaleDateString("en-IN"),
                            paymentMethod: p.provider || "Online Gateway",
                            providerReference: p.provider_reference || undefined,
                          });
                        }}
                      >
                        <Download className="size-3.5" /> Download Receipt (PDF)
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 4: REMINDERS & NOTIFICATIONS */}
          <TabsContent value="notifications" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Hospital Notices & Reminders</h2>
            </div>

            {(!notifications || notifications.length === 0) ? (
              <Card className="border-dashed p-8 text-center">
                <Bell className="mx-auto mb-3 size-10 text-muted-foreground/60" />
                <h3 className="font-medium">No notifications yet</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  You will receive in-app alerts here for upcoming appointments and pre-therapy instructions.
                </p>
              </Card>
            ) : (
              <div className="grid gap-3">
                {notifications.map((n) => (
                  <Card
                    key={n.id}
                    className={`border-border transition-all ${!n.read_at ? "border-l-4 border-l-primary bg-secondary/20" : ""}`}
                  >
                    <CardContent className="flex flex-wrap items-center justify-between gap-4 pt-4 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold">{n.title}</h4>
                          {!n.read_at && (
                            <Badge variant="destructive" className="text-[9px]">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{n.body}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {new Date(n.created_at).toLocaleString("en-IN")}
                        </p>
                      </div>

                      {!n.read_at && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs"
                          onClick={() => handleMarkRead(n.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 5: MY PROFILE */}
          <TabsContent value="profile" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
                <CardDescription>
                  Keep your contact information updated for prescriptions and SMS reminders.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="prof-name">Full Name</Label>
                      <Input
                        id="prof-name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="prof-email">Email Address</Label>
                      <Input id="prof-email" value={user.email || ""} disabled />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="prof-phone">Phone Number</Label>
                      <Input
                        id="prof-phone"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="prof-dob">Date of Birth</Label>
                      <Input
                        id="prof-dob"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="prof-address">Residential Address</Label>
                    <Input
                      id="prof-address"
                      placeholder="Street, City, State, PIN"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <Button type="submit" disabled={savingProfile} className="gap-2">
                    {savingProfile ? "Saving changes…" : "Save Profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageShell>
  );
}
