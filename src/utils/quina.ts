export type QuinaSimulationResult = {
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

export function generateQuinaGames(sorteadas: number[]): QuinaSimulationResult {
    if (sorteadas.length !== 5) {
        throw new Error("É necessário fornecer exatamente 5 dezenas sorteadas para a Quina.");
    }

    // Ensure unique and sorted
    const sortedSorteadas = [...new Set(sorteadas)].sort((a, b) => a - b);

    if (sortedSorteadas.length !== 5) {
        throw new Error("Dezenas repetidas na entrada.");
    }

    // 1 to 80 for Quina
    const allNumbers = Array.from({ length: 80 }, (_, i) => i + 1);
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

    // Sorteados logic (5 numbers)
    const shuffledSorteadas = shuffle(sortedSorteadas);
    // Pick 1 fixa from the 5 drawn numbers
    const fixas_sorteadas = sortNumbers(shuffledSorteadas.slice(0, 1));
    const remainingSorteadas = shuffledSorteadas.slice(1); // 4 remaining
    // Group A base gets 2, Group B base gets 2
    const A_base = sortNumbers(remainingSorteadas.slice(0, 2));
    const B_base = sortNumbers(remainingSorteadas.slice(2, 4));

    const A = sortNumbers([...A_base, ...fixas_sorteadas]);
    const B = sortNumbers([...B_base, ...fixas_sorteadas]);

    // Não Sorteados logic (75 numbers)
    const shuffledNaoSorteadas = shuffle(nao_sorteadas);
    // Pick 1 fixa from the non-drawn numbers
    const fixas_nao_sorteadas = sortNumbers(shuffledNaoSorteadas.slice(0, 1));
    const remainingNaoSorteadas = shuffledNaoSorteadas.slice(1); // 74 remaining

    // R3 base gets 1, R4 base gets 1 (from the remaining non-drawn)
    // We just pick the top 2 elements after shuffling to form R3 and R4 bases
    const R3_base = sortNumbers(remainingNaoSorteadas.slice(0, 1));
    const R4_base = sortNumbers(remainingNaoSorteadas.slice(1, 2));

    const R3 = sortNumbers([...R3_base, ...fixas_nao_sorteadas]);
    const R4 = sortNumbers([...R4_base, ...fixas_nao_sorteadas]);

    // Jogos (Games)
    // Each game should have: Fixa sorts (1) + Fixa nao sorts (1) + A or B base (2) + R3 or R4 base (1) = 5 numbers
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

export type DynamicQuinaSimulationResult = {
    sorteadas: number[];
    nao_sorteadas: number[];
    fixas_sorteadas: number[];
    fixas_nao_sorteadas: number[];
    jogos: number[][]; // Array of generated games
};

export function generateDynamicQuinaGames(sorteadas: number[], numGames: number): DynamicQuinaSimulationResult {
    if (sorteadas.length !== 5) {
        throw new Error("É necessário fornecer exatamente 5 dezenas sorteadas para a Quina.");
    }

    // Ensure unique and sorted
    const sortedSorteadas = [...new Set(sorteadas)].sort((a, b) => a - b);

    if (sortedSorteadas.length !== 5) {
        throw new Error("Dezenas repetidas na entrada.");
    }

    // 1 to 80
    const allNumbers = Array.from({ length: 80 }, (_, i) => i + 1);
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
    // Same rules: 1 fixa from drawn, 1 fixa from non-drawn
    const fixas_sorteadas = sortNumbers(shuffledSorteadas.slice(0, 1));
    const remainingSorteadas = shuffledSorteadas.slice(1); // 4 remaining

    const shuffledNaoSorteadas = shuffle(nao_sorteadas);
    const fixas_nao_sorteadas = sortNumbers(shuffledNaoSorteadas.slice(0, 1));
    const remainingNaoSorteadas = shuffledNaoSorteadas.slice(1); // 74 remaining

    const jogos: number[][] = [];
    const gerados = new Set<string>();

    // Generating unique games
    let attempts = 0;
    const maxAttempts = numGames * 10;

    while (jogos.length < numGames && attempts < maxAttempts) {
        attempts++;

        // Pick 2 from remainingSorteadas (equivalent to A_base or B_base)
        const partA = sortNumbers(shuffle(remainingSorteadas).slice(0, 2));

        // Pick 1 from remainingNaoSorteadas (equivalent to R3_base or R4_base)
        const partB = sortNumbers(shuffle(remainingNaoSorteadas).slice(0, 1));

        // Fixa_sort(1) + Fixa_nao_sort(1) + partA(2) + partB(1) = 5 numbers
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
