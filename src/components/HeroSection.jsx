import React from "react";
import { motion } from "framer-motion";
import heroBg from "../assets/hero.jpg";

export default function HeroSection() {
    return (
        <section className="relative w-full h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden bg-black">

            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-80"
                style={{ backgroundImage: `url(${heroBg})` }}
            />



            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 px-4 mt-20"
            >
                <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wide leading-tight font-anton">
                    COMPRE <span className="text-red-600">SEM LIMITES</span>
                </h1>

                <p className="mt-4 text-sm md:text-base font-light text-gray-200 max-w-xl mx-auto leading-relaxed font-inter">
                    Compre o que você ama. Sinta a diferença.
                </p>
            </motion.div>
        </section>
    );
}