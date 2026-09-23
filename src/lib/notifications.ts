import { supabase } from "@/integrations/supabase/client";

export async function createInAppNotification({
  userId,
  appointmentId,
  title,
  body,
}: {
  userId: string;
  appointmentId?: string;
  title: string;
  body: string;
}) {
  try {
    const { error } = await supabase.from("notifications").insert({
      user_id: userId,
      appointment_id: appointmentId || null,
      title,
      body,
      channel: "in_app",
      send_after: new Date().toISOString(),
      sent_at: new Date().toISOString(),
    });
    if (error) console.error("Failed to create notification:", error);
  } catch (err) {
    console.error("Error creating notification:", err);
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const { error } = await supabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("id", notificationId);
    if (error) throw error;
  } catch (err) {
    console.error("Error marking notification as read:", err);
  }
}
