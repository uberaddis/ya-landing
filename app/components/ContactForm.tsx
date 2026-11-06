"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import Reveal from "./Reveal";

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
        <section id="contact" className="w-full bg-paper px-5 pt-20 sm:px-8 sm:pt-28 lg:px-10">
            <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                <Reveal className="flex flex-col justify-between text-ink" variant="left">
                    <div>
                        <p className="marker text-ya-deep">We&apos;re here to help</p>
                        <h2 className="display mt-5 text-[clamp(2.75rem,7vw,5.5rem)]">
                            Let&apos;s start a conversation.
                        </h2>
                        <p className="mt-6 max-w-md text-lg leading-8 text-muted">
                            Whether you have a question, feedback, or need support, our team would love to hear from you.
                        </p>
                    </div>
                    <p className="mt-10 max-w-sm border-l-4 border-ya pl-4 text-sm leading-6 text-muted lg:mt-0">
                        Share a few details and we&apos;ll make sure your message reaches the right team.
                    </p>
                </Reveal>

                <Reveal delay={150} variant="right">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
                        <Field label="Full name" name="name">
                            <input autoComplete="name" className="field" id="name" name="name" onChange={(event) => setName(event.target.value)} placeholder="Your full name" required type="text" value={name} />
                        </Field>
                        <Field label="Email address" name="email">
                            <input autoComplete="email" className="field" id="email" name="email" onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required type="email" value={email} />
                        </Field>
                        <Field label="Phone number" name="phone">
                            <input autoComplete="tel" className="field" id="phone" name="phone" onChange={(event) => setPhone(event.target.value)} placeholder="0911 234 567" required type="tel" value={phone} />
                        </Field>
                        <Field label="Subject" name="subject">
                            <input className="field" id="subject" name="subject" onChange={(event) => setSubject(event.target.value)} placeholder="How can we help?" required type="text" value={subject} />
                        </Field>
                        <Field className="sm:col-span-2" label="Your message" name="message">
                            <textarea className="field resize-none" id="message" name="message" onChange={(event) => setMessage(event.target.value)} placeholder="Tell us a little more..." required rows={4} value={message} />
                        </Field>
                    </div>
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p aria-live="polite" className={`text-sm font-semibold ${status === "error" ? "text-red-700" : "text-ya-deep"}`}>
                            {status === "success" && "Thanks — your message has been sent."}
                            {status === "error" && "We couldn’t send your message. Please try again."}
                        </p>
                        <button className="btn btn-ink" disabled={isSending} type="submit">
                            {isSending ? "Sending…" : "Send message"}
                            <Send aria-hidden="true" className="h-4 w-4" />
                        </button>
                    </div>
                </form>
                </Reveal>
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
        <div className={className}>
            <label className="field-label" htmlFor={name}>{label}</label>
            {children}
        </div>
    );
}
