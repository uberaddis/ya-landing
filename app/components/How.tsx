import Reveal from './Reveal'

const steps = [
    {
        number: '01',
        title: 'Request a ride',
        description: 'Open the app, enter your destination, and request a ride with just a tap.',
    },
    {
        number: '02',
        title: 'Meet your driver',
        description: 'Your driver arrives at your location, ready to take you where you need to go.',
    },
    {
        number: '03',
        title: 'Track your ride',
        description: 'Follow your route in real time for a clear and confident journey.',
    },
    {
        number: '04',
        title: 'Arrive safely',
        description: 'Get to your destination and carry on with the rest of your day.',
    },
] as const

export default function How() {
    return (
        <section className="w-full bg-paper py-20 text-ink sm:py-28">
            <div className="wrap">
                <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
                    <Reveal className="lg:col-span-8">
                        <p className="marker text-ya-deep">Simple by design</p>
                        <h2 className="display mt-5 text-[clamp(2.5rem,7vw,5.5rem)]">
                            From pickup to arrival, effortlessly.
                        </h2>
                    </Reveal>
                    <Reveal className="max-w-md text-lg leading-7 text-muted lg:col-span-4 lg:justify-self-end" delay={150}>
                        <p>A smooth ride starts with a simple process. Here&apos;s how Ya gets you moving.</p>
                    </Reveal>
                </div>

                <ol className="mt-14 border-b-2 border-ink sm:mt-20">
                    {steps.map((step, index) => (
                        <li className="border-t-2 border-ink" key={step.number}>
                            <Reveal className="group grid items-baseline gap-x-8 gap-y-2 py-7 transition-colors hover:bg-ya sm:grid-cols-[7rem_1fr_1fr] sm:py-9 lg:grid-cols-[9rem_1fr_1.1fr] lg:px-4" delay={index * 90}>
                                <span className="display text-5xl text-ya-deep transition-all duration-300 group-hover:translate-x-2 group-hover:text-ink sm:text-6xl">{step.number}</span>
                                <h3 className="display text-3xl sm:text-4xl">{step.title}</h3>
                                <p className="max-w-md text-base leading-7 text-ink/75 group-hover:text-ink sm:text-lg">{step.description}</p>
                            </Reveal>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}
