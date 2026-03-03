"use client";

import { useState } from "react";
import { generateDynamicQuinaGames, DynamicQuinaSimulationResult } from "@/utils/quina";

export default function SimuladorDinamicoQuina() {
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [numGames, setNumGames] = useState<number>(10);
    const [result, setResult] = useState<DynamicQuinaSimulationResult | null>(null);

    const toggleNumber = (num: number) => {
        if (selectedNumbers.includes(num)) {
            setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
        } else {
            if (selectedNumbers.length < 5) {
                setSelectedNumbers([...selectedNumbers, num].sort((a, b) => a - b));
            }
        }
    };

    const clearSelection = () => {
        setSelectedNumbers([]);
        setResult(null);
    };

    const handleGenerate = () => {
        if (selectedNumbers.length === 5) {
            try {
                const res = generateDynamicQuinaGames(selectedNumbers, numGames);
                setResult(res);
            } catch (e) {
                alert("Erro ao gerar simulação.");
            }
        }
    };

    const getNumberClass = (num: number, context: 'selector' | 'display' | 'jogo' | 'fixa' = 'selector') => {
        const isSelected = selectedNumbers.includes(num);
        const baseClass = "flex items-center justify-center font-bold text-xs transition-all duration-300 ";

        if (context === 'selector') {
            return baseClass + `w-9 h-9 rounded-xl cursor-pointer shadow-sm
        ${isSelected
                    ? "bg-gradient-to-br from-blue-400 to-blue-700 text-white hover:scale-105 shadow-blue-500/30 verde:from-blue-300 verde:to-blue-600"
                    : "bg-white dark:bg-zinc-800 verde:bg-emerald-900/60 text-zinc-700 dark:text-zinc-300 verde:text-emerald-100 border border-zinc-200 dark:border-zinc-700 verde:border-emerald-700/50 hover:bg-zinc-100 verde:hover:bg-emerald-800 hover:scale-105"
                }`;
        }

        if (context === 'fixa') {
            return baseClass + "w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-white shadow-md shadow-indigo-500/20";
        }

        return baseClass + "w-8 h-8 rounded-full bg-white dark:bg-zinc-800 verde:bg-emerald-800/60 text-zinc-800 dark:text-zinc-200 verde:text-emerald-50 border border-zinc-200 dark:border-zinc-700 verde:border-emerald-700/50 shadow-sm";
    };

    const formatNum = (n: number) => n.toString().padStart(2, "0");

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 verde:bg-[#022c22] text-zinc-900 dark:text-zinc-100 verde:text-emerald-50 font-sans selection:bg-blue-500/30 pb-20 transition-colors duration-500">

            {/* Header */}
            <header className="pt-8 pb-8 px-6 flex flex-col items-center relative">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-400 verde:from-blue-300 verde:to-indigo-300 pb-2 text-center mt-6 md:mt-0">
                    Simulador Dinâmico Quina
                </h1>
                <p className="mt-4 text-blue-800/60 dark:text-blue-200/50 verde:text-blue-200/70 max-w-lg mx-auto text-lg leading-relaxed text-center">
                    Selecione 5 dezenas e gere qualquer quantidade de jogos usando a nossa modelagem preditiva em alta escala baseada nas garantias Quina.
                </p>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

                {/* Selector Section */}
                <section className="bg-white/60 dark:bg-zinc-900/40 verde:bg-emerald-950/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-zinc-200/50 dark:border-zinc-800/50 verde:border-emerald-800/40 shadow-xl shadow-zinc-200/20 dark:shadow-black/40 verde:shadow-emerald-900/20">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2 verde:text-blue-100">
                                O Sorteio Anterior
                            </h2>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 verde:text-blue-400/80 mt-1">
                                {selectedNumbers.length} de 5 dezenas selecionadas
                            </p>
                        </div>
                        {selectedNumbers.length > 0 && (
                            <button
                                onClick={clearSelection}
                                className="text-sm font-medium text-red-500 hover:text-red-600 dark:hover:text-red-400 verde:text-emerald-400 verde:hover:text-emerald-300 transition-colors"
                            >
                                Limpar
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-10 gap-2 md:gap-3 justify-items-center mx-auto">
                        {Array.from({ length: 80 }, (_, i) => i + 1).map((num) => (
                            <div
                                key={num}
                                onClick={() => toggleNumber(num)}
                                className={getNumberClass(num, 'selector')}
                            >
                                {formatNum(num)}
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
                        <div className="flex items-center gap-4 bg-zinc-100/50 dark:bg-zinc-800/50 verde:bg-emerald-900/50 px-4 py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 verde:border-emerald-700/50">
                            <label htmlFor="numGames" className="text-sm font-bold text-zinc-700 dark:text-zinc-300 verde:text-blue-200">
                                Quantidade de Jogos:
                            </label>
                            <input
                                id="numGames"
                                type="number"
                                min={1}
                                max={500}
                                value={numGames}
                                onChange={(e) => setNumGames(Math.max(1, Math.min(500, Number(e.target.value))))}
                                className="w-20 bg-white dark:bg-zinc-900/80 verde:bg-emerald-800/80 border border-zinc-300 dark:border-zinc-600 verde:border-emerald-600 rounded-lg px-3 py-1.5 text-center font-bold outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={selectedNumbers.length !== 5}
                            className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg ${selectedNumbers.length === 5
                                ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 hover:scale-105 hover:shadow-xl shadow-zinc-900/20 dark:shadow-white/20 verde:bg-blue-600 verde:text-white verde:hover:bg-blue-500 verde:shadow-blue-500/30"
                                : "bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 verde:bg-blue-900/30 verde:text-blue-700/50 cursor-not-allowed"
                                }`}
                        >
                            Simular Apostas Dinâmicas
                        </button>
                    </div>
                </section>

                {/* Results Section */}
                {result && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">

                        {/* Analytics Overview */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Dezenas Sorteadas Analysis */}
                            <div className="bg-white/40 dark:bg-zinc-900/30 verde:bg-emerald-900/20 backdrop-blur-md rounded-3xl p-6 border border-blue-100 dark:border-blue-900/30 verde:border-blue-800/50 h-full">
                                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 verde:text-blue-300 mb-6 flex items-center">
                                    <span className="w-2 h-6 bg-blue-500 verde:bg-blue-400 rounded-full mr-3 block"></span>
                                    Garantia das Sorteadas
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 verde:text-emerald-400/70 uppercase tracking-wider mb-3">Fixa Sorteada (1) mantida em todos os jogos</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {result.fixas_sorteadas.map(n => <div key={n} className={getNumberClass(n, 'fixa')}>{formatNum(n)}</div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dezenas Não Sorteadas Analysis */}
                            <div className="bg-white/40 dark:bg-zinc-900/30 verde:bg-emerald-900/20 backdrop-blur-md rounded-3xl p-6 border border-red-100 dark:border-red-900/30 verde:border-emerald-800/50 h-full">
                                <h3 className="text-xl font-bold text-red-500 dark:text-red-400 verde:text-red-300 mb-6 flex items-center">
                                    <span className="w-2 h-6 bg-red-500 verde:bg-red-400 rounded-full mr-3 block"></span>
                                    Garantia das Omitidas
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 verde:text-emerald-400/70 uppercase tracking-wider mb-3">Fixa Omitida (1) mantida em todos os jogos</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {result.fixas_nao_sorteadas.map(n => <div key={n} className={getNumberClass(n, 'fixa')}>{formatNum(n)}</div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Final Games */}
                        <section className="space-y-6">
                            <h2 className="text-3xl font-extrabold text-center mb-10 verde:text-blue-100">{result.jogos.length} Apostas Geradas</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {result.jogos.map((jogo, i) => (
                                    <div key={i} className="bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-black verde:from-sky-900 verde:to-blue-950 rounded-3xl p-5 shadow-xl border border-zinc-200/50 dark:border-zinc-800/80 verde:border-blue-800/50 hover:scale-[1.02] transition-transform duration-300">
                                        <div className="flex justify-between items-center mb-4 border-b border-zinc-100 dark:border-zinc-800 verde:border-blue-800/50 pb-3">
                                            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 verde:from-blue-100 verde:to-blue-300">
                                                Jogo {i + 1}
                                            </h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {jogo.map(n => {
                                                const isSortFixa = result.fixas_sorteadas.includes(n);
                                                const isNaoSortFixa = result.fixas_nao_sorteadas.includes(n);
                                                const isSorteada = result.sorteadas.includes(n);

                                                let colorClass = "bg-white dark:bg-zinc-800 verde:bg-emerald-800/50 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 verde:border-emerald-700/50 verde:text-emerald-100";
                                                if (isSortFixa || isNaoSortFixa) {
                                                    colorClass = "bg-gradient-to-br from-indigo-400 to-indigo-600 border-none text-white shadow-sm shadow-indigo-500/20 verde:shadow-indigo-900/30";
                                                } else if (isSorteada) {
                                                    colorClass = "bg-blue-50 dark:bg-blue-900/30 verde:bg-blue-700/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 verde:border-blue-600/50";
                                                } else {
                                                    colorClass = "bg-red-50 dark:bg-red-900/30 verde:bg-[#3f1919]/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50 verde:border-[#522929]/50";
                                                }

                                                return (
                                                    <div key={n} className={`flex items-center justify-center font-bold text-xs w-9 h-9 rounded-full shadow-sm transition-all duration-300 hover:-translate-y-1 ${colorClass}`}>
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
