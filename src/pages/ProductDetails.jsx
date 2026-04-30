import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { CartContext } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BotaoAnimado } from '../components/BotaoAnimado';
import { Toast } from '../components/Toast';

// Componente de carregamento (Skeleton) para uma experiência premium
const ProductSkeleton = () => (
    <div className="max-w-7xl mx-auto pt-24 px-6 lg:px-8 animate-pulse flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-1/2 aspect-square bg-zinc-900/50 rounded-[2.5rem] border border-white/5"></div>
        <div className="w-full lg:w-1/2 py-8 space-y-6">
            <div className="w-24 h-6 bg-zinc-900 rounded-full"></div>
            <div className="w-3/4 h-12 bg-zinc-900 rounded-lg"></div>
            <div className="space-y-3">
                <div className="w-full h-4 bg-zinc-900/50 rounded"></div>
                <div className="w-full h-4 bg-zinc-900/50 rounded"></div>
            </div>
            <div className="w-40 h-12 bg-zinc-900 rounded-lg mt-12"></div>
        </div>
    </div>
);

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        async function loadProduct() {
            try {
                const response = await api.get(`/produtos/${id}`);
                // Pequeno delay para suavizar a transição do skeleton
                setTimeout(() => {
                    setProduct(response.data);
                    setLoading(false);
                }, 600);
            } catch (error) {
                console.error('Erro ao carregar produto:', error);
                setLoading(false);
            }
        }
        loadProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    if (loading) return <ProductSkeleton />;

    if (!product) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-2xl text-zinc-500 mb-4">Produto não encontrado.</h2>
            <BotaoAnimado onClick={() => navigate('/')} variant="secondary">Voltar ao Início</BotaoAnimado>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8"
        >
            {/* Feedback Visual ao adicionar */}
            <Toast isVisible={showToast} message="Adicionado ao carrinho!" />

            <nav className="mb-10">
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-3 text-zinc-500 hover:text-white transition-colors"
                >
                    <svg className="group-hover:-translate-x-1 transition-transform" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Voltar
                </button>
            </nav>

            <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
                {/* Lado Esquerdo: Imagem do Produto */}
                <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-full lg:w-1/2 aspect-square rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 overflow-hidden shadow-2xl"
                >
                    <img
                        src={product.imagem}
                        alt={product.nome}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                </motion.div>

                {/* Lado Direito: Informações e Compra */}
                <motion.div
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-full lg:w-1/2 flex flex-col justify-center"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-amber-500 text-xs font-bold tracking-widest uppercase mb-6">
                        {product.categoria}
                    </span>

                    <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                        {product.nome}
                    </h1>

                    <p className="text-zinc-400 text-lg leading-relaxed font-light mb-10">
                        {product.descricao}
                    </p>

                    <div className="mb-10">
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest block mb-2">Preço à vista</span>
                        <p className="text-5xl font-light text-white tracking-tighter">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.preco)}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <BotaoAnimado
                            onClick={handleAddToCart}
                            variant="primary"
                            className="flex-1 py-5 text-lg"
                        >
                            Adicionar ao Carrinho
                        </BotaoAnimado>
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/5 pt-12">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-amber-500">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <span className="text-sm text-zinc-400">Entrega Expressa</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-amber-500">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </div>
                            <span className="text-sm text-zinc-400">Garantia Tgid</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}