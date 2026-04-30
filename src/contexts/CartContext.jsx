import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({});

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('@TgidStore:cart');
        if (savedCart) {
            return JSON.parse(savedCart);
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('@TgidStore:cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const itemExists = prevCart.find((item) => item.id === product.id);
            if (itemExists) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const decreaseQuantity = (productId) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === productId);
            if (existingProduct?.quantity === 1) {
                return prevCart.filter(item => item.id !== productId);
            }
            return prevCart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            );
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((acc, item) => acc + (item.preco * item.quantity), 0);
    const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart, cartTotal, cartQuantity }}>
            {children}
        </CartContext.Provider>
    );
}