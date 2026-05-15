import { IoCall, IoMail, IoLocation } from "react-icons/io5";

export default function ContactCards() {
    return (
        <div className="w-full px-5 md:px-[120px] mb-20 flex flex-wrap gap-[30px]">
            <div className="flex-1 flex flex-wrap lg:flex-nowrap gap-5 py-10 px-7 md:px-14 bg-[#02bf6322] rounded-lg">
                <div className="flex gap-5 sm:min-w-[300px] min-w-[200px] flex-wrap xs:flex-nowrap">
                    <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full border border-[var(--primary)] text-[var(--primary)] text-2xl">
                        <IoCall />
                    </div>
                    <div>
                        <h3 className="text-[var(--primary)] text-sm font-medium">Call Us:</h3>
                        <p className="text-[var(--foreground)] text-lg font-normal">+251 91112 1314</p>
                    </div>
                </div>
                <div className="flex gap-5 sm:min-w-[300px] min-w-[200px] flex-wrap xs:flex-nowrap">
                    <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full border border-[var(--primary)] text-[var(--primary)] text-2xl">
                        <IoMail />
                    </div>
                    <div>
                        <h3 className="text-[var(--primary)] text-sm font-medium">Email Us:</h3>
                        <p className="text-[var(--foreground)] text-lg font-normal whitespace-nowrap">
                            info@ya-ride.com
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-wrap lg:flex-nowrap py-10 px-7 md:px-14 bg-[#02bf6322] rounded-lg">
                <div className="flex gap-5 sm:min-w-[300px] min-w-[200px] flex-wrap xs:flex-nowrap">
                    <div className="min-w-[50px] max-w-[50px] h-[50px] flex items-center justify-center rounded-full border border-[var(--primary)] text-[var(--primary)] text-2xl">
                        <IoLocation />
                    </div>
                    <div>
                        <h3 className="text-[var(--primary)] text-sm font-medium">Visit Us:</h3>
                        <p className="text-[var(--foreground)] text-lg font-normal">
                            Lideta Sub City Woreda 8
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}