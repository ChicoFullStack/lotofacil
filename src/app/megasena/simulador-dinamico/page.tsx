"use client";

import { useState } from "react";
import { generateDynamicMegasenaGames, DynamicMegasenaSimulationResult } from "@/utils/megasena";

export default function SimuladorDinamicoMegasena() {
    const [numGames, setNumGames] = useState<number>(10);
    const [loading, setLoading] = useState(false);
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [result, setResult] = useState<DynamicMegasenaSimulationResult | null>(null);

    const toggleNumber = (num: number) => {
        setSelectedNumbers(prev => {
            if (prev.includes(num)) return prev.filter(n => n !== num);
            if (prev.length >= 6) return prev;
            return [...prev, num].sort((a, b) => a - b);
        });
    };

    const handleSimulate = () => {
        setLoading(true);
        // Pequeno delay para a UI respirar e mostrar o state de loading
        setTimeout(() => {
            try {
                setResult(generateDynamicMegasenaGames(selectedNumbers, numGames));
            } catch (e: any) {
                alert(e.message);
            } finally {
                setLoading(false);
            }
        }, 100);
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

        return baseClass + "w-10 h-10 rounded-full bg-white dark:bg-zinc-800 verde:bg-emerald-800/60 text-zinc-800 dark:text-zinc-200 verde:text-emerald-50 border border-zinc-200 dark:border-zinc-700 verde:border-emerald-700/50 shadow-sm";
    };

    const formatNum = (n: number) => n.toString().padStart(2, "0");

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 verde:bg-[#022c22] text-zinc-900 dark:text-zinc-100 verde:text-emerald-50 font-sans selection:bg-orange-500/30 pb-20 transition-colors duration-500">

            {/* Header */}
            <header className="pt-8 pb-8 px-6 flex flex-col items-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-400 verde:from-orange-300 verde:to-yellow-300 pb-2 text-center mt-6 md:mt-0">
                    Simulador Dinâmico
                </h1>
                <p className="mt-4 text-orange-800/60 dark:text-orange-200/50 verde:text-orange-200/70 max-w-lg mx-auto text-lg leading-relaxed text-center">
                    Gere laços massivos da <strong className="text-orange-600 dark:text-orange-400 verde:text-orange-300">Megasena</strong> automaticamente preservando Fixas Omitidas e Extraídas.
                </p>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

                {/* Board Section */}
                <section className="bg-white/60 dark:bg-zinc-900/40 verde:bg-emerald-950/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-zinc-200/50 dark:border-zinc-800/50 verde:border-emerald-800/40 shadow-xl shadow-zinc-200/20 dark:shadow-black/40 verde:shadow-emerald-900/20 max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-zinc-700 dark:text-zinc-300 verde:text-emerald-200">
                            Escolha <span className="text-orange-500">6 dezenas matrizes</span>:
                        </h2>
                        <div className="text-sm font-semibold px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 verde:bg-emerald-900/50 text-zinc-600 dark:text-zinc-400 verde:text-emerald-300">
                            {selectedNumbers.length} / 6
                        </div>
                    </div>

                    <div className="grid grid-cols-5 md:grid-cols-10 gap-3 md:gap-4 justify-items-center mb-8">
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

                    <div className="flex flex-col md:flex-row gap-6 items-end pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50 verde:border-emerald-800/40">
                        <div className="flex-1 w-full flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={clearSelection}
                                className="px-6 h-12 rounded-xl font-bold text-sm transition-all duration-300 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 verde:text-emerald-400/80 verde:hover:text-emerald-300 verde:hover:bg-emerald-900/30 w-full sm:w-auto"
                            >
                                Limpar Matriz
                            </button>

                            <div className="flex-1">
                                <label htmlFor="numGames" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 verde:text-emerald-200 mb-2">
                                    Quantidade de Jogos Mágicos:
                                </label>
                                <input
                                    id="numGames"
                                    type="number"
                                    min={1}
                                    max={1000}
                                    value={numGames}
                                    onChange={(e) => setNumGames(Math.max(1, Math.min(1000, Number(e.target.value))))}
                                    className="w-full h-12 bg-white dark:bg-zinc-900 verde:bg-emerald-900 border border-zinc-200 dark:border-zinc-700 verde:border-emerald-700/50 rounded-xl px-4 text-zinc-900 dark:text-white verde:text-emerald-50 font-medium focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSimulate}
                            disabled={selectedNumbers.length !== 6 || loading}
                            className={`w-full md:w-auto px-8 h-12 rounded-xl font-bold text-base md:text-lg transition-all duration-300 shadow-lg shrink-0 ${selectedNumbers.length === 6 && !loading
                                ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 hover:scale-105 hover:shadow-xl shadow-zinc-900/20 dark:shadow-white/20 verde:bg-orange-500 verde:text-white verde:hover:bg-orange-400 verde:shadow-orange-500/30"
                                : "bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed verde:bg-emerald-900/40 verde:text-emerald-700/50"
                                }`}
                        >
                            {loading ? "Simulando..." : "Simular Apostas Dinâmicas"}
                        </button>
                    </div>
                </section>

                {/* Results Section */}
                {result && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">

                        {/* Analytics Overview */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Dezenas Sorteadas Analysis */}
                            <div className="bg-white/40 dark:bg-zinc-900/30 verde:bg-emerald-900/20 backdrop-blur-md rounded-3xl p-6 border border-orange-100 dark:border-orange-900/30 verde:border-emerald-800/50 h-full">
                                <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400 verde:text-emerald-300 mb-6 flex items-center">
                                    <span className="w-2 h-6 bg-orange-500 verde:bg-emerald-400 rounded-full mr-3 block"></span>
                                    Análise das Escolhidas
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 verde:text-emerald-400/70 uppercase tracking-wider mb-3">Fixa Extraída (1) mantida em todos os jogos</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {result.fixas_sorteadas.map(n => <div key={n} className={getNumberClass(n, 'fixa')}>{formatNum(n)}</div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dezenas Não Sorteadas Analysis */}
                            <div className="bg-white/40 dark:bg-zinc-900/30 verde:bg-emerald-900/20 backdrop-blur-md rounded-3xl p-6 border border-red-100 dark:border-red-900/30 verde:border-emerald-800/50 h-full">
                                <h3 className="text-xl font-bold text-red-500 dark:text-red-400 verde:text-emerald-300 mb-6 flex items-center">
                                    <span className="w-2 h-6 bg-red-500 verde:bg-emerald-400 rounded-full mr-3 block"></span>
                                    Lógica de Erro Garantido
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 verde:text-emerald-400/70 uppercase tracking-wider mb-3">Fixas Omitidas (2) proibidas em todos os jogos</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {result.fixas_nao_sorteadas.map(n => <div key={n} className={getNumberClass(n, 'fixa')}>{formatNum(n)}</div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Final Games */}
                        <section className="space-y-6">
                            <h2 className="text-3xl font-extrabold text-center mb-10 verde:text-emerald-100">{result.jogos.length} Apostas Geradas (Processamento Dinâmico)</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {result.jogos.map((jogo, i) => (
                                    <div key={i} className="bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-black verde:from-orange-900 verde:to-[#1c0f05] rounded-3xl p-5 shadow-xl border border-zinc-200/50 dark:border-zinc-800/80 verde:border-orange-800/50 hover:scale-[1.02] transition-transform duration-300">
                                        <div className="flex justify-between items-center mb-4 border-b border-zinc-100 dark:border-zinc-800 verde:border-orange-800/50 pb-3">
                                            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 verde:from-orange-100 verde:to-orange-400">
                                                Jogo {i + 1}
                                            </h3>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-1.5">
                                            {jogo.map(n => {
                                                const isSortFixa = result.fixas_sorteadas.includes(n);
                                                const isNaoSortFixa = result.fixas_nao_sorteadas.includes(n);
                                                const isSorteada = result.sorteadas.includes(n);

                                                let colorClass = "bg-white dark:bg-zinc-800 verde:bg-emerald-800/50 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 verde:border-emerald-700/50 verde:text-emerald-100";
                                                if (isSortFixa || isNaoSortFixa) {
                                                    colorClass = "bg-gradient-to-br from-amber-400 to-amber-600 border-none text-white shadow-sm shadow-amber-500/20 verde:shadow-amber-900/30";
                                                } else if (isSorteada) {
                                                    colorClass = "bg-orange-50 dark:bg-orange-900/30 verde:bg-orange-700/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/50 verde:border-orange-600/50";
                                                } else {
                                                    colorClass = "bg-red-50 dark:bg-red-900/30 verde:bg-[#3f1919]/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50 verde:border-[#522929]/50";
                                                }

                                                return (
                                                    <div key={n} className={`flex items-center justify-center font-bold text-xs w-10 h-10 rounded-full shadow-sm transition-all duration-300 hover:-translate-y-1 ${colorClass}`}>
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
