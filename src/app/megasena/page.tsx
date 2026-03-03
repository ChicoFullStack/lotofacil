"use client";

import { useState } from "react";
import { generateMegasenaGames, MegasenaSimulationResult } from "@/utils/megasena";

export default function MegasenaPage() {
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [result, setResult] = useState<MegasenaSimulationResult | null>(null);

    const toggleNumber = (num: number) => {
        setSelectedNumbers(prev => {
            if (prev.includes(num)) return prev.filter(n => n !== num);
            if (prev.length >= 6) return prev;
            return [...prev, num].sort((a, b) => a - b);
        });
    };

    const handleSimulate = () => {
        try {
            setResult(generateMegasenaGames(selectedNumbers));
        } catch (e: any) {
            alert(e.message);
        }
    };

    const clearSelection = () => {
        setSelectedNumbers([]);
        setResult(null);
    };

    const getNumberClass = (num: number, context: 'selector' | 'display' | 'jogo' | 'fixa' = 'selector') => {
        const isSelected = selectedNumbers.includes(num);
        const baseClass = "flex items-center justify-center font-bold text-sm transition-all duration-300 ";

        if (context === 'selector') {
            return baseClass + `w-12 h-12 rounded-xl shadow-sm cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-95
        ${isSelected
                    ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-orange-500/30 verde:from-orange-300 verde:to-orange-500"
                    : "bg-white dark:bg-zinc-800 verde:bg-emerald-900/60 text-zinc-700 dark:text-zinc-300 verde:text-emerald-100 hover:bg-zinc-50 dark:hover:bg-zinc-700 verde:hover:bg-emerald-800 border border-zinc-200 dark:border-zinc-700 verde:border-emerald-700/50"
                }`;
        }

        if (context === 'fixa') {
            return baseClass + "w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-md shadow-amber-500/20";
        }

        // Default smaller display pill
        return baseClass + "w-10 h-10 rounded-full bg-white dark:bg-zinc-800 verde:bg-emerald-800/60 text-zinc-800 dark:text-zinc-200 verde:text-emerald-50 border border-zinc-200 dark:border-zinc-700 verde:border-emerald-700/50 shadow-sm";
    };

    const formatNum = (n: number) => n.toString().padStart(2, "0");

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 verde:bg-[#022c22] text-zinc-900 dark:text-zinc-100 verde:text-emerald-50 font-sans selection:bg-orange-500/30 pb-20 transition-colors duration-500">

            {/* Header */}
            <header className="pt-8 pb-8 px-6 flex flex-col items-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-400 verde:from-orange-300 verde:to-yellow-200 pb-2 text-center mt-6 md:mt-0">
                    Megasena Simulator
                </h1>
                <p className="mt-4 text-orange-800/60 dark:text-orange-200/50 verde:text-orange-200/70 max-w-lg mx-auto text-lg leading-relaxed text-center">
                    Selecione <span className="font-bold text-orange-600 dark:text-orange-400 verde:text-orange-300">6 dezenas</span> para criar espelhos analíticos massivos.
                </p>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

                {/* Board Section */}
                <section className="bg-white/60 dark:bg-zinc-900/40 verde:bg-emerald-950/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-zinc-200/50 dark:border-zinc-800/50 verde:border-emerald-800/40 shadow-xl shadow-zinc-200/20 dark:shadow-black/40 verde:shadow-emerald-900/20">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-zinc-700 dark:text-zinc-300 verde:text-emerald-200">
                            Escolha suas 6 dezenas
                        </h2>
                        <div className="text-sm font-semibold px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 verde:bg-emerald-900/50 text-zinc-600 dark:text-zinc-400 verde:text-emerald-300">
                            {selectedNumbers.length} / 6
                        </div>
                    </div>

                    <div className="grid grid-cols-5 md:grid-cols-10 grid-rows-6 gap-3 md:gap-4 justify-items-center max-w-fit mx-auto">
                        {Array.from({ length: 60 }, (_, i) => i + 1).map((num) => (
                            <button
                                key={num}
                                onClick={() => toggleNumber(num)}
                                className={getNumberClass(num, 'selector')}
                            >
                                {formatNum(num)}
                            </button>
                        ))}
                    </div>

                    <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center items-center pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50 verde:border-emerald-800/40">
                        <button
                            onClick={clearSelection}
                            className="px-8 h-14 rounded-2xl font-bold text-base transition-all duration-300 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 verde:text-emerald-400/80 verde:hover:text-emerald-300 verde:hover:bg-emerald-900/30 w-full md:w-auto"
                        >
                            Limpar Matriz
                        </button>
                        <button
                            onClick={handleSimulate}
                            disabled={selectedNumbers.length !== 6}
                            className={`px-10 h-14 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg w-full md:w-auto ${selectedNumbers.length === 6
                                ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 hover:scale-105 hover:shadow-xl shadow-zinc-900/20 dark:shadow-white/20 verde:bg-gradient-to-r verde:from-orange-500 verde:to-red-500 verde:text-white verde:hover:shadow-orange-500/40"
                                : "bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed verde:bg-emerald-900/40 verde:text-emerald-700/50"
                                }`}
                        >
                            Simular Matriz Quântica
                        </button>
                    </div>
                </section>

                {/* Results Section */}
                {result && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">

                        {/* Config Overview */}
                        <section className="bg-white/40 dark:bg-zinc-900/30 verde:bg-emerald-950/40 backdrop-blur-md rounded-3xl p-6 border border-zinc-200/50 dark:border-zinc-800/50 verde:border-emerald-800/40 divide-y divide-zinc-200/50 dark:divide-zinc-800/50 verde:divide-emerald-800/40">
                            <div className="flex items-center gap-4 pb-6">
                                <div className="w-1.5 h-12 bg-gradient-to-b from-orange-400 to-red-500 rounded-full"></div>
                                <div>
                                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-400 verde:from-orange-300 verde:to-yellow-300">Resumo da Inteligência</h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 verde:text-emerald-400/70">Análise combinatória extraída da sua seleção base.</p>
                                </div>
                            </div>

                            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 verde:text-emerald-400/70 uppercase tracking-wider mb-4">Fixas Retiradas Dentre Sorteadas (2)</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {result.fixas_sorteadas.map((n) => <div key={n} className={getNumberClass(n, 'fixa')}>{formatNum(n)}</div>)}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 verde:text-emerald-400/70 uppercase tracking-wider mb-4">Grupos Ocultos A & B</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-bold text-orange-500 w-6">A:</span>
                                            <div className="flex flex-wrap gap-1.5">{result.A.map((n) => <div key={n} className={getNumberClass(n, 'display')}>{formatNum(n)}</div>)}</div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-bold text-red-500 w-6">B:</span>
                                            <div className="flex flex-wrap gap-1.5">{result.B.map((n) => <div key={n} className={getNumberClass(n, 'display')}>{formatNum(n)}</div>)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Error Logic & R Groups */}
                        <section className="bg-red-50/50 dark:bg-red-950/10 verde:bg-[#251010]/30 backdrop-blur-md rounded-3xl p-6 border border-red-100 dark:border-red-900/30 verde:border-red-900/20">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-2 bg-red-100 dark:bg-red-900/40 verde:bg-red-900/50 rounded-lg">
                                    <svg className="w-5 h-5 text-red-600 dark:text-red-400 verde:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-red-700 dark:text-red-400 verde:text-red-300">Lógica de Rejeição Integrada</h3>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 gap-y-10">
                                <div>
                                    <h4 className="text-xs font-semibold text-red-500 dark:text-red-400/70 verde:text-red-400/50 uppercase tracking-wider mb-4">Fixas Retiradas Das Não Sorteadas (2 Erros Omitidos)</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {result.fixas_nao_sorteadas.map((n) => <div key={n} className={getNumberClass(n, 'fixa')}>{formatNum(n)}</div>)}
                                    </div>
                                    <p className="text-xs text-red-600/70 dark:text-red-400/60 verde:text-red-300/60 mt-3 max-w-sm">Esses 2 números foram completamente isolados fora de todas as gerações abaixo para concentrar acertos futuros.</p>
                                </div>

                                <div>
                                    <h4 className="text-xs font-semibold text-red-500 dark:text-red-400/70 verde:text-red-400/50 uppercase tracking-wider mb-3">Grupos de Desvio R3 & R4</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 p-4 bg-white/40 dark:bg-zinc-900/40 verde:bg-black/20 rounded-2xl border border-red-100 dark:border-red-900/30 verde:border-red-900/20">
                                            <span className="text-sm font-bold text-red-600 dark:text-red-400 mt-2">R3:</span>
                                            <div className="flex flex-wrap gap-1.5">{result.R3.map((n) => <div key={n} className={getNumberClass(n, 'display')}>{formatNum(n)}</div>)}</div>
                                        </div>
                                        <div className="flex items-start gap-4 p-4 bg-white/40 dark:bg-zinc-900/40 verde:bg-black/20 rounded-2xl border border-red-100 dark:border-red-900/30 verde:border-red-900/20">
                                            <span className="text-sm font-bold text-red-600 dark:text-red-400 mt-2">R4:</span>
                                            <div className="flex flex-wrap gap-1.5">{result.R4.map((n) => <div key={n} className={getNumberClass(n, 'display')}>{formatNum(n)}</div>)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Final Games */}
                        <section className="space-y-8">
                            <h2 className="text-3xl font-extrabold text-center mb-10 verde:text-orange-100">Matriz: 4 Apostas Geradas</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                {result.jogos.map((jogo, i) => (
                                    <div key={i} className="bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-black verde:from-orange-950/80 verde:to-[#1a0f0a] rounded-3xl p-6 shadow-xl border border-zinc-200/50 dark:border-zinc-800/80 verde:border-orange-800/30 hover:scale-[1.02] transition-transform duration-300">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 verde:from-orange-200 verde:to-orange-500">
                                                Jogo {i + 1}
                                            </h3>
                                            <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 verde:text-orange-500/50 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 verde:bg-orange-900/20 rounded-full">
                                                Megasena
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-2.5 justify-center mt-2">
                                            {jogo.map((n) => {
                                                const isSortFixa = result.fixas_sorteadas.includes(n);
                                                const isNaoSortFixa = result.fixas_nao_sorteadas.includes(n);
                                                const isSorteada = result.sorteadas.includes(n);

                                                let colorClass = "bg-white dark:bg-zinc-800 verde:bg-emerald-800/50 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 verde:border-emerald-700/50 verde:text-emerald-100";
                                                if (isSortFixa || isNaoSortFixa) {
                                                    colorClass = "bg-gradient-to-br from-amber-400 to-amber-600 border-none text-white shadow-md shadow-amber-500/20";
                                                } else if (isSorteada) {
                                                    colorClass = "bg-orange-50 dark:bg-orange-900/30 verde:bg-orange-700/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/50 verde:border-orange-600/50";
                                                } else {
                                                    colorClass = "bg-red-50 dark:bg-red-900/30 verde:bg-[#3f1919]/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50 verde:border-[#522929]/50";
                                                }

                                                return (
                                                    <div key={n} className={`flex items-center justify-center font-bold text-sm w-12 h-12 rounded-full shadow-sm transition-all duration-300 hover:-translate-y-1 ${colorClass}`}>
                                                        {formatNum(n)}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>
                )}
            </main>
        </div>
    );
}
