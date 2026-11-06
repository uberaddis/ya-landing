'use client'
import { useSearchParams } from 'next/navigation'
import { FaRegCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

export default function Receipt() {
    const searchParams = useSearchParams()

    const rows = [
        ['Amount', searchParams.get('amount')],
        ['Payment method', searchParams.get('paymentMethod')],
        ['Status', searchParams.get('status')],
        ['Transaction ID', searchParams.get('transactionId')],
        ['Date', searchParams.get('date')],
    ] as const

    return (
        <div className="w-full max-w-2xl border-2 border-ink bg-paper">
            <div className="flex items-center justify-between gap-6 border-b-2 border-ink bg-ya px-6 py-8 sm:px-10 sm:py-10">
                <h2 className="display text-4xl sm:text-5xl">Transaction successful</h2>
                <FaRegCheckCircle aria-hidden="true" className="shrink-0 text-5xl" />
            </div>

            <dl className="px-6 sm:px-10">
                {rows.map(([label, value]) => (
                    <div className="grid gap-1 border-b-2 border-ink py-5 last:border-b-0 sm:grid-cols-[11rem_1fr] sm:gap-6" key={label}>
                        <dt className="text-sm font-bold uppercase tracking-wider text-muted">{label}</dt>
                        <dd className="break-words font-display text-xl font-bold">{value || '—'}</dd>
                    </div>
                ))}
            </dl>

            <div className="border-t-2 border-ink p-6 sm:p-10">
                <Link href="/" className="btn btn-ink w-full sm:w-auto">
                    Go to App
                </Link>
            </div>
        </div>
    )
}
