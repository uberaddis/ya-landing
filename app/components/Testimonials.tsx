'use client'
import Image from 'next/image'
import { useEffect, useState, useMemo } from 'react'

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const arr = useMemo(() => [1, 2, 3], []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex === arr.length - 1) {
                setCurrentIndex(0);
            } else {
                setCurrentIndex(currentIndex + 1);
            }
        }, 5000);

        // console.log("Current Index:", currentIndex);

        return () => clearInterval(interval);
    }, [currentIndex, arr]);

    return (
        <div className='relative w-full py-16 flex justify-center items-center'>
            <div className="absolute top-0 left-0 w-full h-full brightness-[25%]">
                <Image src="/images/ya_test_bg.jpg" alt="Testimonials Background" width={2880} height={1600} className="object-cover w-full h-full" />
            </div>
            <div className="relative max-w-4xl w-full flex flex-col items-center">
                <h2 className='relative text-white text-2xl font-black pb-3 mb-8 before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-1/2 before:h-2 before:bg-[var(--primary)] before:rounded-full'>What Our Customers Say</h2>
                <div className='w-full overflow-hidden'>
                    <div className={`flex items-center transition-transform duration-300 ease-in-out`} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {arr.map((_: number, index: number) => (
                            <div key={index} className="min-w-full max-w-full p-10 pt-5">
                                <div className="relative z-10 w-full bg-white py-14 px-14 flex flex-col items-center rounded-lg before:absolute before:top-2 before:left-1/2 before:-translate-x-1/2 before:w-[94%] before:h-full before:bg-white before:opacity-75 before:-z-10 before:rounded-lg after:absolute after:top-4 after:left-1/2 after:-translate-x-1/2 after:w-[88%] after:h-full after:bg-white after:opacity-50 after:-z-10 after:rounded-lg">
                                    <Image src="https://picsum.photos/300" alt="Testimonial Image" width={60} height={60} className="rounded-full mb-5" />
                                    <p className='text-sm text-center text-gray-700 mb-7'>“I had an amazing experience with ya ride! The driver was friendly and the ride was smooth. Highly recommend!”</p>
                                    <span className='text-lg text-black font-bold'>Saba Tilahun</span>
                                    <span className='text-base text-[var(--primary)] font-semibold'>Passenger</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        {arr.map((_: number, index: number) => (
                            <div key={index} className={`w-3 h-3 rounded-full border-1 ${currentIndex === index ? 'border-[var(--primary)] bg-[var(--primary)]' : 'border-gray-300'} duration-300`} onClick={() => setCurrentIndex(index)}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
