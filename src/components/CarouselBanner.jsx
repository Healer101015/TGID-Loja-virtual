import heroImg from '../assets/hero.jpg';

import React from "react";

export default function CarouselBanner() {
    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[1920px] h-[300px] md:h-[500px]">
                <img
                    src={heroImg}
                    alt="Banner Intermediário"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    );
}