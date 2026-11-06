import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FaAndroid, FaApple } from 'react-icons/fa'
import Reveal from './Reveal'

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
        <footer className="on-dark w-full bg-ink text-paper">
            <div className="wrap pt-16 sm:pt-24">
                <div className="grid gap-10 border-b-2 border-paper/20 pb-14 lg:grid-cols-12 lg:items-end">
                    <Reveal className="lg:col-span-7">
                        <p className="display text-[clamp(2.75rem,8vw,6.5rem)]">Take Ya <span className="text-ya">with you.</span></p>
                        <p className="mt-5 max-w-md text-lg text-paper/70">Download the app for the full Ya Ride experience.</p>
                    </Reveal>
                    <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
                        <StoreLink icon={FaApple} label="Download on the" store="App Store" />
                        <StoreLink icon={FaAndroid} label="Get it on" store="Google Play" />
                    </div>
                </div>

                <div className="grid gap-12 py-14 lg:grid-cols-[1.4fr_0.6fr_0.6fr_0.6fr] lg:gap-8">
                    <div>
                        <p className="max-w-sm text-base leading-7 text-paper/70">
                            Your all-in-one platform for rides, food, packages, and grocery delivery—built to make every day feel easier.
                        </p>
                        <Link className="group mt-6 inline-flex items-center gap-2 font-display text-lg font-bold text-ya underline-offset-4 hover:underline" href="/become-driver">
                            Drive with Ya Ride
                            <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
                        </Link>

                        <div className="mt-8 space-y-3 text-sm text-paper/75">
                            <a className="flex items-start gap-3 transition-colors hover:text-ya" href="https://maps.google.com/?q=Arada+Sub-city+Woreda+08+House+No.+106" rel="noreferrer" target="_blank">
                                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-ya" />
                                <span>Arada Sub-city, Woreda 08, House No. 106</span>
                            </a>
                            <a className="flex items-center gap-3 transition-colors hover:text-ya" href="tel:+251953553333">
                                <Phone aria-hidden="true" className="h-4 w-4 text-ya" />
                                <span>+2519 5355 3333</span>
                            </a>
                            <a className="flex items-center gap-3 transition-colors hover:text-ya" href="tel:9392">
                                <Phone aria-hidden="true" className="h-4 w-4 text-ya" />
                                <span>9392</span>
                            </a>
                            <a className="flex items-center gap-3 transition-colors hover:text-ya" href="mailto:support@yaride.et">
                                <Mail aria-hidden="true" className="h-4 w-4 text-ya" />
                                <span>support@yaride.et</span>
                            </a>
                        </div>
                    </div>

                    {linkGroups.map((group) => (
                        <div key={group.title}>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-ya">{group.title}</h2>
                            <ul className="mt-5 space-y-3">
                                {group.links.map((link) => (
                                    <li key={link.name}>
                                        <Link className="text-base text-paper/75 transition-colors hover:text-ya" href={link.href}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-6 border-t-2 border-paper/20 py-8 sm:flex-row sm:items-end sm:justify-between">
                    <Link aria-label="Ya Ride home" href="/#home">
                        <Image alt="Ya Ride" className="h-24 w-auto sm:h-32" height={128} src="/logo_t.png" width={150} />
                    </Link>
                    <div className="space-y-1 text-sm text-paper/55 sm:text-right">
                        <p>Move with ease.</p>
                        <p>© 2026 Ya Ride. All rights reserved.</p>
                        <p>Built for Addis Ababa.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function StoreLink({ icon: Icon, label, store }: { icon: typeof FaApple; label: string; store: string }) {
    return (
        <Link className="group inline-flex min-w-48 items-center gap-3 rounded-md border-2 border-paper px-5 py-3 text-paper transition-colors hover:border-ya hover:bg-ya hover:text-ink" href="/coming-soon">
            <Icon aria-hidden="true" className="text-3xl" />
            <span>
                <span className="block text-[10px] font-medium uppercase leading-none tracking-wider opacity-70">{label}</span>
                <span className="mt-1 block font-display text-base font-bold leading-none">{store}</span>
            </span>
        </Link>
    )
}
