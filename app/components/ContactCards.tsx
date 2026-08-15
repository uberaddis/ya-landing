import { Mail, MapPin, Phone } from "lucide-react";

const contactMethods = [
    {
        icon: Phone,
        label: "Call us",
        value: "+2519 5355 3333",
        href: "tel:+251953553333",
        accent: "from-emerald-400 to-green-600",
    },
    {
        icon: Phone,
        label: "Call us",
        value: "8455",
        href: "tel:8455",
        accent: "from-lime-400 to-emerald-600",
    },
    {
        icon: Mail,
        label: "Email us",
        value: "support@yaride.et",
        href: "mailto:support@yaride.et",
        accent: "from-teal-400 to-cyan-600",
    },
    {
        icon: MapPin,
        label: "Visit us",
        value: "Arada Sub-city, Woreda 08, House No. 106",
        href: "https://maps.google.com/?q=Arada+Sub-city+Woreda+08+House+No.+106",
        accent: "from-lime-400 to-emerald-600",
    },
] as const;

export default function ContactCards() {
    return (
        <section className="w-full bg-[#f6f2eb] px-5 pb-20 sm:px-8 sm:pb-24 lg:px-10">
            <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
                {contactMethods.map((method) => {
                    const Icon = method.icon;

                    return (
                        <a
                            className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-6 text-slate-950 shadow-[0_18px_50px_rgba(30,41,59,0.1)] transition duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            href={method.href}
                            key={method.value}
                            rel={method.label === "Visit us" ? "noreferrer" : undefined}
                            target={method.label === "Visit us" ? "_blank" : undefined}
                        >
                            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${method.accent}`} />
                            <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${method.accent} shadow-lg shadow-black/20`}>
                                <Icon aria-hidden="true" className="h-6 w-6 text-white" />
                            </div>
                            <p className="mt-6 text-sm font-medium text-emerald-700">{method.label}</p>
                            <p className="mt-1 text-base font-semibold leading-6 text-slate-950 group-hover:text-emerald-800">{method.value}</p>
                        </a>
                    );
                })}
            </div>
        </section>
    );
}
