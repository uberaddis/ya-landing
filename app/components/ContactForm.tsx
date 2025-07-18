"use client";
import { useState } from "react";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = {
            name,
            email,
            phone,
            message,
            subject,
        };
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });
        if (res.status === 200) {
            alert("Email sent successfully!");
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
            setSubject("");
        } else {
            alert("Internal Server Error: Email not sent!");
        }
    };

    return (
        <div className="w-full pt-16 px-5 md:px-[120px] mb-10 flex flex-col items-center">
            <h2 className='relative w-fit text-2xl font-black pb-3 mb-14 before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-1/2 before:h-2 before:bg-[var(--primary)] before:rounded-full'>Get In Touch</h2>
            <form
                onSubmit={handleSubmit}
                className="w-full bg-[#02bf6322] px-10 md:px-24 py-24 flex flex-wrap lg:flex-nowrap rounded-2xl gap-10"
            >
                <div className="flex-1 flex flex-col gap-10">
                    <input
                        name="name"
                        type="text"
                        placeholder="Full Name*"
                        className="min-w-[150px] sm:min-w-[300px] w-full bg-transparent py-3 placeholder:text-[#888] text-black text-base font-light outline-none border-b border-[#00000088] focus:border-[var(--primary)] duration-300"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address*"
                        className="min-w-[150px] sm:min-w-[300px] w-full bg-transparent py-3 placeholder:text-[#888] text-black text-base font-light outline-none border-b border-[#00000088] focus:border-[var(--primary)] duration-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        name="phone"
                        type="tel"
                        placeholder="Phone Number*"
                        className="min-w-[150px] sm:min-w-[300px] w-full bg-transparent py-3 placeholder:text-[#888] text-black text-base font-light outline-none border-b border-[#00000088] focus:border-[var(--primary)] duration-300"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                        name="subject"
                        type="text"
                        placeholder="Subject*"
                        className="min-w-[150px] sm:min-w-[300px] w-full bg-transparent py-3 placeholder:text-[#888] text-black text-base font-light outline-none border-b border-[#00000088] focus:border-[var(--primary)] duration-300"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div className="flex-1 flex flex-col gap-5">
                    <textarea
                        name="message"
                        id="message"
                        placeholder="Your Message*"
                        rows={5}
                        className="w-full bg-transparent py-3 placeholder:text-[#888] text-black text-base font-light outline-none border-b border-[#00000088] focus:border-[var(--primary)] duration-300"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <button
                        type="submit"
                        className="w-fit py-5 px-10 bg-[var(--primary)] text-black text-xl font-medium rounded-lg duration-300 hover:bg-[#000000] hover:text-[var(--primary)] cursor-pointer"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
}