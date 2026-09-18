import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, BookOpen, Stethoscope, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

import heroImage from "@/assets/hero-mediai.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { books, categoryLabels } from "@/data/books";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediAI — klassik tibbiy kitoblar asosida AI tahlil" },
      {
        name: "description",
        content:
          "Shikoyatlaringizni kiriting — MediAI Harrison, Guyton & Hall, Robbins va Netter kabi manbalar asosida ehtimoliy holatlarni tahlil qiladi.",
      },
      { property: "og:title", content: "MediAI — klassik tibbiy kitoblar asosida AI tahlil" },
      {
        property: "og:description",
        content: "15 ta klassik tibbiy manbaga tayangan sun'iy intellekt yordamchisi.",
      },
    ],
  }),
  component: HomePage,
});

const features = [
  {
    icon: Brain,
    title: "Manbaga asoslangan tahlil",
    text: "Har bir taxmin ostida qaysi kitob va qaysi mavzu asos bo'lgani ko'rsatiladi.",
  },
  {
    icon: ShieldCheck,
    title: "Xavfli belgilar nazorati",
    text: "Shoshilinch yordam talab qiladigan belgilar alohida ajratib ko'rsatiladi.",
  },
  {
    icon: Stethoscope,
    title: "Mutaxassisga yo'naltirish",
    text: "Qaysi shifokorga murojaat qilish va qanday tekshiruvlar kerakligi aytiladi.",
  },
  {
    icon: BookOpen,
    title: "Ochiq kutubxona",
    text: "Tizim tayanadigan 15 ta manba ro'yxati va mavzulari ochiq ko'rsatilgan.",
  },
];

const steps = [
  { n: "01", title: "Shikoyatni yozing", text: "Belgilar, davomiyligi, yosh va qo'shimcha ma'lumotlar." },
  { n: "02", title: "AI tahlil qiladi", text: "Klassik manbalardagi klinik tamoyillar bo'yicha solishtiradi." },
  { n: "03", title: "Natijani oling", text: "Ehtimoliy holatlar, tekshiruvlar va mutaxassis tavsiyasi." },
];

function HomePage() {
  return (
    <div>
      <section className="surface-hero">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <Badge className="border-0 bg-white/15 text-primary-foreground backdrop-blur">
              <Sparkles className="mr-1 size-3.5" /> {books.length} ta klassik tibbiy manba
            </Badge>
            <h1 className="mt-5 text-4xl leading-tight font-semibold sm:text-5xl">
              Tibbiy klassikaga tayangan sun'iy intellekt tahlili
            </h1>
            <p className="mt-5 max-w-xl text-base/relaxed opacity-90">
              MediAI shikoyatlaringizni Netter, Harrison, Guyton & Hall va Robbins kabi asosiy darsliklar, shuningdek
              taniqli shifokorlarning klinik xotiralari mazmuniga tayanib tahlil qiladi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/tashxis">
                  Tashxis olish <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10"
              >
                <Link to="/kutubxona">Manbalarni ko'rish</Link>
              </Button>
            </div>
          </div>

          <img
            src={heroImage}
            alt="Inson tanasi va tibbiy ma'lumotlar tahlili"
            width={1536}
            height={1024}
            className="rounded-3xl shadow-lift"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold sm:text-3xl">Nima uchun MediAI</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="card-panel p-5">
              <span className="flex size-10 items-center justify-center rounded-xl surface-soft text-primary">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-soft border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">Qanday ishlaydi</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="card-panel p-6">
                <span className="font-display text-sm font-semibold text-primary">{s.n}</span>
                <h3 className="mt-2 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">Tizim tayanadigan manbalar</h2>
          <Button asChild variant="outline">
            <Link to="/kutubxona">Barcha {books.length} manba</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {books.slice(0, 6).map((book) => (
            <div key={book.id} className="card-panel p-5">
              <p className="font-display text-base font-semibold">{book.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
              <Badge variant="secondary" className="mt-3 font-normal">
                {categoryLabels[book.category]}
              </Badge>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
