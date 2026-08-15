import { ArrowUpRight, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
    return (
        <section id="about" className="relative isolate w-full overflow-hidden bg-[#f8faf8] py-20 sm:py-24">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_20%,rgba(2,191,99,0.16),transparent_25%),radial-gradient(circle_at_10%_85%,rgba(45,212,191,0.12),transparent_24%)]" />

            <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
                <div className="relative order-2 overflow-hidden rounded-[2rem] bg-[#071b13] p-6 shadow-[0_30px_80px_rgba(6,23,16,0.24)] lg:order-1 sm:p-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(2,191,99,0.38),transparent_32%),linear-gradient(135deg,#061710,#0b291a)]" />
                    <div className="relative flex min-h-[310px] flex-col justify-between sm:min-h-[390px]">
                        <span className="w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200 backdrop-blur">
                            Moving Addis forward
                        </span>
                        <Image
                            alt="Ya Ride vehicle"
                            className="absolute bottom-3 left-1/2 w-[94%] max-w-[620px] -translate-x-1/2 object-contain drop-shadow-[0_28px_24px_rgba(0,0,0,0.42)] sm:bottom-4 sm:w-[98%]"
                            height={600}
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            src="/images/yacar_side.png"
                            width={700}
                        />
                        <div className="relative z-10 max-w-[180px] rounded-2xl border border-white/15 bg-white/10 p-4 text-sm leading-6 text-white/80 backdrop-blur-md">
                            Everyday movement, made simpler.
                        </div>
                    </div>
                </div>

                <div className="order-1 lg:order-2">
                    <span className="inline-flex rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 shadow-sm">
                        About Ya Ride
                    </span>
                    <h2 className="mt-5 max-w-xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                        A better way to move through your city.
                    </h2>
                    <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
                        Ya Ride is your go-to app for safe, reliable, and affordable transportation. Whether you need a quick ride across town or a longer journey, we connect you with professional drivers in minutes.
                    </p>
                    <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                        With real-time tracking and transparent pricing, Ya Ride helps make every trip feel simple from pickup to drop-off.
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        {['Professional drivers', 'Real-time trip tracking', 'Clear, transparent pricing', 'Built for everyday journeys'].map((benefit) => (
                            <div className="flex items-center gap-3 rounded-xl border border-black/5 bg-white/75 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm" key={benefit}>
                                <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                                    <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
                                </span>
                                {benefit}
                            </div>
                        ))}
                    </div>

                    <Link className="mt-9 inline-flex h-12 items-center gap-2 rounded-xl bg-slate-950 px-6 font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-[var(--primary)] hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2" href="/coming-soon">
                        Download the app
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
