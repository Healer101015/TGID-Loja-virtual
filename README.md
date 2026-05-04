# TGID TESTE TECNICO

---

Uma aplicação de e-commerce de hardware, com foco em uma experiência minimalista e fluida. Este projeto foi desenvolvido no contexto de um teste técnico, utilizando React, Tailwind CSS e Framer Motion.

---

## 🛠️ Tecnologias Utilizadas

*   **Frontend:** React.js
*   **Estilização:** Tailwind CSS (Dark Mode & Glassmorphism)
*   **Animações:** Framer Motion (Transições fluidas e estados de layout)
*   **Gerenciamento de Estado:** Context API (Carrinho de compras)
*   **Roteamento:** React Router DOM
*   **Backend Simulado:** JSON Server (API REST)
*   **Ícones:** Lucide React / Heroicons

---

## ✨ Funcionalidades

### Obrigatórias
*   **Listagem de Produtos:** Exibição dinâmica consumindo a API do JSON Server.
*   **Visualização Individual:** Página de detalhes dedicada para cada hardware com carregamento via Skeleton Screen.
*   **Carrinho de Compras:** Sistema completo para adicionar, remover, aumentar/diminuir quantidades e limpar o carrinho.
*   **Resumo de Pedido:** Cálculo em tempo real do valor total e quantidade de itens.

### Diferenciais Premium (Extras)
*   **Filtros Avançados:** Filtragem por categoria e busca por texto em tempo real.
*   **Paginação Inteligente:** Navegação entre páginas com transições suaves e correção de "jump" de layout.
*   **Feedback Visual (Toast):** Alertas animados ao adicionar itens ao carrinho, substituindo o `alert` nativo.
*   **Modal de Sucesso:** Finalização de compra com modal customizado e imersivo.
*   **UX Refinada:** 
    *   **Skeleton Screens:** Carregamento elegante que evita piscadas de tela.
    *   **AnimatePresence:** Transições de página e trocas de filtro que respeitam o tempo de saída dos elementos.
    *   **Sticky Header:** Navegação com efeito de vidro fosco (glassmorphism) que reage ao scroll.

---

## 📦 Como Executar o Projeto

### 1. Clonar o Repositório
```bash
git clone https://github.com/Healer101015/TGID-Loja-virtual
cd TGID-Loja-virtual
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Iniciar o JSON Server (Backend)
O projeto depende do arquivo `dbTeste.json` para funcionar. Em um terminal separado, execute:
```bash
npm run server
```
*O servidor rodará em `http://localhost:3000`*.

### 4. Iniciar a Aplicação (Frontend)
```bash
npm run dev
```
*Acesse `http://localhost:5173` no seu navegador.*

### OPCIONAL. Iniciar a Aplicação (Frontend) e (Backend) ao mesmo tempo
```bash
npm run start:all
```
*Acesse `http://localhost:5173` no seu navegador.*

---

## 📂 Estrutura de Pastas
```text
src/
 ├── assets/          # Logo e recursos estáticos
 ├── components/      # Componentes reutilizáveis 
 ├── contexts/        # Gerenciamento de estado 
 ├── pages/           # Home, ProductDetails e Cart
 ├── services/        # Configuração do Axios para API
 └── App.jsx          # Estrutura principal e rotas
```

---

## 👤 Desenvolvedor
**João Henrique Brito (Healer101015)**
*Full Stack Developer*

---
*Este projeto foi concluído dentro do prazo de 24 horas estabelecido pelo desafio.*
