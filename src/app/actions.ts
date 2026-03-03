"use server";

import fs from "fs";
import path from "path";
import * as xlsx from "xlsx";

export async function prospectNumbers(limit: number | "all"): Promise<number[]> {
    // Correct way to reference the public folder in Next.js backend actions
    const filePath = path.join(process.cwd(), "public", "Lotof\u00e1cil.xlsx");
    const workbook = xlsx.read(fs.readFileSync(filePath));
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Read the data and ensure it's not empty, defval helps with sparse arrays
    const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null }) as any[][];

    // Find the header row
    const headerIdx = rawData.findIndex(row => row && (row.includes("Concurso") || row.includes("Bola1")));
    if (headerIdx === -1) {
        throw new Error("Formato de planilha inválido: Cabeçalho 'Concurso' ou 'Bola1' não encontrado na aba LOTOFÁCIL.");
    }

    const headerRow = rawData[headerIdx];
    const concursoColIdx = headerRow.indexOf("Concurso");

    // Find bola column indices
    const bolaIndices: number[] = [];
    for (let i = 1; i <= 15; i++) {
        const idx = headerRow.indexOf(`Bola${i}`);
        if (idx !== -1) bolaIndices.push(idx);
    }

    if (bolaIndices.length < 15) {
        throw new Error(`Colunas incompletas: Foram encontradas apenas ${bolaIndices.length} dezenas ('Bola1' a 'Bola15') no arquivo Excel.`);
    }

    const dataRows = rawData.slice(headerIdx + 1);

    // Filter rows that have a valid "Concurso" number
    const validRows = dataRows.filter(row => {
        const concursoVal = row[concursoColIdx];
        return concursoVal !== null && concursoVal !== undefined && !isNaN(Number(concursoVal)) && Number(concursoVal) > 0;
    });

    if (validRows.length === 0) {
        throw new Error("Nenhum concurso válido encontrado na planilha. Verifique se há dados abaixo do cabeçalho.");
    }

    validRows.sort((a, b) => Number(b[concursoColIdx]) - Number(a[concursoColIdx])); // Sort Descending (latest first)

    const rowsToAnalyze = limit === "all" ? validRows : validRows.slice(0, limit);

    const frequencyMap: Record<number, number> = {};

    for (const row of rowsToAnalyze) {
        for (const idx of bolaIndices) {
            const val = row[idx];
            const num = Number(val);
            if (!isNaN(num) && num > 0 && num <= 25) {
                frequencyMap[num] = (frequencyMap[num] || 0) + 1;
            }
        }
    }

    const sortedNumbers = Object.entries(frequencyMap)
        .sort((a, b) => {
            // Sort by frequency descending
            if (b[1] !== a[1]) return b[1] - a[1];
            // Secondary sort to make it deterministic (e.g. smaller numbers first? The user may not care, but descending freq is key)
            return Number(a[0]) - Number(b[0]);
        })
        .slice(0, 15)
        .map(([numStr]) => Number(numStr));

    console.log("Returned numbers:", sortedNumbers.length, sortedNumbers);

    // Sort the final 15 numbers to display properly
    return sortedNumbers.sort((a, b) => a - b);
}

