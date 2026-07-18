'use client'
import { useSearchParams } from 'next/navigation'
import { FaRegCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

export default function Receipt() {
    const searchParams = useSearchParams()

    const amount = searchParams.get('amount')
    const paymentMethod = searchParams.get('paymentMethod')
    const status = searchParams.get('status')
    const transactionId = searchParams.get('transactionId')
    const date = searchParams.get('date')
    return (
        <div className="max-w-2xl w-full flex flex-col items-center rounded-xl overflow-hidden shadow-lg">
            <div className="w-full flex flex-col items-center gap-5 bg-[var(--primary)] px-16 py-14">
                <h2 className='text-4xl font-light text-center'>Transaction Successful</h2>
                <FaRegCheckCircle className='text-5xl text-[var(--foreground)]' />
            </div>

            <div className="w-full flex flex-col gap-2 bg-[var(--background)] px-16 py-14 text-xl">
                <div className="flex justify-between gap-10">
                    <span className='font-medium text-right flex-1'>Amount:</span>
                    <span className="text-left flex-1">{amount}</span>
                </div>
                <div className="flex justify-between gap-10">
                    <span className='font-medium text-right flex-1'>Payment Method:</span>
                    <span className="text-left flex-1">{paymentMethod}</span>
                </div>
                <div className="flex justify-between gap-10">
                    <span className='font-medium text-right flex-1'>Status:</span>
                    <span className="text-left flex-1">{status}</span>
                </div>
                <div className="flex justify-between gap-10">
                    <span className='font-medium text-right flex-1'>Transaction ID:</span>
                    <span className="text-left flex-1">{transactionId}</span>
                </div>
                <div className="flex justify-between gap-10">
                    <span className='font-medium text-right flex-1'>Date:</span>
                    <span className="text-left flex-1">{date}</span>
                </div>
                <div className="w-full flex justify-center">
                    <Link href={"/"} className="w-fit px-16 py-2 bg-[var(--primary)] text-xl font-black text-[var(--foreground)] rounded-full mt-10 shadow-[0_5px_10px_#00000055] cursor-pointer">
                        <span>Go to App</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
