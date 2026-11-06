import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FaAndroid, FaApple } from 'react-icons/fa'
import Parallax from './Parallax'
import Reveal from './Reveal'

export default function AppDownload() {
    return (
        <section className="w-full bg-paper py-20 text-ink sm:py-28">
            <div className="wrap">
                <Reveal className="grid border-2 border-ink lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="flex flex-col justify-between gap-10 p-7 sm:p-12">
                        <div>
                            <p className="marker text-ya-deep">Ya in your pocket</p>
                            <h2 className="display mt-5 text-[clamp(2.5rem,6vw,4.75rem)]">
                                Everything you need to move, in one app.
                            </h2>
                            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                                Request rides, follow your driver, and manage your trips with ease. Ya is designed to make every journey feel simple from the first tap.
                            </p>
                            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-display text-lg font-bold tracking-tight">
                                {['Book with ease', 'Track your trip', 'Move on your time'].map((benefit) => (
                                    <li className="flex items-center gap-2" key={benefit}>
                                        <span aria-hidden="true" className="h-2.5 w-2.5 bg-ya" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <StoreButton icon={FaApple} label="Download on the" store="App Store" />
                            <StoreButton icon={FaAndroid} label="Get it on" store="Google Play" />
                        </div>
                    </div>

                    <div className="relative flex items-end justify-center overflow-hidden border-t-2 border-ink bg-ya px-8 pt-12 lg:border-l-2 lg:border-t-0">
                        <Parallax axis="y" from={70} to={-25}>
                        <Image
                            alt="Ya Ride mobile app"
                            className="relative -mb-16 block h-auto w-[240px] translate-y-0 object-contain sm:w-[280px] lg:w-[300px]"
                            height={1440}
                            sizes="(min-width: 1024px) 300px, 280px"
                            src="/images/iphone15.png"
                            width={648}
                        />
                        </Parallax>
                    </div>
                </Reveal>
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
        <Link className="group inline-flex min-w-48 items-center gap-3 rounded-md border-2 border-ink bg-ink px-5 py-3 text-paper transition-colors hover:bg-ya hover:text-ink" href="/coming-soon">
            <Icon aria-hidden="true" className="text-3xl" />
            <span className="text-left">
                <span className="block text-[10px] font-medium uppercase leading-none tracking-wider opacity-70">{label}</span>
                <span className="mt-1 block font-display text-base font-bold leading-none">{store}</span>
            </span>
            <ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4" />
        </Link>
    )
}
