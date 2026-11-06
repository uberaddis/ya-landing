import { ArrowRight, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Parallax from './Parallax'

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties

export default function Hero() {
    return (
        <section id="home" className="flex w-full flex-col justify-center border-b-2 border-ink bg-ya pt-24 text-ink sm:pt-28 lg:min-h-[calc(100svh-2.5rem)]">
            <div className="wrap grid items-center gap-8 pb-10 sm:pb-14 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-7">
                    <p className="marker fade-up" style={delay(100)}>Addis, on your schedule</p>
                    <h1 className="display mt-5 text-[clamp(3.2rem,min(11vw,16svh),8.75rem)] lg:mt-6">
                        <span className="-my-[0.08em] block overflow-hidden py-[0.08em]">
                            <span className="rise" style={delay(200)}>Your city moves.</span>
                        </span>
                        <span className="-my-[0.08em] block overflow-hidden py-[0.08em] text-paper">
                            <span className="rise" style={delay(340)}>So do you.</span>
                        </span>
                    </h1>
                    <p className="fade-up mt-6 max-w-xl text-lg font-medium leading-7 text-ink/80 sm:text-xl sm:leading-8 lg:mt-7" style={delay(620)}>
                        Rides, deliveries, and everyday essentials—ready when you are. Ya brings the city closer with a few simple taps.
                    </p>

                    <div className="fade-up mt-7 flex flex-col gap-3 sm:flex-row lg:mt-8" style={delay(760)}>
                        <Link className="btn btn-ink group" href="/coming-soon">
                            Download Ya
                            <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link className="btn btn-line" href="/become-driver">
                            Drive with us
                        </Link>
                    </div>

                    <ul className="mt-9 grid border-t-2 border-ink sm:grid-cols-3 lg:mt-10">
                        {['Request in seconds', 'Track your journey', 'Move with confidence'].map((item, index) => (
                            <li className="fade-up flex items-baseline gap-3 border-b-2 border-ink py-3.5 font-display text-lg font-bold tracking-tight sm:border-b-0 sm:pr-4 sm:text-base lg:text-lg" key={item} style={delay(900 + index * 110)}>
                                <span className="text-sm text-paper">0{index + 1}</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:col-span-5">
                    <Parallax axis="y" from={0} mode="scroll" to={-70}>
                        <div className="fade-up border-2 border-ink bg-paper" style={delay(300)}>
                            <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:h-[clamp(19rem,48svh,31rem)]">
                                <p className="display absolute left-5 top-5 z-10 text-2xl leading-[1.05] sm:text-3xl">
                                    Rides.<br />Food.<br />Delivery.
                                </p>
                                <span className="absolute right-5 top-5 z-10 rounded-sm bg-ink px-2 py-1 text-xs font-bold uppercase tracking-wider text-paper">One app</span>
                                <Image
                                    alt="Ya Ride vehicle ready for a trip"
                                    className="slide-l absolute bottom-[12%] left-[-3%] z-10 h-auto w-[84%] max-w-none"
                                    height={850}
                                    priority
                                    sizes="(min-width: 1024px) 430px, 90vw"
                                    src="/images/yacar_angle.png"
                                    style={delay(550)}
                                    width={1920}
                                />
                                <Image
                                    alt="Ya delivery scooter"
                                    className="slide-r absolute bottom-[10%] right-[2%] z-20 h-auto w-[34%] max-w-none"
                                    height={1080}
                                    priority
                                    sizes="(min-width: 1024px) 170px, 34vw"
                                    src="/images/ya_scooter.png"
                                    style={delay(850)}
                                    width={1080}
                                />
                                {/* road: the dashes run underneath the vehicles */}
                                <div className="absolute inset-x-0 bottom-0 h-[12%] bg-ink">
                                    <div className="road-run absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 [background-image:repeating-linear-gradient(90deg,#f5f3ec_0_28px,transparent_28px_56px)]" />
                                </div>
                            </div>
                            <a className="group flex items-center justify-between gap-4 border-t-2 border-ink bg-ink px-5 py-4 text-paper transition-colors hover:bg-paper hover:text-ink" href="tel:9392">
                                <span className="flex items-center gap-3">
                                    <Phone aria-hidden="true" className="h-5 w-5 text-ya group-hover:text-ink" />
                                    <span className="text-sm font-bold uppercase tracking-wider">Order now</span>
                                </span>
                                <span className="display text-4xl text-ya group-hover:text-ink">9392</span>
                            </a>
                        </div>
                    </Parallax>
                </div>
            </div>
        </section>
    )
}
