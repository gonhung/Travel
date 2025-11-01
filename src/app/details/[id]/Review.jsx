import person_image from "../../../../public/assets/bianco_2.jpg"
import { AiFillStar } from 'react-icons/ai';
import Image from 'next/image';

import React from 'react'
import { format } from "date-fns";

 const Review = ({
    review
 }) => {

  return (
    
    <div className="w-full flex gap-4">
                        <div className="w-full flex gap-4">
                            <div className="w-14 h-14">
                                <Image
                                    width="80"
                                    height="80"
                                    alt="person_image"
                                    className="w-full h-full object-cover rounded-full"
                                    src={person_image}
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[20px]">
                                    Hong Nhung
                                </h3>
                                <span className="text-slate-700">
                                    {format(review.createdAt, 'MMM do yyyy')}
                                </span>
                                <div className="mt-4 text-slate-800">
                                    {review.text}
                                </div>
                            </div>
                            <span className="ml-auto flex items-center gap-2">
                                {review.stars}
                                <AiFillStar
                                    size={22}
                                    color="rgb(59, 130, 246)"
                                />
                            </span>
                        </div>
                    </div>
  )
}


export  default Review