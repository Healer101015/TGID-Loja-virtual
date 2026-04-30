import { motion } from 'framer-motion';

export function Footer() {
    return (
        <footer className="border-t border-white/[0.02] py-8 mt-auto bg-[#050505]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-600">


                <p>&copy; {new Date().getFullYear()} Tgid teste tecnico</p>


                <nav className="flex gap-6">
                    <motion.span
                        whileHover={{ color: "#d4d4d8" }}
                        className="transition-colors cursor-pointer"
                    >
                        Termos
                    </motion.span>
                    <motion.span
                        whileHover={{ color: "#d4d4d8" }}
                        className="transition-colors cursor-pointer"
                    >
                        Privacidade
                    </motion.span>


                    <motion.a
                        href="https://github.com/Healer101015"
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ color: "#d4d4d8" }}
                        className="transition-colors cursor-pointer"
                    >
                        GitHub
                    </motion.a>
                </nav>
            </div>
        </footer>
    );
}