import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaApple, FaAndroid } from 'react-icons/fa';

export default function AppDownload() {
    return (
        <div className='w-full py-10 md:pt-16 md:pb-0 px-5 sm:px-10 flex flex-col justify-center items-center'>
            <h2 className='relative text-2xl font-black pb-3 mb-8 before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-1/2 before:h-2 before:bg-[var(--primary)] before:rounded-full'>Download Ya</h2>
            <div className="w-full flex flex-col md:flex-row items-center justify-center md:gap-8 overflow-hidden">
                <div className="md:flex-[.45] flex justify-center md:justify-end">
                    <div className="w-[280px] h-[260px] md:h-[300px] lg:w-[350px] lg:h-[350px] flex justify-center md:justify-end overflow-hidden">
                        <Image src="/images/iphone15.png" alt="Ya ride app" width={500} height={1000} className="object-contain w-[250px] h-[500px] lg:w-[500px] lg:h-[700px]" />
                    </div>
                </div>
                <div className="md:flex-[.55] flex flex-col gap-10">
                    <div className="max-w-lg flex flex-col gap-2 text-center md:text-left">
                        <h3 className='text-lg font-semibold'>Download the ya-ride mobile application</h3>
                        <p className='text-sm font-light'>Experience the convenience of ya-ride on your mobile device. Download our app to request rides, track your driver, and manage your trips with ease. Available for both iOS and Android, the ya-ride app is designed to make your transportation experience seamless and efficient.</p>
                    </div>
                    <div className="max-w-lg flex flex-wrap sm:flex-nowrap items-center justify-center md:justify-start gap-5">
                        <Link href={"/coming-soon"} className='w-fit px-5 py-3 bg-[var(--foreground)] text-[var(--background)] text-xs font-semibold flex items-center gap-3 rounded-lg'>
                            <FaApple className='text-4xl' />
                            <div className="flex flex-col text-nowrap">
                                <span className='text-sm font-extralight'>Download from</span>
                                <span className='text-sm font-semibold'>Apple App Store</span>
                            </div>
                        </Link>
                        <Link href={"/coming-soon"} className='w-fit px-5 py-3 bg-[var(--foreground)] text-[var(--background)] text-xs font-semibold flex items-center gap-3 rounded-lg'>
                            <FaAndroid className='text-4xl' />
                            <div className="flex flex-col text-nowrap">
                                <span className='text-sm font-extralight'>Download from</span>
                                <span className='text-sm font-semibold'>Google Play Store</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
