import Image from 'next/image';

export default function page() {
    return (
        <main className='flex min-h-screen w-full flex-col items-center justify-center bg-ya px-5 pt-20'>
            <div className='border-2 border-ink bg-paper p-6 sm:p-10'>
                <Image className='h-auto w-[280px] sm:w-[400px]' src={'/coming-soon.png'} alt='coming soon' width={1000} height={1000} quality={100} unoptimized priority />
            </div>
        </main>
    )
}
