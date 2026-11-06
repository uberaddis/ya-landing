import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'

const services = [
    {
        title: 'Ride Hailing',
        description: 'Get a ride in minutes with reliable drivers. Safe, fast, and affordable transportation whenever you need it.',
    },
    {
        title: 'Food Delivery',
        description: 'Delicious meals from your favorite restaurants delivered hot and fresh to your doorstep.',
    },
    {
        title: 'Package Delivery',
        description: 'Send packages across the city with real-time tracking and a delivery service you can trust.',
    },
    {
        title: 'Grocery Delivery',
        description: 'Fresh groceries and essentials from local stores, delivered when you need them.',
    },
] as const

export default function Services() {
    return (
        <section id="services" className="w-full border-y-2 border-ink bg-ya py-20 text-ink sm:py-28">
            <div className="wrap">
                <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
                    <Reveal className="lg:col-span-8">
                        <p className="marker">Everything within reach</p>
                        <h2 className="display mt-5 text-[clamp(2.5rem,7vw,5.5rem)]">
                            One app, more ways to move your day.
                        </h2>
                    </Reveal>
                    <Reveal className="max-w-md text-lg font-medium leading-7 text-ink/80 lg:col-span-4 lg:justify-self-end" delay={150}>
                        <p>From the road to your doorstep, Ya brings the essentials together in one seamless experience.</p>
                    </Reveal>
                </div>

                <ul className="mt-14 border-b-2 border-ink sm:mt-20">
                    {services.map((service, index) => (
                        <li className="border-t-2 border-ink" key={service.title}>
                            <Reveal className="group grid items-center gap-x-8 gap-y-3 py-8 transition-colors hover:bg-ink hover:text-paper sm:grid-cols-[5rem_1.2fr_1fr_auto] sm:py-10 lg:px-4" delay={index * 90}>
                                <span className="display text-2xl text-paper transition-colors group-hover:text-ya">0{index + 1}</span>
                                <h3 className="display text-4xl transition-transform duration-300 group-hover:translate-x-3 sm:text-5xl lg:text-6xl">{service.title}</h3>
                                <p className="max-w-sm text-base leading-7 text-ink/80 transition-colors group-hover:text-paper/80">{service.description}</p>
                                <span className="hidden items-center gap-2 text-sm font-bold uppercase tracking-wider group-hover:text-ya sm:flex">
                                    Discover more
                                    <ArrowUpRight aria-hidden="true" className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                                </span>
                            </Reveal>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
