import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  Users,
  Calendar,
  CreditCard,
  Settings,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Megaphone,
  Building,
  Save,
  BookOpen,
  ArrowRight,
  LogOut,
  Leaf,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSiteContent } from "@/hooks/useSiteContent";
import {
  useAllDoctors,
  useAllAppointments,
  useAllPayments,
  useAllProfiles,
  useAllUserRoles,
  useTreatments,
  useDiseases,
  type Doctor,
} from "@/lib/queries";
import type { AppRole } from "@/hooks/useAuth";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Aarogya Ayurveda Hospital" },
      {
        name: "description",
        content: "Hospital administration: live CMS content, doctor roster, role access, and appointment records.",
      },
    ],
  }),
  component: AdminPanelPage,
});

function AdminPanelPage() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const { hospital, announcement } = useSiteContent();

  const { data: doctors, refetch: refetchDoctors } = useAllDoctors();
  const { data: appointments, refetch: refetchAppointments } = useAllAppointments();
  const { data: payments, refetch: refetchPayments } = useAllPayments();
  const { data: profiles, refetch: refetchProfiles } = useAllProfiles();
  const { data: roles, refetch: refetchRoles } = useAllUserRoles();
  const { data: treatments, refetch: refetchTreatments } = useTreatments();
  const { data: diseases, refetch: refetchDiseases } = useDiseases();

  // CMS State
  const [hospName, setHospName] = useState(hospital.name);
  const [hospTagline, setHospTagline] = useState(hospital.tagline);
  const [hospAddress, setHospAddress] = useState(hospital.address);
  const [hospPhone, setHospPhone] = useState(hospital.phone);
  const [hospEmail, setHospEmail] = useState(hospital.email);
  const [hospHours, setHospHours] = useState(hospital.hours);
  const [hospAbout, setHospAbout] = useState(hospital.about);

  const [annActive, setAnnActive] = useState(announcement?.active ?? true);
  const [annText, setAnnText] = useState(announcement?.text ?? "");
  const [savingCMS, setSavingCMS] = useState(false);

  // Doctor Modal state
  const [doctorModalOpen, setDoctorModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [docName, setDocName] = useState("");
  const [docSpec, setDocSpec] = useState("");
  const [docQual, setDocQual] = useState("");
  const [docBio, setDocBio] = useState("");
  const [docExp, setDocExp] = useState(5);
  const [docFee, setDocFee] = useState(750);
  const [docActive, setDocActive] = useState(true);
  const [savingDoctor, setSavingDoctor] = useState(false);

  // Quick role assignment state
  const [assigningUserId, setAssigningUserId] = useState<string | null>(null);

  const totalRevenue = (payments ?? [])
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const handleSaveCMS = async () => {
    setSavingCMS(true);
    try {
      // 1. Update hospital details
      const { error: err1 } = await supabase.from("site_content").upsert({
        key: "hospital",
        value: {
          name: hospName,
          tagline: hospTagline,
          address: hospAddress,
          phone: hospPhone,
          email: hospEmail,
          hours: hospHours,
          about: hospAbout,
        },
      });
      if (err1) throw err1;

      // 2. Update announcement
      const { error: err2 } = await supabase.from("site_content").upsert({
        key: "announcement",
        value: {
          active: annActive,
          text: annText,
        },
      });
      if (err2) throw err2;

      toast.success("Hospital site content & announcement updated successfully!");
      // Reload page to re-fetch site content context
      window.location.reload();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save CMS settings";
      toast.error(message);
    } finally {
      setSavingCMS(false);
    }
  };

  const handleOpenDoctorModal = (doc?: Doctor) => {
    if (doc) {
      setEditingDoctor(doc);
      setDocName(doc.full_name);
      setDocSpec(doc.speciality);
      setDocQual(doc.qualifications || "");
      setDocBio(doc.bio || "");
      setDocExp(doc.years_experience);
      setDocFee(Number(doc.consultation_fee));
      setDocActive(doc.is_active);
    } else {
      setEditingDoctor(null);
      setDocName("");
      setDocSpec("Ayurvedic Physician");
      setDocQual("BAMS, MD (Ayurveda)");
      setDocBio("");
      setDocExp(5);
      setDocFee(750);
      setDocActive(true);
    }
    setDoctorModalOpen(true);
  };

  const handleSaveDoctor = async () => {
    if (!docName.trim()) {
      toast.error("Please enter doctor name.");
      return;
    }

    setSavingDoctor(true);
    try {
      if (editingDoctor) {
        const { error } = await supabase
          .from("doctors")
          .update({
            full_name: docName,
            speciality: docSpec,
            qualifications: docQual,
            bio: docBio,
            years_experience: docExp,
            consultation_fee: docFee,
            is_active: docActive,
          })
          .eq("id", editingDoctor.id);
        if (error) throw error;
        toast.success("Doctor details updated!");
      } else {
        const { error } = await supabase.from("doctors").insert({
          full_name: docName,
          speciality: docSpec,
          qualifications: docQual,
          bio: docBio,
          years_experience: docExp,
          consultation_fee: docFee,
          is_active: docActive,
        });
        if (error) throw error;
        toast.success("New physician added to roster!");
      }

      setDoctorModalOpen(false);
      refetchDoctors();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error saving doctor";
      toast.error(message);
    } finally {
      setSavingDoctor(false);
    }
  };

  const handleAssignRole = async (targetUserId: string, newRole: AppRole) => {
    try {
      const { error } = await supabase.from("user_roles").upsert({
        user_id: targetUserId,
        role: newRole,
      });
      if (error) throw error;
      toast.success(`Assigned role ${newRole} to user.`);
      refetchRoles();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update role";
      toast.error(message);
    }
  };

  const handleUpdateApptStatus = async (apptId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status })
        .eq("id", apptId);
      if (error) throw error;
      toast.success(`Appointment status changed to ${status}.`);
      refetchAppointments();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error updating appointment";
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
                <ShieldCheck className="size-6" />
              </div>
              <CardTitle className="font-display text-2xl">Admin Portal Login</CardTitle>
              <CardDescription>
                Sign in with an authorized hospital administrator account to access management tools.
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
        {/* Admin Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <Badge variant="secondary" className="gap-1 text-xs">
              <ShieldCheck className="size-3 text-primary" /> Hospital Administration
            </Badge>
            <h1 className="mt-1 font-display text-3xl sm:text-4xl">Aarogya Hospital Management</h1>
            <p className="text-sm text-muted-foreground">
              Dynamic CMS, doctor rosters, appointments, billing transactions, and user access control.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="outline">
              <Link to="/doctor">Doctor View</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/dashboard">Patient View</Link>
            </Button>
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

        {/* High-Level Metric Tiles */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Calendar,
              label: "Total Consultations",
              val: appointments?.length || 0,
              sub: "Across all physicians",
            },
            {
              icon: CreditCard,
              label: "Revenue Collected",
              val: `₹${totalRevenue.toFixed(0)}`,
              sub: `${payments?.length || 0} transactions`,
            },
            {
              icon: Users,
              label: "Registered Patients",
              val: profiles?.length || 0,
              sub: "With paperless accounts",
            },
            {
              icon: Building,
              label: "Active Doctors",
              val: (doctors ?? []).filter((d) => d.is_active).length,
              sub: "Scheduled for OPD",
            },
          ].map((item) => (
            <Card key={item.label} className="border-border">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="grid size-7 place-items-center rounded-full bg-secondary text-primary">
                    <item.icon className="size-3.5" />
                  </span>
                </div>
                <p className="mt-2 font-display text-2xl font-bold">{item.val}</p>
                <p className="text-[11px] text-muted-foreground">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="cms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
            <TabsTrigger value="cms" className="gap-1 text-xs">
              <Building className="size-3.5" /> Hospital CMS
            </TabsTrigger>
            <TabsTrigger value="doctors" className="gap-1 text-xs">
              <Users className="size-3.5" /> Doctors Roster
            </TabsTrigger>
            <TabsTrigger value="appointments" className="gap-1 text-xs">
              <Calendar className="size-3.5" /> Appointments
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-1 text-xs">
              <ShieldCheck className="size-3.5" /> Roles & Users
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-1 text-xs">
              <BookOpen className="size-3.5" /> Diseases & Care
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: HOSPITAL CMS */}
          <TabsContent value="cms" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Hospital Information & Public Details</CardTitle>
                <CardDescription>
                  Update real hospital details here. When saved, all headings, contact details, and timings update immediately.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="cms-name" className="text-xs font-semibold">Hospital Name</Label>
                    <Input
                      id="cms-name"
                      value={hospName}
                      onChange={(e) => setHospName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cms-tag" className="text-xs font-semibold">Tagline / Motto</Label>
                    <Input
                      id="cms-tag"
                      value={hospTagline}
                      onChange={(e) => setHospTagline(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="cms-phone" className="text-xs font-semibold">Hospital Phone</Label>
                    <Input
                      id="cms-phone"
                      value={hospPhone}
                      onChange={(e) => setHospPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cms-email" className="text-xs font-semibold">Official Email</Label>
                    <Input
                      id="cms-email"
                      value={hospEmail}
                      onChange={(e) => setHospEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cms-hours" className="text-xs font-semibold">OPD Visiting Hours</Label>
                    <Input
                      id="cms-hours"
                      value={hospHours}
                      onChange={(e) => setHospHours(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cms-address" className="text-xs font-semibold">Hospital Address</Label>
                  <Input
                    id="cms-address"
                    value={hospAddress}
                    onChange={(e) => setHospAddress(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cms-about" className="text-xs font-semibold">About the Hospital Story</Label>
                  <Textarea
                    id="cms-about"
                    rows={4}
                    value={hospAbout}
                    onChange={(e) => setHospAbout(e.target.value)}
                  />
                </div>

                {/* Announcement Banner */}
                <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Megaphone className="size-4 text-primary" />
                      <span className="text-xs font-semibold">Top Announcement Banner</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="ann-switch" className="text-xs text-muted-foreground">
                        {annActive ? "Visible" : "Hidden"}
                      </Label>
                      <Switch id="ann-switch" checked={annActive} onCheckedChange={setAnnActive} />
                    </div>
                  </div>
                  <Input
                    placeholder="e.g. Free Dosha Assessment camp every first Sunday of the month."
                    value={annText}
                    onChange={(e) => setAnnText(e.target.value)}
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button disabled={savingCMS} onClick={handleSaveCMS} className="gap-2">
                    <Save className="size-4" />
                    {savingCMS ? "Saving changes…" : "Save Live Site Content"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: DOCTORS ROSTER */}
          <TabsContent value="doctors" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl">Physician Roster</h2>
                <p className="text-xs text-muted-foreground">Manage active Ayurvedic specialists, fees, and biographies.</p>
              </div>
              <Button size="sm" onClick={() => handleOpenDoctorModal()} className="gap-1.5 text-xs">
                <Plus className="size-3.5" /> Add Doctor
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(doctors ?? []).map((doc) => (
                <Card key={doc.id} className="border-border">
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-base">{doc.full_name}</h3>
                        <p className="text-xs font-medium text-primary">{doc.speciality}</p>
                        <p className="text-[11px] text-muted-foreground">{doc.qualifications}</p>
                      </div>
                      <Badge variant={doc.is_active ? "default" : "outline"} className="text-[10px]">
                        {doc.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{doc.bio}</p>

                    <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
                      <span>Fee: ₹{Number(doc.consultation_fee).toFixed(0)}</span>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="gap-1 text-xs"
                        onClick={() => handleOpenDoctorModal(doc)}
                      >
                        <Edit2 className="size-3" /> Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB 3: APPOINTMENTS & PAYMENTS */}
          <TabsContent value="appointments" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Master Appointment Log</h2>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-border bg-secondary/50 font-semibold text-muted-foreground">
                  <tr>
                    <th className="p-3">Date & Time</th>
                    <th className="p-3">Doctor</th>
                    <th className="p-3">Reason</th>
                    <th className="p-3">Fee</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(appointments ?? []).map((a) => (
                    <tr key={a.id} className="hover:bg-secondary/20">
                      <td className="p-3 font-medium whitespace-nowrap">
                        {a.appointment_date} {a.start_time.slice(0, 5)}
                      </td>
                      <td className="p-3">{a.doctors?.full_name}</td>
                      <td className="p-3 max-w-[200px] truncate">{a.reason || "General"}</td>
                      <td className="p-3 font-mono">₹{Number(a.amount).toFixed(0)}</td>
                      <td className="p-3">
                        <Badge
                          variant={
                            a.status === "confirmed"
                              ? "default"
                              : a.status === "completed"
                              ? "secondary"
                              : a.status === "cancelled"
                              ? "destructive"
                              : "outline"
                          }
                          className="text-[10px] capitalize"
                        >
                          {a.status.replace("_", " ")}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <select
                          className="rounded border border-input bg-card px-2 py-1 text-[11px]"
                          value={a.status}
                          onChange={(e) => handleUpdateApptStatus(a.id, e.target.value)}
                        >
                          <option value="pending_payment">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* TAB 4: USERS & ROLES */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl">Hospital User Permissions</h2>
                <p className="text-xs text-muted-foreground">Assign patient, doctor, or admin capabilities.</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-border bg-secondary/50 font-semibold text-muted-foreground">
                  <tr>
                    <th className="p-3">User Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Current Roles</th>
                    <th className="p-3">Change Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(profiles ?? []).map((p) => {
                    const userRolesList = (roles ?? [])
                      .filter((r) => r.user_id === p.id)
                      .map((r) => r.role);

                    return (
                      <tr key={p.id} className="hover:bg-secondary/20">
                        <td className="p-3 font-medium">{p.full_name || "Anonymous User"}</td>
                        <td className="p-3">{p.email}</td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {userRolesList.length === 0 ? (
                              <Badge variant="outline" className="text-[10px]">patient (default)</Badge>
                            ) : (
                              userRolesList.map((r) => (
                                <Badge
                                  key={r}
                                  variant={r === "admin" ? "default" : r === "doctor" ? "secondary" : "outline"}
                                  className="text-[10px]"
                                >
                                  {r}
                                </Badge>
                              ))
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-[10px] h-7"
                              onClick={() => handleAssignRole(p.id, "doctor")}
                            >
                              + Doctor
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-[10px] h-7"
                              onClick={() => handleAssignRole(p.id, "admin")}
                            >
                              + Admin
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* TAB 5: DISEASES & TREATMENTS */}
          <TabsContent value="content" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl">Hospital Care Content</h2>
                <p className="text-xs text-muted-foreground">Database entries for treatments and clinical conditions.</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Treatments ({treatments?.length || 0})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  {(treatments ?? []).map((t) => (
                    <div key={t.id} className="flex justify-between border-b border-border/50 pb-2">
                      <span className="font-medium">{t.name} ({t.duration})</span>
                      <span className="font-mono">₹{t.price || 0}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Diseases Library ({diseases?.length || 0})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  {(diseases ?? []).map((d) => (
                    <div key={d.id} className="flex justify-between border-b border-border/50 pb-2">
                      <span className="font-medium">{d.name} ({d.sanskrit_name})</span>
                      <span className="text-muted-foreground">{d.category}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* ADD / EDIT DOCTOR DIALOG */}
        <Dialog open={doctorModalOpen} onOpenChange={setDoctorModalOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">
                {editingDoctor ? "Edit Physician Record" : "Add New Ayurvedic Physician"}
              </DialogTitle>
              <DialogDescription>
                Physician details appear immediately in the public directory and consultation booking flow.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="doc-modal-name" className="text-xs font-semibold">Doctor Full Name *</Label>
                <Input
                  id="doc-modal-name"
                  placeholder="e.g. Dr. Rajeshwari Varma"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="doc-modal-spec" className="text-xs font-semibold">Speciality *</Label>
                  <Input
                    id="doc-modal-spec"
                    placeholder="e.g. Panchakarma & Rasayana"
                    value={docSpec}
                    onChange={(e) => setDocSpec(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="doc-modal-qual" className="text-xs font-semibold">Qualifications</Label>
                  <Input
                    id="doc-modal-qual"
                    placeholder="e.g. BAMS, MD (Ayurveda)"
                    value={docQual}
                    onChange={(e) => setDocQual(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="doc-modal-exp" className="text-xs font-semibold">Years Experience</Label>
                  <Input
                    id="doc-modal-exp"
                    type="number"
                    value={docExp}
                    onChange={(e) => setDocExp(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="doc-modal-fee" className="text-xs font-semibold">Consultation Fee (₹)</Label>
                  <Input
                    id="doc-modal-fee"
                    type="number"
                    value={docFee}
                    onChange={(e) => setDocFee(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="doc-modal-bio" className="text-xs font-semibold">Biography</Label>
                <Textarea
                  id="doc-modal-bio"
                  rows={3}
                  placeholder="Brief clinical background and focus areas..."
                  value={docBio}
                  onChange={(e) => setDocBio(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <span className="font-semibold">Active for Online Booking</span>
                  <p className="text-[10px] text-muted-foreground">Patients can select this physician</p>
                </div>
                <Switch checked={docActive} onCheckedChange={setDocActive} />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDoctorModalOpen(false)}>
                Cancel
              </Button>
              <Button disabled={savingDoctor} onClick={handleSaveDoctor}>
                {savingDoctor ? "Saving…" : "Save Physician"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageShell>
  );
}
