import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Stethoscope,
  Calendar,
  Clock,
  User,
  FileCheck,
  Plus,
  Save,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Edit,
  Sparkles,
  ArrowRight,
  LogOut,
  Sliders,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  useDoctors,
  useDoctorAppointments,
  useDoctorAvailability,
  type Doctor,
  type Appointment,
} from "@/lib/queries";
import { createInAppNotification } from "@/lib/notifications";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/doctor")({
  head: () => ({
    meta: [
      { title: "Doctor Portal — Aarogya Ayurveda Hospital" },
      {
        name: "description",
        content: "Physician workstation for writing consultation summaries, prescriptions, and managing clinical availability.",
      },
    ],
  }),
  component: DoctorPortalPage,
});

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function DoctorPortalPage() {
  const { user, isDoctor, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const { data: doctors, refetch: refetchDoctors } = useDoctors();

  // Selected or assigned doctor state
  const [activeDoctorId, setActiveDoctorId] = useState<string>("");

  // Determine active physician
  const currentDoctor = useMemo(() => {
    if (!doctors || doctors.length === 0) return null;
    if (activeDoctorId) return doctors.find((d) => d.id === activeDoctorId) || doctors[0];
    const match = doctors.find((d) => d.user_id === user?.id);
    return match || doctors[0];
  }, [doctors, activeDoctorId, user]);

  const { data: appointments, refetch: refetchAppointments } = useDoctorAppointments(currentDoctor?.id);
  const { data: availability, refetch: refetchAvailability } = useDoctorAvailability(currentDoctor?.id);

  // Consultation Studio modal state
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [doshaAssessment, setDoshaAssessment] = useState("");
  const [prescription, setPrescription] = useState("");
  const [therapyPlan, setTherapyPlan] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [savingConsultation, setSavingConsultation] = useState(false);

  // Availability state
  const [newWeekday, setNewWeekday] = useState(1);
  const [newStartTime, setNewStartTime] = useState("09:00");
  const [newEndTime, setNewEndTime] = useState("13:00");
  const [newSlotMinutes, setNewSlotMinutes] = useState(30);
  const [addingAvail, setAddingAvail] = useState(false);

  const handleOpenConsultation = (appt: Appointment) => {
    setSelectedAppt(appt);
    setDiagnosis("");
    setDoshaAssessment("Vata-Pitta imbalance with mild Ama accumulation in digestive tract");
    setPrescription(
      "1. Triphala Churna: 1 tsp at bedtime with warm water\n2. Ashwagandha Lehyam: 1 tsp twice daily after meals\n3. Mahanarayana Taila: Warm application over affected joints"
    );
    setTherapyPlan("Abhyanga & Swedana course for 5 consecutive days, followed by Matra Basti.");
    setNotes("Avoid cold, fermented foods and erratic meal times. Favour freshly prepared warm kitchari.");

    const inTwoWeeks = new Date();
    inTwoWeeks.setDate(inTwoWeeks.getDate() + 14);
    setFollowUpDate(inTwoWeeks.toISOString().split("T")[0] || "");
  };

  const handleSaveConsultation = async () => {
    if (!selectedAppt || !currentDoctor) return;

    setSavingConsultation(true);
    try {
      // 1. Insert Consultation record
      const { error: consultError } = await supabase.from("consultations").insert({
        appointment_id: selectedAppt.id,
        patient_id: selectedAppt.patient_id,
        doctor_id: currentDoctor.id,
        visit_date: selectedAppt.appointment_date,
        diagnosis,
        dosha_assessment: doshaAssessment,
        prescription,
        therapy_plan: therapyPlan,
        notes,
        follow_up_date: followUpDate || null,
      });

      if (consultError) throw consultError;

      // 2. Mark appointment as completed
      const { error: apptError } = await supabase
        .from("appointments")
        .update({ status: "completed" })
        .eq("id", selectedAppt.id);

      if (apptError) throw apptError;

      // 3. Notify patient
      await createInAppNotification({
        userId: selectedAppt.patient_id,
        appointmentId: selectedAppt.id,
        title: `Consultation Notes Ready: Dr. ${currentDoctor.full_name}`,
        body: "Your physician has published your diagnosis, prescription, and therapy plan. You can download the PDF from your dashboard.",
      });

      toast.success("Consultation and prescription published to patient!");
      setSelectedAppt(null);
      refetchAppointments();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to record consultation";
      toast.error(message);
    } finally {
      setSavingConsultation(false);
    }
  };

  const handleAddAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDoctor) return;

    setAddingAvail(true);
    try {
      const { error } = await supabase.from("availability").insert({
        doctor_id: currentDoctor.id,
        weekday: newWeekday,
        start_time: newStartTime,
        end_time: newEndTime,
        slot_minutes: newSlotMinutes,
        is_active: true,
      });

      if (error) throw error;
      toast.success("Availability slot added!");
      refetchAvailability();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Could not add availability";
      toast.error(message);
    } finally {
      setAddingAvail(false);
    }
  };

  const handleToggleDay = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("availability")
        .update({ is_active: !currentStatus })
        .eq("id", id);
      if (error) throw error;
      toast.success(`Slot ${!currentStatus ? "activated" : "deactivated"}.`);
      refetchAvailability();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update slot";
      toast.error(message);
    }
  };

  if (!user) {
    return (
      <PageShell>
        <div className="mx-auto flex min-h-[calc(100vh-16rem)] max-w-md items-center justify-center px-4 py-16">
          <Card className="w-full text-center">
            <CardHeader>
              <div className="mx-auto mb-2 grid size-12 place-items-center rounded-full bg-secondary text-primary">
                <Stethoscope className="size-6" />
              </div>
              <CardTitle className="font-display text-2xl">Doctor Portal Login</CardTitle>
              <CardDescription>
                Sign in with your physician credentials to review appointments and publish paperless prescriptions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/auth">Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1 text-xs">
                <Stethoscope className="size-3 text-primary" /> Physician Workstation
              </Badge>
              {isAdmin && (
                <Badge variant="outline" className="text-xs text-amber-600 dark:text-amber-400">
                  Admin View
                </Badge>
              )}
            </div>
            <h1 className="mt-1 font-display text-3xl sm:text-4xl">
              {currentDoctor?.full_name || "Doctor Portal"}
            </h1>
            <p className="text-sm text-primary font-medium">
              {currentDoctor?.speciality} · {currentDoctor?.qualifications}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Physician Switcher for easy testing / multi-doctor hospital */}
            <div className="flex items-center gap-2">
              <Label htmlFor="doc-switch" className="text-xs text-muted-foreground">
                Practicing As:
              </Label>
              <select
                id="doc-switch"
                className="rounded-md border border-input bg-card px-2.5 py-1.5 text-xs text-foreground"
                value={currentDoctor?.id || ""}
                onChange={(e) => setActiveDoctorId(e.target.value)}
              >
                {(doctors ?? []).map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.full_name} ({d.speciality.split(" ")[0]})
                  </option>
                ))}
              </select>
            </div>

            <Button
              size="sm"
              variant="ghost"
              className="gap-1.5 text-xs text-muted-foreground"
              onClick={async () => {
                await signOut();
                navigate({ to: "/" });
              }}
            >
              <LogOut className="size-3.5" /> Sign out
            </Button>
          </div>
        </div>

        {/* Doctor Tabs */}
        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 max-w-md">
            <TabsTrigger value="schedule" className="gap-1.5 text-xs sm:text-sm">
              <Calendar className="size-4" /> Appointments ({appointments?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="availability" className="gap-1.5 text-xs sm:text-sm">
              <Clock className="size-4" /> Availability Hours
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-1.5 text-xs sm:text-sm">
              <Sliders className="size-4" /> Clinic Profile
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: SCHEDULE & CONSULTATION */}
          <TabsContent value="schedule" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Assigned Consultations</h2>
              <span className="text-xs text-muted-foreground">
                Click any appointment to write notes & prescription
              </span>
            </div>

            {(!appointments || appointments.length === 0) ? (
              <Card className="border-dashed p-8 text-center">
                <Calendar className="mx-auto mb-3 size-10 text-muted-foreground/60" />
                <h3 className="font-medium">No appointments currently booked</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  When patients book slots under your name, they will immediately appear here.
                </p>
              </Card>
            ) : (
              <div className="grid gap-3">
                {appointments.map((appt) => (
                  <Card
                    key={appt.id}
                    className="border-border transition-all hover:border-primary/50"
                  >
                    <CardContent className="flex flex-wrap items-center justify-between gap-4 pt-4 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">
                            Date: {appt.appointment_date} at {appt.start_time.slice(0, 5)}
                          </span>
                          <Badge
                            variant={
                              appt.status === "completed"
                                ? "secondary"
                                : appt.status === "confirmed"
                                ? "default"
                                : "outline"
                            }
                            className="text-[10px] capitalize"
                          >
                            {appt.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Patient ID: {appt.patient_id.substring(0, 8)}…
                        </p>
                        {appt.reason && (
                          <p className="text-xs text-foreground italic">
                            Chief Complaint: "{appt.reason}"
                          </p>
                        )}
                      </div>

                      <div>
                        {appt.status === "completed" ? (
                          <Badge variant="outline" className="gap-1 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="size-3.5" /> Completed
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            className="gap-1.5 text-xs font-semibold"
                            onClick={() => handleOpenConsultation(appt)}
                          >
                            <FileCheck className="size-3.5" /> Start Consultation & Rx
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 2: AVAILABILITY HOURS */}
          <TabsContent value="availability" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl">OPD & Consultation Hours</h2>
                <p className="text-xs text-muted-foreground">
                  Active time slots available to patients when booking consultations.
                </p>
              </div>
            </div>

            {/* List of active windows */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(availability ?? []).map((avail) => (
                <Card
                  key={avail.id}
                  className={`border-border ${!avail.is_active ? "opacity-50" : ""}`}
                >
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{WEEKDAYS[avail.weekday]}</span>
                      <Badge variant={avail.is_active ? "default" : "outline"} className="text-[10px]">
                        {avail.is_active ? "Active" : "Paused"}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3.5" />
                      <span>
                        {avail.start_time.slice(0, 5)} – {avail.end_time.slice(0, 5)}
                      </span>
                      <span>({avail.slot_minutes} min slots)</span>
                    </div>

                    <div className="mt-3 flex justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs"
                        onClick={() => handleToggleDay(avail.id, avail.is_active)}
                      >
                        {avail.is_active ? "Pause day" : "Activate day"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add New Availability Window */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Add Weekly Availability Window</CardTitle>
                <CardDescription>
                  Specify day of the week, shift hours, and consultation duration per patient.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddAvailability} className="grid gap-4 sm:grid-cols-4 items-end">
                  <div className="space-y-1.5">
                    <Label htmlFor="av-weekday" className="text-xs">Weekday</Label>
                    <select
                      id="av-weekday"
                      className="w-full rounded-md border border-input bg-card px-3 py-2 text-xs text-foreground"
                      value={newWeekday}
                      onChange={(e) => setNewWeekday(Number(e.target.value))}
                    >
                      {WEEKDAYS.map((day, idx) => (
                        <option key={day} value={idx}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="av-start" className="text-xs">Start Time</Label>
                    <Input
                      id="av-start"
                      type="time"
                      value={newStartTime}
                      onChange={(e) => setNewStartTime(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="av-end" className="text-xs">End Time</Label>
                    <Input
                      id="av-end"
                      type="time"
                      value={newEndTime}
                      onChange={(e) => setNewEndTime(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={addingAvail} className="gap-1.5">
                    <Plus className="size-4" /> Add Slot
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: CLINIC PROFILE */}
          <TabsContent value="profile" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Physician Credentials & Consultation Fee</CardTitle>
                <CardDescription>
                  This information appears on public physician cards and official patient prescriptions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentDoctor && (
                  <div className="space-y-3 text-xs">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <span className="text-muted-foreground">Full Name:</span>
                        <p className="font-semibold text-sm">{currentDoctor.full_name}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Speciality:</span>
                        <p className="font-semibold text-sm text-primary">{currentDoctor.speciality}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Qualifications:</span>
                        <p className="font-medium">{currentDoctor.qualifications}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Consultation Fee:</span>
                        <p className="font-bold text-sm">₹{Number(currentDoctor.consultation_fee).toFixed(0)}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Clinical Biography:</span>
                      <p className="mt-1 text-muted-foreground">{currentDoctor.bio}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CONSULTATION STUDIO DIALOG */}
        <Dialog open={!!selectedAppt} onOpenChange={(open) => !open && setSelectedAppt(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">
                Ayurvedic Consultation & Prescription Studio
              </DialogTitle>
              <DialogDescription>
                Appointment Date: {selectedAppt?.appointment_date} at {selectedAppt?.start_time.slice(0, 5)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              <div className="rounded-lg bg-secondary/30 p-3">
                <span className="font-semibold text-primary">Patient Chief Complaint:</span>
                <p className="mt-0.5 text-foreground italic">"{selectedAppt?.reason || "General health consultation"}"</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="diag" className="text-xs font-semibold">
                  1. Clinical Diagnosis (Roga Nidana) *
                </Label>
                <Input
                  id="diag"
                  placeholder="e.g. Sandhivata (Osteoarthritis) / Grahani (IBS)"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="dosha" className="text-xs font-semibold">
                  2. Dosha Assessment (Prakriti / Vikriti & Agni State)
                </Label>
                <Input
                  id="dosha"
                  placeholder="e.g. Aggravated Vata in joints, Mandagni (sluggish digestive fire)"
                  value={doshaAssessment}
                  onChange={(e) => setDoshaAssessment(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="presc" className="text-xs font-semibold">
                  3. Prescribed Medicines & Dosage Instructions (Aushadha) *
                </Label>
                <Textarea
                  id="presc"
                  rows={4}
                  placeholder="Medicine name, dosage, timing (e.g. Before / After meals, Anupana with warm water)"
                  value={prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="therapies" className="text-xs font-semibold">
                  4. Panchakarma & External Therapies Plan (Chikitsa)
                </Label>
                <Textarea
                  id="therapies"
                  rows={2}
                  placeholder="e.g. Abhyanga 5 days, Shirodhara 3 days, Nasya course..."
                  value={therapyPlan}
                  onChange={(e) => setTherapyPlan(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lifestyle" className="text-xs font-semibold">
                  5. Dietary (Pathya / Apathya) & Dinacharya Routine
                </Label>
                <Textarea
                  id="lifestyle"
                  rows={2}
                  placeholder="Foods to favour, foods to avoid, sleep timing..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="followup" className="text-xs font-semibold">
                  6. Follow-up Review Date
                </Label>
                <Input
                  id="followup"
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedAppt(null)}>
                Cancel
              </Button>
              <Button
                disabled={savingConsultation || !diagnosis}
                onClick={handleSaveConsultation}
                className="gap-1.5 font-semibold"
              >
                {savingConsultation ? "Publishing…" : "Publish Paperless Prescription"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageShell>
  );
}
