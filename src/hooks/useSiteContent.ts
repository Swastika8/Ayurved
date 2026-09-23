import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type HospitalInfo = {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  about: string;
};

export type Announcement = { active: boolean; text: string };

const fallbackHospital: HospitalInfo = {
  name: "Aarogya Ayurveda Hospital",
  tagline: "Classical Ayurveda, gently modern care",
  address: "[PLACEHOLDER] Address not set yet",
  phone: "[PLACEHOLDER] Phone not set yet",
  email: "[PLACEHOLDER] Email not set yet",
  hours: "[PLACEHOLDER] Hours not set yet",
  about: "[PLACEHOLDER] About text not set yet",
};

export function useSiteContent() {
  const query = useQuery({
    queryKey: ["site_content"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content").select("key, value");
      if (error) throw error;
      const map: Record<string, unknown> = {};
      for (const row of data ?? []) map[row.key] = row.value;
      return map;
    },
    staleTime: 60_000,
  });

  const hospital = {
    ...fallbackHospital,
    ...((query.data?.["hospital"] as Partial<HospitalInfo>) ?? {}),
  } as HospitalInfo;
  const announcement = (query.data?.["announcement"] as Announcement | undefined) ?? null;

  return { hospital, announcement, isLoading: query.isLoading };
}
