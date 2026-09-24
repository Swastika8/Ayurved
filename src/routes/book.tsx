import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle2,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Download,
  AlertCircle,
  Leaf,
  ShieldCheck,
  Building2,
  QrCode,
  Sparkles,
  Heart,
  Stethoscope,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useDoctors, useDoctorAvailability, useDoctorBookedSlots, type Doctor } from "@/lib/queries";
import { generateReceiptPdf } from "@/lib/pdf-generator";
import { createInAppNotification } from "@/lib/notifications";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { DOCTORS_ROSTER } from "@/data/doctors";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Ayurvedic Consultation — Aarogya Classical Hospital" },
      {
        name: "description",
        content:
          "Schedule an in-person Nadi Pariksha consultation or online Ayurvedic telehealth session with our senior Vaidyas. Instant slot confirmation and digital receipt.",
      },
      { property: "og:title", content: "Book an Appointment — Aarogya Ayurveda" },
      {
        property: "og:description",
        content: "Personalized dosha diagnosis, pulse reading, and customized herbal treatment scheduling.",
      },
    ],
  }),
  component: BookAppointmentPage,
});

type Step = "doctor" | "slot" | "details" | "payment" | "confirmed";

const FALLBACK_DOCTORS: Doctor[] = DOCTORS_ROSTER.map((d, index) => ({
  id: `doctor-${index + 1}`,
  user_id: null,
  full_name: d.name,
  speciality: d.speciality,
  qualifications: d.qualifications,
  years_experience: d.yearsExperience,
  consultation_fee: d.consultationFee,
  bio: d.bio,
  is_active: true,
  photo_url: d.image,
  created_at: new Date().toISOString(),
}));

function generateSlotsForRange(startTimeStr: string, endTimeStr: string, intervalMinutes = 30) {
  const slots: string[] = [];
  const startParts = startTimeStr.split(":").map(Number);
  const endParts = endTimeStr.split(":").map(Number);
  const startH = startParts[0] ?? 0;
  const startM = startParts[1] ?? 0;
  const endH = endParts[0] ?? 0;
  const endM = endParts[1] ?? 0;

  let currentMin = startH * 60 + startM;
  const endTotalMin = endH * 60 + endM;

  while (currentMin + intervalMinutes <= endTotalMin) {
    const h = Math.floor(currentMin / 60);
    const m = currentMin % 60;
    const formatted = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    slots.push(formatted);
    currentMin += intervalMinutes;
  }
  return slots;
}

function BookAppointmentPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isFallbackDoctor = (id?: string) => {
    return Boolean(id && (id.startsWith("doctor-") || FALLBACK_DOCTORS.some((d) => d.id === id)));
  };

  const { data: remoteDoctors, isLoading: loadingDoctors } = useDoctors();
  const doctors = useMemo(() => {
    if (loadingDoctors) return [];
    if (remoteDoctors && remoteDoctors.length > 0) return remoteDoctors;
    // Offer fallback doctors only in guest/demo mode after queries settle without data
    if (!user) return FALLBACK_DOCTORS;
    return [];
  }, [loadingDoctors, remoteDoctors, user]);

  const [step, setStep] = useState<Step>("doctor");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [patientEmail, setPatientEmail] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<{
    appointmentId: string;
    receiptNumber: string;
    amount: number;
    date: string;
    time: string;
    doctorName: string;
  } | null>(null);

  // Prepopulate patient info when user logs in
  useMemo(() => {
    if (user && !patientName) {
      setPatientEmail(user.email || "");
      void supabase
        .from("profiles")
        .select("full_name, phone")
        .eq("id", user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data?.full_name) setPatientName(data.full_name);
          if (data?.phone) setPatientPhone(data.phone);
        });
    }
  }, [user, patientName]);

  // Fetch doctor availability
  const { data: remoteAvailability, isLoading: loadingAvailability } = useDoctorAvailability(selectedDoctor?.id);

  // Fallback availability only in guest/demo mode after queries settle without data
  const effectiveAvailability = useMemo(() => {
    if (loadingAvailability) return [];
    if (remoteAvailability && remoteAvailability.length > 0) {
      return remoteAvailability;
    }
    // Only offer fallback schedule in guest/demo mode for fallback doctors
    if (!user && selectedDoctor && isFallbackDoctor(selectedDoctor.id)) {
      return [1, 2, 3, 4, 5, 6].map((w) => ({
        id: `fallback-avail-${w}`,
        doctor_id: selectedDoctor.id,
        weekday: w,
        start_time: "09:00:00",
        end_time: "17:00:00",
        slot_minutes: 30,
        is_active: true,
        created_at: new Date().toISOString(),
      }));
    }
    // Real doctors with no configured schedule receive no fallback slots
    return [];
  }, [loadingAvailability, remoteAvailability, selectedDoctor, user]);

  // Fetch booked slots for the selected date & doctor
  const { data: bookedSlots } = useDoctorBookedSlots(selectedDoctor?.id, selectedDate);

  // Next 14 days dates generator
  const availableDates = useMemo(() => {
    const dates: { dateStr: string; display: string; weekday: number; isAvailable: boolean }[] = [];
    const activeWeekdays = new Set(
      effectiveAvailability.filter((a) => a.is_active).map((a) => a.weekday)
    );

    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      const weekday = d.getDay(); // 0 is Sunday, 1 is Monday...

      dates.push({
        dateStr,
        display: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
        weekday,
        isAvailable: activeWeekdays.has(weekday),
      });
    }
    return dates;
  }, [effectiveAvailability]);

  // Compute time slots for the chosen date
  const availableSlots = useMemo(() => {
    if (!selectedDate || !selectedDoctor) return [];

    const parsedDate = new Date(selectedDate);
    const weekday = parsedDate.getDay();

    const matchingAvailabilities = effectiveAvailability.filter(
      (a) => a.weekday === weekday && a.is_active
    );
    if (matchingAvailabilities.length === 0) return [];

    const allSlots: string[] = [];
    matchingAvailabilities.forEach((avail) => {
      const generated = generateSlotsForRange(avail.start_time, avail.end_time, avail.slot_minutes || 30);
      allSlots.push(...generated);
    });

    const uniqueSlots = Array.from(new Set(allSlots)).sort();
    const bookedSet = new Set(bookedSlots ?? []);

    return uniqueSlots.map((slot) => ({
      slot,
      isBooked: bookedSet.has(slot),
    }));
  }, [selectedDate, effectiveAvailability, selectedDoctor, bookedSlots]);

  // Guard against unauthenticated visitors accessing gated booking steps
  useEffect(() => {
    if (!user && step !== "doctor") {
      setStep("doctor");
    }
  }, [user, step]);

  const handleSelectDoctor = (doctor: Doctor) => {
    if (!user) {
      toast.info("Please sign in or create an account to book an appointment with our Vaidyas.");
      navigate({ to: "/auth", search: { redirect: "/book" } });
      return;
    }
    setSelectedDoctor(doctor);
    setSelectedDate("");
    setSelectedSlot("");
    setStep("slot");
  };

  const handleProceedToDetails = () => {
    if (!user) {
      toast.info("Please sign in to proceed with your consultation booking.");
      navigate({ to: "/auth", search: { redirect: "/book" } });
      return;
    }
    if (!selectedDate || !selectedSlot) {
      toast.error("Please choose a consultation date and time slot.");
      return;
    }
    setStep("details");
  };

  const handleProceedToPayment = () => {
    if (!user) {
      toast.info("Please sign in to proceed to checkout and payment.");
      navigate({ to: "/auth", search: { redirect: "/book" } });
      return;
    }
    if (!patientName.trim()) {
      toast.error("Please enter patient name.");
      return;
    }
    setStep("payment");
  };

  const handleConfirmAndPay = async () => {
    if (!user) {
      toast.error("Authentication required. Please sign in to book your appointment and process payment.");
      navigate({ to: "/auth", search: { redirect: "/book" } });
      return;
    }
    if (!selectedDoctor || !selectedDate || !selectedSlot) return;

    // Detect fallback doctor IDs and block database persistence
    if (isFallbackDoctor(selectedDoctor.id)) {
      toast.error("This is a demo physician profile and cannot be booked in the live database. Please select a registered hospital Vaidya.");
      return;
    }

    setIsSubmitting(true);
    try {
      const fee = Number(selectedDoctor.consultation_fee) || 750;
      const receiptNum = `RCP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

      // 1. Record appointment in database
      const { data: appointmentData, error: apptError } = await supabase
        .from("appointments")
        .insert({
          patient_id: user.id,
          doctor_id: selectedDoctor.id,
          appointment_date: selectedDate,
          start_time: selectedSlot + ":00",
          reason: reason || "General Ayurvedic Consultation",
          status: "confirmed",
          amount: fee,
        })
        .select()
        .single();

      if (apptError || !appointmentData) {
        throw new Error(apptError?.message || "Failed to schedule appointment in hospital database.");
      }

      const appointmentId = appointmentData.id;

      // 2. Record payment in database
      const { error: paymentError } = await supabase.from("payments").insert({
        appointment_id: appointmentData.id,
        patient_id: user.id,
        amount: fee,
        currency: "INR",
        status: "completed",
        provider: `simulated_${paymentMethod}`,
        provider_reference: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        receipt_number: receiptNum,
        paid_at: new Date().toISOString(),
      });

      if (paymentError) {
        throw new Error(paymentError.message || "Failed to log payment transaction in database.");
      }

      // In-app notification (non-blocking)
      try {
        await createInAppNotification({
          userId: user.id,
          appointmentId: appointmentData.id,
          title: `Consultation Confirmed: ${selectedDoctor.full_name}`,
          body: `Your appointment is scheduled for ${selectedDate} at ${selectedSlot}. Please arrive 15 minutes before your slot.`,
        });
      } catch {
        // non-blocking
      }

      // Update phone on profile if given (non-blocking)
      if (patientPhone) {
        try {
          await supabase.from("profiles").update({ phone: patientPhone }).eq("id", user.id);
        } catch {
          // non-blocking
        }
      }

      setConfirmedBooking({
        appointmentId,
        receiptNumber: receiptNum,
        amount: fee,
        date: selectedDate,
        time: selectedSlot,
        doctorName: selectedDoctor.full_name,
      });

      toast.success("Consultation booked and confirmed successfully!");
      setStep("confirmed");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Booking could not be completed";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell>
      <div className="space-y-12">
        {/* Full Environmental Consultation Sanctuary Backdrop */}
        <section className="relative -mt-6 sm:-mt-10 -mx-4 sm:-mx-8 lg:-mx-12 overflow-hidden min-h-[60vh] lg:min-h-[68vh] flex items-center justify-start border-b border-border/70">
          {/* Full Environmental 3D Asset */}
          <div className="absolute inset-0 z-0">
            <img
              src="/media/appointment.jpg"
              alt="Ayurvedic Physician Consultation Desk and Palm Leaf Diagnostic Suite"
              className="w-full h-full object-cover object-right lg:object-center filter saturate-[1.12] contrast-[1.08] brightness-[0.96]"
            />
            {/* Transparent Dark Scrim: ZERO whitish hue, letting rich diagnostic desk & copper urulis glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 pointer-events-none" />
          </div>

          {/* Ambient Botanical Glows */}
          <div className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[140px] pointer-events-none z-0" />
          <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] rounded-full bg-primary/15 blur-[130px] pointer-events-none z-0" />

          {/* Hero Content Floating Over Environment */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 w-full">
            <div className="max-w-2xl space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="rounded-full border-white/20 bg-black/40 backdrop-blur-md text-[#e6ca65] px-3.5 py-1 text-xs"
                >
                  <Sparkles className="size-3 text-accent mr-1.5" /> Vaidya OPD & Telehealth Scheduling
                </Badge>
                <Badge className="bg-[#d4af37]/25 text-[#f3e5ab] border border-[#d4af37]/35 rounded-full text-xs backdrop-blur-md">
                  Direct Lineage Vaidyas
                </Badge>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                Schedule an <br />
                <span className="italic text-[#e6ca65] font-serif">Ayurvedic Consultation</span>
              </h1>

              <p className="font-serif italic text-base sm:text-xl text-[#f3e5ab] leading-snug">
                “Rogamadau Pareeksheta Tato-anantaram Aushadham.”
              </p>
              <p className="text-xs text-white/80 italic">
                — Charaka Samhita: First thoroughly examine the patient and disease; only then prescribe the medicine.
              </p>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                Whether you visit our hospital sanctuary in person for traditional eight-fold diagnosis (*Ashtavidha Pariksha*) or connect from abroad via high-definition Telehealth, every treatment is customized to your unique Dosha constitution.
              </p>

              <div className="flex flex-wrap gap-4 text-xs pt-1">
                <span className="flex items-center gap-1.5 text-white font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                  <CheckCircle2 className="size-4 text-[#e6ca65]" /> Comprehensive Pulse Reading
                </span>
                <span className="flex items-center gap-1.5 text-foreground/90 font-medium bg-background/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/60">
                  <CheckCircle2 className="size-4 text-accent" /> Customized Herbal Rx
                </span>
                <span className="flex items-center gap-1.5 text-foreground/90 font-medium bg-background/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/60">
                  <CheckCircle2 className="size-4 text-primary" /> Instant Slot Receipt
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Wizard Progress Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">

          {/* Stepper pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs">
            {[
              { key: "doctor", label: "1. Select Vaidya" },
              { key: "slot", label: "2. Date & Time" },
              { key: "details", label: "3. Patient Notes" },
              { key: "payment", label: "4. Checkout Simulation" },
              { key: "confirmed", label: "5. Confirmed" },
            ].map((st, idx) => (
              <div key={st.key} className="flex items-center gap-2">
                <span
                  className={`leaf-pill px-3.5 py-1.5 font-medium transition-all ${
                    step === st.key
                      ? "bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/20"
                      : "bg-secondary/70 text-muted-foreground"
                  }`}
                >
                  {st.label}
                </span>
                {idx < 4 && <span className="text-muted-foreground/40">›</span>}
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1: SELECT DOCTOR */}
        {step === "doctor" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">Our Senior Ayurvedic Physicians</h2>
                <p className="text-xs text-muted-foreground">Choose a specialist aligned with your primary health focus</p>
              </div>
              <Badge variant="secondary" className="leaf-pill text-xs">
                {doctors.length} Physicians Available
              </Badge>
            </div>

            {/* Authentication Notice Banner for Guests */}
            {!user ? (
              <div className="leaf-card p-6 bg-gradient-to-r from-primary/10 via-accent/10 to-transparent border border-primary/25 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-primary" />
                    <h3 className="font-semibold text-foreground text-sm">
                      Patient Sign In Required to Reserve Slots & Make Payments
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground max-w-xl">
                    Physician credentials, specialties, and hospital information are openly accessible. To schedule your consultation, access real-time clinical slots, and proceed to payment, please log in or create a patient account.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button asChild size="sm" className="rounded-full text-xs font-semibold px-4">
                    <Link to="/auth" search={{ redirect: "/book" }}>
                      Sign In to Book Consultation
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="leaf-card p-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-foreground font-medium">
                    Signed in as <span className="font-semibold text-primary">{user.email}</span>
                  </span>
                </div>
                <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                  Verified Patient Access
                </Badge>
              </div>
            )}

            {loadingDoctors && (
              <div className="p-8 text-center text-sm text-muted-foreground">
                Connecting to clinical roster…
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              {doctors.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => handleSelectDoctor(doc)}
                  className={`leaf-card p-6 border transition-all duration-300 cursor-pointer bg-card hover:border-primary/50 hover:shadow-md ${
                    selectedDoctor?.id === doc.id ? "border-primary ring-2 ring-primary/30" : "border-border/80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="font-display text-xl font-bold text-foreground">{doc.full_name}</h3>
                      <p className="text-xs font-semibold text-primary">{doc.speciality}</p>
                      <p className="text-[11px] text-muted-foreground">{doc.qualifications}</p>
                    </div>
                    <Badge variant="outline" className="leaf-pill shrink-0 border-accent/40 bg-accent/10 text-accent font-semibold text-xs">
                      ₹{Number(doc.consultation_fee).toFixed(0)}
                    </Badge>
                  </div>

                  <p className="mt-3 line-clamp-2 text-xs text-muted-foreground leading-relaxed">{doc.bio}</p>

                  <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 font-medium">
                      <Stethoscope className="size-3 text-primary" />
                      {doc.years_experience} yrs clinical exp.
                    </span>
                    <Button size="sm" className="leaf-pill bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-xs gap-1.5 transition-colors">
                      {user ? "Select Slot" : "Sign In to Book"} <ArrowRight className="size-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DATE & TIME SLOT */}
        {step === "slot" && selectedDoctor && (
          <div className="space-y-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep("doctor")}
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" /> Back to Physician Roster
            </Button>

            <div className="leaf-card p-6 bg-card border border-primary/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-primary/10 text-primary grid place-items-center shrink-0">
                  <User className="size-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Selected Physician</p>
                  <h2 className="font-display text-2xl font-bold text-foreground">{selectedDoctor.full_name}</h2>
                  <p className="text-xs text-primary font-medium">{selectedDoctor.speciality}</p>
                </div>
              </div>
              <Badge variant="secondary" className="leaf-pill text-sm px-4 py-1.5 font-semibold">
                Consultation Fee: ₹{Number(selectedDoctor.consultation_fee).toFixed(0)}
              </Badge>
            </div>

            {/* Date Picker Horizontal Bar */}
            <div className="leaf-card p-6 bg-card border border-border/80 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                  1. Choose Consultation Date (Next 14 Days)
                </Label>
                <span className="text-xs text-muted-foreground">Select a date to unlock available hours</span>
              </div>

              <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.dateStr;
                  return (
                    <button
                      key={item.dateStr}
                      type="button"
                      disabled={!item.isAvailable}
                      onClick={() => {
                        setSelectedDate(item.dateStr);
                        setSelectedSlot("");
                      }}
                      className={`min-w-[105px] shrink-0 rounded-2xl border p-3.5 text-center transition-all cursor-pointer ${
                        !item.isAvailable
                          ? "cursor-not-allowed opacity-35 bg-muted/40 border-dashed"
                          : isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-md scale-[1.02]"
                          : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      <div className="text-[11px] font-semibold uppercase">{item.display.split(",")[0]}</div>
                      <div className="text-base font-bold my-0.5">{item.display.split(",")[1] || item.display}</div>
                      <div className="text-[10px] opacity-80">
                        {item.isAvailable ? "Open OPD" : "Off Day"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Picker */}
            {selectedDate && (
              <div className="leaf-card p-6 bg-card border border-border/80 space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                    2. Choose 30-Minute Time Slot ({selectedDate})
                  </Label>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live OPD Slots
                  </span>
                </div>

                {availableSlots.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">
                    No open consultation slots on this date. Please pick another date above.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                    {availableSlots.map(({ slot, isBooked }) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isBooked}
                          onClick={() => setSelectedSlot(slot)}
                          className={`rounded-xl border py-3 text-center text-xs font-semibold transition-all cursor-pointer ${
                            isBooked
                              ? "cursor-not-allowed border-dashed opacity-40 bg-muted/30"
                              : isSelected
                              ? "border-primary bg-primary text-primary-foreground shadow-sm scale-105"
                              : "border-border bg-card hover:border-primary/40 hover:bg-primary/5 text-foreground"
                          }`}
                        >
                          <Clock className="mx-auto mb-1.5 size-3.5 opacity-70" />
                          {slot}
                          {isBooked && <div className="text-[9px] text-destructive mt-0.5">Reserved</div>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button
                size="lg"
                disabled={!selectedDate || !selectedSlot}
                onClick={handleProceedToDetails}
                className="leaf-pill bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-semibold shadow-md"
              >
                Continue to Patient Notes <ArrowRight className="size-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: PATIENT DETAILS */}
        {step === "details" && selectedDoctor && (
          <div className="space-y-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep("slot")}
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" /> Back to Time Slots
            </Button>

            {!user && (
              <div className="leaf-card p-4 border border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Info className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>
                    Booking as <strong>Guest Patient</strong>. You can proceed directly or sign in to sync with your private medical portal.
                  </span>
                </div>
                <Button asChild size="sm" variant="outline" className="leaf-pill border-amber-500/30 shrink-0">
                  <Link to="/auth">Sign In / Switch Role</Link>
                </Button>
              </div>
            )}

            <div className="leaf-card p-6 sm:p-8 bg-card border border-border/80 shadow-sm space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground">Patient Information & Intake Notes</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Help {selectedDoctor.full_name} understand your symptoms and prepare your pulse diagnosis plan.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="patient-name" className="text-xs font-medium">
                    Patient Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="patient-name"
                    placeholder="e.g. Rahul Verma"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    className="bg-background"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="patient-phone" className="text-xs font-medium">
                    WhatsApp / Phone (For SMS & prescription link)
                  </Label>
                  <Input
                    id="patient-phone"
                    placeholder="+91 98765 43210"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="bg-background"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="patient-email" className="text-xs font-medium">
                  Email Address (For PDF receipt & appointment calendar invite)
                </Label>
                <Input
                  id="patient-email"
                  type="email"
                  placeholder="rahul@example.com"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reason" className="text-xs font-medium">
                  Primary Symptoms, Chronic Ailment, or Reason for Consultation *
                </Label>
                <Textarea
                  id="reason"
                  rows={4}
                  placeholder="e.g., Chronic lower back stiffness (Sandhivata) for 8 months, sluggish digestion after dinner, restless sleep, or inquiry about 14-day Panchakarma retreat..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                <ShieldCheck className="size-4 text-primary shrink-0" />
                <span>Confidential healthcare records under Aarogya Paperless Hospital Security Standards.</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                size="lg"
                onClick={handleProceedToPayment}
                className="leaf-pill bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-semibold shadow-md"
              >
                Proceed to Checkout Simulation <ArrowRight className="size-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: PAYMENT SIMULATION */}
        {step === "payment" && selectedDoctor && (
          <div className="space-y-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep("details")}
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" /> Back to Patient Notes
            </Button>

            <div className="grid gap-6 md:grid-cols-12 items-start">
              {/* Order Summary */}
              <div className="md:col-span-5 space-y-4">
                <div className="leaf-card p-6 bg-card border border-primary/20 space-y-4">
                  <h3 className="font-display text-xl font-bold text-foreground pb-2 border-b border-border">
                    Appointment Summary
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-muted-foreground">Consulting Vaidya:</span>
                      <p className="font-bold text-sm text-foreground mt-0.5">{selectedDoctor.full_name}</p>
                      <p className="text-primary font-medium">{selectedDoctor.speciality}</p>
                    </div>

                    <div className="border-t border-border/60 pt-2.5">
                      <span className="text-muted-foreground">Scheduled Slot:</span>
                      <p className="font-semibold text-foreground mt-0.5">
                        {selectedDate} at {selectedSlot}
                      </p>
                    </div>

                    <div className="border-t border-border/60 pt-2.5">
                      <span className="text-muted-foreground">Patient:</span>
                      <p className="font-semibold text-foreground mt-0.5">{patientName}</p>
                    </div>

                    <div className="border-t border-border/60 pt-2.5 flex justify-between items-center text-sm font-bold">
                      <span className="text-foreground">Total Consultation Fee:</span>
                      <span className="text-primary text-base">₹{Number(selectedDoctor.consultation_fee).toFixed(0)}</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-primary/5 border border-primary/15 p-3 text-[11px] text-muted-foreground leading-relaxed flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                    Includes 30-min pulse assessment, preliminary Prakriti analysis, and digital PDF prescription.
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="md:col-span-7 space-y-4">
                <div className="leaf-card p-6 sm:p-8 bg-card border border-border/80 space-y-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      Select Simulated Payment Method
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Safe testing gateway. No actual funds are charged; an authentic PDF receipt is instantly produced.
                    </p>
                  </div>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(val) => setPaymentMethod(val as "upi" | "card" | "netbanking")}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                  >
                    <Label
                      htmlFor="pay-upi"
                      className={`leaf-card p-4 border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                        paymentMethod === "upi" ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:bg-muted/40"
                      }`}
                    >
                      <RadioGroupItem value="upi" id="pay-upi" className="sr-only" />
                      <QrCode className="size-6 text-primary" />
                      <span className="text-xs font-bold">UPI / QR Code</span>
                      <span className="text-[10px] text-muted-foreground">GPay, PhonePe, BHIM</span>
                    </Label>

                    <Label
                      htmlFor="pay-card"
                      className={`leaf-card p-4 border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                        paymentMethod === "card" ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:bg-muted/40"
                      }`}
                    >
                      <RadioGroupItem value="card" id="pay-card" className="sr-only" />
                      <CreditCard className="size-6 text-primary" />
                      <span className="text-xs font-bold">Debit / Credit Card</span>
                      <span className="text-[10px] text-muted-foreground">Visa, RuPay, MC</span>
                    </Label>

                    <Label
                      htmlFor="pay-nb"
                      className={`leaf-card p-4 border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                        paymentMethod === "netbanking" ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:bg-muted/40"
                      }`}
                    >
                      <RadioGroupItem value="netbanking" id="pay-nb" className="sr-only" />
                      <Building2 className="size-6 text-primary" />
                      <span className="text-xs font-bold">Net Banking</span>
                      <span className="text-[10px] text-muted-foreground">All Major Indian Banks</span>
                    </Label>
                  </RadioGroup>

                  {paymentMethod === "upi" && (
                    <div className="leaf-card p-4 border border-primary/20 bg-primary/5 flex items-center gap-4 text-xs">
                      <div className="size-16 rounded-xl bg-card border border-border grid place-items-center shrink-0">
                        <QrCode className="size-10 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-foreground">Instant UPI Authorization</p>
                        <p className="text-muted-foreground">
                          Simulated UPI VPA: <span className="font-mono text-primary">aarogya.hospital@icici</span>
                        </p>
                        <p className="text-[10px] text-muted-foreground">Auto-approved upon submission.</p>
                      </div>
                    </div>
                  )}

                  <Button
                    size="lg"
                    className="w-full leaf-pill bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 shadow-lg text-sm"
                    disabled={isSubmitting}
                    onClick={handleConfirmAndPay}
                  >
                    {isSubmitting ? (
                      "Confirming Slot & Generating Receipt…"
                    ) : (
                      <>
                        <ShieldCheck className="size-4 mr-2" />
                        Pay ₹{Number(selectedDoctor.consultation_fee).toFixed(0)} & Lock Slot
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: CONFIRMED */}
        {step === "confirmed" && confirmedBooking && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="leaf-card p-8 sm:p-10 bg-card border border-primary/25 shadow-xl text-center space-y-6">
              <div className="size-20 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 grid place-items-center mx-auto">
                <CheckCircle2 className="size-12" />
              </div>

              <div>
                <Badge variant="secondary" className="leaf-pill px-4 py-1 text-xs text-primary mb-2">
                  {user ? "Slot Confirmed & Logged" : "Demo Reservation Preview"}
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                  {user ? "Your Consultation is Scheduled!" : "Simulated Booking Preview"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {user
                    ? `A confirmation SMS has been dispatched. Your official hospital receipt is ready below, and your paperless clinical chart is created for ${confirmedBooking.doctorName}.`
                    : `This simulated demonstration preview illustrates the booking flow for ${confirmedBooking.doctorName}. No live appointment, SMS dispatch, or medical chart has been persisted to the hospital database. Please sign in to reserve verified clinical appointments.`}
                </p>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-secondary/30 p-5 text-left text-xs space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Receipt Number:</span>
                  <span className="font-mono font-bold text-primary text-sm">{confirmedBooking.receiptNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Consulting Vaidya:</span>
                  <span className="font-semibold text-foreground">{confirmedBooking.doctorName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Date & Slot:</span>
                  <span className="font-semibold text-foreground">
                    {confirmedBooking.date} at {confirmedBooking.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Amount Paid:</span>
                  <span className="font-semibold text-foreground">₹{confirmedBooking.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="size-3.5" /> Completed (Verified)
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <Button
                  size="lg"
                  variant="outline"
                  className="leaf-pill border-primary/30 hover:bg-primary/5 gap-2"
                  onClick={() => {
                    generateReceiptPdf({
                      receiptNumber: confirmedBooking.receiptNumber,
                      patientName: patientName || "Valued Patient",
                      doctorName: confirmedBooking.doctorName,
                      appointmentDate: confirmedBooking.date,
                      amount: confirmedBooking.amount,
                      paidAt: new Date().toLocaleDateString("en-IN"),
                      paymentMethod: `Online Gateway (${paymentMethod.toUpperCase()})`,
                    });
                    toast.success("Receipt PDF downloaded!");
                  }}
                >
                  <Download className="size-4" /> Download Official Receipt (PDF)
                </Button>

                {user ? (
                  <Button asChild size="lg" className="leaf-pill bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                    <Link to="/dashboard">
                      Go to Patient Dashboard <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild size="lg" className="leaf-pill bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                    <Link to="/auth" search={{ redirect: "/book" }}>
                      Sign In to Patient Portal <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </PageShell>
  );
}