export async function prospectQuinaNumbers(limit: number | "all"): Promise<number[]> {
    const filePath = path.join(process.cwd(), "public", "Quina.xlsx");
    const workbook = xlsx.read(fs.readFileSync(filePath));
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // FIX: A planilha da Quina frequentemente salva a propriedade `!ref` errada (apenas A1:U1).
    // Precisamos iterar pelas chaves da sheet para encontrar a linha máxima real.
    if (sheet['!ref']) {
        const range = xlsx.utils.decode_range(sheet['!ref']);
        let maxRow = range.e.r;
        for (const cell in sheet) {
            if (cell[0] === '!') continue;
            const ref = xlsx.utils.decode_cell(cell);
            if (ref.r > maxRow) maxRow = ref.r;
        }
        range.e.r = maxRow;
        sheet['!ref'] = xlsx.utils.encode_range(range);
    }

    const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null }) as any[][];

    const headerIdx = rawData.findIndex(row => row && (row.includes("Concurso") || row.includes("Bola1")));
    if (headerIdx === -1) {
        throw new Error("Formato de planilha inválido: Cabeçalho 'Concurso' ou 'Bola1' não encontrado na aba QUINA.");
    }

    const headerRow = rawData[headerIdx];
    const concursoColIdx = headerRow.indexOf("Concurso");

    const bolaIndices: number[] = [];
    for (let i = 1; i <= 5; i++) {
        const idx = headerRow.indexOf(`Bola${i}`);
        if (idx !== -1) bolaIndices.push(idx);
    }

    if (bolaIndices.length < 5) {
        throw new Error(`Colunas incompletas: Foram encontradas apenas ${bolaIndices.length} dezenas ('Bola1' a 'Bola5') no arquivo Excel.`);
    }

    const dataRows = rawData.slice(headerIdx + 1);

    const validRows = dataRows.filter(row => {
        const concursoVal = row[concursoColIdx];
        return concursoVal !== null && concursoVal !== undefined && !isNaN(Number(concursoVal)) && Number(concursoVal) > 0;
    });

    if (validRows.length === 0) {
        throw new Error("Nenhum concurso válido encontrado na planilha.");
    }

    validRows.sort((a, b) => Number(b[concursoColIdx]) - Number(a[concursoColIdx])); // Sort Descending

    const rowsToAnalyze = limit === "all" ? validRows : validRows.slice(0, limit);

    const frequencyMap: Record<number, number> = {};

    for (const row of rowsToAnalyze) {
        for (const idx of bolaIndices) {
            const val = row[idx];
            const num = Number(val);
            if (!isNaN(num) && num > 0 && num <= 80) {
                frequencyMap[num] = (frequencyMap[num] || 0) + 1;
            }
        }
    }

    const sortedNumbers = Object.entries(frequencyMap)
        .sort((a, b) => {
            if (b[1] !== a[1]) return b[1] - a[1];
            return Number(a[0]) - Number(b[0]);
        })
        .slice(0, 5) // Quina draws 5 numbers
        .map(([numStr]) => Number(numStr));

    console.log("Returned Quina numbers:", sortedNumbers.length, sortedNumbers);

    // Sort the final 5 numbers
    return sortedNumbers.sort((a, b) => a - b);
}

export async function prospectMegasenaNumbers(limit: number | "all"): Promise<number[]> {
    const filePath = path.join(process.cwd(), "public", "Mega-Sena.xlsx");
    const workbook = xlsx.read(fs.readFileSync(filePath));
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // FIX `!ref` parameter
    if (sheet['!ref']) {
        const range = xlsx.utils.decode_range(sheet['!ref']);
        let maxRow = range.e.r;
        for (const cell in sheet) {
            if (cell[0] === '!') continue;
            const ref = xlsx.utils.decode_cell(cell);
            if (ref.r > maxRow) maxRow = ref.r;
        }
        range.e.r = maxRow;
        sheet['!ref'] = xlsx.utils.encode_range(range);
    }

    const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null }) as any[][];

    const headerIdx = rawData.findIndex(row => row && (row.includes("Concurso") || row.includes("Bola1")));
    if (headerIdx === -1) {
        throw new Error("Formato de planilha inválido: Cabeçalho 'Concurso' ou 'Bola1' não encontrado na aba MEGA-SENA.");
    }

    const headerRow = rawData[headerIdx];
    const concursoColIdx = headerRow.indexOf("Concurso");

    const bolaIndices: number[] = [];
    for (let i = 1; i <= 6; i++) {
        const idx = headerRow.indexOf(`Bola${i}`);
        if (idx !== -1) bolaIndices.push(idx);
    }

    if (bolaIndices.length < 6) {
        throw new Error(`Colunas incompletas: Foram encontradas apenas ${bolaIndices.length} dezenas ('Bola1' a 'Bola6') no arquivo Excel.`);
    }

    const dataRows = rawData.slice(headerIdx + 1);

    const validRows = dataRows.filter(row => {
        const concursoVal = row[concursoColIdx];
        return concursoVal !== null && concursoVal !== undefined && !isNaN(Number(concursoVal)) && Number(concursoVal) > 0;
    });

    if (validRows.length === 0) {
        throw new Error("Nenhum concurso válido encontrado na planilha.");
    }

    validRows.sort((a, b) => Number(b[concursoColIdx]) - Number(a[concursoColIdx])); // Sort Descending

    const rowsToAnalyze = limit === "all" ? validRows : validRows.slice(0, limit);

    const frequencyMap: Record<number, number> = {};

    for (const row of rowsToAnalyze) {
        for (const idx of bolaIndices) {
            const val = row[idx];
            const num = Number(val);
            if (!isNaN(num) && num > 0 && num <= 60) {
                frequencyMap[num] = (frequencyMap[num] || 0) + 1;
            }
        }
    }

    const sortedNumbers = Object.entries(frequencyMap)
        .sort((a, b) => {
            if (b[1] !== a[1]) return b[1] - a[1];
            return Number(a[0]) - Number(b[0]);
        })
        .slice(0, 6) // Megasena draws 6 numbers
        .map(([numStr]) => Number(numStr));

    console.log("Returned Megasena numbers:", sortedNumbers.length, sortedNumbers);

    // Sort the final 6 numbers
    return sortedNumbers.sort((a, b) => a - b);
}


