import RegisterForm from "./RegisterForm";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Become a Driver for Ya - Start making money today!',
    description: 'Join our team of drivers and start earning money today with Ya. Get extra bonus by signing up early.',
};

export default function Page() {
    return (
        <main className="min-h-screen bg-paper pt-20 text-ink">
            <section className="border-b-2 border-ink bg-ya">
                <div className="wrap pb-12 pt-14 sm:pb-16 sm:pt-20">
                    <p className="marker">Drive with Ya</p>
                    <h1 className="display mt-5 text-[clamp(2.75rem,9vw,7rem)]">Become a Driver</h1>
                </div>
            </section>
            <section className="wrap py-12 sm:py-16">
                <div className="max-w-xl">
                    <RegisterForm />
                </div>
            </section>
        </main>
    )
}
