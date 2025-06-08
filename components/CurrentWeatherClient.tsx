"use client";
import React from "react";
import useSWR from "swr";
import CurrentWeatherCard from "./CurrentWeatherCard";
import { CurrentWeather } from "@/app/lib/weather";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function CurrentWeatherClient({
    lat,
    lon,
}: {
    lat: number;
    lon: number;
}) {
    const { data, error } = useSWR<{ current: CurrentWeather }>(
        `/api/weather/current?lat=${lat}&lon=${lon}`,
        fetcher,
        {
            refreshInterval: 600_000,
            revalidateOnFocus: false,
            shouldRetryOnError: true,
            errorRetryCount: 3,
            errorRetryInterval: 30_000,
        }
    );

    // 1) If we’ve never loaded at all:
    if (!data && error) {
        return (
            <div className="p-8 bg-white/10 rounded">
                Error loading current weather.
            </div>
        );
    }

    // 2) If we have stale or fresh data:
    if (data) {
        return (
            <div className="relative h-full">
                <CurrentWeatherCard current={data.current} />
            </div>
        );
    }

    // 3) Still loading the very first time:
    return (
        <div className="animate-pulse bg-white/10 rounded-2xl p-8 h-64">
            <div className="h-8 bg-gray-500 rounded w-1/3 mb-4"></div>
            <div className="h-24 bg-gray-500 rounded w-1/2 mx-auto mb-4"></div>
            <div className="grid grid-cols-2 gap-6">
                <div className="h-6 bg-gray-500 rounded"></div>
                <div className="h-6 bg-gray-500 rounded"></div>
            </div>
        </div>
    );
}
