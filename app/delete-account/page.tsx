import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

import AccountDeletionForm from "../account-deletion/AccountDeletionForm";

export const metadata: Metadata = {
  title: "Delete your account | Ya",
  description: "Request deletion of a Ya rider or driver account.",
  alternates: {
    canonical: "https://yaride.et/delete-account",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DeleteAccountPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#071b13] px-5 pb-20 pt-36 sm:px-8 sm:pt-40 lg:px-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(2,191,99,0.34),transparent_28%),radial-gradient(circle_at_88%_70%,rgba(45,212,191,0.17),transparent_26%),linear-gradient(135deg,#061710,#0b291a)]" />
      <div className="mx-auto w-full max-w-4xl">
        <section className="rounded-[2rem] border border-white/15 bg-white/[0.09] p-7 text-white shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-10 lg:p-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
            Account management
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Delete your account</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
            Verify the rider or driver account you want to delete, then review the details before submitting your request.
          </p>
        </section>
        <section className="mt-6 rounded-[2rem] border border-white/70 bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.2)] sm:mt-8 sm:p-10">
          <AccountDeletionForm />
        </section>
      </div>
    </main>
  );
}
