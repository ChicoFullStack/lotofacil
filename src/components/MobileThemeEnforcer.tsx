"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function MobileThemeEnforcer() {
    const { setTheme } = useTheme();

    useEffect(() => {
        const enforceTheme = () => {
            if (window.innerWidth < 768) {
                setTheme('light');
            }
        };

        // Enforce immediately on mount
        enforceTheme();

        // Optional: you can choose to enforce when the user resizes back to mobile
        window.addEventListener('resize', enforceTheme);
        return () => window.removeEventListener('resize', enforceTheme);
    }, [setTheme]);

    return null;
}
