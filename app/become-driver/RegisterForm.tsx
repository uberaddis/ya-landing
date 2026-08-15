'use client'
import { useState } from 'react';

export default function RegisterForm() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [msg, setMsg] = useState<string>('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/driver', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, phone })
            })

            const data = await res.json()
            if (data.success) {
                setLoading(false)
                setName('')
                setPhone('')
                setMsg('Driver Registration Successful')
                setTimeout(() => {
                    setMsg('')
                }, 3000)
            } else {
                setLoading(false)
                setMsg(data.msg)
                setTimeout(() => {
                    setMsg('')
                }, 3000)
            }
        } catch (error) {
            setLoading(false)
            setMsg(error instanceof Error ? error.message : String(error))
        }
    }
    return (
        <div className="w-full max-w-[750px] overflow-hidden flex flex-col items-center gap-5">
            <h1 className="text-[var(--foreground)] text-[32px] md:text-[48px] font-bold">Become a Driver</h1>
            <div className="w-full flex flex-col gap-5">
                {/* name */}
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="name" className="text-[var(--foreground)] text-base font-normal">Full Name</label>
                    <input className="w-full h-10 border-[1px] border-[var(--foreground)] rounded-lg px-5 text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-50 focus:outline-none focus:border-[var(--primary)] focus:ring-[1px] focus:ring-[var(--primary)]" type="text" name="name" id="name" placeholder="Abebe Kebede" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                {/* phone */}
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="phone" className="text-[var(--foreground)] text-base font-normal">Phone</label>
                    <input className="w-full h-10 border-[1px] border-[var(--foreground)] rounded-lg px-5 text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-50 focus:outline-none focus:border-[var(--primary)] focus:ring-[1px] focus:ring-[var(--primary)]" type="tel" name="phone" id="phone" placeholder="0912345678" onChange={(e) => setPhone(e.target.value)} value={phone} />
                </div>
                {/* submit */}
                <div className="w-full flex flex-col gap-2">
                    <button className="w-full h-10 bg-[var(--primary)] text-[var(--foreground)] rounded-lg font-bold" onClick={() => handleSubmit()}>{loading ? 'Loading...' : 'Register'}</button>
                </div>
                {msg && <p className="text-[var(--foreground)] text-base font-normal text-center">{msg}</p>}
            </div>
        </div>
    );
}
