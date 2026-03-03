export type MegasenaSimulationResult = {
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
    jogos: number[][]; // Geralmente 6 dezenas por jogo
};

export type DynamicMegasenaSimulationResult = {
    sorteadas: number[];
    nao_sorteadas: number[];
    fixas_sorteadas: number[];
    fixas_nao_sorteadas: number[];
    jogos: number[][];
};

/**
 * Randomly shuffles an array in place
 */
const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

/**
 * Simulador Manual (Estruturação Analítica)
 * Seleciona 6 números do usuário (universo de 1 a 60).
 */
export const generateMegasenaGames = (selectedNumbers: number[]): MegasenaSimulationResult => {
    if (selectedNumbers.length !== 6) {
        throw new Error("Selecione exatamente 6 dezenas para a Mega-Sena.");
    }

    const allNumbers = Array.from({ length: 60 }, (_, i) => i + 1);

    // 1. Separar Dezenas
    const sorteadas = [...selectedNumbers];
    const nao_sorteadas = allNumbers.filter((n) => !sorteadas.includes(n));

    // 2. Embaralhar para aleatoriedade dentro dos grupos
    shuffleArray(sorteadas);
    shuffleArray(nao_sorteadas);

    // 3. Fixas Sorteadas (Extraídas das 6 escolhidas) - Para Mega usaremos 2
    const fixas_sorteadas = sorteadas.slice(0, 2);

    // 4. Formar Grupos A e B (Restantes das Sorteadas: 6 - 2 = 4 dezenas)
    const remaining_sorteadas = sorteadas.slice(2);
    const A_base = remaining_sorteadas.slice(0, 2); // 2 dezenas
    const B_base = remaining_sorteadas.slice(2, 4); // 2 dezenas

    // 5. Fixas Não Sorteadas (Omitidas - 2 dezenas)
    const fixas_nao_sorteadas = nao_sorteadas.slice(0, 2);

    // 6. Formar Grupos R3 e R4 (2 dezenas cada)
    // Das 54 que não foram sorteadas, tiramos 2 proibidas, sobram 52.
    // Pegamos 4 para os grupos e o resto é lixo matemático.
    const remaining_nao_sorteadas = nao_sorteadas.slice(2);
    const R3_base = remaining_nao_sorteadas.slice(0, 2); // 2 dezenas
    const R4_base = remaining_nao_sorteadas.slice(2, 4); // 2 dezenas

    // Criar cópias ordenadas para a UI
    const A = [...A_base].sort((a, b) => a - b);
    const B = [...B_base].sort((a, b) => a - b);
    const R3 = [...R3_base].sort((a, b) => a - b);
    const R4 = [...R4_base].sort((a, b) => a - b);

    // 7. Montar os Jogos
    // Um jogo da Mega-Sena tem 6 dezenas (2 Fixas_Sorteadas + 2 base das Sorteadas + 2 base das Nao_Sorteadas)
    const j1 = [...fixas_sorteadas, ...A, ...R3].sort((a, b) => a - b);
    const j2 = [...fixas_sorteadas, ...A, ...R4].sort((a, b) => a - b);
    const j3 = [...fixas_sorteadas, ...B, ...R3].sort((a, b) => a - b);
    const j4 = [...fixas_sorteadas, ...B, ...R4].sort((a, b) => a - b);

    return {
        sorteadas,
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
        jogos: [j1, j2, j3, j4],
    };
};

/**
 * Simulador Dinâmico (Prospecção/Iterativo)
 * Gera N jogos inéditos garantindo Fixas da base de escolhidas e Omitindo fixas da base não escolhida.
 */
export const generateDynamicMegasenaGames = (
    selectedNumbers: number[],
    numGames: number
): DynamicMegasenaSimulationResult => {
    if (selectedNumbers.length !== 6) {
        throw new Error("Selecione exatamente 6 dezenas para a Mega-Sena.");
    }

    const allNumbers = Array.from({ length: 60 }, (_, i) => i + 1);

    const sorteadas = [...selectedNumbers];
    const nao_sorteadas = allNumbers.filter((n) => !sorteadas.includes(n));

    shuffleArray(sorteadas);
    shuffleArray(nao_sorteadas);

    // Para geração dinâmica maciça, fixamos apenas 1 e omitimos 2 para aumentar variância
    const fixas_sorteadas = [sorteadas[0]];
    const fixas_nao_sorteadas = nao_sorteadas.slice(0, 2);

    const availableCombosPool = allNumbers.filter(
        (n) => !fixas_sorteadas.includes(n) && !fixas_nao_sorteadas.includes(n)
    );

    const jogos: number[][] = [];
    const maxAttempts = numGames * 20; // limitador de laço infinito caso peça mais que as combinações possíveis
    let attempts = 0;

    const jogosSet = new Set<string>();

    while (jogos.length < numGames && attempts < maxAttempts) {
        attempts++;
        shuffleArray(availableCombosPool);

        // precisamos de 6 no total. Já temos 1 fixa, pegamos mais 5 aleatórias do pool permitido.
        const complement = availableCombosPool.slice(0, 5);
        const game = [...fixas_sorteadas, ...complement].sort((a, b) => a - b);
        const gameStr = game.join(",");

        if (!jogosSet.has(gameStr)) {
            jogosSet.add(gameStr);
            jogos.push(game);
        }
    }

    return {
        sorteadas,
        nao_sorteadas,
        fixas_sorteadas: fixas_sorteadas.sort((a, b) => a - b),
        fixas_nao_sorteadas: fixas_nao_sorteadas.sort((a, b) => a - b),
        jogos,
    };
};
