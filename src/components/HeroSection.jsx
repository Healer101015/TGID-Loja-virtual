import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BotaoAnimado } from './BotaoAnimado';

const heroImages = [
    "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1527443195645-1133e7d2b33a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80"
];

export function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const scrollToProducts = () => {
        window.scrollBy({ top: 700, behavior: 'smooth' });
    };

    return (
        <section className="relative w-full rounded-[2rem] overflow-hidden bg-zinc-900/20 border border-white/5 shadow-2xl mb-12">

            {/* Background Glow - Fixo para não estourar a tela no Mobile */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-amber-500/20 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Layout em Grid (Perfeito e Estável) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">

                {/* Lado Esquerdo: Textos */}
                <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 lg:p-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold tracking-widest uppercase mb-6">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                            Coleção Premium
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                            O ápice do <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                                seu Setup.
                            </span>
                        </h1>

                        <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed mb-8 max-w-md">
                            Equipamentos rigorosamente selecionados para quem exige o máximo de performance sem abrir mão da estética.
                        </p>

                        {/* Botão alinhado corretamente */}
                        <div className="flex w-full sm:w-auto">
                            <BotaoAnimado onClick={scrollToProducts} variant="primary" className="w-full sm:w-auto">
                                Explorar Catálogo
                            </BotaoAnimado>
                        </div>
                    </motion.div>
                </div>

                {/* Lado Direito: Carrossel (Caixa com tamanho bloqueado) */}
                <div className="relative z-10 flex items-center justify-center p-8 lg:p-12 bg-zinc-950/30">

                    {/* Container quadrado fixo. Impede que a tela pule! */}
                    <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.05, y: -10 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                src={heroImages[currentIndex]}
                                alt="Produto em Destaque"
                                className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
                            />
                        </AnimatePresence>
                    </div>

                    {/* Badge flutuante reposicionado para não cortar no mobile */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-6 left-6 md:bottom-12 md:left-12 bg-zinc-950/80 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-2xl shadow-2xl flex items-center gap-3 z-20"
                    >
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-500 flex items-center justify-center text-zinc-950 text-base md:text-lg">
                            ★
                        </div>
                        <div>
                            <p className="text-white text-xs md:text-sm font-bold">Top Quality</p>
                            <p className="text-zinc-400 text-[10px] md:text-xs">Rated 4.9/5</p>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}