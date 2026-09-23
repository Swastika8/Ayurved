import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type PanchakarmaStep = { title: string; detail: string };

export type Doctor = Tables<"doctors">;
export type Appointment = Tables<"appointments">;
export type Availability = Tables<"availability">;
export type Consultation = Tables<"consultations">;
export type Payment = Tables<"payments">;
export type Notification = Tables<"notifications">;
export type Profile = Tables<"profiles">;
export type UserRole = Tables<"user_roles">;
export type Treatment = Tables<"treatments">;
export type Disease = Tables<"diseases">;
export type PanchakarmaTherapy = Tables<"panchakarma_therapies">;

export function useDoctors() {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .eq("is_active", true)
        .order("full_name");
      if (error) throw error;
      return data as Doctor[];
    },
  });
}

export function useAllDoctors() {
  return useQuery({
    queryKey: ["all-doctors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .order("full_name");
      if (error) throw error;
      return data as Doctor[];
    },
  });
}

export function useTreatments() {
  return useQuery({
    queryKey: ["treatments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("treatments")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as Treatment[];
    },
  });
}

export function useDiseases() {
  return useQuery({
    queryKey: ["diseases"],
    queryFn: async () => {
      const { data, error } = await supabase.from("diseases").select("*").order("name");
      if (error) throw error;
      return data as Disease[];
    },
  });
}

export function useDisease(slug: string) {
  return useQuery({
    queryKey: ["disease", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("diseases")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data as Disease | null;
    },
  });
}

export function usePanchakarma() {
  return useQuery({
    queryKey: ["panchakarma"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("panchakarma_therapies")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as PanchakarmaTherapy[];
    },
  });
}

export function useDoctorAvailability(doctorId?: string) {
  return useQuery({
    queryKey: ["availability", doctorId],
    queryFn: async () => {
      if (!doctorId) return [];
      const { data, error } = await supabase
        .from("availability")
        .select("*")
        .eq("doctor_id", doctorId)
        .eq("is_active", true)
        .order("weekday");
      if (error) throw error;
      return data as Availability[];
    },
    enabled: !!doctorId,
  });
}

export function useDoctorBookedSlots(doctorId?: string, date?: string) {
  return useQuery({
    queryKey: ["doctor-booked-slots", doctorId, date],
    queryFn: async () => {
      if (!doctorId || !date) return [];
      const { data, error } = await supabase
        .from("appointments")
        .select("start_time, status")
        .eq("doctor_id", doctorId)
        .eq("appointment_date", date)
        .in("status", ["pending_payment", "confirmed", "completed"]);
      if (error) throw error;
      return (data ?? []).map((a) => a.start_time.slice(0, 5));
    },
    enabled: !!doctorId && !!date,
  });
}

export function usePatientAppointments(patientId?: string) {
  return useQuery({
    queryKey: ["patient-appointments", patientId],
    queryFn: async () => {
      if (!patientId) return [];
      const { data, error } = await supabase
        .from("appointments")
        .select("*, doctors(full_name, speciality, photo_url, consultation_fee)")
        .eq("patient_id", patientId)
        .order("appointment_date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!patientId,
  });
}

export function useDoctorAppointments(doctorId?: string) {
  return useQuery({
    queryKey: ["doctor-appointments", doctorId],
    queryFn: async () => {
      if (!doctorId) return [];
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("doctor_id", doctorId)
        .order("appointment_date", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!doctorId,
  });
}

export function usePatientConsultations(patientId?: string) {
  return useQuery({
    queryKey: ["patient-consultations", patientId],
    queryFn: async () => {
      if (!patientId) return [];
      const { data, error } = await supabase
        .from("consultations")
        .select("*, doctors(full_name, speciality, qualifications)")
        .eq("patient_id", patientId)
        .order("visit_date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!patientId,
  });
}

export function usePatientPayments(patientId?: string) {
  return useQuery({
    queryKey: ["patient-payments", patientId],
    queryFn: async () => {
      if (!patientId) return [];
      const { data, error } = await supabase
        .from("payments")
        .select("*, appointments(appointment_date, start_time, doctor_id, doctors(full_name))")
        .eq("patient_id", patientId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!patientId,
  });
}

export function useUserNotifications(userId?: string) {
  return useQuery({
    queryKey: ["user-notifications", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Notification[];
    },
    enabled: !!userId,
  });
}

export function useUserProfile(userId?: string) {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      if (error) throw error;
      return data as Profile | null;
    },
    enabled: !!userId,
  });
}

// Admin Queries
export function useAllAppointments() {
  return useQuery({
    queryKey: ["all-appointments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select("*, doctors(full_name, speciality)")
        .order("appointment_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useAllPayments() {
  return useQuery({
    queryKey: ["all-payments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*, appointments(appointment_date, doctors(full_name))")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useAllProfiles() {
  return useQuery({
    queryKey: ["all-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Profile[];
    },
  });
}

export function useAllUserRoles() {
  return useQuery({
    queryKey: ["all-user-roles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("*");
      if (error) throw error;
      return data as UserRole[];
    },
  });
}
