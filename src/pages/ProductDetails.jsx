import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { CartContext } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import { Toast } from '../components/Toast';

const ProductSkeleton = () => (
    <div className="min-h-screen bg-black pt-24 px-6 animate-pulse">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/2 aspect-[3/4] bg-zinc-900 border border-zinc-800"></div>
            <div className="w-full lg:w-1/2 py-8 space-y-6">
                <div className="w-24 h-4 bg-zinc-800 rounded"></div>
                <div className="w-3/4 h-14 bg-zinc-900 rounded"></div>
                <div className="w-full h-4 bg-zinc-800 rounded"></div>
                <div className="w-2/3 h-4 bg-zinc-800 rounded"></div>
                <div className="w-40 h-16 bg-zinc-900 rounded mt-8"></div>
            </div>
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
    const [added, setAdded] = useState(false);

    useEffect(() => {
        // 🔥 garante que a página abre no topo
        window.scrollTo({ top: 0, behavior: 'instant' });

        async function loadProduct() {
            try {
                const response = await api.get(`/produtos/${id}`);
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
        setAdded(true);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            setAdded(false);
        }, 2000);
    };

    if (loading) return <ProductSkeleton />;

    if (!product) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
            <h2 className="text-3xl font-black tracking-tight uppercase mb-6 text-zinc-500 leading-tight">
                Produto não encontrado.
            </h2>
            <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-white text-black font-black uppercase text-sm tracking-wide hover:bg-red-600 hover:text-white transition-colors"
            >
                Voltar ao Início
            </button>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-black text-white"
        >
            <Toast isVisible={showToast} message="Adicionado ao carrinho!" />

            <div className="max-w-6xl mx-auto pt-24 pb-20 px-4 sm:px-6">

                {/* Voltar */}
                <nav className="mb-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors uppercase text-xs font-bold tracking-wider"
                    >
                        <svg className="group-hover:-translate-x-1 transition-transform" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Voltar
                    </button>
                </nav>

                <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">

                    {/* Imagem */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="w-full lg:w-[48%] relative"
                    >
                        <div className="absolute top-0 left-0 z-10 bg-red-600 px-3 py-1">
                            <span className="text-white text-xs font-black uppercase tracking-wider">
                                {product.categoria}
                            </span>
                        </div>

                        <div className="w-full aspect-[3/4] bg-zinc-900 border border-zinc-800 overflow-hidden">
                            <img
                                src={product.imagem}
                                alt={product.nome}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Infos */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="w-full lg:w-[52%] flex flex-col pt-6 space-y-6"
                    >
                        <h1 className="text-5xl sm:text-6xl font-black uppercase tracking-tight leading-[1.05] font-anton">
                            {product.nome}
                        </h1>

                        <div className="w-16 h-1 bg-red-600"></div>

                        <p className="text-zinc-400 text-base leading-relaxed font-inter max-w-xl">
                            {product.descricao}
                        </p>

                        {/* Preço */}
                        <div className="pt-4">
                            <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-2 font-inter">
                                Preço à vista
                            </span>
                            <p className="text-5xl sm:text-6xl font-black tracking-tight text-white font-anton leading-tight">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.preco)}
                            </p>
                        </div>

                        {/* Botão */}
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={handleAddToCart}
                            className={`w-full py-5 font-black uppercase tracking-wide text-lg transition-all border-2 ${added
                                    ? 'bg-white text-black border-white'
                                    : 'bg-red-600 text-white border-red-600 hover:bg-black hover:text-red-600'
                                }`}
                        >
                            {added ? '✓ Adicionado!' : 'Adicionar ao Carrinho'}
                        </motion.button>

                        {/* Selos */}
                        <div className="mt-6 grid grid-cols-2 gap-5 border-t border-zinc-800 pt-8">
                            {[
                                'Entrega Expressa',
                                'Garantia Tgid',
                                'Pagamento Seguro',
                                'Troca Fácil'
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-8 h-8 border border-zinc-700 flex items-center justify-center text-red-600">
                                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-xs text-zinc-400 uppercase font-bold tracking-wide font-inter leading-snug">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}