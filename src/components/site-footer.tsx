import { Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-3 rounded-2xl border border-warning/40 bg-warning/10 p-4 text-sm text-foreground">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldAlert className="size-4" />
            Tibbiy ogohlantirish
          </div>
          <p className="text-muted-foreground">
            MediAI klassik tibbiy adabiyotlar asosida faqat ma'lumot beruvchi tahlil taqdim etadi. Bu yakuniy tashxis
            emas va shifokor ko'rigini almashtirmaydi. Og'ir yoki keskin holatlarda darhol 103 raqamiga murojaat qiling.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MediAI — sun'iy intellekt asosidagi tibbiy yordamchi</p>
          <nav className="flex flex-wrap gap-4">
            <Link to="/kutubxona" className="hover:text-foreground">
              Manbalar
            </Link>
            <Link to="/shifokorlar" className="hover:text-foreground">
              Shifokorlar
            </Link>
            <Link to="/tashxis" className="hover:text-foreground">
              AI tashxis
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
