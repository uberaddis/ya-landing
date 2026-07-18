import { Suspense } from "react";
import Receipt from "./Receipt";

export default function page() {
    return (
        <div className='w-full min-h-screen pt-48 pb-20 flex flex-col items-center justify-center bg-[#eee]'>
            <Suspense fallback={null}>
                <Receipt />
            </Suspense>
        </div>
    )
}
