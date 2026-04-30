import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

const SkeletonCard = () => (
    <div className="flex flex-col h-full animate-pulse">
        <div className="aspect-square bg-zinc-900/50 rounded-2xl mb-6 border border-white/5"></div>
        <div className="px-1 space-y-3">
            <div className="h-5 bg-zinc-900 rounded-md w-3/4"></div>
            <div className="h-4 bg-zinc-900/50 rounded-md w-full"></div>
        </div>
    </div>
);

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await api.get('/produtos');
                setTimeout(() => {
                    setProducts(response.data);
                    setLoading(false);
                }, 600);
            } catch (error) {
                console.error('Erro na API:', error);
                setLoading(false);
            }
        }
        loadProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.nome.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' ? true : product.categoria === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const categories = ['Todos', ...new Set(products.map(item => item.categoria))];

    useEffect(() => setCurrentPage(1), [searchTerm, selectedCategory]);

    return (
        <div className="w-full pt-24 pb-20">
            <div className="mb-10">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">Catálogo.</h1>
                <p className="text-zinc-500 font-light text-lg">Hardware de elite para setups de alto nível.</p>
            </div>

            {/* Barra de Filtros */}
            <div className="sticky top-20 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 pb-4 pt-2 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-wrap gap-1 bg-zinc-900/30 p-1 rounded-full border border-white/5">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className="relative px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.15em] font-bold focus:outline-none"
                        >
                            {selectedCategory === cat && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white rounded-full shadow-lg"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className={`relative z-10 transition-colors duration-300 ${selectedCategory === cat ? 'text-black' : 'text-zinc-500 hover:text-zinc-300'}`}>
                                {cat}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-80">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-full px-6 py-3 focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-600 text-sm font-light"
                    />
                </div>
            </div>

            {/* 
        
         
      */}
            <div className="min-h-[800px]">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
                        >
                            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
                        </motion.div>
                    ) : (
                        <motion.div
                            key={selectedCategory + searchTerm + currentPage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
                        >
                            {currentProducts.map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {!loading && filteredProducts.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-40 border border-dashed border-zinc-800 rounded-3xl">
                        <p className="text-zinc-500 font-light">Nenhum item encontrado.</p>
                    </motion.div>
                )}
            </div>

            {/* 
         
      */}
            {!loading && totalPages > 1 && (
                <nav className="flex justify-center items-center mt-24 gap-3">
                    <div className="flex items-center gap-1 bg-zinc-900/30 p-1 rounded-full border border-white/5">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => {
                                    setCurrentPage(pageNumber);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="relative w-10 h-10 rounded-full text-xs font-bold transition-colors flex items-center justify-center focus:outline-none"
                            >
                                <AnimatePresence>
                                    {currentPage === pageNumber && (
                                        <motion.div
                                            layoutId="activePageIndicator"
                                            className="absolute inset-0 bg-white rounded-full shadow-xl"
                                            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                        />
                                    )}
                                </AnimatePresence>
                                <span className={`relative z-10 ${currentPage === pageNumber ? 'text-black' : 'text-zinc-500 hover:text-white'}`}>
                                    {pageNumber}
                                </span>
                            </button>
                        ))}
                    </div>
                </nav>
            )}
        </div>
    );
}