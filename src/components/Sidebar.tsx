"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Dices, Menu, X } from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        {
            name: "Lotofácil",
            path: "/",
            icon: <LayoutDashboard className="w-5 h-5" />,
            isMatch: (p: string) => p === "/" || p === "/simulador-dinamico" || p === "/prospectar",
            colors: "hover:bg-emerald-100 hover:text-emerald-700 dark:hover:bg-emerald-900/40 dark:hover:text-emerald-400 verde:hover:bg-emerald-800",
            activeColors: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 verde:bg-emerald-800 verde:text-emerald-100"
        },
        {
            name: "Quina",
            path: "/quina",
            icon: <Dices className="w-5 h-5" />,
            isMatch: (p: string) => p.startsWith("/quina"),
            colors: "hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/40 dark:hover:text-blue-400 verde:hover:bg-blue-900",
            activeColors: "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 verde:bg-blue-900 verde:text-blue-100"
        },
        {
            name: "Megasena",
            path: "/megasena",
            icon: <Dices className="w-5 h-5" />,
            isMatch: (p: string) => p.startsWith("/megasena"),
            colors: "hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-orange-900/40 dark:hover:text-orange-400 verde:hover:bg-orange-900",
            activeColors: "bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-300 verde:bg-orange-900 verde:text-orange-100"
        }
    ];

    return (
        <>
            {/* Mobile Header (Navbar) */}
            <header className="md:hidden fixed top-0 w-full bg-white/90 dark:bg-zinc-950/90 verde:bg-[#022c22]/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 verde:border-emerald-800/50 z-40 flex items-center justify-between px-4 h-16">
                <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-zinc-600 dark:text-zinc-400 verde:text-emerald-400">
                    <Menu className="w-6 h-6" />
                </button>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400 verde:from-emerald-300 verde:to-teal-200">
                    Loterias
                </span>
                <div className="w-10"></div> {/* Placeholder for flex centering */}
            </header>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar (Desktop visible, Mobile Offcanvas) */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-zinc-950 verde:bg-[#022c22] border-r border-zinc-200 dark:border-zinc-800 verde:border-emerald-800/50 flex flex-col pt-8 z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex-shrink-0 md:bg-white/50 md:dark:bg-zinc-950/50 md:verde:bg-[#022c22]/50 md:backdrop-blur-xl ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
                {/* Close Button for Mobile */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="md:hidden absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 verde:text-emerald-400 verde:hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="px-6 mb-8 flex items-center justify-center">
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400 verde:from-emerald-300 verde:to-teal-200">
                        Loterias
                    </span>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => {
                        const active = item.isMatch(pathname);
                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                onClick={() => setIsOpen(false)} // Close sidebar on mobile click
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${active
                                    ? item.activeColors
                                    : `text-zinc-600 dark:text-zinc-400 verde:text-emerald-400/80 ${item.colors}`
                                    }`}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 verde:border-emerald-800/50 text-xs text-center text-zinc-500 dark:text-zinc-400 verde:text-emerald-400/60">
                    Loterias Simulator
                </div>
            </aside>
        </>
    );
}
