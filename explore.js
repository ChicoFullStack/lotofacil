const xlsx = require('xlsx');
const fs = require('fs');
const wb = xlsx.readFile('./public/Lotofácil.xlsx');
const ws = wb.Sheets[wb.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(ws, { header: 1 });
const rows = data.filter(row => row.length > 5).slice(0, 5);
fs.writeFileSync('output.json', JSON.stringify(rows, null, 2));
