import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "./Reveal";

const contactMethods = [
    { icon: Phone, label: "Call us", value: "+2519 5355 3333", href: "tel:+251953553333" },
    { icon: Phone, label: "Call us", value: "9392", href: "tel:9392" },
    { icon: Mail, label: "Email us", value: "support@yaride.et", href: "mailto:support@yaride.et" },
    {
        icon: MapPin,
        label: "Visit us",
        value: "Arada Sub-city, Woreda 08, House No. 106",
        href: "https://maps.google.com/?q=Arada+Sub-city+Woreda+08+House+No.+106",
    },
] as const;

export default function ContactCards() {
    return (
        <section className="w-full bg-paper px-5 pb-20 pt-16 sm:px-8 sm:pb-28 lg:px-10">
            <div className="mx-auto grid w-full max-w-7xl gap-px border-2 border-ink bg-ink md:grid-cols-2 lg:grid-cols-4">
                {contactMethods.map((method, index) => {
                    const Icon = method.icon;

                    return (
                        <Reveal className="bg-paper" delay={index * 90} key={method.value} variant="zoom">
                        <a
                            className="group flex h-full min-h-[11rem] flex-col justify-between bg-paper p-6 text-ink transition-colors hover:bg-ya"
                            href={method.href}
                            key={method.value}
                            rel={method.label === "Visit us" ? "noreferrer" : undefined}
                            target={method.label === "Visit us" ? "_blank" : undefined}
                        >
                            <span className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                                    <Icon aria-hidden="true" className="h-4 w-4" />
                                    {method.label}
                                </span>
                                <ArrowUpRight aria-hidden="true" className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
                            </span>
                            <span className="display mt-8 break-words text-2xl !leading-[1.05] sm:text-3xl">{method.value}</span>
                        </a>
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
}
