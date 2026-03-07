<div align="center">
  <img src="https://raw.githubusercontent.com/nextjs/next.js/canary/assets/next.js.png" alt="Next.js" width="100"/>
  <h1>🍀 Loterias Pro</h1>
  <p><strong>Plataforma Inteligente para Análise e Simulação de Loterias</strong></p>
  
  <p>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js">
    <img alt="React" src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-007ACC?style=for-the-badge&logo=typescript">
    <img alt="TailwindCSS" src="https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css">
  </p>
</div>

<br>

O **Loterias Pro** (originalmente projeto *lotofacil*) é uma aplicação web moderna desenvolvida para jogadores e entusiastas das loterias brasileiras. A plataforma oferece ferramentas avançadas de simulação, análise de combinações e prospecção de jogos para **Lotofácil**, **Mega-Sena** e **Quina**.

---

## ✨ Funcionalidades

- 🎲 **Simulador Dinâmico (Lotofácil, Mega-Sena, Quina)**: Crie, teste e valide suas combinações antes de jogar.
- 📊 **Prospecção de Jogos**: Geração inteligente e análise de possíveis resultados.
- 🌓 **Modo Noturno/Claro**: Interface adaptável às preferências do usuário utilizando `next-themes`.
- 📄 **Exportação/Importação Excel**: Gerencie seus jogos facilmente através de planilhas integradas com `xlsx`.
- 💸 **Integração PIX**: Geração de QR Codes dinâmicos para pagamentos ou doações utilizando `qrcode.react`.
- 📱 **Design Responsivo**: Experiência de uso perfeita em celulares, tablets e desktops (Tailwind CSS).

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as ferramentas mais modernas do ecossistema front-end:

* **[Next.js 16](https://nextjs.org/)** - Framework React com App Router e Server Actions.
* **[React 19](https://react.dev/)** - Biblioteca para construção de interfaces de usuário.
* **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para maior segurança e previsibilidade no código.
* **[Tailwind CSS v4](https://tailwindcss.com/)** - Estilização utilitária de alta performance.
* **[Lucide React](https://lucide.dev/)** - Pacote de ícones minimalistas e bonitos.
* **[XLSX](https://sheetjs.com/)** - Manipulação robusta de arquivos de planilha.

---

## 📂 Estrutura do Projeto

```text
d:\Antigravity\lotofacil\
├── src/
│   ├── app/
│   │   ├── megasena/            # Rotas e lógicas específicas da Mega-Sena
│   │   ├── quina/               # Rotas e lógicas específicas da Quina
│   │   ├── simulador-dinamico/  # Simulador geral (Lotofácil)
│   │   ├── prospectar/          # Ferramenta de prospecção de combinações
│   │   ├── actions.ts           # Server Actions do Next.js
│   │   ├── layout.tsx           # Layout principal (estruturas como Navbar/Footer)
│   │   └── page.tsx             # Página inicial (Dashboard)
│   ├── components/              # Componentes React reutilizáveis (UI)
│   └── utils/                   # Funções auxiliares (ex: Integração PIX)
└── package.json                 # Dependências e scripts do projeto
```

---

## 🚀 Como Executar o Projeto Localmente

Siga o passo a passo abaixo para rodar o projeto na sua máquina:

### 1. Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 20+) instalado na sua máquina.

### 2. Instalação das dependências
Navegue até a pasta do projeto e instale as dependências usando seu gerenciador de pacotes favorito:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Executando o servidor de desenvolvimento
Inicie o projeto em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

### 4. Acessando a Aplicação
Abra o navegador e acesse: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploy na Vercel

A maneira mais fácil de colocar sua aplicação no ar é implantá-la através da **[Vercel](https://vercel.com/)**.
Como este projeto utiliza Next.js, a Vercel oferece suporte nativo e configurações automáticas "Zero Config".

Para mais detalhes, veja a [documentação oficial de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

---

<div align="center">
  Feito com ❤️ e muito código limpo. Boa sorte nos seus jogos! 🍀
</div>
