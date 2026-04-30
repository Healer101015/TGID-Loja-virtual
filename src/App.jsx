import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans flex flex-col selection:bg-amber-500 selection:text-zinc-950">
          <Header />

          {/* O main com flex-1 garante que o Footer seja empurrado para o fim da tela */}
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produto/:id" element={<ProductDetails />} />
              <Route path="/carrinho" element={<Cart />} />
            </Routes>
          </main>

          {/* Uso do componente Footer separado */}
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}