'use client'

import { ArrowUpRight, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const navigation = [
    { href: '/#home', label: 'Home', id: 'home' },
    { href: '/#about', label: 'About', id: 'about' },
    { href: '/#services', label: 'Services', id: 'services' },
    { href: '/#contact', label: 'Contact', id: 'contact' },
] as const

// Width of the car on the road strip. Keep in sync with the `w-10` class below.
const CAR_WIDTH = '2.5rem'

export default function Navbar() {
    const pathname = usePathname()
    const isHome = pathname === '/'

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [spyActive, setSpyActive] = useState<string>('home')
    const [hovered, setHovered] = useState<string | null>(null)
    const [hidden, setHidden] = useState(false)
    const [compact, setCompact] = useState(false)
    const [box, setBox] = useState<{ x: number; w: number } | null>(null)

    const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
    const roadRef = useRef<HTMLDivElement>(null)

    // Only highlight a section while we are actually on the homepage.
    const active = isHome ? spyActive : null
    const target = hovered ?? active

    /* ── Scroll spy: which homepage section is under the viewport middle ── */
    useEffect(() => {
        if (!isHome) return

        const sections = navigation
            .map((item) => document.getElementById(item.id))
            .filter((el): el is HTMLElement => el !== null)

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setSpyActive(entry.target.id)
                }
            },
            { rootMargin: '-45% 0px -50% 0px' },
        )

        sections.forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [isHome])

    /* ── Scroll: road progress, hide on scroll down, compact bar ── */
    useEffect(() => {
        let lastY = window.scrollY
        let ticking = false
        let stopTimer = 0

        const update = () => {
            ticking = false
            const y = window.scrollY
            const max = document.documentElement.scrollHeight - window.innerHeight
            const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0

            const road = roadRef.current
            if (road) {
                road.style.setProperty('--p', String(progress))
                road.classList.add('is-moving')
                window.clearTimeout(stopTimer)
                stopTimer = window.setTimeout(() => road.classList.remove('is-moving'), 160)
            }

            setCompact(y > 40)
            if (y > 160 && y > lastY + 4) setHidden(true)
            else if (y < lastY - 4 || y <= 160) setHidden(false)
            lastY = y
        }

        const onScroll = () => {
            if (ticking) return
            ticking = true
            window.requestAnimationFrame(update)
        }

        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
            window.clearTimeout(stopTimer)
        }
    }, [])

    /* ── Sliding indicator follows the hovered / active link ── */
    useLayoutEffect(() => {
        const measure = () => {
            const el = target ? linkRefs.current[target] : null
            if (el) setBox({ x: el.offsetLeft, w: el.offsetWidth })
        }
        measure()
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [target])

    /* ── Mobile menu: lock scroll, Escape closes, close when widening ── */
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : ''
        if (!isMenuOpen) return

        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsMenuOpen(false)
        }
        const onResize = () => {
            if (window.innerWidth >= 768) setIsMenuOpen(false)
        }
        window.addEventListener('keydown', onKey)
        window.addEventListener('resize', onResize)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', onKey)
            window.removeEventListener('resize', onResize)
        }
    }, [isMenuOpen])

    const handleNavigation = useCallback((id: string) => {
        setSpyActive(id)
        setIsMenuOpen(false)
    }, [])

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 bg-ink text-paper transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] ${hidden && !isMenuOpen ? '-translate-y-full' : 'translate-y-0'}`}
            >
                <div className="nav-drop">
                    <nav className={`wrap flex items-center justify-between transition-[height] duration-300 ${compact ? 'h-12 sm:h-14' : 'h-14 sm:h-16'}`}>
                        <Link aria-label="Ya Ride home" className="group flex items-center gap-2 sm:gap-2.5" href="/#home" onClick={() => handleNavigation('home')}>
                            <Image
                                alt=""
                                className="relative top-px h-10 w-auto origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-6 group-hover:scale-110 sm:top-[2px] sm:h-12"
                                height={48}
                                priority
                                src="/logo_t.png"
                                width={56}
                            />
                            <span aria-hidden="true" className="display relative -top-px text-[2rem] leading-none text-paper sm:text-[2.6rem]">Ride</span>
                        </Link>

                        {/* Desktop links with a sliding highlight */}
                        <div className="relative hidden items-center md:flex" onMouseLeave={() => setHovered(null)}>
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-y-0 left-0 rounded-sm bg-ya transition-[transform,width,opacity] duration-[450ms] ease-[cubic-bezier(0.34,1.4,0.64,1)]"
                                style={{
                                    width: box?.w ?? 0,
                                    transform: `translateX(${box?.x ?? 0}px)`,
                                    opacity: target && box ? 1 : 0,
                                }}
                            />
                            {navigation.map((item) => (
                                <Link
                                    aria-current={active === item.id ? 'page' : undefined}
                                    className={`relative z-10 px-4 py-2.5 text-[0.95rem] font-bold transition-colors duration-200 ${target === item.id ? 'text-ink' : 'text-paper/80'}`}
                                    href={item.href}
                                    key={item.id}
                                    onBlur={() => setHovered(null)}
                                    onClick={() => handleNavigation(item.id)}
                                    onFocus={() => setHovered(item.id)}
                                    onMouseEnter={() => setHovered(item.id)}
                                    ref={(el) => {
                                        linkRefs.current[item.id] = el
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <a className="hidden h-11 items-center gap-2.5 rounded-sm border-2 border-paper/25 px-4 text-sm font-bold transition-colors hover:border-ya hover:text-ya lg:inline-flex" href="tel:9392">
                                <span aria-hidden="true" className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ya opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-ya" />
                                </span>
                                <Phone aria-hidden="true" className="h-4 w-4" />
                                9392
                            </a>

                            <Link className="group hidden h-11 items-center gap-2 overflow-hidden rounded-sm bg-ya px-5 font-display text-[0.95rem] font-bold text-ink transition-colors duration-200 hover:bg-paper md:inline-flex" href="/become-driver">
                                Drive with us
                                <span aria-hidden="true" className="relative block h-4 w-4 overflow-hidden">
                                    <ArrowUpRight className="absolute inset-0 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-full group-hover:-translate-y-full" />
                                    <ArrowUpRight className="absolute inset-0 h-4 w-4 -translate-x-full translate-y-full transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
                                </span>
                            </Link>

                            <button
                                aria-controls="mobile-menu"
                                aria-expanded={isMenuOpen}
                                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                                className="group relative h-11 w-11 rounded-sm border-2 border-paper/25 transition-colors hover:border-ya md:hidden"
                                onClick={() => setIsMenuOpen((open) => !open)}
                                type="button"
                            >
                                <span className={`absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 bg-paper transition-all duration-300 group-hover:bg-ya ${isMenuOpen ? 'rotate-45' : '-translate-y-[7px]'}`} />
                                <span className={`absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 bg-paper transition-all duration-300 group-hover:bg-ya ${isMenuOpen ? 'scale-x-0 opacity-0' : ''}`} />
                                <span className={`absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 bg-paper transition-all duration-300 group-hover:bg-ya ${isMenuOpen ? '-rotate-45' : 'translate-y-[5px]'}`} />
                            </button>
                        </div>
                    </nav>

                    {/* The road: a Ya car drives along it as the page scrolls */}
                    <div aria-hidden="true" className="road relative h-5 overflow-hidden border-t border-paper/10" ref={roadRef}>
                        <div className="absolute inset-x-0 bottom-[3px] h-0.5 [background-image:repeating-linear-gradient(90deg,rgba(245,243,236,0.28)_0_10px,transparent_10px_20px)]" />
                        <div
                            className="absolute bottom-[3px] left-0 h-0.5 bg-ya"
                            style={{ width: `calc(var(--p, 0) * (100% - ${CAR_WIDTH}) + ${CAR_WIDTH} / 2)`, transition: 'width 120ms linear' }}
                        />
                        <div
                            className="absolute bottom-[4px]"
                            style={{ left: `calc(var(--p, 0) * (100% - ${CAR_WIDTH}))`, transition: 'left 120ms linear' }}
                        >
                            <div className="car-enter">
                                <div className="car-bob">
                                    {/* The source image faces left, so mirror it to face the direction of travel. */}
                                    <Image alt="" className="h-auto w-10 max-w-none -scale-x-100" height={850} sizes="40px" src="/images/yacar_angle.png" width={1920} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile full-screen menu */}
            <div
                aria-hidden={!isMenuOpen}
                className={`fixed inset-0 z-40 flex flex-col justify-between bg-ya pb-8 pt-[5.25rem] text-ink transition-[clip-path] duration-[650ms] ease-[cubic-bezier(0.7,0,0.2,1)] md:hidden ${isMenuOpen ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)]'}`}
                id="mobile-menu"
                inert={!isMenuOpen}
            >
                <nav aria-label="Mobile" className="wrap flex flex-col">
                    {navigation.map((item, index) => (
                        <Link
                            className={`group flex items-baseline gap-4 border-b-2 border-ink py-4 transition-all duration-500 ease-out ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            href={item.href}
                            key={item.id}
                            onClick={() => handleNavigation(item.id)}
                            style={{ transitionDelay: isMenuOpen ? `${250 + index * 70}ms` : '0ms' }}
                        >
                            <span className="text-sm font-bold tabular-nums">0{index + 1}</span>
                            <span className={`display text-[clamp(3rem,15vw,5.5rem)] transition-colors ${active === item.id ? 'text-paper' : ''} group-active:text-paper`}>
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>

                <div
                    className={`wrap flex flex-col gap-3 transition-all duration-500 ease-out ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                    style={{ transitionDelay: isMenuOpen ? '600ms' : '0ms' }}
                >
                    <a className="display text-5xl" href="tel:9392">
                        Call 9392
                    </a>
                    <Link className="btn btn-ink w-full" href="/become-driver" onClick={() => setIsMenuOpen(false)}>
                        Drive with us
                        <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </>
    )
}
