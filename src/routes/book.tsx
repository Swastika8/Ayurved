import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
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

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Aarogya Ayurveda Hospital" },
      {
        name: "description",
        content: "Schedule an in-person or online Ayurvedic consultation with our experienced physicians.",
      },
    ],
  }),
  component: BookAppointmentPage,
});

type Step = "doctor" | "slot" | "details" | "payment" | "confirmed";

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

  const { data: doctors, isLoading: loadingDoctors } = useDoctors();

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
  const { data: availability } = useDoctorAvailability(selectedDoctor?.id);

  // Fetch booked slots for the selected date & doctor
  const { data: bookedSlots } = useDoctorBookedSlots(selectedDoctor?.id, selectedDate);

  // Next 14 days dates generator
  const availableDates = useMemo(() => {
    const dates: { dateStr: string; display: string; weekday: number; isAvailable: boolean }[] = [];
    if (!availability) return dates;

    const activeWeekdays = new Set(availability.filter((a) => a.is_active).map((a) => a.weekday));

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
  }, [availability]);

  // Compute time slots for the chosen date
  const availableSlots = useMemo(() => {
    if (!selectedDate || !availability || !selectedDoctor) return [];

    const parsedDate = new Date(selectedDate);
    const weekday = parsedDate.getDay();

    const matchingAvailabilities = availability.filter((a) => a.weekday === weekday && a.is_active);
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
  }, [selectedDate, availability, selectedDoctor, bookedSlots]);

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate("");
    setSelectedSlot("");
    setStep("slot");
  };

  const handleProceedToDetails = () => {
    if (!selectedDate || !selectedSlot) {
      toast.error("Please choose a consultation date and time slot.");
      return;
    }
    setStep("details");
  };

  const handleProceedToPayment = () => {
    if (!user) {
      toast.error("Please sign in or create an account to secure your consultation.");
      navigate({ to: "/auth" });
      return;
    }
    if (!patientName.trim()) {
      toast.error("Please enter patient name.");
      return;
    }
    setStep("payment");
  };

  const handleConfirmAndPay = async () => {
    if (!user || !selectedDoctor || !selectedDate || !selectedSlot) return;

    setIsSubmitting(true);
    try {
      const fee = Number(selectedDoctor.consultation_fee) || 750;
      const receiptNum = `RCP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

      // 1. Create Appointment
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

      if (apptError) throw apptError;

      // 2. Create Payment Record
      const { error: payError } = await supabase.from("payments").insert({
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

      if (payError) console.error("Payment insert error:", payError);

      // 3. Create In-App Notification & Reminder
      await createInAppNotification({
        userId: user.id,
        appointmentId: appointmentData.id,
        title: `Appointment Confirmed: Dr. ${selectedDoctor.full_name}`,
        body: `Your consultation is scheduled for ${selectedDate} at ${selectedSlot}. Please arrive 15 minutes before your slot or open your dashboard.`,
      });

      // 4. Update local profile if phone was entered
      if (patientPhone) {
        await supabase
          .from("profiles")
          .update({ phone: patientPhone })
          .eq("id", user.id);
      }

      setConfirmedBooking({
        appointmentId: appointmentData.id,
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
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Wizard Progress Header */}
        <div className="mb-8">
          <Badge variant="secondary" className="mb-2 gap-1 text-xs">
            <Leaf className="size-3 text-primary" /> Classical Ayurveda OPD
          </Badge>
          <h1 className="font-display text-3xl sm:text-4xl">Book an Ayurvedic Consultation</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Select a specialist physician, pick an available slot, and confirm your visit.
          </p>

          {/* Stepper pills */}
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            {[
              { key: "doctor", label: "1. Select Doctor" },
              { key: "slot", label: "2. Date & Time" },
              { key: "details", label: "3. Patient Details" },
              { key: "payment", label: "4. Test Payment" },
              { key: "confirmed", label: "5. Confirmed" },
            ].map((st, idx) => (
              <div key={st.key} className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 font-medium transition-colors ${
                    step === st.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {st.label}
                </span>
                {idx < 4 && <span className="text-muted-foreground">/</span>}
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1: SELECT DOCTOR */}
        {step === "doctor" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Our Specialized Ayurvedic Physicians</h2>
              <span className="text-xs text-muted-foreground">
                {doctors?.length || 0} Physicians available
              </span>
            </div>

            {loadingDoctors && <p className="text-sm text-muted-foreground">Loading physicians…</p>}

            <div className="grid gap-4 sm:grid-cols-2">
              {(doctors ?? []).map((doc) => (
                <Card
                  key={doc.id}
                  className={`cursor-pointer transition-all hover:border-primary/50 hover:shadow-md ${
                    selectedDoctor?.id === doc.id ? "border-primary ring-1 ring-primary" : ""
                  }`}
                  onClick={() => handleSelectDoctor(doc)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold">{doc.full_name}</h3>
                        <p className="text-sm font-medium text-primary">{doc.speciality}</p>
                        <p className="text-xs text-muted-foreground">{doc.qualifications}</p>
                      </div>
                      <Badge variant="outline" className="shrink-0 bg-secondary/50 font-mono text-xs">
                        ₹{Number(doc.consultation_fee).toFixed(0)}
                      </Badge>
                    </div>

                    <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">{doc.bio}</p>

                    <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                      <span>{doc.years_experience} yrs clinical exp.</span>
                      <Button size="sm" variant="secondary" className="gap-1">
                        Select Slot <ArrowRight className="size-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
              className="gap-1 text-xs"
            >
              <ArrowLeft className="size-3.5" /> Back to Doctors
            </Button>

            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
              <div>
                <p className="text-xs text-muted-foreground">Selected Physician</p>
                <h2 className="font-display text-xl">{selectedDoctor.full_name}</h2>
                <p className="text-xs text-primary">{selectedDoctor.speciality}</p>
              </div>
              <Badge variant="secondary" className="text-sm">
                Fee: ₹{Number(selectedDoctor.consultation_fee).toFixed(0)}
              </Badge>
            </div>

            {/* Date Picker Horizontal Bar */}
            <div>
              <Label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
                1. Choose Consultation Date
              </Label>
              <div className="flex gap-2 overflow-x-auto pb-2">
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
                      className={`min-w-[100px] shrink-0 rounded-xl border p-3 text-center transition-all ${
                        !item.isAvailable
                          ? "cursor-not-allowed opacity-40"
                          : isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <div className="text-xs font-semibold">{item.display.split(",")[0]}</div>
                      <div className="text-sm font-bold">{item.display.split(",")[1] || item.display}</div>
                      <div className="mt-1 text-[10px]">
                        {item.isAvailable ? "Available" : "Off Day"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Picker */}
            {selectedDate && (
              <div>
                <Label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
                  2. Choose 30-Minute Consultation Slot ({selectedDate})
                </Label>

                {availableSlots.length === 0 ? (
                  <p className="py-4 text-sm text-muted-foreground">
                    No open slots on this date. Please choose another date above.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                    {availableSlots.map(({ slot, isBooked }) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isBooked}
                          onClick={() => setSelectedSlot(slot)}
                          className={`rounded-lg border py-2.5 text-center text-xs font-medium transition-all ${
                            isBooked
                              ? "cursor-not-allowed border-dashed opacity-40"
                              : isSelected
                              ? "border-primary bg-primary text-primary-foreground shadow-sm"
                              : "border-border bg-card hover:border-primary/40"
                          }`}
                        >
                          <Clock className="mx-auto mb-1 size-3.5 opacity-70" />
                          {slot}
                          {isBooked && <div className="text-[9px] text-destructive">Booked</div>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <Button
                size="lg"
                disabled={!selectedDate || !selectedSlot}
                onClick={handleProceedToDetails}
                className="gap-2"
              >
                Continue to Patient Details <ArrowRight className="size-4" />
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
              className="gap-1 text-xs"
            >
              <ArrowLeft className="size-3.5" /> Back to Slots
            </Button>

            {!user && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-900 dark:text-amber-200">
                <p className="font-semibold">Sign in required to confirm booking</p>
                <p className="mt-1 text-xs">
                  We save your medical consultations and prescriptions directly in your private account.
                </p>
                <Button asChild size="sm" className="mt-3">
                  <Link to="/auth">Sign In / Register</Link>
                </Button>
              </div>
            )}

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Patient Information & Consultation Reason</CardTitle>
                <CardDescription>
                  Help the physician prepare for your pulse diagnosis and dosha evaluation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="patient-name">Patient Full Name *</Label>
                    <Input
                      id="patient-name"
                      placeholder="e.g. Rahul Verma"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="patient-phone">Phone Number (For SMS reminders)</Label>
                    <Input
                      id="patient-phone"
                      placeholder="+91 98765 43210"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="patient-email">Email Address (For prescription & receipt)</Label>
                  <Input
                    id="patient-email"
                    type="email"
                    placeholder="rahul@example.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    disabled={!!user}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="reason">Primary Symptoms or Reason for Consultation *</Label>
                  <Textarea
                    id="reason"
                    rows={3}
                    placeholder="e.g., Chronic lower back pain (Sandhivata), indigestion, stress and poor sleep, interest in Panchakarma detox..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end pt-2">
              <Button size="lg" onClick={handleProceedToPayment} className="gap-2">
                Proceed to Payment <ArrowRight className="size-4" />
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
              className="gap-1 text-xs"
            >
              <ArrowLeft className="size-3.5" /> Back to Details
            </Button>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Order Summary */}
              <div className="space-y-4 md:col-span-1">
                <Card className="border-border bg-secondary/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <div>
                      <span className="text-muted-foreground">Doctor:</span>
                      <p className="font-semibold text-foreground">{selectedDoctor.full_name}</p>
                      <p className="text-primary">{selectedDoctor.speciality}</p>
                    </div>

                    <div className="border-t border-border pt-2">
                      <span className="text-muted-foreground">Date & Time:</span>
                      <p className="font-medium text-foreground">
                        {selectedDate} at {selectedSlot}
                      </p>
                    </div>

                    <div className="border-t border-border pt-2">
                      <span className="text-muted-foreground">Patient:</span>
                      <p className="font-medium text-foreground">{patientName}</p>
                    </div>

                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between">
                        <span>Consultation Fee</span>
                        <span>₹{Number(selectedDoctor.consultation_fee).toFixed(2)}</span>
                      </div>
                      <div className="mt-1 flex justify-between text-muted-foreground">
                        <span>Hospital Reg. / Tax</span>
                        <span>₹0.00</span>
                      </div>
                      <div className="mt-2 flex justify-between border-t border-border pt-2 text-sm font-bold text-foreground">
                        <span>Total Payable</span>
                        <span>₹{Number(selectedDoctor.consultation_fee).toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 p-3 text-xs text-primary">
                  <ShieldCheck className="size-4 shrink-0" />
                  <span>Test Mode active. Instant confirmation with receipt generation.</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="md:col-span-2">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-base">Choose Payment Method</CardTitle>
                    <CardDescription>
                      Secure transaction. Slot is locked immediately upon confirmation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(val) => setPaymentMethod(val as "upi" | "card" | "netbanking")}
                      className="grid gap-3 sm:grid-cols-3"
                    >
                      <div>
                        <RadioGroupItem value="upi" id="pay-upi" className="peer sr-only" />
                        <Label
                          htmlFor="pay-upi"
                          className="flex flex-col items-center justify-between rounded-xl border border-border bg-card p-4 hover:bg-accent/20 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
                        >
                          <QrCode className="mb-2 size-6 text-primary" />
                          <span className="text-xs font-semibold">UPI / QR</span>
                          <span className="text-[10px] text-muted-foreground">GPay, PhonePe, Paytm</span>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem value="card" id="pay-card" className="peer sr-only" />
                        <Label
                          htmlFor="pay-card"
                          className="flex flex-col items-center justify-between rounded-xl border border-border bg-card p-4 hover:bg-accent/20 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
                        >
                          <CreditCard className="mb-2 size-6 text-primary" />
                          <span className="text-xs font-semibold">Debit / Credit</span>
                          <span className="text-[10px] text-muted-foreground">Visa, Master, RuPay</span>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem value="netbanking" id="pay-nb" className="peer sr-only" />
                        <Label
                          htmlFor="pay-nb"
                          className="flex flex-col items-center justify-between rounded-xl border border-border bg-card p-4 hover:bg-accent/20 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
                        >
                          <Building2 className="mb-2 size-6 text-primary" />
                          <span className="text-xs font-semibold">Net Banking</span>
                          <span className="text-[10px] text-muted-foreground">All major banks</span>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "upi" && (
                      <div className="rounded-xl border border-border bg-secondary/20 p-4 text-center">
                        <div className="mx-auto mb-2 grid size-16 place-items-center rounded-lg bg-card shadow-sm">
                          <QrCode className="size-10 text-primary" />
                        </div>
                        <p className="text-xs font-medium">Scan with any UPI App or click Confirm</p>
                        <p className="text-[10px] text-muted-foreground">UPI ID: aarogya.ayurveda@hospital</p>
                      </div>
                    )}

                    {paymentMethod === "card" && (
                      <div className="space-y-3 rounded-xl border border-border bg-secondary/20 p-4">
                        <div className="space-y-1">
                          <Label className="text-xs">Card Number (Simulated)</Label>
                          <Input placeholder="4111 2222 3333 4444" defaultValue="4111 2222 3333 4444" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Expiry</Label>
                            <Input placeholder="MM/YY" defaultValue="12/28" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">CVV</Label>
                            <Input placeholder="123" defaultValue="786" />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "netbanking" && (
                      <div className="rounded-xl border border-border bg-secondary/20 p-4">
                        <p className="text-xs text-muted-foreground">
                          Simulated bank gateway authorization. Your slot is confirmed immediately upon clicking the button below.
                        </p>
                      </div>
                    )}

                    <Button
                      size="lg"
                      className="w-full gap-2 font-semibold"
                      disabled={isSubmitting}
                      onClick={handleConfirmAndPay}
                    >
                      {isSubmitting ? "Processing Confirmation…" : `Pay ₹${Number(selectedDoctor.consultation_fee).toFixed(0)} & Confirm Slot`}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: CONFIRMED */}
        {step === "confirmed" && confirmedBooking && (
          <div className="space-y-6">
            <Card className="border-border shadow-[var(--shadow-lift)]">
              <CardContent className="pt-8 text-center">
                <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-10" />
                </div>
                <Badge variant="secondary" className="mb-2">
                  Booking Confirmed
                </Badge>
                <h2 className="font-display text-3xl">Your Consultation is Scheduled!</h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  A confirmation email and reminder have been queued. Your digital prescription and visit
                  notes will be published to your dashboard after your session.
                </p>

                <div className="mx-auto mt-6 max-w-md rounded-xl border border-border bg-secondary/30 p-4 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Receipt Number:</span>
                    <span className="font-mono font-bold text-primary">{confirmedBooking.receiptNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Consulting Physician:</span>
                    <span className="font-semibold">{confirmedBooking.doctorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date & Time:</span>
                    <span className="font-semibold">
                      {confirmedBooking.date} at {confirmedBooking.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount Paid:</span>
                    <span className="font-semibold">₹{confirmedBooking.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Status:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Completed (Verified)</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button
                    variant="outline"
                    className="gap-2"
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
                    }}
                  >
                    <Download className="size-4" /> Download Receipt (PDF)
                  </Button>

                  <Button asChild className="gap-2">
                    <Link to="/dashboard">
                      Go to Patient Dashboard <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </PageShell>
  );
}
