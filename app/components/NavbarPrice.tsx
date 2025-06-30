import Image from 'next/image'
import React from 'react'
import { IoLocationOutline } from 'react-icons/io5';

export default function NavbarPrice() {
    return (
        <div className='max-w-[1150px] w-full flex items-center justify-between gap-10 py-2'>
            <div className="">
                <Image src="/logo.svg" alt="Ya Logo" width={50} height={60} className="object-contain" />
            </div>
            <div className="flex items-center">
                <div className="flex items-center gap-2 bg-[#eee] py-2 px-3 border border-gray-300 mr-5">
                    <IoLocationOutline className='text-xl' />
                    <input type="text" placeholder='Pickup Location' className='outline-none border-none text-[12px]' />
                </div>
                <div className="flex items-center bg-[var(--foreground)]">
                    <div className="flex items-center gap-2 bg-[#eee] py-2 px-3 border border-gray-300">
                        <IoLocationOutline className='text-xl' />
                        <input type="text" placeholder='Destination' className='outline-none border-none text-[12px]' />
                    </div>
                    <div className=" text-white px-4 h-full text-[12px]">
                        Get Price
                    </div>
                </div>
            </div>
            <div className="bg-[var(--foreground)] text-[var(--background)] text-[12px] w-32 flex justify-center py-[10px]">
                Ride with ya
            </div>
        </div>
    )
}
