'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type ParallaxProps = {
    children: ReactNode
    className?: string
    axis?: 'x' | 'y'
    /** Offset in px at the start of the range. */
    from?: number
    /** Offset in px at the end of the range. */
    to?: number
    /**
     * "view": progress while the element travels through the viewport.
     * "scroll": progress over the first viewport-height of page scroll.
     */
    mode?: 'view' | 'scroll'
}

export default function Parallax({ children, className = '', axis = 'y', from = 0, to = 0, mode = 'view' }: ParallaxProps) {
    const outerRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const outer = outerRef.current
        const inner = innerRef.current
        if (!outer || !inner) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        let ticking = false

        const update = () => {
            ticking = false
            const vh = window.innerHeight
            let progress: number

            if (mode === 'scroll') {
                progress = window.scrollY / vh
            } else {
                // Measure the untransformed outer box so the motion never feeds back into itself.
                const rect = outer.getBoundingClientRect()
                progress = (vh - rect.top) / (vh + rect.height)
            }

            const clamped = Math.min(1, Math.max(0, progress))
            const value = from + (to - from) * clamped
            inner.style.transform = axis === 'y' ? `translate3d(0, ${value}px, 0)` : `translate3d(${value}px, 0, 0)`
        }

        const onScroll = () => {
            if (ticking) return
            ticking = true
            window.requestAnimationFrame(update)
        }

        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
    }, [axis, from, to, mode])

    return (
        <div className={className} ref={outerRef}>
            <div className="will-change-transform" ref={innerRef}>
                {children}
            </div>
        </div>
    )
}
