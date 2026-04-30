/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // Adicionada a fonte Anton, essencial para os títulos do estilo Gatoa
                anton: ['Anton', 'sans-serif'],
                teko: ['Teko', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            colors: {
                primary: '#000000', // Fundo preto total[cite: 5]
                accent: '#06b6d4',  // Ciano para detalhes neon
                gatoaRed: '#ff0000', // Vermelho para os destaques de texto
            },
            animation: {
                'float': 'float 4s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: .5 },
                }
            }
        },
    },
    plugins: [],
}