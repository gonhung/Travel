'use client';
import Image from 'next/image';
import React from 'react';

export const Hero = ({ image, mainHeader, secondaryHeader }) => {
    return (
        <div>
            <div className="relative h-screen w-full">
                <Image src={image}  className="brightness-50 h-full w-full object-cover"/>
                <div className="absolute bottom-0 top-0 left-0 right-0 flex flex-col justify-center items-center gap-8">
                    <h2 className="text-white text-6xl font-bold text-center">
                        {mainHeader}
                    </h2>
                    <h5 className="text-white text-4xl font-bold text-center" >
                      {secondaryHeader}
                    </h5>
                </div>
            </div>
        </div>
    );
};
