import { useEffect, useState } from "react";
import { home } from "@/content/home";
import { resolveHeroMedia } from "@/features/home/services/heroMediaService";
import { getHomeStats } from "@/features/home/services/home.service";

const statMeta = {
    graduates: { label: "Graduates", icon: "graduation", showPlus: true },
    states_covered: { label: "States Covered", icon: "location", showPlus: false },
    batches_completed: { label: "Batches Completed", icon: "book", showPlus: false },
    current_participants: { label: "Current Participants", icon: "users", showPlus: true },
};

const statOrder = [
    "graduates",
    "states_covered",
    "batches_completed",
    "current_participants",
];

function parseStatValue(value, fallback = 0) {
    if (value === null || value === undefined || value === "") return fallback;

    if (typeof value === "number") {
        return Number.isFinite(value) ? value : fallback;
    }

    const text = String(value).trim();
    if (!text || text.toLowerCase() === "nan") return fallback;

    const cleaned = text.replace(/[^\d.-]/g, "");
    if (!cleaned) return fallback;

    const numericValue = Number(cleaned);
    return Number.isFinite(numericValue) ? numericValue : fallback;
}

function normalizeHomeStats(stats) {
    if (!stats) return home.programmeNumbers;

    if (Array.isArray(stats)) {
        return stats.map((item) => {
            const rawValue = item.value ?? 0;
            const hasPlus = typeof rawValue === "string" ? rawValue.trim().endsWith("+") : Boolean(item.showPlus);

            return {
                ...item,
                value: parseStatValue(rawValue, 0),
                label: item.label ?? "Stat",
                icon: item.icon || "graduation",
                showPlus: Boolean(item.showPlus || hasPlus),
            };
        });
    }

    const orderedKeys = [...statOrder.filter((key) => key in stats)];
    const extraKeys = Object.keys(stats).filter((key) => !statOrder.includes(key));

    if (orderedKeys.length === 0 && extraKeys.length === 0) return home.programmeNumbers;

    return [...orderedKeys, ...extraKeys].map((key, index) => {
        const meta = statMeta[key] || {
            label: key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
            icon: "graduation",
            showPlus: false,
        };
        const rawValue = stats[key] ?? home.programmeNumbers[index]?.value ?? 0;
        const hasPlus = typeof rawValue === "string" ? rawValue.trim().endsWith("+") : Boolean(meta.showPlus || home.programmeNumbers[index]?.showPlus);

        return {
            key,
            value: parseStatValue(rawValue, home.programmeNumbers[index]?.value ?? 0),
            label: meta.label,
            icon: meta.icon,
            showPlus: Boolean(meta.showPlus || hasPlus),
        };
    });
}

export function useHomeContent() {
    const [programmeNumbers, setProgrammeNumbers] = useState(home.programmeNumbers);

    useEffect(() => {
        let isMounted = true;

        getHomeStats()
            .then((stats) => {
                if (!isMounted) return;

                const normalized = normalizeHomeStats(stats);
                if (normalized.length === 0) return;

                setProgrammeNumbers(normalized);
            })
            .catch(() => {
                if (isMounted) {
                    setProgrammeNumbers(home.programmeNumbers);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        ...home,
        programmeNumbers,
        hero: {
            ...home.hero,
            backgroundMedia: resolveHeroMedia(home.hero),
        },
    };
}
