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
    <main className="min-h-screen bg-paper pt-20 text-ink">
      <section className="border-b-2 border-ink bg-ya">
        <div className="wrap flex flex-col gap-8 pb-12 pt-14 sm:pb-16 sm:pt-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="marker">Ya Ride legal centre</p>
            <h1 className="display mt-5 text-[clamp(2.75rem,8vw,6rem)]">{title}</h1>
            <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-ink/80">{description}</p>
          </div>
          <nav aria-label="Legal documents" className="flex shrink-0 gap-2">
            <Link className="btn btn-line !h-11 !px-5 !text-base" href="/privacy-policy">
              Privacy
            </Link>
            <Link className="btn btn-line !h-11 !px-5 !text-base" href="/terms-of-service">
              Terms
            </Link>
          </nav>
        </div>
      </section>

      <article className="wrap legal-docs max-w-3xl py-12 sm:py-16">
        <p className="mb-8 border-b-2 border-ink pb-4 text-sm font-bold uppercase tracking-wider text-muted">
          Official Ya Ride document
        </p>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>
    </main>
  );
}
