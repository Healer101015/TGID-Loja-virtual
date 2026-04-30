import { motion } from 'framer-motion';
import { BotaoAnimado } from './BotaoAnimado';

export function SuccessModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop (Fundo escurecido) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />

            {/* Card do Modal */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-zinc-900 border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center overflow-hidden"
            >
                {/* Glow de fundo no modal */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl -z-10" />

                <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                    <svg width="40" height="40" fill="none" stroke="black" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">Pedido Finalizado!</h2>
                <p className="text-zinc-500 font-light mb-8">
                    Seu setup está prestes a ficar muito mais potente. Enviamos os detalhes para o seu e-mail.
                </p>

                <BotaoAnimado onClick={onClose} variant="primary" className="w-full">
                    Continuar Comprando
                </BotaoAnimado>
            </motion.div>
        </div>
    );
}