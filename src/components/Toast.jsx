import { motion, AnimatePresence } from 'framer-motion';

export function Toast({ isVisible, message }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 20, x: '-50%' }}
                    className="fixed bottom-10 left-1/2 z-[100] bg-black border border-red-600 text-white px-6 py-3 rounded-full font-bold shadow-[0_10px_30px_rgba(220,38,38,0.35)] flex items-center gap-3"
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" className="text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
}