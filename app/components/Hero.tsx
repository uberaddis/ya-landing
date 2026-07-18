import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoIosCall } from "react-icons/io";

export default function Hero() {
    return (
        <>
            <div className="relative w-full h-32 bg-[var(--primary)]"></div>
            <div className='relative w-full flex flex-col-reverse md:flex-row  bg-[#02bf6322] items-start md:items-center overflow-x-clip'>
                <div className="relative md:flex-[.4] h-full md:h-auto overflow-hidden pt-[250px] sm:pt-[350px] md:py-28 px-5 sm:px-20 md:px-10 xl:pr-20 flex justify-end ">
                    <div className="absolute bottom-0 right-0 -translate-x-10 -translate-y-10 bg-[var(--primary)] w-full h-full -rotate-6 rounded-br-[100px]"></div>
                    <div className="max-w-sm relative flex flex-col justify-end md:justify-center pb-20 md:pb-0 h-full">
                        <h1 className='text-2xl sm:text-4xl md:text-3xl xl:text-4xl font-extrabold mb-8'>Your Ride, On Demand. Anytime, Anywhere.</h1>
                        <p className='text-sm lg:text-base font-light mb-5'>Experience seamless, safe, and affordable rides with just a tap. ya ride connects you to reliable verified drivers in minutes.</p>
                        <Link href={"/coming-soon"} className='w-fit px-10 py-3 bg-foreground hover:bg-foreground/70 text-background text-sm font-semibold rounded-lg duration-300'>Download Now</Link>
                    </div>
                </div>
                <div className="absolute top-20 right-0 md:relative md:top-auto md:right-auto md:flex-[.6] h-auto md:h-full flex justify-start items-end md:py-24 overflow-hidden z-10">
                    <Image src="/images/yacar_angle.png" alt="ya car Image" width={600} height={600} className="w-[350px] sm:w-[500px] md:w-[400px] lg:w-[470px] xl:w-[600px] object-contain h-full" />
                    <Image src="/images/ya_scooter.png" alt="ya scooter Image" width={250} height={300} className="hidden md:block w-[150px] lg:w-[200px] xl:w-[250px] object-contain h-full -translate-x-20 translate-y-10 lg:translate-y-20" />
                </div>
                <div className="absolute top-[90%] sm:top-10 left-1/2 md:left-2/3 lg:left-3/4 xl:left-4/5 flex flex-col items-center gap-2 p-2 border border-foreground rounded-lg bg-background rotate-12 z-1">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground"></div>
                    <h2 className='text-2xl md:text-3xl font-semibold'>Order Now</h2>
                    <div className="flex items-center gap-2 px-5 py-2 bg-[#02bf6322] rounded-lg">
                        <IoIosCall className='text-3xl md:text-5xl text-[var(--primary)]' />
                        <span className="text-3xl md:text-5xl font-black text-[var(--primary)]">8455</span>
                    </div>
                </div>
            </div>
        </>
    )
}
