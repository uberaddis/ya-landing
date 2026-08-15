import { FileText, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LegalDocument({
  description,
  htmlContent,
  title,
}: {
  description: string;
  htmlContent: string;
  title: string;
}) {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f6f8f6] px-5 pb-20 pt-36 sm:px-8 sm:pt-40 lg:px-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_8%,rgba(2,191,99,0.18),transparent_27%),radial-gradient(circle_at_92%_20%,rgba(45,212,191,0.14),transparent_24%)]" />
      <div className="mx-auto w-full max-w-5xl">
        <section className="rounded-[2rem] border border-white/70 bg-[linear-gradient(120deg,rgba(255,255,255,0.9),rgba(232,255,243,0.74))] p-7 shadow-[0_22px_60px_rgba(15,23,42,0.1)] sm:p-10 lg:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
                Ya Ride legal centre
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{description}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-black/5 bg-white/75 p-2 shadow-sm">
              <Link className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800" href="/privacy-policy">
                Privacy
              </Link>
              <Link className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800" href="/terms-of-service">
                Terms
              </Link>
            </div>
          </div>
        </section>

        <article className="legal-docs mt-6 rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_20px_55px_rgba(15,23,42,0.08)] sm:mt-8 sm:p-10 lg:p-12">
          <div className="mb-8 flex items-center gap-3 border-b border-slate-100 pb-6 text-sm text-slate-500">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
              <FileText aria-hidden="true" className="h-4 w-4" />
            </span>
            Official Ya Ride document
          </div>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </article>
      </div>
    </main>
  );
}
