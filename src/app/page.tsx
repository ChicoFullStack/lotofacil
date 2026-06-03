"use client";

import { useState } from "react";
import { generateGames, SimulationResult } from "@/utils/lotofacil";
import { DonationCTA } from "@/components/DonationCTA";

export default function Home() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else {
      if (selectedNumbers.length < 15) {
        setSelectedNumbers([...selectedNumbers, num].sort((a, b) => a - b));
      }
    }
  };

  const clearSelection = () => {
    setSelectedNumbers([]);
    setResult(null);
  };

  const handleGenerate = () => {
    if (selectedNumbers.length === 15) {
      try {
        const res = generateGames(selectedNumbers);
        setResult(res);
      } catch (e) {
        alert("Erro ao gerar simulação.");
      }
    }
  };

  const getNumberClass = (num: number, context: 'selector' | 'display' | 'jogo' | 'fixa' = 'selector') => {
    const isSelected = selectedNumbers.includes(num);
    const baseClass = "flex items-center justify-center font-bold text-sm transition-all duration-300 ";

    if (context === 'selector') {
      return baseClass + `w-12 h-12 rounded-xl cursor-pointer shadow-sm
        ${isSelected
          ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white hover:scale-105 shadow-emerald-500/30 verde:from-emerald-300 verde:to-emerald-500"
          : "bg-white dark:bg-zinc-800 verde:bg-emerald-900/60 text-zinc-700 dark:text-zinc-300 verde:text-emerald-100 border border-zinc-200 dark:border-zinc-700 verde:border-emerald-700/50 hover:bg-zinc-100 verde:hover:bg-emerald-800 hover:scale-105"
        }`;
    }

    if (context === 'fixa') {
      return baseClass + "w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-md shadow-amber-500/20";
    }

    return baseClass + "w-10 h-10 rounded-full bg-white dark:bg-zinc-800 verde:bg-emerald-800/60 text-zinc-800 dark:text-zinc-200 verde:text-emerald-50 border border-zinc-200 dark:border-zinc-700 verde:border-emerald-700/50 shadow-sm";
  };

  const formatNum = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 verde:bg-[#022c22] text-zinc-900 dark:text-zinc-100 verde:text-emerald-50 font-sans selection:bg-emerald-500/30 pb-20 transition-colors duration-500">

      {/* Header */}
      <header className="pt-8 pb-8 px-6 flex flex-col items-center relative">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-400 verde:from-emerald-300 verde:to-teal-200 pb-2 text-center mt-6 md:mt-0">
          Lotofácil Simulator
        </h1>
        <p className="mt-4 text-emerald-800/60 dark:text-emerald-200/50 verde:text-emerald-200/70 max-w-lg mx-auto text-lg leading-relaxed text-center">
          Selecione os 15 números sorteados do último concurso para simular os fechamentos avançados.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Selector Section */}
        <section className="bg-white/60 dark:bg-zinc-900/40 verde:bg-emerald-950/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-zinc-200/50 dark:border-zinc-800/50 verde:border-emerald-800/40 shadow-xl shadow-zinc-200/20 dark:shadow-black/40 verde:shadow-emerald-900/20">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2 verde:text-emerald-100">
                O Sorteio Anterior
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 verde:text-emerald-400/80 mt-1">
                {selectedNumbers.length} de 15 dezenas selecionadas
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

          <div className="grid grid-cols-5 gap-3 md:gap-4 justify-items-center max-w-fit mx-auto">
            {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                onClick={() => toggleNumber(num)}
                className={getNumberClass(num, 'selector')}
              >
                {formatNum(num)}
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={selectedNumbers.length !== 15}
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg ${selectedNumbers.length === 15
                ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 hover:scale-105 hover:shadow-xl shadow-zinc-900/20 dark:shadow-white/20 verde:bg-emerald-500 verde:text-white verde:hover:bg-emerald-400 verde:shadow-emerald-500/30"
                : "bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 verde:bg-emerald-900/50 verde:text-emerald-700/50 cursor-not-allowed"
                }`}
            >
              Simular Apostas
            </button>
          </div>
        </section>

        {/* Results Section */}
        {result && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* Analytics Overview */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Dezenas Sorteadas Analysis */}
              <div className="bg-white/40 dark:bg-zinc-900/30 verde:bg-emerald-900/20 backdrop-blur-md rounded-3xl p-6 border border-emerald-100 dark:border-emerald-900/30 verde:border-emerald-800/50 h-full">
                <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 verde:text-emerald-300 mb-6 flex items-center">
                  <span className="w-2 h-6 bg-emerald-500 verde:bg-emerald-400 rounded-full mr-3 block"></span>
                  Análise das Sorteadas (15)
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 verde:text-emerald-400/70 uppercase tracking-wider mb-3">Fixas Sorteadas (3)</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.fixas_sorteadas.map(n => <div key={n} className={getNumberClass(n, 'fixa')}>{formatNum(n)}</div>)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-zinc-900/50 verde:bg-emerald-800/30 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800 verde:border-emerald-700/30">
                      <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 verde:text-emerald-400/70 uppercase tracking-wider mb-3">Grupo A Base (6)</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.A_base.map(n => <div key={n} className={getNumberClass(n, 'display')}>{formatNum(n)}</div>)}
                      </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900/50 verde:bg-emerald-800/30 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800 verde:border-emerald-700/30">
                      <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 verde:text-emerald-400/70 uppercase tracking-wider mb-3">Grupo B Base (6)</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.B_base.map(n => <div key={n} className={getNumberClass(n, 'display')}>{formatNum(n)}</div>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dezenas Não Sorteadas Analysis */}
              <div className="bg-white/40 dark:bg-zinc-900/30 verde:bg-emerald-900/20 backdrop-blur-md rounded-3xl p-6 border border-red-100 dark:border-red-900/30 verde:border-emerald-800/50 h-full">
                <h3 className="text-xl font-bold text-red-500 dark:text-red-400 verde:text-emerald-300 mb-6 flex items-center">
                  <span className="w-2 h-6 bg-red-500 verde:bg-emerald-400 rounded-full mr-3 block"></span>
                  Análise das Não Sorteadas (10)
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 verde:text-emerald-400/70 uppercase tracking-wider mb-3">Fixas Não Sorteadas (2)</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.fixas_nao_sorteadas.map(n => <div key={n} className={getNumberClass(n, 'fixa')}>{formatNum(n)}</div>)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-zinc-900/50 verde:bg-emerald-800/30 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800 verde:border-emerald-700/30">
                      <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 verde:text-emerald-400/70 uppercase tracking-wider mb-3">Grupo R3 Base (4)</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.R3_base.map(n => <div key={n} className={getNumberClass(n, 'display')}>{formatNum(n)}</div>)}
                      </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900/50 verde:bg-emerald-800/30 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800 verde:border-emerald-700/30">
                      <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 verde:text-emerald-400/70 uppercase tracking-wider mb-3">Grupo R4 Base (4)</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.R4_base.map(n => <div key={n} className={getNumberClass(n, 'display')}>{formatNum(n)}</div>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Final Games */}
            <section className="space-y-6">
              <h2 className="text-3xl font-extrabold text-center mb-10 verde:text-emerald-100">4 Apostas Geradas</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Jogo 1", desc: "A + R3", nums: result.jogos[0] },
                  { title: "Jogo 2", desc: "B + R4", nums: result.jogos[1] },
                  { title: "Jogo 3", desc: "A + R4", nums: result.jogos[2] },
                  { title: "Jogo 4", desc: "B + R3", nums: result.jogos[3] },
                ].map((jogo, i) => (
                  <div key={i} className="bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-black verde:from-emerald-900 verde:to-emerald-950 rounded-3xl p-6 md:p-8 shadow-xl border border-zinc-200/50 dark:border-zinc-800/80 verde:border-emerald-800/50 hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex justify-between items-center mb-6 border-b border-zinc-100 dark:border-zinc-800 verde:border-emerald-800/50 pb-4">
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 verde:from-emerald-100 verde:to-emerald-400">
                        {jogo.title}
                      </h3>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 verde:bg-emerald-800/50 text-zinc-500 dark:text-zinc-400 verde:text-emerald-300">
                        Combinação: {jogo.desc}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {jogo.nums.map(n => {
                        const isSortFixa = result.fixas_sorteadas.includes(n);
                        const isNaoSortFixa = result.fixas_nao_sorteadas.includes(n);
                        const isSorteada = result.sorteadas.includes(n);

                        let colorClass = "bg-white dark:bg-zinc-800 verde:bg-emerald-800/50 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 verde:border-emerald-700/50 verde:text-emerald-100";
                        if (isSortFixa || isNaoSortFixa) {
                          colorClass = "bg-gradient-to-br from-amber-400 to-amber-600 border-none text-white shadow-md shadow-amber-500/20 verde:shadow-amber-900/30";
                        } else if (isSorteada) {
                          colorClass = "bg-emerald-50 dark:bg-emerald-900/30 verde:bg-emerald-700/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 verde:border-emerald-600/50";
                        } else {
                          colorClass = "bg-red-50 dark:bg-red-900/30 verde:bg-[#3f1919]/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50 verde:border-[#522929]/50";
                        }

                        return (
                          <div key={n} className={`flex items-center justify-center font-bold text-sm w-11 h-11 rounded-full shadow-sm transition-all duration-300 hover:-translate-y-1 ${colorClass}`}>
                            {formatNum(n)}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <DonationCTA />

          </div>
        )}
      </main>
    </div>
  );
}
