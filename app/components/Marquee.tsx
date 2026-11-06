const items = ['Ride hailing', 'Food delivery', 'Package delivery', 'Grocery delivery'] as const

export default function Marquee() {
    // The list is rendered twice and the track slides by exactly half, so the loop is seamless.
    const track = [...items, ...items]

    return (
        <div aria-label="Ride hailing, food delivery, package delivery and grocery delivery" className="marquee w-full max-w-full overflow-hidden border-b-2 border-ink bg-ink py-4 text-paper sm:py-5" role="img">
            <div aria-hidden="true" className="marquee-track flex w-max items-center">
                {[0, 1].map((copy) => (
                    <ul className="flex shrink-0 items-center" key={copy}>
                        {track.map((item, index) => (
                            <li className="flex items-center" key={`${item}-${index}`}>
                                <span className={`display whitespace-nowrap px-6 text-3xl sm:px-10 sm:text-5xl ${index % 2 === 0 ? 'text-paper' : 'text-ya'}`}>{item}</span>
                                <span className="block h-3 w-3 rotate-45 bg-ya sm:h-4 sm:w-4" />
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    )
}
