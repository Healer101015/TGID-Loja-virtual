import { motion } from 'framer-motion';

export function BotaoAnimado({ children, onClick, variant = 'primary', className = '' }) {
    const variants = {
        primary: "bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 hover:from-amber-400 hover:to-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)] border border-amber-400/50",
        secondary: "bg-white/5 backdrop-blur-md text-zinc-300 border border-white/10 hover:bg-white/10 hover:text-white"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
        >
            {children}
        </motion.button>
    );
}