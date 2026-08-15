import { ArrowRight, CarFront, Headphones, MapPin, ShieldCheck, Bike } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const reassurance = [
    { icon: CarFront, title: 'Ride', copy: 'Get where you need to go' },
    { icon: Bike, title: 'Deliver', copy: 'Fast. Reliable. Ya.' },
    { icon: ShieldCheck, title: 'Safe & trusted', copy: 'Your safety, our priority' },
    { icon: Headphones, title: 'Support', copy: 'We’re here to help' },
] as const

export default function NotFound() {
    return (
        <main className="relative isolate min-h-[100svh] overflow-hidden bg-[#f8faf9] pt-28 text-slate-950 sm:pt-32">
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_73%_24%,rgba(220,230,230,0.9),transparent_25%),linear-gradient(108deg,#fff_0%,#fff_35%,#edf2f1_100%)]" />
            <div className="absolute inset-x-0 bottom-0 -z-20 h-[52%] bg-[linear-gradient(170deg,transparent_0_18%,rgba(203,214,212,0.5)_18.2%,rgba(255,255,255,0.85)_35%,rgba(225,233,231,0.7)_100%)]" />
            <div className="absolute right-[3%] top-[8%] -z-10 hidden h-[48%] w-[48%] rounded-[50%] border border-white/85 bg-white/25 blur-[1px] lg:block" />
            <div className="absolute right-[16%] top-[18%] -z-10 hidden h-48 w-14 rounded-t-[2rem] border-[11px] border-slate-300/50 border-b-0 lg:block" />
            <div className="absolute bottom-[-13rem] left-[-8rem] -z-10 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

            <div className="mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-7xl flex-col justify-between px-5 pb-8 sm:px-8 lg:px-10">
                <section className="grid items-center gap-8 pt-8 lg:grid-cols-[0.68fr_1.32fr] lg:gap-2 lg:pt-12">
                    <div className="relative z-20 max-w-xl">
                        <p className="text-[clamp(7rem,18vw,15rem)] font-extrabold leading-[0.72] tracking-[-0.1em] text-[#02bf63]">404</p>
                        <h1 className="mt-7 max-w-md text-3xl font-bold leading-tight tracking-[-0.045em] sm:text-4xl">
                            Looks like you took a wrong turn.
                        </h1>
                        <p className="mt-5 text-base text-slate-600 sm:text-lg">The page you&apos;re looking for isn&apos;t available.</p>
                        <Link className="group mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#02bf63] px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_28px_rgba(2,191,99,0.25)] transition hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-[0_22px_34px_rgba(2,191,99,0.34)]" href="/">
                            Let&apos;s get you back on track
                            <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <div className="relative mx-auto min-h-[330px] w-full max-w-3xl lg:min-h-[530px] lg:max-w-none">
                        <div className="absolute inset-x-[5%] bottom-[10%] h-16 rounded-[100%] bg-slate-900/15 blur-2xl" />
                        <div className="absolute bottom-[18%] right-[9%] hidden origin-bottom-right rotate-[-3deg] rounded-xl border-[5px] border-white bg-[#078a4b] px-6 py-4 text-xl font-bold text-white shadow-xl sm:block lg:right-[4%] lg:text-2xl">
                            <span className="mr-3 text-3xl leading-none">←</span> Wrong turn
                        </div>
                        <div className="absolute left-[13%] top-[21%] z-20 hidden rounded-[1.35rem] bg-white px-5 py-4 shadow-[0_16px_35px_rgba(15,23,42,0.14)] sm:block">
                            <div className="flex items-center gap-3">
                                <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-[#02bf63]"><MapPin aria-hidden="true" className="h-5 w-5 fill-current" /></span>
                                <span><strong className="block text-sm">Recalculating route…</strong><span className="block text-xs text-slate-500">Let&apos;s find another way.</span></span>
                            </div>
                            <span className="absolute -bottom-2 left-9 h-4 w-4 rotate-45 bg-white" />
                        </div>
                        <Image
                            alt="Ya Ride car"
                            className="absolute bottom-[8%] left-[4%] z-10 w-[82%] max-w-none object-contain drop-shadow-[0_28px_18px_rgba(15,23,42,0.3)] sm:left-[8%] sm:w-[75%]"
                            height={900}
                            priority
                            sizes="(min-width: 1024px) 56vw, 85vw"
                            src="/images/yacar_angle.png"
                            width={1200}
                        />
                        <Image
                            alt="Ya delivery scooter"
                            className="absolute bottom-0 right-[1%] z-20 w-[38%] max-w-none object-contain drop-shadow-[0_28px_20px_rgba(15,23,42,0.36)] sm:right-[4%] sm:w-[34%] lg:right-[2%]"
                            height={500}
                            priority
                            sizes="(min-width: 1024px) 28vw, 42vw"
                            src="/images/ya_scooter.png"
                            width={500}
                        />
                    </div>
                </section>

                <section aria-label="Why choose Ya" className="relative z-30 mx-auto mt-6 grid w-full max-w-4xl grid-cols-2 gap-x-4 gap-y-5 rounded-2xl border border-white/80 bg-white/70 p-5 shadow-[0_12px_35px_rgba(15,23,42,0.07)] backdrop-blur sm:grid-cols-4 sm:p-6">
                    {reassurance.map((item) => {
                        const Icon = item.icon
                        return (
                            <div className="flex items-center gap-3" key={item.title}>
                                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-[#02bf63]"><Icon aria-hidden="true" className="h-5 w-5" /></span>
                                <span><strong className="block text-sm leading-5">{item.title}</strong><span className="block text-[11px] leading-4 text-slate-500">{item.copy}</span></span>
                            </div>
                        )
                    })}
                </section>
            </div>
        </main>
    )
}
