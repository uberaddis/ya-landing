import Image from 'next/image'
import Reveal from './Reveal'

export default function StreetBanner() {
    return (
        <div className="w-full border-b-2 border-ink bg-paper">
            <Reveal className="relative aspect-[3000/1286] min-h-[15rem] w-full" delay={100}>
                <Image
                    alt="Illustration of an Addis Ababa street with Ya rides, scooter delivery and delivery trucks passing food, ride, send and grocery shops"
                    className="object-cover object-[16%_100%] sm:object-center"
                    fill
                    quality={85}
                    sizes="100vw"
                    src="/images/ya-addis-banner-3000x1286.png"
                />
            </Reveal>
        </div>
    )
}
