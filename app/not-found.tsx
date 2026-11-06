import { ArrowRight, Bike, CarFront, Headphones, ShieldCheck } from 'lucide-react'
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
        <main className="min-h-[100svh] bg-ya pt-20 text-ink">
            <section className="wrap grid items-center gap-8 pb-12 pt-10 sm:pt-16 lg:grid-cols-2 lg:gap-12">
                <div>
                    <p className="display text-[clamp(8rem,26vw,19rem)] leading-[0.75] tracking-[-0.08em]">404</p>
                    <h1 className="display mt-8 max-w-md text-4xl sm:text-5xl">
                        Looks like you took a wrong turn.
                    </h1>
                    <p className="mt-5 text-lg font-medium text-ink/80">The page you&apos;re looking for isn&apos;t available.</p>
                    <Link className="btn btn-ink group mt-8" href="/">
                        Let&apos;s get you back on track
                        <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="border-2 border-ink bg-paper">
                    <div className="relative aspect-[5/4] overflow-hidden">
                        <p className="display absolute left-5 top-5 z-10 bg-ink px-3 py-2 text-xl text-paper sm:text-2xl">← Wrong turn</p>
                        <Image
                            alt="Ya Ride car"
                            className="absolute bottom-[12%] left-[-3%] z-10 h-auto w-[84%] max-w-none"
                            height={850}
                            priority
                            sizes="(min-width: 1024px) 560px, 90vw"
                            src="/images/yacar_angle.png"
                            width={1920}
                        />
                        <Image
                            alt="Ya delivery scooter"
                            className="absolute bottom-[10%] right-[2%] z-20 h-auto w-[34%] max-w-none"
                            height={1080}
                            priority
                            sizes="(min-width: 1024px) 190px, 34vw"
                            src="/images/ya_scooter.png"
                            width={1080}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-[12%] bg-ink">
                            <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 [background-image:repeating-linear-gradient(90deg,#f5f3ec_0_28px,transparent_28px_56px)]" />
                        </div>
                    </div>
                </div>
            </section>

            <section aria-label="Why choose Ya" className="border-t-2 border-ink bg-ink text-paper">
                <ul className="wrap grid grid-cols-2 gap-x-4 gap-y-6 py-8 sm:grid-cols-4">
                    {reassurance.map((item) => {
                        const Icon = item.icon
                        return (
                            <li className="flex items-start gap-3" key={item.title}>
                                <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-ya" />
                                <span><strong className="block font-display text-base">{item.title}</strong><span className="block text-xs leading-4 text-paper/65">{item.copy}</span></span>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}
