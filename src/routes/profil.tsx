import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: "Profil — MediAI" },
      { name: "description", content: "MediAI profil ma'lumotlarini boshqarish." },
      { property: "og:title", content: "Profil — MediAI" },
      { property: "og:description", content: "Ism, yosh va jins ma'lumotlarini saqlash." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [busy, setBusy] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user!.id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? "");
      setAge(profile.age ? String(profile.age) : "");
      setGender(profile.gender ?? "");
    } else if (user) {
      const metaName = (user.user_metadata as { full_name?: string } | null)?.full_name;
      if (metaName) setFullName(metaName);
    }
  }, [profile, user]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName || null,
      age: age ? Number(age) : null,
      gender: gender || null,
    });
    setBusy(false);
    if (error) {
      toast.error("Saqlashda xatolik");
      return;
    }
    toast.success("Profil saqlandi");
    queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  if (loading || (user && isLoading)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Profil uchun kirish kerak</h1>
        <Button asChild className="mt-6">
          <Link to="/kirish">Kirish</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Profil</h1>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        </div>
        <Button variant="outline" onClick={signOut}>
          <LogOut className="mr-2 size-4" /> Chiqish
        </Button>
      </div>

      <form className="card-panel mt-8 space-y-4 p-6" onSubmit={save}>
        <div className="space-y-2">
          <Label htmlFor="full_name">To'liq ism</Label>
          <Input id="full_name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="age">Yosh</Label>
            <Input id="age" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Jinsi</Label>
            <Input id="gender" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Erkak / Ayol" />
          </div>
        </div>
        <Button type="submit" disabled={busy}>
          {busy && <Loader2 className="mr-2 size-4 animate-spin" />} Saqlash
        </Button>
      </form>

      <div className="card-panel mt-6 flex flex-wrap items-center justify-between gap-3 p-6">
        <p className="text-sm text-muted-foreground">Saqlangan tahlillaringizni ko'rish</p>
        <Button asChild variant="outline">
          <Link to="/tarix">Tahlil tarixi</Link>
        </Button>
      </div>
    </div>
  );
}
