import React from 'react';
import { motion } from 'framer-motion';

export function BotaoAnimado({ text = "Comece Agora", onClick, className = "" }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(255, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`bg-white text-black font-bold py-3 px-8 rounded-full uppercase tracking-wider transition-colors duration-300 ${className}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            {text}
        </motion.button>
    );
}

export default BotaoAnimado;