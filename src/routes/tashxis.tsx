import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { AlertTriangle, FlaskConical, Loader2, Sparkles, Stethoscope, BookOpen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { diagnose, type DiagnosisResult } from "@/lib/diagnose.functions";

export const Route = createFileRoute("/tashxis")({
  head: () => ({
    meta: [
      { title: "AI tashxis — MediAI" },
      {
        name: "description",
        content: "Shikoyatlaringizni kiriting va klassik tibbiy manbalar asosida AI tahlilini oling.",
      },
      { property: "og:title", content: "AI tashxis — MediAI" },
      {
        property: "og:description",
        content: "Ehtimoliy holatlar, xavfli belgilar, tekshiruvlar va mutaxassis tavsiyasi.",
      },
    ],
  }),
  component: DiagnosePage,
});

const urgencyLabels: Record<DiagnosisResult["urgency"], { label: string; className: string }> = {
  past: { label: "Past shoshilinchlik", className: "bg-success/15 text-success-foreground border-success/40" },
  ortacha: { label: "O'rtacha shoshilinchlik", className: "bg-secondary text-secondary-foreground" },
  yuqori: { label: "Yuqori shoshilinchlik", className: "bg-warning/20 text-warning-foreground border-warning/50" },
  shoshilinch: {
    label: "Shoshilinch yordam kerak",
    className: "bg-destructive/15 text-destructive border-destructive/40",
  },
};

function DiagnosePage() {
  const { user } = useAuth();
  const diagnoseFn = useServerFn(diagnose);

  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [duration, setDuration] = useState("");
  const [history, setHistory] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const result = await diagnoseFn({
        data: {
          symptoms: symptoms.trim(),
          age: age.trim() || null,
          gender: gender.trim() || null,
          duration: duration.trim() || null,
          history: history.trim() || null,
        },
      });

      if (user) {
        const { error } = await supabase.from("diagnoses").insert({
          user_id: user.id,
          symptoms: symptoms.trim(),
          age: age.trim() ? Number(age) : null,
          gender: gender.trim() || null,
          duration: duration.trim() || null,
          result,
        });
        if (error) console.error(error);
      }

      return result;
    },
    onError: () => toast.error("Tahlil qilishda xatolik yuz berdi. Qaytadan urinib ko'ring."),
    onSuccess: () => {
      toast.success(user ? "Tahlil tayyor va tarixga saqlandi" : "Tahlil tayyor");
    },
  });

  const result = mutation.data;
  const canSubmit = symptoms.trim().length >= 10 && !mutation.isPending;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-2xl">
        <Badge variant="secondary" className="mb-3">
          <Sparkles className="mr-1 size-3.5" /> AI tahlil
        </Badge>
        <h1 className="text-3xl font-semibold sm:text-4xl">Shikoyatingizni tahlil qilamiz</h1>
        <p className="mt-3 text-muted-foreground">
          Belgilarni imkon qadar batafsil yozing. Tahlil klassik tibbiy manbalarga tayanadi va yakuniy tashxis
          hisoblanmaydi.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        <form
          className="card-panel h-fit space-y-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (canSubmit) mutation.mutate();
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="symptoms">Shikoyatlar *</Label>
            <Textarea
              id="symptoms"
              rows={6}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Masalan: 3 kundan beri qattiq bosh og'rig'i, ko'ngil aynishi va yorug'likdan bezovtalik..."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="age">Yosh</Label>
              <Input id="age" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} placeholder="34" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Jinsi</Label>
              <Input
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Erkak / Ayol"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Davomiyligi</Label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="3 kun / 2 hafta"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="history">Qo'shimcha ma'lumot</Label>
            <Textarea
              id="history"
              rows={3}
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              placeholder="Surunkali kasalliklar, qabul qilinayotgan dorilar, allergiya..."
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={!canSubmit}>
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" /> Tahlil qilinmoqda...
              </>
            ) : (
              "Tahlil qilish"
            )}
          </Button>

          {!user && (
            <p className="text-center text-xs text-muted-foreground">
              Natijalarni saqlash uchun{" "}
              <Link to="/kirish" className="text-primary underline">
                hisobga kiring
              </Link>
              .
            </p>
          )}
        </form>

        <div className="space-y-5">
          {mutation.isPending && (
            <div className="card-panel space-y-3 p-6">
              <p className="font-display font-semibold">Manbalar bilan solishtirilmoqda</p>
              <Progress value={65} />
              <p className="text-sm text-muted-foreground">
                Harrison, Guyton & Hall, Robbins va boshqa manbalardagi klinik tamoyillar tahlil qilinmoqda. Bu bir
                daqiqagacha vaqt olishi mumkin.
              </p>
            </div>
          )}

          {!mutation.isPending && !result && (
            <div className="card-panel p-6 text-sm text-muted-foreground">
              Natija shu yerda paydo bo'ladi: ehtimoliy holatlar, xavfli belgilar, tavsiya etiladigan tekshiruvlar va
              mutaxassis yo'nalishi.
            </div>
          )}

          {result && <ResultView result={result} />}
        </div>
      </div>
    </div>
  );
}

function ResultView({ result }: { result: DiagnosisResult }) {
  const urgency = urgencyLabels[result.urgency] ?? urgencyLabels.ortacha;

  return (
    <div className="space-y-5">
      <div className="card-panel p-6">
        <Badge variant="outline" className={urgency.className}>
          {urgency.label}
        </Badge>
        <h2 className="mt-4 font-display text-xl font-semibold">Umumiy xulosa</h2>
        <p className="mt-2 text-sm/relaxed text-muted-foreground">{result.summary}</p>
        <p className="mt-3 text-sm text-muted-foreground">{result.urgencyReason}</p>
      </div>

      {result.redFlags.length > 0 && (
        <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
            <AlertTriangle className="size-5 text-destructive" /> Xavfli belgilar
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {result.redFlags.map((flag) => (
              <li key={flag} className="flex gap-2">
                <span className="text-destructive">•</span>
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="card-panel p-6">
        <h2 className="font-display text-lg font-semibold">Ehtimoliy holatlar</h2>
        <div className="mt-4 space-y-5">
          {result.conditions.map((c) => (
            <div key={c.name} className="border-b border-border pb-5 last:border-0 last:pb-0">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display font-semibold">{c.name}</h3>
                <span className="text-sm font-semibold text-primary">{Math.round(c.likelihood)}%</span>
              </div>
              <Progress value={Math.min(100, Math.max(0, c.likelihood))} className="mt-2" />
              <p className="mt-3 text-sm/relaxed text-muted-foreground">{c.reasoning}</p>
              <p className="mt-2 flex items-start gap-2 text-xs text-muted-foreground">
                <BookOpen className="mt-0.5 size-3.5 shrink-0 text-primary" />
                <span>Manba: {c.source}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="card-panel p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
            <FlaskConical className="size-5 text-primary" /> Tavsiya etiladigan tekshiruvlar
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {result.tests.map((t) => (
              <li key={t}>• {t}</li>
            ))}
          </ul>
        </div>

        <div className="card-panel p-6">
          <h2 className="font-display text-lg font-semibold">Ehtiyot choralari</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {result.advice.map((a) => (
              <li key={a}>• {a}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card-panel flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
            <Stethoscope className="size-5 text-primary" /> Mutaxassis
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{result.specialist}</p>
        </div>
        <Button asChild variant="outline">
          <Link to="/shifokorlar">Shifokor tanlash</Link>
        </Button>
      </div>
    </div>
  );
}
