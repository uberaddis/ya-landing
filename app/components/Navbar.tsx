'use client'

import { ArrowUpRight, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import LiquidGlass from './LiquidGlass'

const navigation = [
    { href: '/#home', label: 'Home', id: 'home' },
    { href: '/#about', label: 'About', id: 'about' },
    { href: '/#services', label: 'Services', id: 'services' },
    { href: '/#contact', label: 'Contact', id: 'contact' },
] as const

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeLink, setActiveLink] = useState('home')

    useEffect(() => {
        const syncActiveLink = () => {
            setActiveLink(window.location.hash.replace('#', '') || 'home')
        }

        syncActiveLink()
        window.addEventListener('hashchange', syncActiveLink)
        return () => window.removeEventListener('hashchange', syncActiveLink)
    }, [])

    const handleNavigation = (id: string) => {
        setActiveLink(id)
        setIsMenuOpen(false)
    }

    return (
        <header className="fixed inset-x-0 top-0 z-[99999] px-4 pt-4 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute left-1/2 top-0 h-28 w-2/3 -translate-x-1/2 rounded-full bg-emerald-200/25 blur-3xl" />
            <nav className="relative mx-auto flex h-[76px] w-full max-w-7xl items-center justify-between overflow-hidden rounded-[1.35rem] border border-white/70 bg-[linear-gradient(115deg,rgba(255,255,255,0.52),rgba(255,255,255,0.22)_42%,rgba(225,255,241,0.34))] px-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(15,23,42,0.08),0_22px_60px_rgba(15,23,42,0.2)] backdrop-blur-[22px] backdrop-saturate-[1.6] sm:px-5">
                <LiquidGlass />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,0.45),transparent_30%,transparent_68%,rgba(45,212,191,0.08))]" />
                <Link aria-label="Ya Ride home" className="relative flex items-center gap-3" href="/#home" onClick={() => handleNavigation('home')}>
                    <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-[0.9rem] bg-black p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.3)] ring-1 ring-white/50">
                        <Image alt="Ya Ride" className="h-full w-full object-contain" height={44} src="/logo_t.png" width={44} />
                    </span>
                    <span>
                        <span className="block text-lg font-bold tracking-tight text-slate-950">Ya Ride</span>
                        <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-800/70 sm:block">Move with ease</span>
                    </span>
                </Link>

                <div className="relative hidden items-center gap-1 rounded-2xl border border-white/55 bg-white/18 p-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.75)] md:flex">
                    {navigation.map((item) => (
                        <Link
                            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${activeLink === item.id ? 'bg-white/85 text-slate-950 shadow-[0_4px_12px_rgba(15,23,42,0.1)]' : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] hover:bg-white/20 hover:text-white'}`}
                            href={item.href}
                            key={item.id}
                            onClick={() => handleNavigation(item.id)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="relative flex items-center gap-2">
                    <Link className="group relative hidden h-11 items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-300 via-[var(--primary)] to-teal-400 px-4 text-sm font-bold text-slate-950 shadow-[0_10px_25px_rgba(2,191,99,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(2,191,99,0.35)] md:inline-flex" href="/become-driver">
                        <span className="absolute inset-0 -translate-x-full bg-white/35 transition duration-500 group-hover:translate-x-full" />
                        <span className="relative">Drive with us</span>
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                    <button
                        aria-expanded={isMenuOpen}
                        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        className="grid h-11 w-11 place-items-center rounded-xl border border-white/55 bg-white/30 text-slate-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.75)] transition hover:bg-white/55 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] md:hidden"
                        onClick={() => setIsMenuOpen((open) => !open)}
                        type="button"
                    >
                        {isMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
                    </button>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="relative mx-auto mt-3 w-full max-w-7xl overflow-hidden rounded-[1.35rem] border border-white/60 p-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_24px_60px_rgba(15,23,42,0.2)] md:hidden">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.68),rgba(234,255,247,0.42))] backdrop-blur-[26px] backdrop-saturate-[1.8]" />
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--primary)]/20 blur-2xl" />
                    <div className="flex flex-col gap-1">
                        {navigation.map((item) => (
                            <Link
                                className={`relative rounded-xl px-4 py-3 text-sm font-medium transition ${activeLink === item.id ? 'bg-white/85 text-slate-950 shadow-sm' : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] hover:bg-white/20 hover:text-white'}`}
                                href={item.href}
                                key={item.id}
                                onClick={() => handleNavigation(item.id)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link className="relative mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 via-[var(--primary)] to-teal-400 px-4 text-sm font-bold text-slate-950" href="/become-driver" onClick={() => setIsMenuOpen(false)}>
                            Drive with us
                            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
