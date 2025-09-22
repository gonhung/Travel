'use client';
import React, { useEffect, useState } from 'react';

export const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleModal = () => setShowModal((prev) => !prev);

    useEffect(() => {
        window.onscroll = () => {
            setIsScrolled(window.pageYOffset === 0 ? false : true);
            return () => (window.onscroll = null)
        };
    }, []);
    return <div>Navbar</div>;
};
