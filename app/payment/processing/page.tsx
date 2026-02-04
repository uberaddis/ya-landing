"use client";

import React, { Suspense, useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, ShieldCheck, Wallet, Car } from "lucide-react";
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
    <div className="fixed inset-0 z-[100000] bg-white dark:bg-neutral-950 flex flex-col overflow-hidden font-sans">
      {/* Background Gradients */}
      <div
        className={`absolute top-[-20%] left-[-20%] w-[80%] h-[80%] ${isDriver ? "bg-blue-400/20" : "bg-green-400/20"} blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-lighten animate-pulse`}
      />
      <div
        className={`absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] ${isDriver ? "bg-cyan-400/20" : "bg-emerald-400/20"} blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-lighten animate-pulse delay-1000`}
      />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
        {/* <button
          onClick={handleReturn}
          className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg active:scale-95 transition-all duration-200 hover:bg-white/20 group"
          aria-label="Return"
        >
          <ArrowLeft className="w-6 h-6 text-gray-800 dark:text-white group-hover:-translate-x-1 transition-transform" />
        </button> */}
        <h1 className="text-sm font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400">
          {isDriver ? "Driver Payout" : "Payment Gateway"}
        </h1>
        <div className="w-12" /> {/* Spacer for centering */}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 relative z-0">
        {/* Animated Icon Container */}
        <div className="relative mb-12">
          {/* Ripples */}
          <div
            className={`absolute inset-0 ${isDriver ? "bg-blue-500/30" : "bg-green-500/30"} rounded-full animate-ping opacity-75 duration-[2s]`}
          />
          <div
            className={`absolute inset-[-12px] ${isDriver ? "bg-blue-500/20" : "bg-green-500/20"} rounded-full animate-ping delay-300 opacity-50 duration-[2s]`}
          />

          {/* Main Circle */}
          <div
            className={`relative w-32 h-32 bg-gradient-to-tr ${isDriver ? "from-blue-500 to-cyan-400 shadow-blue-500/40" : "from-green-500 to-emerald-400 shadow-green-500/40"} rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-500 scale-100`}
          >
            {step < 3 ? (
              isDriver ? (
                <Car className="w-12 h-12 text-white animate-bounce-slight" />
              ) : (
                <Wallet className="w-12 h-12 text-white animate-bounce-slight" />
              )
            ) : (
              <CheckCircle2 className="w-16 h-16 text-white animate-in zoom-in spin-in-12 duration-500" />
            )}
          </div>
        </div>

        {/* Text Status */}
        <div className="text-center space-y-4 max-w-xs mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-all duration-500">
            {statusText[step as keyof typeof statusText]}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed transition-opacity duration-500">
            {step < 3 ? subText.pending : subText.success}
          </p>
        </div>

        {/* Security Badge */}
        <div className="absolute bottom-12 flex items-center gap-2 text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-white/5 py-2 px-4 rounded-full border border-gray-100 dark:border-white/10">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-xs font-medium tracking-wide">
            256-Bit Secure Encryption
          </span>
        </div>
      </main>

      {/* Bottom Action (Only visible on success) */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-6 transition-transform duration-500 ${step === 3 ? "translate-y-0" : "translate-y-full"}`}
      >
        <button
          onClick={handleReturn}
          className={`w-full ${isDriver ? "bg-blue-500 hover:bg-blue-600 shadow-blue-500/30" : "bg-[#02bf63] hover:bg-[#029e52] shadow-green-500/30"} text-white font-bold py-4 rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2`}
        >
          <span>Return to App</span>
        </button>
      </div>
    </div>
  );
}

export default function PaymentProcessingPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-white dark:bg-neutral-950" />}>
      <PaymentContent />
    </Suspense>
  );
}
