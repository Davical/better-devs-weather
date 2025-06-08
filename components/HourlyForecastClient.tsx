'use client';
import React from 'react';
import useSWR from 'swr';
import HourlyForecastList from './HourlyForecastList';
import { HourlyData } from '@/app/lib/weather';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function HourlyForecastClient({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) {
  const { data, error } = useSWR<{ hourly: HourlyData }>(
    `/api/weather/hourly?lat=${lat}&lon=${lon}`,
    fetcher,
    { refreshInterval: 600_000 }
  );

  if (error) return <div>Error loading hourly forecast</div>;
    if (!data) {
    return (
      <div className="animate-pulse bg-white/10 rounded-2xl p-8 h-full">
        <div className="h-8 bg-gray-500 rounded w-1/3 mb-4" />
        <div className="h-24 bg-gray-500 rounded w-1/2 mx-auto mb-4" />
        <div className="grid grid-cols-2 gap-6">
          <div className="h-6 bg-gray-500 rounded" />
          <div className="h-6 bg-gray-500 rounded" />
        </div>
      </div>
    )
  }
  return <HourlyForecastList hourly={data.hourly} />;
}