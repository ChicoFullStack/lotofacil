export type SimulationResult = {
  sorteadas: number[];
  nao_sorteadas: number[];
  fixas_sorteadas: number[];
  A_base: number[];
  B_base: number[];
  A: number[];
  B: number[];
  fixas_nao_sorteadas: number[];
  R3_base: number[];
  R4_base: number[];
  R3: number[];
  R4: number[];
  jogos: [number[], number[], number[], number[]];
};

export function generateGames(sorteadas: number[]): SimulationResult {
  if (sorteadas.length !== 15) {
    throw new Error("É necessário fornecer exatamente 15 dezenas sorteadas.");
  }

  // Ensure unique and sorted
  const sortedSorteadas = [...new Set(sorteadas)].sort((a, b) => a - b);

  if (sortedSorteadas.length !== 15) {
    throw new Error("Dezenas repetidas na entrada.");
  }

  // 1 to 25
  const allNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
  const nao_sorteadas = allNumbers.filter((n) => !sortedSorteadas.includes(n));

  // Shuffle function
  const shuffle = <T>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const sortNumbers = (arr: number[]) => [...arr].sort((a, b) => a - b);

  const shuffledSorteadas = shuffle(sortedSorteadas);
  const fixas_sorteadas = sortNumbers(shuffledSorteadas.slice(0, 3));
  const remainingSorteadas = shuffledSorteadas.slice(3);
  const A_base = sortNumbers(remainingSorteadas.slice(0, 6));
  const B_base = sortNumbers(remainingSorteadas.slice(6, 12));

  const A = sortNumbers([...A_base, ...fixas_sorteadas]);
  const B = sortNumbers([...B_base, ...fixas_sorteadas]);

  const shuffledNaoSorteadas = shuffle(nao_sorteadas);
  const fixas_nao_sorteadas = sortNumbers(shuffledNaoSorteadas.slice(0, 2));
  const remainingNaoSorteadas = shuffledNaoSorteadas.slice(2);
  const R3_base = sortNumbers(remainingNaoSorteadas.slice(0, 4));
  const R4_base = sortNumbers(remainingNaoSorteadas.slice(4, 8));

  const R3 = sortNumbers([...R3_base, ...fixas_nao_sorteadas]);
  const R4 = sortNumbers([...R4_base, ...fixas_nao_sorteadas]);

  const jogos: [number[], number[], number[], number[]] = [
    sortNumbers([...A, ...R3]),
    sortNumbers([...B, ...R4]),
    sortNumbers([...A, ...R4]),
    sortNumbers([...B, ...R3]),
  ];

  return {
    sorteadas: sortedSorteadas,
    nao_sorteadas,
    fixas_sorteadas,
    A_base,
    B_base,
    A,
    B,
    fixas_nao_sorteadas,
    R3_base,
    R4_base,
    R3,
    R4,
    jogos,
  };
}

export type DynamicSimulationResult = {
  sorteadas: number[];
  nao_sorteadas: number[];
  fixas_sorteadas: number[];
  fixas_nao_sorteadas: number[];
  jogos: number[][]; // Array of generated games
};

export function generateDynamicGames(sorteadas: number[], numGames: number): DynamicSimulationResult {
  if (sorteadas.length !== 15) {
    throw new Error("É necessário fornecer exatamente 15 dezenas sorteadas.");
  }

  // Ensure unique and sorted
  const sortedSorteadas = [...new Set(sorteadas)].sort((a, b) => a - b);

  if (sortedSorteadas.length !== 15) {
    throw new Error("Dezenas repetidas na entrada.");
  }

  // 1 to 25
  const allNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
  const nao_sorteadas = allNumbers.filter((n) => !sortedSorteadas.includes(n));

  // Shuffle function
  const shuffle = <T>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const sortNumbers = (arr: number[]) => [...arr].sort((a, b) => a - b);

  const shuffledSorteadas = shuffle(sortedSorteadas);
  const fixas_sorteadas = sortNumbers(shuffledSorteadas.slice(0, 3));
  const remainingSorteadas = shuffledSorteadas.slice(3); // 12 remaining

  const shuffledNaoSorteadas = shuffle(nao_sorteadas);
  const fixas_nao_sorteadas = sortNumbers(shuffledNaoSorteadas.slice(0, 2));
  const remainingNaoSorteadas = shuffledNaoSorteadas.slice(2); // 8 remaining

  const jogos: number[][] = [];
  const gerados = new Set<string>();

  // Attempt to generate unique games. If numGames is extremely high, 
  // we could theoretically infinite loop, but for realistic numbers (< 100) it's extremely unlikely.
  // There are C(12,6) * C(8,4) = 924 * 70 = 64,680 possible combinations.
  let attempts = 0;
  const maxAttempts = numGames * 10;

  while (jogos.length < numGames && attempts < maxAttempts) {
    attempts++;

    // Pick 6 from remainingSorteadas
    const partA = sortNumbers(shuffle(remainingSorteadas).slice(0, 6));

    // Pick 4 from remainingNaoSorteadas
    const partB = sortNumbers(shuffle(remainingNaoSorteadas).slice(0, 4));

    const finalGame = sortNumbers([...fixas_sorteadas, ...fixas_nao_sorteadas, ...partA, ...partB]);
    const hash = finalGame.join(",");

    if (!gerados.has(hash)) {
      gerados.add(hash);
      jogos.push(finalGame);
    }
  }

  return {
    sorteadas: sortedSorteadas,
    nao_sorteadas,
    fixas_sorteadas,
    fixas_nao_sorteadas,
    jogos,
  };
}
