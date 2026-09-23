export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          amount: number
          appointment_date: string
          created_at: string
          doctor_id: string
          end_time: string | null
          id: string
          patient_id: string
          reason: string | null
          start_time: string
          status: string
          updated_at: string
        }
        Insert: {
          amount?: number
          appointment_date: string
          created_at?: string
          doctor_id: string
          end_time?: string | null
          id?: string
          patient_id: string
          reason?: string | null
          start_time: string
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          appointment_date?: string
          created_at?: string
          doctor_id?: string
          end_time?: string | null
          id?: string
          patient_id?: string
          reason?: string | null
          start_time?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      availability: {
        Row: {
          created_at: string
          doctor_id: string
          end_time: string
          id: string
          is_active: boolean
          slot_minutes: number
          start_time: string
          weekday: number
        }
        Insert: {
          created_at?: string
          doctor_id: string
          end_time: string
          id?: string
          is_active?: boolean
          slot_minutes?: number
          start_time: string
          weekday: number
        }
        Update: {
          created_at?: string
          doctor_id?: string
          end_time?: string
          id?: string
          is_active?: boolean
          slot_minutes?: number
          start_time?: string
          weekday?: number
        }
        Relationships: [
          {
            foreignKeyName: "availability_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      consultations: {
        Row: {
          appointment_id: string | null
          created_at: string
          diagnosis: string | null
          doctor_id: string
          dosha_assessment: string | null
          follow_up_date: string | null
          id: string
          notes: string | null
          patient_id: string
          prescription: string | null
          therapy_plan: string | null
          visit_date: string
        }
        Insert: {
          appointment_id?: string | null
          created_at?: string
          diagnosis?: string | null
          doctor_id: string
          dosha_assessment?: string | null
          follow_up_date?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          prescription?: string | null
          therapy_plan?: string | null
          visit_date?: string
        }
        Update: {
          appointment_id?: string | null
          created_at?: string
          diagnosis?: string | null
          doctor_id?: string
          dosha_assessment?: string | null
          follow_up_date?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          prescription?: string | null
          therapy_plan?: string | null
          visit_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultations_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultations_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      diseases: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          diet_guidance: string | null
          dosha_imbalance: string | null
          herbs: string[]
          id: string
          is_published: boolean
          lifestyle_guidance: string | null
          name: string
          recommended_therapies: string[]
          sanskrit_name: string | null
          slug: string
          symptoms: string[]
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          diet_guidance?: string | null
          dosha_imbalance?: string | null
          herbs?: string[]
          id?: string
          is_published?: boolean
          lifestyle_guidance?: string | null
          name: string
          recommended_therapies?: string[]
          sanskrit_name?: string | null
          slug: string
          symptoms?: string[]
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          diet_guidance?: string | null
          dosha_imbalance?: string | null
          herbs?: string[]
          id?: string
          is_published?: boolean
          lifestyle_guidance?: string | null
          name?: string
          recommended_therapies?: string[]
          sanskrit_name?: string | null
          slug?: string
          symptoms?: string[]
        }
        Relationships: []
      }
      doctors: {
        Row: {
          bio: string | null
          consultation_fee: number
          created_at: string
          full_name: string
          id: string
          is_active: boolean
          photo_url: string | null
          qualifications: string | null
          speciality: string
          user_id: string | null
          years_experience: number
        }
        Insert: {
          bio?: string | null
          consultation_fee?: number
          created_at?: string
          full_name: string
          id?: string
          is_active?: boolean
          photo_url?: string | null
          qualifications?: string | null
          speciality?: string
          user_id?: string | null
          years_experience?: number
        }
        Update: {
          bio?: string | null
          consultation_fee?: number
          created_at?: string
          full_name?: string
          id?: string
          is_active?: boolean
          photo_url?: string | null
          qualifications?: string | null
          speciality?: string
          user_id?: string | null
          years_experience?: number
        }
        Relationships: []
      }
      notifications: {
        Row: {
          appointment_id: string | null
          body: string | null
          channel: string
          created_at: string
          id: string
          read_at: string | null
          send_after: string
          sent_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          appointment_id?: string | null
          body?: string | null
          channel?: string
          created_at?: string
          id?: string
          read_at?: string | null
          send_after?: string
          sent_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          appointment_id?: string | null
          body?: string | null
          channel?: string
          created_at?: string
          id?: string
          read_at?: string | null
          send_after?: string
          sent_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      panchakarma_therapies: {
        Row: {
          benefits: string[]
          created_at: string
          description: string | null
          duration: string | null
          id: string
          is_published: boolean
          name: string
          preparation_notes: string | null
          sanskrit_name: string | null
          slug: string
          sort_order: number
          steps: Json
          tagline: string | null
        }
        Insert: {
          benefits?: string[]
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          is_published?: boolean
          name: string
          preparation_notes?: string | null
          sanskrit_name?: string | null
          slug: string
          sort_order?: number
          steps?: Json
          tagline?: string | null
        }
        Update: {
          benefits?: string[]
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          is_published?: boolean
          name?: string
          preparation_notes?: string | null
          sanskrit_name?: string | null
          slug?: string
          sort_order?: number
          steps?: Json
          tagline?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          appointment_id: string | null
          created_at: string
          currency: string
          id: string
          paid_at: string | null
          patient_id: string
          provider: string | null
          provider_reference: string | null
          receipt_number: string | null
          status: string
        }
        Insert: {
          amount?: number
          appointment_id?: string | null
          created_at?: string
          currency?: string
          id?: string
          paid_at?: string | null
          patient_id: string
          provider?: string | null
          provider_reference?: string | null
          receipt_number?: string | null
          status?: string
        }
        Update: {
          amount?: number
          appointment_id?: string | null
          created_at?: string
          currency?: string
          id?: string
          paid_at?: string | null
          patient_id?: string
          provider?: string | null
          provider_reference?: string | null
          receipt_number?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          full_name: string
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          full_name?: string
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      treatments: {
        Row: {
          benefits: string[]
          created_at: string
          description: string | null
          duration: string | null
          id: string
          is_published: boolean
          name: string
          price: number | null
          slug: string
          sort_order: number
          summary: string | null
        }
        Insert: {
          benefits?: string[]
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          is_published?: boolean
          name: string
          price?: number | null
          slug: string
          sort_order?: number
          summary?: string | null
        }
        Update: {
          benefits?: string[]
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          is_published?: boolean
          name?: string
          price?: number | null
          slug?: string
          sort_order?: number
          summary?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "doctor" | "patient"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "doctor", "patient"],
    },
  },
} as const
