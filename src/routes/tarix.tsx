import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarClock, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import type { DiagnosisResult } from "@/lib/diagnose.functions";

export const Route = createFileRoute("/tarix")({
  head: () => ({
    meta: [
      { title: "Tahlil tarixi — MediAI" },
      { name: "description", content: "Saqlangan AI tahlillari va ularning natijalari." },
      { property: "og:title", content: "Tahlil tarixi — MediAI" },
      { property: "og:description", content: "Oldingi shikoyatlar va AI xulosalari." },
    ],
  }),
  component: HistoryPage,
});

type Row = {
  id: string;
  symptoms: string;
  created_at: string;
  result: DiagnosisResult;
};

function HistoryPage() {
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["diagnoses", user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("diagnoses")
        .select("id, symptoms, created_at, result")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as Row[];
    },
  });

  async function remove(id: string) {
    const { error } = await supabase.from("diagnoses").delete().eq("id", id);
    if (error) {
      toast.error("O'chirib bo'lmadi");
      return;
    }
    toast.success("Yozuv o'chirildi");
    queryClient.invalidateQueries({ queryKey: ["diagnoses", user?.id] });
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Tarixni ko'rish uchun kiring</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Saqlangan tahlillar faqat hisobingizga bog'langan holda ko'rinadi.
        </p>
        <Button asChild className="mt-6">
          <Link to="/kirish">Kirish</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold sm:text-4xl">Tahlil tarixi</h1>
      <p className="mt-3 text-muted-foreground">Oldingi shikoyatlaringiz va AI xulosalari.</p>

      {isLoading && (
        <div className="mt-10 flex justify-center">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && (data?.length ?? 0) === 0 && (
        <div className="card-panel mt-8 p-8 text-center">
          <p className="text-muted-foreground">Hozircha saqlangan tahlil yo'q.</p>
          <Button asChild className="mt-4">
            <Link to="/tashxis">Birinchi tahlilni boshlash</Link>
          </Button>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {data?.map((row) => (
          <div key={row.id} className="card-panel p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarClock className="size-3.5" />
                  {new Date(row.created_at).toLocaleString("uz-UZ")}
                </p>
                <p className="mt-2 font-display font-semibold">{row.result?.conditions?.[0]?.name ?? "Tahlil"}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{row.result?.specialist ?? "Terapevt"}</Badge>
                <Button variant="ghost" size="icon" aria-label="O'chirish" onClick={() => remove(row.id)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">{row.symptoms}</p>

            <Accordion type="single" collapsible className="mt-3">
              <AccordionItem value="detail" className="border-0">
                <AccordionTrigger className="text-sm">Batafsil natija</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm/relaxed text-muted-foreground">{row.result?.summary}</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {row.result?.conditions?.map((c) => (
                      <li key={c.name}>
                        <span className="font-medium">{c.name}</span> — {Math.round(c.likelihood)}%
                        <span className="block text-xs text-muted-foreground">Manba: {c.source}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
