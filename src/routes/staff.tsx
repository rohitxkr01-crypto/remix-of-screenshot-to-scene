import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Loader2, LogOut, RefreshCw } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Field, fieldInput } from "@/components/site/FormField";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { seo } from "@/lib/seo";

type Status = Database["public"]["Enums"]["request_status"];
type Appointment = Database["public"]["Tables"]["appointment_requests"]["Row"];
type ContactMessage = Database["public"]["Tables"]["contact_messages"]["Row"];
const STATUSES: Status[] = ["new", "contacted", "confirmed", "closed"];

export const Route = createFileRoute("/staff")({
  head: () => {
    const base = seo({
      title: "Staff Portal",
      description: "Sign-in for Janakpur Neuro Hospital staff to review appointment requests and messages.",
      path: "/staff",
    });
    return { ...base, meta: [...base.meta, { name: "robots", content: "noindex, nofollow" }] };
  },
  component: StaffPage,
});

function StaffPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setReady(true);
    });
    void supabase.auth.getSession().then(({ data: d }) => {
      setSession(d.session);
      setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <>
      <PageHero title="Staff Portal" description="For authorised hospital staff only." crumbs={[{ label: "Staff" }]} />
      <section className="container-site py-12 sm:py-16">
        {!ready ? (
          <Loader2 className="h-6 w-6 animate-spin text-primary" aria-label="Loading" />
        ) : session ? (
          <StaffArea session={session} />
        ) : (
          <SignIn />
        )}
      </section>
    </>
  );
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(undefined);
    const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (err) setError("Sign-in failed. Check your email and password.");
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-5 rounded-3xl border bg-card p-8 shadow-card">
      <h2 className="text-2xl font-bold text-navy">Staff sign-in</h2>
      <Field id="staff-email" label="Email" required>
        <input id="staff-email" type="email" autoComplete="email" required className={fieldInput} value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>
      <Field id="staff-password" label="Password" required error={error}>
        <input
          id="staff-password"
          type="password"
          autoComplete="current-password"
          required
          className={fieldInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={error ? true : undefined}
        />
      </Field>
      <Button type="submit" className="w-full" disabled={busy}>
        {busy && <Loader2 className="animate-spin" aria-hidden="true" />} Sign in
      </Button>
      <p className="text-sm text-muted-foreground">Staff accounts are created by the hospital administrator.</p>
    </form>
  );
}

function StaffArea({ session }: { session: Session }) {
  const [isStaff, setIsStaff] = useState<boolean | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const [a, m] = await Promise.all([
      supabase.from("appointment_requests").select("*").order("created_at", { ascending: false }).limit(200),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(200),
    ]);
    setLoading(false);
    if (a.error || m.error) {
      toast.error("Couldn't load requests. Please try again.");
      return;
    }
    setAppointments(a.data);
    setMessages(m.data);
  }, []);

  useEffect(() => {
    void supabase.rpc("is_hospital_staff", { _user_id: session.user.id }).then(({ data, error }) => {
      const ok = !error && data === true;
      setIsStaff(ok);
      if (ok) void load();
    });
  }, [session.user.id, load]);

  const setStatus = async (table: "appointment_requests" | "contact_messages", id: string, status: Status) => {
    const { error } = await supabase.from(table).update({ status }).eq("id", id);
    if (error) {
      toast.error("Couldn't update the status.");
      return;
    }
    toast.success("Status updated");
    if (table === "appointment_requests") setAppointments((p) => p.map((r) => (r.id === id ? { ...r, status } : r)));
    else setMessages((p) => p.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const signOut = () => void supabase.auth.signOut();

  if (isStaff === null) return <Loader2 className="h-6 w-6 animate-spin text-primary" aria-label="Checking access" />;
  if (!isStaff) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border bg-card p-8 text-center shadow-card">
        <h2 className="text-xl font-bold text-navy">No staff access</h2>
        <p className="mt-2 text-muted-foreground">Your account ({session.user.email}) isn't approved for the staff portal. Please contact the administrator.</p>
        <Button variant="outline" className="mt-6" onClick={signOut}><LogOut aria-hidden="true" /> Sign out</Button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted-foreground">Signed in as <span className="font-semibold text-navy">{session.user.email}</span></p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => void load()} disabled={loading}>
            <RefreshCw className={loading ? "animate-spin" : undefined} aria-hidden="true" /> Refresh
          </Button>
          <Button variant="ghost" onClick={signOut}><LogOut aria-hidden="true" /> Sign out</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-navy">Appointment requests ({appointments.length})</h2>
        <ul className="mt-5 space-y-3">
          {appointments.length === 0 && <li className="text-muted-foreground">No requests yet.</li>}
          {appointments.map((r) => (
            <li key={r.id} className="grid gap-3 rounded-2xl border bg-card p-5 shadow-card md:grid-cols-[1fr_auto]">
              <div className="min-w-0">
                <p className="font-semibold text-navy">{r.patient_name} · <a href={`tel:${r.phone}`} className="text-primary">{r.phone}</a></p>
                <p className="text-sm text-muted-foreground">
                  {r.department} · preferred {r.preferred_date}{r.preferred_time ? ` (${r.preferred_time})` : ""}{r.email ? ` · ${r.email}` : ""}
                </p>
                {r.message && <p className="mt-2 whitespace-pre-wrap text-sm">{r.message}</p>}
                <p className="mt-1 text-xs text-muted-foreground">Received {new Date(r.created_at).toLocaleString()}</p>
              </div>
              <StatusSelect value={r.status} onChange={(s) => void setStatus("appointment_requests", r.id, s)} label={`Status for ${r.patient_name}`} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-navy">Messages ({messages.length})</h2>
        <ul className="mt-5 space-y-3">
          {messages.length === 0 && <li className="text-muted-foreground">No messages yet.</li>}
          {messages.map((m) => (
            <li key={m.id} className="grid gap-3 rounded-2xl border bg-card p-5 shadow-card md:grid-cols-[1fr_auto]">
              <div className="min-w-0">
                <p className="font-semibold text-navy">{m.name} · <span className="text-primary">{m.contact}</span></p>
                <p className="mt-2 whitespace-pre-wrap text-sm">{m.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">Received {new Date(m.created_at).toLocaleString()}</p>
              </div>
              <StatusSelect value={m.status} onChange={(s) => void setStatus("contact_messages", m.id, s)} label={`Status for message from ${m.name}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatusSelect({ value, onChange, label }: { value: Status; onChange: (s: Status) => void; label: string }) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value as Status)}
      className="h-10 self-start rounded-xl border border-input bg-background px-3 text-sm font-semibold capitalize text-navy"
    >
      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}
