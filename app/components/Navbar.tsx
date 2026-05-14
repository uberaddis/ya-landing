'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
// import NavbarPrice from './NavbarPrice';
import Image from 'next/image';
import Wave from './Wave';
import { FiMenu } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';

export default function Navbar() {
    const navbarRef = useRef<HTMLDivElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState<string>("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            {/* <div className="absolute left-[calc(1/8*100%)] top-1/2 -translate-y-1/2">
                
            </div> */}
            {/* <div className="w-full flex justify-center px-20">
                <NavbarPrice />
            </div> */}
            <div className="w-full flex justify-center bg-[var(--foreground)] px-10 sm:px-16  lg:px-20 text-[var(--background)]">
                <div className="max-w-[1150px] w-full flex items-center justify-between gap-5">
                    <div className="flex-1 flex items-center justify-start h-full py-4">
                        <Image src="/logo_t.png" alt="Ya Logo" width={65} height={65} className="object-contain" />
                    </div>
                    <div className="hidden flex-1 md:flex items-center justify-center gap-6">
                        <Link href="/" className={`relative text-base tracking-wide hover:text-[var(--primary)] duration-300 pb-2 before:absolute before:bottom-0 before:w-full before:h-1 before:rounded-full ${activeLink === "" ? "before:bg-[var(--primary)] font-semibold" : "font-extralight"} before:duration-300`} onClick={() => setActiveLink("")}>Home</Link>
                        <Link href="#about" className={`relative text-base tracking-wide hover:text-[var(--primary)] duration-300 pb-2 before:absolute before:bottom-0 before:w-full before:h-1 before:rounded-full ${activeLink === "about" ? "before:bg-[var(--primary)] font-semibold" : "font-extralight"} before:duration-300`} onClick={() => setActiveLink("about")}>About</Link>
                        <Link href="#services" className={`relative text-base tracking-wide hover:text-[var(--primary)] duration-300 pb-2 before:absolute before:bottom-0 before:w-full before:h-1 before:rounded-full ${activeLink === "services" ? "before:bg-[var(--primary)] font-semibold" : "font-extralight"} before:duration-300`} onClick={() => setActiveLink("services")}>Services</Link>
                        <Link href="#contact" className={`relative text-base tracking-wide hover:text-[var(--primary)] duration-300 pb-2 before:absolute before:bottom-0 before:w-full before:h-1 before:rounded-full ${activeLink === "contact" ? "before:bg-[var(--primary)] font-semibold" : "font-extralight"} before:duration-300`} onClick={() => setActiveLink("contact")}>Contact</Link>
                    </div>
                    <div className="hidden flex-1 md:flex items-center justify-end">
                        <Link href="/become-driver" className="relative group bg-[var(--background)] rounded-lg overflow-hidden">
                            <div className="relative z-10 text-[var(--foreground)] group-hover:text-[var(--background)] text-base text-center tracking-wide font-normal text-nowrap px-8 flex justify-center py-4 duration-300 before:absolute before:bottom-0 before:w-0 before:h-full before:bg-[var(--primary)] before:duration-300 group-hover:before:w-full before:z-[-1] after:absolute after:top-0 after:w-full after:h-1 after:bg-[var(--primary)] after:duration-300 hover:after:w-0">
                                Become a Driver
                            </div>
                        </Link>
                    </div>
                    <div className="flex-1 flex md:hidden items-center justify-end">
                        <div className="flex items-center justify-center p-1 text-4xl text-[var(--primary)] border-2 border-[var(--primary)] rounded-sm cursor-pointer" onClick={() => setIsMenuOpen(true)}>
                            <FiMenu />
                        </div>
                    </div>
                </div>
            </div>
            <Wave />
            <div className={`fixed left-0 top-0 ${isMenuOpen ? "translate-y-0" : "-translate-y-full"} w-full bg-[var(--primary)] pb-20 px-10 sm:px-16  lg:px-20 z-[9999] duration-300 border-b border-[var(--foreground)] md:hidden`}>
                <div className="w-full flex items-center justify-between text-6xl text-[var(--foreground)] cursor-pointer mb-10" onClick={() => setIsMenuOpen(false)}>
                    <Image src="/logo_v.jpg" alt="Ya Logo" width={100} height={100} className="object-contain" />
                    <IoCloseOutline />
                </div>
                <div className="relative w-full flex flex-col items-center gap-10 ">
                    <div className="flex-1 flex flex-col items-center justify-center gap-6">
                        <Link href="/" className={`relative text-base tracking-wide hover:text-[var(--primary)] duration-300 pb-2 before:absolute before:bottom-0 before:w-full before:h-1 ${activeLink === "" ? "before:bg-[var(--background)] font-semibold" : "font-extralight"} before:duration-300`} onClick={() => { setActiveLink(""); setIsMenuOpen(false) }}>Home</Link>
                        <Link href="#about" className={`relative text-base tracking-wide hover:text-[var(--primary)] duration-300 pb-2 before:absolute before:bottom-0 before:w-full before:h-1 ${activeLink === "about" ? "before:bg-[var(--background)] font-semibold" : "font-extralight"} before:duration-300`} onClick={() => { setActiveLink("about"); setIsMenuOpen(false) }}>About</Link>
                        <Link href="#services" className={`relative text-base tracking-wide hover:text-[var(--primary)] duration-300 pb-2 before:absolute before:bottom-0 before:w-full before:h-1 ${activeLink === "services" ? "before:bg-[var(--background)] font-semibold" : "font-extralight"} before:duration-300`} onClick={() => { setActiveLink("services"); setIsMenuOpen(false) }}>Services</Link>
                        <Link href="#contact" className={`relative text-base tracking-wide hover:text-[var(--primary)] duration-300 pb-2 before:absolute before:bottom-0 before:w-full before:h-1 ${activeLink === "contact" ? "before:bg-[var(--background)] font-semibold" : "font-extralight"} before:duration-300`} onClick={() => { setActiveLink("contact"); setIsMenuOpen(false) }}>Contact</Link>
                    </div>
                    <div className="flex-1 flex items-center justify-end">
                        <Link href="/become-driver" className="relative group bg-[var(--background)] rounded-lg overflow-hidden">
                            <div className="relative z-10 text-[var(--foreground)] group-hover:text-[var(--background)] text-base text-center tracking-wide font-normal px-8 flex justify-center py-4 duration-300 before:absolute before:bottom-0 before:w-0 before:h-full before:bg-[var(--foreground)] before:duration-300 group-hover:before:w-full before:z-[-1] after:absolute after:top-0 after:w-full after:h-1 after:bg-[var(--foreground)] after:duration-300 hover:after:w-0">
                                Become a Driver
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
