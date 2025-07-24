
"use client";

import Image from 'next/image';

import arrowRightSWImage from "@/public/arrow-right-sw.png"
import arrowLeftSWImage from "@/public/arrow-left-sw.png"


export default function SwipeTour() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black/20 h-screen w-screen">
            <div className='grid grid-cols-2 md:grid-cols-3 h-full'>
                <div className='md:col-span-1 w-full bg-red-200/80 h-full'>
                    <div className='p-10 text-xl font-semibold flex flex-col items-center justify-center my-20 text-red-700 gap-5'>
                        <p className='max-w-[200]'>
                            Swipe left card to dislike. This will remove the job from your list.
                        </p>
                        <Image
                            src={arrowLeftSWImage}
                            alt="Arrow Left"
                            width={150}
                            height={30}
                            className="inline-block mr-2"
                        />
                    </div>
                </div>
                <div className='md:col-span-2 w-full bg-green-200/80 h-full'>
                    <div className='p-10 text-xl font-semibold flex flex-col items-center justify-center my-20 text-green-700 gap-5'>
                        <p className='max-w-[200]'>
                            Swipe right card to like. This will add the job to your liked list.
                        </p>
                        <Image
                            src={arrowRightSWImage}
                            alt="Arrow Right"
                            width={150}
                            height={30}
                            className="inline-block mr-2"
                        />
                    </div>
                </div>
            </div>

            <h2 className="text-lg font-semibold">Swipe to like or dislike</h2>
            <p className="text-sm text-gray-600">Drag the cards left to dislike or right to like.</p>
        </div>
    )
}