import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { SuccessModal } from '../components/SuccessModal';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function Cart() {
    const { cart, removeFromCart, addToCart, decreaseQuantity, clearCart, cartTotal } = useContext(CartContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckout = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        clearCart();
    };

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
                <ShoppingBag size={64} className="mb-6 text-zinc-800" strokeWidth={1} />
                <h2 className="text-5xl font-black tracking-tight uppercase italic font-anton mb-4 leading-tight">
                    Carrinho vazio<span className="text-red-600">.</span>
                </h2>
                <p className="text-zinc-500 text-sm font-inter mb-10 leading-relaxed">
                    Nenhum item adicionado ainda
                </p>
                <Link to="/">
                    <button className="px-10 py-4 bg-red-600 text-white font-black uppercase tracking-wide text-base hover:bg-white hover:text-black transition-colors border-2 border-red-600">
                        Voltar para a Loja
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-6">
            <AnimatePresence>
                {isModalOpen && <SuccessModal isOpen={isModalOpen} onClose={handleCloseModal} />}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <header className="mb-12 pb-5 border-b-4 border-red-600 flex items-end justify-between">
                    <h1 className="text-6xl sm:text-7xl font-black tracking-tight uppercase italic font-anton leading-[0.95]">
                        Carrinho<span className="text-red-600">.</span>
                    </h1>
                    <span className="text-zinc-500 text-sm font-inter mb-1 tracking-wide">
                        {cart.reduce((acc, i) => acc + i.quantity, 0)} {cart.reduce((acc, i) => acc + i.quantity, 0) === 1 ? 'item' : 'itens'}
                    </span>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Lista de produtos */}
                    <div className="lg:col-span-8 space-y-3">

                        {/* Cabeçalho da tabela */}
                        <div className="hidden sm:grid grid-cols-12 text-xs font-bold text-zinc-500 font-inter pb-3 border-b border-zinc-800 px-4 tracking-wide">
                            <span className="col-span-5">Produto</span>
                            <span className="col-span-3 text-center">Quantidade</span>
                            <span className="col-span-3 text-right">Subtotal</span>
                            <span className="col-span-1"></span>
                        </div>

                        <AnimatePresence mode="popLayout">
                            {cart.map((item) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    key={item.id}
                                    className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 bg-zinc-900 border border-zinc-800 p-5 hover:border-zinc-600 transition-colors"
                                >
                                    {/* Imagem + info */}
                                    <div className="sm:col-span-5 flex items-center gap-4">
                                        <div className="w-16 h-16 bg-black border border-zinc-700 overflow-hidden flex-shrink-0">
                                            <img src={item.imagem} alt={item.nome} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="min-w-0 space-y-1">
                                            <h3 className="text-base font-bold uppercase leading-snug tracking-tight font-inter truncate">
                                                {item.nome}
                                            </h3>
                                            <p className="text-red-500 font-semibold text-sm mt-1 font-inter leading-relaxed">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Quantidade */}
                                    <div className="sm:col-span-3 flex justify-start sm:justify-center">
                                        <div className="flex items-center border border-zinc-700 bg-black">
                                            <button
                                                onClick={() => decreaseQuantity(item.id)}
                                                className="w-9 h-9 flex items-center justify-center hover:bg-zinc-800 transition-colors border-r border-zinc-700"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="w-9 text-center font-bold text-sm font-inter tracking-wide">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="w-9 h-9 flex items-center justify-center hover:bg-zinc-800 transition-colors border-l border-zinc-700"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Subtotal desktop */}
                                    <div className="hidden sm:flex sm:col-span-3 justify-end">
                                        <p className="text-white font-bold text-base font-inter tracking-tight leading-snug">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco * item.quantity)}
                                        </p>
                                    </div>

                                    {/* Remover desktop */}
                                    <div className="hidden sm:flex sm:col-span-1 justify-end">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-zinc-600 hover:text-red-600 transition-colors p-1"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    {/* Mobile */}
                                    <div className="sm:hidden flex justify-between items-center border-t border-zinc-800 pt-4 mt-2">
                                        <p className="text-white font-bold text-base font-inter leading-snug">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco * item.quantity)}
                                        </p>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-zinc-600 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <div className="pt-4">
                            <button
                                onClick={clearCart}
                                className="text-zinc-600 hover:text-white text-xs font-inter transition-colors tracking-wide"
                            >
                                Limpar carrinho
                            </button>
                        </div>
                    </div>

                    {/* Resumo */}
                    <aside className="lg:col-span-4">
                        <div className="bg-zinc-900 border-2 border-white p-8 sticky top-28">
                            <h3 className="text-2xl font-black uppercase italic tracking-tight leading-tight mb-6 pb-4 border-b-2 border-red-600 font-anton">
                                Resumo
                            </h3>

                            <div className="space-y-5 mb-8">
                                <div className="flex justify-between font-inter text-sm">
                                    <span className="text-zinc-400">Subtotal</span>
                                    <span className="text-white font-semibold">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}
                                    </span>
                                </div>
                                <div className="flex justify-between font-inter text-sm">
                                    <span className="text-zinc-400">Frete</span>
                                    <span className="text-green-400 font-semibold">Grátis</span>
                                </div>
                                <div className="flex justify-between items-center pt-6 border-t border-zinc-800">
                                    <span className="font-black uppercase italic font-anton text-base">Total</span>
                                    <span className="text-3xl font-black tracking-tight text-white font-anton">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}
                                    </span>
                                </div>
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={handleCheckout}
                                className="w-full bg-red-600 hover:bg-white hover:text-black text-white py-5 font-black uppercase tracking-wide text-lg transition-all border-2 border-red-600 font-anton"
                            >
                                Finalizar Compra
                            </motion.button>

                            <Link to="/" className="block mt-5 text-center text-zinc-500 hover:text-white text-xs font-inter transition-colors tracking-wide">
                                Continuar comprando
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}