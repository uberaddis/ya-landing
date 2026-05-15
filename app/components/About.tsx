import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function About() {
    return (
        <div id='about' className='w-full px-5 sm:px-10 py-16 flex items-center gap-10 bg-[#02bf6322]'>
            <div className="relative flex-1 flex justify-center md:justify-end bg-[#ffffff55] md:bg-transparent rounded-lg shadow-lg md:shadow-none border-t-2 md:border-0 border-white p-5 sm:p-10 md:p-0">
                <div className="max-w-md flex flex-col items-center md:items-start gap-5 md:gap-10">
                    <h2 className='relative w-fit text-xl font-bold pb-3 before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 md:before:left-auto md:before:-translate-x-0 before:w-1/2 before:h-2 before:bg-[var(--primary)] before:rounded-full'>About us</h2>
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <h3 className='text-base font-medium'>Trusted Ride Services in All Addis</h3>
                        <p className='text-sm font-light'>ya ride is your go-to app for safe, reliable, and affordable transportation. Whether you need a quick ride across town or a long-distance journey, we connect you with professional drivers in minutes. With a user-friendly interface, real-time tracking, and transparent pricing, ya ride ensures a seamless travel experience. Our drivers are vetted for safety and professionalism, giving you peace of mind on every trip.</p>
                    </div>
                    <Link href={"/coming-soon"} className='w-fit px-10 py-3 bg-[var(--foreground)] text-[var(--background)] text-xs font-semibold rounded-lg'>Download App</Link>
                </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0 blur-lg md:blur-none flex-1 py-10 z-[-1]">
                <Image src="/images/yacar_side.png" alt="Ya car side Image" width={600} height={600} className="object-contain w-[500px] md:w-[600px] h-full" />
            </div>
        </div>
    )
}
