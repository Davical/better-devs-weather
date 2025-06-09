"use client";

import React from "react";
import useSWR from "swr";
import DailyForecastGrid from "./DailyForecastGrid";
import { DailyData } from "@/app/lib/weather";

const fetcher = (url: string) =>
    fetch(url).then((r) => {
        if (!r.ok) throw new Error("Network error");
        return r.json();
    });

export default function DailyForecastClient({
    lat,
    lon,
}: {
    lat: number;
    lon: number;
}) {
    const { data, error } = useSWR<{ daily: DailyData }>(
        `/api/weather/daily?lat=${lat}&lon=${lon}`,
        fetcher,
        {
            refreshInterval: 6 * 60 * 60 * 1000, // 6 hours
            revalidateOnFocus: false,
            shouldRetryOnError: true,
        }
    );

    // 1) If we’ve never loaded at all:
    if (!data && error) {
        return (
            <div className="p-6 bg-white/10 rounded-lg text-center">
                Error loading 7-day forecast.
            </div>
        );
    }

    // 2) If we have stale or fresh data:
    if (data) {
        return (
            <div className="relative h-full">
                <DailyForecastGrid daily={data.daily} />
            </div>
        );
    }

    // 3) Still loading the very first time:
    return (
        <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-4 bg-white/10 rounded-xl">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <div className="h-6 bg-gray-500 rounded w-2/3 mx-auto" />
                    <div className="h-10 bg-gray-500 rounded w-1/2 mx-auto" />
                    <div className="h-4 bg-gray-500 rounded" />
                    <div className="h-4 bg-gray-500 rounded" />
                </div>
            ))}
        </div>
    );
}
