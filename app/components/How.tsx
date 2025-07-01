import { GiClick } from 'react-icons/gi';
import { RiSteeringFill } from 'react-icons/ri';
import { FaRoute } from 'react-icons/fa';
import { PiMapPinAreaDuotone } from 'react-icons/pi';

export default function How() {
    return (
        <div className='w-full py-16 flex justify-center items-center'>
            <div className="max-w-4xl w-full flex flex-col items-center gap-5">
                <h2 className='relative text-xl font-bold pb-2 mb-8 before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-1/2 before:h-1 before:border-b-4 before:border-[var(--primary)]'>How it works</h2>
                <div className='relative w-full flex items-center gap-8'>
                    <div className="w-full absolute top-8 left-1/2 -translate-x-1/2 flex items-center justify-between gap-36 px-[157px]">
                        <div className="flex-1 h-[1px] bg-gray-400"></div>
                        <div className="flex-1 h-[1px] bg-gray-400"></div>
                        <div className="flex-1 h-[1px] bg-gray-400"></div>
                    </div>
                    <div className='max-w-[250px] flex flex-col items-center gap-4'>
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#02bf6322] border border-gray-400 overflow-hidden mb-3">
                            <GiClick className='text-3xl text-[var(--foreground)]' />
                        </div>
                        <div className="flex flex-col items-center gap-3 text-center">
                            <h3 className='text-base font-medium'>Request a Ride</h3>
                            <p className='text-xs font-light break-all'>Open the app, enter your destination, and request a ride with just a tap.</p>
                        </div>
                    </div>
                    <div className='max-w-[250px] flex flex-col items-center gap-4'>
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#02bf6322] border border-gray-400 overflow-hidden mb-3">
                            <RiSteeringFill className='text-3xl text-[var(--foreground)]' />
                        </div>
                        <div className="flex flex-col items-center gap-3 text-center">
                            <h3 className='text-base font-medium'>Meet Your Driver</h3>
                            <p className='text-xs font-light break-all'>Your driver will arrive at your location in minutes, ready to take you to your destination.</p>
                        </div>
                    </div>
                    <div className='max-w-[250px] flex flex-col items-center gap-4'>
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#02bf6322] border border-gray-400 overflow-hidden mb-3">
                            <FaRoute className='text-3xl text-[var(--foreground)]' />
                        </div>
                        <div className="flex flex-col items-center gap-3 text-center">
                            <h3 className='text-base font-medium'>Track Your Ride</h3>
                            <p className='text-xs font-light break-all'>Follow your route in real-time, ensuring a safe and efficient journey.</p>
                        </div>
                    </div>
                    <div className='max-w-[250px] flex flex-col items-center gap-4'>
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#02bf6322] border border-gray-400 overflow-hidden mb-3">
                            <PiMapPinAreaDuotone className='text-3xl text-[var(--foreground)]' />
                        </div>
                        <div className="flex flex-col items-center gap-3 text-center">
                            <h3 className='text-base font-medium'>Arrive Safely</h3>
                            <p className='text-xs font-light break-all'>Your driver will drop you off at your destination, ready for your next adventure.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
