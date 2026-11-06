import type { Metadata } from "next";

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
    <main className="min-h-screen bg-paper pt-20 text-ink">
      <section className="border-b-2 border-ink bg-ya">
        <div className="wrap pb-12 pt-14 sm:pb-16 sm:pt-20">
          <p className="marker">Account management</p>
          <h1 className="display mt-5 text-[clamp(2.75rem,8vw,6rem)]">Delete your account</h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-ink/80">
            Verify the rider or driver account you want to delete, then review the details before submitting your request.
          </p>
        </div>
      </section>
      <section className="wrap py-12 sm:py-16">
        <div className="max-w-3xl border-2 border-ink bg-paper p-6 sm:p-10">
          <AccountDeletionForm />
        </div>
      </section>
    </main>
  );
}
