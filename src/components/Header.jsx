import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../contexts/CartContext";

export default function Header() {
    const { cart } = useContext(CartContext);

    // Calcula o total do carrinho
    const totalCart = cart ? cart.reduce((acc, item) => acc + (Number(item.price || item.preco || item.valor || 0) * (item.quantity || 1)), 0) : 0;

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-black py-4 px-6 flex justify-between items-center z-50">

                {/* Logo TGID */}
                <Link to="/" className="flex-shrink-0 text-white text-3xl uppercase tracking-widest" style={{ fontFamily: "'Anton', sans-serif" }}>
                    TGID
                </Link>


                {/* Lado direito - SÓ O CARRINHO */}
                <div className="flex items-center gap-3 text-white font-semibold text-[15px]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <span>R$ {totalCart.toFixed(2)}</span>

                    <Link to="/carrinho" className="ml-1 hover:text-red-600 transition-colors">
                        <ShoppingCart size={20} />
                    </Link>
                </div>
            </header>

            {/* Espaço para não sobrepor o conteúdo abaixo da barra fixa */}
            <div className="pt-16"></div>
        </>
    );
}