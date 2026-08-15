'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const testimonials = [
    {
        name: 'Saba Tilahun',
        role: 'Rider',
        initials: 'ST',
        quote: 'I had an amazing experience with Ya Ride! The driver was friendly and the ride was smooth. Highly recommend!',
        accent: 'from-emerald-400 via-green-500 to-teal-600',
    },
    {
        name: 'Yohannes Bekele',
        role: 'Frequent rider',
        initials: 'YB',
        quote: 'Booking a ride is quick and simple. I especially appreciate knowing that I can get where I need to go with confidence.',
        accent: 'from-sky-400 via-cyan-500 to-blue-600',
    },
    {
        name: 'Hana Tesfaye',
        role: 'Ya community member',
        initials: 'HT',
        quote: 'The experience feels thoughtful from start to finish. It is a convenient way to move around the city on busy days.',
        accent: 'from-violet-400 via-fuchsia-500 to-pink-600',
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
            className="relative isolate w-full select-none overflow-hidden bg-[#071b13] py-20 sm:py-24"
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
            <Image
                alt=""
                className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25"
                fill
                sizes="100vw"
                src="/images/ya_test_bg.jpg"
            />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(2,191,99,0.34),transparent_32%),linear-gradient(115deg,rgba(0,0,0,0.9),rgba(4,29,18,0.82))]" />

            <div className="mx-auto flex w-full max-w-6xl flex-col px-5 sm:px-8 lg:px-10">
                <div className="flex flex-col gap-4 text-white md:flex-row md:items-end md:justify-between">
                    <div className="max-w-xl">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200 backdrop-blur">
                            <Star aria-hidden="true" className="h-3.5 w-3.5 fill-current" />
                            From the Ya community
                        </span>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            Made for the moments that keep your city moving.
                        </h2>
                    </div>
                    <p className="max-w-sm text-sm leading-6 text-white/70 md:text-right">
                        Real stories from people choosing a simpler way to get around.
                    </p>
                </div>

                <div
                    aria-roledescription="carousel"
                    className={`relative mt-10 touch-pan-y overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-2 shadow-[0_32px_100px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-3 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                    ref={carouselRef}
                    onPointerCancel={finishDrag}
                    onPointerDown={startDrag}
                    onPointerMove={moveDrag}
                    onPointerUp={finishDrag}
                >
                    <div className="overflow-hidden">
                        <div
                            className={`flex ${isDragging ? '' : 'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'}`}
                            style={{ transform: `translateX(${-activeSlideOffset + dragOffset}px)` }}
                        >
                            {testimonials.map((testimonial) => (
                                <article
                                    className="flex-none px-1"
                                    key={testimonial.name}
                                    style={{ width: carouselWidth || undefined }}
                                >
                                    <div className="relative grid min-h-[380px] overflow-hidden rounded-[1.7rem] bg-white p-7 sm:min-h-[360px] sm:p-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-10 lg:p-14">
                                        <div className="absolute right-0 top-0 h-48 w-48 -translate-y-1/2 translate-x-1/3 rounded-full bg-[var(--primary)]/15 blur-3xl" />
                                        <div className="relative flex flex-col justify-between">
                                            <Quote aria-hidden="true" className="h-11 w-11 text-[var(--primary)]" strokeWidth={1.5} />
                                            <blockquote className="mt-8 max-w-2xl text-2xl font-medium leading-[1.38] tracking-tight text-slate-900 sm:text-3xl">
                                                “{testimonial.quote}”
                                            </blockquote>
                                            <div className="mt-10 flex items-center gap-4">
                                                <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${testimonial.accent} text-sm font-bold text-white shadow-lg`}>
                                                    {testimonial.initials}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-950">{testimonial.name}</p>
                                                    <p className="mt-0.5 text-sm font-medium text-[var(--primary)]">{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative mt-10 hidden overflow-hidden rounded-[1.5rem] bg-slate-950 p-8 text-white lg:flex lg:flex-col lg:justify-between">
                                            <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${testimonial.accent}`} />
                                            <p className="text-sm font-medium leading-6 text-white/70">
                                                Every journey starts with a little more ease.
                                            </p>
                                            <div>
                                                <div className="flex gap-1 text-emerald-300">
                                                    {[0, 1, 2, 3, 4].map((star) => <Star aria-hidden="true" className="h-4 w-4 fill-current" key={star} />)}
                                                </div>
                                                <p className="mt-4 text-lg font-semibold">A ride that feels effortless.</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-5 flex items-center justify-between px-5 sm:bottom-7 sm:px-8">
                        <div className="flex gap-2" role="tablist" aria-label="Select a testimonial">
                            {testimonials.map((testimonial, index) => (
                                <button
                                    aria-label={`Show testimonial from ${testimonial.name}`}
                                    aria-selected={currentIndex === index}
                                    className={`h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 ${currentIndex === index ? 'w-8 bg-[var(--primary)]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
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
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-md transition hover:-translate-y-0.5 hover:border-[var(--primary)] hover:text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
            onClick={onClick}
            type="button"
        >
            <Icon aria-hidden="true" className="h-5 w-5" />
        </button>
    )
}
