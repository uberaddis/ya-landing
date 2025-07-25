'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import NavbarPrice from './NavbarPrice';
import Image from 'next/image';
import Wave from './Wave';

export default function Navbar() {
    const navbarRef = useRef<HTMLDivElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navbarRef]);

    return (
        <div ref={navbarRef} className={`fixed ${isScrolled && "shadow-[0_2px_15px_#000000aa]"} duration-300 left-0 top-0 w-full bg-[var(--foreground)] flex flex-col items-center z-[99999]`}>
            <div className="absolute left-[calc(1/8*100%)] top-1/2 -translate-y-1/2">
                <Image src="/logo_vb.png" alt="Ya Logo" width={100} height={100} className="object-contain" />
            </div>
            <div className="w-full flex justify-center px-20">
                <NavbarPrice />
            </div>
            <div className="w-full flex justify-center bg-[var(--foreground)] px-20 text-[var(--background)]">
                <div className="max-w-[1150px] w-full flex items-center justify-between">
                    <div className="flex w-5 h-full"></div>
                    <div className="flex items-center gap-6 py-4">
                        <Link href="#" className={`relative text-sm before:absolute before:bottom-0 before:w-full before:h-1 ${activeLink === "" ? "before:bg-[var(--primary)] font-semibold" : "font-extralight"} before:duration-300`} onClick={() => setActiveLink("")}>Home</Link>
                        <Link href="#about" className={`relative text-sm before:absolute before:bottom-0 before:w-full before:h-1 ${activeLink === "about" ? "before:bg-[var(--primary)] font-semibold" : "font-extralight"} before:duration-300`} onClick={() => setActiveLink("about")}>About</Link>
                        <Link href="#services" className={`relative text-sm before:absolute before:bottom-0 before:w-full before:h-1 ${activeLink === "services" ? "before:bg-[var(--primary)] font-semibold" : "font-extralight"} before:duration-300`} onClick={() => setActiveLink("services")}>Services</Link>
                        <Link href="#contact" className={`relative text-sm before:absolute before:bottom-0 before:w-full before:h-1 ${activeLink === "contact" ? "before:bg-[var(--primary)] font-semibold" : "font-extralight"} before:duration-300`} onClick={() => setActiveLink("contact")}>Contact</Link>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-[var(--foreground)] text-[var(--background)] text-[12px] w-32 flex justify-center py-[7.35px]">
                            Become a Driver
                        </div>
                    </div>
                </div>
            </div>
            <Wave />
        </div>
    )
}
