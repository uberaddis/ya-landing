'use client'

import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

const testimonials = [
    {
        name: 'Saba Tilahun',
        role: 'Rider',
        initials: 'ST',
        quote: 'I had an amazing experience with Ya Ride! The driver was friendly and the ride was smooth. Highly recommend!',
    },
    {
        name: 'Yohannes Bekele',
        role: 'Frequent rider',
        initials: 'YB',
        quote: 'Booking a ride is quick and simple. I especially appreciate knowing that I can get where I need to go with confidence.',
    },
    {
        name: 'Hana Tesfaye',
        role: 'Ya community member',
        initials: 'HT',
        quote: 'The experience feels thoughtful from start to finish. It is a convenient way to move around the city on busy days.',
    },
] as const

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [dragOffset, setDragOffset] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [carouselWidth, setCarouselWidth] = useState(0)
    const carouselRef = useRef<HTMLDivElement>(null)
    const dragStartX = useRef<number | null>(null)
    const dragDistance = useRef(0)

    useEffect(() => {
        if (isPaused) return

        const interval = window.setInterval(() => {
            setCurrentIndex((index) => (index + 1) % testimonials.length)
        }, 6500)

        return () => window.clearInterval(interval)
    }, [isPaused])

    useEffect(() => {
        const carousel = carouselRef.current
        if (!carousel) return

        const resizeObserver = new ResizeObserver(([entry]) => {
            setCarouselWidth(entry.contentRect.width)
        })

        resizeObserver.observe(carousel)
        return () => resizeObserver.disconnect()
    }, [])

    const goTo = (index: number) => {
        setCurrentIndex((index + testimonials.length) % testimonials.length)
    }

    const activeSlideOffset = currentIndex * carouselWidth

    const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.target instanceof Element && event.target.closest('button, a')) return

        dragStartX.current = event.clientX
        dragDistance.current = 0
        setIsDragging(true)
        setIsPaused(true)
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
        if (dragStartX.current === null) return

        dragDistance.current = event.clientX - dragStartX.current
        setDragOffset(dragDistance.current)
    }

    const finishDrag = () => {
        if (dragStartX.current === null) return

        if (dragDistance.current <= -55) goTo(currentIndex + 1)
        if (dragDistance.current >= 55) goTo(currentIndex - 1)

        dragStartX.current = null
        dragDistance.current = 0
        setDragOffset(0)
        setIsDragging(false)
        setIsPaused(false)
    }

    return (
        <section
            aria-label="Customer testimonials"
            className="relative isolate w-full select-none overflow-hidden border-y-2 border-ink bg-paper py-20 text-ink sm:py-28"
            onBlur={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onKeyDown={(event) => {
                if (event.key === 'ArrowLeft') goTo(currentIndex - 1)
                if (event.key === 'ArrowRight') goTo(currentIndex + 1)
            }}
            tabIndex={0}
        >
            <div className="wrap">
                <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-8">
                        <p className="marker text-ya-deep">From the Ya community</p>
                        <h2 className="display mt-5 text-[clamp(2.25rem,6vw,4.75rem)]">
                            Made for the moments that keep your city moving.
                        </h2>
                    </div>
                    <p className="max-w-sm bg-paper/90 text-lg leading-7 text-muted lg:col-span-4 lg:justify-self-end">
                        Real stories from people choosing a simpler way to get around.
                    </p>
                </Reveal>

                <div
                    aria-roledescription="carousel"
                    className={`mt-12 touch-pan-y overflow-hidden border-2 border-ink ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                    ref={carouselRef}
                    onPointerCancel={finishDrag}
                    onPointerDown={startDrag}
                    onPointerMove={moveDrag}
                    onPointerUp={finishDrag}
                >
                    <div
                        className={`flex ${isDragging ? '' : 'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'}`}
                        style={{ transform: `translateX(${-activeSlideOffset + dragOffset}px)` }}
                    >
                        {testimonials.map((testimonial) => (
                            <article
                                aria-label={`Testimonial from ${testimonial.name}`}
                                className="grid flex-none bg-ink text-paper lg:grid-cols-[1.5fr_0.5fr]"
                                key={testimonial.name}
                                style={{ width: carouselWidth || undefined }}
                            >
                                <div className="flex min-h-[380px] flex-col justify-between p-7 sm:p-12">
                                    <Quote aria-hidden="true" className="h-12 w-12 text-ya" strokeWidth={2} />
                                    <blockquote className="display mt-8 max-w-3xl !leading-[1.12] !tracking-[-0.03em] text-[clamp(1.6rem,3.6vw,2.75rem)]">
                                        “{testimonial.quote}”
                                    </blockquote>
                                    <div className="mt-10 flex items-center gap-4">
                                        <div className="grid h-12 w-12 place-items-center bg-ya font-display text-base font-extrabold text-ink">
                                            {testimonial.initials}
                                        </div>
                                        <div>
                                            <p className="font-display text-lg font-bold">{testimonial.name}</p>
                                            <p className="text-sm font-medium text-ya">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden flex-col justify-between bg-ya p-8 text-ink lg:flex">
                                    <p className="text-sm font-semibold leading-6">
                                        Every journey starts with a little more ease.
                                    </p>
                                    <div>
                                        <div className="flex gap-1">
                                            {[0, 1, 2, 3, 4].map((star) => <Star aria-hidden="true" className="h-4 w-4 fill-current" key={star} />)}
                                        </div>
                                        <p className="display mt-4 text-2xl !leading-[1.05]">A ride that feels effortless.</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <div className="flex gap-2" role="tablist" aria-label="Select a testimonial">
                        {testimonials.map((testimonial, index) => (
                            <button
                                aria-label={`Show testimonial from ${testimonial.name}`}
                                aria-selected={currentIndex === index}
                                className={`h-3 border-2 border-ink transition-all ${currentIndex === index ? 'w-10 bg-ink' : 'w-3 bg-paper hover:bg-ya'}`}
                                key={testimonial.name}
                                onClick={() => goTo(index)}
                                role="tab"
                                type="button"
                            />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <CarouselButton direction="previous" onClick={() => goTo(currentIndex - 1)} />
                        <CarouselButton direction="next" onClick={() => goTo(currentIndex + 1)} />
                    </div>
                </div>
            </div>

        </section>
    )
}

function CarouselButton({ direction, onClick }: { direction: 'previous' | 'next'; onClick: () => void }) {
    const isPrevious = direction === 'previous'
    const Icon = isPrevious ? ChevronLeft : ChevronRight

    return (
        <button
            aria-label={`${isPrevious ? 'Previous' : 'Next'} testimonial`}
            className="grid h-12 w-12 place-items-center border-2 border-ink bg-paper text-ink transition-colors hover:bg-ya"
            onClick={onClick}
            type="button"
        >
            <Icon aria-hidden="true" className="h-5 w-5" />
        </button>
    )
}
