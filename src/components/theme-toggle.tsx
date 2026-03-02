"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Leaf } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-[104px] h-10" />;
    }

    return (
        <div className="flex bg-zinc-200/50 dark:bg-zinc-800/50 verde:bg-emerald-800/30 p-1 rounded-full items-center">
            <button
                onClick={() => setTheme("light")}
                className={`p-2 rounded-full transition-all duration-300 ${theme === "light"
                        ? "bg-white text-zinc-900 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 verde:text-emerald-600/60 verde:hover:text-emerald-800"
                    }`}
                aria-label="Light mode"
            >
                <Sun className="w-4 h-4" />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={`p-2 rounded-full transition-all duration-300 ${theme === "dark"
                        ? "bg-zinc-900 text-white shadow-sm"
                        : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 verde:text-emerald-600/60 verde:hover:text-emerald-800"
                    }`}
                aria-label="Dark mode"
            >
                <Moon className="w-4 h-4" />
            </button>
            <button
                onClick={() => setTheme("verde")}
                className={`p-2 rounded-full transition-all duration-300 ${theme === "verde"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 verde:text-emerald-600/60"
                    }`}
                aria-label="Verde mode"
            >
                <Leaf className="w-4 h-4" />
            </button>
        </div>
    );
}
