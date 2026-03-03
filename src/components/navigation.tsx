"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

export function Navigation() {
    const pathname = usePathname();

    if (pathname.startsWith("/quina")) {
        return (
            <nav className="w-full flex items-center justify-center py-4 md:py-6 px-4 md:px-6 relative z-10 gap-2">
                <div className="flex-1 overflow-x-auto scrollbar-hide flex justify-center">
                    <div className="flex w-max gap-2 md:gap-4 bg-white/80 dark:bg-zinc-900/80 verde:bg-emerald-900/80 backdrop-blur-md px-2 py-2 rounded-full shadow-sm md:shadow-lg border border-zinc-200/80 dark:border-zinc-800/80 verde:border-emerald-700/50">
                        <Link
                            href="/quina"
                            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${pathname === "/quina"
                                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 verde:bg-blue-600 verde:text-white shadow-md"
                                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white verde:text-blue-300 verde:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 verde:hover:bg-blue-900/50"
                                }`}
                        >
                            <span className="md:hidden">Manual</span>
                            <span className="hidden md:inline">Simulador Manual</span>
                        </Link>
                        <Link
                            href="/quina/simulador-dinamico"
                            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${pathname === "/quina/simulador-dinamico"
                                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 verde:bg-blue-600 verde:text-white shadow-md"
                                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white verde:text-blue-300 verde:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 verde:hover:bg-blue-900/50"
                                }`}
                        >
                            <span className="md:hidden">Dinâmico</span>
                            <span className="hidden md:inline">Simulador Dinâmico</span>
                        </Link>
                        <Link
                            href="/quina/prospectar"
                            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${pathname === "/quina/prospectar"
                                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 verde:bg-blue-600 verde:text-white shadow-md"
                                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white verde:text-blue-300 verde:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 verde:hover:bg-blue-900/50"
                                }`}
                        >
                            <span className="md:hidden">Inteligente</span>
                            <span className="hidden md:inline">Prospecção Inteligente</span>
                        </Link>
                    </div>
                </div>
                <div className="hidden md:block flex-shrink-0 pr-4 md:absolute md:pr-0 md:right-6 md:top-6">
                    <ThemeToggle />
                </div>
            </nav>
        );
    }

    if (pathname.startsWith("/megasena")) {
        return (
            <nav className="w-full flex items-center justify-center py-4 md:py-6 px-4 md:px-6 relative z-10 gap-2">
                <div className="flex-1 overflow-x-auto scrollbar-hide flex justify-center">
                    <div className="flex w-max gap-2 md:gap-4 bg-white/50 dark:bg-zinc-900/50 verde:bg-orange-950/30 backdrop-blur-md px-2 py-2 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 verde:border-orange-800/30 shadow-sm md:shadow-lg">
                        <Link
                            href="/megasena"
                            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${pathname === "/megasena"
                                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 verde:bg-orange-600 verde:text-white shadow-md"
                                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white verde:text-orange-300 verde:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 verde:hover:bg-orange-900/50"
                                }`}
                        >
                            <span className="md:hidden">Manual</span>
                            <span className="hidden md:inline">Simulador Manual</span>
                        </Link>
                        <Link
                            href="/megasena/simulador-dinamico"
                            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${pathname === "/megasena/simulador-dinamico"
                                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 verde:bg-orange-600 verde:text-white shadow-md"
                                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white verde:text-orange-300 verde:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 verde:hover:bg-orange-900/50"
                                }`}
                        >
                            <span className="md:hidden">Dinâmico</span>
                            <span className="hidden md:inline">Simulador Dinâmico</span>
                        </Link>
                        <Link
                            href="/megasena/prospectar"
                            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${pathname === "/megasena/prospectar"
                                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 verde:bg-orange-600 verde:text-white shadow-md"
                                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white verde:text-orange-300 verde:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 verde:hover:bg-orange-900/50"
                                }`}
                        >
                            <span className="md:hidden">Inteligente</span>
                            <span className="hidden md:inline">Prospecção Inteligente</span>
                        </Link>
                    </div>
                </div>
                <div className="hidden md:block flex-shrink-0 pr-4 md:absolute md:pr-0 md:right-6 md:top-6">
                    <ThemeToggle />
                </div>
            </nav>
        );
    }

    return (
        <nav className="w-full flex items-center justify-center py-4 md:py-6 px-4 md:px-6 relative z-10 gap-2">
            <div className="flex-1 overflow-x-auto scrollbar-hide flex justify-center">
                <div className="flex w-max gap-2 md:gap-4 bg-white/80 dark:bg-zinc-900/80 verde:bg-emerald-900/80 backdrop-blur-md px-2 py-2 rounded-full shadow-sm md:shadow-lg border border-zinc-200/80 dark:border-zinc-800/80 verde:border-emerald-700/50">
                    <Link
                        href="/"
                        className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${pathname === "/"
                            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 verde:bg-emerald-500 verde:text-white shadow-md"
                            : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white verde:text-emerald-300 verde:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 verde:hover:bg-emerald-800/50"
                            }`}
                    >
                        <span className="md:hidden">Manual</span>
                        <span className="hidden md:inline">Simulador Manual</span>
                    </Link>
                    <Link
                        href="/simulador-dinamico"
                        className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${pathname === "/simulador-dinamico"
                            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 verde:bg-emerald-500 verde:text-white shadow-md"
                            : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white verde:text-emerald-300 verde:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 verde:hover:bg-emerald-800/50"
                            }`}
                    >
                        <span className="md:hidden">Dinâmico</span>
                        <span className="hidden md:inline">Simulador Dinâmico</span>
                    </Link>
                    <Link
                        href="/prospectar"
                        className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${pathname === "/prospectar"
                            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 verde:bg-emerald-500 verde:text-white shadow-md"
                            : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white verde:text-emerald-300 verde:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 verde:hover:bg-emerald-800/50"
                            }`}
                    >
                        <span className="md:hidden">Inteligente</span>
                        <span className="hidden md:inline">Prospecção Inteligente</span>
                    </Link>
                </div>
            </div>
            <div className="hidden md:block flex-shrink-0 pr-4 md:absolute md:pr-0 md:right-6 md:top-6">
                <ThemeToggle />
            </div>
        </nav>
    );
}
