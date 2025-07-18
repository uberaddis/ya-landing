import React from 'react'
import { IoLocationOutline } from 'react-icons/io5';

export default function NavbarPrice() {
    return (
        <div className='max-w-[1150px] w-full flex items-center justify-between'>

            <div className="flex w-5 h-full"></div>
            <div className="flex items-center py-2">
                <div className="flex items-center gap-2 bg-[#eeeeee33] py-2 px-3 border border-gray-300 mr-5 text-[var(--background)]">
                    <IoLocationOutline className='text-xl' />
                    <input type="text" placeholder='Pickup Location' className='outline-none border-none text-[12px]' />
                </div>
                <div className="flex items-center">
                    <div className="flex items-center gap-2 bg-[#eeeeee33] py-2 px-3 border border-gray-300 text-[var(--background)]">
                        <IoLocationOutline className='text-xl' />
                        <input type="text" placeholder='Destination' className='outline-none border-none text-[12px]' />
                    </div>
                    <div className="text-[var(--foreground)] bg-[var(--background)] py-[9.5px] px-4 h-full text-[12px]">
                        Get Price
                    </div>
                </div>
            </div>
            <div className="relative bg-[var(--background)] text-[var(--foreground)] text-[12px] w-32 flex justify-center py-[18px] before:absolute before:bottom-0 before:w-full before:h-1 before:bg-[var(--primary)] before:duration-300 hover:before:w-0">
                Ride with ya
            </div>
        </div>
    )
}
