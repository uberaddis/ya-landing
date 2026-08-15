"use client";

import { FormEvent, type ReactNode, useRef, useState } from "react";

import {
  AccountDeletionOtpFlow,
  isAccountDeletionApiError,
  type AccountDeletionRequestResult,
  type AccountRole,
} from "@/lib/account-deletion";

type Step = "role" | "phone" | "code" | "confirm" | "result";

const roleLabels: Record<AccountRole, string> = {
  rider: "Rider account",
  driver: "Driver account",
};

export default function AccountDeletionForm() {
  const flowRef = useRef<AccountDeletionOtpFlow | null>(null);
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<AccountRole | null>(null);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [estimatedDeletionDate, setEstimatedDeletionDate] = useState("");
  const [deletionConfirmed, setDeletionConfirmed] = useState(false);
  const [result, setResult] = useState<AccountDeletionRequestResult | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getFlow(): AccountDeletionOtpFlow {
    if (!flowRef.current) {
      flowRef.current = AccountDeletionOtpFlow.fromEnvironment();
    }

    return flowRef.current;
  }

  function selectRole(nextRole: AccountRole) {
    setRole(nextRole);
    setError("");
    setResult(null);
    setStep("phone");
  }

  async function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!role) return;

    setIsSubmitting(true);
    setError("");
    try {
      await getFlow().requestOtp(role, phone);
      setCode("");
      setStep("code");
    } catch (caughtError) {
      setError(toUserMessage(caughtError));
    } finally {
      setIsSubmitting(false);
    }
  }

  function reviewDeletion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!code.trim()) {
      setError("Enter the verification code we sent you.");
      return;
    }

    // The API verifies the OTP when the deletion request is submitted. This
    // client-side estimate is replaced with its authoritative `anonymizeAt`.
    setEstimatedDeletionDate(getScheduledDeletionDate());
    setDeletionConfirmed(false);
    setError("");
    setStep("confirm");
  }

  async function submitDeletion() {
    if (!role || !deletionConfirmed) return;

    setIsSubmitting(true);
    setError("");
    try {
      const deletionResult = await getFlow().requestDeletion(role, code);
      setResult(deletionResult);
      setStep("result");
    } catch (caughtError) {
      setError(toUserMessage(caughtError));
    } finally {
      setIsSubmitting(false);
    }
  }

  function startOver() {
    flowRef.current?.clear();
    setRole(null);
    setPhone("");
    setCode("");
    setEstimatedDeletionDate("");
    setDeletionConfirmed(false);
    setResult(null);
    setError("");
    setStep("role");
  }

  return (
    <div className="mt-8">
      {step === "role" && (
        <div>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Which account do you want to delete?
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {([
              ["rider", "Rider"],
              ["driver", "Driver"],
            ] as const).map(([accountRole, label]) => (
              <button
                className="rounded-xl border border-black/15 px-4 py-4 text-left font-medium text-[var(--foreground)] transition hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                key={accountRole}
                onClick={() => selectRole(accountRole)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm leading-6 text-[var(--foreground)]/70">
            Rider and driver accounts are separate. Delete each account independently.
          </p>
        </div>
      )}

      {step === "phone" && role && (
        <form className="space-y-5" onSubmit={requestCode}>
          <div>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Verify your {roleLabels[role].toLowerCase()}
            </h2>
            <p className="mt-1 text-sm text-[var(--foreground)]/70">
              Enter the mobile number associated with this account.
            </p>
          </div>
          <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="account-deletion-phone">
            Mobile number
            <input
              autoComplete="tel"
              className="mt-2 h-11 w-full rounded-lg border border-black/20 bg-white px-3 text-base text-[var(--foreground)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30"
              id="account-deletion-phone"
              inputMode="tel"
              onChange={(event) => setPhone(event.target.value)}
              placeholder="0911234567"
              required
              type="tel"
              value={phone}
            />
          </label>
          <ActionButtons busy={isSubmitting} onBack={startOver} primaryLabel="Send verification code" />
        </form>
      )}

      {step === "code" && role && (
        <form className="space-y-5" onSubmit={reviewDeletion}>
          <div>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Enter your verification code
            </h2>
            <p className="mt-1 text-sm text-[var(--foreground)]/70">
              Enter the code sent to the mobile number for your {roleLabels[role].toLowerCase()}.
            </p>
          </div>
          <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor="account-deletion-code">
            Verification code
            <input
              autoComplete="one-time-code"
              className="mt-2 h-11 w-full rounded-lg border border-black/20 bg-white px-3 text-base tracking-[0.25em] text-[var(--foreground)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30"
              id="account-deletion-code"
              inputMode="numeric"
              onChange={(event) => setCode(event.target.value)}
              required
              type="text"
              value={code}
            />
          </label>
          <ActionButtons
            busy={isSubmitting}
            onBack={() => {
              flowRef.current?.clearRole(role);
              setCode("");
              setError("");
              setStep("phone");
            }}
            primaryLabel="Review deletion details"
          />
        </form>
      )}

      {step === "confirm" && role && (
        <div className="space-y-7">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--foreground)]">Delete your account</h2>
            <p className="mt-3 text-base leading-7 text-[var(--foreground)]/80">
              Your account will be scheduled for deletion on <strong>{estimatedDeletionDate}</strong>.
            </p>
          </div>
          <div className="space-y-6 text-sm leading-6 text-[var(--foreground)]/80">
            <ConfirmationDetail title="What happens now">
              You&apos;ll be signed out on all devices immediately. Until {estimatedDeletionDate}, you won&apos;t be able to {role === "rider" ? "book rides" : "go online as a driver"} or receive notifications.
            </ConfirmationDetail>
            <ConfirmationDetail title="Changed your mind?">
              You can cancel any time before {estimatedDeletionDate}. Log in and confirm you want to keep your account — simply logging in won&apos;t cancel the deletion on its own.
            </ConfirmationDetail>
            <ConfirmationDetail title={`What gets deleted on ${estimatedDeletionDate}`}>
              Your name, phone number, email address, profile photo, saved addresses, and any identity or vehicle documents you uploaded. This is permanent and cannot be reversed.
            </ConfirmationDetail>
            <ConfirmationDetail title="What we have to keep">
              Records of your trips and payments — dates, amounts, and distances — are kept for 10 years, as required by Ethiopian tax and commercial law. These records are no longer linked to your name, phone number, or any other detail that identifies you.
            </ConfirmationDetail>
            <ConfirmationDetail title="Money in your wallet">
              If your wallet has a balance on {estimatedDeletionDate}, we won&apos;t delete your account. We&apos;ll pause the deletion and contact you so the balance can be paid out first. Once that&apos;s settled, deletion continues.
            </ConfirmationDetail>
            <ConfirmationDetail title="Rider and driver accounts are separate">
              Deleting your {role} account does not delete your {role === "rider" ? "driver" : "rider"} account. You&apos;ll need to delete that separately.
            </ConfirmationDetail>
          </div>
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-black/15 p-4 text-sm leading-6 text-[var(--foreground)]">
            <input
              checked={deletionConfirmed}
              className="mt-1 h-4 w-4 accent-red-700"
              onChange={(event) => setDeletionConfirmed(event.target.checked)}
              type="checkbox"
            />
            <span>I understand and want to schedule deletion of my {role} account.</span>
          </label>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              className="h-11 rounded-lg border border-black/20 px-4 font-medium text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              disabled={isSubmitting}
              onClick={startOver}
              type="button"
            >
              Choose another account
            </button>
            <button
              className="h-11 rounded-lg bg-red-700 px-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
              disabled={isSubmitting || !deletionConfirmed}
              onClick={submitDeletion}
              type="button"
            >
              {isSubmitting ? "Submitting…" : "Confirm account deletion"}
            </button>
          </div>
        </div>
      )}

      {step === "result" && role && result && (
        <DeletionResult
          onContinue={startOver}
          result={result}
          role={role}
        />
      )}

      {error && (
        <p aria-live="polite" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function DeletionResult({
  onContinue,
  result,
  role,
}: {
  onContinue: () => void;
  result: AccountDeletionRequestResult;
  role: AccountRole;
}) {
  const title = result.status === "PendingDeletion"
    ? "Deletion scheduled"
    : result.status === "NoAccount"
      ? "No account found"
      : "Deletion cannot be scheduled yet";
  const message = getResultMessage(result, role);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--foreground)]/80">{message}</p>
      </div>
      <button
        className="h-11 rounded-lg border border-black/20 px-4 font-medium text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        onClick={onContinue}
        type="button"
      >
        Start another request
      </button>
    </div>
  );
}

function getResultMessage(result: AccountDeletionRequestResult, role: AccountRole): string {
  if (result.status === "PendingDeletion") {
    const date = result.anonymizeAt ? formatDeletionDate(result.anonymizeAt) : "the scheduled date";
    return `Your ${role} account is scheduled for deletion on ${date}. To cancel, log in before then and confirm that you want to keep your account.`;
  }

  if (result.status === "NoAccount") {
    return `No ${role} account was found for this phone number.`;
  }

  switch (result.reason) {
    case "ActiveRide":
      return "You have a trip in progress. Complete it before deleting your account.";
    case "PositiveBalance":
      return "You have a wallet balance. Contact support to settle it before deleting your account.";
    case "DriverDebt":
      return "You have an outstanding balance owed to Ya Ride. Settle it before deleting your account.";
    default:
      return "This account cannot be deleted yet. Contact support for help.";
  }
}

function ConfirmationDetail({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section>
      <h3 className="font-semibold text-[var(--foreground)]">{title}</h3>
      <p className="mt-1">{children}</p>
    </section>
  );
}

function ActionButtons({
  busy,
  onBack,
  primaryLabel,
}: {
  busy: boolean;
  onBack: () => void;
  primaryLabel: string;
}) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <button
        className="h-11 rounded-lg border border-black/20 px-4 font-medium text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        disabled={busy}
        onClick={onBack}
        type="button"
      >
        Back
      </button>
      <button
        className="h-11 rounded-lg bg-[var(--primary)] px-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
        disabled={busy}
        type="submit"
      >
        {busy ? "Please wait…" : primaryLabel}
      </button>
    </div>
  );
}

function getScheduledDeletionDate(): string {
  const scheduledDate = new Date();
  scheduledDate.setDate(scheduledDate.getDate() + 30);
  return formatDeletionDate(scheduledDate.toISOString());
}

function formatDeletionDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function toUserMessage(error: unknown): string {
  if (isAccountDeletionApiError(error)) {
    return error.userMessage;
  }

  return "We could not complete that request. Please try again.";
}
