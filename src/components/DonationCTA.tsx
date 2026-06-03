"use client";

import Link from "next/link";
import { Heart, Coffee } from "lucide-react";

export function DonationCTA() {
    return (
        <div className="bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-zinc-900 dark:to-zinc-950/50 verde:from-emerald-900/30 verde:to-[#022c22]/50 backdrop-blur-xl border border-zinc-200/60 dark:border-zinc-800/80 verde:border-emerald-800/40 rounded-3xl p-6 md:p-8 mt-12 text-center max-w-2xl mx-auto shadow-xl shadow-zinc-200/10 dark:shadow-black/20 verde:shadow-emerald-950/10 relative overflow-hidden group">
            
            {/* Background glowing/decor elements */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700 pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700 pointer-events-none" />

            <div className="flex flex-col items-center gap-3 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/30 verde:bg-emerald-800/40 text-rose-500 dark:text-rose-450 verde:text-emerald-300 flex items-center justify-center animate-bounce">
                        <Coffee className="w-5 h-5" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/30 verde:bg-emerald-800/40 text-amber-500 dark:text-amber-450 verde:text-emerald-300 flex items-center justify-center -translate-y-1">
                        <Heart className="w-5 h-5 fill-current" />
                    </div>
                </div>

                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-amber-500 dark:from-rose-400 dark:to-amber-300 verde:from-emerald-300 verde:to-teal-200">
                    Gostou dos jogos gerados?
                </h3>
                
                <p className="text-sm text-zinc-600 dark:text-zinc-400 verde:text-emerald-250 max-w-md mx-auto leading-relaxed">
                    Este simulador é mantido por um único desenvolvedor, sem anúncios e totalmente gratuito. Se ele te ajudou, considere retribuir com uma pequena doação via Pix!
                </p>

                <div className="mt-4">
                    <Link
                        href="/apoiar"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-bold text-sm shadow-md hover:shadow-lg shadow-rose-500/20 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <Heart className="w-4 h-4 fill-current" />
                        Apoiar com Pix
                    </Link>
                </div>
            </div>
        </div>
    );
}
