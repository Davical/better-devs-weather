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
  if (!data) return <div>Loading current…</div>;
  return <CurrentWeatherCard current={data.current} />;
}