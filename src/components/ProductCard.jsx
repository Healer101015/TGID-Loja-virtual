import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { Toast } from "../components/Toast";

export function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [showToast, setShowToast] = useState(false);

    const productPrice = product && (product.price || product.preco || product.valor)
        ? Number(product.price || product.preco || product.valor) : 0;

    const productName = product?.name || product?.nome || "Produto";
    const productImage = product?.imageUrl || product?.imagem || "https://placehold.co/400x500/111/eee?text=Produto";

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);

        // 🔥 mostra o toast
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 2000);
    };

    return (
        <>
            <Toast isVisible={showToast} message="Adicionado ao carrinho!" />

            <motion.div
                whileHover={{ y: -5 }}
                className="bg-black text-white flex flex-col w-full cursor-pointer"
                onClick={() => navigate(`/produto/${product.id}`)}
            >
                <motion.img
                    src={productImage}
                    alt={productName}
                    className="w-full aspect-[3/4] object-cover border border-zinc-800"
                />

                <div className="px-1 py-4 flex flex-col items-start uppercase tracking-wide space-y-1">
                    <h3 className="text-lg font-normal leading-snug font-teko">
                        {productName}
                    </h3>

                    <p className="text-2xl font-bold font-teko">
                        R$ {productPrice.toFixed(2)}
                    </p>

                    <button
                        onClick={handleAddToCart}
                        className="mt-3 w-full border border-white bg-black text-white px-4 py-2.5 text-sm font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-colors font-inter"
                    >
                        Adicionar ao carrinho
                    </button>
                </div>
            </motion.div>
        </>
    );
}