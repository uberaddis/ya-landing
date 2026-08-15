import { ArrowUpRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FaAndroid, FaApple } from 'react-icons/fa'

export default function AppDownload() {
    return (
        <section className="relative isolate w-full overflow-hidden bg-[#edf9f2] py-20 sm:py-24">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_20%,rgba(2,191,99,0.16),transparent_28%),radial-gradient(circle_at_90%_75%,rgba(45,212,191,0.18),transparent_25%)]" />
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
                <div className="relative overflow-hidden rounded-[2rem] bg-[#071b13] px-6 py-10 shadow-[0_30px_80px_rgba(6,23,16,0.25)] sm:px-10 sm:py-14 lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12 lg:px-16">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_15%,rgba(2,191,99,0.34),transparent_30%),radial-gradient(circle_at_88%_72%,rgba(45,212,191,0.14),transparent_25%)]" />
                    <div className="relative z-10">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200 backdrop-blur">
                            <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                            Ya in your pocket
                        </span>
                        <h2 className="mt-5 max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            Everything you need to move, in one app.
                        </h2>
                        <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
                            Request rides, follow your driver, and manage your trips with ease. Ya is designed to make every journey feel simple from the first tap.
                        </p>
                        <div className="mt-7 flex flex-wrap gap-2">
                            {['Book with ease', 'Track your trip', 'Move on your time'].map((benefit) => (
                                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80" key={benefit}>{benefit}</span>
                            ))}
                        </div>
                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <StoreButton icon={FaApple} label="Download on the" store="App Store" />
                            <StoreButton icon={FaAndroid} label="Get it on" store="Google Play" />
                        </div>
                    </div>

                    <div className="relative mt-10 flex min-h-[380px] items-end justify-center lg:mt-0 lg:min-h-[560px]">
                        <div className="absolute bottom-2 h-28 w-4/5 rounded-full bg-[var(--primary)]/30 blur-3xl" />
                        <div className="absolute bottom-6 h-7 w-72 rounded-[100%] bg-black/45 blur-xl" />
                        <div className="relative z-10 [perspective:1400px]">
                            <div className="relative [transform-style:preserve-3d] transition duration-700 hover:[transform:rotateY(-2deg)_rotateX(0deg)_rotateZ(0deg)_translateY(-14px)] [transform:rotateY(-12deg)_rotateX(4deg)_rotateZ(4deg)]">
                                <div className="absolute inset-x-[7%] bottom-0 top-[4%] -z-10 rounded-[2.8rem] bg-black/55 blur-2xl [transform:translateZ(-28px)]" />
                                <div className="absolute inset-x-[7%] bottom-[1%] top-[3%] rounded-[2.8rem] border border-white/20 bg-gradient-to-br from-white/20 via-transparent to-transparent [transform:translateZ(4px)]" />
                                <Image
                                    alt="Ya Ride mobile app"
                                    className="relative h-auto w-[220px] object-contain drop-shadow-[0_34px_30px_rgba(0,0,0,0.58)] sm:w-[270px] lg:w-[300px]"
                                    height={1000}
                                    sizes="(min-width: 1024px) 300px, (min-width: 640px) 270px, 220px"
                                    src="/images/iphone15.png"
                                    width={500}
                                />
                                <div className="pointer-events-none absolute inset-x-[13%] top-[7%] h-[38%] rounded-t-[2rem] bg-gradient-to-br from-white/25 via-white/5 to-transparent opacity-70 [transform:translateZ(8px)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function StoreButton({
    icon: Icon,
    label,
    store,
}: {
    icon: typeof FaApple;
    label: string;
    store: string;
}) {
    return (
        <Link className="group inline-flex min-w-44 items-center gap-3 rounded-xl border border-white/15 bg-white px-4 py-3 text-slate-950 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:bg-emerald-50" href="/coming-soon">
            <Icon aria-hidden="true" className="text-3xl" />
            <span className="text-left">
                <span className="block text-[10px] font-medium leading-none text-slate-500">{label}</span>
                <span className="mt-1 block text-sm font-bold leading-none">{store}</span>
            </span>
            <ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4 text-emerald-700 opacity-0 transition group-hover:opacity-100" />
        </Link>
    )
}
