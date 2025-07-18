import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
    return (
        <div className='w-full h-[55vh] flex bg-[#02bf6322]'>
            <div className="relative flex-[.4] overflow-hidden pr-20 flex justify-end">
                <div className="absolute bottom-0 right-0 -translate-x-10 -translate-y-10 bg-[var(--primary)] w-full h-full -rotate-6 rounded-br-[100px]"></div>
                <div className="max-w-sm relative flex flex-col justify-center h-full ">
                    <h1 className='text-4xl font-extrabold mb-8'>Your Ride, On Demand. Anytime, Anywhere.</h1>
                    <p className='text-[12px] mb-5'>Experience seamless, safe, and affordable rides with just a tap. ya ride connects you to reliable drivers in minutes.</p>
                    <Link href={""} className='w-fit px-10 py-3 bg-[var(--foreground)] text-[var(--background)] text-sm font-semibold rounded-lg'>Download Now</Link>
                </div>
            </div>
            <div className="flex-[.6] h-full flex justify-start items-end">
                <Image src="/images/yacar_angle.png" alt="ya car Image" width={600} height={600} className="object-contain h-full" />
                <Image src="/images/ya_scooter.png" alt="ya scooter Image" width={250} height={300} className="-translate-x-20 translate-y-20 object-contain h-full" />
            </div>
        </div>
    )
}
