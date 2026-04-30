import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import HeroSection from '../components/HeroSection';
import CarouselBanner from '../components/CarouselBanner';
import { ProductCard } from '../components/ProductCard';

const ITEMS_PER_PAGE = 8;

export default function Home() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // 🔥 novos estados
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/produtos');
                setProducts(response.data);
            } catch (error) { console.error(error); }
        };
        fetchProducts();
    }, []);

    // 🔥 pega categorias únicas
    const categories = ['all', ...new Set(products.map(p => p.categoria))];

    // 🔥 filtro
    const filteredProducts = products.filter(p => {
        const name = (p.nome || '').toLowerCase();
        const matchSearch = name.includes(search.toLowerCase());
        const matchCategory = category === 'all' || p.categoria === category;
        return matchSearch && matchCategory;
    });

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        document.getElementById('mais-vendidos').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-black min-h-screen text-white w-full overflow-x-hidden">
            <HeroSection />

            {/* NOVO DROP */}
            <section className="w-full py-24 px-6 md:px-12 flex flex-col items-center space-y-12">
                <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight leading-tight font-anton text-center">
                    <span className="text-red-600">NOVO</span> DROP
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
                    {products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </section>

            <CarouselBanner />

            {/* MAIS VENDIDOS */}
            <section id="mais-vendidos" className="w-full py-24 px-6 md:px-12 flex flex-col items-center space-y-10">

                <h2 className="text-4xl md:text-6xl uppercase font-bold font-anton tracking-tight text-center leading-[1.05] max-w-3xl">
                    MAIS VENDIDOS <span className="text-red-600">PRA VOCÊ AMAR</span>
                </h2>

                {/* 🔍 FILTROS */}
                <div className="w-full max-w-6xl flex flex-col md:flex-row gap-4">

                    {/* busca */}
                    <input
                        type="text"
                        placeholder="Buscar produto..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full md:flex-1 bg-black border border-zinc-700 px-4 py-3 text-sm font-inter focus:outline-none focus:border-white"
                    />

                    {/* categoria */}
                    <select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="bg-black border border-zinc-700 px-4 py-3 text-sm font-inter focus:outline-none focus:border-white"
                    >
                        {categories.map((cat, i) => (
                            <option key={i} value={cat}>
                                {cat === 'all' ? 'Todas categorias' : cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* produtos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14 w-full max-w-6xl">
                    {paginatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>

                {/* Paginação */}
                {totalPages > 1 && (
                    <div className="flex items-center gap-3 mt-6">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="w-10 h-10 flex items-center justify-center border border-zinc-700 text-zinc-400 hover:border-white hover:text-white transition-colors disabled:opacity-20"
                        >
                            ‹
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 font-black text-sm border-2 ${currentPage === page
                                        ? 'bg-red-600 border-red-600'
                                        : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 flex items-center justify-center border border-zinc-700 text-zinc-400 hover:border-white hover:text-white transition-colors disabled:opacity-20"
                        >
                            ›
                        </button>
                    </div>
                )}
            </section>

            {/* FEEDBACKS */}
            <section className="w-full bg-[#cb5c4b] py-24 px-4">
                <div className="max-w-5xl mx-auto text-center space-y-12">
                    <h2 className="text-4xl md:text-5xl uppercase font-bold text-white tracking-tight font-anton">
                        FEEDBACKS
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="border border-white/40 rounded-lg p-6 text-left flex items-center min-h-[160px]">
                                <p className="italic text-base md:text-lg leading-relaxed font-inter">
                                    "Produto chegou rápido, bem embalado e com ótimo desempenho. Superou minhas expectativas."
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}