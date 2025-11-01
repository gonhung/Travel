import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


export const Card = ({ place }) => {
    return (
        <Link
            href="/catalog"
            className="cursor-pointer h-[500px] w-[350px] flex-wrap rounded-xl shadow-md "
        >
            <div className="relative h-2/3 w-full">
                <Image
                    src={place.image}
                    className="h-full relative w-full overflow-hidden rounded-tl-xl object-cover"
                />
                <div className="absolute right-0 bottom-0 p-4 bg-blue-700 text-white rounded-tl-xl font-semibold">
                    {place.city}
                </div>
            </div>
            <div className="flex flex-col gap-4 p-4">
                <h2 className="text-center text-2xl text-slate-800 font-semibold">
                    {place.numOfPlace} Places to stay
                </h2>
                <p className="text-center mt-2 text-lg text-slate-700">
                    Discover the best hotel apartment for your adventurous journey.
                </p>
            </div>
        </Link>
    );
};
