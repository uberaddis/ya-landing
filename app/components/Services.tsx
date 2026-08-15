import { ArrowUpRight, Car, Package, ShoppingBag, UtensilsCrossed } from 'lucide-react'

const services = [
    {
        icon: Car,
        title: 'Ride Hailing',
        description: 'Get a ride in minutes with reliable drivers. Safe, fast, and affordable transportation whenever you need it.',
        label: '01',
        accent: 'from-emerald-400 via-green-500 to-teal-600',
    },
    {
        icon: UtensilsCrossed,
        title: 'Food Delivery',
        description: 'Delicious meals from your favorite restaurants delivered hot and fresh to your doorstep.',
        label: '02',
        accent: 'from-lime-400 via-emerald-500 to-green-600',
    },
    {
        icon: Package,
        title: 'Package Delivery',
        description: 'Send packages across the city with real-time tracking and a delivery service you can trust.',
        label: '03',
        accent: 'from-teal-400 via-cyan-500 to-sky-600',
    },
    {
        icon: ShoppingBag,
        title: 'Grocery Delivery',
        description: 'Fresh groceries and essentials from local stores, delivered when you need them.',
        label: '04',
        accent: 'from-green-400 via-emerald-500 to-lime-600',
    },
] as const

export default function Services() {
    return (
        <section id="services" className="relative isolate w-full overflow-hidden bg-[#071b13] py-20 sm:py-24">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_88%_8%,rgba(2,191,99,0.3),transparent_26%),radial-gradient(circle_at_8%_85%,rgba(45,212,191,0.16),transparent_30%),linear-gradient(135deg,#061710,#0b291a)]" />
            <div className="absolute left-1/2 top-0 -z-10 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200 backdrop-blur">
                            Everything within reach
                        </span>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            One app, more ways to move your day.
                        </h2>
                    </div>
                    <p className="max-w-md text-sm leading-6 text-white/70 md:text-right">
                        From the road to your doorstep, Ya brings the essentials together in one seamless experience.
                    </p>
                </div>

                <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {services.map((service) => {
                        const Icon = service.icon

                        return (
                            <article
                                className="group relative min-h-[320px] overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:border-white/35 hover:bg-white/[0.14] hover:shadow-[0_30px_80px_rgba(0,0,0,0.3)] sm:p-7"
                                key={service.title}
                            >
                                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${service.accent}`} />
                                <div className={`absolute -right-16 -top-16 h-36 w-36 rounded-full bg-gradient-to-br ${service.accent} opacity-20 blur-2xl transition duration-500 group-hover:scale-150 group-hover:opacity-40`} />

                                <div className="relative flex h-full flex-col">
                                    <div className="flex items-start justify-between">
                                        <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${service.accent} shadow-lg shadow-black/20 transition duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                            <Icon aria-hidden="true" className="h-7 w-7 text-white" strokeWidth={1.8} />
                                        </div>
                                        <span className="text-sm font-semibold tracking-[0.2em] text-white/40">{service.label}</span>
                                    </div>

                                    <div className="mt-auto pt-12">
                                        <h3 className="text-xl font-bold tracking-tight text-white">{service.title}</h3>
                                        <p className="mt-3 text-sm leading-6 text-white/65">{service.description}</p>
                                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-200 opacity-80 transition duration-300 group-hover:gap-3 group-hover:opacity-100">
                                            Discover more
                                            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
