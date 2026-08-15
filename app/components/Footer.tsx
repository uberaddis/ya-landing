import { ArrowUpRight, Download, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const linkGroups = [
    {
        title: 'Explore',
        links: [
            { name: 'Home', href: '/#home' },
            { name: 'About Ya', href: '/#about' },
            { name: 'Our services', href: '/#services' },
            { name: 'Get in touch', href: '/#contact' },
        ],
    },
    {
        title: 'Services',
        links: [
            { name: 'Ride hailing', href: '/#services' },
            { name: 'Food delivery', href: '/#services' },
            { name: 'Package delivery', href: '/#services' },
            { name: 'Grocery delivery', href: '/#services' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { name: 'Privacy policy', href: '/privacy-policy' },
            { name: 'Terms of service', href: '/terms-of-service' },
            { name: 'Delete account', href: '/delete-account' },
        ],
    },
] as const

export default function Footer() {
    return (
        <footer className="relative isolate overflow-hidden bg-[#050d09] text-white">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_0%,rgba(2,191,99,0.23),transparent_28%),radial-gradient(circle_at_92%_80%,rgba(45,212,191,0.12),transparent_25%),linear-gradient(145deg,#050d09,#071b13)]" />
            <div className="absolute left-1/2 top-0 -z-10 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="mx-auto w-full max-w-7xl px-5 pb-8 pt-16 sm:px-8 sm:pt-20 lg:px-10">
                <div className="grid gap-12 lg:grid-cols-[1.45fr_0.55fr_0.55fr_0.55fr] lg:gap-8">
                    <div>
                        <Link aria-label="Ya Ride home" className="inline-flex items-center gap-3" href="/#home">
                            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-black p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.32)] ring-1 ring-white/15">
                                <Image alt="Ya Ride" className="h-full w-full object-contain" height={48} src="/logo_t.png" width={48} />
                            </span>
                            <span>
                                <span className="block text-xl font-bold tracking-tight">Ya Ride</span>
                                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-200/75">Move with ease</span>
                            </span>
                        </Link>
                        <p className="mt-6 max-w-sm text-sm leading-6 text-white/65">
                            Your all-in-one platform for rides, food, packages, and grocery delivery—built to make every day feel easier.
                        </p>
                        <Link className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition hover:gap-3 hover:text-emerald-100" href="/become-driver">
                            Drive with Ya Ride
                            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                        </Link>

                        <div className="mt-8 space-y-3 text-sm text-white/65">
                            <a className="flex items-start gap-3 transition hover:text-white" href="https://maps.google.com/?q=Arada+Sub-city+Woreda+08+House+No.+106" rel="noreferrer" target="_blank">
                                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                                <span>Arada Sub-city, Woreda 08, House No. 106</span>
                            </a>
                            <a className="flex items-center gap-3 transition hover:text-white" href="tel:+251953553333">
                                <Phone aria-hidden="true" className="h-4 w-4 text-emerald-300" />
                                <span>+2519 5355 3333</span>
                            </a>
                            <a className="flex items-center gap-3 transition hover:text-white" href="tel:8455">
                                <Phone aria-hidden="true" className="h-4 w-4 text-emerald-300" />
                                <span>8455</span>
                            </a>
                            <a className="flex items-center gap-3 transition hover:text-white" href="mailto:support@yaride.et">
                                <Mail aria-hidden="true" className="h-4 w-4 text-emerald-300" />
                                <span>support@yaride.et</span>
                            </a>
                        </div>
                    </div>

                    {linkGroups.map((group) => (
                        <div key={group.title}>
                            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200">{group.title}</h2>
                            <ul className="mt-5 space-y-3">
                                {group.links.map((link) => (
                                    <li key={link.name}>
                                        <Link className="text-sm text-white/60 transition hover:text-white" href={link.href}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-14 flex flex-col gap-6 rounded-[1.65rem] border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
                    <div>
                        <p className="text-lg font-semibold text-white">Take Ya with you.</p>
                        <p className="mt-1 text-sm text-white/65">Download the app for the full Ya Ride experience.</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <StoreLink label="Download on the" store="App Store" />
                        <StoreLink label="Get it on" store="Google Play" />
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
                    <p>© 2026 Ya Ride. All rights reserved.</p>
                    <p>Built for Addis Ababa.</p>
                </div>
            </div>
        </footer>
    )
}

function StoreLink({ label, store }: { label: string; store: string }) {
    return (
        <Link className="group flex min-w-40 items-center gap-3 rounded-xl border border-white/15 bg-black/20 px-4 py-3 transition hover:-translate-y-0.5 hover:border-emerald-300/50 hover:bg-white/10" href="/coming-soon">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-emerald-200">
                <Download aria-hidden="true" className="h-4 w-4" />
            </span>
            <span>
                <span className="block text-[10px] leading-none text-white/55">{label}</span>
                <span className="mt-1 block text-sm font-semibold leading-none text-white">{store}</span>
            </span>
        </Link>
    )
}
