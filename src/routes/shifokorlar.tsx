import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Star, Stethoscope } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { doctors } from "@/data/doctors";

export const Route = createFileRoute("/shifokorlar")({
  head: () => ({
    meta: [
      { title: "Shifokorlar — MediAI" },
      {
        name: "description",
        content: "AI tahlilidan keyin murojaat qilish uchun mutaxassis shifokorlar ro'yxati.",
      },
      { property: "og:title", content: "Shifokorlar — MediAI" },
      {
        property: "og:description",
        content: "Terapevt, nevrolog, kardiolog va boshqa mutaxassislar.",
      },
    ],
  }),
  component: DoctorsPage,
});

function DoctorsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">Mutaxassis shifokorlar</h1>
        <p className="mt-3 text-muted-foreground">
          AI tahlili qaysi mutaxassisga murojaat qilish kerakligini ko'rsatadi. Yakuniy tashxisni faqat shifokor
          qo'yadi.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <article key={doctor.id} className="card-panel flex h-full flex-col p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full surface-soft text-primary">
                <Stethoscope className="size-5" />
              </span>
              <div>
                <h2 className="font-display text-base font-semibold">{doctor.name}</h2>
                <p className="text-sm text-primary">{doctor.speciality}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-4" /> {doctor.city}
              </span>
              <span className="inline-flex items-center gap-1">
                <Star className="size-4 text-warning" /> {doctor.rating}
              </span>
              <span>{doctor.experience} yil tajriba</span>
            </div>

            <p className="mt-3 flex-1 text-sm text-muted-foreground">{doctor.focus}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {doctor.languages.map((lang) => (
                <Badge key={lang} variant="secondary" className="font-normal">
                  {lang}
                </Badge>
              ))}
            </div>

            <Button asChild variant="outline" className="mt-5">
              <Link to="/tashxis">Shikoyatni tahlil qilish</Link>
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
