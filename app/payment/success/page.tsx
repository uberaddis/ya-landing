import { Suspense } from "react";
import Receipt from "./Receipt";

export default function page() {
    return (
        <div className='flex min-h-screen w-full flex-col items-center justify-center bg-paper px-5 pb-20 pt-32'>
            <Suspense fallback={null}>
                <Receipt />
            </Suspense>
        </div>
    )
}
