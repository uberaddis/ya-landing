import Image from 'next/image';

export default function page() {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <Image src={'/coming-soon.png'} alt='coming soon' width={400} height={400} />
        </div>
    )
}
