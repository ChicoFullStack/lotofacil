"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

export function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="w-full flex justify-center py-6 px-6 relative z-10">
            <div className="flex bg-white/80 dark:bg-zinc-900/80 verde:bg-emerald-900/80 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-800 verde:border-emerald-700/50">
                <Link
                    href="/"
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${pathname === "/"
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 verde:bg-emerald-500 verde:text-white shadow-md"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white verde:text-emerald-300 verde:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 verde:hover:bg-emerald-800/50"
                        }`}
                >
                    Simulador Manual (Orig)
                </Link>
                <Link
                    href="/simulador-dinamico"
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${pathname === "/simulador-dinamico"
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 verde:bg-emerald-500 verde:text-white shadow-md"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white verde:text-emerald-300 verde:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 verde:hover:bg-emerald-800/50"
                        }`}
                >
                    Simulador Dinâmico
                </Link>
                <Link
                    href="/prospectar"
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${pathname === "/prospectar"
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 verde:bg-emerald-500 verde:text-white shadow-md"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white verde:text-emerald-300 verde:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 verde:hover:bg-emerald-800/50"
                        }`}
                >
                    Prospecção Inteligente
                </Link>
            </div>
            <div className="absolute right-6 top-6">
                <ThemeToggle />
            </div>
        </nav>
    );
}
