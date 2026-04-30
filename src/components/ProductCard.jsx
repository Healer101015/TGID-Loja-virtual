import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import { Toast } from './Toast'; // Importar o novo Toast

export function ProductCard({ product, index }) {
    const { addToCart } = useContext(CartContext);
    const [showToast, setShowToast] = useState(false);

    const handleAdd = () => {
        addToCart(product);
        setShowToast(true);

        // hide no alerta após 2 segundos
        setTimeout(() => {
            setShowToast(false);
        }, 2000);
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group flex flex-col h-full bg-[#0a0a0a] rounded-2xl border border-white/5 hover:border-white/10 transition-colors overflow-hidden shadow-lg"
        >
            {/* Toast flutuante específico deste card */}
            <Toast isVisible={showToast} message="Adicionado ao carrinho!" />

            <Link
                to={`/produto/${product.id}`}
                className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-900"
            >
                <span className="absolute top-3 left-3 z-20 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                    {product.categoria}
                </span>

                <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    src={product.imagem}
                    alt={product.nome}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </Link>

            <div className="flex flex-col flex-1 p-5 lg:p-6">
                <h3 className="text-zinc-100 font-bold text-lg leading-tight mb-2 line-clamp-1 group-hover:text-amber-500 transition-colors">
                    {product.nome}
                </h3>
                <p className="text-zinc-500 text-sm line-clamp-2 mb-6 font-light leading-relaxed">
                    {product.descricao}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-2xl font-black text-white tracking-tighter">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.preco)}
                    </span>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAdd} // Usar a nova função handleAdd
                        className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm font-bold hover:bg-amber-500 hover:border-amber-500 hover:text-zinc-950 transition-all duration-300"
                    >
                        Comprar
                    </motion.button>
                </div>
            </div>
        </motion.article>
    );
}