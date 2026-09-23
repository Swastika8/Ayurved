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
  name: "Aarogya Classical Ayurveda Hospital",
  tagline: "Timeless Vedic Wisdom, Gentle Modern Healing",
  address: "Sanctuary Hill, Kalady Road, Near Periyar River, Kerala 683574 | Rishikesh Campus: Tapovan, Uttarakhand",
  phone: "+91 (0484) 246-8800 / Emergency: +91 94471 20202",
  email: "care@aarogya-ayurveda.org",
  hours: "Consultations: Mon - Sat 8:00 AM - 7:00 PM | Emergency Panchakarma Care: 24/7",
  about:
    "Rooted in the Ashtanga Hridaya lineage, Aarogya Ayurveda Hospital is a certified NABH green healthcare sanctuary combining authentic pulse diagnosis (Nadi Pariksha), pure herbal decoctions, and personalized Panchakarma cleansing.",
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
