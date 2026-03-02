"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Heart, Copy, Check, X } from "lucide-react";
import { generatePixPayload } from "@/utils/pix";

export function PixDonation() {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState<number>(10);
    const [copied, setCopied] = useState(false);

    const PIX_KEY = "eb279503-2ef3-46c4-8186-fb562a0ea7cc";
    const MERCHANT_NAME = "Doacao App Lotofacil";
    const MERCHANT_CITY = "SAO PAULO";

    const pixPayload = generatePixPayload(PIX_KEY, amount, MERCHANT_NAME, MERCHANT_CITY);

    const handleCopy = () => {
        navigator.clipboard.writeText(pixPayload);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-full p-4 shadow-lg shadow-emerald-500/30 transition-all hover:scale-110 flex items-center justify-center group"
                title="Apoie este projeto"
            >
                <Heart className="w-6 h-6 animate-pulse group-hover:animate-none" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/90 verde:bg-emerald-950/90 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 verde:border-emerald-800/50 rounded-3xl p-6 shadow-2xl w-80 relative flex flex-col items-center text-center">

                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 verde:hover:text-emerald-300 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 verde:bg-emerald-800/50 text-emerald-600 dark:text-emerald-400 verde:text-emerald-300 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 fill-current" />
                </div>

                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 verde:from-emerald-300 verde:to-teal-200 mb-2">
                    Apoie o Projeto
                </h3>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 verde:text-emerald-200/70 mb-6">
                    Sua doação ajuda a manter este simulador no ar e sem anúncios.
                </p>

                <div className="w-full mb-6">
                    <label htmlFor="amount" className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 verde:text-emerald-200 mb-1 text-left">
                        Valor da colaboração (R$):
                    </label>
                    <input
                        id="amount"
                        type="number"
                        min="1"
                        step="1"
                        value={amount}
                        onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-zinc-100 dark:bg-zinc-950 verde:bg-[#022c22] border border-zinc-200 dark:border-zinc-800 verde:border-emerald-900 rounded-xl px-4 py-3 text-2xl font-black text-zinc-900 dark:text-white verde:text-emerald-50 text-center focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
                    />
                </div>

                <div className="bg-white p-3 rounded-2xl shadow-sm mb-4">
                    <QRCodeSVG value={pixPayload} size={160} level="M" includeMargin={false} />
                </div>

                <button
                    onClick={handleCopy}
                    className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${copied
                            ? "bg-emerald-500 text-white shadow-emerald-500/30"
                            : "bg-zinc-900 dark:bg-zinc-100 verde:bg-emerald-500 text-white dark:text-zinc-900 verde:text-white hover:bg-zinc-800 dark:hover:bg-white verde:hover:bg-emerald-400 shadow-zinc-900/20 dark:shadow-white/20 verde:shadow-emerald-500/30"
                        } shadow-lg hover:-translate-y-0.5`}
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4" />
                            Chave Copiada!
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            Copiar Código PIX
                        </>
                    )}
                </button>

            </div>
        </div>
    );
}
