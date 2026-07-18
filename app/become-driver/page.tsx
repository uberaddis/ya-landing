import RegisterForm from "./RegisterForm";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Become a Driver for Ya - Start making money today!',
    description: 'Join our team of drivers and start earning money today with Ya. Get extra bonus by signing up early.',
};

export default function Page() {
    return (
        <div className="w-full min-h-screen mt-[200px] px-10 flex flex-col items-center">
            <RegisterForm />
        </div>
    )
}