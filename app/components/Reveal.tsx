'use client'

import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type CSSProperties, type ElementType, type ReactNode } from 'react'

type RevealProps = {
    as?: ElementType
    children: ReactNode
    className?: string
    /** Stagger delay in milliseconds. */
    delay?: number
    variant?: 'up' | 'left' | 'right' | 'zoom'
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className'>

/**
 * Fades and slides its element in the first time it scrolls into view.
 * Content stays visible without JavaScript (see the <noscript> rule in the layout).
 */
export default function Reveal({ as: Tag = 'div', children, className = '', delay = 0, variant = 'up', style, ...rest }: RevealProps) {
    const ref = useRef<HTMLElement>(null)
    const [shown, setShown] = useState(false)
    const [settled, setSettled] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setShown(true)
            setSettled(true)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '0px 0px -8% 0px' },
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    // Once the entrance has played, hand transitions back to the element's own hover styles.
    useEffect(() => {
        if (!shown) return
        const timer = window.setTimeout(() => setSettled(true), delay + 1000)
        return () => window.clearTimeout(timer)
    }, [shown, delay])

    return (
        <Tag
            {...rest}
            className={`reveal ${shown ? 'is-in' : ''} ${settled ? 'is-settled' : ''} ${className}`}
            data-variant={variant}
            ref={ref}
            style={{ ...style, '--d': `${delay}ms` } as CSSProperties}
        >
            {children}
        </Tag>
    )
}
