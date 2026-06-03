"use client";

import { useState } from "react";
import { 
    BookOpen, 
    HelpCircle, 
    Layers, 
    Sliders, 
    CheckCircle2, 
    TrendingUp,
    Info,
    RotateCcw
} from "lucide-react";

type ActiveTab = "geral" | "lotofacil" | "megasena" | "quina";

export default function ComoFuncionaPage() {
    const [activeTab, setActiveTab] = useState<ActiveTab>("geral");
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            q: "Os jogos gerados garantem o prêmio principal?",
            a: "Não. Na matemática das loterias, não existe fórmula mágica ou garantia de 100% de acerto sem cobrir todas as combinações possíveis (o que custaria milhões de reais). Nossos simuladores utilizam análise combinatória estruturada (desdobramentos e fechamentos) para otimizar seus bilhetes. A vantagem é que, caso as condições matemáticas das dezenas fixas sejam atendidas, as chances de obter prêmios secundários (como 11, 12, 13 ou 14 pontos na Lotofácil) aumentam exponencialmente."
        },
        {
            q: "Qual a diferença entre a Simulação Manual e a Dinâmica?",
            a: "A Simulação Manual gera um número fixo de 4 jogos analíticos baseados em uma matriz estrita de grupos (A + R3, B + R4, etc.). É perfeita para quem quer testar combinações clássicas com um orçamento fechado. A Simulação Dinâmica permite gerar de 1 a 500 jogos inéditos. Ela seleciona as dezenas fixas definidas e preenche o restante dos jogos de forma pseudo-aleatória a partir das dezenas restantes permitidas, garantindo alta variação combinatória."
        },
        {
            q: "Como funciona a Prospecção Inteligente?",
            a: "A Prospecção Inteligente vasculha a base de dados histórica oficial de cada loteria. Ela faz uma contagem de frequência de todas as dezenas nos últimos concursos selecionados (10, 20, 50 ou todos). Em seguida, ela escolhe automaticamente as dezenas mais sorteadas do período para servirem como base da matriz combinatória do simulador. Isso se baseia no princípio de tendência estatística de curto/médio prazo."
        },
        {
            q: "O que são Dezenas Fixas e Omitidas (Grupos R3/R4)?",
            a: "As dezenas fixas são números cruciais que aparecerão em 100% dos jogos gerados. Se você acertar as fixas, a chance de lucro é altíssima. Já as dezenas omitidas são grupos de números que não foram selecionados como 'sorteados' (geralmente vêm do universo de dezenas que não saíram no último concurso). O simulador as organiza em subgrupos (R3 e R4) para balancear os bilhetes, simulando a dispersão real dos sorteios."
        }
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 verde:bg-[#022c22] text-zinc-900 dark:text-zinc-100 verde:text-emerald-50 font-sans pb-20 pt-8 transition-colors duration-500">
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 verde:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 verde:text-emerald-300 font-bold text-xs mb-4">
                        <BookOpen className="w-3.5 h-3.5" />
                        Desvendando a Matemática
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-450 dark:to-teal-300 verde:from-emerald-300 verde:to-teal-200">
                        Como Funcionam os Simuladores?
                    </h1>
                    <p className="mt-4 text-zinc-650 dark:text-zinc-400 verde:text-emerald-200/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Entenda os algoritmos de desdobramentos, análise estatística e combinatória aplicados para otimizar suas chances.
                    </p>
                </div>

                {/* Tabs Buttons Navigation */}
                <div className="flex overflow-x-auto gap-2 pb-3 mb-8 border-b border-zinc-200 dark:border-zinc-800 verde:border-emerald-800/40 scrollbar-hide justify-start md:justify-center">
                    {[
                        { id: "geral", label: "Conceitos Gerais", icon: <Layers className="w-4 h-4" /> },
                        { id: "lotofacil", label: "Lotofácil", icon: <Sliders className="w-4 h-4 text-emerald-500" /> },
                        { id: "megasena", label: "Mega-Sena", icon: <Sliders className="w-4 h-4 text-orange-500" /> },
                        { id: "quina", label: "Quina", icon: <Sliders className="w-4 h-4 text-blue-500" /> }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as ActiveTab)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                                activeTab === tab.id
                                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 verde:bg-emerald-500 verde:text-white shadow-md"
                                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white verde:text-emerald-300 verde:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50 verde:hover:bg-emerald-800/30"
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Contents */}
                <div className="space-y-12">
                    
                    {/* TAB: GENERAL CONCEPTS */}
                    {activeTab === "geral" && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            
                            {/* Intro Card */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/40 dark:bg-zinc-900/30 verde:bg-emerald-950/20 rounded-3xl p-6 md:p-8 border border-zinc-200/50 dark:border-zinc-800/60 verde:border-emerald-800/30">
                                <div>
                                    <h3 className="text-2xl font-bold text-zinc-800 dark:text-white verde:text-emerald-100 mb-4">
                                        Desdobramento vs Aposta Simples
                                    </h3>
                                    <p className="text-sm text-zinc-650 dark:text-zinc-450 verde:text-emerald-250 leading-relaxed mb-4">
                                        Ao fazer uma aposta comum, você escolhe números aleatórios sem conexão. Se você quiser jogar mais dezenas para aumentar as chances, o custo sobe astronomicamente porque a Caixa cobra por *todas* as combinações completas.
                                    </p>
                                    <p className="text-sm text-zinc-650 dark:text-zinc-450 verde:text-emerald-250 leading-relaxed">
                                        O **desdobramento** (ou fechamento) é uma técnica matemática que elimina combinações repetidas ou redundantes, distribuindo suas dezenas selecionadas em múltiplos bilhetes estrategicamente balanceados. Você joga com mais dezenas gastando muito menos.
                                    </p>
                                </div>
                                <div className="bg-zinc-100 dark:bg-zinc-900/90 verde:bg-[#022c22] border border-zinc-200 dark:border-zinc-800 verde:border-emerald-900 p-6 rounded-2xl">
                                    <h4 className="font-bold text-sm text-indigo-500 mb-3 flex items-center gap-2">
                                        <Info className="w-4 h-4" />
                                        Como a Distribuição é Feita:
                                    </h4>
                                    <div className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400 verde:text-emerald-350">
                                        <div className="flex items-start gap-2">
                                            <span className="w-5 h-5 rounded bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold flex-shrink-0">1</span>
                                            <p>As dezenas escolhidas são filtradas e separadas entre **dezenas da matriz** (sorteadas) e **dezenas complementares** (não sorteadas).</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="w-5 h-5 rounded bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold flex-shrink-0">2</span>
                                            <p>Seleciona-se de forma inteligente quais números serão **Fixos** (aparecem em todos os jogos) e quais serão **Rotativos**.</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="w-5 h-5 rounded bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold flex-shrink-0">3</span>
                                            <p>As rotativas são subdivididas em grupos combinatórios (como Grupo A, B, R3 e R4) e cruzadas para formar os bilhetes finais.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Math Pillars */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white/70 dark:bg-zinc-900/50 verde:bg-emerald-950/40 border border-zinc-200/50 dark:border-zinc-800/80 verde:border-emerald-800/30 rounded-2xl p-6">
                                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-bold text-base mb-2">Preservação de Fixas</h4>
                                    <p className="text-xs text-zinc-600 dark:text-zinc-400 verde:text-emerald-300/80 leading-relaxed">
                                        Garante que seus números favoritos ou estatisticamente mais propensos (dezenas quentes) estejam presentes em todos os cartões gerados.
                                    </p>
                                </div>

                                <div className="bg-white/70 dark:bg-zinc-900/50 verde:bg-emerald-950/40 border border-zinc-200/50 dark:border-zinc-800/80 verde:border-emerald-800/30 rounded-2xl p-6">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
                                        <RotateCcw className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-bold text-base mb-2">Simulação de Dispersão</h4>
                                    <p className="text-xs text-zinc-600 dark:text-zinc-400 verde:text-emerald-300/80 leading-relaxed">
                                        Os sorteios reais raramente contêm apenas números do último concurso. Nosso algoritmo distribui números novos e antigos seguindo a curva de dispersão histórica da Caixa.
                                    </p>
                                </div>

                                <div className="bg-white/70 dark:bg-zinc-900/50 verde:bg-emerald-950/40 border border-zinc-200/50 dark:border-zinc-800/80 verde:border-emerald-800/30 rounded-2xl p-6">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-bold text-base mb-2">Tendência Histórica</h4>
                                    <p className="text-xs text-zinc-600 dark:text-zinc-400 verde:text-emerald-300/80 leading-relaxed">
                                        A prospecção inteligente analisa centenas de concursos passados e encontra padrões de frequência de dezenas para guiar a criação da matriz.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: LOTOFACIL */}
                    {activeTab === "lotofacil" && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            
                            {/* Concept & Ratio */}
                            <div className="bg-white/70 dark:bg-zinc-900/60 verde:bg-emerald-950/40 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/80 verde:border-emerald-800/40 rounded-3xl p-6 md:p-8">
                                <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 verde:text-emerald-300 mb-4 flex items-center gap-2">
                                    A Proporção de Ouro da Lotofácil (9:6)
                                </h3>
                                <p className="text-sm text-zinc-650 dark:text-zinc-400 verde:text-emerald-250 leading-relaxed">
                                    Estatisticamente, em cerca de **65% dos concursos da Lotofácil**, exatamente **9 números** do sorteio anterior se repetem no sorteio atual, enquanto as outras **6 dezenas** vêm do grupo das 10 que não haviam sido sorteadas.
                                </p>
                                <p className="text-sm text-zinc-650 dark:text-zinc-400 verde:text-emerald-250 leading-relaxed mt-3">
                                    Nossos simuladores tiram proveito disso! O algoritmo solicita que você insira os 15 números sorteados no concurso anterior (ou carrega pela Prospecção Inteligente) e aplica a lógica de matriz combinatória abaixo.
                                </p>
                            </div>

                            {/* Math Block Diagram */}
                            <div className="bg-zinc-900 text-white rounded-3xl p-6 border border-zinc-800 shadow-xl space-y-6">
                                <h4 className="font-bold text-sm text-zinc-400 uppercase tracking-wider">Fluxo do Algoritmo da Lotofácil</h4>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center text-xs">
                                    
                                    {/* Drawn branch */}
                                    <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-2xl p-4 space-y-4">
                                        <span className="font-bold text-emerald-400 text-sm">15 Dezenas Sorteadas (Entrada)</span>
                                        <div className="grid grid-cols-1 gap-2">
                                            <div className="bg-emerald-900/30 p-2.5 rounded-xl border border-emerald-850">
                                                <span className="font-black text-white block">3 Fixas Sorteadas</span>
                                                <span className="text-zinc-450 text-[10px]">Escolhidas aleatoriamente das 15 e mantidas em todos os jogos</span>
                                            </div>
                                            <div className="bg-emerald-900/10 p-2.5 rounded-xl border border-emerald-900/30 grid grid-cols-2 gap-2">
                                                <div>
                                                    <span className="font-bold text-zinc-300 block">Grupo A (6)</span>
                                                    <span className="text-zinc-500 text-[9px]">Metade restante</span>
                                                </div>
                                                <div>
                                                    <span className="font-bold text-zinc-300 block">Grupo B (6)</span>
                                                    <span className="text-zinc-500 text-[9px]">Outra metade restante</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Undrawn branch */}
                                    <div className="bg-[#301616]/40 border border-[#522525]/50 rounded-2xl p-4 space-y-4">
                                        <span className="font-bold text-red-400 text-sm">10 Dezenas Não Sorteadas (Omitidas)</span>
                                        <div className="grid grid-cols-1 gap-2">
                                            <div className="bg-red-950/30 p-2.5 rounded-xl border border-[#4a1c1c]">
                                                <span className="font-black text-white block">2 Fixas Omitidas</span>
                                                <span className="text-zinc-450 text-[10px]">Escolhidas das 10 e mantidas em todos os jogos para dispersão</span>
                                            </div>
                                            <div className="bg-red-950/10 p-2.5 rounded-xl border border-[#401818]/30 grid grid-cols-2 gap-2">
                                                <div>
                                                    <span className="font-bold text-zinc-300 block">Grupo R3 (4)</span>
                                                    <span className="text-zinc-500 text-[9px]">Metade das omitidas</span>
                                                </div>
                                                <div>
                                                    <span className="font-bold text-zinc-300 block">Grupo R4 (4)</span>
                                                    <span className="text-zinc-500 text-[9px]">Outra metade omitidas</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-zinc-800 text-center">
                                    <span className="text-xs font-bold text-zinc-400 block mb-3">Cruzamento Combinatório Final (4 Jogos)</span>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                                        <div className="bg-zinc-800/80 p-3 rounded-xl border border-zinc-700">
                                            <span className="font-black text-zinc-350 block">Jogo 1</span>
                                            <span className="font-bold text-emerald-400">Grupo A</span> + <span className="font-bold text-red-400">R3</span> + Fixas
                                        </div>
                                        <div className="bg-zinc-800/80 p-3 rounded-xl border border-zinc-700">
                                            <span className="font-black text-zinc-350 block">Jogo 2</span>
                                            <span className="font-bold text-emerald-400">Grupo B</span> + <span className="font-bold text-red-400">R4</span> + Fixas
                                        </div>
                                        <div className="bg-zinc-800/80 p-3 rounded-xl border border-zinc-700">
                                            <span className="font-black text-zinc-350 block">Jogo 3</span>
                                            <span className="font-bold text-emerald-400">Grupo A</span> + <span className="font-bold text-red-400">R4</span> + Fixas
                                        </div>
                                        <div className="bg-zinc-800/80 p-3 rounded-xl border border-zinc-700">
                                            <span className="font-black text-zinc-350 block">Jogo 4</span>
                                            <span className="font-bold text-emerald-400">Grupo B</span> + <span className="font-bold text-red-400">R3</span> + Fixas
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: MEGASENA */}
                    {activeTab === "megasena" && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            
                            {/* Concept */}
                            <div className="bg-white/70 dark:bg-zinc-900/60 verde:bg-emerald-950/40 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/80 verde:border-emerald-800/40 rounded-3xl p-6 md:p-8">
                                <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 verde:text-orange-300 mb-4 flex items-center gap-2">
                                    O Algoritmo Megasena e Filtros de Exclusão
                                </h3>
                                <p className="text-sm text-zinc-650 dark:text-zinc-400 verde:text-emerald-250 leading-relaxed">
                                    Na Mega-Sena (60 números, 6 sorteados), a probabilidade de repetir dezenas do último concurso é muito menor do que na Lotofácil. Por isso, o algoritmo da Mega-Sena trabalha com **filtro de desvio e erro garantido**.
                                </p>
                                <p className="text-sm text-zinc-650 dark:text-zinc-400 verde:text-emerald-250 leading-relaxed mt-3">
                                    Em vez de simplesmente incluir dezenas não sorteadas para preencher os bilhetes, o simulador isola uma porção delas e proíbe sua entrada nos cartões (filtro de rejeição). Isso reduz a redundância e espalha os jogos em quadrantes complementares de alta cobertura.
                                </p>
                            </div>

                            {/* Megasena Diagram */}
                            <div className="bg-zinc-900 text-white rounded-3xl p-6 border border-zinc-800 shadow-xl space-y-6">
                                <h4 className="font-bold text-sm text-zinc-400 uppercase tracking-wider">Matriz de Desdobramento Mega-Sena</h4>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs">
                                    <div className="bg-orange-950/30 border border-orange-850 rounded-2xl p-4 space-y-3">
                                        <span className="font-bold text-orange-400 text-sm block">1. Seleção Base (6)</span>
                                        <p className="text-zinc-400 text-[11px] leading-relaxed">
                                            O algoritmo extrai **2 Dezenas Fixas** para estarem em todos os cartões. As outras 4 dezenas são rotacionadas em grupos (A e B).
                                        </p>
                                    </div>

                                    <div className="bg-red-950/30 border border-[#5c2121] rounded-2xl p-4 space-y-3">
                                        <span className="font-bold text-red-400 text-sm block">2. Rejeição de Omitidas</span>
                                        <p className="text-zinc-400 text-[11px] leading-relaxed">
                                            Escolhe **2 Dezenas Não Sorteadas** da base e as **proíbe** de entrar na geração. Elas agem como bloqueadores matemáticos.
                                        </p>
                                    </div>

                                    <div className="bg-zinc-850/80 border border-zinc-700 rounded-2xl p-4 space-y-3">
                                        <span className="font-bold text-zinc-350 text-sm block">3. Grupos Rotativos (R3/R4)</span>
                                        <p className="text-zinc-400 text-[11px] leading-relaxed">
                                            Outras dezenas omitidas são divididas nos grupos R3 e R4 (2 números cada) para preencher a cota restante dos cartões de 6 números.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-zinc-800 text-center text-xs text-zinc-400">
                                    <p className="font-black text-white mb-2">Composição dos Cartões Gerados (6 Dezenas):</p>
                                    <p>Cada jogo é formado por: **2 Fixas da Seleção** + **2 dezenas rotativas da Seleção** + **2 dezenas rotativas Omitidas** (sem as proibidas).</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: QUINA */}
                    {activeTab === "quina" && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            
                            {/* Concept */}
                            <div className="bg-white/70 dark:bg-zinc-900/60 verde:bg-emerald-950/40 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/80 verde:border-emerald-800/40 rounded-3xl p-6 md:p-8">
                                <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 verde:text-blue-300 mb-4 flex items-center gap-2">
                                    Matriz de Balanceamento da Quina
                                </h3>
                                <p className="text-sm text-zinc-650 dark:text-zinc-400 verde:text-emerald-250 leading-relaxed">
                                    A Quina possui um universo amplo (80 dezenas, 5 sorteadas). Fazer apostas nela exige uma proporção restrita de dezenas fixas para que o custo dos desdobramentos não inviabilize o jogo.
                                </p>
                                <p className="text-sm text-zinc-650 dark:text-zinc-400 verde:text-emerald-250 leading-relaxed mt-3">
                                    Nossa matriz de Quina balanceia os cartões extraindo apenas **1 Dezenas Fixa Sorteada** e **1 Dezena Fixa Omitida** (que atua como âncora de dispersão). As outras 3 dezenas de cada aposta de 5 dezenas são derivadas da combinação rotativa das dezenas restantes.
                                </p>
                            </div>

                            {/* Quina Diagram */}
                            <div className="bg-zinc-900 text-white rounded-3xl p-6 border border-zinc-800 shadow-xl space-y-6">
                                <h4 className="font-bold text-sm text-zinc-400 uppercase tracking-wider">Lógica Combinatória da Quina</h4>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center text-xs">
                                    <div className="bg-blue-950/30 border border-blue-800/50 rounded-2xl p-4 space-y-3">
                                        <span className="font-bold text-blue-400 text-sm block">Grupo de Origem Sorteado (5)</span>
                                        <div className="bg-blue-900/20 p-2.5 rounded-xl border border-blue-900/50">
                                            <span className="font-bold block">1 Dezena Fixa Sorteada</span>
                                            <span className="text-zinc-500 text-[10px]">Garantida em todos os bilhetes</span>
                                        </div>
                                        <div className="bg-zinc-850 p-2 rounded-xl">
                                            <span>Grupo A (2 dezenas) / Grupo B (2 dezenas)</span>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-4 space-y-3">
                                        <span className="font-bold text-zinc-300 text-sm block">Grupo de Origem Omitido (75)</span>
                                        <div className="bg-zinc-800 p-2.5 rounded-xl border border-zinc-700">
                                            <span className="font-bold block">1 Dezena Fixa Omitida</span>
                                            <span className="text-zinc-500 text-[10px]">Âncora estatística de não sorteado</span>
                                        </div>
                                        <div className="bg-zinc-850 p-2 rounded-xl">
                                            <span>Grupo R3 (1 dezena) / Grupo R4 (1 dezena)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-zinc-800 text-center text-xs text-zinc-400">
                                    <p className="font-black text-white mb-2">Combinação dos Jogos (5 Dezenas):</p>
                                    <p>Os bilhetes unem: (Fixa Sorteada + Grupo A ou B) + (Fixa Omitida + Grupo R3 ou R4).</p>
                                    <p className="text-[10px] text-zinc-500 mt-1">Essa estrutura reduz a volatilidade do bilhete contra grandes sequências ou quadrantes vazios.</p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* FAQ / Section */}
                <div className="mt-16 bg-white/70 dark:bg-zinc-900/60 verde:bg-emerald-950/40 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/80 verde:border-emerald-800/40 rounded-3xl p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-zinc-800 dark:text-white verde:text-emerald-100 mb-6 flex items-center gap-2">
                        <HelpCircle className="w-6 h-6 text-emerald-500" />
                        Perguntas Frequentes Matemáticas
                    </h3>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className="border-b border-zinc-200/60 dark:border-zinc-800/60 verde:border-emerald-900/40 pb-4 last:border-none last:pb-0"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex justify-between items-center text-left py-2 font-bold text-sm md:text-base text-zinc-800 dark:text-zinc-100 verde:text-emerald-50 hover:text-emerald-500 dark:hover:text-emerald-400 verde:hover:text-emerald-300 transition-colors"
                                >
                                    <span>{faq.q}</span>
                                    <span className="text-xl font-light text-zinc-400">{openFaq === index ? "−" : "+"}</span>
                                </button>
                                
                                {openFaq === index && (
                                    <p className="mt-2 text-xs md:text-sm text-zinc-650 dark:text-zinc-400 verde:text-emerald-300/80 leading-relaxed animate-in slide-in-from-top-2 duration-350">
                                        {faq.a}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}
