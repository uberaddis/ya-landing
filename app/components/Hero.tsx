import { ArrowRight, Check, Phone, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
    return (
        <section id="home" className="relative isolate min-h-[740px] w-full overflow-hidden bg-[#061710] pb-14 pt-28 sm:pb-20 sm:pt-32 lg:flex lg:min-h-[780px] lg:items-center">
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_18%,rgba(2,191,99,0.42),transparent_28%),radial-gradient(circle_at_88%_52%,rgba(45,212,191,0.2),transparent_25%),linear-gradient(125deg,#04110c,#071b13_46%,#0b291a)]" />
            <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
            <div className="absolute -left-28 top-1/2 -z-10 h-80 w-80 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-3xl" />

            <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:px-10">
                <div className="relative z-10 pt-5 lg:pt-0">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200 backdrop-blur">
                        <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                        Addis, on your schedule
                    </span>
                    <h1 className="mt-6 max-w-2xl text-5xl font-bold leading-[0.96] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
                        Your city moves.
                        <span className="block bg-gradient-to-r from-emerald-200 via-[var(--primary)] to-teal-300 bg-clip-text text-transparent">So do you.</span>
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
                        Rides, deliveries, and everyday essentials—ready when you are. Ya brings the city closer with a few simple taps.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 via-[var(--primary)] to-teal-400 px-6 font-bold text-slate-950 shadow-[0_14px_30px_rgba(2,191,99,0.28)] transition hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(2,191,99,0.4)]" href="/coming-soon">
                            Download Ya
                            <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
                        </Link>
                        <Link className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 font-semibold text-white backdrop-blur transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/15" href="/become-driver">
                            Drive with us
                        </Link>
                    </div>

                    <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/70">
                        {['Request in seconds', 'Track your journey', 'Move with confidence'].map((item) => (
                            <span className="inline-flex items-center gap-2" key={item}>
                                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-300/15 text-emerald-200">
                                    <Check aria-hidden="true" className="h-3 w-3" strokeWidth={3} />
                                </span>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
                    <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.06] shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:min-h-[440px] lg:min-h-[560px]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_24%,rgba(2,191,99,0.42),transparent_26%),linear-gradient(145deg,rgba(255,255,255,0.1),transparent_55%)]" />
                        <div className="absolute bottom-[17%] left-1/2 h-10 w-[72%] -translate-x-1/2 rounded-[100%] bg-black/45 blur-xl" />
                        <div className="absolute bottom-[15%] left-1/2 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-300/55 to-transparent" />
                        <Image
                            alt="Ya Ride vehicle ready for a trip"
                            className="absolute bottom-[15%] left-[46%] z-10 w-[96%] max-w-none -translate-x-1/2 object-contain drop-shadow-[0_32px_24px_rgba(0,0,0,0.5)] sm:left-[45%] sm:w-[90%] lg:w-[94%]"
                            height={900}
                            priority
                            sizes="(min-width: 1024px) 55vw, (min-width: 640px) 620px, 100vw"
                            src="/images/yacar_angle.png"
                            width={1200}
                        />
                        <div className="absolute left-5 top-5 rounded-2xl border border-white/15 bg-slate-950/55 p-4 text-white shadow-lg backdrop-blur-md sm:left-7 sm:top-7">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200">One app</p>
                            <p className="mt-1 text-sm font-semibold">Rides. Food. Delivery.</p>
                        </div>
                        <div className="absolute right-[5%] bottom-[15%] z-[15] hidden [perspective:1000px] md:block">
                            <div className="relative transition duration-500 hover:[transform:rotateY(-3deg)_rotateX(0deg)_rotateZ(0deg)_translateY(-10px)] [transform:rotateY(-18deg)_rotateX(7deg)_rotateZ(-5deg)]">
                                <div className="absolute inset-x-[12%] bottom-[5%] h-8 rounded-[100%] bg-black/45 blur-lg [transform:translateZ(-20px)]" />
                                <Image
                                    alt="Ya delivery scooter"
                                    className="relative w-[145px] object-contain drop-shadow-[0_22px_18px_rgba(0,0,0,0.55)] lg:w-[205px]"
                                    height={300}
                                    sizes="(min-width: 1280px) 205px, 145px"
                                    src="/images/ya_scooter.png"
                                    width={250}
                                />
                                <div className="pointer-events-none absolute inset-x-[16%] top-[14%] h-[35%] rounded-full bg-gradient-to-br from-white/25 to-transparent [transform:translateZ(6px)]" />
                            </div>
                        </div>
                        <a className="absolute right-4 top-12 z-20 [perspective:800px] sm:right-7 sm:top-14" href="tel:8455">
                            <span className="absolute -top-10 left-7 h-10 w-px bg-gradient-to-b from-white/20 to-emerald-200/75" />
                            <span className="absolute -top-10 right-7 h-10 w-px bg-gradient-to-b from-white/20 to-emerald-200/75" />
                            <span className="absolute -top-2 left-6 h-3 w-3 rounded-full border border-white/50 bg-slate-950 shadow" />
                            <span className="absolute -top-2 right-6 h-3 w-3 rounded-full border border-white/50 bg-slate-950 shadow" />
                            <span className="relative flex items-center gap-3 rounded-xl border border-emerald-300/70 bg-white px-4 py-3 text-slate-950 shadow-[0_18px_30px_rgba(0,0,0,0.32)] transition duration-300 hover:[transform:rotateY(0deg)_rotateZ(0deg)_translateY(-5px)] [transform:rotateY(-8deg)_rotateZ(3deg)]">
                                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--primary)]">
                                    <Phone aria-hidden="true" className="h-4 w-4" />
                                </span>
                                <span>
                                    <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Order now</span>
                                    <span className="block text-lg font-bold leading-5">8455</span>
                                </span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
