"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { 
    Heart, 
    Copy, 
    Check, 
    Coffee, 
    Server, 
    HeartHandshake, 
    ShieldCheck, 
    Users, 
    Coins 
} from "lucide-react";
import { generatePixPayload } from "@/utils/pix";

interface SupportTier {
    id: string;
    amount: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
    border: string;
}

export default function ApoiarPage() {
    const [selectedTier, setSelectedTier] = useState<string>("tier-2");
    const [customAmount, setCustomAmount] = useState<string>("");
    const [copied, setCopied] = useState(false);

    const PIX_KEY = process.env.NEXT_PUBLIC_PIX_KEY || "eb279503-2ef3-46c4-8186-fb562a0ea7cc";
    const MERCHANT_NAME = process.env.NEXT_PUBLIC_PIX_NAME || "Doacao App Lotofacil";
    const MERCHANT_CITY = process.env.NEXT_PUBLIC_PIX_CITY || "SAO PAULO";

    const tiers: SupportTier[] = [
        {
            id: "tier-1",
            amount: 5,
            title: "Café Expresso",
            description: "Garanta uma dose extra de cafeína para continuarmos mantendo as dezenas atualizadas.",
            icon: <Coffee className="w-5 h-5" />,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            border: "border-amber-500/30"
        },
        {
            id: "tier-2",
            amount: 15,
            title: "Super Aposta",
            description: "O equivalente a alguns bilhetes simples. Cobre os custos do servidor de banco de dados por 2 semanas.",
            icon: <Coins className="w-5 h-5" />,
            color: "text-rose-500",
            bg: "bg-rose-500/10",
            border: "border-rose-500/30"
        },
        {
            id: "tier-3",
            amount: 30,
            title: "Bolão Premium",
            description: "Ajuda a expandir a infraestrutura e a financiar o desenvolvimento de simuladores para outras loterias.",
            icon: <HeartHandshake className="w-5 h-5" />,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/30"
        }
    ];

    // Determine current active amount
    let activeAmount = 15;
    if (selectedTier === "custom") {
        activeAmount = Math.max(1, Number(customAmount) || 1);
    } else {
        const found = tiers.find(t => t.id === selectedTier);
        if (found) activeAmount = found.amount;
    }

    const pixPayload = generatePixPayload(PIX_KEY, activeAmount, MERCHANT_NAME, MERCHANT_CITY);

    const handleCopy = () => {
        navigator.clipboard.writeText(pixPayload);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSelectTier = (id: string) => {
        setSelectedTier(id);
        setCustomAmount("");
    };

    const handleCustomAmountChange = (val: string) => {
        setSelectedTier("custom");
        setCustomAmount(val);
    };

    // Simulated Goal Stats
    const goalTarget = 80;
    const goalCurrent = 55;
    const goalPercent = Math.min(100, Math.round((goalCurrent / goalTarget) * 100));

    // Simulated Supporters Wall
    const recentDonors = [
        { name: "Lucas M.", amount: 15, time: "Há 2 horas", emoji: "🍀" },
        { name: "Mariana S.", amount: 30, time: "Ontem", emoji: "💎" },
        { name: "Carlos E.", amount: 5, time: "Há 2 dias", emoji: "☕" },
        { name: "Ana Paula G.", amount: 10, time: "Há 3 dias", emoji: "✨" },
        { name: "Júlio C.", amount: 20, time: "Há 4 dias", emoji: "🙌" }
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 verde:bg-[#022c22] text-zinc-900 dark:text-zinc-100 verde:text-emerald-50 font-sans selection:bg-rose-500/30 pb-20 pt-8 transition-colors duration-500">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-500 dark:text-rose-400 verde:text-emerald-300 font-bold text-xs mb-4">
                        <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
                        Apoie o Simulador
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-amber-500 dark:from-rose-450 dark:to-amber-300 verde:from-emerald-300 verde:to-teal-200">
                        Contribua com o Loterias Simulator
                    </h1>
                    <p className="mt-4 text-zinc-650 dark:text-zinc-450 verde:text-emerald-200/70 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
                        Este projeto é 100% gratuito e mantido sem anúncios invasivos por um único desenvolvedor. Sua colaboração cobre servidores, APIs de dados das loterias e café!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Tiers & Info */}
                    <div className="lg:col-span-7 space-y-6">
                        
                        {/* Monthly Goal Progress */}
                        <div className="bg-white/70 dark:bg-zinc-900/60 verde:bg-emerald-950/40 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/80 verde:border-emerald-800/40 rounded-3xl p-6 shadow-md relative overflow-hidden">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                                        <Server className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-100 verde:text-emerald-100">Meta do Servidor (Junho)</h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 verde:text-emerald-450">Custos básicos de infraestrutura</p>
                                    </div>
                                </div>
                                <span className="text-sm font-black text-indigo-500">{goalPercent}%</span>
                            </div>
                            
                            {/* Progress bar */}
                            <div className="w-full bg-zinc-100 dark:bg-zinc-800 verde:bg-emerald-900/50 h-3.5 rounded-full overflow-hidden mb-3">
                                <div 
                                    className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-full rounded-full transition-all duration-1000 shadow-sm"
                                    style={{ width: `${goalPercent}%` }}
                                />
                            </div>

                            <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 verde:text-emerald-350">
                                <span>Arrecadado: R$ {goalCurrent.toFixed(2)}</span>
                                <span>Meta: R$ {goalTarget.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Donation Tiers Selection */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 verde:text-emerald-100 mb-2">Selecione o valor do apoio:</h3>
                            
                            <div className="grid grid-cols-1 gap-3">
                                {tiers.map((tier) => (
                                    <div
                                        key={tier.id}
                                        onClick={() => handleSelectTier(tier.id)}
                                        className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                                            selectedTier === tier.id
                                                ? "bg-white dark:bg-zinc-900 verde:bg-emerald-900/40 border-rose-500 shadow-lg scale-[1.01]"
                                                : "bg-white/40 dark:bg-zinc-900/30 verde:bg-emerald-950/20 border-zinc-200/60 dark:border-zinc-800/80 verde:border-emerald-800/20 hover:bg-white/70 dark:hover:bg-zinc-900/50 verde:hover:bg-emerald-950/40"
                                        }`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${tier.bg} ${tier.color}`}>
                                            {tier.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-bold text-sm text-zinc-850 dark:text-zinc-100 verde:text-emerald-50">{tier.title}</h4>
                                                <span className="text-sm font-black text-rose-500">R$ {tier.amount}</span>
                                            </div>
                                            <p className="text-xs text-zinc-550 dark:text-zinc-400 verde:text-emerald-300/80 mt-1 leading-relaxed">
                                                {tier.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {/* Custom Amount Selection */}
                                <div
                                    onClick={() => setSelectedTier("custom")}
                                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                                        selectedTier === "custom"
                                            ? "bg-white dark:bg-zinc-900 verde:bg-emerald-900/40 border-rose-500 shadow-lg scale-[1.01]"
                                            : "bg-white/40 dark:bg-zinc-900/30 verde:bg-emerald-950/20 border-zinc-200/60 dark:border-zinc-800/80 verde:border-emerald-800/20 hover:bg-white/70 dark:hover:bg-zinc-900/50 verde:hover:bg-emerald-950/40"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-zinc-100 dark:bg-zinc-800 verde:bg-emerald-900/60 text-zinc-500 dark:text-zinc-400 verde:text-emerald-300">
                                            <Coins className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
                                            <div>
                                                <h4 className="font-bold text-sm text-zinc-850 dark:text-zinc-100 verde:text-emerald-555">Outro valor</h4>
                                                <p className="text-xs text-zinc-550 dark:text-zinc-400 verde:text-emerald-300/80 mt-0.5">Colabore com a quantia que desejar.</p>
                                            </div>
                                            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-950 verde:bg-[#022c22] border border-zinc-200 dark:border-zinc-800 verde:border-emerald-900 rounded-xl px-3 py-1.5 max-w-[150px]">
                                                <span className="text-xs font-bold text-zinc-500">R$</span>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    step="1"
                                                    value={customAmount}
                                                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                                                    placeholder="Valor"
                                                    className="w-full bg-transparent text-right font-black text-sm text-zinc-850 dark:text-white verde:text-emerald-50 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Direct Support Benefits */}
                        <div className="bg-gradient-to-br from-indigo-50/50 to-indigo-100/30 dark:from-zinc-900/30 dark:to-zinc-950/20 verde:from-emerald-900/10 verde:to-[#022c22]/10 rounded-3xl p-5 border border-indigo-100/50 dark:border-zinc-800 verde:border-emerald-800/20 flex gap-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-indigo-900 dark:text-indigo-400 verde:text-emerald-300">Nossos Compromissos de Transparência</h4>
                                <ul className="text-xs text-zinc-650 dark:text-zinc-400 verde:text-emerald-300/85 mt-2 space-y-1.5 list-disc pl-4">
                                    <li>Plataforma 100% gratuita para sempre.</li>
                                    <li>Garantia de zero anúncios abusivos ou popups chatos.</li>
                                    <li>Atualização constante dos resultados em menos de 10 minutos após o sorteio da Caixa.</li>
                                    <li>Seu apoio é investido diretamente no projeto.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: QR Code & Wall */}
                    <div className="lg:col-span-5 space-y-6">
                        
                        {/* Pix Generator Box */}
                        <div className="bg-white/80 dark:bg-zinc-900/80 verde:bg-emerald-950/60 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/80 verde:border-emerald-800/40 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center relative">
                            <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-zinc-900 dark:bg-white verde:bg-emerald-500 text-white dark:text-zinc-900 verde:text-white font-black text-[10px] uppercase tracking-wider shadow">
                                Pagamento Seguro via Pix
                            </span>

                            <div className="mt-4 mb-4 text-xs text-zinc-500 dark:text-zinc-400 verde:text-emerald-300/80">
                                Valor a apoiar: <span className="font-black text-zinc-800 dark:text-white verde:text-emerald-100 text-sm">R$ {activeAmount.toFixed(2)}</span>
                            </div>

                            <div className="bg-white p-3 rounded-2xl shadow-md border border-zinc-100 mb-6">
                                <QRCodeSVG value={pixPayload} size={180} level="M" includeMargin={false} />
                            </div>

                            <button
                                onClick={handleCopy}
                                className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                                    copied
                                        ? "bg-emerald-500 text-white shadow-emerald-500/30"
                                        : "bg-zinc-900 dark:bg-zinc-100 verde:bg-emerald-500 text-white dark:text-zinc-900 verde:text-white hover:bg-zinc-800 dark:hover:bg-white verde:hover:bg-emerald-400 shadow-zinc-900/20 dark:shadow-white/20 verde:shadow-emerald-500/30"
                                } shadow-lg hover:-translate-y-0.5`}
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 animate-scale" />
                                        Código Copiado com Sucesso!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copiar Código PIX (Copia e Cola)
                                    </>
                                )}
                            </button>

                            <p className="text-[10px] text-zinc-500 dark:text-zinc-500 verde:text-emerald-400/60 mt-3 leading-relaxed">
                                Abra o aplicativo do seu banco, escolha a opção "Pagar via Pix" e aponte a câmera para o QR code ou cole o código acima.
                            </p>
                        </div>

                        {/* Recent Supporters Mural */}
                        <div className="bg-white/70 dark:bg-zinc-900/60 verde:bg-emerald-950/40 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/80 verde:border-emerald-800/40 rounded-3xl p-6 shadow-md">
                            <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-100 verde:text-emerald-100 mb-4 flex items-center gap-2">
                                <Users className="w-4 h-4 text-rose-500" />
                                Mural de Apoiadores Recentes
                            </h3>

                            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                                {recentDonors.map((donor, idx) => (
                                    <div 
                                        key={idx}
                                        className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800/50 verde:border-emerald-900/40 last:border-none"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-base">{donor.emoji}</span>
                                            <div>
                                                <h4 className="font-bold text-xs text-zinc-850 dark:text-zinc-100 verde:text-emerald-50">{donor.name}</h4>
                                                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 verde:text-emerald-400/80">{donor.time}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs font-black text-rose-500">R$ {donor.amount.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}
