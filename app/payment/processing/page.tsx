"use client";

import React, { Suspense, useEffect, useState } from "react";
import { CheckCircle2, ShieldCheck, Wallet, Car } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get('userType'); // 'rider' or 'driver'
  const isDriver = userType === 'driver';
  
  const [step, setStep] = useState(0);

  // Simulate processing stages for the "hella sexy" effect
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000); // Start processing
    const timer2 = setTimeout(() => setStep(2), 3000); // Verifying
    const timer3 = setTimeout(() => setStep(3), 5000); // Complete
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleReturn = () => {
    router.push("/payment/success");
  };

  const statusText = {
    0: "Connecting...",
    1: isDriver ? "Verifying Transaction..." : "Processing Payment...",
    2: isDriver ? "Confirming Deposit..." : "Verifying Transaction...",
    3: isDriver ? "Wallet Topup Complete" : "Payment Completed",
  };

  const subText = {
    pending: isDriver
      ? "Securely processing your earnings deposit."
      : "Please wait while we securely process your transaction.",
    success: isDriver
      ? "Your wallet has been topped up successfully."
      : "Your wallet has been updated successfully.",
  };

  return (
    <div className="fixed inset-0 z-[100000] flex flex-col overflow-hidden bg-ya text-ink">
      <header className="flex items-center justify-between border-b-2 border-ink px-6 py-5">
        <h1 className="text-sm font-bold uppercase tracking-wider">
          {isDriver ? "Driver Payout" : "Payment Gateway"}
        </h1>
        <span className="display text-xl">ya</span>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center p-8">
        <div className={`mb-10 grid h-28 w-28 place-items-center border-2 border-ink ${step < 3 ? "bg-paper" : "bg-ink text-ya"}`}>
          {step < 3 ? (
            isDriver ? <Car aria-hidden="true" className="h-12 w-12 animate-pulse" /> : <Wallet aria-hidden="true" className="h-12 w-12 animate-pulse" />
          ) : (
            <CheckCircle2 aria-hidden="true" className="h-14 w-14" />
          )}
        </div>

        <div className="mx-auto max-w-md space-y-4 text-center" aria-live="polite">
          <h2 className="display text-4xl sm:text-5xl">
            {statusText[step as keyof typeof statusText]}
          </h2>
          <p className="text-lg font-medium leading-relaxed text-ink/80">
            {step < 3 ? subText.pending : subText.success}
          </p>
        </div>

        <div className="mt-10 flex items-center gap-2 border-2 border-ink px-4 py-2">
          <ShieldCheck aria-hidden="true" className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">256-Bit Secure Encryption</span>
        </div>
      </main>

      <div className={`border-t-2 border-ink p-6 transition-transform duration-500 ${step === 3 ? "translate-y-0" : "translate-y-full"}`}>
        <button onClick={handleReturn} className="btn btn-ink w-full" type="button">
          Return to App
        </button>
      </div>
    </div>
  );
}

export default function PaymentProcessingPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-ya" />}>
      <PaymentContent />
    </Suspense>
  );
}
