import { useContext, useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import logoImg from '../assets/tgid.svg';

export function Header() {
    const { cartQuantity } = useContext(CartContext);
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 20);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Fecha menu mobile ao trocar de rota
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Trava scroll quando menu mobile aberto
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                        ? 'bg-[#080808]/90 backdrop-blur-2xl border-b border-white/[0.06] py-2 shadow-[0_1px_40px_rgba(0,0,0,0.6)]'
                        : 'bg-transparent border-transparent py-4'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg"
                        aria-label="Voltar à página inicial"
                    >
                        <div className="w-14 h-14 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            <img
                                src={logoImg}
                                alt="Tgid Store"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </Link>

                    {/* Nav Desktop */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium" aria-label="Navegação principal">
                        <Link
                            to="/"
                            className={`relative pb-0.5 transition-colors tracking-wide ${isActive('/')
                                    ? 'text-white'
                                    : 'text-zinc-500 hover:text-zinc-200'
                                }`}
                        >
                            {isActive('/') && (
                                <span className="absolute -bottom-1 left-0 right-0 h-px bg-amber-500 rounded-full" />
                            )}
                            Catálogo
                        </Link>

                        <Link
                            to="/carrinho"
                            className={`relative flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${isActive('/carrinho')
                                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                    : 'bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:bg-white/[0.08] hover:text-white hover:border-white/20'
                                }`}
                            aria-label={`Carrinho com ${cartQuantity} ${cartQuantity === 1 ? 'item' : 'itens'}`}
                        >
                            <CartIcon />
                            <span className="text-xs font-semibold tracking-wide">Carrinho</span>

                            {cartQuantity > 0 && (
                                <span
                                    key={cartQuantity}
                                    className="animate-bounce-once bg-amber-500 text-zinc-950 text-[10px] font-black min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center leading-none"
                                >
                                    {cartQuantity > 99 ? '99+' : cartQuantity}
                                </span>
                            )}
                        </Link>
                    </nav>

                    {/* Mobile: Carrinho + Hamburger */}
                    <div className="flex md:hidden items-center gap-3">
                        <Link
                            to="/carrinho"
                            className="relative p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-400"
                            aria-label={`Carrinho com ${cartQuantity} itens`}
                        >
                            <CartIcon size={18} />
                            {cartQuantity > 0 && (
                                <span className="absolute -top-1 -right-1 bg-amber-500 text-zinc-950 text-[9px] font-black min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                                    {cartQuantity > 99 ? '99+' : cartQuantity}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={() => setIsMobileMenuOpen((v) => !v)}
                            className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-400"
                            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="flex flex-col gap-1.5 w-5">
                                <span className={`block h-px bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <span className={`block h-px bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`block h-px bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Drawer */}
                <nav
                    className={`absolute top-0 right-0 h-full w-72 bg-[#0c0c0c] border-l border-white/[0.06] flex flex-col pt-24 px-6 pb-8 gap-2 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    aria-label="Menu mobile"
                >
                    <MobileNavLink to="/" label="Catálogo" isActive={isActive('/')} />
                    <MobileNavLink to="/carrinho" label={`Carrinho ${cartQuantity > 0 ? `(${cartQuantity})` : ''}`} isActive={isActive('/carrinho')} />
                </nav>
            </div>
        </>
    );
}

function CartIcon({ size = 18 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    );
}

function MobileNavLink({ to, label, isActive }) {
    return (
        <Link
            to={to}
            className={`px-4 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-colors ${isActive
                    ? 'bg-white/[0.08] text-white border border-white/10'
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]'
                }`}
        >
            {label}
        </Link>
    );
}