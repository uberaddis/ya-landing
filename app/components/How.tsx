import { CarFront, MapPinCheck, Route, Smartphone } from 'lucide-react'

const steps = [
    {
        icon: Smartphone,
        number: '01',
        title: 'Request a ride',
        description: 'Open the app, enter your destination, and request a ride with just a tap.',
        accent: 'from-emerald-400 to-green-600',
    },
    {
        icon: CarFront,
        number: '02',
        title: 'Meet your driver',
        description: 'Your driver arrives at your location, ready to take you where you need to go.',
        accent: 'from-teal-400 to-cyan-600',
    },
    {
        icon: Route,
        number: '03',
        title: 'Track your ride',
        description: 'Follow your route in real time for a clear and confident journey.',
        accent: 'from-lime-400 to-emerald-600',
    },
    {
        icon: MapPinCheck,
        number: '04',
        title: 'Arrive safely',
        description: 'Get to your destination and carry on with the rest of your day.',
        accent: 'from-green-400 to-teal-600',
    },
] as const

export default function How() {
    return (
        <section className="relative w-full overflow-hidden bg-white py-20 sm:py-24">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-xl">
                        <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                            Simple by design
                        </span>
                        <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                            From pickup to arrival, effortlessly.
                        </h2>
                    </div>
                    <p className="max-w-md text-base leading-7 text-slate-600 md:text-right">
                        A smooth ride starts with a simple process. Here&apos;s how Ya gets you moving.
                    </p>
                </div>

                <div className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-px border-t border-dashed border-emerald-200 lg:block" />
                    {steps.map((step) => {
                        const Icon = step.icon

                        return (
                            <article className="group relative rounded-[1.65rem] border border-slate-100 bg-[#f8faf8] p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:bg-white hover:shadow-[0_24px_55px_rgba(6,95,70,0.12)]" key={step.number}>
                                <div className={`absolute inset-x-0 top-0 h-1 rounded-t-[1.65rem] bg-gradient-to-r ${step.accent}`} />
                                <div className="relative flex items-start justify-between">
                                    <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${step.accent} text-white shadow-lg shadow-emerald-900/10 transition duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                        <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={1.8} />
                                    </div>
                                    <span className="text-sm font-bold tracking-[0.18em] text-slate-300">{step.number}</span>
                                </div>
                                <h3 className="mt-8 text-xl font-bold tracking-tight text-slate-950">{step.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
