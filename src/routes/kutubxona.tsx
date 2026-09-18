import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { books, categoryLabels, type Book } from "@/data/books";

export const Route = createFileRoute("/kutubxona")({
  head: () => ({
    meta: [
      { title: "Manba kutubxonasi — MediAI" },
      {
        name: "description",
        content: "MediAI tahlili uchun asos bo'lgan 15 ta klassik tibbiy kitob va ularning mavzulari.",
      },
      { property: "og:title", content: "Manba kutubxonasi — MediAI" },
      {
        property: "og:description",
        content: "Netter, Harrison, Guyton & Hall, Robbins va boshqa manbalar ro'yxati.",
      },
    ],
  }),
  component: LibraryPage,
});

const filters = [
  { key: "all", label: "Barchasi" },
  { key: "klassika", label: categoryLabels.klassika },
  { key: "xotira", label: categoryLabels.xotira },
  { key: "ommabop", label: categoryLabels.ommabop },
] as const;

function LibraryPage() {
  const [active, setActive] = useState<(typeof filters)[number]["key"]>("all");
  const [query, setQuery] = useState("");

  const visible = books.filter((book) => {
    const matchCategory = active === "all" || book.category === active;
    const q = query.trim().toLowerCase();
    const matchQuery =
      q === "" ||
      book.title.toLowerCase().includes(q) ||
      book.titleUz.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.topics.some((t) => t.toLowerCase().includes(q));
    return matchCategory && matchQuery;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-2xl">
        <Badge variant="secondary" className="mb-3">
          {books.length} ta manba
        </Badge>
        <h1 className="text-3xl font-semibold sm:text-4xl">Manba kutubxonasi</h1>
        <p className="mt-3 text-muted-foreground">
          AI tahlili shu kitoblardagi klinik tamoyillarga tayanadi. Har bir tashxis natijasida qaysi manba asos
          bo'lgani ko'rsatiladi.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kitob, muallif yoki mavzu bo'yicha qidirish"
          className="sm:max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Button
              key={f.key}
              size="sm"
              variant={active === f.key ? "default" : "outline"}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">Bu so'rov bo'yicha kitob topilmadi.</p>
      )}
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <article className="card-panel flex h-full flex-col p-5 transition-shadow hover:shadow-lift">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl surface-soft text-primary">
          <BookOpen className="size-5" />
        </span>
        <div>
          <h2 className="font-display text-base leading-snug font-semibold">{book.title}</h2>
          <p className="text-sm text-muted-foreground">{book.titleUz}</p>
        </div>
      </div>
      <p className="mt-3 text-sm font-medium">{book.author}</p>
      <p className="text-xs text-muted-foreground">
        {categoryLabels[book.category]} · {book.year}
      </p>
      <p className="mt-3 flex-1 text-sm text-muted-foreground">{book.about}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {book.topics.map((topic) => (
          <Badge key={topic} variant="secondary" className="font-normal">
            {topic}
          </Badge>
        ))}
      </div>
    </article>
  );
}
