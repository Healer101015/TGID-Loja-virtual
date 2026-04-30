import heroImg from '../assets/hero.jpg';
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CarouselBanner() {
    const navigate = useNavigate();

    const handleClick = () => {
        // vai pra home e rola até os produtos
        navigate('/');
        setTimeout(() => {
            const section = document.getElementById('mais-vendidos');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[1920px] h-[300px] md:h-[500px] relative overflow-hidden">

                {/* Imagem */}
                <img
                    src={heroImg}
                    alt="Banner Intermediário"
                    className="object-cover w-full h-full"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Conteúdo */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white font-anton leading-tight">
                        COMPRE COM <span className="text-red-600">ESTILO</span>
                    </h2>

                    <p className="mt-3 text-sm md:text-base text-zinc-300 max-w-md font-inter leading-relaxed">
                        Produtos selecionados com qualidade e performance pra você ir além.
                    </p>

                    <button
                        onClick={handleClick}
                        className="mt-6 px-8 py-3 border-2 border-red-600 bg-red-600 text-white font-bold uppercase text-sm tracking-wide hover:bg-black hover:text-red-600 transition-all"
                    >
                        Ver Produtos
                    </button>
                </div>

            </div>
        </div>
    );
}