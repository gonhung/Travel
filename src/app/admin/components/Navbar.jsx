'use client';
import React, { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { IoCreateOutline } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import CreateModal from '../modals/create-modal/CreateModal';

export const Navbar = () => {
    const [showModal, setShowModal] = useState(false);

    const handleHideModel = () => setShowModal(false);
    const handleShowModel = () => setShowModal(true);
    return (
        <div className="sticky top-0 left-0 w-full flex justify-between items-center">
            <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 transition-all"
            >
                <h1 className="text-blue-600 text-2xl font-bold">TravelGod</h1>
                <AiOutlineHome size={25} color="rgb(37 99 235)" />
            </Link>
            <div className="flex items-center gap-6">
                <button
                    onClick={handleShowModel}
                    className="bg-[#4522f4] px-2 py-1 cursor-pointer rounded-xl transition hover:bg-[#5738f2]"
                >
                    <IoCreateOutline size={20} color="#fff" />
                </button>
                <button className="cursor-pointer">
                    <FaUser size={22} color="rgb(37 99 235)" />
                </button>
                {showModal && <CreateModal handleHideModal={handleHideModel} />}
            </div>
        </div>
    );
};
