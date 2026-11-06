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
        <form
            className="w-full"
            onSubmit={(event) => {
                event.preventDefault()
                handleSubmit()
            }}
        >
            <div className="grid gap-8">
                <div>
                    <label htmlFor="name" className="field-label">Full Name</label>
                    <input className="field" type="text" name="name" id="name" autoComplete="name" placeholder="Abebe Kebede" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div>
                    <label htmlFor="phone" className="field-label">Phone</label>
                    <input className="field" type="tel" name="phone" id="phone" autoComplete="tel" placeholder="0912345678" onChange={(e) => setPhone(e.target.value)} value={phone} />
                </div>
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button className="btn btn-ink" disabled={loading} type="submit">{loading ? 'Loading...' : 'Register'}</button>
                <p aria-live="polite" className="text-base font-semibold text-ya-deep">{msg}</p>
            </div>
        </form>
    );
}
