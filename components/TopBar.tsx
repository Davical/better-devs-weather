"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import dayjs from "dayjs";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function TopBar({ lat, lon }: { lat: number; lon: number }) {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 60_000);
        return () => clearInterval(id);
    }, []);

    const { data } = useSWR<{ current: { time: string } }>(
        `/api/weather/current?lat=${lat}&lon=${lon}`,
        fetcher,
        { refreshInterval: 60_000 }
    );
    const lastUpdate = data
        ? dayjs(data.current.time).format("HH:mm, DD MMM")
        : "—";

    return (
        <div className="w-full h-12 flex items-center justify-between px-4 bg-white/10 translucent white text-white mb-6 rounded-2xl">
            <div className="text-sm">
                {dayjs(now).format("HH:mm, DD MMM YYYY")}
            </div>

            <div className="font-medium text-base">
                Rosenkrantzgade 19B, 8000 Aarhus C
            </div>

            <div className="text-sm">Last update: {lastUpdate}</div>
        </div>
    );
}
