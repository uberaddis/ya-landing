import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function About() {
    return (
        <div className='w-full py-16 flex items-center gap-10 bg-[#02bf6322]'>
            <div className="flex-1 flex justify-end">
                <div className="max-w-md flex flex-col gap-10">
                    <h2 className='relative w-fit text-xl font-bold pb-3 before:absolute before:bottom-0 before:w-1/2 before:h-2 before:bg-[var(--primary)] before:rounded-full'>About us</h2>
                    <div className="flex flex-col gap-2">
                        <h3 className='text-sm font-medium'>Trusted Ride Services in All Addis</h3>
                        <p className='text-xs font-light'>ya ride is your go-to app for safe, reliable, and affordable transportation. Whether you need a quick ride across town or a long-distance journey, we connect you with professional drivers in minutes. With a user-friendly interface, real-time tracking, and transparent pricing, ya ride ensures a seamless travel experience. Our drivers are vetted for safety and professionalism, giving you peace of mind on every trip.</p>
                    </div>
                    <Link href={""} className='w-fit px-10 py-3 bg-[var(--foreground)] text-[var(--background)] text-xs font-semibold rounded-lg'>Download App</Link>
                </div>
            </div>
            <div className="flex-1 py-10">
                <Image src="/images/yacar_side.png" alt="Ya car side Image" width={600} height={600} className="object-contain  h-full" />
            </div>
        </div>
    )
}
