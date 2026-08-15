"use client";

import { MessageCircle, Send } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSending(true);
        setStatus("idle");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, message, subject }),
            });

            if (!response.ok) {
                setStatus("error");
                return;
            }

            setStatus("success");
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
            setSubject("");
        } catch {
            setStatus("error");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section id="contact" className="relative isolate w-full overflow-hidden bg-[#f6f2eb] px-5 pb-10 pt-20 sm:px-8 sm:pt-24 lg:px-10">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_20%,rgba(2,191,99,0.18),transparent_28%),radial-gradient(circle_at_92%_75%,rgba(251,191,36,0.18),transparent_26%)]" />

            <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
                <div className="flex flex-col justify-between py-2 text-slate-950">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 backdrop-blur">
                            <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
                            We&apos;re here to help
                        </span>
                        <h2 className="mt-5 max-w-lg text-4xl font-bold tracking-tight sm:text-5xl">
                            Let&apos;s start a conversation.
                        </h2>
                        <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
                            Whether you have a question, feedback, or need support, our team would love to hear from you.
                        </p>
                    </div>
                    <p className="mt-10 max-w-sm text-sm leading-6 text-slate-500 lg:mt-0">
                        Share a few details and we&apos;ll make sure your message reaches the right team.
                    </p>
                </div>

                <form
                    className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_30px_80px_rgba(30,41,59,0.12)] backdrop-blur-sm sm:p-9"
                    onSubmit={handleSubmit}
                >
                    <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[var(--primary)]/20 blur-3xl" />
                    <div className="relative grid gap-5 sm:grid-cols-2">
                        <Field label="Full name" name="name">
                            <input
                                autoComplete="name"
                                id="name"
                                name="name"
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Your full name"
                                required
                                type="text"
                                value={name}
                            />
                        </Field>
                        <Field label="Email address" name="email">
                            <input
                                autoComplete="email"
                                id="email"
                                name="email"
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="you@example.com"
                                required
                                type="email"
                                value={email}
                            />
                        </Field>
                        <Field label="Phone number" name="phone">
                            <input
                                autoComplete="tel"
                                id="phone"
                                name="phone"
                                onChange={(event) => setPhone(event.target.value)}
                                placeholder="0911 234 567"
                                required
                                type="tel"
                                value={phone}
                            />
                        </Field>
                        <Field label="Subject" name="subject">
                            <input
                                id="subject"
                                name="subject"
                                onChange={(event) => setSubject(event.target.value)}
                                placeholder="How can we help?"
                                required
                                type="text"
                                value={subject}
                            />
                        </Field>
                        <Field className="sm:col-span-2" label="Your message" name="message">
                            <textarea
                                id="message"
                                name="message"
                                onChange={(event) => setMessage(event.target.value)}
                                placeholder="Tell us a little more..."
                                required
                                rows={5}
                                value={message}
                            />
                        </Field>
                    </div>
                    <div className="relative mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p aria-live="polite" className={`text-sm ${status === "error" ? "text-red-700" : "text-emerald-700"}`}>
                            {status === "success" && "Thanks — your message has been sent."}
                            {status === "error" && "We couldn’t send your message. Please try again."}
                        </p>
                        <button
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 font-semibold text-slate-950 shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-[#f6f2eb]"
                            disabled={isSending}
                            type="submit"
                        >
                            {isSending ? "Sending…" : "Send message"}
                            <Send aria-hidden="true" className="h-4 w-4" />
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

function Field({
    children,
    className = "",
    label,
    name,
}: {
    children: React.ReactNode;
    className?: string;
    label: string;
    name: string;
}) {
    return (
        <label className={`block ${className}`} htmlFor={name}>
            <span className="text-sm font-medium text-slate-800">{label}</span>
            <div className="mt-2 [&_input]:h-12 [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-black/10 [&_input]:bg-slate-950/[0.03] [&_input]:px-4 [&_input]:text-sm [&_input]:text-slate-950 [&_input]:outline-none [&_input]:placeholder:text-slate-400 [&_input]:transition [&_input]:focus:border-[var(--primary)] [&_input]:focus:bg-white [&_input]:focus:ring-2 [&_input]:focus:ring-[var(--primary)]/30 [&_textarea]:w-full [&_textarea]:resize-none [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-black/10 [&_textarea]:bg-slate-950/[0.03] [&_textarea]:p-4 [&_textarea]:text-sm [&_textarea]:text-slate-950 [&_textarea]:outline-none [&_textarea]:placeholder:text-slate-400 [&_textarea]:transition [&_textarea]:focus:border-[var(--primary)] [&_textarea]:focus:bg-white [&_textarea]:focus:ring-2 [&_textarea]:focus:ring-[var(--primary)]/30">
                {children}
            </div>
        </label>
    );
}
