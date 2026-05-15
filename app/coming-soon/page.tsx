import Image from 'next/image';

export default function page() {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <Image className='w-[400px] h-[400px]' src={'/coming-soon.png'} alt='coming soon' width={1000} height={1000} quality={100} unoptimized priority />
        </div>
    )
}
