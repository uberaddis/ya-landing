import { ArrowUpRight, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Parallax from './Parallax'
import Reveal from './Reveal'

export default function About() {
    return (
        <section id="about" className="on-dark w-full overflow-x-clip bg-ink py-20 text-paper sm:py-28">
            <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <Reveal className="order-2 lg:order-1" variant="left">
                    <p className="marker text-ya">Moving Addis forward</p>
                    <div className="relative mt-8">
                        <Parallax axis="x" className="relative z-10" from={-110} to={0}>
                        <Image
                            alt="Ya Ride vehicle"
                            className="relative z-10 block h-auto w-full max-w-none"
                            height={850}
                            sizes="(min-width: 1024px) 560px, 100vw"
                            src="/images/yacar_side.png"
                            width={1920}
                        />
                        </Parallax>
                        <div className="relative z-0 -mt-3 h-3 w-full bg-ya" />
                    </div>
                    <p className="display mt-8 max-w-xs text-3xl text-paper/90">Everyday movement, made simpler.</p>
                </Reveal>

                <Reveal className="order-1 lg:order-2" delay={150} variant="right">
                    <p className="marker text-ya">About Ya Ride</p>
                    <h2 className="display mt-5 text-[clamp(2.5rem,6vw,4.75rem)]">
                        A better way to move through your city.
                    </h2>
                    <p className="mt-7 max-w-xl text-lg leading-8 text-paper/75">
                        Ya Ride is your go-to app for safe, reliable, and affordable transportation. Whether you need a quick ride across town or a longer journey, we connect you with professional drivers in minutes.
                    </p>
                    <p className="mt-4 max-w-xl text-lg leading-8 text-paper/75">
                        With real-time tracking and transparent pricing, Ya Ride helps make every trip feel simple from pickup to drop-off.
                    </p>

                    <ul className="mt-9 border-t border-paper/25">
                        {['Professional drivers', 'Real-time trip tracking', 'Clear, transparent pricing', 'Built for everyday journeys'].map((benefit) => (
                            <li className="flex items-center gap-4 border-b border-paper/25 py-4 font-display text-lg font-bold tracking-tight" key={benefit}>
                                <Check aria-hidden="true" className="h-5 w-5 shrink-0 text-ya" strokeWidth={3} />
                                {benefit}
                            </li>
                        ))}
                    </ul>

                    <Link className="btn btn-green mt-10 !border-ya" href="/coming-soon">
                        Download the app
                        <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
                    </Link>
                </Reveal>
            </div>
        </section>
    )
}
