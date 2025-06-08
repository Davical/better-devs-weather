'use client';
import React from 'react';
import useSWR from 'swr';
import CurrentWeatherCard from './CurrentWeatherCard';
import { CurrentWeather } from '@/app/lib/weather';

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
    { refreshInterval: 600_000 } // poll every minute
  );

  if (error) return <div>Error loading current weather</div>;
  if (!data) {
    return (
      <div className="animate-pulse bg-white/10 h-full rounded-2xl p-8 h-64">
        <div className="h-8 bg-gray-500 rounded w-1/3 mb-4" />
        <div className="h-24 bg-gray-500 rounded w-1/2 mx-auto mb-4" />
        <div className="grid grid-cols-2 gap-6">
          <div className="h-6 bg-gray-500 rounded" />
          <div className="h-6 bg-gray-500 rounded" />
        </div>
      </div>
    )
  }
  return <CurrentWeatherCard current={data.current} />;
}