'use client';
import React, { useState } from 'react';
import Review from './Review';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { transform } from 'zod';
import toast from 'react-hot-toast';
import { AiFillStar } from 'react-icons/ai';
import { getReviewsByListing, postReview } from './service';
import Pagination from '@/components/pagination/Pagination';

export const Reviews = ({ id }) => {
    const [selectedStar, setSelectedStar] = useState(5);
    const [text, setText] = useState('');
    const queryClient = useQueryClient();

    const { data: reviews, isPending: isPendingQuery } = useQuery({
        queryFn: () => getReviewsByListing(id),
        queryKey: ['review'],
    });

    console.log(reviews)

    const { mutate, isPending } = useMutation({
        mutationFn : () =>  handleSubmit(),
        onSuccess: () => {
            queryClient.invalidateQueries(['review']);
        },
        refetchQueries: ['review'],
    });

    const itemsPerPage = 4;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentReviews = reviews?.slice(itemOffset, endOffset)

    if (isPending) {
        const style = {
            marginTop: '5rem',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '100%',
        };

        return (
            <div style={style}>
                <Clipboard color={'#123abc'} />
            </div>
        );
    }
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (text === '') return toast.error("Review can't be empty");

            const body = {
                text,
                stars: selectedStar,
            };

            await postReview(id, body);
            toast.success('Successfully posted a review');
            setText('');
        } catch (error) {
            console.log(error);
        }
    }
    console.log('reviews ', reviews)
    return (
        <div className="border-t-2 border-white-800 px-6 mt-16 mx-auto">
            <h1 className="mt-16 text-3xl font-bold">Reviews</h1>
            <div className="mt-8 flex items-center gap-6">
                {/*[0,1,2,3,4] */}
                {Array.from(Array(5).keys()).map((number) => (
                    <span
                        key={number + 1}
                        onClick={() => setSelectedStar(number + 1)}
                        className={`${
                            selectedStar === number + 1 ? 'scale-125' : ''
                        } cursor-pointer flex items-center gap-2 transition-all`}
                    >
                        {number + 1}
                        <AiFillStar size={22} color="rgb(59, 130, 246)" />
                    </span>
                ))}
            </div>
            <form
                onSubmit={handleSubmit}
                className="mt-8 flex items-center gap-28 border rounded-lg py-4 px-6 w-max"
            >
                <input
                    className="outline-none"
                    type="text"
                    placeholder="Leave your opinion..."
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />
                <button className="cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 hover:bg-blue-400 transition-all ">
                    Post
                </button>
            </form>
            <div className="mt-16 h-[900px] flex flex-col gap-24 w-1/3">
            {currentReviews?.map((review) => (
                   <Review key={review.id}
                   review={review} />
            ))}
            <Pagination
            setItemOffset={setItemOffset}
            itemsPerPage={itemsPerPage}
            reviews={reviews}
            />
            </div>
        </div>
    );
};

export default Reviews
