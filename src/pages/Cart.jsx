import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BotaoAnimado } from '../components/BotaoAnimado';
import { SuccessModal } from '../components/SuccessModal';

export default function Cart() {
    const { cart, removeFromCart, addToCart, decreaseQuantity, clearCart, cartTotal } = useContext(CartContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckout = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        clearCart();
    };

    // Variáveis de animação para a lista e itens
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, scale: 0.9, x: -50, transition: { duration: 0.3 } }
    };

    if (cart.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center min-h-[70vh] px-4"
            >
                <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="text-zinc-800 mb-8"
                >
                    <svg width="100" height="100" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                        <path d="M3 6h18" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                </motion.div>
                <h2 className="text-3xl font-light text-zinc-300 mb-6 tracking-tight">Seu carrinho está vazio.</h2>
                <Link to="/">
                    <BotaoAnimado variant="primary">
                        Explorar Catálogo
                    </BotaoAnimado>
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8"
        >
            <AnimatePresence>
                {isModalOpen && (
                    <SuccessModal isOpen={isModalOpen} onClose={handleCloseModal} />
                )}
            </AnimatePresence>

            <div className="mb-12">
                <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Carrinho</h1>
                <p className="text-zinc-500 font-light">Revise seus equipamentos antes de finalizar.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Lista de Itens */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-1 space-y-4"
                >
                    <AnimatePresence mode="popLayout">
                        {cart.map((item) => (
                            <motion.div
                                layout
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                key={item.id}
                                className="bg-white/[0.02] backdrop-blur-md rounded-2xl border border-white/5 p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 group hover:border-white/10 transition-colors"
                            >
                                <div className="w-20 h-20 sm:w-24 sm:h-24 p-2 rounded-xl bg-zinc-900/50 border border-white/5 flex items-center justify-center shrink-0">
                                    <img
                                        src={item.imagem}
                                        alt={item.nome}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-lg font-bold text-zinc-100 mb-1 line-clamp-1">{item.nome}</h3>
                                    <p className="text-amber-500 font-semibold tracking-tight">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco)}
                                    </p>
                                </div>

                                {/* Controles de Quantidade */}
                                <div className="flex items-center gap-3 bg-zinc-900/50 rounded-xl p-1.5 border border-white/5">
                                    <motion.button
                                        whileTap={{ scale: 0.8 }}
                                        onClick={() => decreaseQuantity(item.id)}
                                        className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
                                    </motion.button>

                                    <span className="text-white font-bold min-w-[24px] text-center text-sm">{item.quantity}</span>

                                    <motion.button
                                        whileTap={{ scale: 0.8 }}
                                        onClick={() => addToCart(item)}
                                        className="w-8 h-8 flex items-center justify-center text-amber-500 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
                                    </motion.button>
                                </div>

                                <div className="hidden sm:block text-right min-w-[100px] ml-2">
                                    <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold mb-1">Subtotal</p>
                                    <p className="text-white font-bold tracking-tight">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco * item.quantity)}
                                    </p>
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-3 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors ml-2"
                                >
                                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                                    </svg>
                                </motion.button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Resumo */}
                <div className="lg:w-[400px]">
                    <div className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] border border-white/5 p-8 sticky top-24 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-6 relative z-10">Resumo do Pedido</h3>

                        <div className="space-y-4 mb-8 relative z-10">
                            <div className="flex justify-between text-zinc-400 text-sm">
                                <span>Itens no carrinho:</span>
                                <span className="font-medium text-white">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
                            </div>
                            <div className="flex justify-between items-end pt-6 border-t border-white/5">
                                <span className="text-zinc-300 font-medium">Total</span>
                                <span className="text-4xl font-light text-amber-500 tracking-tighter">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}
                                </span>
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-col gap-4">
                            <BotaoAnimado onClick={handleCheckout} variant="primary" className="w-full py-4 text-base">
                                Finalizar Pedido
                            </BotaoAnimado>

                            <button
                                onClick={clearCart}
                                className="w-full bg-transparent text-zinc-500 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:text-white transition-colors"
                            >
                                Esvaziar Carrinho
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}